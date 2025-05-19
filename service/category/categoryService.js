import { apiCall } from "@/lib/utils/api";

export const getAllProductCategories = async () => {
  return await apiCall("get", "/category");
};

export const getAllCourseCategories = async () => {
  return await apiCall("get", "/training/course/category");
};
