
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MatchPredictionCard } from "../cards/MatchPredictionCard";

interface MatchScheduleTabProps {
  scheduleData: Array<{
    id: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    predictedScore: string;
  }>;
}

export function MatchScheduleTab({ scheduleData }: MatchScheduleTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Upcoming Matches</h3>
          <p className="text-sm text-gray-400">With predicted outcomes based on our analysis</p>
        </div>
        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 mt-2 md:mt-0">
          Filter Matches
        </Button>
      </div>

      <div className="space-y-4">
        {scheduleData.map((match) => (
          <Card key={match.id} className="bg-black/20 border-white/5">
            <CardContent className="p-0">
              <MatchPredictionCard
                date={match.date}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                predictedScore={match.predictedScore}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
