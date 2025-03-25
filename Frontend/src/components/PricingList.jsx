import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PricingList = () => {
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
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item) => (
     <div
     key={item.id}
     className="flex-grow flex-1 bg-n-8 rounded-[2rem] py-10 px-6"
     style={{ border: '1px solid white' }}
   >
          <h4 className="h4 mb-4">
            <Typography
              style={{
                fontFamily:
                  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                    "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                background: 'linear-gradient(to right, #a855f7, #06b6d4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: '29px',
                fontWeight: '500',
              }}
            >
              {t(item.title)}
            </Typography>
          </h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            <Typography
              style={{
                fontFamily:
                  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                    "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                color: 'grey',
                fontSize: '17px',
                fontWeight: '500',
              }}
            >
              {t(item.description)}
            </Typography>
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            {item.price && (
              <>
                <div className="text-[5.5rem] leading-none font-bold">
                  <Typography
                    style={{
                      fontFamily:
                        currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                          "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                      color: 'white',
                      fontSize: '50px',
                      fontWeight: 'bold',
                    }}
                  >
                    {t(item.price)} $ / {t('Month')}
                  </Typography>
                </div>
              </>
            )}
          </div>

          <Button
            className="w-full mb-6"
            href={item.price ? "/pricing" : "mailto:contact@jsmastery.pro"}
            white={!!item.price}
          >
           {item.price ? t("Get started") : "Contact us"}

          </Button>

          <ul>
            {item.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start py-5 border-t border-n-6"
                style={{ display: 'flex', alignItems: 'center', gap : '5px'}}
              >
                <img src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">
                  <Typography
                    style={{
                      fontFamily:
                        currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                          "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      maxWidth : '100%',
                      
                    }}
                  >
                    {t(feature)}
                  </Typography>
                </p>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;