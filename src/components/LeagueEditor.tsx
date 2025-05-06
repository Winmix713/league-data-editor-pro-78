
import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, CircleAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/custom-input";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MatchesTable } from "./MatchesTable";
import type { Match } from "../types";

interface LeagueEditorProps {
  onBack: () => void;
  league?: {
    name: string;
    season: string;
  };
}

const LeagueEditor = ({ onBack, league = { name: "Premier League", season: "2023-2024" } }: LeagueEditorProps) => {
  const [leagueData, setLeagueData] = useState(league);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeagueData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      // Use PapaParse to parse the CSV file
      import('papaparse').then((Papa) => {
        Papa.default.parse(file, {
          header: true,
          complete: (results) => {
            try {
              const currentYear = new Date().getFullYear();
              const parsedMatches = results.data
                .filter((rawMatch: any) => {
                  // Filter out empty rows and header rows
                  return (
                    rawMatch.date !== undefined &&
                    rawMatch.home_team !== undefined &&
                    rawMatch.away_team !== undefined
                  )
                })
                .map((rawMatch: any, index: number) => {
                  // Format the date - if it's only a time, add today's date
                  let dateValue = rawMatch.date || "";
                  if (dateValue && dateValue.match(/^\d{2}:\d{2}$/)) {
                    // It's just a time, let's add a synthetic date using the round number
                    // Each 8 matches creates a new round, starting from today
                    const roundIndex = Math.floor(index / 8);
                    const syntheticDate = new Date();
                    syntheticDate.setDate(syntheticDate.getDate() + (roundIndex * 7)); // One round per week
                    const month = String(syntheticDate.getMonth() + 1).padStart(2, '0');
                    const day = String(syntheticDate.getDate()).padStart(2, '0');
                    dateValue = `${currentYear}-${month}-${day} ${dateValue}`;
                  }

                  // Calculate round number (1-based, every 8 matches is a new round)
                  const roundNumber = Math.floor(index / 8) + 1;
                  
                  // Map to our Match format
                  return {
                    date: dateValue,
                    home_team: rawMatch.home_team || "",
                    away_team: rawMatch.away_team || "",
                    ht_home_score: Number(rawMatch.ht_home_score || 0),
                    ht_away_score: Number(rawMatch.ht_away_score || 0),
                    home_score: Number(rawMatch.home_score || 0),
                    away_score: Number(rawMatch.away_score || 0),
                    round: `Round ${roundNumber}`,
                  };
                });

              if (parsedMatches.length === 0) {
                toast.error("No valid matches found in the CSV file");
                return;
              }

              setMatches(parsedMatches as Match[]);
              setFileUploaded(true);
              toast.success(`${parsedMatches.length} matches imported successfully`);
            } catch (error) {
              console.error("Error processing CSV data:", error);
              toast.error("Failed to process CSV file");
            }
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            toast.error("Failed to parse CSV file");
          }
        });
      }).catch(err => {
        console.error("Error loading PapaParse:", err);
        toast.error("Failed to load CSV parser");
      });
    }
  };

  const handleSave = () => {
    toast.success("League data saved successfully");
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0a0f14] border border-white/5 shadow-lg">
      {/* Background blur effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative p-6">
        <div className="space-y-6 animate-fadeIn">
          {/* Header with back button and save button */}
          <div className="flex items-center justify-between">
            <Button variant="outline" 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Leagues
            </Button>
            
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
          
          {/* League details form */}
          <div className="bg-black/20 rounded-xl p-6 space-y-6 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="leagueName" className="text-gray-300 text-sm">League Name</label>
                <CustomInput 
                  id="leagueName"
                  name="name"
                  value={leagueData.name}
                  onChange={handleInputChange}
                  placeholder="Enter league name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="leagueSeason" className="text-gray-300 text-sm">Season</label>
                <CustomInput 
                  id="leagueSeason"
                  name="season"
                  value={leagueData.season}
                  onChange={handleInputChange}
                  placeholder="Enter season (e.g., 2023-24)"
                />
              </div>
            </div>
            
            {/* File upload section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="csv-upload" className="block text-gray-300 text-sm mb-2">Upload Matches Data (CSV)</label>
                <input 
                  id="csv-upload" 
                  type="file" 
                  accept=".csv"
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
                    onClick={() => document.getElementById('csv-upload')?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Choose CSV File
                  </Button>
                  <span className="text-sm text-gray-400">
                    {fileName ? fileName : "No file chosen"}
                  </span>
                </div>
                
                {fileUploaded && (
                  <p className="text-sm text-emerald-400 mt-2 flex items-center">
                    <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Data loaded successfully
                  </p>
                )}
              </div>
              
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
                onClick={handleSave}
                disabled={!fileUploaded}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
          
          {/* Tabs section */}
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
              <TabsTrigger 
                value="matches" 
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger 
                value="standings" 
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Standings
              </TabsTrigger>
              <TabsTrigger 
                value="form" 
                className="py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
              >
                Form
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches" className="p-0 mt-6">
              {matches.length > 0 ? (
                <MatchesTable matches={matches} />
              ) : (
                <div className="bg-black/20 rounded-xl p-8 text-center border border-white/5">
                  <div className="flex flex-col items-center gap-3">
                    <CircleAlert className="w-8 h-8 text-gray-500" />
                    <p className="text-gray-400">No matches available for this league yet.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="standings" className="p-0 mt-6">
              {/* Standings content would go here */}
              <div className="bg-black/20 rounded-xl p-8 text-center border border-white/5">
                <div className="flex flex-col items-center gap-3">
                  <CircleAlert className="w-8 h-8 text-gray-500" />
                  <p className="text-gray-400">Standings will be generated after match data is saved.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="form" className="p-0 mt-6">
              {/* Form content would go here */}
              <div className="bg-black/20 rounded-xl p-8 text-center border border-white/5">
                <div className="flex flex-col items-center gap-3">
                  <CircleAlert className="w-8 h-8 text-gray-500" />
                  <p className="text-gray-400">Form data will be generated after match data is saved.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Top border gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        {/* Bottom border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default LeagueEditor;
