import {
  handlePaystackEvent,
  verifyPaystackSignature,
} from "@/lib/webhook/paystack";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    const isValid = verifyPaystackSignature(rawBody, signature, secretKey);

    if (!isValid) {
      console.error("Webhook signature mismatch");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    await handlePaystackEvent(event);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
