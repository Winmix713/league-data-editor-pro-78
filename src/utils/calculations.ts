
import { useMemo } from 'react';
import { Match, StandingsEntry, Team } from '@/types';

/**
 * League stats calculator class
 */
class LeagueStatsCalculator {
  private matches: Match[];
  private teamStats: Map<string, StandingsEntry>;

  constructor(matches: Match[]) {
    this.matches = matches;
    this.teamStats = new Map<string, StandingsEntry>();
    this.calculateStats();
  }

  private calculateStats(): void {
    // Process each match and update stats
    for (const match of this.matches) {
      this.processMatch(match);
    }
  }

  private processMatch(match: Match): void {
    // Get or initialize home team stats
    const homeTeam = this.getOrCreateTeamStats(match.home_team);
    // Get or initialize away team stats
    const awayTeam = this.getOrCreateTeamStats(match.away_team);

    // Update played games
    homeTeam.played += 1;
    awayTeam.played += 1;

    // Update goals
    homeTeam.goalsFor += match.home_score;
    homeTeam.goalsAgainst += match.away_score;
    awayTeam.goalsFor += match.away_score;
    awayTeam.goalsAgainst += match.home_score;

    // Update win/draw/loss and points
    if (match.home_score > match.away_score) {
      // Home team won
      homeTeam.won += 1;
      homeTeam.points += 3;
      awayTeam.lost += 1;
    } else if (match.home_score < match.away_score) {
      // Away team won
      awayTeam.won += 1;
      awayTeam.points += 3;
      homeTeam.lost += 1;
    } else {
      // Draw
      homeTeam.drawn += 1;
      homeTeam.points += 1;
      awayTeam.drawn += 1;
      awayTeam.points += 1;
    }

    // Update goal difference
    homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
  }

  private getOrCreateTeamStats(teamName: string): StandingsEntry {
    if (!this.teamStats.has(teamName)) {
      this.teamStats.set(teamName, {
        team: teamName,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      });
    }
    return this.teamStats.get(teamName)!;
  }

  public getStandings(): StandingsEntry[] {
    // Convert Map to array and sort by points (and then goal difference)
    return Array.from(this.teamStats.values()).sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points; // Higher points first
      }
      return b.goalDifference - a.goalDifference; // Better goal difference first
    });
  }
}

/**
 * Hook to calculate standings with memoization
 * @param matches Array of match results
 * @returns Calculated standings
 */
export const useStandings = (matches: Match[]): StandingsEntry[] => {
  return useMemo(() => {
    if (!matches.length) return [];
    const calculator = new LeagueStatsCalculator(matches);
    return calculator.getStandings();
  }, [matches]);
};

/**
 * Memoized function to calculate standings
 * @param matches Array of match results
 * @returns Array of standings entries sorted by points and goal difference
 */
export const calculateStandings = (matches: Match[]): StandingsEntry[] => {
  if (!matches.length) return [];
  const calculator = new LeagueStatsCalculator(matches);
  return calculator.getStandings();
};