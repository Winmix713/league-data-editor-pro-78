
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trophy } from "lucide-react";
import type { LeagueData, Match } from "@/types";

// Sample data for demonstration
const leaguesData = [
  {
    id: "premier-league",
    name: "Premier League",
    season: "2023-2024",
    winner: "-",
    secondPlace: "-",
    thirdPlace: "-",
    status: "In Progress",
  },
  {
    id: "la-liga",
    name: "La Liga",
    season: "2023-2024",
    winner: "-",
    secondPlace: "-",
    thirdPlace: "-",
    status: "In Progress",
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    season: "2023-2024",
    winner: "-",
    secondPlace: "-",
    thirdPlace: "-",
    status: "In Progress",
  }
];

// Sample match data
const matchesData: Record<string, Match[]> = {
  "premier-league": [
    {
      date: "2023-10-21",
      home_team: "Manchester City",
      away_team: "Arsenal",
      ht_home_score: 1,
      ht_away_score: 0,
      home_score: 2,
      away_score: 1,
      round: "Round 9"
    },
    {
      date: "2023-10-21",
      home_team: "Liverpool",
      away_team: "Chelsea",
      ht_home_score: 0,
      ht_away_score: 0,
      home_score: 1,
      away_score: 1,
      round: "Round 9"
    },
  ],
  "la-liga": [],
  "bundesliga": []
};

interface LeagueSeasonsProps {
  onEdit: () => void;
  onSelect: (league: LeagueData, matches: Match[]) => void;
}

const LeagueSeasons: React.FC<LeagueSeasonsProps> = ({ onEdit, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {leaguesData.map((league) => (
        <Card 
          key={league.id} 
          className="bg-black/20 border-white/10 text-white hover:border-blue-500/50 transition-all cursor-pointer"
          onClick={() => onSelect(league, matchesData[league.id] || [])}
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                {league.status}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit size={14} />
              </Button>
            </div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              {league.name}
              {league.status === "Completed" && (
                <Trophy size={18} className="text-yellow-500" />
              )}
            </CardTitle>
            <CardDescription className="text-gray-400">Season {league.season}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm flex justify-between">
                <span className="text-gray-400">Matches played:</span>
                <span className="font-medium">{matchesData[league.id]?.length || 0}</span>
              </p>
              <p className="text-sm flex justify-between">
                <span className="text-gray-400">Teams:</span>
                <span className="font-medium">20</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t border-white/5">
            <Button 
              variant="link" 
              className="text-blue-400 hover:text-blue-300 p-0 h-auto w-full justify-start"
              onClick={() => onSelect(league, matchesData[league.id] || [])}
            >
              View League Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LeagueSeasons;
