export const API_URLS = {
  primary: "https://financebackend-production-3910.up.railway.app/api",
  fallback: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
};

export const API_BASE = API_URLS.primary;
