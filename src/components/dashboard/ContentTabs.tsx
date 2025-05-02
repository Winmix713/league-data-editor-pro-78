
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, setActiveTab, isLoading }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 bg-black/20 w-full max-w-md rounded-xl">
        <TabsTrigger
          value="matches"
          disabled={isLoading}
          className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
        >
          Matches
        </TabsTrigger>
        <TabsTrigger
          value="standings"
          disabled={isLoading}
          className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
        >
          Standings
        </TabsTrigger>
        <TabsTrigger
          value="form"
          disabled={isLoading}
          className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
        >
          Form
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ContentTabs;
