
export interface LeagueData {
  id: string
  name: string
  season: string
  winner: string
  secondPlace: string
  thirdPlace: string
  status: string
}

export interface Match {
  id: string
  date: string
  homeTeam: string
  awayTeam: string
  homeScore: number | string
  awayScore: number | string
  halfTimeScore?: string
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

export interface RouteHistoryItem {
  route: RouteType
  leagueId?: string
  matchId?: string
}
