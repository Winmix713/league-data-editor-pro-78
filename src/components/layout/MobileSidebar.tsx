
import { BarChart3, CalendarDays, Grid3X3, LayoutGrid, PieChart, Settings, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLeagueState } from "@/hooks/league"
import { Badge } from "@/components/ui/badge"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar({ className }: SidebarProps) {
  const { navigate, currentRoute } = useLeagueState()

  const mainNavItems = [
    { 
      title: "Leagues", 
      route: "leagues", 
      icon: Trophy,
      description: "Manage your leagues"
    },
    { 
      title: "Matches", 
      route: "matches", 
      icon: CalendarDays,
      description: "View all match data" 
    },
    { 
      title: "Analysis", 
      route: "analysis", 
      icon: BarChart3,
      description: "Match prediction analytics"
    },
    { 
      title: "League Analytics", 
      route: "league-analytics", 
      icon: PieChart,
      description: "Team and league stats" 
    },
  ];

  const secondaryNavItems = [
    { 
      title: "League Management", 
      route: "league-management", 
      icon: LayoutGrid,
      isNew: true
    },
    { 
      title: "Integrations", 
      route: "integrations", 
      icon: Grid3X3 
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-8 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center space-x-2 px-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Trophy className="h-3 w-3 text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">V-SPORTS</h2>
          </div>
          <p className="px-2 mt-1 text-xs text-gray-400">Sports Analytics Platform</p>
        </div>

        <div className="px-4 py-2">
          <h3 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-400 uppercase">Main Navigation</h3>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Button
                key={item.title}
                variant={currentRoute === item.route ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate(item.route)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-gray-500 font-normal">{item.description}</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="px-4 py-2">
          <h3 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-400 uppercase">Management</h3>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => (
              <Button
                key={item.title}
                variant={currentRoute === item.route ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate(item.route)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
                {item.isNew && (
                  <Badge className="ml-2 bg-blue-500 text-white text-[10px] px-1 rounded-sm">NEW</Badge>
                )}
              </Button>
            ))}
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

        <div className="px-6">
          <div className="bg-blue-500/10 rounded-lg border border-blue-500/20 p-4 text-center">
            <p className="text-sm text-white mb-2">CSV Data Import</p>
            <p className="text-xs text-gray-400 mb-3">Upload match data via CSV to analyze and predict results</p>
            <Button onClick={() => navigate("league-management")} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Upload Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
