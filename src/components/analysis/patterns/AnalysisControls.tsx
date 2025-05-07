
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

interface AnalysisControlsProps {
  complexityLevel: number[];
  selectedFilter: string;
  onComplexityChange: (value: number[]) => void;
  onFilterChange: (value: string) => void;
  patternMetrics: Array<{
    name: string;
    value: string;
    trend: string;
  }>;
}

export function AnalysisControls({
  complexityLevel,
  selectedFilter,
  onComplexityChange,
  onFilterChange,
  patternMetrics,
}: AnalysisControlsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader>
          <CardTitle className="text-white text-lg">Analysis Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Complexity Level</label>
            <Slider
              value={complexityLevel}
              onValueChange={onComplexityChange}
              max={100}
              step={10}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Simple</span>
              <span>Complex</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Game Filter</label>
            <Select value={selectedFilter} onValueChange={onFilterChange}>
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Filter games" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-games">All Games</SelectItem>
                <SelectItem value="home-wins">Home Wins</SelectItem>
                <SelectItem value="away-wins">Away Wins</SelectItem>
                <SelectItem value="draws">Draws</SelectItem>
                <SelectItem value="high-scoring">High Scoring (3+)</SelectItem>
                <SelectItem value="low-scoring">Low Scoring (0-2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Time Period</label>
            <Select defaultValue="season">
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="season">Full Season</SelectItem>
                <SelectItem value="last-10">Last 10 Games</SelectItem>
                <SelectItem value="last-5">Last 5 Games</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="w-full gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10">
            <Filter className="h-4 w-4" /> Apply Filters
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-black/20 border-white/5">
        <CardHeader>
          <CardTitle className="text-white text-lg">Key Pattern Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patternMetrics.map((metric, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    metric.trend === 'up' ? 'text-emerald-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 
                    'text-amber-400'
                  }`}>{metric.value}</span>
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-emerald-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 
                    'text-amber-400'
                  }`}>
                    {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
