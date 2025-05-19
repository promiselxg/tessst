import {
  archiveOrder,
  cancelOrder,
  markOrderAsPaid,
  refundOrder,
} from "@/service/ecommerce/orderService";

import { useState } from "react";
import { toast } from "sonner";

export const useOrderActions = () => {
  const [loadingAction, setLoadingAction] = useState("");

  const withLoading = async (actionKey, callback) => {
    try {
      setLoadingAction(actionKey);
      const result = await callback();
      return result;
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
      return false;
    } finally {
      setLoadingAction("");
    }
  };

  const handleCancelOrder = async (orderId, reason) => {
    return await withLoading("cancel", async () => {
      try {
        await cancelOrder(orderId, reason);
        toast.success("Order cancelled successfully");
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel order");
        return false;
      }
    });
  };

  const handleArchiveOrder = async (orderId) => {
    return await withLoading("archive", async () => {
      try {
        await archiveOrder(orderId);
        toast.success("Order archived");
        return true;
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel order");
        return false;
      }
    });
  };

  const handleRefundOrder = async (orderId, reason) => {
    return await withLoading("cancel", async () => {
      try {
        await refundOrder(orderId, reason);
        toast.success("Refund initiated");
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel order");
        return false;
      }
    });
  };

  const handlePaidOrder = async (body) => {
    return await withLoading("paid", async () => {
      try {
        await markOrderAsPaid(body);
        toast.success("Order marked as paid");
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error(error?.message || "Failed to mark order as paid");
        return false;
      }
    });
  };

  return {
    loadingAction,
    handleCancelOrder,
    handleArchiveOrder,
    handleRefundOrder,
    handlePaidOrder,
  };
};
