
"use client"

import { useMemo } from "react"
import type { Match } from "../../types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchesTable } from "../MatchesTable"
import { StandingsTable } from "../StandingsTable"
import { FormTable } from "../FormTable"
import { calculateStandings, calculateTeamForms } from "../../utils/calculations"

interface LeagueTabsViewProps {
  matches: Match[]
  defaultTab?: string
  onTabChange?: (tab: string) => void
}

export const LeagueTabsView = ({ 
  matches, 
  defaultTab = "matches",
  onTabChange 
}: LeagueTabsViewProps) => {
  const standings = useMemo(() => calculateStandings(matches), [matches])
  const teamForms = useMemo(() => calculateTeamForms(matches), [matches])

  return (
    <Tabs defaultValue={defaultTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
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
      </TabsList>

      <TabsContent value="matches" className="p-0 mt-6">
        <MatchesTable matches={matches} />
      </TabsContent>
      <TabsContent value="standings" className="p-0 mt-6">
        <StandingsTable standings={standings} />
      </TabsContent>
      <TabsContent value="form" className="p-0 mt-6">
        <FormTable teamForms={teamForms} />
      </TabsContent>
    </Tabs>
  )
}
