"use client";

import { createOrder } from "@/actions/order/create-order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authProvider";
import { useCartSummary } from "@/hooks/use-cart-summary";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CheckoutSummary = () => {
  const { subtotal, total, isValid, delivery_fee, cart, clearCart } =
    useCartSummary();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const {
    resetCheckout,
    selectedDeliveryAddress,
    selectedCustomerAddress,
    customerAddress = [],
    selectedPaymenthMethod,
  } = useCheckoutStore();

  // Fallback to default or first address
  const defaultAddress = !selectedCustomerAddress
    ? customerAddress.find((address) => address.isDefault) ||
      customerAddress[0] ||
      null
    : null;

  const displayAddress = selectedCustomerAddress || defaultAddress;

  const canConfirmOrder =
    isValid && !disableButton && !!displayAddress && !!selectedPaymenthMethod;

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      if (selectedPaymenthMethod.method.toLowerCase() === "card") {
        console.log("Initiating Paystack payment...");
        // TODO: Integrate Paystack or trigger redirect/init
        return;
      }

      const result = await createOrder({
        cart,
        user,
        total,
        delivery_fee,
        selectedCustomerAddress,
        selectedDeliveryAddress,
      });

      if (result.success) {
        toast.success("Order placed successfully!");

        resetCheckout();
        clearCart();

        setTimeout(() => {
          router.replace(
            `/store/checkout/success?reference=${result?.orderId}&method=${selectedPaymenthMethod?.method}`
          );
        }, 100);
      }
    } catch (error) {
      toast.error("Something went wrong while confirming your order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length < 1) {
      router.replace("/cart");
    }
  }, [cart.length, router]);

  useEffect(() => {
    setDisableButton(pathname !== "/store/checkout");
  }, [pathname]);

  return (
    <div className="w-full bg-white h-fit shadow-sm border border-[#eee] sticky top-[100px]">
      <div className="p-3 border-b border-[#eee] flex items-center w-full">
        <h1 className="font-euclid text-[16px] font-[400]">Order summary</h1>
      </div>

      <div className="w-full flex justify-between p-3 border-[#eee]">
        <span className="text-xs">Item&apos;s total ({cart?.length})</span>
        <span className="text-sm font-medium">{formatCurrency(subtotal)}</span>
      </div>

      {selectedDeliveryAddress && (
        <div className="w-full flex justify-between p-3 border-b border-[#eee]">
          <span className="text-xs">Delivery fee</span>
          <span className="text-sm font-medium">
            {formatCurrency(delivery_fee)}
          </span>
        </div>
      )}

      <div className="w-full flex justify-between p-3 border-b border-[#eee]">
        <span className="text-sm">Total</span>
        <span className="text-[16px] font-[600]">{formatCurrency(total)}</span>
      </div>

      {selectedDeliveryAddress &&
        selectedCustomerAddress &&
        selectedPaymenthMethod && (
          <div className="w-full flex gap-3 my-3 px-3">
            <Input placeholder="coupon code" />
            <Button className="text-sm font-light bg-[--app-primary-color]">
              Apply
            </Button>
          </div>
        )}

      <div className="w-full my-3 px-3">
        <Button
          disabled={!canConfirmOrder || loading || !selectedCustomerAddress}
          onClick={() => handleConfirmOrder()}
          className="w-full bg-[--app-bg-red] shadow-md flex items-center justify-center gap-2 py-3 rounded text-white disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              confirming order...
            </div>
          ) : (
            "Confirm Order"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
