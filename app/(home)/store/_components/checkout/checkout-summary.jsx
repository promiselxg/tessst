"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartSummary } from "@/hooks/use-cart-summary";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const CheckoutSummary = () => {
  const { subtotal, total, isValid, delivery_fee, cart } = useCartSummary();
  const router = useRouter();

  useEffect(() => {
    if (cart.length < 1) {
      router.replace("/cart");
    }
  }, [cart.length, router]);

  return (
    <>
      <div className="w-full  bg-white h-fit shadow-sm border border-[#eee] sticky top-[100px]">
        <div className="p-3 border-b-[1px] border-[#eee] flex items-center w-full">
          <h1 className="font-euclid text-[16px] font-[400]">Order summary</h1>
        </div>
        <div className="w-full flex justify-between p-3  border-[#eee]">
          <span className="text-xs">Item&apos;s total ({cart?.length})</span>
          <span className="text-sm font-medium">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="w-full flex justify-between p-3 border-b-[1px] border-[#eee]">
          <span className="text-xs">Delivery fee</span>
          <span className="text-sm font-medium">
            {formatCurrency(delivery_fee)}
          </span>
        </div>
        <div className="w-full flex justify-between p-3 border-b-[1px] border-[#eee]">
          <span className="text-sm">Total</span>
          <span className="text-[16px] font-[600]">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="w-full flex gap-3 my-3 px-3">
          <Input placeholder="coupon code" />
          <Button className="text-sm font-light bg-[--app-primary-color]">
            Apply
          </Button>
        </div>
        <div className="w-full my-3 px-3">
          <Button
            disabled={!isValid}
            className="w-full bg-[--app-bg-red] shadow-md flex items-center justify-center gap-2 py-3 rounded text-white disabled:cursor-not-allowed"
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
