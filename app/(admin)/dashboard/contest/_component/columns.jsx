"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, EyeIcon, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CustomToolTip } from "@/components/tooltip/tooltip";
import DeleteDialog from "@/components/alert/deleteDialog";
import { truncateText } from "@/lib/utils/trucateText";
import { formatDateWithoutTime } from "@/lib/utils/getDateDifference";

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
    accessorKey: "title",
    header: ({ column }) => (
      <span
        className="flex items-center gap-2 cursor-pointer w-fit"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { title, id, image } = row.original;
      const imageUrl = image[0]?.public_url || "/default-placeholder.png";

      return (
        <div className="flex items-center">
          <div className="flex items-center justify-center w-[80px] h-[80px] overflow-hidden -mt-3">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={imageUrl}
                width={60}
                height={60}
                priority
                alt={title || "Placeholder Image"}
                className="w-[60px] h-[60px] object-contain rounded-md"
              />
            </AspectRatio>
          </div>
          <div>
            <h1 className="font-bold text-sm">
              <Link
                href={`/resources/contest/${id}`}
                target="_blank"
                className="hover:underline hover:text-[#e97688] transition-all delay-75 line-clamp-1"
              >
                {truncateText(title, 50)}
              </Link>
            </h1>
          </div>
        </div>
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
          <p
            className="text-sm text-slate-700"
            dangerouslySetInnerHTML={{ __html: truncateText(description, 50) }}
          />
        </>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const { startDate } = row.original;
      return (
        <>
          <p className="text-sm capitalize text-slate-700">
            {formatDateWithoutTime(startDate)}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const { endDate } = row.original;

      return (
        <div className="flex items-center gap-2">
          <p className="text-sm capitalize text-slate-700">
            {formatDateWithoutTime(endDate)}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "submissions",
    header: "Submissions",
    cell: ({ row }) => {
      const { _count } = row.original;
      return <p className="text-sm text-slate-700">{_count.submissions}</p>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="ml-auto pr-2 flex items-center gap-2">
          <CustomToolTip label="View contest">
            <Link href={`/resources/contest/${id}`} target="_blank">
              <EyeIcon className="w-5 h-5 cursor-pointer hover:opacity-75" />
            </Link>
          </CustomToolTip>
          <CustomToolTip label="Edit contest">
            <Link href={`/dashboard/contest/${id}/edit`}>
              <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </Link>
          </CustomToolTip>
          <CustomToolTip label="Delete contest">
            <DeleteDialog
              id={id}
              endpoint={`/competition`}
              label="Delete this contest?, this action cannot be undone."
            >
              <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-75" />
            </DeleteDialog>
          </CustomToolTip>
        </div>
      );
    },
  },
];
