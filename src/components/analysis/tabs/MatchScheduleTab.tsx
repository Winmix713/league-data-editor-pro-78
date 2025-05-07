
import { useState } from "react";
import { Calendar, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MatchPredictionCard } from "../cards/MatchPredictionCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "../cards/StatsCard";

interface MatchScheduleTabProps {
  scheduleData: Array<{
    id: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    predictedScore: string;
    confidence?: number;
    matchday?: string;
  }>;
}

export function MatchScheduleTab({ scheduleData }: MatchScheduleTabProps) {
  const [filters, setFilters] = useState({
    highConfidence: false,
    lowScoring: false,
    highScoring: false,
    upcoming: true,
  });

  // Group matches by matchday
  const groupedByMatchday = scheduleData.reduce((acc, match) => {
    const matchday = match.matchday || "Upcoming Matches";
    if (!acc[matchday]) {
      acc[matchday] = [];
    }
    acc[matchday].push(match);
    return acc;
  }, {} as Record<string, typeof scheduleData>);

  // Filter matches based on selected filters
  const filteredScheduleData = scheduleData.filter((match) => {
    const predictedGoals = match.predictedScore
      .split("-")
      .map((score) => parseInt(score))
      .reduce((a, b) => a + b, 0);
    
    if (filters.highConfidence && (!match.confidence || match.confidence < 70)) return false;
    if (filters.lowScoring && predictedGoals > 2) return false;
    if (filters.highScoring && predictedGoals < 3) return false;
    
    return true;
  });

  // Prediction success metrics (would come from real data in a full implementation)
  const predictionMetrics = {
    accuracy: "72%",
    correctResults: "68%",
    correctScores: "31%",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Upcoming Matches</h3>
          <p className="text-sm text-gray-400">With predicted outcomes based on our analysis</p>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/10">
              <DropdownMenuCheckboxItem
                checked={filters.highConfidence}
                onCheckedChange={(checked) => setFilters({...filters, highConfidence: checked})}
              >
                High Confidence (70%+)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.lowScoring}
                onCheckedChange={(checked) => setFilters({...filters, lowScoring: checked})}
              >
                Low Scoring (0-2 goals)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.highScoring}
                onCheckedChange={(checked) => setFilters({...filters, highScoring: checked})}
              >
                High Scoring (3+ goals)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Prediction Accuracy" 
          value={predictionMetrics.accuracy}
          description="Overall prediction accuracy" 
          color="blue"
        />
        <StatsCard
          title="Result Accuracy" 
          value={predictionMetrics.correctResults}
          description="Correct 1X2 result predictions" 
          color="emerald"
        />
        <StatsCard
          title="Score Accuracy" 
          value={predictionMetrics.correctScores}
          description="Exact score predictions" 
          color="amber"
        />
      </div>
      
      {Object.entries(filters).some(([_, value]) => value) && filteredScheduleData.length === 0 ? (
        <div className="text-center py-8 bg-black/20 rounded-lg border border-white/5">
          <Calendar className="h-12 w-12 mx-auto text-gray-500 mb-2" />
          <p className="text-gray-400">No matches found with the current filters</p>
          <Button 
            variant="link" 
            className="text-blue-400 mt-2"
            onClick={() => setFilters({highConfidence: false, lowScoring: false, highScoring: false, upcoming: true})}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByMatchday).map(([matchday, matches]) => {
            const filteredMatches = matches.filter(match => {
              const predictedGoals = match.predictedScore
                .split("-")
                .map((score) => parseInt(score))
                .reduce((a, b) => a + b, 0);
              
              if (filters.highConfidence && (!match.confidence || match.confidence < 70)) return false;
              if (filters.lowScoring && predictedGoals > 2) return false;
              if (filters.highScoring && predictedGoals < 3) return false;
              
              return true;
            });

            if (filteredMatches.length === 0) return null;

            return (
              <div key={matchday} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 py-1 px-3">
                    {matchday}
                  </Badge>
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                </div>
                <div className="space-y-4">
                  {filteredMatches.map((match) => (
                    <Card key={match.id} className="bg-black/20 border-white/5">
                      <CardContent className="p-0">
                        <MatchPredictionCard
                          date={match.date}
                          homeTeam={match.homeTeam}
                          awayTeam={match.awayTeam}
                          predictedScore={match.predictedScore}
                          confidence={match.confidence}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
