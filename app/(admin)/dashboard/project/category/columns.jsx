"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";

import { CustomToolTip } from "@/components/tooltip/tooltip";
import DeleteDialog from "@/components/alert/deleteDialog";
import { formatDateWithoutTime } from "@/lib/utils/getDateDifference";
import { UpdateCategory } from "./update-category";

export const categoryColumns = [
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
    accessorKey: "title",
    header: "Category Name",
    cell: ({ row }) => {
      const { title } = row.original;
      return (
        <>
          <p className="text-sm capitalize text-slate-700 font-[600]">
            {title}
          </p>
        </>
      );
    },
  },

  {
    accessorKey: "_count",
    header: "Projects Count",
    cell: ({ row }) => {
      const { _count } = row.original;
      return (
        <>
          <Badge
            variant={_count?.blogs > 0 ? "success" : "destructive"}
            className="capitalize"
          >
            {_count?.blogs} {`${_count?.projects > 1 ? "Projects" : "Project"}`}
          </Badge>
        </>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Published At",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <p className="text-sm text-slate-700">
          {formatDateWithoutTime(createdAt)}
        </p>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { title, id } = row.original;
      return (
        <div className="ml-auto pr-2 flex items-center gap-2">
          <CustomToolTip label="Edit category">
            <UpdateCategory
              tab="project_categories"
              id={id}
              initialData={title}
            >
              <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </UpdateCategory>
          </CustomToolTip>
          <CustomToolTip label="Delete category">
            <DeleteDialog
              id={id}
              endpoint={`/project/category`}
              label="Delete this category?, this action cannot be undone."
            >
              <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </DeleteDialog>
          </CustomToolTip>
        </div>
      );
    },
  },
];
