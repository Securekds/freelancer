import { curve, heroBackground, robot } from "../../assets";
import Button from "./Button";
import Section from "./Section";
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { BackgroundCircles, BottomLine, Gradient } from "../../components/design/Hero";
import { useRef  , useState , useEffect } from "react";

const Hero = () => {

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
    
  const parallaxRef = useRef(null);

  return (
    <Section
    className="pt-[12rem] -mt-[5.25rem]"
    crosses
    crossesOffset="lg:translate-y-[5.25rem]"
    customPaddings
    id="hero"
  >
    {/* Hero Background */}
    <div
      style={{
        position: 'absolute', // Local to the Hero section
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        zIndex: -1, // Behind Hero content
      }}
    >
      <img
        src={heroBackground}
        className="w-full h-full object-cover"
        style={{
          minWidth: "1440px",
          maxWidth: "none",
        }}
        width={1440}
        height={1800}
        alt="hero"
      />
    </div>

    {/* Hero Content */}
    <div className="container relative" ref={parallaxRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Text Content */}
      <div className="Di"
        style={{
          zIndex: '111',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '4rem',
        }}
      >
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

      {/* Image Container */}
      <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Robot Image */}
        <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
          <div className="relative bg-n-8 rounded-[1rem]">
            <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
            <div className="aspect-[55/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
              <img
                src='/src/assets/images/small-logos/Dashboard.png'
                className="w-full transform transition-all duration-300"
                style={{
                  transformOrigin: "center bottom",
                }}
                width={1024}
                height={490}
                alt="AI"
              />
            </div>
          </div>
          <Gradient />
        </div>
      </div>
    </div>

    <BottomLine />
  </Section>
  );
};

export default Hero;