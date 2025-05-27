"use server";

import prisma from "@/lib/utils/dbConnect";
import { createShippingLog } from "../log/shipping-log";

export async function createPayment(tx, orderId, userId, amount) {
  if (!orderId) {
    return null;
  }

  const payment = await tx.payment.create({
    data: {
      orderId,
      userId: userId || null,
      amount: amount / 100,
    },
  });

  return {
    ...payment,
    amount: payment.amount.toNumber(),
  };
}

export async function savePayment(paymentData) {
  const { metadata, reference, amount, status, channel, customer, currency } =
    paymentData;

  if (!metadata?.orderId || !customer?.id) {
    return null;
  }

  const payment = await prisma.payment.upsert({
    where: { orderId: metadata.orderId },
    update: {
      status: status === "success" ? "PAID" : "FAILED",
      amount: amount / 100,
      method: mapPaystackChannelToPaymentMethod(channel),
      currency,
      reference,
    },
    create: {
      orderId: metadata.orderId,
      userId: metadata.userId || `${customer.id}` || null,
      amount: amount / 100,
      status: status === "success" ? "PAID" : "FAILED",
      method: mapPaystackChannelToPaymentMethod(channel),
      currency,
      reference,
    },
  });

  await createShippingLog({
    orderId: metadata.orderId,
    status: "Payment made",
  });

  return {
    ...payment,
    amount: payment.amount.toNumber(),
  };
}

function mapPaystackChannelToPaymentMethod(channel) {
  switch (channel?.toLowerCase()) {
    case "card":
      return "CARD";
    case "bank":
      return "BANK_TRANSFER";
    case "paypal":
      return "PAYPAL";
    case "cash":
      return "CASH_ON_DELIVERY";
    default:
      return "CARD";
  }
}
