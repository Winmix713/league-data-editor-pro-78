
import { Trophy, AlertCircle, BarChart3, LineChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { PredictionResult as PredictionResultType } from "@/types/api"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface PredictionResultProps {
  homeTeam: string
  awayTeam: string
  prediction: PredictionResultType
}

export function PredictionResult({ homeTeam, awayTeam, prediction }: PredictionResultProps) {
  const { 
    homeExpectedGoals, 
    awayExpectedGoals, 
    bothTeamsToScoreProb, 
    predictedWinner, 
    confidence,
    modelPredictions
  } = prediction
  
  // Determine outcome text
  let resultText = "Draw"
  let resultColor = "text-blue-400"
  let resultBg = "bg-blue-500/20"
  
  if (predictedWinner === 'home') {
    resultText = `${homeTeam} Win`
    resultColor = "text-green-400"
    resultBg = "bg-green-500/20"
  } else if (predictedWinner === 'away') {
    resultText = `${awayTeam} Win`
    resultColor = "text-amber-400"
    resultBg = "bg-amber-500/20"
  }
  
  // Define content color based on confidence
  const confidenceColor = confidence > 0.75 
    ? "text-green-400" 
    : confidence > 0.5 
      ? "text-blue-400" 
      : "text-amber-400"
      
  // Format data for outcome probability pie chart
  const outcomeData = [
    { name: `${homeTeam} Win`, value: modelPredictions.elo.homeWinProb * 100 },
    { name: 'Draw', value: modelPredictions.elo.drawProb * 100 },
    { name: `${awayTeam} Win`, value: modelPredictions.elo.awayWinProb * 100 },
  ]
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b']
  
  return (
    <div className="space-y-6">
      <div className="bg-black/30 rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-medium text-center text-white mb-6">Predicted Result</h3>
        
        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="text-center">
            <p className="text-gray-400 mb-1">{homeTeam}</p>
            <div className="text-3xl font-bold text-white">{Math.round(homeExpectedGoals)}</div>
            <p className="text-xs text-gray-500 mt-1">Exp: {homeExpectedGoals.toFixed(2)}</p>
          </div>
          
          <div className="text-gray-500">vs</div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-1">{awayTeam}</p>
            <div className="text-3xl font-bold text-white">{Math.round(awayExpectedGoals)}</div>
            <p className="text-xs text-gray-500 mt-1">Exp: {awayExpectedGoals.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <div className={`flex items-center gap-2 ${resultBg} ${resultColor} px-3 py-1 rounded-full`}>
            <Trophy className="h-4 w-4" />
            <span className="text-sm font-medium">{resultText}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Confidence</span>
            <span className={confidenceColor}>{Math.round(confidence * 100)}%</span>
          </div>
          <Progress value={confidence * 100} className="h-2 bg-gray-700" />
        </div>
        
        <div className="mt-4 bg-black/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Both Teams to Score Probability</span>
          </div>
          <Progress value={bothTeamsToScoreProb} className="h-2 bg-gray-700" />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-blue-400">{bothTeamsToScoreProb.toFixed(0)}%</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid grid-cols-2 bg-black/20 rounded-lg mb-4">
          <TabsTrigger value="models">
            Prediction Models
          </TabsTrigger>
          <TabsTrigger value="probabilities">
            Win Probabilities
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models">
          <Card className="bg-black/20 border-white/5">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Poisson Model</span>
                </div>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/20">
                  {modelPredictions.poisson.homeGoals} - {modelPredictions.poisson.awayGoals}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Random Forest</span>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/20">
                  {modelPredictions.randomForest.replace('_', ' ')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="probabilities">
          <Card className="bg-black/20 border-white/5">
            <CardContent className="p-4">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {outcomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
