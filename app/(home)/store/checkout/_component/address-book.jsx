"use client";

import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Plus } from "lucide-react";
import CheckoutStepHeader from "../../_components/checkout/checkout-step-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiCall } from "@/lib/utils/api";
import { useAuth } from "@/context/authProvider";
import { Skeleton } from "@/components/ui/skeleton";

const AddressBook = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { selectedCustomerAddress, setselectedCustomerAddress } =
    useCheckoutStore();

  const handleSelectedAddress = async () => {
    const currentAddress = customerAddress?.find(
      (a) => a.id === selectedOption
    );
    if (!currentAddress) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setselectedCustomerAddress(currentAddress);
    setIsLoading(false);
    router.replace("/store/checkout");
  };

  useEffect(() => {
    if (customerAddress.length === 0) return;

    if (selectedCustomerAddress?.id) {
      setSelectedOption(selectedCustomerAddress.id);
    } else {
      setSelectedOption(customerAddress[0]?.id);
    }
  }, [customerAddress, selectedCustomerAddress]);

  useEffect(() => {
    const fetchCustomerAddress = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await apiCall("get", `/customer/address/${user.id}`);
        setCustomerAddress(response.data || []);
      } catch (error) {
        const msg = error.response?.data?.message || error.message;
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAddress();
  }, [user]);

  return (
    <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
      <CheckoutStepHeader icon={CheckCircle2} label="1. Customer Address" />
      <div className="p-3 text-sm text-slate-700 space-y-4 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center flex-col gap-4">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : (
          <>
            {customerAddress?.length > 0 && (
              <h1>Address Book ({customerAddress.length})</h1>
            )}

            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="space-y-3"
            >
              {customerAddress?.map((address) => (
                <div
                  key={address.id}
                  className="flex items-start space-x-2 p-3 border rounded-md border-[#eee]"
                >
                  <RadioGroupItem
                    value={address.id}
                    id={address.id}
                    className="mt-1"
                  />
                  <Label htmlFor={address.id} className="flex-1 space-y-2">
                    <div className="font-[500] text-sm">{address.fullName}</div>
                    <div className="text-sm font-thin flex space-x-1">
                      {address.delivery_address}&nbsp;|&nbsp;{address.city}
                      &nbsp;-&nbsp;<span>{address?.state?.toUpperCase()}</span>
                    </div>
                    <div className="text-sm font-[500]">{address.phone}</div>
                    {address.isDefault && (
                      <div className="bg-slate-200  w-fit p-2 text-xs">
                        Default address
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </>
        )}
      </div>

      {!loading && (
        <div className="w-full p-2">
          <Link
            href="/store/checkout/addresses/create"
            className="text-[--app-bg-red]  hover:text-slate-700 transition-all  flex items-center gap-2 w-fit"
          >
            <Plus />
            Add address
          </Link>
        </div>
      )}
      <div className="w-full border-b border-[#eee] p-3 flex" />
      <div className="w-full p-4 justify-end flex items-center gap-5">
        {!isLoading && !loading && (
          <Link
            href="/store/checkout/"
            className="bg-transparent shadow-none text-[--app-bg-red] hover:bg-transparent hover:text-slate-700 transition-all"
          >
            Cancel
          </Link>
        )}
        <Button
          onClick={handleSelectedAddress}
          disabled={!selectedOption || isLoading || loading}
          className="bg-[--app-primary-color] shadow-none text-white  hover:text-white transition-all text-xs"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className=" animate-spin" />
              saving address...
            </div>
          ) : (
            "Select address"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddressBook;
