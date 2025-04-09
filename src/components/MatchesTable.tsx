
import React from 'react';
import { Match } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';
import { CustomInput } from '@/components/ui/custom-input';

interface MatchesTableProps {
  matches: Match[];
  onUpdateMatch?: (match: Match) => void;
  editable?: boolean;
}

const MatchesTable = ({ matches, onUpdateMatch, editable = false }: MatchesTableProps) => {
  const [editingMatch, setEditingMatch] = React.useState<string | null>(null);
  const [matchData, setMatchData] = React.useState<Match | null>(null);

  const handleEditClick = (match: Match) => {
    setEditingMatch(match.id);
    setMatchData({ ...match });
  };

  const handleSaveClick = () => {
    if (matchData && onUpdateMatch) {
      onUpdateMatch(matchData);
      setEditingMatch(null);
      setMatchData(null);
    }
  };

  const handleCancelClick = () => {
    setEditingMatch(null);
    setMatchData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!matchData) return;
    
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue)) {
      setMatchData({
        ...matchData,
        [name]: 0
      });
    } else {
      setMatchData({
        ...matchData,
        [name]: Math.max(0, numValue)
      });
    }
  };

  // Group matches by matchday
  const matchesByDay: { [key: number]: Match[] } = {};
  matches.forEach(match => {
    if (!matchesByDay[match.matchday]) {
      matchesByDay[match.matchday] = [];
    }
    matchesByDay[match.matchday].push(match);
  });

  // Sort matchdays
  const sortedMatchdays = Object.keys(matchesByDay)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-8">
      {sortedMatchdays.map(matchday => (
        <div key={matchday} className="bg-black/20 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Matchday {matchday}</h3>
          <table className="w-full">
            <tbody>
              {matchesByDay[matchday].map((match) => (
                <tr key={match.id} className="border-b border-white/5 last:border-0">
                  {editingMatch === match.id ? (
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 text-right">{match.homeTeam}</div>
                        <div className="flex items-center gap-1 w-20">
                          <CustomInput
                            name="homeGoals"
                            value={matchData?.homeGoals.toString() || "0"}
                            onChange={handleInputChange}
                            className="w-12 text-center p-1"
                          />
                          <span>:</span>
                          <CustomInput
                            name="awayGoals"
                            value={matchData?.awayGoals.toString() || "0"}
                            onChange={handleInputChange}
                            className="w-12 text-center p-1"
                          />
                        </div>
                        <div className="flex-1">{match.awayTeam}</div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"
                            onClick={handleSaveClick}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 bg-red-500/20 text-red-500 hover:bg-red-500/30"
                            onClick={handleCancelClick}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="flex-1 text-right pr-2">{match.homeTeam}</div>
                        <div className={`px-2 py-1 rounded ${match.played ? 'bg-white/10' : 'bg-white/5 text-gray-500'}`}>
                          {match.played ? `${match.homeGoals} : ${match.awayGoals}` : "vs"}
                        </div>
                        <div className="flex-1 pl-2">{match.awayTeam}</div>
                        
                        {editable && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-2 text-gray-400 hover:text-white hover:bg-white/5"
                            onClick={() => handleEditClick(match)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {matches.length === 0 && (
        <div className="text-center text-gray-400 py-6">
          No matches scheduled
        </div>
      )}
    </div>
  );
};

export default MatchesTable;
