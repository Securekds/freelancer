import React, { useState , useEffect } from 'react';
import { Typography, Button,  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import i18n from 'i18next';
import Tabss from './Tabss'; 



function CopyButton() {
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');
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


  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    console.log('Drawer closed');
  };


  


  return (
    <div>
    <div >
      <Button
        variant="outlined"
        onClick={handleDrawerOpen}
        sx={{color :'white',
        border : '1px solid white',
        ":hover": {
          border : '1px solid white'
        }
        

        }}
      >
        <Typography
        sx={{
          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

              fontWeight: 'bold',
              textTransform  : 'capitalize'
        }}
        >
          {t('Share')}
        </Typography>
      </Button>
    </div>
  
           
       
      <div className={`drawer-container ${openDrawer ? 'open' : ''}`}>
      
          <div className="drawer-content ">
            
           
          <div >
            <div className="blur-background" >
          
            </div>
            <Tabss handleDrawerClose={handleDrawerClose}  />
          

            
          

          </div>
          
          </div>
        
      </div>
  </div>
  );
}

export default CopyButton;