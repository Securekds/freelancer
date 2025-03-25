import React from 'react';

const RankProgressionSystem = () => {
  const ranks = [
    { level: 'VIII', points: 10000, color: '#8E99C3', type: 'knight', step: 0 },
    { level: 'IX', points: 20000, color: '#38B3ED', type: 'trophy', step: 1 },
    { level: 'X', points: 30000, color: '#29A1E9', type: 'diamond', step: 2 },
    { level: 'XI', points: 40000, color: '#9C54E5', type: 'crown', step: 3 },
    { level: 'XII', points: 50000, color: '#A557E8', type: 'crown', step: 4 },
    { level: 'XIII', points: 60000, color: '#E8445A', type: 'crown-special', step: 5 },
    { level: 'XIV', points: 1270000, color: '#E85529', type: 'crown-master', step: 6 }
  ];

  const Badge = ({ rank, active }) => {
    const getBadgeContent = () => {
      switch (rank.type) {
        case 'knight':
          return (
            <svg viewBox="0 0 60 60" className="w-16 h-16">
              <defs>
                <filter id={`glow-${rank.level}`}>
                  <feGaussianBlur stdDeviation="2" result="glow"/>
                  <feMerge>
                    <feMergeNode in="glow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id={`shadow-${rank.level}`}>
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.35"/>
                </filter>
                <linearGradient id={`grad-${rank.level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: rank.color, stopOpacity: 1}}/>
                  <stop offset="100%" style={{stopColor: `${rank.color}99`, stopOpacity: 0.8}}/>
                </linearGradient>
              </defs>
              <path 
                d="M30 5L45 20L30 55L15 20Z" 
                fill={`url(#grad-${rank.level})`}
                filter={`url(#shadow-${rank.level}) ${active ? `url(#glow-${rank.level})` : ''}`}
              />
              <path 
                d="M25 25H35V35H25Z" 
                fill="#fff" 
                opacity="0.3"
              />
            </svg>
          );
        case 'trophy':
        case 'diamond':
          return (
            <svg viewBox="0 0 60 60" className="w-16 h-16">
              <defs>
                <filter id={`glow-${rank.level}`}>
                  <feGaussianBlur stdDeviation="2" result="glow"/>
                  <feMerge>
                    <feMergeNode in="glow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id={`shadow-${rank.level}`}>
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.35"/>
                </filter>
              </defs>
              <path 
                d="M10 15H50L40 45H20Z" 
                fill={rank.color}
                filter={`url(#shadow-${rank.level}) ${active ? `url(#glow-${rank.level})` : ''}`}
              />
              {rank.type === 'diamond' && (
                <path 
                  d="M25 25L30 35L35 25Z" 
                  fill="#fff" 
                  opacity="0.4"
                />
              )}
            </svg>
          );
        default: // crown types
          return (
            <svg viewBox="0 0 60 60" className="w-16 h-16">
              <defs>
                <filter id={`glow-${rank.level}`}>
                  <feGaussianBlur stdDeviation="2" result="glow"/>
                  <feMerge>
                    <feMergeNode in="glow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id={`shadow-${rank.level}`}>
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.35"/>
                </filter>
                <linearGradient id={`grad-${rank.level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: rank.color, stopOpacity: 1}}/>
                  <stop offset="100%" style={{stopColor: `${rank.color}99`, stopOpacity: 0.8}}/>
                </linearGradient>
              </defs>
              <path 
                d="M15 20L30 10L45 20L40 45H20Z" 
                fill={`url(#grad-${rank.level})`}
                filter={`url(#shadow-${rank.level}) ${active ? `url(#glow-${rank.level})` : ''}`}
              />
              <path 
                d="M25 25L30 15L35 25L30 35Z" 
                fill="#fff" 
                opacity="0.3"
              />
            </svg>
          );
      }
    };

    return (
      <div className="flex flex-col items-center" style={{
        transform: `translateY(-${rank.step * 20}px)`
      }}>
        {getBadgeContent()}
        <span className="text-white font-bold mt-2">{rank.level}</span>
        <div className="flex items-center mt-1">
          <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8Z" fill="#FFD700"/>
          </svg>
          <span className="text-cyan-400 text-sm">{rank.points.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-lg w-full max-w-4xl">
      <div className="mb-8">
        <h2 className="text-white text-xl mb-2">我的戰力: 8000</h2>
      </div>
      
      <div className="relative" style={{ height: '200px' }}>
        {/* Progress line with gradient */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 top-32 -z-10"/>
        
        {/* Badges */}
        <div className="flex justify-between items-end h-full pb-16">
          {ranks.map((rank, index) => (
            <Badge 
              key={rank.level} 
              rank={rank} 
              active={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Current rank info */}
      <div className="mt-12 bg-slate-800/50 p-6 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <Badge rank={ranks[0]} active={true} />
          <div className="ml-4">
            <h3 className="text-white">新秀榜 X</h3>
            <p className="text-cyan-400">戰力: 5,000-10,000</p>
          </div>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <span className="text-white">升級獎勵</span>
        </div>
      </div>
    </div>
  );
};

export default RankProgressionSystem;