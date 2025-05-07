
import { useState } from "react"
import { ArrowRight, Database, BarChart3, Globe, Webhook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface IntegrationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onConnect: () => void
  isActive?: boolean
}

const IntegrationCard = ({ title, description, icon, onConnect, isActive }: IntegrationCardProps) => (
  <Card className="bg-black/20 border-white/5 hover:bg-black/30 transition-colors">
    <CardHeader>
      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
        {icon}
      </div>
      <CardTitle className="text-white">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button 
        variant={isActive ? "default" : "outline"} 
        className={
          isActive 
            ? "w-full gap-2 bg-green-500 hover:bg-green-600" 
            : "w-full gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
        }
        onClick={onConnect}
      >
        {isActive ? "Connected" : "Connect"}
        {!isActive && <ArrowRight className="h-4 w-4" />}
      </Button>
    </CardFooter>
  </Card>
)

export function IntegrationsView() {
  const [activeTab, setActiveTab] = useState<string>("integrations")
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const { toast } = useToast()

  const handleConnectIntegration = (integrationType: string) => {
    setActiveIntegration(integrationType)
    setActiveTab("setup")
    // Reset form fields when switching integration
    setApiKey("")
    setWebhookUrl("")
  }

  const handleSaveIntegration = () => {
    toast({
      title: "Integration Saved",
      description: `Your ${activeIntegration} integration has been successfully configured.`,
    })
    setActiveTab("integrations")
  }

  const handleTestConnection = () => {
    toast({
      title: "Connection Test Successful",
      description: "The integration connection has been verified.",
    })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white">Integrations</h2>
        <p className="text-gray-400">Connect your league data with external services and platforms</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-black/20 w-full max-w-md rounded-xl">
          <TabsTrigger
            value="integrations"
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Available Integrations
          </TabsTrigger>
          <TabsTrigger
            value="setup"
            disabled={!activeIntegration}
            className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
          >
            Setup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <IntegrationCard
              title="Analytics Integration"
              description="Connect with Google Analytics or other analytics platforms"
              icon={<BarChart3 className="h-6 w-6" />}
              onConnect={() => handleConnectIntegration("analytics")}
            />
            <IntegrationCard
              title="Database Connection"
              description="Sync data with external databases like MySQL or MongoDB"
              icon={<Database className="h-6 w-6" />}
              onConnect={() => handleConnectIntegration("database")}
            />
            <IntegrationCard
              title="API Services"
              description="Connect with third-party API services for data enrichment"
              icon={<Globe className="h-6 w-6" />}
              onConnect={() => handleConnectIntegration("api")}
            />
            <IntegrationCard
              title="Webhook Integration"
              description="Set up webhooks to trigger external workflows"
              icon={<Webhook className="h-6 w-6" />}
              onConnect={() => handleConnectIntegration("webhook")}
            />
          </div>
        </TabsContent>

        <TabsContent value="setup" className="mt-6">
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="text-white">
                {activeIntegration === "analytics" && "Analytics Integration Setup"}
                {activeIntegration === "database" && "Database Connection Setup"}
                {activeIntegration === "api" && "API Services Setup"}
                {activeIntegration === "webhook" && "Webhook Integration Setup"}
              </CardTitle>
              <CardDescription>
                {activeIntegration === "analytics" && "Configure your analytics platform integration"}
                {activeIntegration === "database" && "Set up your external database connection"}
                {activeIntegration === "api" && "Connect to third-party API services"}
                {activeIntegration === "webhook" && "Configure webhook endpoints for automated workflows"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Common fields across integration types */}
              <div className="space-y-2">
                <Label htmlFor="integration-name">Integration Name</Label>
                <Input
                  id="integration-name"
                  placeholder="Enter a name for this integration"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>

              {/* Integration specific fields */}
              {activeIntegration === "analytics" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="tracking-id">Tracking ID</Label>
                    <Input
                      id="tracking-id"
                      placeholder="UA-XXXXXXXXX-X"
                      className="bg-black/30 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-url">Property URL</Label>
                    <Input
                      id="property-url"
                      placeholder="https://yourwebsite.com"
                      className="bg-black/30 border-white/10 text-white"
                    />
                  </div>
                </>
              )}

              {activeIntegration === "database" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="connection-string">Connection String</Label>
                    <Input
                      id="connection-string"
                      placeholder="mongodb://username:password@host:port/database"
                      className="bg-black/30 border-white/10 text-white font-mono text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-type">Database Type</Label>
                      <Input
                        id="db-type"
                        placeholder="MongoDB, MySQL, etc."
                        className="bg-black/30 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-version">Database Version</Label>
                      <Input
                        id="db-version"
                        placeholder="e.g., 5.7"
                        className="bg-black/30 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeIntegration === "api" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                    <Input
                      id="api-endpoint"
                      placeholder="https://api.example.com/v1/"
                      className="bg-black/30 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      className="bg-black/30 border-white/10 text-white font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-format">Request Format</Label>
                    <Input
                      id="request-format"
                      placeholder="JSON, XML, etc."
                      className="bg-black/30 border-white/10 text-white"
                    />
                  </div>
                </>
              )}

              {activeIntegration === "webhook" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-service.com/webhook"
                      className="bg-black/30 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Trigger Event</Label>
                    <Input
                      id="event-type"
                      placeholder="e.g., match.created, league.updated"
                      className="bg-black/30 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secret-token">Secret Token (optional)</Label>
                    <Input
                      id="secret-token"
                      type="password"
                      placeholder="Secret token for webhook validation"
                      className="bg-black/30 border-white/10 text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSaveIntegration}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save Integration
              </Button>
              <Button
                onClick={handleTestConnection}
                variant="outline"
                className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Test Connection
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
