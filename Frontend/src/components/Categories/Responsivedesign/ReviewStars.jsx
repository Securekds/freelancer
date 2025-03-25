import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewStars = ({ stars, starcolorfiled = '#FFDF00', starcolorempty = '#E2E8F0', fontsize }) => {
  // Convert stars to a number (if it's a fraction string or already a number)
  const getStarCount = (stars) => {
    if (typeof stars === 'string' && stars.includes('/')) {
      // If stars is a fraction string (e.g., "4/5"), extract the numerator
      const [numerator] = stars.replace('{', '').replace('}', '').split('/');
      return parseInt(numerator);
    } else if (typeof stars === 'number') {
      // If stars is already a number, round it to the nearest integer
      return Math.round(stars); // Round to the nearest integer
    }
    return 0; // Default to 0 if stars is invalid
  };

  const filledStars = getStarCount(stars);

  return (
    <div className="flex flex-nowrap items-center justify-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          size="sm"
          style={{
            color: index < filledStars ? starcolorfiled : starcolorempty,
            flexShrink: 0,
            fontSize: fontsize || '14px', // Apply fontsize if provided, otherwise use '14px'
          }}
        />
      ))}
    </div>
  );
};

export default ReviewStars;