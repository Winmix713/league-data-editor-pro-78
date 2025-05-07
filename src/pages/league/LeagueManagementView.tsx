
import { useState } from "react"
import { Calendar, Crown, Plus, Filter, Settings, PenTool, TrendingUp, Database, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Mock league data
const leaguesData = [
  {
    id: "premier-league-2023",
    name: "Premier League",
    season: "2023-2024",
    teams: 20,
    matches: 380,
    completed: 248,
    status: "active"
  },
  {
    id: "la-liga-2023",
    name: "La Liga",
    season: "2023-2024",
    teams: 20,
    matches: 380,
    completed: 220,
    status: "active"
  },
  {
    id: "bundesliga-2023",
    name: "Bundesliga",
    season: "2023-2024",
    teams: 18,
    matches: 306,
    completed: 200,
    status: "active"
  },
  {
    id: "serie-a-2023",
    name: "Serie A",
    season: "2023-2024",
    teams: 20,
    matches: 380,
    completed: 230,
    status: "active"
  },
  {
    id: "premier-league-2022",
    name: "Premier League",
    season: "2022-2023",
    teams: 20,
    matches: 380,
    completed: 380,
    status: "completed"
  }
];

// Mock feature cards data
const featureCardsData = [
  {
    title: "League Editor",
    description: "Create and configure your league structure",
    icon: <PenTool className="h-6 w-6 text-blue-400" />,
    action: "Edit League"
  },
  {
    title: "Season Management",
    description: "Configure seasons and fixtures",
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    action: "Manage Seasons"
  },
  {
    title: "Team Registration",
    description: "Add and manage teams in your league",
    icon: <Users className="h-6 w-6 text-amber-400" />,
    action: "Manage Teams"
  },
  {
    title: "Data Import/Export",
    description: "Import or export league data in CSV format",
    icon: <Database className="h-6 w-6 text-purple-400" />,
    action: "Manage Data"
  },
  {
    title: "League Analytics",
    description: "Advanced statistics and reports",
    icon: <TrendingUp className="h-6 w-6 text-red-400" />,
    action: "View Analytics"
  },
  {
    title: "League Settings",
    description: "Configure rules and preferences",
    icon: <Settings className="h-6 w-6 text-indigo-400" />,
    action: "League Settings"
  }
];

export function LeagueManagementView() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredLeagues = leaguesData.filter(league => 
    league.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    league.season.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateLeague = () => {
    toast({
      title: "Create New League",
      description: "The new league creation wizard has been launched."
    })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">League Management</h2>
          <p className="text-gray-400">Create, manage, and analyze your leagues</p>
        </div>
        <Button
          onClick={handleCreateLeague}
          className="gap-2 bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create New League
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/20 w-full rounded-xl">
          <TabsTrigger
            value="overview"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="my-leagues"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            My Leagues
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Leagues</span>
                  <span className="text-xl font-bold text-blue-400">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Teams</span>
                  <span className="text-xl font-bold text-blue-400">78</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Matches</span>
                  <span className="text-xl font-bold text-blue-400">1,446</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completed Matches</span>
                  <span className="text-xl font-bold text-blue-400">898</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5 col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">New match data added</p>
                      <p className="text-sm text-gray-400">Premier League - Matchday 26</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Team updated</p>
                      <p className="text-sm text-gray-400">Arsenal FC - Player list updated</p>
                      <p className="text-xs text-gray-500 mt-1">8 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Crown className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">League completed</p>
                      <p className="text-sm text-gray-400">Serie A 2022-2023 - Final standings confirmed</p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">League Management Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCardsData.map((feature, index) => (
                <Card key={index} className="bg-black/20 border-white/5 hover:bg-black/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="mb-4 w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
                      onClick={() => {
                        toast({
                          title: feature.title,
                          description: `${feature.title} feature has been accessed.`
                        })
                      }}
                    >
                      {feature.action}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-leagues" className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <Input
              placeholder="Search leagues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/30 border-white/10 text-white w-full md:w-80"
            />
            <div className="flex gap-3 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="bg-black/30 border-white/10 text-white w-full sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredLeagues.map((league) => (
              <Card key={league.id} className="bg-black/20 border-white/5">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{league.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            league.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }
                        >
                          {league.status === "active" ? "Active" : "Completed"}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-1">Season: {league.season}</p>
                      <p className="text-gray-400 text-sm">
                        {league.teams} Teams · {league.completed}/{league.matches} Matches Completed
                      </p>
                      <div className="mt-2 w-full md:w-64">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{Math.round((league.completed / league.matches) * 100)}%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${(league.completed / league.matches) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        onClick={() => {
                          toast({
                            title: "View League",
                            description: `Viewing details for ${league.name} ${league.season}`
                          })
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant={league.status === "active" ? "default" : "outline"}
                        className={
                          league.status === "active"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                        }
                        onClick={() => {
                          toast({
                            title: "Manage League",
                            description: `Managing ${league.name} ${league.season}`
                          })
                        }}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredLeagues.length === 0 && (
              <Card className="bg-black/20 border-white/5">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No leagues found matching your search criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">League Analytics</CardTitle>
              <CardDescription>Comprehensive statistics across all your leagues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4">
                  <TrendingUp className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">League Analytics Dashboard</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Access comprehensive statistics, trends, and insights across all your leagues.
                </p>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    toast({
                      title: "Analytics Dashboard",
                      description: "Redirecting to the full analytics dashboard."
                    })
                  }}
                >
                  View Full Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">League Management Settings</CardTitle>
              <CardDescription>Configure global settings for all your leagues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-season" className="text-gray-300">Default Season</Label>
                <Select defaultValue="2023-2024">
                  <SelectTrigger id="default-season" className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                    <SelectItem value="2021-2022">2021-2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points-win" className="text-gray-300">Points for Win</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="points-win" className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Points for win" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Points</SelectItem>
                    <SelectItem value="2">2 Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points-draw" className="text-gray-300">Points for Draw</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="points-draw" className="bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Points for draw" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Point</SelectItem>
                    <SelectItem value="0">0 Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    toast({
                      title: "Settings Saved",
                      description: "Your league management settings have been updated."
                    })
                  }}
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Data Management</CardTitle>
              <CardDescription>Manage your league data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-black/30 border border-white/5">
                <div className="flex-grow">
                  <h4 className="font-medium text-white mb-1">Export All League Data</h4>
                  <p className="text-sm text-gray-400">Download all your league data in CSV format</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full md:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Data Export",
                      description: "Exporting your league data. Download will begin shortly."
                    })
                  }}
                >
                  Export Data
                </Button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-black/30 border border-white/5">
                <div className="flex-grow">
                  <h4 className="font-medium text-white mb-1">Import League Data</h4>
                  <p className="text-sm text-gray-400">Upload league data from CSV files</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full md:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Data Import",
                      description: "Opening data import wizard."
                    })
                  }}
                >
                  Import Data
                </Button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-black/30 border border-white/5">
                <div className="flex-grow">
                  <h4 className="font-medium text-white mb-1">League Templates</h4>
                  <p className="text-sm text-gray-400">Manage reusable league templates</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full md:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Templates",
                      description: "Opening template management view."
                    })
                  }}
                >
                  Manage Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Common Label component used in the settings section
function Label({ htmlFor, children, className = "" }: { htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm ${className}`}>
      {children}
    </label>
  )
}
