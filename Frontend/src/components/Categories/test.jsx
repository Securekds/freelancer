import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import i18n from 'i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import './button.css';
import Lottie from 'lottie-react';
import animationData from '../../assets/images/small-logos/AnimationProg.json';
import ResponsiveallPro from '../Projectsfetch/ResponsiveallPro';
const Programming = () => {


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

  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  const getWidthText = () => {
    if (isSmallScreen) return '116%';
    if (isMediumScreen) return '82%';
    if (isLargeScreen) return '100%';
    return '70%';
  };

  const getFontSize = () => {
    if (isSmallScreen) return '18px';
    if (isMediumScreen) return '19px';
    if (isLargeScreen) return '25px';
    return '25px';
  };

  const getCharcterLeft = () => {
    if (isSmallScreen) return '-86%';
    if (isMediumScreen) return '-10%';
    if (isLargeScreen) return '0%';
    return '50%';
  };
  const getTopPosition = () => {
    if (isSmallScreen) return '-60px';
    if (isMediumScreen) return '-30px';
    if (isLargeScreen) return '-25px';
    return '60%';
  };

  const getPosTextLeft = () => {
    if (isSmallScreen) return '-91%';
    if (isMediumScreen) return '-1%';
    if (isLargeScreen) return '0%';
    return '50%';
  };


  const getPosTextTop = () => {
    if (isSmallScreen) return '20%';
    if (isMediumScreen) return '20px';
    if (isLargeScreen) return '110%';
    return '22%';
  };

  const getOffersWidth = () => {
    if (isSmallScreen) return '127%';
    if (isMediumScreen) return '82%';
    if (isLargeScreen) return '101%';
  };

  return (
    <div
      style={{
        position: 'relative',
        right: currentLanguage === 'ar' ? '543px' : 'unset',
      }}
    >
      <div className='Container'
        style={{
          width: '100%',
          maxWidth: '78%',
          height: 'auto',
          background: 'transparent',
          position: 'relative',
          left: '272px',
          top: '-280px',
          backgroundImage: `
          linear-gradient(
          to bottom,
          transparent 99%,
          #000 100%),
          linear-gradient(
          to right, 
          transparent 99%,
          #000 100%
          )`,
          backgroundSize: '100px 100px, 100px 100px',
          backgroundPosition: '0 0, 0 0',
          backgroundRepeat: 'repeat, repeat',
        }}
      >
        <div className='Stars'
          style={{
            position: 'absolute',
            top: '5px',
            left: '200px',
            opacity: '0.4'
          }}
        >
          <div className="night "
            style={{
              position: 'absolute',
              left: isSmallScreen ? '-140px' : '100px',
              height: '80px',
              width: '1px',
              zIndex: '0'
            }}>
            <div className="shooting_star"></div>
          </div>
          <div className="night "
            style={{
              position: 'absolute',
              left: isSmallScreen ? '-140px' : '400px',
              height: '80px',
              width: '1px'
            }}>
            <div className="shooting_star"></div>
          </div>
          <div className="night1 "
            style={{
              position: 'absolute',
              left: isSmallScreen ? '-10px' : '200px',
              height: '80px',
              width: '1px'
            }}>
            <div className="shooting_star1"></div>
          </div>
          <div className="night2 "
            style={{
              position: 'absolute',
              left: isSmallScreen ? '135px' : '700px',
              height: '80px',
              width: '1px'
            }}>
            <div className="shooting_star2"></div>
          </div>
          <div className="night3"
            style={{ position: 'absolute', left: '900px', height: '80px', width: '1px' }}>
            <div className="shooting_star3"></div>
          </div>
        </div>

        <div className='Text'
          style={{
            textAlign: 'center',
            width: getWidthText(),
            marginBottom: '10px',
            position: 'relative',
            marginRight: currentLanguage === 'ar' && isMediumScreen ? '-90px' :
              currentLanguage === 'ar' ? '35px' :
                'unset',
            top: getPosTextTop(),
            left: getPosTextLeft(),
          }}
        >
          <Typography
           
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              color: 'grey',
              fontWeight: 'bold',
              fontSize: getFontSize(),
              whiteSpace: 'normal', // Allow wrapping
            }}
          >
            {t('Discovering the brightest talents')} <span style={{ whiteSpace: 'nowrap' }}>{t('with our services')}</span>
          </Typography>
          <h1
            style={{
              fontFamily: currentLanguage === 'ar'
                ? '"Droid Arabic Kufi", serif'
                : '"Airbnbcereal", sans-serif',
              fontSize: getFontSize(),
              color: 'white',
              direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
              marginTop: '10px',
              position : 'relative',
            }}
          >
            {t('Unveiling top-notch projects and skilled')}
            <span className='Mytext'
              style={{
                background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'block',
                height: '100px',
                marginTop: '10px',
                whiteSpace: 'nowrap',
          
               
                
              }}
            >
              {t('freelancers With [Khadamat].')}
            </span>
          </h1>
        </div>
        <div className="Character"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: getTopPosition(),
            left: getCharcterLeft(),
            width: '100%',
            marginRight: currentLanguage === 'ar' && isMediumScreen ? '-80px' :
              currentLanguage === 'ar' ? '0px' :
                'unset',
            marginBottom: '30px',
          }}
        >
          <div className="light-effect"></div>
          <Lottie
            animationData={animationData}
            style={{ width: 300, height: 300, display: 'block', margin: '0 auto' }}
          />
        </div>

        <div className='Cat'
          style={{
            width: currentLanguage === 'ar' ? '100%' : getOffersWidth(),
            position: 'absolute',
            top: '400px',
            left: isMediumScreen ? '-10px' :
              isSmallScreen ? '-265px' :
                '-5px',

            zIndex: '0'

          }}
        >
          <ResponsiveallPro />
        </div>

      </div>
    </div>
  );
};

export default Programming;
