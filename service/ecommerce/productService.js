import { apiCall } from "@/lib/utils/api";
import { apiClient } from "@/lib/utils/host";

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

export const getSingleProduct = async (productId) => {
  const response = await apiClient(`/product/${productId}`);
  return response.data;
};

export const getAllCategories = async () => {
  try {
    const response = await apiClient("/category");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
