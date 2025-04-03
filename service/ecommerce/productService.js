import { apiCall } from "@/lib/utils/api";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  const response = await apiClient("/category");
  return response.data;
};
