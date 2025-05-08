
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEAMS, Team } from '@/data/teams';

interface TeamListProps {
  leagueFilter?: string;
}

export function TeamList({ leagueFilter }: TeamListProps) {
  const teams = useMemo(() => {
    let filteredTeams = [...TEAMS];
    
    if (leagueFilter) {
      filteredTeams = filteredTeams.filter(team => team.league === leagueFilter);
    }
    
    return filteredTeams.sort((a, b) => a.name.localeCompare(b.name));
  }, [leagueFilter]);

  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader>
        <CardTitle className="text-white">Team List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div 
              key={team.id}
              className="flex items-center gap-3 bg-black/30 p-3 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all"
            >
              {team.logoUrl && (
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img 
                    src={team.logoUrl} 
                    alt={`${team.name} logo`} 
                    className="w-full h-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=' + team.name.charAt(0);
                    }}
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-white">{team.name}</p>
                <p className="text-xs text-gray-400">{team.league.replace('-', ' ')}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
