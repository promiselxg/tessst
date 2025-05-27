import { cancelExistingSubscription } from "@/actions/subscription/subscription";
import { customMessage, ServerError } from "@/lib/utils/customMessage";
import prisma from "@/lib/utils/dbConnect";
import { generateRandomString } from "@/lib/utils/randomStringGenerator";
import { isValidUUID } from "@/lib/utils/validateUUID";
import axios from "axios";
import sanitize from "sanitize-html";

const createSubscriptionPlan = async (req) => {
  try {
    const {
      name,
      description,
      price,
      interval,
      features,
      isDefault = false,
    } = await req.json();

    if (!name || price === undefined || !interval) {
      return customMessage("Name, price, and interval are required", {}, 400);
    }

    if (
      typeof name !== "string" ||
      (description && typeof description !== "string")
    ) {
      return customMessage("Name and description must be strings", {}, 400);
    }

    if (typeof price !== "number" || price < 0) {
      return customMessage("Price must be a non-negative number", {}, 400);
    }

    const isFree = price === 0;

    if (
      !isFree &&
      (typeof interval !== "string" ||
        !["monthly", "quarterly", "annually"].includes(interval))
    ) {
      return customMessage(
        "Interval must be 'monthly', 'quarterly', or 'annually'",
        {},
        400
      );
    }

    if (features && !Array.isArray(features)) {
      return customMessage("Features must be an array", {}, 400);
    }

    if (typeof isDefault !== "boolean") {
      return customMessage("isDefault must be a boolean", {}, 400);
    }

    if (name.length < 3 || name.length > 50) {
      return customMessage("Name must be between 3 and 50 characters", {}, 400);
    }

    const sanitizedName = sanitize(name);
    const sanitizedDesc = description ? sanitize(description) : null;
    const amount = parseFloat(price) * 100;

    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { name: sanitizedName },
    });

    const isFreePlanExists = await prisma.subscriptionPlan.findFirst({
      where: { type: "free" },
    });

    if (isFree && isFreePlanExists) {
      return customMessage("A free plan already exist", {}, 409);
    }

    if (existingPlan) {
      return customMessage("Plan already exists", {}, 409);
    }

    let paystack_plan_code = null;
    let planInterval = isFree ? "free-forever" : interval;

    if (!isFree) {
      const paystackRes = await axios.post(
        "https://api.paystack.co/plan",
        { name: sanitizedName, amount, interval },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      if (!paystackRes.data.status) {
        return customMessage("Failed to create plan on Paystack", {}, 500);
      }

      paystack_plan_code = paystackRes.data.data.plan_code;
    }

    if (isDefault) {
      await prisma.subscriptionPlan.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const plan = await prisma.subscriptionPlan.create({
      data: {
        name: sanitizedName,
        description: sanitizedDesc,
        price: amount,
        interval: planInterval,
        features: features || null,
        paystack_plan_code,
        isDefault: isFree ? true : isDefault,
        type: isFree ? "free" : "paid",
      },
    });

    return customMessage(
      "Subscription plan created successfully",
      {
        plan: {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          interval: plan.interval,
          features: plan.features || [],
          isDefault: plan.isDefault,
          paystack_plan_code: plan.paystack_plan_code,
          type: plan.type,
        },
      },
      201
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const listAllSubscriptionPlans = async () => {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        interval: true,
        features: true,
        isDefault: true,
        paystack_plan_code: true,
        type: true,
      },
    });

    const formattedPlans = plans.map((plan) => ({
      ...plan,
      price: plan.price / 100,
    }));

    return customMessage(
      "Subscription plans retrieved successfully",
      { count: formattedPlans.length, plans: formattedPlans },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const listAllSubscriptions = async () => {
  try {
    const paystackRes = await axios.get(
      `https://api.paystack.co/subscription`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    if (!paystackRes.data.status) {
      return customMessage("Failed to update plan on Paystack", {}, 500);
    }
    return customMessage(
      "Subscriptions retrieved successfully",
      { subscriptions: paystackRes.data.data },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const getSubscriptionPlanById = async (_, params) => {
  const { id } = await params;
  if (!id) {
    return customMessage("Plan ID is required", {}, 400);
  }

  if (!isValidUUID(id)) {
    return customMessage("Invalid Plan ID format", {}, 400);
  }

  try {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        interval: true,
        features: true,
        isDefault: true,
        paystack_plan_code: true,
      },
    });

    if (!plan) {
      return customMessage("Subscription plan not found", {}, 404);
    }

    return customMessage(
      "Subscription plan retrieved successfully",
      { plan },
      200
    );
  } catch (error) {
    return ServerError(error, {}, 500);
  }
};

const updateSubscriptionPlan = async (req, params) => {
  try {
    const { id } = await params;

    if (!id) return customMessage("Plan ID is required", {}, 400);
    if (!isValidUUID(id))
      return customMessage("Invalid Plan ID format", {}, 400);

    const {
      name,
      description,
      price,
      interval,
      features,
      isDefault = false,
    } = await req.json();

    if (
      name &&
      (typeof name !== "string" || name.length < 3 || name.length > 50)
    ) {
      return customMessage(
        "Name must be a string between 3 and 50 characters",
        {},
        400
      );
    }
    if (description && typeof description !== "string") {
      return customMessage("Description must be a string", {}, 400);
    }
    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return customMessage("Price must be a positive number", {}, 400);
    }
    if (interval && !["monthly", "quarterly", "annually"].includes(interval)) {
      return customMessage(
        "Interval must be either 'monthly', 'quarterly', or 'annually'",
        {},
        400
      );
    }
    if (features && !Array.isArray(features)) {
      return customMessage("Features must be an array", {}, 400);
    }
    if (typeof isDefault !== "boolean") {
      return customMessage("isDefault must be a boolean", {}, 400);
    }

    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { id },
    });

    if (!existingPlan) {
      return customMessage("Subscription plan not found", {}, 404);
    }

    const sanitizedName = name ? sanitize(name) : existingPlan.name;
    const sanitizedDesc = description
      ? sanitize(description)
      : existingPlan.description;
    const amount =
      price !== undefined
        ? parseFloat(price) * 100
        : parseFloat(existingPlan.price);

    const paystackRes = await axios.put(
      `https://api.paystack.co/plan/${existingPlan.paystack_plan_code}`,
      {
        name: sanitizedName,
        amount,
        interval: interval || existingPlan.interval,
      },
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    if (!paystackRes.data.status) {
      return customMessage("Failed to update plan on Paystack", {}, 500);
    }

    if (isDefault) {
      await prisma.subscriptionPlan.updateMany({
        where: { isDefault: true, id: { not: id } },
        data: { isDefault: false },
      });
    }

    const updatedPlan = await prisma.subscriptionPlan.update({
      where: { id },
      data: {
        name: sanitizedName,
        description: sanitizedDesc,
        price: price !== undefined ? amount : existingPlan.price,
        interval: interval || existingPlan.interval,
        features: features || existingPlan.features,
        isDefault,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        interval: true,
        features: true,
        isDefault: true,
        paystack_plan_code: true,
      },
    });

    return customMessage(
      "Subscription plan updated successfully",
      {
        plan: {
          ...updatedPlan,
        },
      },
      200
    );
  } catch (error) {
    console.error("Update plan error:", error);
    return ServerError(error, {}, 500);
  }
};

const initializeSubscription = async (req) => {
  try {
    const data = await req.json();

    const { email, plan, amount, callback_url, cancel_url, metadata } = data;

    if (!email || !plan) {
      return customMessage("Email and plan are required", {}, 400);
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        plan,
        callback_url,
        cancel_url,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.status) {
      return customMessage("Failed to initialize subscription", {}, 500);
    }

    return customMessage(
      "Subscription initialized successfully",
      { authorizationUrl: response.data.data.authorization_url },
      200
    );
  } catch (error) {
    console.error("Initialize subscription error:", error);
    return ServerError(error, {}, 500);
  }
};

const freeSubscription = async (req) => {
  try {
    const { userId, plan } = await req.json();

    if (!userId || !plan) {
      return customMessage("User ID and plan are required", {}, 400);
    }

    if (plan !== "Freebie") {
      return customMessage("Invalid plan for free subscription", {}, 400);
    }

    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId, status: "active" },
    });

    const freePlan = await prisma.subscriptionPlan.findFirst({
      where: { type: "free" },
    });

    console.log(existingSubscription);
    if (!freePlan) {
      return customMessage("Free plan not found", {}, 404);
    }
    if (existingSubscription) {
      await cancelExistingSubscription(existingSubscription);
    }

    const newSubscription = await prisma.subscription.create({
      data: {
        status: "active",
        interval: "free-forever",
        amount: 0,
        currency: "NGN",
        reference_code: generateRandomString(10),
        startDate: new Date(),
        endDate: null,
        plan: {
          connect: { id: freePlan.id },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return customMessage(
      "Free subscription created successfully",
      { subscription: newSubscription },
      201
    );
  } catch (error) {
    console.error("Free subscription error:", error);
    return ServerError(error, {}, 500);
  }
};

const getUserSubscription = async (_, params) => {
  const { userId } = await params;

  if (!userId || !isValidUUID(userId)) {
    return customMessage("Valid User ID is required", {}, 400);
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: { userId, status: "active" },
      include: {
        plan: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            interval: true,
            features: true,
            isDefault: true,
            paystack_plan_code: true,
          },
        },
      },
    });

    return customMessage("", { subscription }, 200);
  } catch (error) {
    console.error("Get user subscription error:", error);
    return ServerError(error, {}, 500);
  }
};

export const subscriptionControllers = {
  createSubscriptionPlan,
  listAllSubscriptionPlans,
  listAllSubscriptions,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  initializeSubscription,
  freeSubscription,
  getUserSubscription,
};
