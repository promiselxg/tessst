import React from "react";
import CheckoutStepHeader from "./checkout-step-header";
import { CheckCircle2 } from "lucide-react";

const CheckoutSelectedPaymentMethod = () => {
  return (
    <>
      <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
        <CheckoutStepHeader
          icon={CheckCircle2}
          label="3. Payment Method"
          href="/"
        />
        <div className="p-3 text-sm text-slate-700 space-y-3 flex flex-col">
          <div className="w-full p-3 flex items-center justify-between">
            <p>Pay on delivery via bank transfer.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSelectedPaymentMethod;
