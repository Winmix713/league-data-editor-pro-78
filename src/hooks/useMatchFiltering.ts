
import { useState, useMemo } from "react"
import type { Match } from "@/types"
import type { FilterValues } from "@/components/matches/MatchFilters"

interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

export function useMatchFiltering(matches: Match[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [filters, setFilters] = useState<FilterValues>({ team: "", round: "", result: "" })

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
        const roundA = Number.parseInt((a.round || "0").replace(/\D/g, ""))
        const roundB = Number.parseInt((b.round || "0").replace(/\D/g, ""))
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
        const round = match.round || "Unknown"
        if (!acc[round]) {
          acc[round] = []
        }
        acc[round].push(match)
        return acc
      },
      {} as Record<string, Match[]>
    )
  }, [sortedMatches])

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  return {
    sortedMatches,
    matchesByRound,
    filters,
    setFilters,
    sortConfig,
    requestSort,
  }
}
