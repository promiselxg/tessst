"use client";

import { apiCall } from "@/lib/utils/api2";
import { useCallback } from "react";

export const useApi = () => {
  const request = useCallback(
    async (method, endpoint, data = {}, headers = {}) => {
      return await apiCall(method, endpoint, data, headers);
    },
    []
  );

  return { request };
};
