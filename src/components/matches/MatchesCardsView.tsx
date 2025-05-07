
import { memo } from "react"
import { MatchCard } from "./MatchCard"
import type { Match } from "@/types"

interface MatchesCardsViewProps {
  matches: Match[]
}

export const MatchesCardsView = memo(({ matches }: MatchesCardsViewProps) => {
  if (matches.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-400">
        No matches found with the current filters.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {matches.map((match, index) => (
        <MatchCard key={`${match.home_team}-${match.away_team}-${index}`} match={match} />
      ))}
    </div>
  )
})

MatchesCardsView.displayName = "MatchesCardsView"
