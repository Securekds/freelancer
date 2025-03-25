import { Typography } from '@mui/material';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import i18n from 'i18next';

function WhyUs() {
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

<div className="Main" style={{ position: 'relative'
    , width: '100%', display: 'flex',
     justifyContent: 'center',
     height : 'auto',
   
      }}>

</div>


        </>
    );
}

export default WhyUs;