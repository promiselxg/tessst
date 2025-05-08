"use server";

import prisma from "@/lib/utils/dbConnect";

export async function verifyOrder(reference) {
  if (!reference) {
    return {
      success: false,
      error: "Invalid reference ID",
      name: null,
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { order_Id: reference },
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found",
        name: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: order.customerId },
    });

    return {
      success: true,
      name: user.username,
    };
  } catch (error) {
    console.error("VerifyOrder Error:", error);
    return {
      success: false,
      error: "Something went wrong, unable to complete your order",
      name: null,
    };
  }
}
