
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PredictionChart } from "../charts/PredictionChart"
import { StatsCard } from "../cards/StatsCard"

interface PredictionEngineTabProps {
  predictionData: Array<{
    name: string;
    actual: number;
    predicted: number;
  }>
}

export function PredictionEngineTab({ predictionData }: PredictionEngineTabProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader>
          <CardTitle className="text-white text-lg">Prediction Accuracy Over Time</CardTitle>
          <CardDescription>Comparing predicted vs. actual results week by week</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <PredictionChart data={predictionData} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCard 
              title="Overall Accuracy"
              value="76%"
              description="Prediction success rate"
              color="blue"
            />
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Confidence Level</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCard 
              title="Confidence Level"
              value="High"
              description="Based on 248 matches"
              color="emerald"
            />
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCard 
              title="Variance"
              value="±8%"
              description="Average deviation"
              color="amber"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
