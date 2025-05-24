import { apiCall } from "@/lib/utils/api";

export const getAllMembershiptPlans = async () => {
  return await apiCall("get", `/subscription/plan`);
};
