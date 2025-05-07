
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLeagueState } from "@/hooks/league"
import { PatternHeader } from "@/components/analysis/patterns/PatternHeader"
import { AnalysisControls } from "@/components/analysis/patterns/AnalysisControls"
import { PatternVisualizationTab } from "@/components/analysis/patterns/tabs/PatternVisualizationTab"
import { CorrelationsTab } from "@/components/analysis/patterns/tabs/CorrelationsTab"
import { PredictionsTab } from "@/components/analysis/patterns/tabs/PredictionsTab"
import { extendedPatternData, correlationData, patternMetrics } from "@/data/analysisData"

export function AdvancedPatternView() {
  const [complexityLevel, setComplexityLevel] = useState([50])
  const [selectedFilter, setSelectedFilter] = useState("all-games")
  const [activeTab, setActiveTab] = useState("patterns")
  const { goBack } = useLeagueState()
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Advanced pattern analysis report is being generated.",
    })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <PatternHeader onBack={goBack} onExport={handleExport} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AnalysisControls 
            complexityLevel={complexityLevel}
            selectedFilter={selectedFilter}
            onComplexityChange={setComplexityLevel}
            onFilterChange={setSelectedFilter}
            patternMetrics={patternMetrics}
          />
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
              <TabsTrigger
                value="patterns"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Pattern Visualization
              </TabsTrigger>
              <TabsTrigger
                value="correlations"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Statistical Correlations
              </TabsTrigger>
              <TabsTrigger
                value="predictions"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Advanced Predictions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patterns" className="mt-6">
              <PatternVisualizationTab patternData={extendedPatternData} />
            </TabsContent>

            <TabsContent value="correlations" className="mt-6">
              <CorrelationsTab correlationData={correlationData} />
            </TabsContent>

            <TabsContent value="predictions" className="mt-6">
              <PredictionsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
