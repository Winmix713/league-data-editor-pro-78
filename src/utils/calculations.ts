import { Team, Match } from "../types";

export const calculateStandings = (teams: string[], matches: Match[]): Team[] => {
  // Initialize team stats
  let teamStats: Team[] = teams.map(teamName => ({
    id: teamName.toLowerCase().replace(/\s+/g, '-'),
    name: teamName,
    points: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDiff: 0,
    played: 0
  }));

  // Calculate stats based on matches
  matches.forEach(match => {
    if (match.played) {
      // Find the teams
      const homeTeamIndex = teamStats.findIndex(team => team.name === match.homeTeam);
      const awayTeamIndex = teamStats.findIndex(team => team.name === match.awayTeam);
      
      if (homeTeamIndex !== -1 && awayTeamIndex !== -1) {
        // Update games played
        teamStats[homeTeamIndex].played += 1;
        teamStats[awayTeamIndex].played += 1;
        
        // Update goals
        teamStats[homeTeamIndex].goalsFor += match.homeGoals;
        teamStats[homeTeamIndex].goalsAgainst += match.awayGoals;
        teamStats[awayTeamIndex].goalsFor += match.awayGoals;
        teamStats[awayTeamIndex].goalsAgainst += match.homeGoals;
        
        // Update goal difference
        teamStats[homeTeamIndex].goalDiff = teamStats[homeTeamIndex].goalsFor - teamStats[homeTeamIndex].goalsAgainst;
        teamStats[awayTeamIndex].goalDiff = teamStats[awayTeamIndex].goalsFor - teamStats[awayTeamIndex].goalsAgainst;
        
        // Update wins, draws, losses, and points
        if (match.homeGoals > match.awayGoals) {
          // Home team wins
          teamStats[homeTeamIndex].wins += 1;
          teamStats[homeTeamIndex].points += 3;
          teamStats[awayTeamIndex].losses += 1;
        } else if (match.homeGoals < match.awayGoals) {
          // Away team wins
          teamStats[awayTeamIndex].wins += 1;
          teamStats[awayTeamIndex].points += 3;
          teamStats[homeTeamIndex].losses += 1;
        } else {
          // Draw
          teamStats[homeTeamIndex].draws += 1;
          teamStats[homeTeamIndex].points += 1;
          teamStats[awayTeamIndex].draws += 1;
          teamStats[awayTeamIndex].points += 1;
        }
      }
    }
  });

  // Sort teams by points, then goal difference, then goals scored
  teamStats.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    } else if (a.goalDiff !== b.goalDiff) {
      return b.goalDiff - a.goalDiff;
    } else {
      return b.goalsFor - a.goalsFor;
    }
  });

  return teamStats;
};

export const generateMatchSchedule = (teams: string[]): Match[] => {
  const matches: Match[] = [];
  const numberOfTeams = teams.length;
  
  // Ensure even number of teams
  const teamsToSchedule = [...teams];
  if (numberOfTeams % 2 !== 0) {
    teamsToSchedule.push("BYE");
  }
  
  const totalRounds = teamsToSchedule.length - 1;
  const matchesPerRound = teamsToSchedule.length / 2;
  
  // Create pairs for the first round
  const teamsCopy = [...teamsToSchedule];
  const firstTeam = teamsCopy.shift()!; // Remove first team
  
  // For each round
  for (let round = 0; round < totalRounds; round++) {
    // First team vs rotating team
    if (firstTeam !== "BYE" && teamsCopy[round] !== "BYE") {
      matches.push({
        id: `match-${matches.length + 1}`,
        homeTeam: firstTeam,
        awayTeam: teamsCopy[round],
        homeGoals: 0,
        awayGoals: 0,
        played: false,
        matchday: round + 1
      });
    }
    
    // Rest of the teams
    for (let match = 0; match < matchesPerRound - 1; match++) {
      const home = teamsCopy[(round + match + 1) % teamsCopy.length];
      const away = teamsCopy[(round + teamsCopy.length - match - 1) % teamsCopy.length];
      if (home !== "BYE" && away !== "BYE") {
        matches.push({
          id: `match-${matches.length + 1}`,
          homeTeam: home,
          awayTeam: away,
          homeGoals: 0,
          awayGoals: 0,
          played: false,
          matchday: round + 1
        });
      }
    }
  }
  
  // Create return matches (swapping home and away)
  const firstRoundMatches = [...matches];
  for (const match of firstRoundMatches) {
    matches.push({
      id: `match-${matches.length + 1}`,
      homeTeam: match.awayTeam,
      awayTeam: match.homeTeam,
      homeGoals: 0,
      awayGoals: 0,
      played: false,
      matchday: match.matchday + totalRounds
    });
  }
  
  return matches;
};
