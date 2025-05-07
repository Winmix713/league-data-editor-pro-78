
import { useState } from "react"
import { MatchesTable } from "@/components/matches/MatchesTable"
import { Button } from "@/components/ui/button"
import { Calendar, FileSpreadsheet, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MatchesView() {
  const [leagueFilter, setLeagueFilter] = useState<string>("all")
  const [seasonFilter, setSeasonFilter] = useState<string>("2023-2024")
  
  // Placeholder data
  const matches = []
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Matches</h2>
          <p className="text-gray-400">View and manage match data</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button 
            variant="outline"
            className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Match</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-64 space-y-4">
          <Card className="bg-black/20 border-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Filter Matches</CardTitle>
              <CardDescription>Select league and season</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400">League</label>
                <Select 
                  value={leagueFilter} 
                  onValueChange={setLeagueFilter}
                >
                  <SelectTrigger className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select league" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    <SelectItem value="premier-league">Premier League</SelectItem>
                    <SelectItem value="la-liga">La Liga</SelectItem>
                    <SelectItem value="bundesliga">Bundesliga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-400">Season</label>
                <Select 
                  value={seasonFilter} 
                  onValueChange={setSeasonFilter}
                >
                  <SelectTrigger className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                    <SelectItem value="2021-2022">2021-2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                Apply Filters
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/20 border-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Match Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Matches</span>
                <span className="text-white font-medium">248</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Home Wins</span>
                <span className="text-white font-medium">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Away Wins</span>
                <span className="text-white font-medium">76</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Draws</span>
                <span className="text-white font-medium">48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Goals Scored</span>
                <span className="text-white font-medium">683</span>
              </div>
              <div className="h-px bg-white/5 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-400">Goals per Match</span>
                <span className="text-white font-medium">2.75</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <MatchesTable matches={matches} />
        </div>
      </div>
    </div>
  )
}
