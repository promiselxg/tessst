"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import CheckoutStepHeader from "../../_components/checkout/checkout-step-header";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const paymentMethod = [
  {
    id: "123456",
    name: "Pay on delivery via bank transfer or cash",
    method: "CASH_ON_DELIVERY",
    description:
      "Kindly note that you would have to make payment before opening your package.",
  },
  {
    id: "7890123",
    name: "Pay with Cards, Bank Transfer or USSD",
    method: "CARD",
    description:
      "Kindly note that you will be redirected to Paystack platform to complete your purchase.",
  },
];

const CheckoutPaymentMethod = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { selectedPaymenthMethod, setSelectedPaymentMethod } =
    useCheckoutStore();

  const handleSelectedAddress = async () => {
    const payment_method = paymentMethod.find((a) => a.id === selectedId);
    if (!payment_method) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSelectedPaymentMethod(payment_method);
    setIsLoading(false);
    router.replace("/store/checkout");
  };

  useEffect(() => {
    if (selectedPaymenthMethod?.id) {
      setSelectedId(selectedPaymenthMethod.id);
    } else {
      setSelectedId(paymentMethod[0]?.id);
    }
  }, [selectedPaymenthMethod]);

  return (
    <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
      <CheckoutStepHeader icon={CheckCircle2} label="3. Payment method" />
      <div className="p-3 text-sm text-slate-700 space-y-4 flex flex-col">
        <RadioGroup
          value={selectedId}
          onValueChange={setSelectedId}
          className="space-y-3"
        >
          {paymentMethod?.map((method) => (
            <div
              key={method.id}
              className="flex items-start space-x-2 p-3 border rounded-md border-[#eee]"
            >
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="mt-1"
              />
              <Label htmlFor={method.id} className="flex-1 space-y-1">
                <div className="font-[500] text-sm">{method.name}</div>
                <div className="text-xs font-thin text-muted-foreground">
                  {method?.description || "No payment method provided"}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="w-full border-b border-[#eee] p-3 flex" />
      <div className="w-full p-4 justify-end flex items-center gap-5">
        {!isLoading && (
          <Link
            href="/store/checkout/"
            className="bg-transparent shadow-none text-[--app-bg-red] hover:bg-transparent hover:text-slate-700 transition-all"
          >
            Cancel
          </Link>
        )}
        <Button
          onClick={handleSelectedAddress}
          disabled={!selectedId || isLoading}
          className="bg-[--app-primary-color] shadow-none text-white text-xs"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className=" animate-spin" />
              saving...
            </div>
          ) : (
            "Confirm payment method"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPaymentMethod;
