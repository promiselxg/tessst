"use client";
import DeleteDialog from "@/components/alert/deleteDialog";
import { CustomToolTip } from "@/components/tooltip/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateTime } from "@/lib/utils/getDateDifference";
import { Calendar, Hash, Pencil, Trash2, User } from "lucide-react";
import Link from "next/link";
import { UpdateCategory } from "./update-category";

export const useCourseCategoryColumns = () => {
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
          <span>Category Name</span>
        </div>
      ),
      cell: ({ row }) => {
        const { name } = row.original;

        return (
          <>
            <p className="text-sm text-slate-700 font-bold">{name}</p>
          </>
        );
      },
    },
    {
      accessorKey: "courseCount",
      header: () => (
        <div className="flex items-center gap-1">
          <Hash className="w-4 h-4 text-slate-600" />
          <span>Course Count</span>
        </div>
      ),
      cell: ({ row }) => {
        const { courseCount } = row.original;

        return (
          <>
            <p className="text-sm text-slate-700 font-bold ">{courseCount}</p>
          </>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-slate-600" />
          <span>Created Date</span>
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
            <CustomToolTip label="Edit Category">
              <UpdateCategory tab="training" id={id} initialData={name}>
                <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75" />
              </UpdateCategory>
            </CustomToolTip>
            <CustomToolTip label="Delete Category">
              <DeleteDialog
                id={id}
                endpoint={`/training/course/category`}
                label="Are you sure you want to delete this category?"
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
