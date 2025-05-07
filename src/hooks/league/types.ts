
// Define the types of routes available in the application
export type RouteType = 
  | "leagues" 
  | "league-details" 
  | "analysis" 
  | "advanced-pattern" 
  | "integrations" 
  | "league-analytics" 
  | "league-management" 
  | "matches"

// Interface for the LeagueState context
export interface LeagueState {
  // Navigation state
  currentRoute: RouteType
  selectedLeagueId: string | null
  selectedMatchId: string | null
  
  // Data state
  leaguesList: LeagueData[]
  currentMatches: Match[]
  searchTerm: string
  isNewLeagueModalOpen: boolean
  
  // Navigation actions
  navigate: (route: RouteType, params?: { leagueId?: string; matchId?: string }) => void
  goBack: () => void
  
  // Data actions
  handleLeagueAction: (leagueId: string, action: "view" | "edit" | "complete" | "delete") => void
  handleCreateLeague: (leagueId: string) => void
  handleUpdateLeague: (updatedLeague: LeagueData) => void
  handleUpdateMatches: (updatedMatches: Match[]) => void
  setSearchTerm: (term: string) => void
  setIsNewLeagueModalOpen: (isOpen: boolean) => void
}

// Type for route history
export interface RouteHistoryItem {
  route: RouteType
  leagueId?: string
  matchId?: string
}

// Import existing types
import { LeagueData, Match } from "@/types"
