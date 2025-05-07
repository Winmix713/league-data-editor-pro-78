
"use client"

import { memo, useMemo, useState } from "react"
import type { Match } from "../types"
import { Card, CardContent, CardHeader } from "./ui/card"
import { MatchesHeader } from "./matches/MatchesHeader"
import { MatchFilters } from "./matches/MatchFilters"
import { RoundsView } from "./matches/RoundsView"
import { TableView } from "./matches/TableView"
import { CardsView } from "./matches/CardsView"
import { NoMatchesFound } from "./matches/NoMatchesFound"
import { useMatchSorting } from "./matches/useMatchSorting"

interface MatchesTableProps {
  matches: Match[]
}

export const MatchesTable = memo(({ matches = [] }: MatchesTableProps) => {
  const [viewType, setViewType] = useState<"rounds" | "all" | "cards">("rounds")
  const [filters, setFilters] = useState({ team: "", round: "", result: "" })
  const { sortConfig, requestSort, getSortIcon } = useMatchSorting()

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const teamMatch = filters.team
        ? match.home_team.toLowerCase().includes(filters.team.toLowerCase()) ||
          match.away_team.toLowerCase().includes(filters.team.toLowerCase())
        : true

      const roundMatch = filters.round ? match.round === filters.round : true

      let resultMatch = true
      if (filters.result === "home") {
        resultMatch = match.home_score > match.away_score
      } else if (filters.result === "away") {
        resultMatch = match.home_score < match.away_score
      } else if (filters.result === "draw") {
        resultMatch = match.home_score === match.away_score
      }

      return teamMatch && roundMatch && resultMatch
    })
  }, [matches, filters])

  const sortedMatches = useMemo(() => {
    if (!sortConfig) return filteredMatches

    return [...filteredMatches].sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      if (sortConfig.key === "round") {
        const roundA = Number(a.round || 0)
        const roundB = Number(b.round || 0)
        return sortConfig.direction === "asc" ? roundA - roundB : roundB - roundA
      }

      if (sortConfig.key === "goals") {
        const goalsA = a.home_score + a.away_score
        const goalsB = b.home_score + b.away_score
        return sortConfig.direction === "asc" ? goalsA - goalsB : goalsB - goalsA
      }

      return 0
    })
  }, [filteredMatches, sortConfig])

  const matchesByRound = useMemo(() => {
    return sortedMatches.reduce(
      (acc, match) => {
        const round = String(match.round || "Unknown")
        if (!acc[round]) {
          acc[round] = []
        }
        acc[round].push(match)
        return acc
      },
      {} as Record<string, Match[]>
    )
  }, [sortedMatches])

  if (matches.length === 0) {
    return <NoMatchesFound />
  }

  return (
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

        {viewType === "cards" && <CardsView matches={sortedMatches} />}
        {viewType === "rounds" && <RoundsView matchesByRound={matchesByRound} />}
        {viewType === "all" && (
          <TableView
            matches={sortedMatches}
            requestSort={requestSort}
            getSortIcon={getSortIcon}
          />
        )}
      </CardContent>
    </Card>
  )
})

MatchesTable.displayName = "MatchesTable"
