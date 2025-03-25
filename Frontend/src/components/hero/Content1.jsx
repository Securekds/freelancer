import { Typography } from '@mui/material';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import i18n from 'i18next';

function Content1() {
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

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');

    return (
        <>

            <div className="Di"
                style={{
                    marginTop: '190px',
                    zIndex: '1111'
                }}
            >
                <div className="Welcome-box"
                    style={{
                        boxShadow: 'inset 0 -7px 11pxrgba(125, 103, 221, 0.12)',
                        padding: '4px 13px 4px 8px',
                        width: 'max-content',
                        borderRadius: '32px',
                        border : '1px solid #a48fff1f',
                        backdropFilter: 'blur(6px)',
                        margin: 'auto',
                    }}


                >

                    <Typography
                        style={{
                            fontFamily: "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                            fontSize: '18px',
                            textAlign: 'center',
                            background: `
            linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.4)
            ),
            linear-gradient(90.01deg, #e59cff 0.01%, #ba9cff 50.01%, #9cb2ff 100%)
        `,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent', // Makes the text take the gradient
                        }}
                    >
                        Khadamat-Platform
                    </Typography>

                </div>
                <Typography
                    style={{
                        color: 'white',
                        fontSize: '50px',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontFamily: "AeonikPro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",
                    }}
                >
                    Freelance Without Limits.
                    <span
                        style={{
                            background: 'linear-gradient(to right, #a855f7, #06b6d4)', // Purple to Cyan
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Work, Earn, Succeed!
                    </span>
                </Typography>

                <Typography
                    style={{
                        color: 'white',
                        fontSize: '25px',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontFamily: "AeonikPro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",
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
                        Whether you're a skilled professional or need one, Khadamat connects you with the right opportunities—seamlessly and securely.
                    </span>
                </Typography>

            </div>
            <div className="div"
                style={{
                    marginTop: '-120px',
                }}
            >
                <video autoPlay muted loop style={{ width: "1200px", height: "auto" }}>
                    <source src="/src/assets/images/small-logos/blackhole.webm" type="video/webm" />
                </video>
            </div>
        </>
    );
}

export default Content1;