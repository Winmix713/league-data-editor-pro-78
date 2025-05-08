
import { ApiResponse } from "../types/api";
import { API_CONFIG, getApiUrl } from "../config/api";
import { TEAMS, getAllTeamNames } from "../data/teams";
import { predictMatchOutcome } from "@/utils/leagueStatistics";
import { logger } from "@/utils/logger";

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
    // Instead of fetching from API, use our local team data
    return getAllTeamNames();
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return [];
  }
}

/**
 * Get prediction for a match between two teams
 * Uses fallback local prediction when API fails
 */
export async function getPrediction(homeTeam: string, awayTeam: string): Promise<ApiResponse> {
  try {
    // Try to get data from API first
    const queryParams = new URLSearchParams({
      home_team: homeTeam,
      away_team: awayTeam,
    });
    const url = `${getApiUrl()}?${queryParams.toString()}`;
    
    try {
      const apiResponse = await fetchWithCache<ApiResponse>(url);
      
      // If the API returned valid prediction data, use it
      if (apiResponse.prediction) {
        logger.log('Using API prediction data');
        return apiResponse;
      }
      
      // If API didn't return prediction, fall back to local prediction
      logger.log('API returned no prediction, using local fallback');
      return generateLocalPrediction(homeTeam, awayTeam);
      
    } catch (error) {
      // If API call fails, use local prediction
      logger.log('API request failed, using local fallback prediction');
      return generateLocalPrediction(homeTeam, awayTeam);
    }
  } catch (error) {
    console.error("Failed in prediction process:", error);
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
 * Generate a local prediction using stored match data
 */
function generateLocalPrediction(homeTeam: string, awayTeam: string): ApiResponse {
  try {
    // Load matches from localStorage
    let allMatches = [];
    try {
      // Try to find any stored matches in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('v-sports-matches-')) {
          const matches = JSON.parse(localStorage.getItem(key) || '[]');
          allMatches = [...allMatches, ...matches];
        }
      }
      
      // Also check current matches
      const currentMatches = JSON.parse(localStorage.getItem('v-sports-current-matches') || '[]');
      allMatches = [...allMatches, ...currentMatches];
      
    } catch (e) {
      console.error("Error loading matches from localStorage:", e);
    }
    
    // Filter matches related to the teams
    const relevantMatches = allMatches.filter((match: any) => 
      match.home_team === homeTeam || 
      match.away_team === homeTeam || 
      match.home_team === awayTeam || 
      match.away_team === awayTeam
    );
    
    // If we have at least some matches, generate a prediction
    if (relevantMatches.length > 0) {
      logger.log(`Found ${relevantMatches.length} relevant matches for prediction`);
      const localPrediction = predictMatchOutcome(homeTeam, awayTeam, relevantMatches);
      
      return {
        total_matches: relevantMatches.length,
        page: 1,
        page_size: relevantMatches.length,
        matches: relevantMatches,
        team_analysis: null, // We don't generate team analysis in local mode
        prediction: {
          ...localPrediction,
          homeWinProbability: homeTeam === awayTeam ? 33 : (localPrediction.homeScore > localPrediction.awayScore ? 65 : 25),
          awayWinProbability: homeTeam === awayTeam ? 33 : (localPrediction.awayScore > localPrediction.homeScore ? 65 : 25),
          drawProbability: homeTeam === awayTeam ? 34 : (localPrediction.homeScore === localPrediction.awayScore ? 60 : 10),
          expectedGoalsHome: localPrediction.homeScore + 0.35,
          expectedGoalsAway: localPrediction.awayScore + 0.12,
          analysis: generateAnalysisText(homeTeam, awayTeam, localPrediction),
        }
      };
    } else {
      // Generate a synthetic prediction based on team names (as fallback)
      logger.log('No relevant matches found, generating synthetic prediction');
      const syntheticPrediction = generateSyntheticPrediction(homeTeam, awayTeam);
      
      return {
        total_matches: 0,
        page: 1,
        page_size: 0,
        matches: [],
        team_analysis: null,
        prediction: syntheticPrediction
      };
    }
  } catch (error) {
    console.error("Failed to generate local prediction:", error);
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
 * Generate analysis text based on prediction
 */
function generateAnalysisText(homeTeam: string, awayTeam: string, prediction: any): string {
  const { homeScore, awayScore, confidence } = prediction;
  
  if (homeScore > awayScore) {
    return `Based on historical data analysis, ${homeTeam} is likely to win against ${awayTeam}. The predicted score of ${homeScore}-${awayScore} reflects ${homeTeam}'s stronger recent form and historical advantage.`;
  } else if (awayScore > homeScore) {
    return `Analysis indicates that ${awayTeam} has a strong chance to defeat ${homeTeam}. The predicted score of ${homeScore}-${awayScore} is based on ${awayTeam}'s superior performance in similar matchups.`;
  } else {
    return `Our analysis suggests a competitive match between ${homeTeam} and ${awayTeam}, likely ending in a ${homeScore}-${awayScore} draw. Both teams appear evenly matched based on historical performance data.`;
  }
}

/**
 * Generate a synthetic prediction when no match data is available
 */
function generateSyntheticPrediction(homeTeam: string, awayTeam: string): any {
  // Use team names to generate a deterministic but random-seeming score
  const homeNameValue = homeTeam.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5;
  const awayNameValue = awayTeam.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 4;
  
  const homeScore = homeNameValue;
  const awayScore = awayNameValue;
  const confidence = 30; // Low confidence for synthetic predictions
  
  return {
    homeScore,
    awayScore,
    confidence,
    homeWinProbability: homeScore > awayScore ? 55 : 25,
    awayWinProbability: awayScore > homeScore ? 55 : 25,
    drawProbability: homeScore === awayScore ? 50 : 20,
    expectedGoalsHome: homeScore + 0.5,
    expectedGoalsAway: awayScore + 0.5,
    analysis: `This is a synthetic prediction based on team names since no historical match data is available. For more accurate predictions, please add match data for ${homeTeam} and ${awayTeam}.`
  };
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
