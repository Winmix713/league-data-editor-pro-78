
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LeagueData, Match } from "@/types";

interface MatchScheduleProps {
  matches: Match[];
  league: LeagueData;
  isLoading: boolean;
  onMatchClick: (match: Match) => void;
}

const MatchSchedule: React.FC<MatchScheduleProps> = ({ 
  matches, 
  league, 
  isLoading,
  onMatchClick
}) => {
  // Group matches by date
  const groupedMatches = React.useMemo(() => {
    const groups: Record<string, Match[]> = {};
    matches.forEach(match => {
      if (!groups[match.date]) {
        groups[match.date] = [];
      }
      groups[match.date].push(match);
    });
    return groups;
  }, [matches]);

  // Sort dates
  const sortedDates = React.useMemo(() => {
    return Object.keys(groupedMatches).sort((a, b) => {
      // This assumes date is in a sortable format like YYYY-MM-DD
      return new Date(a).getTime() - new Date(b).getTime();
    });
  }, [groupedMatches]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-28" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-24" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-black/20 border border-white/10 rounded-xl p-8 text-center">
        <p className="text-gray-400">No matches available for {league.name}.</p>
        <p className="text-sm text-gray-500 mt-1">Upload match data to see the schedule.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date} className="space-y-3">
          <h3 className="text-lg font-medium text-gray-300">{date}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedMatches[date].map((match, index) => (
              <Card 
                key={`${date}-${index}`}
                className="bg-black/20 border-white/10 text-white hover:border-blue-500/50 hover:bg-black/30 transition-all cursor-pointer"
                onClick={() => onMatchClick(match)}
              >
                <CardContent className="p-4">
                  <div className="text-xs text-gray-400">{match.round || 'Round Not Specified'}</div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="font-medium">{match.home_team}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold">{match.home_score}</span>
                      <span className="text-gray-500 mx-1">-</span>
                      <span className="text-xl font-bold">{match.away_score}</span>
                    </div>
                    <div className="font-medium text-right">{match.away_team}</div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500 flex justify-between">
                    <span>Half-time</span>
                    <span>{match.ht_home_score} - {match.ht_away_score}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchSchedule;
