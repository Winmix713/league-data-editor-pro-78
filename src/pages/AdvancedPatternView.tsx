
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid3X3, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdvancedPatternView() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Pattern Recognition</h2>
          <p className="text-gray-400">Identify play patterns and tactical setups</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Analyze New Footage
        </Button>
      </div>

      <Card className="bg-black/20 border-white/5">
        <CardHeader>
          <CardTitle className="text-white text-lg">Pattern Detection</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[500px] flex items-center justify-center">
          <div className="text-center">
            <Grid3X3 className="h-16 w-16 text-blue-500/50 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">AI Pattern Recognition</h3>
            <p className="text-gray-400 max-w-md mb-6">
              Upload match footage to analyze formation patterns, pressing triggers, and defensive
              structures. Our AI will identify key tactical setups and provide insights.
            </p>
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              Upload Match Footage
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400">No recent analyses available</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white text-lg">Pattern Library</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <Loader className="h-8 w-8 text-blue-500/50 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Loading pattern library...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
