
import { memo } from "react"
import { useLeagueState } from "@/hooks/league"
import { 
  Award, 
  BarChart3, 
  Clock, 
  Settings, 
  PieChart, 
  LayoutGrid, 
  Table, 
  ChevronRight,
  Trophy,
  LineChart,
  Cog 
} from "lucide-react"

export const MobileSidebar = memo(() => {
  const { currentRoute, navigate } = useLeagueState()
  
  const navItems = [
    {
      id: "leagues",
      label: "Leagues",
      icon: <Trophy className="h-5 w-5" />,
      description: "Manage your leagues"
    },
    {
      id: "matches",
      label: "Matches",
      icon: <Table className="h-5 w-5" />,
      description: "View all match data"
    },
    {
      id: "analysis",
      label: "Analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Match prediction analytics"
    },
    {
      id: "advanced-pattern",
      label: "Advanced Pattern",
      icon: <LayoutGrid className="h-5 w-5" />,
      description: "Play pattern recognition"
    },
    {
      id: "league-analytics",
      label: "League Analytics",
      icon: <PieChart className="h-5 w-5" />,
      description: "Team and league stats"
    },
    {
      id: "league-management",
      label: "League Management",
      icon: <Award className="h-5 w-5" />,
      description: "Create and manage leagues",
      isNew: true
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: <Clock className="h-5 w-5" />,
      description: "External data sources"
    },
    {
      id: "predictions",
      label: "Predictions",
      icon: <LineChart className="h-5 w-5" />,
      description: "Match predictions",
      isNew: true
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Cog className="h-5 w-5" />,
      description: "System configuration"
    }
  ]
  
  return (
    <div className="flex flex-col py-4 h-full">
      <div className="px-4 mb-6">
        <h1 className="font-bold text-xl text-white">V-SPORTS</h1>
        <p className="text-gray-400 text-sm">League Management</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="px-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.id as any)}
                className={`
                  flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors
                  ${currentRoute === item.id 
                    ? 'bg-blue-500/20 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`${currentRoute === item.id ? 'text-blue-400' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.label}</span>
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white rounded">NEW</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 line-clamp-1">{item.description}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-4 mt-6">
        <div className="bg-black/20 rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Next analysis update</p>
              <p className="text-white font-medium">Today, 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

MobileSidebar.displayName = "MobileSidebar"
