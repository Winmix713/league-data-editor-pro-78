
import { memo } from "react"
import { Match } from "@/types"
import { MatchCard } from "./MatchCard"
import { NoMatchesFound } from "./NoMatchesFound"

interface CardsViewProps {
  matches: Match[]
}

export const CardsView = memo(({ matches }: CardsViewProps) => {
  if (matches.length === 0) {
    return <NoMatchesFound />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {matches.map((match, index) => (
        <MatchCard key={`${match.home_team}-${match.away_team}-${index}`} match={match} />
      ))}
    </div>
  )
})

CardsView.displayName = "CardsView"
