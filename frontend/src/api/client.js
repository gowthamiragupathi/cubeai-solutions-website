import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cube_auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        localStorage.removeItem("cube_auth_token");
        localStorage.removeItem("cube_auth_user");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
