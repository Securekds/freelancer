import React, { useState, useEffect } from 'react';
import './ProgressBubble.css';

const ProgressBubble = ({ progress = 0, size = 150 }) => {
  const [currentClass, setCurrentClass] = useState('green');
  
  useEffect(() => {
    // Determine color based on progress value
    if (progress < 33.33) {
      setCurrentClass('red');
    } else if (progress < 66.66) {
      setCurrentClass('orange');
    } else {
      setCurrentClass('green');
    }
  }, [progress]);

  // Calculate sizes proportionally based on the size prop
  const innerSize = size - 10; // 5px border on each side
  const fontSize = Math.round(size / 3);
  const lineHeight = innerSize - 10; // Adjust line height for text centering

  const bubbleStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  const innerStyle = {
    width: `${innerSize}px`,
    height: `${innerSize}px`
  };

  const percentStyle = {
    lineHeight: `${lineHeight}px`,
    fontSize: `${fontSize}px`
  };

  return (
    <div className={currentClass}>
      <div className="progress" style={bubbleStyle}>
        <div className="inner" style={innerStyle}>
          <div className="percent" style={percentStyle}>
            <span>{Math.round(progress)}</span>%
          </div>
          <div className="water" style={{ top: `${100 - progress}%` }}></div>
          <div className="glare"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBubble;