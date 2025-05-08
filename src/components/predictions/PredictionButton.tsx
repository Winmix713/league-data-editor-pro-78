
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PredictionButtonProps {
  homeTeam: string
  awayTeam: string
  isLoading: boolean
  onPredict: () => void
}

export function PredictionButton({ homeTeam, awayTeam, isLoading, onPredict }: PredictionButtonProps) {
  return (
    <Button 
      onClick={onPredict} 
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
  )
}
