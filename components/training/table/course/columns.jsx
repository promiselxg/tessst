"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/trucateText";
import { ArrowUpDown, Edit2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export const columns = [
  {
    accessorKey: "vehicle_name",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vehicle Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { id, vehicle_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} font-bold`)}>
              <Link
                href={`/cars/${id}`}
                target="_blank"
                className="hover:underline hover:text-[#e97688] transition-all delay-75 capitalize"
              >
                {vehicle_name}
              </Link>
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { description } = row.original;
      return (
        <>
          <div className="w-fit">
            <p>{truncateText(description, 50)}</p>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "vehicle_type",
    header: "Car Make",
    cell: ({ row }) => {
      const { vehicle_type } = row.original;
      return (
        <>
          <div className="w-1/2">
            <p className="uppercase">{vehicle_type}</p>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Car Model",
    cell: ({ row }) => {
      const { model } = row.original;
      return (
        <>
          <div className="w-1/2">
            <p className="uppercase">{model}</p>
          </div>
        </>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const { amount } = row.original;
      return (
        <>
          <div className="w-1/2">
            <p className={cn(`${raleway.className} font-bold`)}>
              {formatCurrency(amount)}
            </p>
          </div>
        </>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="text-red-400 flex items-center gap-2 cursor-pointer">
              <Link
                href={`/admin/cars/edit/${id}`}
                className="flex items-center gap-2"
              >
                <Edit2 size={12} /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteBtn(id, "car")}
              className="text-red-400 flex items-center gap-2 cursor-pointer"
            >
              <FiTrash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
