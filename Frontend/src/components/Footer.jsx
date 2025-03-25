import React from "react";
import Section from "./Section";
import { socials } from "../constants";
import { background } from "../assets";
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@mui/material';
import i18n from 'i18next';


const Footer = () => {

  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Retrieve language from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en'; // Default language is 'en' if no language is stored
  });
  const [reloadCount, setReloadCount] = useState(0);

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language); // Store selected language in localStorage
    setCurrentLanguage(language);
    setReloadCount(prevCount => prevCount + 1); // Increment reload counter
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (!storedLanguage) {
      setCurrentLanguage('ar');
      localStorage.setItem('language', 'ar');
    } else {
      setCurrentLanguage(storedLanguage);
    }

    if (reloadCount === 1) {
      window.location.reload(); // Reload the page on the first reload
    } else if (reloadCount === 2) {
      setReloadCount(0); // Reset reload counter after the second reload
    }
  }, [reloadCount]); // Trigger effect when reloadCount changes
  return (
    <Section className="relative !px-0 !py-0 overflow-hidden">
      {/* Black hole video positioned for optimal visibility */}
      <div className="w-full h-[220px] relative overflow-hidden">
  <video
    autoPlay
    muted
    loop
    className="w-full object-cover absolute"
    style={{
      top: "100%",  // Center vertically
      left: "50%", // Center horizontally
      transform: "translate(-50%, -50%)", // Ensure it's truly centered
      minWidth: "100%", // Cover the container width
      minHeight: "100%" // Cover the container height
    }}
  >
    <source src="/src/assets/images/small-logos/blackhole.webm" type="video/webm" />
  </video>
</div>

      <div
        style={{
          background: '#09090d',
          borderTop: '1px solid #2a2a36',
          height: '700px',
          paddingTop: '16px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className='Footer'
          style={{
            width: '90%',
            margin: '0 auto',
            padding: '10px 12px',
          }}
        >

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '90%',
              gap: '32px',
              marginBottom: '16px',
              alignItems: 'start',
            }}
          >

            <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    marginRight: '12px',
                    background: 'linear-gradient(135deg, #9c70ff 0%, #5c34e9 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img width={50} src="/src/assets/images/small-logos/Mylogo.png" alt="MyLogo" />
                </div>
                <Typography
                  style={{
                    fontFamily: 'AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                    fontSize: '18px',
                    textAlign: 'center',
                    marginRight : currentLanguage === 'ar'? '5px' : 'unset',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {t('Khadamat')}
                </Typography>
              </div>
            </div>


            {['Projects'].map((sectionTitle) => (
              <div
                key={sectionTitle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <Typography
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily:
                    currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                      "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                    fontSize: '16px',
                  }}
                >
                  {t(sectionTitle)}
                </Typography>

                <ul style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' }}>
                  {['Programming', 'Design', 'Marketing', 'Architecture', 'Writing & Translation', 'Finance & Accounting', 'Customer Support', 'Consulting & Advice'].map((item) => (
                    <li key={item}>
                      <Typography style={{
                        color: 'grey',
                        fontSize: '14px',
                        fontFamily:
                        currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                          "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                        fontWeight: 'bold',
                        cursor: 'pointer',

                      }}>{t(item)}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {['instructions'].map((sectionTitle) => (
              <div
                key={sectionTitle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <Typography
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily:
                    currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                      "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                    fontSize: '16px',
                  }}
                >
                  {t(sectionTitle)}
                </Typography>

                <ul style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' }}>
                  {['getting-started', 'how-to-post', 'how-to-apply', 'withdraw-earnings', 'payment-guide', 'profile-setup', 'verify-account', 'terms'].map((item) => (
                    <li key={item}>
                      <Typography style={{
                        color: 'grey',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily:
                        currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                          "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                        cursor: 'pointer',

                      }}>{t(item)}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {['Resources'].map((sectionTitle) => (
              <div
                key={sectionTitle}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <Typography
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily:
                    currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                      "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                    fontSize: '16px',
                  }}
                >
                  {t(sectionTitle)}
                </Typography>

                <ul style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' }}>
                  {['Documentation', 'Contact us',].map((item) => (
                    <li key={item}>
                      <Typography style={{
                        color: 'grey',
                        fontSize: '14px',
                        fontFamily:
                        currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                          "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                        fontWeight: 'bold',

                      }}>{t(item)}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          <div className="Div"
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            <Box className="language-box " sx={{
              display: 'flex',
              alignItems: 'center',

            }}>
              <img onClick={() => toggleLanguage('ar')} style={{ width: '30px', marginRight: '3px' }} src="/dist/images/algeria.png" alt="logo" />


            </Box>
            <Box className="language-box  " sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '8px',

            }}>
              <img onClick={() => toggleLanguage('fr')} style={{ width: '30px', }} src="/dist/images/french.png" alt="logo" />

            </Box>
            <Box className="language-box  " sx={{
              marginTop: '10px',

            }}>
              <img onClick={() => toggleLanguage('en')} style={{ width: '45px', }} src="/dist/images/usa.png" alt="logo" />

            </Box>


          </div>
        </div>
      </div>

    </Section>
  );
};

export default Footer;
