
import { useState } from "react"
import { Calendar, RefreshCcw, Filter, Layout } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import MatchDetail from "@/components/MatchDetail"
import type { Match } from "@/types"

// Mock match data
const mockMatches: Match[] = [
  {
    date: "2023-05-01",
    home_team: "Manchester United",
    away_team: "Arsenal",
    ht_home_score: 1,
    ht_away_score: 0,
    home_score: 2,
    away_score: 1,
    round: "Round 34"
  },
  {
    date: "2023-05-01",
    home_team: "Liverpool",
    away_team: "Chelsea",
    ht_home_score: 0,
    ht_away_score: 0,
    home_score: 1,
    away_score: 1,
    round: "Round 34"
  },
  {
    date: "2023-05-02",
    home_team: "Manchester City",
    away_team: "Tottenham",
    ht_home_score: 2,
    ht_away_score: 1,
    home_score: 3,
    away_score: 2,
    round: "Round 34"
  },
  {
    date: "2023-05-02",
    home_team: "Newcastle",
    away_team: "Brighton",
    ht_home_score: 1,
    ht_away_score: 0,
    home_score: 3,
    away_score: 0,
    round: "Round 34"
  },
];

// Mock integration cards data
const integrationCardsData = [
  {
    title: "TV Broadcast Integration",
    description: "Connect with TV broadcast schedules",
    status: "connected"
  },
  {
    title: "Ticketing Integration",
    description: "Link match tickets for purchase",
    status: "inactive"
  },
  {
    title: "Video Highlights",
    description: "Automatic highlights integration",
    status: "connected"
  },
  {
    title: "Social Media Sharing",
    description: "Auto-share match results",
    status: "inactive"
  }
];

export function MatchesView() {
  const [activeTab, setActiveTab] = useState("schedule")
  const [selectedSeason, setSelectedSeason] = useState("2023-2024")
  const [selectedLeague, setSelectedLeague] = useState("premier-league")
  const [isLoading, setIsLoading] = useState(false)
  const [isMatchDetailOpen, setIsMatchDetailOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  
  const { toast } = useToast()

  const handleRefresh = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Data Refreshed",
        description: "The match data has been updated to the latest version.",
      })
    }, 1000)
  }

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match)
    setIsMatchDetailOpen(true)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Match Center</h2>
          <p className="text-gray-400">View and manage all match information</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="bg-black/30 border-white/10 text-white w-full sm:w-[180px]">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2021-2022">2021-2022</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
          <TabsTrigger
            value="schedule"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Match Schedule
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <Layout className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger
            value="filters"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                    Upcoming Matches
                  </CardTitle>
                  <CardDescription>Schedule for the current season</CardDescription>
                </div>
                <div className="mt-3 md:mt-0">
                  <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                    <SelectTrigger className="bg-black/30 border-white/10 text-white w-full sm:w-[180px]">
                      <SelectValue placeholder="Select League" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premier-league">Premier League</SelectItem>
                      <SelectItem value="la-liga">La Liga</SelectItem>
                      <SelectItem value="bundesliga">Bundesliga</SelectItem>
                      <SelectItem value="serie-a">Serie A</SelectItem>
                      <SelectItem value="ligue-1">Ligue 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMatches.map((match, index) => (
                  <Card 
                    key={index}
                    className="bg-black/30 border-white/5 hover:bg-black/40 transition-colors cursor-pointer"
                    onClick={() => handleMatchClick(match)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-black/40 px-3 py-2 rounded-lg text-sm">
                            <div className="text-gray-400">{match.date}</div>
                            <div className="text-xs text-gray-500 text-center">{match.round}</div>
                          </div>
                          <div className="text-center sm:text-left flex-1">
                            <div className="font-medium text-white">{match.home_team}</div>
                            <div className="text-xs text-gray-400 my-1">vs</div>
                            <div className="font-medium text-white">{match.away_team}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Final Score</div>
                            <div className="text-xl font-bold text-blue-400">
                              {match.home_score} - {match.away_score}
                            </div>
                            <div className="text-xs text-gray-500">
                              HT: {match.ht_home_score} - {match.ht_away_score}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMatchClick(match);
                            }}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationCardsData.map((integration, index) => (
              <Card key={index} className="bg-black/20 border-white/5">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-lg">{integration.title}</CardTitle>
                    <Badge variant="outline" className={
                      integration.status === "connected"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                    }>
                      {integration.status === "connected" ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant={integration.status === "connected" ? "default" : "outline"}
                    className={
                      integration.status === "connected"
                        ? "w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }
                    onClick={() => {
                      toast({
                        title: integration.status === "connected" ? "Integration Settings" : "Connect Integration",
                        description: integration.status === "connected"
                          ? `Configure settings for ${integration.title}`
                          : `Setting up connection for ${integration.title}`
                      })
                    }}
                  >
                    {integration.status === "connected" ? "Configure" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="filters" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Advanced Match Filters</CardTitle>
              <CardDescription>Customize your match view with advanced filtering options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="team-filter" className="text-sm text-gray-400">Team</label>
                  <Select>
                    <SelectTrigger id="team-filter" className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="All Teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="man-utd">Manchester United</SelectItem>
                      <SelectItem value="arsenal">Arsenal</SelectItem>
                      <SelectItem value="liverpool">Liverpool</SelectItem>
                      <SelectItem value="chelsea">Chelsea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="venue-filter" className="text-sm text-gray-400">Venue</label>
                  <Select>
                    <SelectTrigger id="venue-filter" className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="All Venues" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Venues</SelectItem>
                      <SelectItem value="home">Home Games</SelectItem>
                      <SelectItem value="away">Away Games</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="result-filter" className="text-sm text-gray-400">Result</label>
                  <Select>
                    <SelectTrigger id="result-filter" className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="All Results" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Results</SelectItem>
                      <SelectItem value="wins">Wins</SelectItem>
                      <SelectItem value="draws">Draws</SelectItem>
                      <SelectItem value="losses">Losses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date-filter" className="text-sm text-gray-400">Date Range</label>
                  <Select>
                    <SelectTrigger id="date-filter" className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="All Dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="goals-filter" className="text-sm text-gray-400">Goals</label>
                  <Select>
                    <SelectTrigger id="goals-filter" className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="All Games" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Games</SelectItem>
                      <SelectItem value="over-2.5">Over 2.5 Goals</SelectItem>
                      <SelectItem value="under-2.5">Under 2.5 Goals</SelectItem>
                      <SelectItem value="btts">Both Teams Scored</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="stats-filter" className="text-sm text-gray-400">Statistics</label>
                  <Select>
                    <SelectTrigger id="stats-filter" className="bg-black/30 border-white/10 text-white">
                      <SelectValue placeholder="Include All Stats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Include All Stats</SelectItem>
                      <SelectItem value="basic">Basic Stats Only</SelectItem>
                      <SelectItem value="extended">Extended Stats</SelectItem>
                      <SelectItem value="none">No Stats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Apply Filters
                </Button>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  Reset Filters
                </Button>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  Save Filter Preset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Match Detail Modal */}
      <MatchDetail 
        match={selectedMatch} 
        isOpen={isMatchDetailOpen} 
        onClose={() => setIsMatchDetailOpen(false)} 
      />
    </div>
  )
}
