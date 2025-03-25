import { border, height, positions } from '@mui/system';
import React, { createContext, useContext } from 'react';

// Creating the Container Context
const ContainerContext = createContext();

// This component provides the container styles to its children
export const ContainerProvider = ({ children }) => {
  const containerStyle = {
     
    border : '2px solid red',                // Full viewport height
    marginLeft: '259px',               // Space for the sidebar
    padding: '0 16px',                 // Padding inside the container
    width: 'calc(100% - 259px)',       // Adjust width based on the sidebar
    maxWidth: '1920px',                // Max width to 1920px
    boxSizing: 'border-box',           // Include padding and border in width/height
    display: 'flex',                   // Flexbox layout
    overflow: 'auto',    
    justifyContent: 'center',          // Center content horizontally
  };

  return (
    <ContainerContext.Provider value={containerStyle}>
      {children}
    </ContainerContext.Provider>
  );
};

// Custom hook to access container style
export const useContainerStyle = () => {
  return useContext(ContainerContext);
};
