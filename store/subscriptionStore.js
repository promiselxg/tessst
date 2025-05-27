import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useSubscriptionStore = create(
  persist(
    (set) => ({
      subscriptions: [],
      loading: false,
      error: null,

      fetchSubscriptions: async (userId) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.get(`/api/auth/subscription/${userId}`);
          const { subscription } = res.data;
          set({ subscriptions: subscription, loading: false });
        } catch (error) {
          set({ error: "Failed to fetch subscriptions", loading: false });
        }
      },
    }),
    {
      name: "subscription-storage",
      getStorage: () => localStorage,
    }
  )
);
