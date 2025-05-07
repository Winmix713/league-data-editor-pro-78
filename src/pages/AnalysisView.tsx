
import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Brain, Calendar } from "lucide-react"

export const AnalysisView = memo(() => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white">Match Analysis</h2>
      
      <Card className="bg-black/20 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Match Analysis Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pattern" className="w-full">
            <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl mb-6">
              <TabsTrigger
                value="pattern"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Pattern Analysis</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="prediction"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>Prediction Engine</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Match Schedule</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pattern">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">Pattern Analysis</h3>
                <p className="text-gray-400">
                  Identify recurring patterns in match data to predict future outcomes. This tool
                  analyzes historical data to find patterns in team performance, scoring habits,
                  and match results.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="text-center p-8 text-gray-500">
                    Pattern analysis tools will be implemented here
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="prediction">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">Prediction Engine</h3>
                <p className="text-gray-400">
                  AI-driven system for match outcome predictions. Our advanced algorithms analyze 
                  team form, head-to-head history, player availability, and other factors to generate
                  match predictions.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="text-center p-8 text-gray-500">
                    Prediction engine tools will be implemented here
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-4">Match Schedule</h3>
                <p className="text-gray-400">
                  View and manage scheduled matches with comprehensive filtering and sorting options.
                  Track upcoming fixtures and analyze completed matches.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="text-center p-8 text-gray-500">
                    Match schedule tools will be implemented here
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
})

AnalysisView.displayName = "AnalysisView"
