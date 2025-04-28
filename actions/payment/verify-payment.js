"use server";

import axios from "axios";

export async function verifyTransaction(reference) {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    if (response.data.data.status === "success") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Verification error", error);
    return { success: false };
  }
}
