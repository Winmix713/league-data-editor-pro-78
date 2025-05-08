
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamSelectionForm } from "./TeamSelectionForm"
import { PredictionError } from "./PredictionError"
import { PredictionButton } from "./PredictionButton"
import { PredictionDisplay } from "./PredictionDisplay"
import { usePrediction } from "@/hooks/predictions/usePrediction"

interface MatchPredictionPanelProps {
  matches: any[]
}

export function MatchPredictionPanel({ matches }: MatchPredictionPanelProps) {
  const [selectedPredictionType, setSelectedPredictionType] = useState<string>("standard")
  
  const { 
    homeTeam, 
    setHomeTeam, 
    awayTeam, 
    setAwayTeam, 
    isLoading, 
    prediction, 
    error, 
    isPredictionLocal,
    recentTeams, 
    handlePredict 
  } = usePrediction()
  
  return (
    <Card className="bg-black/20 border-white/5">
      <CardHeader>
        <CardTitle className="text-white">Match Outcome Predictor</CardTitle>
        <CardDescription>
          Select two teams to predict the outcome of a hypothetical match
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={selectedPredictionType} onValueChange={setSelectedPredictionType} className="w-full">
          <TabsList className="grid grid-cols-2 bg-black/20 w-full">
            <TabsTrigger value="standard" className="data-[state=active]:bg-black/30">
              Standard Prediction
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-black/30">
              Advanced Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="mt-4 space-y-4">
            <TeamSelectionForm
              homeTeam={homeTeam}
              setHomeTeam={setHomeTeam}
              awayTeam={awayTeam}
              setAwayTeam={setAwayTeam}
              recentTeams={recentTeams}
            />
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4 space-y-4">
            <TeamSelectionForm
              homeTeam={homeTeam}
              setHomeTeam={setHomeTeam}
              awayTeam={awayTeam}
              setAwayTeam={setAwayTeam}
              recentTeams={recentTeams}
              isAdvancedMode={true}
            />
          </TabsContent>
        </Tabs>
        
        <PredictionError error={error} />
        
        <PredictionButton 
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          isLoading={isLoading}
          onPredict={handlePredict}
        />
        
        <PredictionDisplay
          prediction={prediction}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          isPredictionLocal={isPredictionLocal}
        />
      </CardContent>
    </Card>
  )
}
