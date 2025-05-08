export interface LeagueData {
  id: string;
  name: string;
  season: string;
  teams: Team[];
  matches: Match[];
  settings?: LeagueSettings;
}

export interface LeagueSettings {
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  useGoalDifference: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
}
typescript// src/types/match.ts
export interface Match {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  date: string;
  played: boolean;
  venue?: string;
  referee?: string;
}

export interface StandingsEntry {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}