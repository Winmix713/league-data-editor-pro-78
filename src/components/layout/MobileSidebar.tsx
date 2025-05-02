
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Trophy, BarChart3, Calendar, Download, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileSidebarProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ onNavigate, currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const navigationItems = [
    { name: 'Dashboard', icon: Home, route: '/' },
    { name: 'Leagues', icon: Trophy, route: '/leagues' },
    { name: 'Statistics', icon: BarChart3, route: '/statistics' },
    { name: 'Fixtures', icon: Calendar, route: '/fixtures' },
    { name: 'Export', icon: Download, route: '/export' },
    { name: 'Settings', icon: Settings, route: '/settings' }
  ];
  
  const handleNavigate = (route: string) => {
    onNavigate(route);
    setIsOpen(false);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-black/80 backdrop-blur-sm border-r border-white/10">
        <SheetHeader className="p-4 text-left border-b border-white/10">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Soccer Stats Pro
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-4">
          <div className="relative w-full mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 rounded-md bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.route}
                variant="ghost"
                className={`w-full justify-start px-2 py-5 ${
                  currentRoute === item.route
                    ? 'bg-blue-500/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => handleNavigate(item.route)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>
          
          <Separator className="my-4 bg-white/10" />
          
          <div className="pt-2">
            <div className="flex items-center px-3 py-2 bg-white/5 rounded-md">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">User</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
