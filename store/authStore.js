"use client";

import { signout, signin } from "@/service/authService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null, user: null });
        try {
          const user = await signin(username, password);

          // Store token in cookies
          document.cookie = `token=${user.userInfo.token}; path=/; Secure; HttpOnly`;

          set({
            user: user.userInfo,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (error) {
          set({ user: null, loading: false, error });
        }
      },

      logout: async () => {
        try {
          await signout();

          // Clear token from cookies
          document.cookie =
            "token=; path=/; Secure; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 UTC";

          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error(error);
        }
      },

      setUser: (token) => {
        set((state) => ({
          user: { ...state.user, token },
          isAuthenticated: !!token,
        }));

        // Update token in cookies
        document.cookie = `token=${token}; path=/; Secure; HttpOnly`;
      },
    }),
    { name: "userInfo" }
  )
);
