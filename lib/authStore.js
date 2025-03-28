import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation"; // ✅ Import redirect

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // ✅ Login Function
      loginUser: async (username, password) => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/auth/login`,
            { username, password },
            { withCredentials: true }
          );

          const { accessToken, refreshToken, user } = res.data;

          // ✅ Store tokens in cookies
          Cookies.set("accessToken", accessToken, {
            expires: 1 / 24,
            secure: true,
          });
          Cookies.set("refreshToken", refreshToken, {
            expires: 7,
            secure: true,
          });

          // ✅ Update Zustand store
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

          // ✅ Clear cookies
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          // ✅ Update Zustand store
          set({ user: null, isAuthenticated: false });

          // ✅ Redirect to login
          redirect("/auth/login"); // Automatically redirects
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
