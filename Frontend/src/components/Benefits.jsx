import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { useState, useEffect } from 'react';


const Benefits = () => {
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


  return (
    <Section id="features">
      <div className="container relative z-2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',

          transform: 'translateY(-30px)', // Move the container up by 20px

        }}
      >

        <div className="TYpo"
          style={{
            transform: 'translateY(-30px)', // Move the container up by 20px
          }}
        >
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
            {t('Why Choose')}
            <span
              style={{
                background: 'linear-gradient(to right, #a855f7, #06b6d4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                marginLeft: '5px',
              }}
            >
              {t('Khadamat Platform?')}
            </span>
          </Typography>
        </div>
        <div className="flex flex-wrap justify-center items-center  gap-5 "
          style={{

          }}
        >
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[20rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
               
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <Typography
                  style={{
                    color: 'white',
                    fontSize: '24px',
                    textAlign: 'center',
                    fontWeight: '500',
                    textWrap : 'nowrap',
                    fontFamily:
                      currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                        "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  }}
                >
                  {t(item.title)}
                </Typography>

                <Typography
                  className="body-2 mb-6" // Add the same class as the <p> element
                  style={{
                    color: 'grey', // Use the same color as text-n-3
                    fontSize: '16px', // Adjust the font size as needed
                    fontFamily:
                      currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                        "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  }}
                >
                  {t(item.text)}
                </Typography>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8 "
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
