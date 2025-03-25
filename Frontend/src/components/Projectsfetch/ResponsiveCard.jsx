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

const ResponsiveCard = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
    if (isSmallScreen) return '105%';
    if (isMediumScreen) return '96%';
    if (isLargeScreen) return '100%';
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
              padding : currentLanguage === 'ar'? '10Px' : 'undefinied',
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

        <Box className='meteors-demo-container'
          sx={{
            width: getWidth(),
            height: 'auto',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'width 0.3s ease-in-out',
            marginTop: '0px', // Adding some space between the boxes
            position: 'relative', // Ensure the container is positioned relatively
            display: 'flex',
            flexDirection: 'column', // Align items in a column
            alignItems: 'center', // Center horizontally
            textAlign: 'center', // Center text content
          }}
        >
          <section className="meteors-demo-section">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </section>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative', // Ensure inner content respects its position
              zIndex: 1, // Ensure profile section is above the animated stars
            }}
          >
            <img
              src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
              alt="Background SVG"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.1,
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #ccc',
                marginBottom: '10px', // Space between image and username
              }}
            >
              <img
                src="https://res.cloudinary.com/damicjacf/image/upload/v1714236294/algeria_v1a5kp.png"
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                color: 'white',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: currentLanguage === 'ar'? '20px' : '5px'
                }}
              >
                <PersonIcon sx={{ color: 'white', marginBottom: '5px', marginLeft: '-18px' }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                 }}>
                  {t('Nabil Hamici')}
                </Typography>
              </div>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  marginBottom: '20px',
                  marginTop : '20px',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                }}
              >
                {t('[ Programming online store with React ]')}
              </Typography>

              <Typography
                sx={{
                  color: 'white',
                  width: '80%',
                  textAlign: 'center',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  marginBottom: '40px', // Adding space between text and divs
                }}
              >
                {t('Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.')}
              </Typography>

              {/* Four empty divs */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '15px',
                  width: '95%', // Adjusting width to match the container
                  marginBottom: '20px', // Adding space below the divs
                }}
              >
                <div className='First'
                  style={{
                    width: '100%',
                    height: '45px',
                    border: '1px solid white',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <AccountTreeIcon sx={{ color: 'white' }} />
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t('Project Status')}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      color: 'white',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    {t('Open')}
                  </Typography>
                </div>

                <div className='Second'
                  style={{
                    width: '100%',
                    height: '45px',
                    border: '1px solid white',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <UpdateIcon sx={{ color: 'white' }} />
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t('Post date')}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      color: 'white',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    {t('1 hour ago')}
                  </Typography>
                </div>

                <div className='Third'
                  style={{
                    width: '100%',
                    height: '45px',
                    border: '1px solid white',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <AttachMoneyIcon sx={{ color: 'white' }} />
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t('Budget')}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      color: 'white',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    50$ - 100$
                  </Typography>
                </div>

                <div className='Firth'
                  style={{
                    width: '100%',
                    height: '45px',
                    border: '1px solid white',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <SellIcon sx={{ color: 'white' }} />
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t('Offers')}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      color: 'white',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    {t('50')}
                  </Typography>
                </div>

              </Box>
            </Box>
          </Box>
        </Box>








      </Box>

    </>

  );
};

export default ResponsiveCard;
