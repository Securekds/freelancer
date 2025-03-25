import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const SimpleStarRating = ({ stars, starcolorfiled = '#FFDF00', starcolorempty = '#E2E8F0', fontsize = '14px' }) => {
  // Convert stars to a number
  const getStarCount = () => {
    if (typeof stars === 'string') {
      return parseFloat(stars);
    }
    return stars || 0;
  };
  
  const filledStars = Math.round(getStarCount());
  
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          size="sm"
          style={{
            color: index < filledStars ? starcolorfiled : starcolorempty,
            flexShrink: 0,
            fontSize: fontsize,
          }}
        />
      ))}
    </div>
  );
};

export default SimpleStarRating;