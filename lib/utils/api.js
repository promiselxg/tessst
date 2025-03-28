"use client";

import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = axios.create({
  baseURL: BASE_API,
  withCredentials: true, // ✅ Automatically send cookies
});

// ✅ Function to get token from cookies
const getTokenFromCookies = () => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
  return null;
};

// ✅ Request interceptor: Attach token from cookies
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Generic API call function
export const apiCall = async (
  method,
  endpoint,
  payload = {},
  customHeaders = {}
) => {
  try {
    const url = `${endpoint}`;

    const config = {
      method: method.toLowerCase(),
      url,
      headers: { ...customHeaders },
      ...(method.toLowerCase() === "get" || method.toLowerCase() === "delete"
        ? { params: payload }
        : { data: payload }),
    };

    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.error(
      `API ${method.toUpperCase()} error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
