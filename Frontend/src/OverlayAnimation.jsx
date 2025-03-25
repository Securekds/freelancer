import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the logo URL
const logoUrl = 'https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png';

const overlayVariants = {
  initial: { scaleY: 0, opacity: 1, transformOrigin: 'bottom' },
  enter: { scaleY: 1, opacity: 1, transformOrigin: 'bottom' },
  exit: { scaleY: 0, opacity: 1, transformOrigin: 'top' },
};

const OverlayAnimation = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={overlayVariants}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'black', // Base background
            zIndex: 99999999,
            overflow: 'hidden',
            transformOrigin: 'bottom',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Gradient Fire Effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(29, 161, 242, 0.6), rgba(128, 0, 128, 0.8))',
              animation: 'fireEffect 3s infinite',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          {/* Logo */}
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              maxWidth: '200px',
              maxHeight: '200px',
              zIndex: 2, // Above the gradient
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayAnimation;
