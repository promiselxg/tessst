import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // Login Function
      loginUser: async (username, password) => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/auth/login`,
            { username, password },
            { withCredentials: true }
          );

          const { accessToken, refreshToken, user } = res.data;

          // Store tokens in cookies
          Cookies.set("accessToken", accessToken, {
            expires: 1 / 24,
            secure: true,
          });
          Cookies.set("refreshToken", refreshToken, {
            expires: 7,
            secure: true,
          });

          // Update Zustand store
          set({ user, isAuthenticated: true });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },

      // Check authentication state
      checkAuth: async () => {
        try {
          const accessToken = Cookies.get("accessToken");
          if (!accessToken) throw new Error("No access token");

          const res = await axios.get(`${API_BASE_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          set({ user: res.data.user, isAuthenticated: true });
        } catch (error) {
          console.warn("Token expired. Refreshing...");
          await get().refreshAuth();
        }
      },

      // Refresh authentication
      refreshAuth: async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/auth/refresh`, {
            withCredentials: true,
          });

          Cookies.set("accessToken", res.data.accessToken, {
            expires: 1 / 24,
            secure: true,
          });
          set({ isAuthenticated: true });
        } catch (error) {
          console.warn("Refresh token failed. Logging out.");
          get().logoutUser();
        }
      },

      // Logout Function
      logoutUser: () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "userInfo", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage instead of sessionStorage
    }
  )
);
