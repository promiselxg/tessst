import { apiCall } from "@/lib/utils/api";

export const getAllCustomers = async () => {
  return await apiCall("get", "/customer");
};

export const getSingleCustomerInfo = async (customerId) => {
  return await apiCall("get", `/customer/${customerId}`);
};
