
import { useState } from "react"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeagueEditForm } from "@/components/league/LeagueEditForm"
import { MatchesTable } from "@/components/matches/MatchesTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LeagueData, Match } from "@/types"

interface LeagueDetailsProps {
  league: LeagueData
  matches: Match[]
  onBack: () => void
  onUpdateLeague: (updatedLeague: LeagueData) => void
  onUpdateMatches: (matches: Match[]) => void
}

export function LeagueDetails({
  league,
  matches,
  onBack,
  onUpdateLeague,
  onUpdateMatches,
}: LeagueDetailsProps) {
  const [activeTab, setActiveTab] = useState("matches")
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            size="icon"
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">{league.name}</h2>
            <p className="text-gray-400">{league.season}</p>
          </div>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
            variant="outline"
          >
            <Edit className="h-4 w-4" />
            Edit League
          </Button>
        )}
      </div>

      {isEditing ? (
        <LeagueEditForm
          league={league}
          onUpdateLeague={onUpdateLeague}
          onUpdateMatches={onUpdateMatches}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 bg-black/20 w-full rounded-xl">
              <TabsTrigger
                value="matches"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger
                value="standings"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Standings
              </TabsTrigger>
              <TabsTrigger
                value="form"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Form
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="mt-6">
              <MatchesTable matches={matches} />
            </TabsContent>

            <TabsContent value="standings" className="mt-6">
              <Card className="bg-black/20 border-white/5">
                <CardHeader>
                  <CardTitle className="text-white text-lg">League Standings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-400 py-12">
                    Standings will be calculated automatically once match data is available
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="form" className="mt-6">
              <Card className="bg-black/20 border-white/5">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Team Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-400 py-12">
                    Team form data will be displayed here once match data is available
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <Card className="bg-black/20 border-white/5">
                <CardHeader>
                  <CardTitle className="text-white text-lg">League Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-400 py-12">
                    League statistics will be calculated based on match data
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
