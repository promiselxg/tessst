import { verifyTransaction } from "@/actions/payment/verify-payment";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ searchParams }) => {
  const reference = searchParams.reference;

  if (!reference) {
    redirect("/");
  }

  const verificationResult = await verifyTransaction(reference);

  if (!verificationResult.success) {
    redirect("/store/checkout/failure");
  }

  const paymentData = verificationResult.data;
  //console.log("Payment data from verification endpoint", paymentData);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Payment successful!</h1>
        <p>
          Reference : <strong>{paymentData.reference}</strong>
        </p>
        <p>
          Amount Paid : {(paymentData.amount / 100).toLocaleString()}{" "}
          {paymentData.currency}
        </p>
        <Link href="/">Go to Homepage</Link>
      </div>
    </>
  );
};

export default page;
