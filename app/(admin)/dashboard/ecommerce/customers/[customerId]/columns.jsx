"use client";
import StatusBadge from "@/components/ecommerce/status-badge";
import ActionMenu from "@/components/menu/action-menu";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatDateTime } from "@/lib/utils/getDateDifference";
import { ArrowUpDown, Calendar, Hash, HelpCircle } from "lucide-react";
export const columns = [
  {
    accessorKey: "order_Id",
    header: () => (
      <div className="flex items-center gap-1">
        <Hash className="w-4 h-4 text-slate-600" />
        <span>Order ID</span>
      </div>
    ),
    cell: ({ row }) => {
      const { order_Id } = row.original;

      return (
        <>
          <p className="text-sm text-slate-700 font-bold">{order_Id}</p>
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <Calendar className="w-4 h-4 text-slate-600" />
        <span>Order Date</span>
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <>
          <p className="text-xs capitalize text-slate-700">
            {formatDateTime(createdAt)}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <HelpCircle className="w-4 h-4 text-slate-600" />
        <span>Order Status</span>
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const { orderStatus } = row.original;
      return <StatusBadge status={orderStatus} variant="order" />;
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="flex items-center gap-1">
        &#8358;
        <span>Total</span>
      </div>
    ),
    cell: ({ row }) => {
      const { amount } = row.original;
      return (
        <>
          <p className="text-sm capitalize text-slate-700 font-bold">
            {formatCurrency(amount)}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { order_Id, id } = row.original;
      return (
        <ActionMenu
          id={id}
          orderId={order_Id}
          onView={(orderId) => console.log("View", orderId)}
          onExport={(id, format) => console.log("Export", format, "for ID", id)}
        />
      );
    },
  },
];
