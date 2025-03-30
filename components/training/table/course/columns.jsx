"use client";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowUpDown, LockIcon, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConfirmModal from "@/components/alert/alertDialog";

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
    header: "Course Thumbnail",
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
    header: "Published",
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
      const total = row.original.chapters?.length ?? 0;
      return (
        <Badge className={`bg-slate-500 ${total && "bg-sky-700"}`}>
          {total ? `${total} chapters` : "0 chapter"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { id, chapters = [] } = row.original;
      const isFree = chapters.some((chapter) => chapter.isFree);

      return (
        <div className="ml-auto pr-2 flex items-center gap-4">
          <Badge className="flex items-center gap-2">
            {isFree ? "Free" : <LockIcon className="w-4 h-5" />}
            {!isFree && "Restricted"}
          </Badge>
          <Link href={`/dashboard/training/course/${id}`} target="_blank">
            <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75" />
          </Link>
        </div>
      );
    },
  },
];
