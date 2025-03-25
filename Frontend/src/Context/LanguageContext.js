import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from './i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || i18n.language || 'en'; // Get from localStorage or default to 'en'
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage); // Change language when state updates
    localStorage.setItem('language', currentLanguage); // Persist language change
  }, [currentLanguage]);

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang); // Update the current language state
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
