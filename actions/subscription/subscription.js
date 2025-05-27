"use server";

import prisma from "@/lib/utils/dbConnect";
import { addMonths, addYears } from "date-fns";

export async function createSubscription(data) {
  if (!data || !data.paid_at || !data.amount || !data.currency || !data.plan) {
    throw new Error("Invalid subscription data provided");
  }

  const startDate = new Date(data.paid_at);
  const interval = data?.plan?.interval || "monthly";

  let endDate;
  switch (interval) {
    case "monthly":
      endDate = addMonths(startDate, 1);
      break;
    case "annually":
      endDate = addYears(startDate, 1);
      break;
    case "biannually":
      endDate = addMonths(startDate, 6);
      break;
    default:
      endDate = addMonths(startDate, 1);
  }

  const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
    where: {
      paystack_plan_code: data.plan.plan_code,
    },
  });

  if (!subscriptionPlan) {
    throw new Error("Subscription plan not found");
  }

  const existing = await prisma.subscription.findFirst({
    where: {
      userId: data.userId,
      status: "active",
    },
  });

  const subscription = await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.subscription.update({
        where: { id: existing.id },
        data: { status: "non-renewing" },
      });
      await cancelExistingSubscription(existing);
    }

    return await tx.subscription.create({
      data: {
        userId: data.userId,
        planId: subscriptionPlan.id,
        reference_code: data.reference,
        status: "active",
        interval,
        amount: data.amount / 100,
        currency: data.currency,
        startDate,
        endDate,
        authorization_code: data.auth_code,
      },
    });
  });

  if (!subscription) {
    throw new Error("Failed to create subscription");
  }

  return subscription;
}

export async function updateSubscription(data) {
  if (!data || !data.paystack_subscription_code) {
    throw new Error("Invalid subscription data provided");
  }

  const authCode = data.authorization_code || data.auth_code;

  const existing = await prisma.subscription.findFirst({
    where: {
      authorization_code: authCode,
    },
  });

  if (!existing) {
    throw new Error("Subscription not found");
  }

  await prisma.subscription.update({
    where: { id: existing.id },
    data: {
      next_payment_date: data.next_payment_date,
      paystack_subscription_code: data.paystack_subscription_code,
      paystack_subscription_token: data.paystack_subscription_token,
    },
  });

  return { success: true };
}

export async function switchToFreePlan(userId) {
  const existing = await prisma.subscription.findFirst({
    where: { userId, status: "active" },
  });

  const freePlan = await prisma.subscriptionPlan.findFirst({
    where: { name: "Free" },
  });

  if (!freePlan) throw new Error("Free plan not found");

  const now = new Date();

  const result = await prisma.$transaction(async (tx) => {
    if (existing) {
      if (existing.paystack_subscription_code) {
        await cancelPaystackSubscription(existing.paystack_subscription_code);
      }

      await tx.subscription.update({
        where: { id: existing.id },
        data: { status: "expired", endDate: now },
      });
    }

    return await tx.subscription.create({
      data: {
        userId,
        planId: freePlan.id,
        status: "active",
        interval: "free",
        amount: 0,
        currency: "NGN",
        startDate: now,
        endDate: null,
      },
    });
  });

  return result;
}

export async function cancelExistingSubscription(subscription) {
  if (!subscription) return;

  try {
    if (subscription.paystack_subscription_code) {
      await axios.post(
        "https://api.paystack.co/subscription/disable",
        {
          code: subscription.paystack_subscription_code,
          token: subscription.paystack_subscription_token,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );
    }

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "non-renewing",
        endDate: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    throw new Error("Subscription cancellation failed");
  }
}
