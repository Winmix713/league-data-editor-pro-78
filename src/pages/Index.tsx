import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Header from "@/components/Header";
import LeagueSeasons from "@/components/LeagueSeasons";
import LeagueEditor from "@/components/LeagueEditor";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import IntegrationCards from "@/components/dashboard/IntegrationCards";
import ContentTabs from "@/components/dashboard/ContentTabs";
import MatchSchedule from "@/components/MatchSchedule";
import { LeagueDetails } from "@/components/LeagueDetails";
import type { LeagueData, Match } from "@/types";

const Matches = () => {
  // 1. Kezdő nézet módosítása 'league-list'-re
  const [activeTab, setActiveTab] = useState("league-list");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Ez maradhat a kezdeti skeleton/placeholder effekthez

  useEffect(() => {
    // Szimulálja a kezdeti betöltést
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Valós API hívás helyett szimuláció
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setDataUpdatedAt(now);
      // Itt frissíteni kellene a tényleges adatokat is (selectedLeague, matches, stb.)
      // Például: fetchDataForCurrentSelection();
      toast.success("Data refreshed successfully", {
        description: `All data has been updated as of ${now.toLocaleTimeString()}`
      });
    }, 2000);
  };

  const handleLeagueUpdate = (updatedLeague: LeagueData) => {
    setSelectedLeague(updatedLeague);
    // Opcionálisan frissíthetjük a meccseket is, ha a liga adatai változtak
    // fetchMatchesForLeague(updatedLeague.id);
    toast("League details updated.");
  };

  const handleMatchesUpdate = (updatedMatches: Match[]) => {
    setMatches(updatedMatches);
    toast("Matches updated.");
  };

  // 3. TODO: Szezonválasztó interaktívvá tétele
  const seasonSelector = (
    <div className="relative flex items-center">
      <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
        <span>2023-2024 Szezon</span> {/* Statikus címke */}
        <ChevronDown className="h-4 w-4" />
      </Button>
      {/* Itt lehetne egy lenyíló menü a szezonokkal */}
    </div>
  );

  const handleSelectLeague = (league: LeagueData, leagueMatches: Match[]) => {
    setSelectedLeague(league);
    setMatches(leagueMatches);
    setActiveTab("league-details"); // Liga kiválasztása után a részletek oldalra navigálunk
    setIsLoading(false); // Biztosítjuk, hogy a loading véget érjen
  };

  const handleBackToList = () => {
    // Opcionálisan nullázhatjuk a kiválasztást, ha visszalépünk a listára
    // setSelectedLeague(null);
    // setMatches([]);
    setActiveTab("league-list");
  };

  const handleBackFromEditor = () => {
    setIsEditing(false);
    // Ha a szerkesztőből lépünk vissza, érdemes lehet a liga listára menni,
    // vagy arra a nézetre, ahonnan a szerkesztés indult.
    setActiveTab("league-list");
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        {isEditing ? (
          // Szerkesztő nézet
          <LeagueEditor onBack={handleBackFromEditor} /* Opcionálisan átadhatjuk a ligát szerkesztésre */ />
        ) : (
          // Fő nézet
          <div className="flex flex-col space-y-6">
            <DashboardHeader
              title="V-SPORTS ELEMZŐ RENDSZER"
              subtitle="Professzionális Elemzés és Predikció"
              dataUpdatedAt={dataUpdatedAt}
              isRefreshing={isRefreshing}
              onRefresh={handleRefreshData}
              actionButton={seasonSelector} // Itt adjuk át a szezonválasztót
            />

            <IntegrationCards />

            {/* Liga Lista nézet */}
            {activeTab === "league-list" && (
              <LeagueSeasons
                onEdit={() => setIsEditing(true)}
                onSelect={handleSelectLeague}
              />
            )}

            {/* Liga Részletek nézet */}
            {activeTab === "league-details" && selectedLeague && (
              <LeagueDetails
                league={selectedLeague}
                matches={matches} // Átadjuk a state-ben lévő meccseket
                onBack={handleBackToList} // Visszalépés a listához
                onUpdateLeague={handleLeagueUpdate}
                onUpdateMatches={handleMatchesUpdate}
                // Lehetőség a fülek közötti navigációra a részletek oldalról
                onNavigateToTab={(tabName: string) => setActiveTab(tabName)}
              />
            )}

            {/* Fülek (Meccsek, Tabella, Forma) - Akkor jelennek meg, ha nem a lista vagy a részletek aktív */}
            {/* 4. Megfontolás: Lehet, hogy csak akkor kellene megjelennie, ha van selectedLeague? */}
            {/* Jelenlegi logika: Ha a tab ezek egyike, akkor mutatjuk */}
            {["matches", "standings", "form"].includes(activeTab) && selectedLeague && ( // Csak akkor mutatjuk, ha van kiválasztott liga
              <>
                {/* Vissza gomb a liga részleteihez vagy listához */}
                 <Button onClick={() => setActiveTab('league-details')} variant="outline" className="self-start">
                    ← Back to League Details
                 </Button>
                 {/* VAGY: <Button onClick={handleBackToList} variant="outline">← Back to League List</Button> */}

                <ContentTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isLoading={isLoading} // Ezt finomítani kellene valós betöltéshez
                />
                {/* 2. Adatátadás a MatchSchedule-nek */}
                {activeTab === "matches" && (
                  <MatchSchedule
                    matches={matches} // Átadjuk a kiválasztott liga meccseit
                    league={selectedLeague} // Opcionálisan a liga adatait is átadhatjuk
                    isLoading={isLoading /* vagy egy specifikusabb loading state */}
                  />
                )}
                 {/* TODO: Komponensek a "standings" és "form" fülekhez, átadva nekik a selectedLeague és matches adatokat */}
                 {/* {activeTab === "standings" && <LeagueStandings league={selectedLeague} />} */}
                 {/* {activeTab === "form" && <TeamForm league={selectedLeague} matches={matches} />} */}
              </>
            )}

             {/* Ha nincs kiválasztott liga, de a tab matches/standings/form, akkor üzenet */}
             {["matches", "standings", "form"].includes(activeTab) && !selectedLeague && (
                <div className="text-center py-8 text-muted-foreground">
                    Please select a league from the 'League List' tab first.
                     <Button onClick={() => setActiveTab('league-list')} variant="link">Go to League List</Button>
                </div>
             )}


          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
