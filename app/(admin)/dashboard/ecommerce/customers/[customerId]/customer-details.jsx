"use client";

import UserAvatar from "@/components/avatar/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { timeAgo } from "@/lib/utils/getDateDifference";
import { getSingleCustomerInfo } from "@/service/ecommerce/customerService";
import { Lock, Mail, Phone, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CustomerOrderTable } from "./data-table";
import { columns } from "./columns";
import CustomerInfoCard from "../../orders/_components/order-customer-info";
import CustomerOrderInfoSkeleton from "@/components/skeleton/customer-order-info-skeleton";

const CustomerDetails = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCustomerInfo = async () => {
      try {
        setLoading(true);
        const response = await getSingleCustomerInfo(customerId);

        if (isMounted) {
          setCustomer(response.customer);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCustomerInfo();

    return () => {
      isMounted = false;
    };
  }, [customerId]);

  if (loading) {
    return <CustomerOrderInfoSkeleton />;
  }

  const order = {
    user: {
      name: customer?.name,
      avatar: customer?.avatar || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    },
  };

  return (
    <div className="p-6 bg-[whitesmoke] min-h-screen space-y-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{customer?.name}</h1>
        </div>
      </div>

      <div className="w-full flex justify-between gap-4">
        <div className="w-9/12 flex flex-col gap-5">
          <div className="w-full flex items-center justify-between bg-white border rounded-[8px] p-4">
            <div className="flex items-center gap-5">
              <UserAvatar username={customer?.name} />
              <div className="text-sm text-gray-600 leading-tight">
                <h1>{customer?.name}</h1>
                {customer?.createdAt && (
                  <p>Customer since {timeAgo(customer?.createdAt)}</p>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none border border-[#eee] px-6 py-2 text-blue-300 text-sm rounded-[5px] hover:text-slate-700 transition-all delay-100">
                Actions
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem className="text-sm flex items-center gap-4 text-gray-500 font-thin cursor-pointer">
                  <a
                    href={`mailto:${customer?.email}`}
                    className="flex items-center gap-4"
                    target="_blank"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm flex items-center gap-4 text-gray-500 font-thin cursor-pointer">
                  <Phone className="w-4 h-4" />
                  Call
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm flex items-center gap-4 text-gray-500 font-thin cursor-pointer">
                  <Lock className="w-4 h-4" />
                  Suspend
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm flex items-center gap-4 font-thin cursor-pointer text-red-600">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="bg-white border rounded-[8px]">
            <div className="w-full flex items-center justify-between p-5 border-b">
              <h1 className="text-sm font-semibold">Orders placed</h1>
            </div>
            <div className="py-4 w-full">
              <CustomerOrderTable
                columns={columns}
                data={customer?.orders || []}
                loading={loading}
              />
            </div>
          </div>
        </div>

        <div className="w-1/4 h-fit rounded-[8px] overflow-hidden">
          <CustomerInfoCard order={order} />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
