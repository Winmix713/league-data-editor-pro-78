
"use client"

import type React from "react"
import { useState, memo } from "react"
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
  onNavigateToTab?: (tabName: string) => void
}

export const LeagueDetails = memo(
  ({ league, matches, onBack, onUpdateLeague, onUpdateMatches, onNavigateToTab }: LeagueDetailsProps) => {
    const [activeTab, setActiveTab] = useState<string>("matches")
    const [isEditing, setIsEditing] = useState(false)

    const handleToggleEdit = () => {
      if (isEditing) {
        // If currently editing, this acts as a cancel
        setIsEditing(false)
      } else {
        // If not editing, enter edit mode
        setIsEditing(true)
      }
    }

    const handleSaveComplete = () => {
      setIsEditing(false)
    }

    const handleTabChange = (tab: string) => {
      setActiveTab(tab)
      if (onNavigateToTab) {
        onNavigateToTab(tab)
      }
    }

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
            onSave={handleSaveComplete}
          />
        )}

        <LeagueTabsView 
          matches={matches} 
          defaultTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    )
  },
)

LeagueDetails.displayName = "LeagueDetails"
