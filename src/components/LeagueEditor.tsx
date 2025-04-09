
import React, { useState } from 'react';
import { ChevronLeft, Save, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/custom-input";
import { toast } from "sonner";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeagueData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileUploaded(true);
      toast.success("File uploaded successfully");
    }
  };

  const handleSave = () => {
    toast.success("League data saved successfully");
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" 
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Leagues
          </Button>
          
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Edit League Details</h2>
          <p className="text-gray-400 text-sm">Update league information or upload match data</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">League Name</label>
            <CustomInput 
              name="name"
              value={leagueData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">Season</label>
            <CustomInput 
              name="season"
              value={leagueData.season}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Upload Matches Data (CSV)</h3>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
                Choose CSV File
              </Button>
            </div>
            
            {fileUploaded && (
              <div className="flex items-center gap-2 text-emerald-500">
                <Check className="h-4 w-4" />
                <span className="text-sm">Data loaded successfully: {fileName}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeagueEditor;
