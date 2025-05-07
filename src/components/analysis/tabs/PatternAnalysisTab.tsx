
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScorePatternChart } from "../charts/ScorePatternChart";
import { ChevronRight } from "lucide-react";

interface PatternAnalysisTabProps {
  patternData: Array<{
    name: string;
    frequency: number;
  }>;
  onAdvancedPatternClick: () => void;
}

export function PatternAnalysisTab({ patternData, onAdvancedPatternClick }: PatternAnalysisTabProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-lg">Score Pattern Distribution</CardTitle>
              <CardDescription>Most common scorelines in the league</CardDescription>
            </div>
            <Button 
              variant="outline" 
              className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
              onClick={onAdvancedPatternClick}
            >
              Advanced Pattern Detection
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ScorePatternChart data={patternData} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Home vs Away Goals</CardTitle>
            <CardDescription>Average goals scored by home and away teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around py-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400">1.8</p>
                <p className="text-sm text-gray-400 mt-1">Home Goals per Game</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-400">1.2</p>
                <p className="text-sm text-gray-400 mt-1">Away Goals per Game</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Match Outcomes</CardTitle>
            <CardDescription>Percentage of home wins, away wins and draws</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around py-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">42%</p>
                <p className="text-sm text-gray-400 mt-1">Home Wins</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-400">28%</p>
                <p className="text-sm text-gray-400 mt-1">Draws</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-400">30%</p>
                <p className="text-sm text-gray-400 mt-1">Away Wins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
