
import { useState } from "react"
import { toast } from "sonner"
import type { LeagueData, Match } from "@/types"

interface UseLeagueStateProps {
  initialActiveTab?: string
  initialSelectedLeague?: LeagueData | null
  initialMatches?: Match[]
}

export function useLeagueState({
  initialActiveTab = "league-list",
  initialSelectedLeague = null,
  initialMatches = [],
}: UseLeagueStateProps = {}) {
  const [activeTab, setActiveTab] = useState(initialActiveTab)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(initialSelectedLeague)
  const [matches, setMatches] = useState<Match[]>(initialMatches)
  const [dataUpdatedAt, setDataUpdatedAt] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentRoute, setCurrentRoute] = useState('/')
  
  // State for MatchDetail dialog
  const [isMatchDetailOpen, setIsMatchDetailOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  const handleRefreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      const now = new Date()
      setDataUpdatedAt(now)
      toast.success("Data refreshed successfully", {
        description: `All data has been updated as of ${now.toLocaleTimeString()}`
      })
    }, 2000)
  }

  const handleLeagueUpdate = (updatedLeague: LeagueData) => {
    setSelectedLeague(updatedLeague)
    toast("League details updated.")
  }

  const handleMatchesUpdate = (updatedMatches: Match[]) => {
    setMatches(updatedMatches)
    toast("Matches updated.")
  }

  const handleNavigate = (route: string) => {
    setCurrentRoute(route)
    // Handle navigation based on routes
    if (route === '/' || route === '/leagues') {
      setActiveTab('league-list')
    } else if (route === '/statistics' && selectedLeague) {
      setActiveTab('statistics')
    }
  }

  const handleSelectLeague = (league: LeagueData, leagueMatches: Match[]) => {
    setSelectedLeague(league)
    setMatches(leagueMatches)
    setActiveTab("league-details")
    setIsLoading(false)
  }

  const handleBackToList = () => {
    setActiveTab("league-list")
  }
  
  const handleBackFromEditor = () => {
    setIsEditing(false)
    setActiveTab("league-list")
  }

  const handleOpenMatchDetail = (match: Match) => {
    setSelectedMatch(match)
    setIsMatchDetailOpen(true)
  }

  return {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    selectedLeague,
    setSelectedLeague,
    matches,
    setMatches,
    dataUpdatedAt,
    setDataUpdatedAt,
    isRefreshing,
    setIsRefreshing,
    isLoading,
    setIsLoading,
    currentRoute,
    setCurrentRoute,
    isMatchDetailOpen,
    setIsMatchDetailOpen,
    selectedMatch,
    setSelectedMatch,
    handleRefreshData,
    handleLeagueUpdate,
    handleMatchesUpdate,
    handleNavigate,
    handleSelectLeague,
    handleBackToList,
    handleBackFromEditor,
    handleOpenMatchDetail,
  }
}
