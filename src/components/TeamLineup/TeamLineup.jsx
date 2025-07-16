import React, { useState } from 'react';
import { Users, UserCircle2 } from 'lucide-react';



const TeamLineup = ({ lineup = {} }) => {
  const [activeTab, setActiveTab] = useState('starters');

  const start = !!lineup.start ? lineup.start : [];

  const renderPlayers = (players) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {players.map(player => (
          <div 
            key={player.id} 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-red-600 text-white rounded-full">
              {player.s_n}
            </div>
            <div className="text-center">
              <div className="font-semibold truncate" title={player.name}>
                {player.name}
              </div>
              <div className="text-xs text-gray-500">#{player.s_n}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Lineup</h2>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex items-center px-4 py-2 font-semibold text-sm focus:outline-none ${
            activeTab === 'starters' 
              ? 'text-red-600 border-b-2 border-red-600' 
              : 'text-gray-600 hover:text-red-600'
          }`}
          onClick={() => setActiveTab('starters')}
        >
          <Users size={18} className="mr-2" />
          Starting XI
        </button>
        
      </div>
      
      <div className="animate-fade-in">
          {renderPlayers(start.slice(0, 11))}
      </div>
    </div>
  );
};

export default TeamLineup;