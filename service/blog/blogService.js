import { apiCall } from "@/lib/utils/api";
import { apiClient } from "@/lib/utils/host";

export const createNewPost = async (formData) => {
  return await apiCall("post", `/blog/post`, { formData });
};

export const getAllPost = async () => {
  return await apiCall("get", "/blog/post");
};

export const getAllBlogCategories = async () => {
  return await apiCall("get", "/blog/category");
};

export const getSinglePost = async (postId) => {
  const response = await apiClient(`/blog/post/${postId}`);
  return response.data;
};

export const getAllCategories = async () => {
  try {
    const response = await apiClient("/blog/category");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
