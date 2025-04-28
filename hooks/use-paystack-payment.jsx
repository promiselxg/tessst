"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function usePaystackPayment({ email, amount, publicKey }) {
  const router = useRouter();
  const paystackInstanceRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadPaystack() {
      if (typeof window !== "undefined" && email && amount && publicKey) {
        const { default: PaystackPop } = await import("@paystack/inline-js");
        paystackInstanceRef.current = new PaystackPop();
        setIsReady(true);
      }
    }

    loadPaystack();
  }, [email, amount, publicKey]);

  const openPaystackModal = async (options = {}) => {
    if (!paystackInstanceRef.current) {
      console.error("Paystack SDK not loaded yet.");
      return;
    }

    await paystackInstanceRef.current.checkout({
      key: publicKey,
      email,
      amount,
      metadata: options.metadata || {},
      onSuccess(transaction) {
        router.push(
          `/store/checkout/success?reference=${transaction?.reference}`
        );
      },
      onCancel() {
        console.log("Payment cancelled");
      },
    });
  };

  return { openPaystackModal, isReady };
}
