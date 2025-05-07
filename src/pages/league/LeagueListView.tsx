
import { memo } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import IntegrationCards from "@/components/dashboard/IntegrationCards"
import LeagueSeasons from "@/components/LeagueSeasons"
import type { LeagueData, Match } from "@/types"

interface LeagueListViewProps {
  dataUpdatedAt: Date
  isRefreshing: boolean
  onRefresh: () => void
  onEdit: () => void
  onSelectLeague: (league: LeagueData, matches: Match[]) => void
}

export const LeagueListView = memo(({
  dataUpdatedAt,
  isRefreshing,
  onRefresh,
  onEdit,
  onSelectLeague
}: LeagueListViewProps) => {
  const seasonSelector = (
    <div className="relative flex items-center">
      <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
        <span>2023-2024 Szezon</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <>
      <DashboardHeader
        title="V-SPORTS ELEMZŐ RENDSZER"
        subtitle="Professzionális Elemzés és Predikció"
        dataUpdatedAt={dataUpdatedAt}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        actionButton={seasonSelector}
      />

      <IntegrationCards />
      
      <LeagueSeasons
        onEdit={onEdit}
        onSelect={onSelectLeague}
      />
    </>
  )
})

LeagueListView.displayName = "LeagueListView"
