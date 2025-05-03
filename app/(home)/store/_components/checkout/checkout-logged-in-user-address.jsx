import { CheckCircle2 } from "lucide-react";
import React from "react";
import CheckoutStepHeader from "./checkout-step-header";

const CheckOutLoggedInUserAccountInfo = ({ userId }) => {
  return (
    <>
      <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
        <CheckoutStepHeader
          icon={CheckCircle2}
          label="1. Customer Address"
          href="/"
        />
        <div className="p-3 text-sm text-slate-700 space-y-2 flex flex-col">
          <h1>Anuforo Okechukwu</h1>
          <span className="text-xs font-normal">
            Access Bank Wuse Market, FCT Abuja | Federal Capital Territory -
            ABUJA-WUSE ZONE 4 | +234 7015564131
          </span>
        </div>
      </div>
    </>
  );
};

export default CheckOutLoggedInUserAccountInfo;
