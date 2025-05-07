
import React from "react"
import { TrendingUp, Database, Target, Award, Calendar } from "lucide-react"
import { StatsCard } from "@/components/analysis/cards/StatsCard"
import { MatchPredictionCard } from "@/components/analysis/cards/MatchPredictionCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function AnalysisView() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Match Analysis</h2>
          <p className="text-gray-400">Advanced match predictions and analysis</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Generate New Prediction
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Win Prediction Accuracy"
          value="86%" 
          description="Last 50 matches"
          color="blue"
          icon={<Target className="w-5 h-5" />}
        />
        <StatsCard 
          value="1,254" 
          description="Total matches analyzed"
          color="emerald"
          icon={<Database className="w-5 h-5" />}
        />
        <StatsCard 
          value="76%" 
          description="Home win rate this season"
          color="amber"
          icon={<Award className="w-5 h-5" />}
        />
        <StatsCard 
          value="324" 
          description="Upcoming match predictions"
          color="purple"
          icon={<Calendar className="w-5 h-5" />}
        />
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
          <TabsTrigger 
            value="predictions" 
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Match Predictions
          </TabsTrigger>
          <TabsTrigger 
            value="statistics" 
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Team Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Upcoming Match Predictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 divide-y divide-white/5">
              <MatchPredictionCard
                date="2023-03-18 · 15:00"
                homeTeam="Manchester United"
                awayTeam="Liverpool"
                predictedScore="2-1"
                confidence={78}
              />
              <MatchPredictionCard
                date="2023-03-19 · 17:30"
                homeTeam="Arsenal"
                awayTeam="Manchester City"
                predictedScore="1-2"
                confidence={64}
              />
              <MatchPredictionCard
                date="2023-03-19 · 14:00"
                homeTeam="Chelsea"
                awayTeam="Tottenham"
                predictedScore="2-2"
                confidence={52}
              />
              <MatchPredictionCard
                date="2023-03-20 · 20:00"
                homeTeam="Leicester City"
                awayTeam="Brighton"
                predictedScore="0-1"
                confidence={61}
              />
              <MatchPredictionCard
                date="2023-03-21 · 20:45"
                homeTeam="West Ham"
                awayTeam="Newcastle"
                predictedScore="1-1"
                confidence={67}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">League Statistics</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Advanced Statistics</h3>
                <p className="text-gray-400 max-w-md">
                  Comprehensive statistics dashboard coming soon. Track team performance,
                  player stats, and league trends with our advanced analytics tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-lg">Team Performance Trends</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Performance Analytics</h3>
                <p className="text-gray-400 max-w-md">
                  Detailed team trend analysis coming soon. Track form, goal trends,
                  and performance metrics over time for all teams in your leagues.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
