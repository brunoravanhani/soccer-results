import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import TeamHeader from "../TeamHeader/TeamHeader";
import TeamStadium from "../TeamStadium/TeamStadium";
import MatchResults from "../MatchResults/MatchResults";
import TeamLineup from "../TeamLineup/TeamLineup";
import { config } from '../../config';

export default function TeamStats() {

    const [teamStats, setTeamStats] = useState({});
    const params = useParams();

    useEffect(() => {

        fetchTeamStats();

    }, []);

    const fetchTeamStats = async () => {
        const url = `https://${config.apiUrl}/teams/view/?i=${params.id}`
        const response = await fetch(url, {
            headers: {
                'x-rapidapi-host': config.apiUrl,
                'x-rapidapi-key': config.apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          setTeamStats(json.result[0]);
    }

    const getChampionshipName = () => {
        if (!teamStats.last_matches) {
            return '';
        }

        return teamStats.last_matches[0].championship.name;
    }

    const isHomeMatch = () => {
      if (!teamStats || !teamStats.last_matches) {
        return true;
      }

      return teamStats.last_matches[0].teamA.name == teamStats.name;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <TeamHeader 
                name={teamStats.name} 
                country={teamStats.country} 
                managerName={teamStats.manager?.name} 
                championship={getChampionshipName()}/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TeamStadium stadium={teamStats.stadium || {}}/>
          </div>
          
          <div className="lg:col-span-2">
            {<MatchResults 
              matches={teamStats.last_matches} 
              teamId={teamStats.id} 
            />}
          </div>
        </div>
        
        {/* Team Lineup */}
        <div className="mt-8">
          <TeamLineup lineup={teamStats.last_lineup} isHomeMatch={isHomeMatch()}/>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-red-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">{"Name"}</h2>
              <p className="text-gray-300">Official Team Website</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-white hover:text-red-200 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">News</a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">Fixtures</a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">Team</a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-red-800 mt-6 pt-6 text-center text-sm text-gray-300">
            © {new Date().getFullYear()} {"Name"}. All rights reserved.
          </div>
        </div>
      </footer>
        </div>
    )
}