import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import Lottie from 'lottie-react';
import i18n from 'i18next';

import { useTranslation } from 'react-i18next';
import EmailSuccess from '../../../assets/images/small-logos/EmailSuccess.json';

function EmailVerifyDone() {

    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n
            .changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);
    const [isScaling, setIsScaling] = useState(true); // Controls the scaling animation
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessMessage2, setShowSuccessMessage2] = useState(false);
    const [showSuccessMessage3, setShowSuccessMessage3] = useState(false);
    const [showSuccessMessage4, setShowSuccessMessage4] = useState(false);

    useEffect(() => {
        // Start scaling animation
        const scaleTimer = setTimeout(() => setIsScaling(false), 1200); // Scaling duration (adjust if needed)

        // Show messages sequentially after scaling is complete
        const messageTimers = [
            setTimeout(() => setShowSuccessMessage(true), 1400), // 200ms after scaling ends
            setTimeout(() => setShowSuccessMessage2(true), 1600),
            setTimeout(() => setShowSuccessMessage3(true), 1800),
            setTimeout(() => setShowSuccessMessage4(true), 2000),
        ];

        return () => {
            clearTimeout(scaleTimer);
            messageTimers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className='slide-from-right'
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Lottie Animation */}
            <div className="ProfileVerifiedLottie"
                
                style={{
                    width: isScaling ? 400 : 240, // Increased sizes
                    height: isScaling ? 400 : 240,
                    transition: 'all 1.2s ease', // Smooth transition
                    marginTop: '-40px',
                    marginBottom: '-40px',
                }}
            >
                <Lottie
                    animationData={EmailSuccess}
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            {/* Sequential Typography Messages */}
            {showSuccessMessage && (
                <div className="VerificationTypo"
                    style={{ animation: 'fadeIn 0.5s ease forwards' }}>
                    <Typography

                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            position: 'relative',
                        }}
                    >
                        {t('Your email has been successfully verified')}
                    </Typography>
                </div>
            )}

            {showSuccessMessage2 && (
                <div className="VerificationTypo" style={{ animation: 'fadeIn 0.5s ease forwards' }}>
                    <Typography

                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            opacity: '0.8',
                            textAlign: 'center',

                        }}
                    >
                        {t('Now, you can proceed to verify your ID. This ensures your account is secure and helps us maintain a safe and trustworthy platform for all users.')}
                    </Typography>
                </div>
            )}
            {showSuccessMessage3 && (
                <div
                    className="Button"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                >
                    <Button
                        className="btn-grad"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            height: '40px',
                            padding: '0 20px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: '14px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}
                        >
                            {t('Start ID Verification')}
                        </Typography>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default EmailVerifyDone;
