
import type { Match, LeagueData } from "./index"

export type LeagueStatus = "In Progress" | "Completed"

export interface LeagueFilters {
  season?: string
  status?: LeagueStatus
  search?: string
}

export interface LeagueMetadata {
  createdAt: string
  updatedAt: string
  totalMatches: number
  completedMatches: number
}

export interface EnhancedLeagueData extends LeagueData {
  metadata?: LeagueMetadata
  description?: string
}

export interface LeagueStats {
  totalGoals: number
  averageGoalsPerMatch: number
  homeWins: number
  awayWins: number
  draws: number
  mostGoalsScoredInMatch: number
  cleanSheets: number
}
