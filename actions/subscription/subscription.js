"use server";

import prisma from "@/lib/utils/dbConnect";
import { addMonths, addYears } from "date-fns";

export async function createSubscription(data) {
  if (
    !data ||
    !data.paid_at ||
    !data.amount ||
    !data.currency ||
    !data.plan ||
    !data.metadata
  ) {
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
      paystack_plan_code: data?.plan?.plan_code || data?.metadata?.plan,
    },
  });

  if (!subscriptionPlan) {
    throw new Error("Subscription plan not found");
  }

  const existing = await prisma.subscription.findFirst({
    where: {
      userId: data.metadata.userId,
      status: "active",
    },
  });

  const subscription = await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.subscription.update({
        where: { id: existing.id },
        data: { status: "expired" },
      });
    }

    return await tx.subscription.create({
      data: {
        userId: data.metadata.userId,
        planId: subscriptionPlan.id,
        paystack_subscription_code: data.subscription_code || null,
        reference_code: data.reference,
        status: "active",
        interval,
        amount: data.amount / 100,
        currency: data.currency,
        startDate,
        endDate,
      },
    });
  });

  if (!subscription) {
    throw new Error("Failed to create subscription");
  }

  return subscription;
}
