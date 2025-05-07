
import { memo, useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MatchFiltersProps {
  onFilterChange: (filters: any) => void
}

export const MatchFilters = memo(({ onFilterChange }: MatchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onFilterChange({ searchTerm: value })
  }
  
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams, results..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-black/30 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2.5
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 w-full sm:w-auto"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-black/30 border border-white/10 animate-fadeIn">
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Home Team</label>
            <input 
              type="text" 
              placeholder="Any team" 
              className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-3 py-1.5
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Away Team</label>
            <input 
              type="text" 
              placeholder="Any team" 
              className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-3 py-1.5
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Date Range</label>
            <input 
              type="date"
              className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-3 py-1.5
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Result</label>
            <select 
              className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-3 py-1.5
                       focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any Result</option>
              <option value="home">Home Win</option>
              <option value="away">Away Win</option>
              <option value="draw">Draw</option>
            </select>
          </div>
          
          <div className="col-span-2 md:col-span-4 flex justify-end gap-3">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              Reset
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})

MatchFilters.displayName = "MatchFilters"
