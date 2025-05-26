"use client";

import { useAuth } from "@/context/authProvider";
import { big_sholders_text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Flame, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

const PricingCard = ({
  plan,
  title,
  price,
  duration = "/mo",
  features = [],
  ctaText = "Join for free",
  badge,
  orderId,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscription = async (plan) => {
    setLoading(true);
    if (!user) {
      router.push("/auth/login?callbackUrl=%2Fsubscription");
    }
    try {
      const response = await axios.post("/api/paystack/initialize-payment", {
        email: user.email,
        amount: parseFloat(price) * 100,
        plan,
        callback_url: "http://localhost:3000/subscription/success",
        cancel_url: "http://localhost:3000/subscription/cancel",
        metadata: {
          userId: user.id,
          plan,
          orderId,
          transactionType: "subscription",
        },
      });

      if (response.status === 200) {
        const authorizationUrl = response.data.authorizationUrl;
        window.location.href = authorizationUrl;
      } else {
        toast.error("Failed to initialize subscription. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          "An error occurred while processing your subscription. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        `${
          badge ? "border-[4px] border-yellow-600 scale-105" : ""
        } relative bg-zinc-900 text-white p-6 rounded-lg max-w-sm text-center overflow-hidden`
      )}
    >
      {badge && (
        <div className="absolute top-0 right-0 bg-yellow-600 text-xs font-semibold px-4 py-2 rounded-bl-md text-white">
          {badge}
        </div>
      )}

      <div className="py-10">
        <h3
          className={cn(
            `${big_sholders_text.className} text-[30px] font-bold mb-2`
          )}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">only</p>
        <div
          className={cn(
            `${big_sholders_text.className} text-[50px] font-extrabold mb-1`
          )}
        >
          &#8358;{price.toLocaleString()}
        </div>
        <p className="text-sm text-gray-400 mb-4">{duration}</p>
      </div>

      <hr className="border-gray-700 my-4" />

      <ul className="space-y-3 text-sm text-gray-300 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Flame className="text-yellow-500 w-4 h-4" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md w-full transition-colors"
        onClick={() => handleSubscription(plan)}
        disabled={loading || price <= 0}
        aria-label={`Subscribe to ${title} plan for ${price.toLocaleString()}${duration}`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 inline-block w-4 h-4" />
            Processing...
          </>
        ) : (
          ctaText
        )}
      </Button>
    </div>
  );
};

export default PricingCard;
