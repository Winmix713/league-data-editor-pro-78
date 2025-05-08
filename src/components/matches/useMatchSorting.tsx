import { useState, useCallback } from "react"
import { Match } from "@/types"
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react"
import React from "react"

// Define the allowed sort fields
export type SortField = 'date' | 'round' | 'goals' | 'home_team' | 'away_team';

export interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

export function useMatchSorting(initialSortConfig?: SortConfig | null) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSortConfig || null)

  const requestSort = useCallback((key: string) => {
    setSortConfig((currentSortConfig) => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.direction === "asc" ? "desc" : "asc"
        }
      }
      return { key, direction: "asc" }
    })
  }, [])

  const sortMatches = useCallback((matches: Match[]) => {
    if (!sortConfig) return [...matches]

    return [...matches].sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      
      if (sortConfig.key === "round") {
        const extractRoundNumber = (round: string | number | undefined): number => {
          if (typeof round === 'number') return round;
          if (!round) return 0;
          const match = String(round).match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        
        const roundA = extractRoundNumber(a.round);
        const roundB = extractRoundNumber(b.round);
        return sortConfig.direction === "asc" ? roundA - roundB : roundB - roundA;
      }
      
      if (sortConfig.key === "goals") {
        const goalsA = a.home_score + a.away_score
        const goalsB = b.home_score + b.away_score
        return sortConfig.direction === "asc" ? goalsA - goalsB : goalsB - goalsA
      }

      if (sortConfig.key === "home_team") {
        return sortConfig.direction === "asc"
          ? a.home_team.localeCompare(b.home_team)
          : b.home_team.localeCompare(a.home_team)
      }

      if (sortConfig.key === "away_team") {
        return sortConfig.direction === "asc"
          ? a.away_team.localeCompare(b.away_team)
          : b.away_team.localeCompare(a.home_team)
      }

      return 0
    })
  }, [sortConfig])

  // Modified to return JSX elements instead of strings
  const getSortIcon = useCallback((key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    )
  }, [sortConfig])

  return {
    sortConfig,
    requestSort,
    sortMatches,
    getSortIcon
  }
}
