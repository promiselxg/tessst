import { api } from "@/lib/utils/api";

export const refreshAuthToken = async () => {
  try {
    await api.post("/auth/refresh");
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};
