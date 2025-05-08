
import { memo, useState } from "react"
import { useLeagueState } from "@/hooks/league"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Save, RefreshCw, ArrowLeft } from "lucide-react"

export const SettingsView = memo(() => {
  const { navigate, refreshData, isLoading } = useLeagueState()

  const [settings, setSettings] = useState({
    appName: "V-Sports",
    darkMode: true,
    notifications: true,
    dataAutoSave: true,
    backupInterval: 30,
  })

  const [csvSettings, setCsvSettings] = useState({
    delimiter: ",",
    autoDetectRounds: true,
    defaultSeason: "2023-2024",
  })

  const handleSettingsChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleCsvSettingsChange = (field: string, value: any) => {
    setCsvSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, we would save this to localStorage or backend
    toast.success("Settings saved successfully")
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("leagues")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          onClick={refreshData}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Application Settings</CardTitle>
            <CardDescription>Customize your application experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input
                  id="appName"
                  value={settings.appName}
                  onChange={(e) => handleSettingsChange("appName", e.target.value)}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-400">Enable dark theme for the application</p>
                </div>
                <Switch 
                  id="darkMode" 
                  checked={settings.darkMode} 
                  onCheckedChange={(checked) => handleSettingsChange("darkMode", checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-gray-400">Receive update notifications</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={settings.notifications} 
                  onCheckedChange={(checked) => handleSettingsChange("notifications", checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataAutoSave">Auto Save</Label>
                  <p className="text-sm text-gray-400">Automatically save changes</p>
                </div>
                <Switch 
                  id="dataAutoSave" 
                  checked={settings.dataAutoSave} 
                  onCheckedChange={(checked) => handleSettingsChange("dataAutoSave", checked)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backupInterval">Backup Interval (minutes)</Label>
                <Input
                  id="backupInterval"
                  type="number"
                  value={settings.backupInterval}
                  onChange={(e) => handleSettingsChange("backupInterval", parseInt(e.target.value))}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">CSV Import Settings</CardTitle>
            <CardDescription>Configure how CSV files are processed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="delimiter">CSV Delimiter</Label>
                <Input
                  id="delimiter"
                  value={csvSettings.delimiter}
                  onChange={(e) => handleCsvSettingsChange("delimiter", e.target.value)}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoDetectRounds">Auto-detect Rounds</Label>
                  <p className="text-sm text-gray-400">Automatically detect rounds from match dates</p>
                </div>
                <Switch 
                  id="autoDetectRounds" 
                  checked={csvSettings.autoDetectRounds} 
                  onCheckedChange={(checked) => handleCsvSettingsChange("autoDetectRounds", checked)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultSeason">Default Season</Label>
                <Input
                  id="defaultSeason"
                  value={csvSettings.defaultSeason}
                  onChange={(e) => handleCsvSettingsChange("defaultSeason", e.target.value)}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600 gap-2" onClick={handleSaveSettings}>
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
})

SettingsView.displayName = "SettingsView"
