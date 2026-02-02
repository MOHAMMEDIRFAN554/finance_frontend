import axios from "axios";
import { API_BASE, API_URLS } from "../config";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Failover for Network Errors
    if (!error.response && !originalRequest._failoverRetry) {
      originalRequest._failoverRetry = true;

      let nextBase = null;
      if (api.defaults.baseURL === API_URLS.local) nextBase = API_URLS.primary;
      else if (api.defaults.baseURL === API_URLS.primary) nextBase = API_URLS.secondary;

      if (nextBase) {
        console.warn(`API unreachable, switching to: ${nextBase}`);
        api.defaults.baseURL = nextBase;
        originalRequest.baseURL = nextBase;
        return api(originalRequest);
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.get("/auth/refresh");
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
