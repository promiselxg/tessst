import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formatCurrency } from "@/lib/utils/formatCurrency";

const CartPriceSummary = ({ subtotal }) => {
  return (
    <>
      <div className="w-full md:w-[30%] bg-white h-fit shadow-sm border border-[#eee] sticky top-[100px]">
        <div className="p-3 border-b-[1px] border-[#eee] flex items-center w-full">
          <h1 className="font-euclid text-[16px] font-[400]">CART SUMMARY</h1>
        </div>
        <div className="w-full flex justify-between p-3 border-b-[1px] border-[#eee]">
          <span>Subtotal</span>
          <span className="font-[600]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="w-full flex gap-3 my-3 px-3">
          <Input placeholder="coupon code" />
          <Button className="text-sm font-light bg-[--app-primary-color]">
            Apply
          </Button>
        </div>
        <div className="w-full my-3 px-3">
          <Button className="w-full bg-[--app-bg-red] shadow-md flex items-center gap-2">
            Checkout
            <span className="font-[600]">({formatCurrency(subtotal)})</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPriceSummary;
