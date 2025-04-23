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
