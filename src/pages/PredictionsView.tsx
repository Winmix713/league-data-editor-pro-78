
import { memo, useState } from "react"
import { useLeagueState } from "@/hooks/league"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MatchPredictionPanel } from "@/components/predictions/MatchPredictionPanel"
import { Button } from "@/components/ui/button"
import { RefreshCw, ArrowLeft } from "lucide-react"
import { LeagueStats } from "@/components/stats/LeagueStats"
import { calculateLeagueStatistics } from "@/utils/leagueStatistics"

export const PredictionsView = memo(() => {
  const { 
    currentMatches, 
    selectedLeagueId, 
    leaguesList, 
    navigate, 
    isLoading, 
    refreshData 
  } = useLeagueState()
  
  // Get the currently selected league
  const selectedLeague = leaguesList.find(league => league.id === selectedLeagueId)
  
  // Calculate statistics for the selected league
  const leagueStatistics = calculateLeagueStatistics(currentMatches)
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("leagues")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-white">
            Match Predictions {selectedLeague ? `- ${selectedLeague.name}` : ''}
          </h2>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          onClick={refreshData}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MatchPredictionPanel matches={currentMatches} />
          
          <Card className="mt-6 bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white">Prediction Model Information</CardTitle>
              <CardDescription>How the prediction system works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                The match outcome predictor uses a multi-factor model that considers:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                <li>Historical match results between the two teams</li>
                <li>Recent form (last 5 matches) with recency weighting</li>
                <li>Home advantage factor (1.2x boost to home team scoring)</li>
                <li>Average goals scored and conceded by each team</li>
                <li>League position and relative team strength</li>
              </ul>
              <p className="text-gray-300 mt-4">
                Confidence level is calculated based on the amount of available data and the consistency of past results.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <LeagueStats statistics={leagueStatistics} league={selectedLeague} />
        </div>
      </div>
    </div>
  )
})

PredictionsView.displayName = "PredictionsView"
