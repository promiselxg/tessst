"use client";
import DeleteDialog from "@/components/alert/deleteDialog";
import { CustomToolTip } from "@/components/tooltip/tooltip";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { formatDateTime } from "@/lib/utils/getDateDifference";
import { Calendar, Hash, Mail, Pencil, Trash2, User } from "lucide-react";
import Link from "next/link";

export const useCustomersColumns = () => {
  const columns = [
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
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-1">
          <User className="w-4 h-4 text-slate-600" />
          <span>Name</span>
        </div>
      ),
      cell: ({ row }) => {
        const { customerId, name } = row.original;

        return (
          <Link
            href={`/dashboard/ecommerce/customers/${customerId}`}
            className="text-sky-700"
          >
            <p className="text-sm text-sky-700 font-bold hover:underline">
              {name}
            </p>
          </Link>
        );
      },
    },
    {
      accessorKey: "productCount",
      header: () => (
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4 text-slate-600" />
          <span>Email</span>
        </div>
      ),
      cell: ({ row }) => {
        const { email } = row.original;

        return (
          <>
            <p className="text-sm text-slate-700 font-bold ">{email}</p>
          </>
        );
      },
    },
    {
      accessorKey: "phone",
      header: () => (
        <div className="flex items-center gap-1">
          <Hash className="w-4 h-4 text-slate-600" />
          <span>Phone</span>
        </div>
      ),
      cell: ({ row }) => {
        const { phone } = row.original;

        return (
          <>
            <p className="text-sm text-slate-700 font-bold ">{phone}</p>
          </>
        );
      },
    },
    {
      accessorKey: "totalPaidOrders",
      header: () => (
        <div className="flex items-center gap-1">
          <Hash className="w-4 h-4 text-slate-600" />
          <span>Fullfilled Orders</span>
        </div>
      ),
      cell: ({ row }) => {
        const { totalPaidOrders } = row.original;
        const color = totalPaidOrders > 0 ? "bg-green-700" : "bg-red-200";
        return (
          <div className="text-center">
            <Badge className={cn("", color)}>{totalPaidOrders}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "totalPaidOrders",
      header: () => (
        <div className="flex items-center gap-1">
          <Hash className="w-4 h-4 text-slate-600" />
          <span>Canclled Orders</span>
        </div>
      ),
      cell: ({ row }) => {
        const { totalCancelledOrders } = row.original;
        const color = totalCancelledOrders > 0 ? "bg-red-500" : "bg-green-200";
        return (
          <div className="text-center">
            <Badge className={cn("", color)}>{totalCancelledOrders}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmountPaid",
      header: () => (
        <div className="flex items-center gap-1">
          &#8358;
          <span>Amount spent</span>
        </div>
      ),
      cell: ({ row }) => {
        const { totalAmountPaid } = row.original;

        return (
          <>
            <p className="text-sm text-slate-700 font-bold ">
              {formatCurrency(totalAmountPaid)}
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
          <span>Date</span>
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
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const { name, id } = row.original;
        return (
          <div className="ml-auto pr-2 flex items-center gap-2">
            <CustomToolTip label="Edit Customer">
              <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </CustomToolTip>
            <CustomToolTip label="Delete Customer">
              <DeleteDialog
                id={id}
                endpoint={`/customer`}
                label="Are you sure you want to delete this customer?"
              >
                <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-75" />
              </DeleteDialog>
            </CustomToolTip>
          </div>
        );
      },
    },
  ];

  return columns;
};
