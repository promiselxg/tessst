"use server";

import prisma from "@/lib/utils/dbConnect";

/**
 * Create a new shipping log entry for a given order.
 * @param {Object} input
 * @param {string} input.orderId - The ID of the order.
 * @param {string} input.status - The status message (e.g., "Delivered").
 * @param {Date|string} [input.timestamp] - Optional timestamp; defaults to now.
 * @param {string} [input.note] - Optional note for additional info (e.g., tracking number).
 */
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
