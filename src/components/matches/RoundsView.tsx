
import { memo } from "react"
import { Match } from "@/types"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table" 
import { MatchScore } from "./MatchScore"

interface RoundsViewProps {
  matchesByRound: Record<string, Match[]>
}

export const RoundsView = memo(({ matchesByRound }: RoundsViewProps) => {
  const roundEntries = Object.entries(matchesByRound)

  if (roundEntries.length === 0) {
    return (
      <div className="text-center py-8 text-white opacity-70">
        No matches found with the current filters.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {roundEntries.map(([round, roundMatches]) => (
        <div key={round} className="bg-black/30 rounded-xl overflow-hidden border border-white/5">
          <div className="flex items-center gap-2 p-3 bg-black/40">
            <span className="w-6 h-6 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
              {round}
            </span>
            <h4 className="text-base font-medium text-white">Round {round}</h4>
            <span className="text-xs text-gray-400 ml-auto">{roundMatches.length} matches</span>
          </div>
          <Table>
            <TableHeader className="bg-black/20">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-normal">Date</TableHead>
                <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
                <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">HT</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">FT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roundMatches.map((match, index) => (
                <TableRow
                  key={`${match.home_team}-${match.away_team}-${index}`}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <TableCell>{match.date}</TableCell>
                  <TableCell
                    className={`font-medium text-white ${match.home_score > match.away_score ? "font-bold" : ""}`}
                  >
                    {match.home_team}
                  </TableCell>
                  <TableCell
                    className={`font-medium text-white ${match.home_score < match.away_score ? "font-bold" : ""}`}
                  >
                    {match.away_team}
                  </TableCell>
                  <TableCell className="text-center">
                    <MatchScore homeScore={match.ht_home_score} awayScore={match.ht_away_score} isHalfTime />
                  </TableCell>
                  <TableCell className="text-center">
                    <MatchScore homeScore={match.home_score} awayScore={match.away_score} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
})

RoundsView.displayName = "RoundsView"
