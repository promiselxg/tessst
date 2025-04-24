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
<<<<<<< HEAD

export const getAllPublishedCourses = async () => {
  return await apiCall("get", `/training/course/published`);
};

export const getAllTrainingProgress = async () => {
  return await apiCall("get", `/training/course/progress/${courseId}`);
};

export const getTrainingProgress = async (courseId) => {
  return await apiCall("get", `/training/course/progress/${courseId}`);
};
=======
>>>>>>> c81a9ca2e0946054da44efaf67fe42ec66e66886
