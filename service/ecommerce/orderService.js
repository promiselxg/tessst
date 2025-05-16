import { apiCall } from "@/lib/utils/api";

export const getAllOrders = async () => {
  return await apiCall("get", "/orders");
};

export const getSingleOrderById = async (orderId) => {
  return await apiCall("get", `/orders/order/${orderId}`);
};
