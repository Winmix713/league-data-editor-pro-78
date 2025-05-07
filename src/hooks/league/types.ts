
import type { LeagueData, Match } from "@/types"

export type RouteType = 
  | "leagues" 
  | "league-details" 
  | "analysis" 
  | "advanced-pattern" 
  | "integrations"
  | "league-analytics" 
  | "league-management" 
  | "matches"
  | "settings"

export interface RouteHistoryItem {
  route: RouteType
  leagueId?: string
  matchId?: string
}

export interface LeagueState {
  // Navigation state
  currentRoute: RouteType
  selectedLeagueId: string | null
  selectedMatchId: string | null
  
  // Navigation actions
  navigate: (route: RouteType, params?: { leagueId?: string; matchId?: string }) => void
  goBack: () => void
  
  // Data state
  leaguesList: LeagueData[]
  currentMatches: Match[]
  searchTerm: string
  isNewLeagueModalOpen: boolean
  
  // Data actions
  handleLeagueAction: (leagueId: string, action: "view" | "edit" | "complete" | "delete") => void
  handleCreateLeague: (leagueData: Partial<LeagueData>) => void
  handleUpdateLeague: (updatedLeague: LeagueData) => void
  handleUpdateMatches: (matches: Match[]) => void
  setSearchTerm: (term: string) => void
  setIsNewLeagueModalOpen: (isOpen: boolean) => void
}
