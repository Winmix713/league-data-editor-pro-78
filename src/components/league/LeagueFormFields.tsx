
import { useState, memo } from "react"
import type { LeagueData } from "../../types"
import { Input } from "@/components/ui/input"

interface LeagueFormFieldsProps {
  league: LeagueData
  onChange: (league: LeagueData) => void
}

export const LeagueFormFields = memo(({ league, onChange }: LeagueFormFieldsProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...league, [name]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="leagueName" className="text-gray-300 text-sm">
          League Name
        </label>
        <Input
          type="text"
          id="leagueName"
          name="name"
          value={league.name}
          onChange={handleInputChange}
          className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter league name"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="leagueSeason" className="text-gray-300 text-sm">
          Season
        </label>
        <Input
          type="text"
          id="leagueSeason"
          name="season"
          value={league.season}
          onChange={handleInputChange}
          className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter season (e.g., 2023-24)"
        />
      </div>
    </div>
  )
})

LeagueFormFields.displayName = "LeagueFormFields"
