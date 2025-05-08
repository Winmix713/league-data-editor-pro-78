
/**
 * API Configuration
 */

// Default API URL
const DEFAULT_API_URL = "https://winmix.hu/3/FootballAPI/";

// Get API base URL from environment or use default
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

// API configuration options
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  defaultPageSize: 100,
  maxPageSize: 500,
  cacheTime: 5 * 60 * 1000, // 5 minutes cache
};

/**
 * Get the full API URL for a specific endpoint
 */
export function getApiUrl(endpoint: string = ''): string {
  return `${API_CONFIG.baseUrl}${endpoint}`;
}
