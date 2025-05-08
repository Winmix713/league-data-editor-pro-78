import { LeagueData, Match, ApiResponse } from '@/types';
import { apiRequest } from './api';

export class LeagueService {
  /**
   * Get all leagues
   * @returns Promise with leagues data or error
   */
  static async getLeagues(): Promise<ApiResponse<LeagueData[]>> {
    return apiRequest<LeagueData[]>('GET', '/api/leagues');
  }
  
  /**
   * Get a specific league by ID
   * @param id League ID
   * @returns Promise with league data or error
   */
  static async getLeague(id: string): Promise<ApiResponse<LeagueData>> {
    return apiRequest<LeagueData>('GET', `/api/leagues/${id}`);
  }
  
  /**
   * Create a new league
   * @param league League data
   * @returns Promise with created league data or error
   */
  static async createLeague(league: Omit<LeagueData, 'id'>): Promise<ApiResponse<LeagueData>> {
    return apiRequest<LeagueData>('POST', '/api/leagues', league);
  }
  
  /**
   * Update an existing league
   * @param league League data with ID
   * @returns Promise with updated league data or error
   */
  static async updateLeague(league: LeagueData): Promise<ApiResponse<LeagueData>> {
    return apiRequest<LeagueData>('PUT', `/api/leagues/${league.id}`, league);
  }
  
  /**
   * Delete a league
   * @param id League ID
   * @returns Promise with success or error
   */
  static async deleteLeague(id: string): Promise<ApiResponse<void>> {
    return apiRequest<void>('DELETE', `/api/leagues/${id}`);
  }
  
  /**
   * Add matches to a league
   * @param leagueId League ID
   * @param matches Array of matches to add
   * @returns Promise with updated league data or error
   */
  static async addMatches(leagueId: string, matches: Match[]): Promise<ApiResponse<LeagueData>> {
    return apiRequest<LeagueData>('POST', `/api/leagues/${leagueId}/matches`, { matches });
  }
  
  /**
   * Import matches from CSV
   * @param leagueId League ID
   * @param csvContent CSV content as string
   * @returns Promise with updated league data or error
   */
  static async importMatchesFromCSV(leagueId: string, csvContent: string): Promise<ApiResponse<LeagueData>> {
    return apiRequest<LeagueData>('POST', `/api/leagues/${leagueId}/import-csv`, { csvContent });
  }
}