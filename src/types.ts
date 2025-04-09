
export interface Team {
  id: string;
  name: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  played: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  played: boolean;
  matchday: number;
}

export interface League {
  id: string;
  name: string;
  season: string;
  teams: Team[];
  matches: Match[];
  status: "active" | "completed" | "upcoming";
}

export interface LeagueBasicInfo {
  name: string;
  season: string;
}

export interface LeagueFormData {
  name: string;
  season: string;
  teams: string[];
}
