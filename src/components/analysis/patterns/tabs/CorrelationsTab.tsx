
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Maximize2 } from "lucide-react";
import { CorrelationsChart } from "../charts/CorrelationsChart";

interface CorrelationsTabProps {
  correlationData: Array<{
    x: number;
    y: number;
    z: number;
    name: string;
  }>;
}

export function CorrelationsTab({ correlationData }: CorrelationsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-white text-lg">Statistical Correlations</CardTitle>
            <CardDescription>Relationship between various match factors</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <CorrelationsChart data={correlationData} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Correlation Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Possession vs Goals</span>
                <span className="font-medium text-blue-400">0.62</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '62%' }}></div>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-gray-300">Shots on Target vs Goals</span>
                <span className="font-medium text-blue-400">0.78</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-gray-300">Team Form vs Result</span>
                <span className="font-medium text-blue-400">0.71</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '71%' }}></div>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-gray-300">Home Advantage vs Win</span>
                <span className="font-medium text-blue-400">0.58</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '58%' }}></div>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-gray-300">Team Ranking vs Goals</span>
                <span className="font-medium text-blue-400">0.46</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '46%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Statistical Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="font-medium text-emerald-400 mb-2">Strong Correlations</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Shots on target has a 78% correlation with goals scored</li>
                <li>• Team form has a 71% correlation with match result</li>
                <li>• Possession has a 62% correlation with goals scored</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <h4 className="font-medium text-amber-400 mb-2">Moderate Correlations</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Home advantage has a 58% correlation with wins</li>
                <li>• Team ranking has a 46% correlation with goals scored</li>
              </ul>
            </div>
            
            <div className="text-sm text-gray-400 mt-3">
              <p>Correlation coefficient ranges from 0 (no correlation) to 1 (perfect correlation).</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
