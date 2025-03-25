import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';


const GlowingBackground = ({ children }) => {

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const styles = {
    container: {
      position: 'absolute',
      width: '100%',
      display : isSmallScreen? 'none' : 'unset',
      height: '100%',
      background: '#111827',
      overflow: 'hidden'
    },
    gradient: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, transparent, #111827, #111827)'
    },
    blueGlow: {
      position: 'absolute',
      top: '20%',
      left: '1%',
      width: '600px',
      height: '600px',
      background: 'rgba(47, 186, 246, 0.12)', // Lighter blue
      borderRadius: '50%',
      filter: 'blur(140px)',
    },
    purpleGlow: {
      position: 'absolute',
      top: '20%',
      right: '5%',
      width: '600px',
      height: '600px',
      background: 'rgba(139, 92, 246, 0.12)', // Purple
      borderRadius: '50%',
      filter: 'blur(140px)',
    },
    deepBlueGlow: {
      position: 'absolute',
      bottom: '10%',
      left: '30%',
      width: '500px',
      height: '500px',
      background: 'rgba(30, 64, 175, 0.15)', // Deeper blue
      borderRadius: '50%',
      filter: 'blur(130px)',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      height: '100%'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.gradient}></div>
      <div style={styles.blueGlow}></div>
      <div style={styles.purpleGlow}></div>
      <div style={styles.deepBlueGlow}></div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default GlowingBackground;