"use client";

import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

// Request interceptor: Attach token to requests
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic API call function using the Axios instance
export const apiCall = async (
  method,
  endpoint,
  payload = {},
  customHeaders = {}
) => {
  try {
    const url = `${endpoint}`;

    const config = {
      method: method.toLowerCase(), // Convert to lowercase for consistency
      url,
      headers: { ...customHeaders },
      ...(method.toLowerCase() === "get" || method.toLowerCase() === "delete"
        ? { params: payload } // Use params for GET/DELETE
        : { data: payload }), // Use data for POST/PUT/PATCH
    };

    const response = await api.request(config); // ✅ Use api.request() instead of api[method]
    return response.data;
  } catch (error) {
    console.error(
      `API ${method.toUpperCase()} error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
