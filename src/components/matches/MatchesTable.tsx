
import { memo, useState, useMemo } from "react"
import { AlertCircle, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MatchFilters } from "./MatchFilters"
import { MatchesHeader } from "./MatchesHeader"
import { MatchesTableView } from "./MatchesTableView"
import { MatchesByRound } from "./MatchesByRound"
import { MatchesCardsView } from "./MatchesCardsView"
import { useMatchFiltering } from "@/hooks/useMatchFiltering"
import MatchDetail from "../MatchDetail"
import type { Match } from "@/types"

interface MatchesTableProps {
  matches: Match[]
}

export const MatchesTable = memo(({ matches = [] }: MatchesTableProps) => {
  const [viewType, setViewType] = useState<"rounds" | "all" | "cards">("rounds")
  const { sortedMatches, matchesByRound, setFilters, requestSort, sortConfig } = useMatchFiltering(matches || [])
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    )
  }
  
  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match)
    setIsDetailOpen(true)
  }
  
  const handleCloseDetail = () => {
    setIsDetailOpen(false)
  }

  if (!matches || matches.length === 0) {
    return (
      <Card className="bg-black/20 border-white/5">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="w-8 h-8 text-gray-500" />
            <p className="text-gray-400">No matches available for this league yet.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="bg-black/20 border-white/5">
        <CardHeader className="pb-0">
          <MatchesHeader
            viewType={viewType}
            setViewType={setViewType}
            requestSort={requestSort}
            getSortIcon={getSortIcon}
          />
        </CardHeader>

        <CardContent className="pt-6">
          <MatchFilters onFilterChange={setFilters} />

          {viewType === "cards" ? (
            <MatchesCardsView matches={sortedMatches} onMatchClick={handleMatchClick} />
          ) : viewType === "rounds" ? (
            <MatchesByRound matchesByRound={matchesByRound} onMatchClick={handleMatchClick} />
          ) : (
            <MatchesTableView
              matches={sortedMatches}
              onRequestSort={requestSort}
              getSortIcon={getSortIcon}
              onMatchClick={handleMatchClick}
            />
          )}
        </CardContent>
      </Card>
      
      {selectedMatch && (
        <MatchDetail 
          match={selectedMatch} 
          isOpen={isDetailOpen} 
          onClose={handleCloseDetail} 
        />
      )}
    </>
  )
})

MatchesTable.displayName = "MatchesTable"
