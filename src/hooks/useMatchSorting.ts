
import { useState, useCallback, useMemo } from "react"
import type { Match } from "@/types"
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react"
import React from "react"

// Define the allowed sort fields
export type SortField = 'date' | 'round' | 'goals' | 'home_team' | 'away_team';
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  key: SortField
  direction: SortDirection
}

export function useMatchSorting(initialSortConfig?: SortConfig | null) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSortConfig || null)

  const requestSort = useCallback((key: SortField) => {
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

  // Helper function to extract numeric value from round data
  const extractRoundNumber = useCallback((round: string | number | undefined): number => {
    if (typeof round === 'number') return round;
    if (!round) return 0;
    const match = String(round).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }, []);

  const sortMatches = useCallback((matches: Match[]) => {
    if (!sortConfig) return [...matches];
    
    return [...matches].sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.key) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        
        case "round":
          const roundA = extractRoundNumber(a.round);
          const roundB = extractRoundNumber(b.round);
          comparison = roundA - roundB;
          break;
        
        case "goals":
          const goalsA = a.home_score + a.away_score;
          const goalsB = b.home_score + b.away_score;
          comparison = goalsA - goalsB;
          break;
        
        case "home_team":
          comparison = a.home_team.localeCompare(b.home_team);
          break;
        
        case "away_team":
          comparison = a.away_team.localeCompare(b.away_team);
          break;
      }
      
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [sortConfig, extractRoundNumber]);

  // Create memoized icons for better performance
  const getSortIcon = useCallback((key: SortField) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  }, [sortConfig]);

  return {
    sortConfig,
    requestSort,
    sortMatches,
    getSortIcon
  };
}
