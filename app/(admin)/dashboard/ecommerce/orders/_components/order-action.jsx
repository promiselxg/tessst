import ConfirmAlertModal from "@/components/alert/confirm-alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOrderActions } from "@/hooks/use-order-action";
import {
  ChevronDown,
  X,
  Printer,
  File,
  Recycle,
  Archive,
  Check,
} from "lucide-react";

const OrderActionDropdown = ({ orderId, status, body }) => {
  const {
    loadingAction,
    handleCancelOrder,
    handleArchiveOrder,
    handleRefundOrder,
    handlePaidOrder,
  } = useOrderActions();

  const disableButton =
    status?.toLowerCase() === "paid" || status?.toLowerCase() === "cancelled";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        More options <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 text-gray-400">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {disableButton ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <Check className="w-3 h-3" />
                  Mark order as paid
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {status?.toLowerCase() === "paid" && (
                  <p>Order already paid for</p>
                )}
                {status?.toLowerCase() === "cancelled" && (
                  <p>Order already cancelled.</p>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <ConfirmAlertModal
              title="Mark order as Paid?"
              description="Make sure this order has been paid as this action will cannot be undone."
              confirmText="Mark Order as Paid"
              isLoading={loadingAction === "paid"}
              onConfirm={() => handlePaidOrder(body)}
            >
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3" />
                Mark order as paid
              </div>
            </ConfirmAlertModal>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {disableButton ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <X className="w-3 h-3" />
                  Cancel order
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {status?.toLowerCase() === "paid" && (
                  <p>Paid order cannot be cancelled.</p>
                )}
                {status?.toLowerCase() === "cancelled" && (
                  <p>Order already cancelled.</p>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <ConfirmAlertModal
              title="Cancel this order?"
              description="This action will cancel the order and cannot be undone."
              confirmText="Cancel Order"
              requireReason
              isLoading={loadingAction === "cancel"}
              onConfirm={(reason) => handleCancelOrder(orderId, reason)}
            >
              <div className="flex items-center gap-2">
                <X className="w-3 h-3" />
                Cancel order
              </div>
            </ConfirmAlertModal>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <Printer className="w-3 h-3" />
            Print order
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <File className="w-3 h-3" />
            Generate Invoice
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {disableButton ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <X className="w-3 h-3" />
                  Cancel order
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {status?.toLowerCase() === "paid" && (
                  <p>Paid order cannot be cancelled.</p>
                )}
                {status?.toLowerCase() === "cancelled" && (
                  <p>Order already cancelled.</p>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <ConfirmAlertModal
              title="Initiate refund?"
              description="This action will begin the refund process."
              confirmText="Refund"
              requireReason
              isLoading={loadingAction === "refund"}
              onConfirm={(reason) => handleRefundOrder(orderId, reason)}
            >
              <div className="flex items-center gap-2">
                <Recycle className="w-3 h-3" />
                Initiate Refund
              </div>
            </ConfirmAlertModal>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ConfirmAlertModal
            title="Archive this order?"
            description="You can find archived orders in the archive tab."
            confirmText="Archive"
            onConfirm={() => handleArchiveOrder(orderId)}
            isLoading={loadingAction === "archive"}
          >
            <div className="flex items-center gap-2">
              <Archive className="w-3 h-3" />
              Archive
            </div>
          </ConfirmAlertModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActionDropdown;
