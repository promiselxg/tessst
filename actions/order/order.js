"use server";

import prisma from "@/lib/utils/dbConnect";

export async function createPendingOrder({
  tx,
  amount,
  email,
  customerId,
  metadata = {},
  delivery_fee,
  order_Id,
}) {
  const order = await tx.order.create({
    data: {
      amount: amount / 100,
      email,
      customerId,
      metadata,
      status: "PENDING",
      ...(delivery_fee !== undefined && { delivery_fee: delivery_fee / 100 }),
      order_Id,
    },
  });

  return {
    ...order,
    amount: order.amount.toNumber(),
    delivery_fee: order.delivery_fee?.toNumber() ?? 0,
  };
}

export async function updatePendingOrder(orderId, paymentData) {
  const orderStatus = await prisma.order.update({
    where: { id: orderId },
    data: {
      customerId: paymentData.metadata.userId,
      status: "PAID",
      paidAt: new Date(paymentData.paid_at),
      paymentReference: paymentData.reference,
    },
  });

  return orderStatus;
}
