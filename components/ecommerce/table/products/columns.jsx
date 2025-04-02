"use client";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, EyeIcon, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CustomToolTip } from "@/components/tooltip/tooltip";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import DeleteDialog from "@/components/alert/deleteDialog";

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
    accessorKey: "name",
    header: ({ column }) => (
      <span
        className="flex items-center gap-2 cursor-pointer w-fit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { name, id, product_main_image } = row.original;
      const imageUrl =
        product_main_image?.[0].public_url || "/default-placeholder.png";

      return (
        <div className="flex items-center">
          <div className="flex items-center justify-center w-[80px] h-[80px] overflow-hidden -mt-3">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageUrl}
                width={60}
                height={60}
                priority
                alt={name || "Placeholder Image"}
                className="w-[60px] h-[60px] object-contain rounded-md"
              />
            </AspectRatio>
          </div>
          <div>
            <h1 className="font-bold">
              <Link
                href={`/product/${id}`}
                target="_blank"
                className="hover:underline hover:text-[#e97688] transition-all delay-75 capitalize"
              >
                {name}
              </Link>
            </h1>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const { price } = row.original;
      return (
        <>
          <p className="text-sm text-slate-700 font-bold">
            {formatCurrency(price)}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const { category } = row.original;
      return (
        <>
          <p className="text-sm capitalize text-slate-700">{category.name}</p>
        </>
      );
    },
  },

  {
    accessorKey: "stock",
    header: "Stock QTY",
    cell: ({ row }) => {
      const { stock } = row.original;
      return (
        <div className="flex items-center gap-2">
          <Badge
            className={`bg-sky-700 ${
              stock <= 10 ? " bg-red-800" : "bg-sky-700 "
            }`}
          >
            {stock}
          </Badge>
          <Badge
            className={`${stock <= 10 ? " bg-red-600" : "bg-sky-700 hidden"}`}
          >
            {stock <= 10 ? "low" : ""}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="ml-auto pr-2 flex items-center gap-2">
          <CustomToolTip label="View course">
            <Link href={`/training/course/${id}`} target="_blank">
              <EyeIcon className="w-5 h-5 cursor-pointer hover:opacity-75" />
            </Link>
          </CustomToolTip>
          <CustomToolTip label="Edit course">
            <Link href={`/dashboard/training/course/${id}`} target="_blank">
              <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </Link>
          </CustomToolTip>
          <CustomToolTip label="Delete course">
            <DeleteDialog id={id}>
              <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </DeleteDialog>
          </CustomToolTip>
        </div>
      );
    },
  },
];
