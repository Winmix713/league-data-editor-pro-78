
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PredictionResult } from "./PredictionResult"
import { getPrediction } from "@/services/api"
import { PredictionResult as PredictionResultType } from "@/types/api"
import { Loader2 } from "lucide-react"
import { TEAMS } from "@/data/teams"

interface MatchPredictionPanelProps {
  matches: any[]
}

export function MatchPredictionPanel({ matches }: MatchPredictionPanelProps) {
  const [homeTeam, setHomeTeam] = useState<string>("")
  const [awayTeam, setAwayTeam] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null)
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  
  // Sort teams by name
  const sortedTeams = TEAMS.sort((a, b) => a.name.localeCompare(b.name))
  
  const handlePredict = async () => {
    if (homeTeam && awayTeam) {
      setIsLoading(true)
      try {
        const result = await getPrediction(homeTeam, awayTeam)
        setPrediction(result.prediction || null)
      } catch (error) {
        console.error("Prediction error:", error)
      } finally {
        setIsLoading(false)
      }
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
                {sortedTeams.map((team) => (
                  <SelectItem key={`home-${team.id}`} value={team.name}>
                    {team.name}
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
                {sortedTeams.map((team) => (
                  <SelectItem key={`away-${team.id}`} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handlePredict} 
          disabled={!homeTeam || !awayTeam || homeTeam === awayTeam || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Prediction...
            </div>
          ) : (
            "Generate Prediction"
          )}
        </Button>
        
        {prediction && (
          <div className="mt-6 animate-fadeIn">
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
