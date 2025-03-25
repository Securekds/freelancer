import React, { useState, useEffect } from 'react';
import './FlipCountdown.css';

const DigitCard = ({ digit }) => (
  <div className="digit-card">
    {digit}
  </div>
);

const TimeSection = ({ label, digits }) => (
  <div className="time-section">
    <div className="section-label">{label}</div>
    <div className="digits-container">
      {digits.split('').map((digit, idx) => (
        <DigitCard key={idx} digit={digit} />
      ))}
    </div>
  </div>
);

const FlipCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '1',
    hours: '10',
    minutes: '54',
    seconds: '56'
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1); // ⬅️ Change from 320 days to 1 day
    targetDate.setHours(0, 0, 0, 0); // ⬅️ Reset time to midnight
  
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
  
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
  
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
  
      setTimeLeft({
        days: '0',  // ⬅️ No need for days since it's just 1 day
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);
  

  return (
    <div className="countdown-container">
      <div className="countdown-wrapper">
        <TimeSection label="Days" digits={timeLeft.days} />
        <TimeSection label="Hours" digits={timeLeft.hours} />
        <div className="colon">:</div>
        <TimeSection label="Minutes" digits={timeLeft.minutes} />
        <div className="colon">:</div>
        <TimeSection label="Seconds" digits={timeLeft.seconds} />
      </div>
    </div>
  );
};

export default FlipCountdown; 