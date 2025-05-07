
import { memo, useState } from "react"
import { useLeagueState } from "@/hooks/league"
import { MatchesTable } from "@/components/MatchesTable"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Filter, CalendarDays, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MatchDetail from "@/components/MatchDetail"
import type { Match } from "@/types"

export const MatchesView = memo(() => {
  const { currentMatches } = useLeagueState()
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [isMatchDetailOpen, setIsMatchDetailOpen] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match)
    setIsMatchDetailOpen(true)
  }

  const handleCloseMatchDetail = () => {
    setIsMatchDetailOpen(false)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Match Center</h2>
        <div className="flex gap-2">
          <Select defaultValue="2023-2024">
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0f14] border-white/10 text-white">
              <SelectItem value="2023-2024">Season 2023-2024</SelectItem>
              <SelectItem value="2022-2023">Season 2022-2023</SelectItem>
              <SelectItem value="2021-2022">Season 2021-2022</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 border-white/5 col-span-1 md:col-span-3">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                Matches Overview
              </CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search matches..."
                    className="w-full sm:w-60 bg-black/30 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2
                              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                              transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl mb-6">
                <TabsTrigger
                  value="all"
                  className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                >
                  All Matches
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <MatchesTable matches={currentMatches} />
              </TabsContent>
              
              <TabsContent value="upcoming">
                <MatchesTable matches={currentMatches.filter(m => new Date(m.date) > new Date())} />
              </TabsContent>
              
              <TabsContent value="completed">
                <MatchesTable matches={currentMatches.filter(m => new Date(m.date) <= new Date())} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {selectedMatch && (
        <MatchDetail
          match={selectedMatch}
          isOpen={isMatchDetailOpen}
          onClose={handleCloseMatchDetail}
        />
      )}
    </div>
  )
})

MatchesView.displayName = "MatchesView"
