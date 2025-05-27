"use client";

import PricingCard from "@/components/card/pricing-card";
import { getAllMembershiptPlans } from "@/service/subscription/subscriptionService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authProvider";
import { useSubscriptionStore } from "@/store/subscriptionStore";

const SubscriptionPlans = () => {
  const [subscriptionsPlans, setSubscriptionsPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { subscriptions, fetchSubscriptions } = useSubscriptionStore();

  useEffect(() => {
    const fetchAllSubscriptionPlans = async () => {
      try {
        setIsLoading(true);
        const response = await getAllMembershiptPlans();
        setSubscriptionsPlans(response?.plans);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Error occurred while fetching membership plans"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllSubscriptionPlans();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchSubscriptions(user.id);
    }
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-6 border rounded-xl shadow">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6 mb-2" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
      {subscriptionsPlans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <PricingCard
            plan={plan.paystack_plan_code}
            title={plan.name}
            price={plan.price}
            duration={
              plan.interval === "free-forever"
                ? "/forever"
                : `/${plan.interval}`
            }
            orderId={plan.id}
            isSubscribed={subscriptions && subscriptions?.planId === plan.id}
            badge={plan.interval === "annually" && "Most popular"}
            features={plan.features || []}
            ctaText={plan.price === 0 ? "Join for free" : "Subscribe Now"}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
