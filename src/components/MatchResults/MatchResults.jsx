import React, {useState} from 'react';
import { Calendar, ChevronUp, ChevronDown } from 'lucide-react';

const MatchResults = ({ matches = [], teamId }) => {
  const [expandedMatch, setExpandedMatch] = useState(null);

  
const getResultColor = (result) => {
  switch (result) {
    case 'WIN':
      return 'bg-green-500';
    case 'LOSS':
      return 'bg-red-500';
    case 'DRAW':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const getResultLabel = (result) => {
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
};

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};


  const toggleExpand = (id) => {
    if (expandedMatch === id) {
      setExpandedMatch(null);
    } else {
      setExpandedMatch(id);
    }
  };

  const getTeamSide = (match) => {
    return match.teamA.id === teamId ? 'home' : 'away';
  };

  const getFormIndicators = () => {
    return matches.map(match => (
      <div 
        key={match.id} 
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getResultColor(match.team_result)}`}
        title={`${match.teamA.name} ${match.teamA.score} - ${match.teamB.score} ${match.teamB.name}`}
      >
        {match.team_result === 'WIN' ? 'W' : match.team_result === 'LOSS' ? 'L' : 'D'}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Matches</h2>
        <div className="flex gap-2">
          {getFormIndicators()}
        </div>
      </div>
      
      <div className="space-y-4">
        {matches.map(match => (
          <div 
            key={match.id} 
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-500"
          >
            <div 
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleExpand(match.id)}
            >
              <div className="flex-1">
                <div className="text-sm text-gray-500 flex items-center mb-1">
                  <Calendar size={14} className="mr-2" />
                  <span>{formatDate(match.date_match)}</span>
                </div>
                <div className="text-lg font-semibold">{match.championship.name}</div>
              </div>
              
              <div className="flex items-center justify-center flex-1">
                <div className="flex flex-col items-center md:flex-row md:gap-4">
                  <span className={`font-semibold ${getTeamSide(match) === 'home' ? 'text-red-600' : ''}`}>
                    {match.teamA.name}
                  </span>
                  
                  <div className="flex items-center justify-center bg-gray-100 rounded px-4 py-2 font-bold mx-2">
                    <span className={getTeamSide(match) === 'home' ? 'text-red-600' : ''}>{match.teamA.score}</span>
                    <span className="mx-1">-</span>
                    <span className={getTeamSide(match) === 'away' ? 'text-red-600' : ''}>{match.teamB.score}</span>
                  </div>
                  
                  <span className={`font-semibold ${getTeamSide(match) === 'away' ? 'text-red-600' : ''}`}>
                    {match.teamB.name}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getResultColor(match.team_result)}`}>
                  {getResultLabel(match.team_result)}
                </div>
                {expandedMatch === match.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            
            {expandedMatch === match.id && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 animate-fade-in">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Match Details</h3>
                    <p className="text-sm text-gray-600">
                      {formatTime(match.date_match)} • {match.championship.s_name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchResults;