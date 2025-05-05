"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import CheckoutStepHeader from "../../_components/checkout/checkout-step-header";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useHydrated } from "@/hooks/use-hydration";
import { useRouter } from "next/navigation";
import Link from "next/link";

const pickupStation = [
  {
    id: "123456",
    name: "Pick-up Station",
    delivery_address: "Access Bank Wuse Market, FCT Abuja",
  },
  {
    id: "7890123",
    name: "Door delivery",
    delivery_address: "Delivered to your door within 2-5 working days",
  },
];

const DeliveryAddress = () => {
  const hydrated = useHydrated();
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { selectedDeliveryAddress, setselectedDeliveryAddress } =
    useCheckoutStore();

  const handleSelectedAddress = async () => {
    const currentAddress = pickupStation.find((a) => a.id === selectedId);
    if (!currentAddress) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setselectedDeliveryAddress(currentAddress);
    setIsLoading(false);
    router.replace("/store/checkout");
  };

  useEffect(() => {
    if (!hydrated) return;

    if (selectedDeliveryAddress?.id) {
      setSelectedId(selectedDeliveryAddress.id);
    } else {
      setSelectedId(pickupStation[0]?.id);
    }
  }, [hydrated, selectedDeliveryAddress]);

  return (
    <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
      <CheckoutStepHeader icon={CheckCircle2} label="2. Delivery Address" />
      <div className="p-3 text-sm text-slate-700 space-y-4 flex flex-col">
        <RadioGroup
          value={selectedId}
          onValueChange={setSelectedId}
          className="space-y-3"
        >
          {pickupStation.map((address) => (
            <div
              key={address.id}
              className="flex items-start space-x-2 p-3 border rounded-md border-[#eee]"
            >
              <RadioGroupItem
                value={address.id}
                id={address.id}
                className="mt-1"
              />
              <Label htmlFor={address.id} className="flex-1 space-y-1">
                <div className="font-[500] text-sm">{address.name}</div>
                <div className="text-sm font-thin text-muted-foreground">
                  {address.delivery_address || "No address provided"}
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
              saving address...
            </div>
          ) : (
            "Select delivery address"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeliveryAddress;
