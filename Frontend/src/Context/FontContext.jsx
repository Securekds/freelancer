import React, { createContext, useContext, useState } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children, currentLanguage }) => {
  const getFontFamily = (text) => {
    const isArabic = /[\u0600-\u06FF]/.test(text); // Check if text contains Arabic characters
    return isArabic
      ? '"Droid Arabic Kufi", serif'
      : '"Airbnbcereal", sans-serif';
  };

  return (
    <FontContext.Provider value={{ getFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
