import { Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Lottie from 'lottie-react';
import Created from '../../assets/images/small-logos/Created.json'
import DOMPurify from 'dompurify';

function AccountCreation() {

    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);


    const [progress, setProgress] = useState(0);
    const [countdown, setCountdown] = useState(6); // Countdown starting from 5 seconds
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showBackToLogin, setShowBackToLogin] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // Initialize with an empty string

useEffect(() => {
    setMessage(t('We are setting up your account. This step takes a few seconds...'));
}, [t, currentLanguage]); // Recalculate message when language changes

    useEffect(() => {
        // Start progress simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
    
                    // Show success animation and back to login option
                    setShowSuccessAnimation(true);
                    setShowBackToLogin(true);
    
                    // Start the countdown after progress reaches 100%
                    const countdownInterval = setInterval(() => {
                        setCountdown((prevCountdown) => {
                            if (prevCountdown <= 0) {
                                clearInterval(countdownInterval);
    
                                navigate('/auth/signin')
                            
                                return 0;
                            }
    
                            // Update the message with the countdown value
                            setMessage(
                                t(
                                    'Your account has been created successfully! You will be redirected to the Login page in {{count}} seconds...',
                                    { count: prevCountdown }
                                )
                            );
    
                            return prevCountdown - 1; // Decrease countdown
                        });
                    }, 1000); // Update countdown every second
    
                    return 100; // Ensure progress is set to 100%
                }
                return prev + 10; // Increment progress by 10%
            });
        }, 500); // Update progress every 500ms
    
        // Cleanup intervals on component unmount
        return () => clearInterval(interval);
    }, [navigate, t]);
    

    return (
        <div className="container"
            style={{
                width: '100%',
                height: '100vh',
                overflowX: 'hidden',
                overflowY: 'hidden',
                margin : '0',
                padding : '0',
            }}
        >

            <div className="LastStep"
                style={{
                    height: '100vh',
                    width: '100%',
                    background: '#0E0E10',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding : '10px',   
                }}
            >
                <img
                    src='https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png'
                    alt="Logo"
                    style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        zIndex: 100000000,
                    }}
                />
                {showSuccessAnimation && (
                    <Lottie
                        animationData={Created}
                        loop={false}
                        style={{ width: 100, height: 100, marginBottom: '-20px' }}
                    />
                )}

                {/* Progress Bar */}
                <div
                    style={{
                        width: '40%',
                        height: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '10px',
                        marginTop: '20px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            backgroundColor: 'cyan',
                            borderRadius: '10px',
                            transition: 'width 0.5s ease',
                        }}
                    />
                </div>
                <span style={{
                    color: 'white', marginTop: '20px', fontSize: '20px',
                    textAlign : 'center',
                    
                    fontFamily:  '"Airbnbcereal", sans-serif',
                }}>
                    {progress}%
                </span>

                {/* Progress Message */}
                <p style={{
                    color: 'white',
                    marginTop: '20px',
                    fontSize: '18px',
                    textAlign : 'center',
                    lineHeight : '30px',
                    fontWeight: 'bold',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                }}>
                    {message}
                </p>

                {showBackToLogin && (
                    <div
                        className="BackToLogon slide-from-right"
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            gap: '6px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/login')}
                    >
                        <ArrowBackIcon sx={{ color: 'white' }} />
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '15px',
                            }}
                        >
                            {t('Go to log in')}
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountCreation;
