
import { Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PredictionResultProps {
  homeTeam: string
  awayTeam: string
  prediction: {
    homeScore: number
    awayScore: number
    confidence: number
  }
}

export function PredictionResult({ homeTeam, awayTeam, prediction }: PredictionResultProps) {
  const { homeScore, awayScore, confidence } = prediction
  
  // Determine outcome
  const resultText = homeScore > awayScore 
    ? `${homeTeam} Win` 
    : homeScore < awayScore 
      ? `${awayTeam} Win` 
      : "Draw"
  
  // Define content color based on confidence
  const confidenceColor = confidence > 75 
    ? "text-green-400" 
    : confidence > 50 
      ? "text-blue-400" 
      : "text-amber-400"
  
  return (
    <div className="bg-black/30 rounded-xl border border-white/10 p-6">
      <h3 className="text-lg font-medium text-center text-white mb-6">Predicted Result</h3>
      
      <div className="flex justify-center items-center space-x-8 mb-6">
        <div className="text-center">
          <p className="text-gray-400 mb-1">{homeTeam}</p>
          <div className="text-3xl font-bold text-white">{homeScore}</div>
        </div>
        
        <div className="text-gray-500">vs</div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-1">{awayTeam}</p>
          <div className="text-3xl font-bold text-white">{awayScore}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        {(homeScore !== awayScore) && (
          <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
            <Trophy className="h-4 w-4" />
            <span className="text-sm font-medium">{resultText}</span>
          </div>
        )}
        {(homeScore === awayScore) && (
          <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">
            <span className="text-sm font-medium">Draw</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Confidence</span>
          <span className={confidenceColor}>{confidence}%</span>
        </div>
        <Progress value={confidence} className="h-2 bg-gray-700" />
        <p className="text-xs text-gray-500 mt-2">
          Based on historical performance and head-to-head statistics
        </p>
      </div>
    </div>
  )
}
