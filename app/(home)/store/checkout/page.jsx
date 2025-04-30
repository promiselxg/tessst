"use client";

import { createPendingOrder } from "@/actions/order/order";
import { createPayment } from "@/actions/payment/payment";
import { useAuth } from "@/context/authProvider";
import { usePaystackPayment } from "@/hooks/use-paystack-payment";
import { toKobo } from "@/lib/paystack/toKobo";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { openPaystackModal, isReady } = usePaystackPayment({
    email: "okeydeede@gmail.com",
    amount: toKobo(7000),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  });

  async function handleCheckout() {
    if (!isReady) {
      console.warn("Payment system not ready.");
      return;
    }

    setLoading(true);

    try {
      const pendingOrder = await createPendingOrder({
        amount: toKobo(7000),
        email: "okeydeede@gmail.com",
      });

      if (!pendingOrder?.id) {
        console.error("Failed to create order.");
        return;
      }

      await createPayment(pendingOrder.id, user?.id);

      openPaystackModal({
        metadata: {
          orderId: pendingOrder.id,
          transactionType: "store",
          userId: user?.id || "",
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <button
        onClick={handleCheckout}
        disabled={!isReady || loading}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {loading ? (
          <div className="flex items-center gap-2 text-xs">
            <Loader2 className=" animate-spin h-4 w-4" />
            initializing...
          </div>
        ) : isReady ? (
          "Pay Now"
        ) : (
          "Loading Payment..."
        )}
      </button>
    </div>
  );
};

export default CheckoutPage;
