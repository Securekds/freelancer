import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';






function ChatAppNav() {
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

  const navigate = useNavigate(); // Initialize navigate hook


  const NavigateToProfile = () => {
    navigate("/userdashboard/profile");
  }

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

  
  return (

    <div className="ChatAppNav slide-from-left"

      style={{
        width: '96%',
        borderRadius: '16px',
        height: '110px',
        padding: '30px 25px 20px',
        marginTop:   '30px',
        display: 'flex',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1B2644',
        overflow: 'hidden',
        zIndex: '11',
        position: 'relative',


      }}
    >
    
      <div className="TYpo"
      style={{
        display : 'flex',
        flexDirection : 'column',
        gap : '5px',
      }}
      >
      <div className="BackToLogon slide-from-right"
        onClick={NavigateToProfile}
        style={{
       
          display: 'flex',
          gap: '6px',
          cursor: 'pointer',
        }}

      >
        { currentLanguage === 'ar'? (
          <>
        <ArrowForwardIcon
         sx={{ color: 'white',
          

          }} />
          </>
           ) : ( 
            <>
              <ArrowBackIcon
         sx={{ color: 'white',
          

          }} />
            </>
           )}        
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'white',
            fontSize: '15px',
          }}
        >
          {t('Back to profile')}
        </Typography>
      </div>
        <Typography
          sx={{
            color: "white",
            fontSize: currentLanguage === 'ar'? '16px' : '20px',
            fontWeight: '600',
            lineHeight: '1.2',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Plus Jakarta Sans", sans-serif',
            marginBottom: '4px'
          }}
        >
          {t('Chat app')}
        </Typography>
        <Typography
          sx={{
            color: "rgb(145, 158, 171)",
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Plus Jakarta Sans", sans-serif',
          }}
        >
          {t('Messenger')}
        </Typography>
      </div>
      <div
        className="Img"
        style={{
          position: 'absolute',
          right: currentLanguage === 'ar'? '80%' : '15px',
          top: '1px'
        }}
      >
        <img
          width={165}

          src="https://modernize-react-dark.netlify.app/assets/ChatBc-CQ5hWW4s.png"
          alt="Chat decoration"
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  )
}

export default ChatAppNav