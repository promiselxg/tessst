"use client";
import { CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/authProvider";
import { apiCall } from "@/lib/utils/api";
import { Skeleton } from "@/components/ui/skeleton";

const CheckOutLoggedInUserAccountInfo = () => {
  const [customerAddress, setCustomerAddress] = useState([]);
  const { selectedCustomerAddress } = useCheckoutStore();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const defaultAddress = !selectedCustomerAddress
    ? customerAddress.find((address) => address.isDefault) ||
      customerAddress[0] ||
      null
    : null;

  const displayAddress = selectedCustomerAddress || defaultAddress;

  const isCompleted = !!displayAddress;

  useEffect(() => {
    const fetchCustomerAddress = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await apiCall("get", `/customer/address/${user.id}`);
        setCustomerAddress(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAddress();
  }, [user]);

  return (
    <div className="w-full flex-col bg-white shadow-sm rounded-[8px]">
      <div className="w-full border-b border-[#eee] p-3 flex items-center justify-between">
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-semibold",
            !isCompleted && "opacity-55"
          )}
        >
          <CheckCircle2
            className={cn(
              "w-5 h-5",
              isCompleted && "text-green-600 font-[600]"
            )}
          />
          <span className="text-sm">1. Customer Address</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={
              selectedCustomerAddress || defaultAddress
                ? "/store/checkout/addresses/"
                : "/store/checkout/addresses/create"
            }
            className="flex items-center gap-2 text-blue-600"
          >
            Change
            <FiChevronRight size={20} />
          </Link>
        </div>
      </div>

      <div className="p-3 text-sm text-slate-700 space-y-2 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center flex-col gap-4">
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : (
          <>
            <div className="w-full p-3 flex items-start justify-between flex-col">
              <h1>
                {displayAddress ? (
                  <>
                    {displayAddress.first_name} {displayAddress.last_name}
                  </>
                ) : (
                  "You have not added a delivery address"
                )}
              </h1>

              {displayAddress && (
                <span className="text-xs font-normal">
                  {displayAddress.delivery_address}&nbsp;|&nbsp;
                  {displayAddress.state}&nbsp;-&nbsp;
                  {displayAddress.city}&nbsp;|&nbsp;
                  {displayAddress.phone}
                  {displayAddress.additional_phone && (
                    <>&nbsp;|&nbsp;{displayAddress.additional_phone}</>
                  )}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOutLoggedInUserAccountInfo;
