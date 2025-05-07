
import { useState, useCallback, useEffect } from "react"
import { initialLeagues } from "./constants"
import { v4 as uuidv4 } from 'uuid'
import type { LeagueData, Match } from "@/types"

export const useLeagueData = (setSelectedLeagueId: (id: string | null) => void) => {
  // Data state
  const [leaguesList, setLeaguesList] = useState<LeagueData[]>(() => {
    // Try to load from localStorage if available
    const savedLeagues = localStorage.getItem('v-sports-leagues')
    return savedLeagues ? JSON.parse(savedLeagues) : initialLeagues
  })
  const [currentMatches, setCurrentMatches] = useState<Match[]>(() => {
    // Try to load from localStorage if available
    const savedMatches = localStorage.getItem('v-sports-current-matches')
    return savedMatches ? JSON.parse(savedMatches) : []
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewLeagueModalOpen, setIsNewLeagueModalOpen] = useState(false)

  // Save leagues to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('v-sports-leagues', JSON.stringify(leaguesList))
  }, [leaguesList])

  // Save current matches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('v-sports-current-matches', JSON.stringify(currentMatches))
  }, [currentMatches])

  // Data actions
  const handleLeagueAction = useCallback((leagueId: string, action: "view" | "edit" | "complete" | "delete") => {
    switch (action) {
      case "view":
      case "edit":
        setSelectedLeagueId(leagueId)
        // Load matches for the selected league
        const savedLeagueMatches = localStorage.getItem(`v-sports-matches-${leagueId}`)
        if (savedLeagueMatches) {
          setCurrentMatches(JSON.parse(savedLeagueMatches))
        } else {
          setCurrentMatches([])
        }
        break
      case "complete":
        setLeaguesList(prev => prev.map(league => 
          league.id === leagueId 
            ? {
                ...league,
                status: "Completed",
                winner: "Winner Team", // This would come from standings calculation
                secondPlace: "Second Team",
                thirdPlace: "Third Team",
              } 
            : league
        ))
        break
      case "delete":
        setLeaguesList(prev => prev.filter(league => league.id !== leagueId))
        // Also clean up associated matches in localStorage
        localStorage.removeItem(`v-sports-matches-${leagueId}`)
        break
    }
  }, [setSelectedLeagueId])

  const handleCreateLeague = useCallback((leagueData: Partial<LeagueData>) => {
    const id = leagueData.id || uuidv4()
    const newLeague: LeagueData = {
      id: id,
      name: leagueData.name || `League ${id}`,
      season: leagueData.season || "2023-2024",
      winner: leagueData.winner || "-",
      secondPlace: leagueData.secondPlace || "-",
      thirdPlace: leagueData.thirdPlace || "-",
      status: leagueData.status || "In Progress",
    }
    setLeaguesList(prev => [...prev, newLeague])
    setIsNewLeagueModalOpen(false)
  }, [])

  const handleUpdateLeague = useCallback((updatedLeague: LeagueData) => {
    setLeaguesList(prev => prev.map(league => 
      league.id === updatedLeague.id ? updatedLeague : league
    ))
  }, [])

  const handleUpdateMatches = useCallback((updatedMatches: Match[], leagueId?: string) => {
    setCurrentMatches(updatedMatches)
    
    // If leagueId is provided, save these matches specifically for that league
    if (leagueId) {
      localStorage.setItem(`v-sports-matches-${leagueId}`, JSON.stringify(updatedMatches))
    }
  }, [])

  return {
    // Data state
    leaguesList,
    currentMatches,
    searchTerm,
    isNewLeagueModalOpen,
    
    // Data actions
    handleLeagueAction,
    handleCreateLeague,
    handleUpdateLeague,
    handleUpdateMatches,
    setSearchTerm,
    setIsNewLeagueModalOpen
  }
}
