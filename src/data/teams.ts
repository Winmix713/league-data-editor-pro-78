
export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  league: string;
}

// Teams data with all the original names preserved
export const TEAMS: Team[] = [
  { id: "arsenal", name: "London Ágyúk", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t3.png", league: "premier-league" },
  { id: "astonvilla", name: "Aston Oroszlán", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t7.png", league: "premier-league" },
  { id: "brentford", name: "Brentford", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t94.png", league: "premier-league" },
  { id: "brighton", name: "Brighton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t36.png", league: "premier-league" },
  { id: "chelsea", name: "Chelsea", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t8.png", league: "premier-league" },
  { id: "palace", name: "Crystal Palace", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t31.png", league: "premier-league" },
  { id: "everton", name: "Everton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t11.png", league: "premier-league" },
  { id: "fulham", name: "Fulham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t54.png", league: "premier-league" },
  { id: "liverpool", name: "Liverpool", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t14.png", league: "premier-league" },
  { id: "mancity", name: "Manchester Kék", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t43.png", league: "premier-league" },
  { id: "newcastle", name: "Newcastle", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t4.png", league: "premier-league" },
  { id: "nottingham", name: "Nottingham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t17.png", league: "premier-league" },
  { id: "tottenham", name: "Tottenham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t6.png", league: "premier-league" },
  { id: "manutd", name: "Vörös Ördögök", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t1.png", league: "premier-league" },
  { id: "westham", name: "West Ham", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t21.png", league: "premier-league" },
  { id: "wolves", name: "Wolverhampton", logoUrl: "https://resources.premierleague.com/premierleague/badges/50/t39.png", league: "premier-league" }
  // Additional teams can be added here
];

// Helper function to get team by ID
export function getTeamById(teamId: string): Team | undefined {
  return TEAMS.find(team => team.id === teamId);
}

// Helper function to get team by name
export function getTeamByName(teamName: string): Team | undefined {
  return TEAMS.find(team => team.name === teamName);
}

// Get all team names sorted alphabetically
export function getAllTeamNames(): string[] {
  return TEAMS.map(team => team.name).sort();
}
