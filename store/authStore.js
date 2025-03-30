import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const API_BASE_URL = "https://ysfon-official.vercel.app/api";
//const API_BASE_URL = "http://localhost:3000/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
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

      // ✅ Logout Function (Clears cookies & redirects)
      logoutUser: async () => {
        try {
          await axios.post(`${API_BASE_URL}/auth/logout`, {
            withCredentials: true,
          });

          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          set({ user: null, isAuthenticated: false });

          redirect("/auth/login");
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
    }
  )
);
