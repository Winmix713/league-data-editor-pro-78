
import { memo } from "react"
import { Database, Link2, PieChart, Webhook } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IntegrationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  status: "connected" | "not-connected"
  buttonText: string
  onClick: () => void
}

const IntegrationCard = ({
  title,
  description,
  icon,
  status,
  buttonText,
  onClick
}: IntegrationCardProps) => (
  <Card className="bg-black/20 border-white/5 hover:border-blue-500/50 transition-all">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          {icon}
        </div>
        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
          status === "connected" 
            ? "bg-emerald-500/20 text-emerald-400" 
            : "bg-amber-500/20 text-amber-400"
        }`}>
          {status === "connected" ? "Connected" : "Not Connected"}
        </div>
      </div>
      <CardTitle className="text-white">{title}</CardTitle>
      <CardDescription className="text-gray-400">{description}</CardDescription>
    </CardHeader>
    <CardContent className="text-sm text-gray-500">
      {status === "connected" 
        ? "Integration is active and syncing data automatically."
        : "Connect to enable automatic data synchronization."}
    </CardContent>
    <CardFooter>
      <Button 
        onClick={onClick}
        className="w-full gap-2"
        variant={status === "connected" ? "outline" : "default"}
      >
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
)

export const IntegrationsView = memo(() => {
  const handleIntegrationClick = () => {
    // Integration setup logic would go here
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-white">Integrations</h2>
      <p className="text-gray-400 max-w-3xl">
        Connect V-SPORTS with external services to enhance data collection and analysis.
        Integrations enable automatic data syncing and extended functionality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <IntegrationCard
          title="Analytics Integration"
          description="Connect to external analytics platforms for enhanced insights."
          icon={<PieChart className="h-5 w-5 text-blue-400" />}
          status="not-connected"
          buttonText="Connect Analytics"
          onClick={handleIntegrationClick}
        />
        <IntegrationCard
          title="Database Connection"
          description="Link to your existing database for seamless data management."
          icon={<Database className="h-5 w-5 text-blue-400" />}
          status="connected"
          buttonText="Manage Connection"
          onClick={handleIntegrationClick}
        />
        <IntegrationCard
          title="API Services"
          description="Connect to external API services for extended functionality."
          icon={<Link2 className="h-5 w-5 text-blue-400" />}
          status="not-connected"
          buttonText="Set up API"
          onClick={handleIntegrationClick}
        />
        <IntegrationCard
          title="Webhook Integration"
          description="Set up webhooks for real-time data updates and automation."
          icon={<Webhook className="h-5 w-5 text-blue-400" />}
          status="not-connected"
          buttonText="Configure Webhooks"
          onClick={handleIntegrationClick}
        />
      </div>

      <div className="mt-12 p-6 bg-black/20 rounded-xl border border-white/10">
        <h3 className="text-lg font-medium mb-4">Integration Documentation</h3>
        <p className="text-gray-400 mb-6">
          Learn how to set up and configure each integration type with our comprehensive guides.
          Our API documentation provides all the necessary details for custom integrations.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            View API Docs
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            Integration Tutorials
          </Button>
        </div>
      </div>
    </div>
  )
})

IntegrationsView.displayName = "IntegrationsView"
