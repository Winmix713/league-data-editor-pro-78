
import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  dataUpdatedAt: Date;
  isRefreshing: boolean;
  onRefresh: () => void;
  actionButton?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  dataUpdatedAt,
  isRefreshing,
  onRefresh,
  actionButton,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 mt-1">{subtitle}</p>
        <p className="text-xs text-gray-500 mt-2">
          Last updated: {dataUpdatedAt.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className={`bg-white/5 border-white/10 text-white hover:bg-white/10 ${isRefreshing ? 'opacity-50' : ''}`}
          disabled={isRefreshing}
          onClick={onRefresh}
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        {actionButton}
      </div>
    </div>
  );
};

export default DashboardHeader;
