
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PredictionsTab() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="bg-black/20 border-white/5">
        <CardHeader>
          <CardTitle className="text-white text-lg">Advanced Prediction Model</CardTitle>
          <CardDescription>Pattern-based forecasting for upcoming matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-5 bg-black/30 rounded-lg border border-white/5 mb-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-white">Manchester United vs Liverpool</h3>
              <p className="text-gray-400">Upcoming Match | Premier League</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="w-32 text-center">
                <div className="text-3xl font-bold text-blue-400">2</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Predicted</div>
                <div className="text-sm text-gray-300">Manchester United</div>
              </div>
              <div className="w-12 flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-500">:</div>
              </div>
              <div className="w-32 text-center">
                <div className="text-3xl font-bold text-blue-400">1</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Predicted</div>
                <div className="text-sm text-gray-300">Liverpool</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-sm text-gray-400">Win Probability</div>
                <div className="text-lg font-bold text-emerald-400">58%</div>
                <div className="text-xs text-gray-500">Man United</div>
              </div>
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-sm text-gray-400">Draw Probability</div>
                <div className="text-lg font-bold text-amber-400">24%</div>
              </div>
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-sm text-gray-400">Win Probability</div>
                <div className="text-lg font-bold text-red-400">18%</div>
                <div className="text-xs text-gray-500">Liverpool</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-white">Key Prediction Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Home Advantage</span>
                  <span className="text-sm font-medium text-emerald-400">Strong</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Current Form</span>
                  <span className="text-sm font-medium text-emerald-400">Very Good</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Historical Matchups</span>
                  <span className="text-sm font-medium text-amber-400">Mixed</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Key Player Impact</span>
                  <span className="text-sm font-medium text-emerald-400">Significant</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
