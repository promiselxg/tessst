import axios from "axios";

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ysfon-official.vercel.app/api"
    : "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  //timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
