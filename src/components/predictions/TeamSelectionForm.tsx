
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TEAMS } from "@/data/teams"

interface RecentTeams {
  home: string[]
  away: string[]
}

interface TeamSelectionFormProps {
  homeTeam: string
  setHomeTeam: (team: string) => void
  awayTeam: string
  setAwayTeam: (team: string) => void
  recentTeams: RecentTeams
  isAdvancedMode?: boolean
}

export function TeamSelectionForm({
  homeTeam,
  setHomeTeam,
  awayTeam,
  setAwayTeam,
  recentTeams,
  isAdvancedMode = false
}: TeamSelectionFormProps) {
  // Sort teams by name
  const sortedTeams = TEAMS.sort((a, b) => a.name.localeCompare(b.name))

  const renderRecentTeams = (type: 'home' | 'away') => {
    const teams = recentTeams[type]
    if (!teams || teams.length === 0) return null
    
    return (
      <div className="mt-2">
        <p className="text-xs text-gray-400">Recent {type} teams:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {teams.map(team => (
            <Badge 
              key={team} 
              variant="outline" 
              className="cursor-pointer hover:bg-white/10 bg-black/30 text-xs"
              onClick={() => type === 'home' ? setHomeTeam(team) : setAwayTeam(team)}
            >
              {team}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Home Team</label>
        <Select value={homeTeam} onValueChange={setHomeTeam}>
          <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
            <SelectValue placeholder="Select Home Team" />
          </SelectTrigger>
          <SelectContent>
            {sortedTeams.map((team) => (
              <SelectItem key={`home-${isAdvancedMode ? 'advanced-' : ''}${team.id}`} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!isAdvancedMode && renderRecentTeams('home')}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Away Team</label>
        <Select value={awayTeam} onValueChange={setAwayTeam}>
          <SelectTrigger className="w-full bg-black/30 border-white/10 text-white">
            <SelectValue placeholder="Select Away Team" />
          </SelectTrigger>
          <SelectContent>
            {sortedTeams.map((team) => (
              <SelectItem key={`away-${isAdvancedMode ? 'advanced-' : ''}${team.id}`} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!isAdvancedMode && renderRecentTeams('away')}
      </div>

      {isAdvancedMode && (
        <div className="col-span-2 space-y-2">
          <label className="text-sm text-gray-400">Analysis Parameters</label>
          <div className="grid grid-cols-2 gap-2">
            <Select defaultValue="last10">
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Data Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="last10">Last 10 Matches</SelectItem>
                <SelectItem value="last5">Last 5 Matches</SelectItem>
                <SelectItem value="season">Current Season</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="standard">
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Analysis Depth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deep">Deep Analysis</SelectItem>
                <SelectItem value="head2head">Head-to-Head Focus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
