import { createOrUpdateCustomerInfo } from "@/actions/customer/customer";
import { saveDonation } from "@/actions/donate/donate";
import { handleWebhookError } from "@/actions/log/webhook-error";
import { logWebhookEvent } from "@/actions/log/webhook-log";
import { updatePendingOrder } from "@/actions/order/order";
import { savePayment } from "@/actions/payment/payment";
import { handleRefund } from "@/actions/refund/refund";
import {
  createSubscription,
  updateSubscription,
} from "@/actions/subscription/subscription";

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
  const reference = data.reference;

  //console.log("Received Paystack event:", eventType);
  //console.log("WEBHOOK EVENT DATA:", data);

  try {
    switch (eventType) {
      case "charge.success":
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
        } else if (transactionType === "subscription") {
          const subscriptionData = {
            userId,
            auth_code: data.authorization.authorization_code,
            paid_at: data.createdAt || data.paid_at,
            amount: data.amount,
            currency: data.currency,
            reference,
            plan: data.plan,
          };

          await createSubscription(subscriptionData);
          await logWebhookEvent(
            eventType,
            "SUCCESS",
            data,
            `Subscription created for user ${userId}`
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

      case "subscription.create":
        const subscriptionData = {
          authorization_code: data.authorization.authorization_code,
          paystack_subscription_code: data.subscription_code,
          paystack_subscription_token: data.email_token,
          next_payment_date: data.next_payment_date,
          plan_code: data.plan.plan_code,
        };

        await updateSubscription(subscriptionData);

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
