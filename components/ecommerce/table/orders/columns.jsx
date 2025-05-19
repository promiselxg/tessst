"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  CreditCard,
  Hash,
  HelpCircle,
  Package,
  User2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatDateTime } from "@/lib/utils/getDateDifference";
import StatusBadge from "../../status-badge";
import PaymentMethodBadge from "../../payment-method-badge";

import ActionMenu from "@/components/menu/action-menu";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "user",
    header: () => (
      <div className="flex items-center gap-1">
        <User2 className="w-4 h-4 text-slate-600" />
        <span>Customer</span>
      </div>
    ),
    cell: ({ row }) => {
      const { user } = row.original;
      return (
        <>
          <p className="text-xs text-slate-700 font-bold">{user?.name}</p>
          <p className="text-xs">{user?.email}</p>
        </>
      );
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
    accessorKey: "orderItems",
    header: () => (
      <div className="flex items-center gap-1">
        <Package className="w-4 h-4 text-slate-600" />
        <span>Items</span>
      </div>
    ),
    cell: ({ row }) => {
      const orderItems = row.original.orderItems;
      return (
        <>
          <p className="text-sm capitalize text-slate-700 text-center">
            {orderItems?.length ?? 0}
          </p>
        </>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4 text-slate-600" />
        <span>Order Date</span>
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
    header: () => (
      <div className="flex items-center gap-1">
        <HelpCircle className="w-4 h-4 text-slate-600" />
        <span>Order Status</span>
      </div>
    ),
    cell: ({ row }) => {
      const { orderStatus } = row.original;
      return <StatusBadge status={orderStatus} variant="order" />;
    },
  },
  {
    accessorKey: "payment",
    header: () => (
      <div className="flex items-center gap-1">
        <CreditCard className="w-4 h-4 text-slate-600" />
        <span>Payment Method</span>
      </div>
    ),
    cell: ({ row }) => {
      const method = row.original.payment?.method;
      return <PaymentMethodBadge method={method} />;
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
