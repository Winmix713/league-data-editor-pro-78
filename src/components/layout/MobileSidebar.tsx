
import { Home, BarChart3, PieChart, Settings, Trophy, Calendar, Grid3X3, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLeagueState } from "@/hooks/useLeagueState"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar({ className }: SidebarProps) {
  const { navigate, currentRoute } = useLeagueState()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">V-SPORTS</h2>
          <div className="space-y-1">
            <Button
              variant={currentRoute === "leagues" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate("leagues")}
            >
              <Trophy className="mr-2 h-4 w-4" />
              Leagues
            </Button>
            <Button
              variant={currentRoute === "matches" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate("matches")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Matches
            </Button>
            <Button
              variant={currentRoute === "analysis" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate("analysis")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analysis
            </Button>
            <Button
              variant={currentRoute === "league-analytics" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate("league-analytics")}
            >
              <PieChart className="mr-2 h-4 w-4" />
              League Analytics
            </Button>
            <Button
              variant={currentRoute === "league-management" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate("league-management")}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              League Management
            </Button>
            <Button
              variant={currentRoute === "integrations" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate("integrations")}
            >
              <Grid3X3 className="mr-2 h-4 w-4" />
              Integrations
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => {}}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
