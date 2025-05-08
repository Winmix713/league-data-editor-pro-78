
import { useState } from "react";
import { Match } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Trophy, Flag, AlertCircle } from "lucide-react";
import { MatchScore } from "./MatchScore";

interface MatchDetailViewProps {
  match: Match;
  onClose: () => void;
}

export const MatchDetailView = ({ match, onClose }: MatchDetailViewProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Validate match data
  const validateMatch = () => {
    if (!match.date) return "Match date is missing";
    if (!match.home_team || !match.away_team) return "Team information is incomplete";
    if (match.home_score === undefined || match.away_score === undefined) {
      return "Match score is incomplete";
    }
    return null;
  };
  
  const handleUpdateScore = () => {
    const validationError = validateMatch();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    
    // Mock API call - in a real application this would be a fetch request
    setTimeout(() => {
      setIsUpdating(false);
      toast.success(`Match between ${match.home_team} and ${match.away_team} updated successfully`);
    }, 800);
  };

  return (
    <Card className="bg-black/30 border border-white/10 shadow-xl p-6 max-w-3xl w-full mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-white">Match Details</h2>
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 p-3 rounded bg-red-950/20 text-red-400 border border-red-900/30">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="pb-6 border-b border-white/10 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center gap-8 justify-center mb-4">
              <div className="text-right flex-1">
                <p className="text-lg font-bold text-white">{match.home_team}</p>
              </div>
              <MatchScore 
                homeScore={match.home_score} 
                awayScore={match.away_score} 
                size="large" 
              />
              <div className="text-left flex-1">
                <p className="text-lg font-bold text-white">{match.away_team}</p>
              </div>
            </div>
            {match.ht_home_score !== undefined && match.ht_away_score !== undefined && (
              <p className="text-sm text-gray-400">
                Half-time: {match.ht_home_score} - {match.ht_away_score}
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Date:</span>
            <span className="text-white">{match.date}</span>
          </div>
          
          {match.round && (
            <div className="flex items-center gap-2 text-gray-300">
              <Trophy className="w-4 h-4 text-blue-400" />
              <span>Round:</span>
              <span className="text-white">{match.round}</span>
            </div>
          )}
          
          {match.venue && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Venue:</span>
              <span className="text-white">{match.venue}</span>
            </div>
          )}
          
          {match.ht_home_score !== undefined && match.ht_away_score !== undefined && (
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Halftime Score:</span>
              <span className="text-white">
                {match.ht_home_score} - {match.ht_away_score}
              </span>
            </div>
          )}
          
          {match.referee && (
            <div className="flex items-center gap-2 text-gray-300">
              <Flag className="w-4 h-4 text-blue-400" />
              <span>Referee:</span>
              <span className="text-white">{match.referee}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-white/10"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateScore}
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUpdating ? "Updating..." : "Update Score"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
