"use client";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, EyeIcon, LockIcon, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CustomToolTip } from "@/components/tooltip/tooltip";

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
        Course Title
        <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const { title, id } = row.original;
      return (
        <h1 className="font-bold">
          <Link
            href={`/dashboard/training/course/${id}`}
            target="_blank"
            className="hover:underline hover:text-[#e97688] transition-all delay-75 capitalize"
          >
            {title}
          </Link>
        </h1>
      );
    },
  },
  {
    accessorKey: "asset",
    header: "Image thumbnail",
    cell: ({ row }) => {
      const { title, asset } = row.original;
      const imageUrl = asset?.publicUrl || "/default-placeholder.png";

      return (
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
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const statusMap = {
        false: { label: "Draft", color: "bg-slate-500" },
        true: { label: "Published", color: "bg-sky-700" },
      };

      const transactionStatus = Boolean(row.original.isPublished);
      const { label = "Unknown", color = "text-gray-500" } =
        statusMap[transactionStatus] || {};

      return <Badge className={cn(`${color}`)}>{label}</Badge>;
    },
  },
  {
    accessorKey: "chapters",
    header: "Chapters",
    cell: ({ row }) => {
      const publishedChapters =
        row.original.chapters?.filter((chapter) => chapter.isPublished) ?? [];
      const total = publishedChapters.length;

      return (
        <Badge className={`bg-slate-500 ${total > 0 ? "bg-sky-700" : ""}`}>
          {total}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isFree",
    header: "Access Level",
    cell: ({ row }) => {
      const { chapters = [] } = row.original;
      const isFree = chapters.some((chapter) => chapter.isFree);
      return (
        <div className="ml-auto pr-2 flex items-center gap-4">
          <Badge
            className={`flex items-center gap-2 ${
              isFree ? "bg-sky-700" : "bg-slate-500"
            }`}
          >
            {isFree ? "Free" : <LockIcon className="w-4 h-5" />}
            {!isFree && "Requires login"}
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
            <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-75" />
          </CustomToolTip>
        </div>
      );
    },
  },
];
