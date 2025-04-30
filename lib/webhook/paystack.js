import { createOrUpdateCustomerInfo } from "@/actions/customer/customer";
import { saveDonation } from "@/actions/donate/donate";
import { handleWebhookError } from "@/actions/log/webhook-error";
import { logWebhookEvent } from "@/actions/log/webhook-log";
import { updatePendingOrder } from "@/actions/order/order";
import { savePayment } from "@/actions/payment/payment";
import { handleRefund } from "@/actions/refund/refund";

import crypto from "crypto";

export function verifyPaystackSignature(rawBody, signature, secretKey) {
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");

  return hash === signature;
}

export async function handlePaystackEvent(event) {
  const eventType = event.event;
  const data = event.data;
  const metadata = data?.metadata || {};
  const orderId = metadata.orderId;
  const transactionType = metadata.transactionType;
  const userId = metadata.userId;

  console.log("Received Paystack event:", eventType);
  console.log("WEBHOOK EVENT DATA:", data);

  try {
    switch (eventType) {
      case "charge.success":
        if (!orderId) {
          return await handleWebhookError(
            eventType,
            data,
            "Missing orderId in metadata",
            400
          );
        }

        if (transactionType === "store") {
          await Promise.all([
            updatePendingOrder(orderId, data),
            createOrUpdateCustomerInfo(data.customer, userId),
            savePayment(data),
          ]);
          await logWebhookEvent(eventType, "SUCCESS", data);
        } else if (transactionType === "donate") {
          await saveDonation(data);
          await logWebhookEvent(
            eventType,
            "SUCCESS",
            data,
            "Donation recorded"
          );
        } else {
          await logWebhookEvent(
            eventType,
            "IGNORED",
            data,
            "Unknown transaction type"
          );
        }
        break;

      case "refund.processed":
        await handleRefund(data);
        await logWebhookEvent(eventType, "SUCCESS", data);
        break;

      default:
        console.warn(`Unhandled Paystack event: ${eventType}`);
        await logWebhookEvent(
          eventType,
          "IGNORED",
          data,
          "Unhandled event type"
        );
        break;
    }
  } catch (error) {
    return await handleWebhookError(
      eventType,
      data,
      error.message || "Unhandled error"
    );
  }
}
