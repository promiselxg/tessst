"use server";
import prisma from "@/lib/utils/dbConnect";

export async function createPendingOrder({ amount, email }) {
  const order = await prisma.order.create({
    data: {
      email,
      amount,
      status: "PENDING",
    },
  });

  return order;
}

export async function updatePendingOrder(orderId, paymentData) {
  const orderStatus = await prisma.order.update({
    where: { id: orderId },
    data: {
      userId: paymentData.metadata.userId,
      status: "PAID",
      paidAt: new Date(paymentData.paid_at),
      paymentReference: paymentData.reference,
    },
  });

  return orderStatus;
}
