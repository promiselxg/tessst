import axios from "axios";

export const refundViaPaystack = async (reference, amount = null) => {
  try {
    const res = await axios.post(
      "https://api.paystack.co/refund",
      {
        transaction: reference,
        ...(amount ? { amount } : {}),
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Paystack refund error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to refund via Paystack");
  }
};
