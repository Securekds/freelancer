import React from 'react';
import { useUser } from '../../../Context/UserContext.jsx';

const CircularProfile = ({ progress = 75, segments = 12, imageUrl = '/api/placeholder/100/100' }) => {
  const size = 130;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / segments;
  const gap = 2;

  const { user } = useUser();

  const createSegments = () => {
    const segmentElements = [];
    const anglePerSegment = (360 / segments) - gap;

    for (let i = 0; i < segments; i++) {
      // Adjust starting angle by 90 degrees (π/2) to start from bottom
      const startAngle = ((i * (360 / segments)) + 190) * (Math.PI / 180);
      const endAngle = (startAngle + (anglePerSegment * (Math.PI / 180)));

      const start = {
        x: center + radius * Math.cos(startAngle),
        y: center + radius * Math.sin(startAngle),
      };

      const end = {
        x: center + radius * Math.cos(endAngle),
        y: center + radius * Math.sin(endAngle),
      };

      const largeArcFlag = anglePerSegment > 180 ? 1 : 0;
      const segmentProgress = (progress / 260) * segments;
      const isActive = i < segmentProgress;

      const pathData = [
        `M ${start.x} ${start.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      ].join(' ');

      segmentElements.push(
        <path
          key={i}
          d={pathData}
          stroke={isActive ? '#5bc1fd' : '#e5e7eb'}
          strokeWidth={strokeWidth}
          fill="none"
        />
      );
    }
    return segmentElements;
  };


  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    const cleanPath = imagePath.startsWith('/')
        ? imagePath
        : `/${imagePath}`;

    const fullUrl = `${import.meta.env.VITE_BACKEND_URL}${cleanPath}`;
    console.log('Generated image URL:', fullUrl);
    return fullUrl;
};
const profileImageUrl = user?.profileImg ? getImageUrl(user.profileImg) : null;


  return (
    <div 
      className="relative w-32 h-32"
      style={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform rotate-180" // Changed rotation to make progress go counterclockwise
      >
        {createSegments()}
      </svg>
      <div className="ProfileCircle"
        
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: 'auto',
          position: 'absolute',
          top: '15.2%',
          left: '15.6%',
        }}
      >
        <img
          src={profileImageUrl}
          alt="Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="absolute inset-0 m-2 rounded-full overflow-hidden">
      </div>
    </div>
  );
};

export default CircularProfile;