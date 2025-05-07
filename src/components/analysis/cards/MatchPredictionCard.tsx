
import { Button } from "@/components/ui/button";

interface MatchPredictionCardProps {
  date: string
  homeTeam: string
  awayTeam: string
  predictedScore: string
  confidence?: number
}

export function MatchPredictionCard({ date, homeTeam, awayTeam, predictedScore, confidence }: MatchPredictionCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4">
      <div className="flex items-center gap-4 mb-3 md:mb-0">
        <div className="bg-black/40 px-3 py-2 rounded-lg text-sm text-gray-300">
          {date}
        </div>
        <div className="text-center md:text-left">
          <p className="font-medium text-white">{homeTeam}</p>
          <p className="text-sm text-gray-400">vs</p>
          <p className="font-medium text-white">{awayTeam}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">Predicted Score</p>
          <p className="text-xl font-bold text-blue-400">{predictedScore}</p>
          {confidence !== undefined && (
            <p className="text-xs text-gray-500">Confidence: {confidence}%</p>
          )}
        </div>
        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
          Details
        </Button>
      </div>
    </div>
  )
}
