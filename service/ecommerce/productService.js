import { apiCall } from "@/lib/utils/api";

export const addNewProduct = async (formData) => {
  return await apiCall("post", `/product`, { formData });
};

export const getProductCategories = async () => {
  return await apiCall("get", "/category");
};

export const getAllProducts = async () => {
  return await apiCall("get", "/product");
};

export const getInStockProducts = async () => {
  return await apiCall("get", "/product");
};
