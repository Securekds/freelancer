import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MakeAReview = ({ 
  initialRating = 0, 
  onRatingChange = () => {}, 
  starColorFilled = '#FFDF00', 
  starColorEmpty = '#E2E8F0', 
  fontSize = '14px',
  isInteractive = true
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (starIndex) => {
    if (!isInteractive) return;
    
    const newRating = starIndex + 1;
    setRating(newRating);
    onRatingChange(newRating);
  };

  const handleMouseEnter = (starIndex) => {
    if (!isInteractive) return;
    setHover(starIndex + 1);
  };

  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setHover(0);
  };

  return (
    <div className="flex flex-nowrap items-center justify-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          size="sm"
          style={{
            color: (hover > 0 ? index < hover : index < rating) 
              ? starColorFilled 
              : starColorEmpty,
            flexShrink: 0,
            fontSize: fontSize,
            cursor: isInteractive ? 'pointer' : 'default'
          }}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default MakeAReview;