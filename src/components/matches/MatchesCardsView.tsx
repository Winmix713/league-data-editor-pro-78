
import { memo } from "react"
import { Clock } from "lucide-react"
import type { Match } from "@/types"

interface MatchesCardsViewProps {
  matches: Match[]
}

export const MatchesCardsView = memo(({ matches }: MatchesCardsViewProps) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No matches available to display</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {matches.map((match, index) => (
        <div 
          key={`${match.home_team}-${match.away_team}-${index}`} 
          className="bg-black/30 border border-white/5 rounded-lg overflow-hidden transition-all hover:bg-black/40"
        >
          <div className="p-3 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-400">{match.date}</span>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
              Round {match.round}
            </span>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{match.home_team}</span>
                <span className="text-xl font-bold text-white">{match.home_score}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{match.away_team}</span>
                <span className="text-xl font-bold text-white">{match.away_score}</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Half-time: {match.ht_home_score} - {match.ht_away_score}
            </div>
          </div>
          
          <div className="px-4 py-3 border-t border-white/5 bg-black/10 flex justify-between">
            <span className="text-xs text-gray-500">
              {match.venue || 'Unknown venue'}
            </span>
            <button className="text-xs text-blue-400 hover:text-blue-300">
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
})

MatchesCardsView.displayName = "MatchesCardsView"
