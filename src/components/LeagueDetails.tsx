
"use client"

import { useState, useCallback } from "react"
import type { Match, LeagueData } from "../types"
import { LeagueHeader } from "./league/LeagueHeader"
import { LeagueEditForm } from "./league/LeagueEditForm"
import { LeagueTabsView } from "./league/LeagueTabsView"

interface LeagueDetailsProps {
  league: LeagueData
  matches: Match[]
  onBack: () => void
  onUpdateLeague: (updatedLeague: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
}

export const LeagueDetails = ({ 
  league, 
  matches, 
  onBack, 
  onUpdateLeague, 
  onUpdateMatches 
}: LeagueDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("matches")

  const handleToggleEdit = useCallback(() => {
    setIsEditing(prev => !prev)
  }, [])

  const handleSave = useCallback(() => {
    setIsEditing(false)
  }, [])

  return (
    <div className="space-y-6 animate-fadeIn">
      <LeagueHeader 
        isEditing={isEditing} 
        onBack={onBack} 
        onToggleEdit={handleToggleEdit} 
      />

      {isEditing && (
        <LeagueEditForm
          league={league}
          onUpdateLeague={onUpdateLeague}
          onUpdateMatches={onUpdateMatches}
          onSave={handleSave}
        />
      )}

      <LeagueTabsView 
        league={league}
        matches={matches} 
        defaultTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  )
}
