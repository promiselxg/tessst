"use server";

import prisma from "@/lib/utils/dbConnect";

export async function logWebhookEvent(
  eventName,
  status,
  rawData,
  error = null
) {
  try {
    await prisma.webhookLog.create({
      data: {
        event: eventName,
        status,
        rawData,
        error,
      },
    });
  } catch (logError) {
    console.error("Failed to log webhook event", logError);
  }
}
