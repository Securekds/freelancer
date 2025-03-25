// SnackbarContext.js
import React, { createContext, useState } from 'react';

export const SnackbarVerify = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(true); // Initially open

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarVerify.Provider value={{ isSnackbarOpen, closeSnackbar }}>
      {children}
    </SnackbarVerify.Provider>
  );
};
