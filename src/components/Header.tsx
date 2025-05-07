
import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  currentSeason: string
}

export function Header({ currentSeason }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-[#101820]/80 backdrop-blur-xl">
      <div className="container h-[72px] flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <span className="text-lg font-bold">V-SPORTS</span>
        </div>
        
        <div className="hidden md:block">
          <span className="text-lg font-bold">V-SPORTS ANALYTICS</span>
          <span className="ml-2 text-sm text-gray-400">/ {currentSeason}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  )
}
