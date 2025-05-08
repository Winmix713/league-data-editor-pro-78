
export interface LeagueData {
  id: string
  name: string
  season: string
  winner: string
  secondPlace: string
  thirdPlace: string
  status: "In Progress" | "Completed"
}

export interface Match {
  id?: string
  date: string
  home_team: string
  away_team: string
  home_score: number
  away_score: number
  ht_home_score: number
  ht_away_score: number
  round?: number | string
  venue?: string
}

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
  | "predictions"
  | "team-management"
  | "statistics"

export interface RouteHistoryItem {
  route: RouteType
  leagueId?: string
  matchId?: string
  tab?: string
}
