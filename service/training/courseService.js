import { apiCall } from "@/lib/utils/api";
import { apiClient } from "@/lib/utils/host";

export const getAllTrainingCategories = async () => {
  try {
    const { data } = await apiClient("/category");
    return data.categories;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPublishedCourses = async () => {
  return await apiCall("get", `/training/course/published`);
};

export const getAllTrainingProgress = async () => {
  return await apiCall("get", `/training/course/progress/${courseId}`);
};

export const getTrainingProgress = async (courseId) => {
  return await apiCall("get", `/training/course/progress/${courseId}`);
};
