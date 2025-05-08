
export interface Match {
  date: string
  home_team: string
  away_team: string
  home_score: number
  away_score: number
  ht_home_score?: number
  ht_away_score?: number
  round?: string
  venue?: string
}

export interface TeamAnalysis {
  team: string
  wins: number
  losses: number
  draws: number
  goalsScored: number
  goalsConceded: number
  cleanSheets: number
  form: string[]
}

export interface PredictionResultType {
  homeScore: number
  awayScore: number
  confidence: number
  homeWinProbability?: number
  awayWinProbability?: number
  drawProbability?: number
  expectedGoalsHome?: number
  expectedGoalsAway?: number
  predictedMargin?: number
  analysis?: string
}

export interface ApiResponse {
  total_matches: number
  page: number
  page_size: number
  matches: Match[]
  team_analysis?: {
    [team: string]: TeamAnalysis
  } | null
  prediction?: PredictionResultType | null
}
