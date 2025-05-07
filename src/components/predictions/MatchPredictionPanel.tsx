
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { predictMatchOutcome } from "@/utils/leagueStatistics"
import { PredictionResult } from "./PredictionResult"
import type { Match } from "@/types"

interface MatchPredictionPanelProps {
  matches: Match[]
}

export function MatchPredictionPanel({ matches }: MatchPredictionPanelProps) {
  const [homeTeam, setHomeTeam] = useState<string>("")
  const [awayTeam, setAwayTeam] = useState<string>("")
  const [prediction, setPrediction] = useState<{
    homeScore: number;
    awayScore: number;
    confidence: number;
  } | null>(null)
  
  // Extract unique team names from matches
  const teams = Array.from(new Set([
    ...matches.map(m => m.home_team),
    ...matches.map(m => m.away_team)
  ])).sort()
  
  const handlePredict = () => {
    if (homeTeam && awayTeam) {
      const result = predictMatchOutcome(homeTeam, awayTeam, matches)
      setPrediction(result)
    }
  }
  
  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader>
        <CardTitle className="text-white">Match Outcome Predictor</CardTitle>
        <CardDescription>
          Select two teams to predict the outcome of a hypothetical match
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Home Team</label>
            <Select value={homeTeam} onValueChange={setHomeTeam}>
              <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Select Home Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={`home-${team}`} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Away Team</label>
            <Select value={awayTeam} onValueChange={setAwayTeam}>
              <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Select Away Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={`away-${team}`} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handlePredict} 
          disabled={!homeTeam || !awayTeam || homeTeam === awayTeam}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Generate Prediction
        </Button>
        
        {prediction && (
          <div className="mt-6 animate-fade-in">
            <PredictionResult 
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              prediction={prediction}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
