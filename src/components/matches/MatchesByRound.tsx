
import { memo } from "react"
import { Match } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

interface MatchesByRoundProps {
  matchesByRound: Record<string, Match[]>
}

export const MatchesByRound = memo(({ matchesByRound }: MatchesByRoundProps) => {
  // Get the round numbers and sort them
  const rounds = Object.keys(matchesByRound || {}).sort((a, b) => {
    // Try to convert to numbers for numeric sorting, handling non-numeric rounds
    const numA = isNaN(Number(a)) ? Infinity : Number(a)
    const numB = isNaN(Number(b)) ? Infinity : Number(b)
    return numA - numB
  })
  
  if (!matchesByRound || rounds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No matches organized by rounds available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 mt-2">
      {rounds.map((round) => (
        <div key={round} className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <span className="mr-2">Round {round}</span>
              <Badge variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                {matchesByRound[round]?.length || 0} matches
              </Badge>
            </h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          
          <div className="bg-black/20 border border-white/5 rounded-lg overflow-hidden divide-y divide-white/5">
            {matchesByRound[round]?.map((match, index) => (
              <div 
                key={`${round}-${match.home_team}-${match.away_team}-${index}`} 
                className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center mb-2 sm:mb-0 sm:mr-auto">
                  <div className="text-sm text-gray-400 w-32 hidden sm:flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {match.date}
                  </div>
                  
                  <div className="flex flex-1 items-center gap-4">
                    <div className="text-right flex-1">
                      <p className="font-medium text-white">{match.home_team}</p>
                      <p className="text-xs text-gray-500">Home</p>
                    </div>
                    
                    <div className="flex flex-col items-center bg-black/30 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${match.home_score > match.away_score ? "text-green-400" : "text-white"}`}>
                          {match.home_score}
                        </span>
                        <span className="text-gray-500 px-0.5">-</span>
                        <span className={`font-bold text-lg ${match.away_score > match.home_score ? "text-green-400" : "text-white"}`}>
                          {match.away_score}
                        </span>
                      </div>
                      
                      <span className="text-xs text-gray-500">
                        HT: {match.ht_home_score} - {match.ht_away_score}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-white">{match.away_team}</p>
                      <p className="text-xs text-gray-500">Away</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-0 flex items-center justify-end gap-4 text-sm">
                  <span className="text-xs flex items-center text-gray-500 sm:hidden">
                    <Calendar className="h-3 w-3 mr-1" />
                    {match.date}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 bg-blue-500/10 px-3 py-1 rounded-full transition-colors">
                    <Clock className="h-3 w-3" />
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
