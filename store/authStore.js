import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/utils/host";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      loginUser: async (username, password) => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/auth/login`,
            { username, password },
            { withCredentials: true }
          );

          const { accessToken, refreshToken, user } = res.data;

          Cookies.set("accessToken", accessToken, {
            expires: 1 / 24,
            secure: true,
          });
          Cookies.set("refreshToken", refreshToken, {
            expires: 7,
            secure: true,
          });

          set({ user, isAuthenticated: true });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },
      logoutUser: async () => {
        try {
          await axios.post(`${API_BASE_URL}/auth/logout`, {
            withCredentials: true,
          });

          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          set({ user: null, isAuthenticated: false });
          window.location = window.location;
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
      setUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
    }
  )
);
