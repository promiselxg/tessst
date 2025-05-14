"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Eye, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ActionMenu({ id, onView, onExport }) {
  return (
    <div className="ml-auto pr-2 flex items-center">
      <div className="flex overflow-hidden rounded-md border">
        {/* View Button */}
        <Button
          className="rounded-none w-14"
          size="icon"
          variant="outline"
          onClick={() => onView?.(id)}
        >
          <Eye />
        </Button>

        {/* Export Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-none border-l-0 w-14"
            >
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white shadow-lg">
            {["excel", "csv", "pdf"].map((format) => (
              <DropdownMenuItem
                key={format}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onExport?.(id, format)}
              >
                <Image
                  src={`/img/${format}-icon.svg`}
                  alt={format}
                  width={20}
                  height={20}
                />
                {format.toUpperCase()}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
