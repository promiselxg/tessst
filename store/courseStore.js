import { create } from "zustand";
import { apiCall } from "@/lib/utils/api";

const useCourseStore = create((set, get) => ({
  course: null,
  loading: false,

  fetchCourseInfo: async (courseId, router) => {
    //if (get().course) return;
    set({ loading: true });
    try {
      const response = await apiCall("GET", `/training/course/${courseId}`);
      if (!response || Object.keys(response).length === 0) {
        router.replace("/dashboard");
      }
      set({ course: response?.course });
    } catch (error) {
      router.replace("/dashboard");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCourseStore;
