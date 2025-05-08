
export interface ApiMatch {
  home_team: string;
  away_team: string;
  date: string;
  score: {
    home: number;
    away: number;
  };
  ht_score?: {
    home: number;
    away: number;
  };
  round?: string | number;
  venue?: string;
}

export interface HeadToHeadStats {
  home_wins: number;
  away_wins: number;
  draws: number;
  home_win_percentage: number;
  away_win_percentage: number;
  draw_percentage: number;
}

export interface AverageGoals {
  average_total_goals: number;
  average_home_goals: number;
  average_away_goals: number;
}

export interface TeamAnalysis {
  home_team: string;
  away_team: string;
  matches_count: number;
  both_teams_scored_percentage: number;
  average_goals: AverageGoals;
  home_form_index: number;
  away_form_index: number;
  head_to_head_stats: HeadToHeadStats;
}

export interface PredictionModel {
  randomForest: string;
  poisson: {
    homeGoals: number;
    awayGoals: number;
  };
  elo: {
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
  };
}

export interface PredictionResult {
  homeExpectedGoals: number;
  awayExpectedGoals: number;
  bothTeamsToScoreProb: number;
  predictedWinner: 'home' | 'away' | 'draw' | 'unknown';
  confidence: number;
  modelPredictions: PredictionModel;
}

export interface ApiResponse {
  total_matches: number;
  page: number;
  page_size: number;
  matches: ApiMatch[];
  team_analysis?: TeamAnalysis | null;
  prediction?: PredictionResult | null;
  teams?: string[];
}
