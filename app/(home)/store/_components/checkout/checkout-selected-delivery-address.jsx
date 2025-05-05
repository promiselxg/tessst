"use client";

import { CheckCircle2 } from "lucide-react";
import React from "react";
import CheckoutStepHeader from "./checkout-step-header";
import { useCheckoutStore } from "@/store/useCheckoutStore";

const CheckouDeliveryAddress = () => {
  const { selectedDeliveryAddress } = useCheckoutStore();
  const isCompleted = !!selectedDeliveryAddress?.name;

  return (
    <>
      <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
        <CheckoutStepHeader
          icon={CheckCircle2}
          label="2. Delivery Address"
          href="/store/checkout/delivery-address/"
          completed={isCompleted}
        />
        <div className="p-3 text-sm text-slate-700 space-y-1 flex flex-col">
          <h1>
            {selectedDeliveryAddress?.name || "Set your delivery address"}
          </h1>
          {selectedDeliveryAddress && (
            <p className="text-xs text-slate-700">
              {selectedDeliveryAddress?.delivery_address}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckouDeliveryAddress;
