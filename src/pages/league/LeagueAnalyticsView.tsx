
import { useState } from "react"
import { BarChart, PieChart, ArrowDownUp, LineChart, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/analysis/cards/StatsCard"

export function LeagueAnalyticsView() {
  const [activeTab, setActiveTab] = useState("performance")
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">League Analytics</h2>
          <p className="text-gray-400">Performance metrics and team statistics</p>
        </div>
        
        <Button
          variant="outline"
          className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Settings className="h-4 w-4" />
          Configure Analytics
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Matches Played"
          value="248" 
          description="Out of 380 total fixtures"
          color="blue"
          icon={<ArrowDownUp className="w-5 h-5" />}
        />
        <StatsCard 
          title="Goals Scored"
          value="683" 
          description="2.75 goals per match"
          color="emerald"
          icon={<BarChart className="w-5 h-5" />}
        />
        <StatsCard 
          title="Home Win Rate"
          value="49.6%" 
          description="123 home wins"
          color="amber"
          icon={<PieChart className="w-5 h-5" />}
        />
        <StatsCard 
          title="Clean Sheets"
          value="72" 
          description="29% of all matches"
          color="purple"
          icon={<LineChart className="w-5 h-5" />}
        />
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/20 w-full rounded-xl">
          <TabsTrigger
            value="performance"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Goals
          </TabsTrigger>
          <TabsTrigger
            value="players"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Players
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Team Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Performance Metrics</h3>
                  <p className="text-gray-400 max-w-md">
                    Detailed team performance analytics coming soon. This chart will show
                    key metrics like points, goal difference, and form over time.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-lg">Win/Loss Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Result Distribution</h3>
                  <p className="text-gray-400 max-w-md">
                    Win, loss, and draw distribution visualization coming soon. This chart will show
                    the proportion of match outcomes across all teams.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Team Form Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Team Form Over Time</h3>
                <p className="text-gray-400 max-w-md">
                  Form analysis visualization coming soon. This chart will track team form
                  and performance trends throughout the season.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Goal Statistics</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Goal Analytics</h3>
                <p className="text-gray-400 max-w-md">
                  Comprehensive goal analysis coming soon. Track scoring patterns,
                  goal times, and goal distribution across teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="players" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Player Statistics</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Player Performance</h3>
                <p className="text-gray-400 max-w-md">
                  Individual player statistics coming soon. Track goals, assists,
                  cards, and performance metrics for all players.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Team Comparison</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Team Comparison Tool</h3>
                <p className="text-gray-400 max-w-md">
                  Head-to-head team comparison coming soon. Compare statistics,
                  performance metrics, and historical match results between teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
