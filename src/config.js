export const API_URLS = {
  primary: "https://financebackend-production-3910.up.railway.app/api",
  secondary: import.meta.env.VITE_API_URL,
  local: "http://localhost:5000/api",
};

// Prioritize Localhost if running securely in Dev mode to avoid Remote CORS issues
export const API_BASE = import.meta.env.DEV
  ? API_URLS.local
  : API_URLS.primary;
