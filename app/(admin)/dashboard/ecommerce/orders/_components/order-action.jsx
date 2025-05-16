import {
  Archive,
  ChevronDown,
  Edit2,
  File,
  Printer,
  Recycle,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OrderActionDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
      More options <ChevronDown className="w-4 h-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-48 text-gray-400">
      <DropdownMenuItem>
        <X className="w-3 h-3" /> Cancel order
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Edit2 className="w-3 h-3" /> Edit order
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Printer className="w-3 h-3" /> Print order
      </DropdownMenuItem>
      <DropdownMenuItem>
        <File className="w-3 h-3" /> Generate Invoice
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Recycle className="w-3 h-3" /> Initiate Refund
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Archive className="w-3 h-3" /> Archive
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default OrderActionDropdown;
