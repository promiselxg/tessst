import { apiCall } from "@/lib/utils/api";

export const createNewCompetition = async (formData) => {
  return await apiCall("post", `/competition`, { formData });
};

export const admingetAllCompetitions = async (status) => {
  return await apiCall("get", `/competition?status=${status}`);
};

export const getAllCompetitions = async () => {
  const response = await apiClient("/competition");
  return response.data;
};
