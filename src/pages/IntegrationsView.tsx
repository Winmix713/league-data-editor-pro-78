
import { Camera, Database, Globe, LineChart, Lock, Mail, Video, Youtube } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function IntegrationsView() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white">Integrations</h2>
        <p className="text-gray-400">Connect external services and data sources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IntegrationCard
          title="CSV Data Import"
          description="Import match data from CSV files"
          icon={<Database className="h-6 w-6" />}
          status="connected"
        />
        <IntegrationCard
          title="Video Analysis"
          description="Connect video footage for play pattern recognition"
          icon={<Video className="h-6 w-6" />}
        />
        <IntegrationCard
          title="Stats API"
          description="Live football statistics and data feed"
          icon={<LineChart className="h-6 w-6" />}
          status="beta"
        />
        <IntegrationCard
          title="Camera Feed"
          description="Real-time in-stadium camera feeds"
          icon={<Camera className="h-6 w-6" />}
        />
        <IntegrationCard
          title="Email Notifications"
          description="Send automated reports and alerts"
          icon={<Mail className="h-6 w-6" />}
          status="maintenance"
        />
        <IntegrationCard
          title="YouTube Highlights"
          description="Automatically fetch match highlights"
          icon={<Youtube className="h-6 w-6" />}
        />
        <IntegrationCard
          title="Authentication"
          description="Connect team member accounts and roles"
          icon={<Lock className="h-6 w-6" />}
        />
        <IntegrationCard
          title="Web Scraper"
          description="Fetch data from league websites"
          icon={<Globe className="h-6 w-6" />}
          status="coming"
        />
      </div>
    </div>
  )
}

interface IntegrationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  status?: "connected" | "beta" | "maintenance" | "coming"
}

function IntegrationCard({ title, description, icon, status }: IntegrationCardProps) {
  const statusBadge = () => {
    switch (status) {
      case "connected":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Connected</Badge>
      case "beta":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Beta</Badge>
      case "maintenance":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Maintenance</Badge>
      case "coming":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Coming Soon</Badge>
      default:
        return null
    }
  }
  
  return (
    <Card className="bg-black/20 border-white/5 hover:bg-black/30 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-black/30 text-blue-400">
            {icon}
          </div>
          {statusBadge()}
        </div>
        <CardTitle className="text-white mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
          disabled={status === "coming" || status === "maintenance"}
        >
          {status === "connected" ? "Configure" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  )
}
