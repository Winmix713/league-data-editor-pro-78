
import { useState, useMemo, useCallback } from 'react'
import type { Match } from '@/types'

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

interface Filters {
  searchTerm?: string
  homeTeam?: string
  awayTeam?: string
  fromDate?: Date
  toDate?: Date
  result?: 'home' | 'away' | 'draw'
}

export function useMatchFiltering(matches: Match[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [filters, setFilters] = useState<Filters>({})

  // Handle sorting
  const requestSort = useCallback((key: string) => {
    setSortConfig((currentSortConfig) => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc'
        }
      }
      return { key, direction: 'asc' }
    })
  }, [])

  // Filter matches
  const filteredMatches = useMemo(() => {
    if (!matches) return []
    
    return matches.filter(match => {
      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase()
        const matchesSearch = (
          match.homeTeam.toLowerCase().includes(searchTerm) ||
          match.awayTeam.toLowerCase().includes(searchTerm) ||
          `${match.homeScore}-${match.awayScore}`.includes(searchTerm) ||
          (match.date && match.date.toLowerCase().includes(searchTerm))
        )
        if (!matchesSearch) return false
      }
      
      // Home team filter
      if (filters.homeTeam && !match.homeTeam.toLowerCase().includes(filters.homeTeam.toLowerCase())) {
        return false
      }
      
      // Away team filter
      if (filters.awayTeam && !match.awayTeam.toLowerCase().includes(filters.awayTeam.toLowerCase())) {
        return false
      }
      
      // Result filter
      if (filters.result) {
        const homeScore = parseInt(match.homeScore.toString(), 10)
        const awayScore = parseInt(match.awayScore.toString(), 10)
        
        if (filters.result === 'home' && homeScore <= awayScore) return false
        if (filters.result === 'away' && homeScore >= awayScore) return false
        if (filters.result === 'draw' && homeScore !== awayScore) return false
      }
      
      return true
    })
  }, [matches, filters])
  
  // Sort filtered matches
  const sortedMatches = useMemo(() => {
    if (!filteredMatches) return []
    
    const sortableMatches = [...filteredMatches]
    
    if (sortConfig !== null) {
      sortableMatches.sort((a, b) => {
        let aValue = a[sortConfig.key as keyof Match] as string | number
        let bValue = b[sortConfig.key as keyof Match] as string | number
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    
    return sortableMatches
  }, [filteredMatches, sortConfig])
  
  // Group matches by round
  const matchesByRound = useMemo(() => {
    const result: Record<number, Match[]> = {}
    
    if (sortedMatches) {
      sortedMatches.forEach((match) => {
        const roundNumber = match.round ? Number(match.round) : 0
        if (!result[roundNumber]) {
          result[roundNumber] = []
        }
        result[roundNumber].push(match)
      })
    }
    
    return result
  }, [sortedMatches])
  
  return {
    sortedMatches,
    matchesByRound,
    sortConfig,
    requestSort,
    setFilters
  }
}
