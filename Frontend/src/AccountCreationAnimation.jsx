import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Created from './assets/images/small-logos/Created.json';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const logoUrl = 'https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png';

const overlayVariants = {
  initial: { scaleY: 0, opacity: 1, transformOrigin: 'bottom' },
  enter: { scaleY: 1, opacity: 1, transformOrigin: 'bottom' },
  exit: { scaleY: 0, opacity: 1, transformOrigin: 'top' },
};

const AccountCreationAnimation = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('We are creating your account. This will take a few seconds.');
  const [redirectTimer, setRedirectTimer] = useState(9); // Set to 9 seconds
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Track closing animation

  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    if (isVisible) {
      // Simulate loading progress from 0% to 100%
      const interval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 10;
          if (newValue === 100) {
            setIsSuccess(true);
            setMessage('Account created successfully! Redirecting in 9 seconds...');

       
            setTimeout(() => {
              setIsClosing(true); 
              setTimeout(() => {
                navigate('/userdashboard/'); // Navigate to user dashboard
              }, 4000); // 1 second delay for closing animation
  
            }, 4000);
  

            clearInterval(interval);
          }
          return newValue > 100 ? 100 : newValue;
        });
      }, 500);

      // Countdown logic
      if (isClosing) {
        const countdown = setInterval(() => {
          setRedirectTimer(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              // Animation will close based on the exit state
            }
            return prev - 1;
          });
        }, 1000);
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [isVisible, progress, isClosing, navigate]);

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
            background: 'black', // Semi-transparent black background
            zIndex: 99999999,
            overflow: 'hidden',
            transformOrigin: 'bottom',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white', // Text color
          }}
        >
          {/* Logo */}
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              maxWidth: '200px', // Adjust size as needed
              maxHeight: '200px',
              zIndex: 100000000, // Ensure logo is above the overlay
              marginBottom: '20px',
            }}
          />
         {progress === 100 && (
        <Lottie
          animationData={Created}
          loop={false}
          style={{ width: 100, height: 100, marginBottom: '20px' }} // Adjust size as needed
        />
      )}

          {/* Loading bar */}
          <div
            style={{
              width: '80%', // Width of the loading bar
              height: '10px', // Height of the loading bar
              background: '#333', // Dark background for the bar
              borderRadius: '5px',
              marginBottom: '20px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: '#0072ff', // Blue color for the progress
                transition: 'width 0.5s ease-in-out', // Smooth transition for the progress
              }}
            />
          </div>

          {/* Dynamic message */}
          <p style={{ fontSize: '16px', textAlign: 'center', fontFamily: '"Airbnbcereal", sans-serif', color: 'white', fontWeight: 'bold' }}>
            {message}
          </p>
          {isSuccess && redirectTimer > 0 && (
            <p style={{ fontSize: '16px', textAlign: 'center' }}>
              Redirecting in {redirectTimer}...
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountCreationAnimation;
