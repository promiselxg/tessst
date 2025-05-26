"use server";

import prisma from "@/lib/utils/dbConnect";

export const createShippingLog = async ({
  orderId,
  status,
  timestamp,
  note = "",
}) => {
  if (!orderId || !status) {
    throw new Error("orderId and status are required.");
  }

  try {
    await prisma.shippingLog.create({
      data: {
        orderId,
        status,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        note,
      },
    });
  } catch (error) {
    console.error("Failed to create shipping log:", error);
    throw new Error("Could not create shipping log entry.");
  }
};
