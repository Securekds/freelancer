import { loading } from "../assets";
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

const Generating = ({ className }) => {
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
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
      style={{border : '1px solid white'}}
    >
      <img className="w-5 h-5 mr-4" src={loading} alt="Loading" />

      
           <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'white',
                  fontSize : '15px',
                  fontWeight: '500',
                 
            }}
          >
             AI is generating
          </Typography>
    </div>
  );
};

export default Generating;
