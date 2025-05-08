import type { LeagueData, Match } from "@/types"

export interface RouteHistoryItem {
  route: string
  leagueId?: string
  matchId?: string
  tab?: string
}

export interface LeagueState {
  // Navigation state
  currentRoute: string
  selectedLeagueId: string | null
  selectedMatchId: string | null
  selectedTab: string | null
  
  // Navigation actions
  navigate: (route: string, params?: { leagueId?: string; matchId?: string; tab?: string }) => void
  goBack: () => void
  resetNavigation: () => void
  
  // Data state
  leaguesList: LeagueData[]
  currentMatches: Match[]
  searchTerm: string
  isNewLeagueModalOpen: boolean
  isLoading: boolean
  
  // Data actions
  handleLeagueAction: (leagueId: string, action: "view" | "edit" | "complete" | "delete") => void
  handleCreateLeague: (leagueData: Partial<LeagueData>) => void
  handleUpdateLeague: (updatedLeague: LeagueData) => void
  handleUpdateMatches: (matches: Match[], leagueId?: string) => void
  setSearchTerm: (term: string) => void
  setIsNewLeagueModalOpen: (isOpen: boolean) => void
  refreshData: () => void
}
