import React from 'react';
import { MapPin, Users } from 'lucide-react';

const TeamStadium = ({ stadium }) => {
  // const [lat, lng] = stadium.geocoords.split(',');
  // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY`;

  // // Fallback to OpenStreetMap if Google Maps API key is not available
  // const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lng) - 0.005},${parseFloat(lat) - 0.005},${parseFloat(lng) + 0.005},${parseFloat(lat) + 0.005}&layer=mapnik&marker=${lat},${lng}`;

  const formatCapacity = (capacity) => {
    return new Intl.NumberFormat('en-US').format(capacity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{stadium.name}</h2>
        <div className="flex flex-col gap-2 text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-red-600" />
            <span>{stadium.city}, {stadium.country}</span>
          </div>
          <div className="flex items-center">
            <Users size={18} className="mr-2 text-red-600" />
            <span>Capacity: {formatCapacity(stadium.capacity)} spectators</span>
          </div>
        </div>
      </div>

      <div className="h-64 bg-gray-100 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/243587/pexels-photo-243587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt={stadium.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="text-white p-4">
            <div className="font-semibold">Stadium Location</div>
            <div className="text-sm">{stadium.geocoords}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStadium;