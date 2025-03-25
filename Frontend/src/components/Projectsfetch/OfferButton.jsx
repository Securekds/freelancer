import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import Offertabs from './Offertabs';
import i18n from 'i18next';
import { useUser } from '../../Context/UserContext.jsx'






function OfferButton({handleOpenOffer , gigOwnerId , handleOpenUserVerify}) {
  const { t } = useTranslation();
  console.log("OwnerId :" ,gigOwnerId )


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

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    console.log('handleDrawerClose function called');
    setOpenDrawer(false);

  };

  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');


   const { user} = useUser();



  return (
    <div>
    <div>
      <Button
        variant="outlined"
        onClick={() => user.isVerified ? handleOpenOffer(gigOwnerId) : handleOpenUserVerify()}

        sx={{
          color: 'white',
          border: '1px solid white',
          ":hover": {
            border: '1px solid white'
          }
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontSize: '13px',
            textWrap: 'nowrap',
          }}
        >
          {t('Add an offer')}
        </Typography>
      </Button>
    </div>
  
  
  </div>
  
  );
}

export default OfferButton;