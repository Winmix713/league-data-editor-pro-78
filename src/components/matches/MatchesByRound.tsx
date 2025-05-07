
import { memo } from "react"
import { Match } from "@/types"

interface MatchesByRoundProps {
  matchesByRound: Record<string, Match[]>
}

export const MatchesByRound = memo(({ matchesByRound }: MatchesByRoundProps) => {
  // Get the round numbers and sort them
  const rounds = Object.keys(matchesByRound).sort((a, b) => {
    // Try to convert to numbers for numeric sorting, handling non-numeric rounds
    const numA = isNaN(Number(a)) ? Infinity : Number(a)
    const numB = isNaN(Number(b)) ? Infinity : Number(b)
    return numA - numB
  })
  
  if (rounds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No matches organized by rounds available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-2">
      {rounds.map((round) => (
        <div key={round} className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-medium text-white">Round {round}</h3>
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-sm text-gray-500">
              {matchesByRound[round]?.length || 0} matches
            </span>
          </div>
          
          <div className="bg-black/20 border border-white/5 rounded-lg overflow-hidden divide-y divide-white/5">
            {matchesByRound[round]?.map((match, index) => (
              <div 
                key={`${round}-${match.home_team}-${match.away_team}-${index}`} 
                className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center mb-2 sm:mb-0 sm:mr-auto">
                  <div className="text-sm text-gray-400 w-24 hidden sm:block">
                    {match.date}
                  </div>
                  
                  <div className="flex flex-1 items-center gap-4">
                    <div className="text-right flex-1">
                      <p className="font-medium text-white">{match.home_team}</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-white">{match.home_score}</span>
                        <span className="text-gray-500 px-0.5">-</span>
                        <span className="font-bold text-lg text-white">{match.away_score}</span>
                      </div>
                      
                      <span className="text-xs text-gray-500">
                        HT: {match.ht_home_score} - {match.ht_away_score}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-white">{match.away_team}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-0 flex items-center justify-end gap-4 text-sm">
                  <span className="text-xs text-gray-500 sm:hidden">
                    {match.date}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-xs">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

MatchesByRound.displayName = "MatchesByRound"
