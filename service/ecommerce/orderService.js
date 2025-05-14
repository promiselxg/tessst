import { apiCall } from "@/lib/utils/api";

export const getAllOrders = async () => {
  return await apiCall("get", "/orders");
};
