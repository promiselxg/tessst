"use server";

import prisma from "@/lib/utils/dbConnect";

export async function logWebhookEvent(
  eventName,
  status,
  rawData,
  error = null
) {
  try {
    const MAX_ERROR_LENGTH = 65535;

    let errorMessage = null;
    if (error) {
      errorMessage =
        typeof error === "string"
          ? error
          : typeof error.message === "string"
          ? error.message
          : JSON.stringify(error);

      if (errorMessage.length > MAX_ERROR_LENGTH) {
        errorMessage = errorMessage.substring(0, MAX_ERROR_LENGTH);
      }
    }

    await prisma.webhookLog.create({
      data: {
        event: eventName,
        status,
        rawData,
        error: errorMessage,
      },
    });
  } catch (logError) {
    console.error("Failed to log webhook event", logError);
  }
}
