import { Typography } from '@mui/material';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import i18n from 'i18next';

function Herocontent() {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        // Retrieve language from localStorage on component mount
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en'; // Default language is 'en' if no language is stored
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language); // Store selected language in localStorage
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch(error => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]); // Update  


    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px)');

    return (
        <>
            <div className="Main"
            style={{
                height :'auto',
            }}
            >
            <div className="Di"
                style={{
                    marginTop: '190px',
                    zIndex: '111',
                    position: 'relative', // Ensure the parent is relative for absolute positioning
                }}
            >
                {/* Welcome Box */}
                <div className="Welcome-box"
                    style={{
                        boxShadow: 'inset 0 -7px 11px rgba(125, 103, 221, 0.12)',
                        padding: '4px 13px 4px 8px',
                        width: 'max-content',
                        borderRadius: '32px',
                        border: '1px solid #a48fff1f',
                        backdropFilter: 'blur(6px)',
                        margin: 'auto',
                    }}
                >
                    <Typography
                        style={{
                            fontFamily:
                                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                                    "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                            fontSize: '18px',
                            textAlign: 'center',
                            background: `
                    linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
                    linear-gradient(90.01deg, #e59cff 0.01%, #ba9cff 50.01%, #9cb2ff 100%)
                `,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {t('Khadamat-Platform')}
                    </Typography>
                </div>

                {/* Main Heading */}
                <Typography
                    style={{
                        color: 'white',
                        fontSize: '50px',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontFamily:
                            currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                                "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                    }}
                >
                    {t('Freelance Without Limits.')}
                    <span
                        style={{
                            background: 'linear-gradient(to right, #a855f7, #06b6d4)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {t('Work, Earn, Succeed!')}
                    </span>
                </Typography>

                {/* Subheading */}
                <Typography
                    style={{
                        color: 'white',
                        fontSize: '25px',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontFamily:
                            currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                                "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                    }}
                >
                    <span
                        style={{
                            background: 'linear-gradient(180deg,#fff 0%,rgba(255,255,255,.7) 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {t('Whether you are a skilled professional or need one, Khadamat connects you with the right opportunities—seamlessly and securely.')}
                    </span>
                </Typography>
            </div>
            </div>
            <div className="BlackHole"
                style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {/* Black Hole Video */}
            

                {/* Dashboard Image */}
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(-1% + 200px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'min(1200px, 90vw)',
                        zIndex: 2,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.2))',
                        boxShadow: '0 0 25px rgba(138, 43, 226, 0.5), 0 0 15px rgba(75, 0, 130, 0.3)',
                    }}

                >
                    <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden' }}>

                        <img
                            src="/src/assets/images/small-logos/Dashboard.png"
                            alt="Dashboard"
                            style={{
                                width: '100%',
                                display: 'block',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.8) 100%)',
                                borderRadius: '14px',
                            }}
                        ></div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Herocontent;