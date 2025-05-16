"use client";

import React, { useEffect, useState } from "react";
import { OrderHeader } from "../_components/order-header";
import OrderActionDropdown from "../_components/order-action";
import { Separator } from "@/components/ui/separator";
import OrderItemCard from "../_components/order-item-card";
import OrderSummaryRow from "../_components/order-summary-row";
import ShippingTimeline from "@/components/timeline/order-shipping-timeline";
import CustomerInfoCard from "../_components/order-customer-info";
import { getSingleOrderById } from "@/service/ecommerce/orderService";
import { Skeleton } from "@/components/ui/skeleton";

const logs = [
  {
    status: "Package has dispatched",
    timestamp: "2023-08-18T06:29:00Z",
  },
  {
    status: "Tracking number",
    timestamp: "2023-08-18T06:29:00Z",
    note: "3981241023109293",
  },
  {
    status: "Package arrived at the final delivery station",
    timestamp: "2023-08-19T02:00:00Z",
  },
  {
    status: "Out for delivery",
    timestamp: "2023-08-19T02:38:00Z",
  },
  {
    status: "Delivered",
    timestamp: "2023-08-19T04:17:00Z",
  },
];

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const subtotal =
    order?.orderItems?.reduce((acc, item) => {
      return acc + item.quantity * parseFloat(item.price);
    }, 0) || 0;

  const total = subtotal + Number(order?.delivery_fee || 0);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const response = await getSingleOrderById(orderId);
      setOrder(response.order);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="p-6 bg-[whitesmoke] min-h-screen space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[60%]" />
          <Skeleton className="h-8 w-20 mr-10" />
        </div>
        <Separator className="my-4" />
        <div className="flex gap-5">
          <div className="w-[70%] flex flex-col space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="border rounded-[8px] border-[#eee] space-y-4 p-4 bg-white">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div>
              <Skeleton className="h-12 w-[50%]" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[90%]" />
                <Skeleton className="h-5 w-[80%]" />
              </div>
            </div>
          </div>
          <div className="w-[30%] space-y-4">
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[whitesmoke] min-h-screen space-y-4">
      <div className="flex items-center justify-between">
        <OrderHeader
          orderId={orderId}
          paymentStatus={order?.paymentStatus}
          fulfillmentStatus={order?.orderStatus}
          date={order?.paidAt ?? order?.createdAt}
        />
        <div className="mr-10 text-sky-500 text-sm">
          <OrderActionDropdown />
        </div>
      </div>
      <Separator className="my-4" />

      <div className="flex gap-5">
        <div className="w-[70%] flex flex-col">
          <div className="bg-white p-4 border border-b-0">
            <h1 className="text-lg font-semibold flex items-center gap-3">
              Order Detail{" "}
              <span className="bg-gray-400 text-white rounded-full px-2">
                {order?.orderItems?.length}
              </span>
            </h1>
          </div>

          <div className="border rounded-[8px] border-[#eee]">
            {order?.orderItems?.map((item) => (
              <OrderItemCard key={item.id} {...item} />
            ))}
            <OrderSummaryRow label="Subtotal" value={subtotal} />
            <OrderSummaryRow label="Delivery Fee" value={order?.delivery_fee} />
            <OrderSummaryRow label="Total" value={total} bold />
          </div>

          {order?.shippingLogs.length !== 0 && (
            <div className="mt-5">
              <div className="bg-white p-4 border border-b-0">
                <h1 className="text-lg font-semibold">Shipping activity</h1>
              </div>
              <ShippingTimeline logs={order?.shippingLogs} />
            </div>
          )}
        </div>

        <div className="w-[30%]">
          <CustomerInfoCard order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
