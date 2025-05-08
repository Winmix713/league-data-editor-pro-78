
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { PredictionResult } from "./PredictionResult"
import { PredictionResultType } from "@/types/api"

interface PredictionDisplayProps {
  prediction: PredictionResultType | null
  homeTeam: string
  awayTeam: string
  isPredictionLocal: boolean
}

export function PredictionDisplay({ 
  prediction, 
  homeTeam, 
  awayTeam, 
  isPredictionLocal 
}: PredictionDisplayProps) {
  if (!prediction) return null
  
  return (
    <div className="mt-6 animate-fadeIn">
      {isPredictionLocal && (
        <Alert className="mb-4 bg-blue-500/20 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-100">
            Using local prediction engine. External data unavailable.
          </AlertDescription>
        </Alert>
      )}
      <PredictionResult 
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        prediction={prediction}
        isLocalPrediction={isPredictionLocal}
      />
    </div>
  )
}
