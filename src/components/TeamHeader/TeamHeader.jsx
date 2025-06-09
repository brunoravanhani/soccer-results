import React from 'react';
import { Trophy, MapPin, User } from 'lucide-react';

const TeamHeader = ({ name, country, managerName, championship }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10"></div>
      <div 
        className="bg-cover bg-center h-64 md:h-96" 
        style={{ backgroundImage: `url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
      ></div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{name}</h1>
          <div className="flex flex-col md:flex-row md:items-center text-white/90 gap-4 md:gap-8">
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>{country}</span>
            </div>
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>Manager: {managerName}</span>
            </div>
            <div className="flex items-center">
              <Trophy size={18} className="mr-2" />
              <span>{championship}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;