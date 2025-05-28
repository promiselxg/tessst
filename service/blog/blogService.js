import { apiCall } from "@/lib/utils/api";

export const getAllPost = async () => {
  return await apiCall("get", "/blog/post");
};

export const getAllBlogCategories = async () => {
  return await apiCall("get", "/blog/category");
};
