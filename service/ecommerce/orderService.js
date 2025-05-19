import { apiCall } from "@/lib/utils/api";

export const getAllOrders = async () => {
  return await apiCall("get", "/orders");
};

export const getSingleOrderById = async (orderId) => {
  return await apiCall("get", `/orders/order/${orderId}`);
};

export const markOrderAsPaid = async (body) => {
  return await apiCall("patch", `/orders`, { body });
};

export const cancelOrder = async (orderId, reason) => {
  return await apiCall("patch", `/orders/order/${orderId}`, { reason });
};

export const archiveOrder = async (orderId) => {
  return await apiCall("get", `/orders/order/${orderId}`);
};

export const refundOrder = async (orderId) => {
  return await apiCall("get", `/orders/order/${orderId}`);
};
