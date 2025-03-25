import React, { useState, useEffect } from 'react';

const LoadingOverlay = ({ isVisible, onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (isVisible && count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (count === 0) {
      onComplete();
    }
  }, [count, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="overlay-background"></div>
      <div className="loading-content">
        <div className="spinner"></div>
        <div className="loading-text">Signing out...</div>
        <div className="countdown">{count}</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;