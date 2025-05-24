"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Eye, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ActionMenu({ id, orderId }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/dashboard/ecommerce/orders/${orderId}`);
  };

  const handleExport = (format) => {
    console.log("Export", format, "for ID", id);
  };

  return (
    <div className="ml-auto pr-2 flex items-center">
      <div className="flex overflow-hidden gap-2">
        <Button className="" size="icon" variant="outline" onClick={handleView}>
          <Eye />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="outline-none active:outline-none background-transparent"
            >
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white outline-none border-none">
            {["excel", "csv", "pdf", "invoice"].map((format) => (
              <DropdownMenuItem
                key={format}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleExport(format)}
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
