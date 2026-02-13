import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({});

// Request interceptor to add bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (optional, for handling errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

// Common API call function
export const apiCall = async (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: any,
) => {
  const response = await api.request({
    method,
    url,
    data,
  });
  return response.data;
};

// Example API functions (moved to separate files)
export const getUser = async () => {
  return await apiCall("GET", "/user");
};
