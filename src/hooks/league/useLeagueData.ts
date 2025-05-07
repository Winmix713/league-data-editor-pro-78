
import { useState, useCallback } from "react"
import { initialLeagues } from "./constants"
import { v4 as uuidv4 } from 'uuid'
import type { LeagueData, Match } from "@/types"

export const useLeagueData = (setSelectedLeagueId: (id: string | null) => void) => {
  // Data state
  const [leaguesList, setLeaguesList] = useState<LeagueData[]>(initialLeagues)
  const [currentMatches, setCurrentMatches] = useState<Match[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewLeagueModalOpen, setIsNewLeagueModalOpen] = useState(false)

  // Data actions
  const handleLeagueAction = useCallback((leagueId: string, action: "view" | "edit" | "complete" | "delete") => {
    switch (action) {
      case "view":
      case "edit":
        setSelectedLeagueId(leagueId)
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

  const handleUpdateMatches = useCallback((updatedMatches: Match[]) => {
    setCurrentMatches(updatedMatches)
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
