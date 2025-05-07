
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Maximize2 } from "lucide-react";
import { GoalDistributionChart } from "../charts/GoalDistributionChart";
import { ScoringTrendsChart } from "../charts/ScoringTrendsChart";

interface PatternVisualizationTabProps {
  patternData: Array<{
    name: string;
    homeGoals: number;
    awayGoals: number;
    draws: number;
  }>;
}

export function PatternVisualizationTab({ patternData }: PatternVisualizationTabProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-white text-lg">Goal Distribution Patterns</CardTitle>
            <CardDescription>Analysis of scoring patterns throughout the season</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <GoalDistributionChart data={patternData} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Scoring Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoringTrendsChart data={patternData} />
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Pattern Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-black/30 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">Key Findings</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Home teams score 1.6x more goals in the first half compared to away teams</li>
                  <li>• Away team scoring increases by 35% in the last 15 minutes</li>
                  <li>• Teams that score first win 68% of matches</li>
                  <li>• Draw probability increases by 40% in high-stakes matches</li>
                  <li>• Clean sheet probability increases by 22% for teams in top positions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Pattern Confidence Level</h4>
                <div className="w-full bg-black/30 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Based on 248 matches</span>
                  <span>78% confidence</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
