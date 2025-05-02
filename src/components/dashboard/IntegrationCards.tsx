
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Database, Server, Globe, CheckCircle, XCircle } from 'lucide-react';

const IntegrationCards: React.FC = () => {
  const integrations = [
    {
      name: "API Connection",
      status: "Connected",
      icon: <Globe className="h-5 w-5 text-emerald-400" />,
      statusIcon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
      message: "Real-time data streaming active",
    },
    {
      name: "Database Sync",
      status: "Up to date",
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      statusIcon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
      message: "Last synchronized 5 minutes ago",
    },
    {
      name: "Match Tracking",
      status: "Active",
      icon: <Server className="h-5 w-5 text-emerald-400" />,
      statusIcon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
      message: "10 active trackers running",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
      {integrations.map((integration, index) => (
        <Card key={index} className="bg-black/20 border-white/10 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-2 rounded-lg">
                {integration.icon}
              </div>
              <div>
                <p className="font-medium">{integration.name}</p>
                <p className="text-xs text-gray-400">{integration.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {integration.statusIcon}
              <span className="text-xs font-medium text-emerald-400">
                {integration.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationCards;
