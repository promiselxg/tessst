import { apiCall } from "@/lib/utils/api";

export const addNewProduct = async (formData) => {
  return await apiCall("post", `/product`, { formData });
};
