import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ConfirmAlertModal = ({
  children,
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
  isLoading,
  requireReason = false,
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleConfirm = async () => {
    const success = await onConfirm(requireReason ? reason : undefined);
    if (success) {
      setOpen(false);
      setReason("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {requireReason && (
          <div className="mt-2 space-y-2">
            <label
              htmlFor="reason"
              className="text-sm font-medium text-gray-700"
            >
              Reason
            </label>

            <Textarea
              rows={3}
              id="reason"
              placeholder="Please provide a reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              disabled={isLoading}
              className="w-full resize-none"
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || (requireReason && reason.trim() === "")}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                <span className="text-sm italic">Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlertModal;
