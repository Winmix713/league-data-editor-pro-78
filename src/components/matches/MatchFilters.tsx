
import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Filter, X } from "lucide-react"

interface MatchFiltersProps {
  onFilterChange: (filters: any) => void
}

export const MatchFilters = memo(({ onFilterChange }: MatchFiltersProps) => {
  const [team, setTeam] = useState("")
  const [round, setRound] = useState("")
  const [result, setResult] = useState("")
  const [goals, setGoals] = useState("")

  const handleTeamChange = (value: string) => {
    setTeam(value)
    onFilterChange({ team: value, round, result, goals })
  }

  const handleRoundChange = (value: string) => {
    setRound(value)
    onFilterChange({ team, round: value, result, goals })
  }

  const handleResultChange = (value: string) => {
    setResult(value)
    onFilterChange({ team, round, result: value, goals })
  }

  const handleGoalsChange = (value: string) => {
    setGoals(value)
    onFilterChange({ team, round, result, goals: value })
  }

  const clearFilters = () => {
    setTeam("")
    setRound("")
    setResult("")
    setGoals("")
    onFilterChange({ team: "", round: "", result: "", goals: "" })
  }

  const hasActiveFilters = team || round || result || goals

  return (
    <div className="mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 bg-black/20 border-white/10 text-white hover:bg-black/40 ${
              hasActiveFilters ? "ring-1 ring-blue-500" : ""
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {[team, round, result, goals].filter(Boolean).length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-[#0a0f14] border-white/10">
          <div className="space-y-4 p-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Match Filters</h4>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-gray-400 hover:text-white"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>

            <div className="grid gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Team</label>
                <input
                  type="text"
                  placeholder="Filter by team name"
                  className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-1.5 text-sm"
                  value={team}
                  onChange={(e) => handleTeamChange(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Round</label>
                <Select value={round} onValueChange={handleRoundChange}>
                  <SelectTrigger className="bg-black/30 border-white/10">
                    <SelectValue placeholder="Any round" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f14] border-white/10 text-white">
                    <SelectGroup>
                      <SelectItem value="">Any round</SelectItem>
                      {Array.from({ length: 38 }, (_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          Round {i + 1}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400">Result</label>
                <Select value={result} onValueChange={handleResultChange}>
                  <SelectTrigger className="bg-black/30 border-white/10">
                    <SelectValue placeholder="Any result" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f14] border-white/10 text-white">
                    <SelectGroup>
                      <SelectItem value="">Any result</SelectItem>
                      <SelectItem value="home">Home win</SelectItem>
                      <SelectItem value="away">Away win</SelectItem>
                      <SelectItem value="draw">Draw</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Goals</label>
                <Select value={goals} onValueChange={handleGoalsChange}>
                  <SelectTrigger className="bg-black/30 border-white/10">
                    <SelectValue placeholder="Any goals" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f14] border-white/10 text-white">
                    <SelectGroup>
                      <SelectItem value="">Any goals</SelectItem>
                      <SelectItem value="under2">Under 2 goals</SelectItem>
                      <SelectItem value="2-3">2-3 goals</SelectItem>
                      <SelectItem value="over3">Over 3 goals</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
})

MatchFilters.displayName = "MatchFilters"
