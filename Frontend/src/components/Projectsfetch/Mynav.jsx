import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import PersonIcon from '@mui/icons-material/Person';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Typography } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';

import CopyButton from "./CopyButton";

const Mynav = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');

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

  const getWidth = () => {
    if (isSmallScreen) return '70%';
    if (isMediumScreen) return '97%';
    if (isLargeScreen) return '98%';
    return '90%';
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 'auto',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '5px',
            width: getWidth(),
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          <Box
            sx={{
              fontSize: '16px',
              color: 'white',
              fontWeight : 'bold',
              marginLeft : '10px',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}
          >
            {t('Project Card')}
          </Box>
          <Box
            sx={{
              padding: '5px 10px',
              fontSize: '14px',
            }}
          >
            <CopyButton />
          </Box>
        </Box>

        








      </Box>

    </>

  );
};

export default Mynav;
