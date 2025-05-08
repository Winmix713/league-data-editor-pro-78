
import { ApiResponse } from "../types/api";
import { API_CONFIG, getApiUrl } from "../config/api";

// Simple in-memory cache
interface CacheItem {
  data: any;
  timestamp: number;
}

const cache: Record<string, CacheItem> = {};

/**
 * Handles API errors and formats them consistently
 */
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  if (error instanceof Error) {
    return { error: error.message };
  }
  return { error: "An unknown error occurred" };
};

/**
 * Fetch data from API with caching
 */
async function fetchWithCache<T>(url: string, options = {}): Promise<T> {
  // Check if we have a valid cache entry
  if (cache[url] && (Date.now() - cache[url].timestamp < API_CONFIG.cacheTime)) {
    console.log("Using cached data for:", url);
    return cache[url].data;
  }
  
  // Fetch fresh data
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  
  // Update cache
  cache[url] = {
    data,
    timestamp: Date.now()
  };
  
  return data;
}

/**
 * Get matches with optional filtering parameters
 */
export async function getMatches(params: Record<string, string> = {}): Promise<ApiResponse> {
  try {
    const queryParams = new URLSearchParams(params);
    const url = `${getApiUrl()}?${queryParams.toString()}`;
    
    return await fetchWithCache<ApiResponse>(url);
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return {
      total_matches: 0,
      page: 1,
      page_size: 0,
      matches: [],
    };
  }
}

/**
 * Get teams list from API
 */
export async function getTeams(): Promise<string[]> {
  try {
    const response = await getMatches();
    return response.teams || [];
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return [];
  }
}

/**
 * Get prediction for a match between two teams
 */
export async function getPrediction(homeTeam: string, awayTeam: string): Promise<ApiResponse> {
  try {
    return await getMatches({
      home_team: homeTeam,
      away_team: awayTeam,
    });
  } catch (error) {
    console.error("Failed to fetch prediction:", error);
    return {
      total_matches: 0,
      page: 1,
      page_size: 0,
      matches: [],
      team_analysis: null,
      prediction: null,
    };
  }
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  Object.keys(cache).forEach(key => {
    delete cache[key];
  });
  console.log("API cache cleared");
}
