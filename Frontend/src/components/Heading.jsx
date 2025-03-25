import TagLine from "./Tagline";
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const Heading = ({ className, title, text, tag }) => {
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
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && 
      
       <Typography
          className="body-2 mb-6" // Add the same class as the <p> element
          style={{
            background: 'linear-gradient(to right, #a855f7, #06b6d4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: '25px', // Adjust the font size as needed
            fontWeight : 'bold',
            fontFamily:
              currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
          }}
        >
          {t(title)}
        </Typography>
      }
      {text && <p className="body-2 mt-4 text-n-4">
        <Typography
          className="body-2 mb-6" // Add the same class as the <p> element
          style={{
            color: 'grey', // Use the same color as text-n-3
            fontSize: '17px', // Adjust the font size as needed
            fontWeight : 'bold',
            fontFamily:
              currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
          }}
        >
          {t(text)}
        </Typography>
        </p>}
    </div>
  );
};

export default Heading;
