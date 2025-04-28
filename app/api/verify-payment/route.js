import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { reference } = await request.json();

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  try {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      // You can now fulfill order, update database etc
      return NextResponse.json({ success: true, data: paymentData });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment not successful",
      });
    }
  } catch (error) {
    console.error(
      "Error verifying payment:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
