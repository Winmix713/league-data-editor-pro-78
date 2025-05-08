
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

export interface HeadToHeadStats {
  home_wins: number
  away_wins: number
  draws: number
  home_win_percentage: number
  away_win_percentage: number
  draw_percentage: number
  total_matches: number
}

export interface AverageGoals {
  average_home_goals: number
  average_away_goals: number
  average_total_goals: number
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

export interface ExtendedTeamAnalysis extends TeamAnalysis {
  head_to_head_stats: HeadToHeadStats
  both_teams_scored_percentage: number
  average_goals: AverageGoals
  home_form_index: number
  away_form_index: number
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
    [team: string]: ExtendedTeamAnalysis
  } | null
  prediction?: PredictionResultType | null
}
