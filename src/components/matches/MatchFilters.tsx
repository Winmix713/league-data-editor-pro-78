
import { memo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MatchFiltersProps {
  onFilterChange: (filters: FilterValues) => void
}

export interface FilterValues {
  team: string
  round: string
  result: string
}

export const MatchFilters = memo(({ onFilterChange }: MatchFiltersProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    team: "",
    round: "",
    result: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Filter by team..."
          className="bg-black/30 border-white/10 text-white"
          value={filters.team}
          onChange={(e) => handleFilterChange("team", e.target.value)}
        />
      </div>
      <Select value={filters.round} onValueChange={(value) => handleFilterChange("round", value)}>
        <SelectTrigger className="w-full md:w-[180px] bg-black/30 border-white/10 text-white">
          <SelectValue placeholder="Round" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rounds</SelectItem>
          <SelectItem value="1">Round 1</SelectItem>
          <SelectItem value="2">Round 2</SelectItem>
          <SelectItem value="3">Round 3</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.result} onValueChange={(value) => handleFilterChange("result", value)}>
        <SelectTrigger className="w-full md:w-[180px] bg-black/30 border-white/10 text-white">
          <SelectValue placeholder="Result" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Results</SelectItem>
          <SelectItem value="home">Home Wins</SelectItem>
          <SelectItem value="away">Away Wins</SelectItem>
          <SelectItem value="draw">Draws</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        onClick={() => {
          const resetFilters = { team: "", round: "", result: "" }
          setFilters(resetFilters)
          onFilterChange(resetFilters)
        }}
      >
        Reset
      </Button>
    </div>
  )
})

MatchFilters.displayName = "MatchFilters"
