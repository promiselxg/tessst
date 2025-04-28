import { createOrUpdateCustomerInfo } from "@/actions/customer/customer";
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
  console.log("Received Paystack event:", event.event);

  const data = event.data;
  console.log("WEBHOOK EVENT DATA:", data);

  switch (event.event) {
    case "charge.success": {
      const orderId = data.metadata?.orderId;
      if (!orderId) {
        return await handleWebhookError(
          event.event,
          data,
          "Missing orderId in metadata",
          400
        );
      }

      try {
        await updatePendingOrder(orderId, data);
        await createOrUpdateCustomerInfo(data.customer, data.metadata.userId);
        await savePayment(data);
        await logWebhookEvent(event.event, "SUCCESS", data);
      } catch (error) {
        return await handleWebhookError(event.event, data, error.message);
      }
      break;
    }

    case "refund.processed": {
      try {
        await handleRefund(data);
        await logWebhookEvent(event.event, "SUCCESS", data);
      } catch (error) {
        return await handleWebhookError(event.event, data, error.message);
      }
      break;
    }

    default: {
      console.log(`Unhandled Paystack event: ${event.event}`);
      await logWebhookEvent(
        event.event,
        "IGNORED",
        data,
        "Unhandled event type"
      );
    }
  }
}
