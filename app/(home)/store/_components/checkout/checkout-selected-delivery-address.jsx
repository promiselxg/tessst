import { formatCurrency } from "@/lib/utils/formatCurrency";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import CheckoutStepHeader from "./checkout-step-header";

const CheckouDeliveryAddress = () => {
  return (
    <>
      <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
        <CheckoutStepHeader
          icon={CheckCircle2}
          label="2. Delivery Address"
          href="/"
        />
        <div className="p-3 text-sm text-slate-700 space-y-3 flex flex-col">
          <h1>Door Delivery</h1>
          <p className="text-xs">
            Delivery between <strong>12 May</strong> and{" "}
            <strong>13 May.</strong>
          </p>
          <div className="w-full p-3 rounded border-[1px] border-[#eee] flex items-center justify-between">
            <div className="flex-col space-y-1">
              <h1 className="text-sm text-[--course-highlight-bg] ">
                SAVE UP TO {formatCurrency(1000)}
              </h1>
              <h1 className="text-xs font-[600]">
                Switch to a pickup station starting from ₦ 950
              </h1>
              <p className="text-xs">
                Delivery between <strong>12 May</strong> and{" "}
                <strong>13 May.</strong>
              </p>
            </div>
            <Link href="/" className="flex items-center gap-2 text-blue-600">
              Change
              <FiChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckouDeliveryAddress;
