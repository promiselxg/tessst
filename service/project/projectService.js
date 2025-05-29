import { apiCall } from "@/lib/utils/api";
import { apiClient } from "@/lib/utils/host";

export const createNewProject = async (formData) => {
  return await apiCall("post", `/project`, { formData });
};

export const getAllProjects = async () => {
  const response = await apiClient("/project");
  return response.data;
};

export const admingetAllProjects = async () => {
  return await apiCall("get", "/project");
};

export const getAllProjectCategories = async () => {
  return await apiCall("get", "/project/category");
};

export const getSingleProject = async (projectId) => {
  const response = await apiClient(`/project/${projectId}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await apiClient("/blog/category");
  return response.data;
};
