
import axios from "axios";

/**
 * Resolves the backend API base URL automatically:
 * Reads configuration strictly from frontend .env:
 * - VITE_API_URL: Target when running on localhost / local development
 * - VITE_LIVE_API_URL: Target when deployed to live / production domain
 */
const getBaseURL = () => {
  const localUrl = (import.meta.env.VITE_API_URL || "http://localhost:1972")
    .replace(/['"]+/g, "")
    .replace(/;\s*$/, "")
    .trim();

  const liveUrl = (import.meta.env.VITE_LIVE_API_URL || localUrl)
    .replace(/['"]+/g, "")
    .replace(/;\s*$/, "")
    .trim();

  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.endsWith(".local");

    const targetUrl = isLocalhost ? localUrl : liveUrl;
    return targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`;
  }

  const defaultUrl = import.meta.env.DEV ? localUrl : liveUrl;
  return defaultUrl.startsWith("http") ? defaultUrl : `https://${defaultUrl}`;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL()
});

export default axiosInstance;