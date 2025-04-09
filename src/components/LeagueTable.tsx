
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { League } from '@/types';

interface LeagueTableProps {
  leagues: League[];
  onEditLeague: (id: string) => void;
  onViewLeague: (id: string) => void;
  onDeleteLeague: (id: string) => void;
}

const LeagueTable = ({ leagues, onEditLeague, onViewLeague, onDeleteLeague }: LeagueTableProps) => {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this league?")) {
      onDeleteLeague(id);
      toast.success("League deleted successfully");
    }
  };

  const getTopTeams = (league: League): { winner: string, secondPlace: string, thirdPlace: string } => {
    if (league.teams.length === 0) return { winner: "", secondPlace: "", thirdPlace: "" };
    
    return {
      winner: league.teams[0]?.name || "",
      secondPlace: league.teams[1]?.name || "",
      thirdPlace: league.teams[2]?.name || ""
    };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b border-white/5">
            <th className="py-3 px-4">Season</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Winner</th>
            <th className="py-3 px-4">Second Place</th>
            <th className="py-3 px-4">Third Place</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => {
            const { winner, secondPlace, thirdPlace } = getTopTeams(league);
            
            return (
              <tr 
                key={league.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4">{league.season}</td>
                <td className="py-3 px-4 font-medium">{league.name}</td>
                <td className="py-3 px-4">{winner || "—"}</td>
                <td className="py-3 px-4">{secondPlace || "—"}</td>
                <td className="py-3 px-4">{thirdPlace || "—"}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      league.status === 'active' ? 'bg-emerald-500' :
                      league.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></span>
                    <span className="text-gray-400">{league.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => onViewLeague(league.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => onEditLeague(league.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white hover:text-red-500"
                      onClick={(e) => handleDelete(e, league.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
