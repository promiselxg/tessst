"use server";

import prisma from "@/lib/utils/dbConnect";
import { createShippingLog } from "../log/shipping-log";

export async function handleRefund(refundData) {
  const { payment_reference, amount, customer } = refundData;

  if (!payment_reference || !customer?.id) {
    console.warn("Missing payment reference or customer id in refund data");
    return null;
  }

  const payment = await prisma.payment.findUnique({
    where: { orderId: payment_reference }, // Assuming refund points to orderId
  });

  if (!payment) {
    console.warn("No matching payment found for refund");
    return null;
  }

  const refund = await prisma.refund.create({
    data: {
      paymentId: payment.id,
      amount: Math.abs(amount) / 100, // Amount refunded (positive value)
      userId: customer.id,
    },
  });

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: "REFUNDED",
    },
  });

  await createShippingLog({
    orderId: pendingOrder.id,
    status: "Refund request initiated",
    note: "Refund request placed",
  });

  return refund;
}
