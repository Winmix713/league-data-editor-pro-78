import { memo } from "react"
import { BarChart3, Calendar, Plus, Settings, Trophy, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLeagueState } from "@/hooks/league"
import { TeamList } from "@/components/teams/TeamList"
import { TEAMS } from "@/data/teams" 

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

const FeatureCard = ({ title, description, icon, onClick }: FeatureCardProps) => (
  <Card 
    className="bg-black/20 border-white/10 text-white hover:border-blue-500/50 transition-all cursor-pointer"
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex flex-col gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg w-fit">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export const LeagueManagementView = memo(() => {
  const { setIsNewLeagueModalOpen } = useLeagueState()

  const handleCreateLeague = () => {
    setIsNewLeagueModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">League Management</h2>
        <Button 
          onClick={handleCreateLeague} 
          className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New League
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/20 w-full rounded-xl">
          <TabsTrigger
            value="overview"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="leagues"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            My Leagues
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Teams
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-black/20 border-white/5 md:col-span-4">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Trophy className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm">Active Leagues</h4>
                      <p className="text-2xl font-bold text-white">4</p>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm">Total Matches</h4>
                      <p className="text-2xl font-bold text-white">120</p>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm">Teams</h4>
                      <p className="text-2xl font-bold text-white">{TEAMS.length}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm">Analytics Reports</h4>
                      <p className="text-2xl font-bold text-white">38</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-4">
              <h3 className="text-lg font-medium text-white mb-4">Management Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  title="League Creation"
                  description="Create and configure new leagues with customizable settings."
                  icon={<Trophy className="h-5 w-5 text-blue-400" />}
                  onClick={handleCreateLeague}
                />
                <FeatureCard
                  title="Match Data"
                  description="Import, edit and manage match data for all your leagues."
                  icon={<Calendar className="h-5 w-5 text-blue-400" />}
                  onClick={() => {}}
                />
                <FeatureCard
                  title="Team Management"
                  description="Manage teams, players, and transfers within your leagues."
                  icon={<Users className="h-5 w-5 text-blue-400" />}
                  onClick={() => {}}
                />
                <FeatureCard
                  title="Analytics Dashboard"
                  description="Access comprehensive analytics for all league data."
                  icon={<BarChart3 className="h-5 w-5 text-blue-400" />}
                  onClick={() => {}}
                />
                <FeatureCard
                  title="Schedule Management"
                  description="Create and edit match schedules for your leagues."
                  icon={<Calendar className="h-5 w-5 text-blue-400" />}
                  onClick={() => {}}
                />
                <FeatureCard
                  title="League Settings"
                  description="Configure league rules, scoring systems, and more."
                  icon={<Settings className="h-5 w-5 text-blue-400" />}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leagues" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white">My Leagues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-400 py-12">
                Your leagues will be displayed here. Create a new league to get started.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="mt-6">
          <TeamList />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white">Management Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-400 py-12">
                Configure global settings for league management.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
})

LeagueManagementView.displayName = "LeagueManagementView"
