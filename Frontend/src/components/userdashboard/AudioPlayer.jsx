import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useChat } from '../../Context/ChatContext.jsx';

const AudioPlayer = ({ audioUrl, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const { formatAudioTime } = useChat();
  
  // Get current language from your app state
  const currentLanguage = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // Update audio source when URL changes
    audio.src = audioUrl;
    audio.load();

    const updateTime = () => setCurrentTime(Math.floor(audio.currentTime));
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };

  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Play/Pause button */}
      <div
        onClick={togglePlay}
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          style={{
            fontSize: '12px',
            color: '#ffffff',
            transform: 'rotate(0deg)'
          }}
        />
      </div>

      {/* Waveform visualization with progress */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        height: '24px',
        flex: 1,
      }}>
        {Array(16).fill().map((_, i) => {
          const barHeight = 4 + Math.sin(i * 0.5) * 10 + Math.random() * 6;

          // Calculate if this bar should be highlighted based on progress
          const barPosition = (i / 16) * 100;
          const isActive = barPosition <= progress;

          return (
            <div
              key={i}
              style={{
                height: `${barHeight}px`,
                width: '2px',
                backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                borderRadius: '1px',
                transition: 'background-color 0.2s ease',
              }}
            />
          );
        })}
      </div>

      {/* Duration/Current time */}
      <span style={{
        fontSize: '12px',
        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        whiteSpace: 'nowrap',
      }}>
        {isPlaying ? formatAudioTime(currentTime) : formatAudioTime(duration || 0)}
      </span>
    </>
  );
};

export default AudioPlayer;