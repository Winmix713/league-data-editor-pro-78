
import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MatchScore } from "./MatchScore"
import type { Match } from "@/types"

interface MatchesTableViewProps {
  matches: Match[]
  onRequestSort: (key: string) => void
  getSortIcon: (key: string) => JSX.Element
}

export const MatchesTableView = memo(({ matches, onRequestSort, getSortIcon }: MatchesTableViewProps) => {
  return (
    <div className="bg-black/30 rounded-xl overflow-hidden border border-white/5">
      <Table>
        <TableHeader className="bg-black/40">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            <TableHead className="text-gray-400 font-normal">
              <Button
                variant="ghost"
                onClick={() => onRequestSort("round")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                Round {getSortIcon("round")}
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">
              <Button
                variant="ghost"
                onClick={() => onRequestSort("date")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center"
              >
                Date {getSortIcon("date")}
              </Button>
            </TableHead>
            <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
            <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">HT</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">FT</TableHead>
            <TableHead className="text-gray-400 font-normal text-center">
              <Button
                variant="ghost"
                onClick={() => onRequestSort("goals")}
                className="text-gray-400 font-normal p-0 hover:text-white flex items-center justify-center"
              >
                Goals {getSortIcon("goals")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <TableRow
                key={`${match.home_team}-${match.away_team}-${index}`}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <TableCell>{match.round}</TableCell>
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
                <TableCell className="text-center text-gray-400">{match.home_score + match.away_score}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-gray-400">
                No matches found with the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
})

MatchesTableView.displayName = "MatchesTableView"
