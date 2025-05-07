
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLeagueState } from "@/hooks/league"
import { AnalysisHeader } from "@/components/analysis/AnalysisHeader"
import { PatternAnalysisTab } from "@/components/analysis/tabs/PatternAnalysisTab"
import { PredictionEngineTab } from "@/components/analysis/tabs/PredictionEngineTab"
import { MatchScheduleTab } from "@/components/analysis/tabs/MatchScheduleTab"
import { patternData, predictionData, scheduleData } from "@/data/analysisData"

export function AnalysisView() {
  const [activeTab, setActiveTab] = useState("pattern-analysis")
  const [selectedLeague, setSelectedLeague] = useState<string>("premier-league")
  const [selectedSeason, setSelectedSeason] = useState<string>("2023-2024")
  const { navigate } = useLeagueState()
  const { toast } = useToast()

  const handleAdvancedPatternClick = () => {
    navigate("advanced-pattern")
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <AnalysisHeader 
        selectedLeague={selectedLeague}
        selectedSeason={selectedSeason}
        onLeagueChange={setSelectedLeague}
        onSeasonChange={setSelectedSeason}
      />

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
          <TabsTrigger
            value="pattern-analysis"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 18V9" />
                <path d="M12 18v-5" />
                <path d="M16 18v-2" />
              </svg>
              Pattern Analysis
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="prediction-engine"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              Prediction Engine
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="match-schedule"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M3 10h18" />
              </svg>
              Match Schedule
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pattern-analysis" className="mt-6">
          <PatternAnalysisTab 
            patternData={patternData} 
            onAdvancedPatternClick={handleAdvancedPatternClick} 
          />
        </TabsContent>

        <TabsContent value="prediction-engine" className="mt-6">
          <PredictionEngineTab predictionData={predictionData} />
        </TabsContent>

        <TabsContent value="match-schedule" className="mt-6">
          <MatchScheduleTab scheduleData={scheduleData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
