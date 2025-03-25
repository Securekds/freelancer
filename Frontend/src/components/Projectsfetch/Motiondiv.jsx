import {  motion } from "framer-motion";
import React, { useEffect, useState, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';


function Motiondiv() {
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
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  
    useEffect(() => {
      i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]); // Update  

  return (
    <div>
     <motion.div className="Nabil"
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      style={{
        position: "absolute",
        right: isScreenUnder450px? '150px' : '400px',
        top: isScreenUnder450px? '-20px' : '140px',
        width: isScreenUnder450px? '22rem' : '40rem',
        padding: "1rem",
        height : '310px',
        zIndex: '10',
        borderRadius: '16px',
      }}
    >
      <div  style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: -1
      }} />
    
      <Bridge />
      <Nub selected={selected} />
    
      {TABS.map((t) => {
        return (
          <div  style={{ overflow: "hidden" }} key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                 
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
    </div>
  )
}
const Bridge = () => (
    <div 
      style={{ position: "absolute", top: "-24px", left: 0, right: 0, height: "24px" }}
    />
  );
  const Nub = ({ selected }) => {
    const [left, setLeft] = useState(0);
  
    useEffect(() => {
      moveNub();
    }, [selected]);
  
    const moveNub = () => {
      if (selected) {
        const hoveredTab = document.getElementById(`shift-tab-${selected}`);
        const overlayContent = document.getElementById("overlay-content");
  
        if (!hoveredTab || !overlayContent) return;
  
        const tabRect = hoveredTab.getBoundingClientRect();
        const { left: contentLeft } = overlayContent.getBoundingClientRect();
  
        const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;
  
        setLeft(tabCenter);
      }
    };
  
    return (
      <motion.span
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
          position: "absolute",
          top: 0,
          height: "1rem",
          width: "1rem",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
          borderRadius: "0.25rem 0 0 0",
          backgroundColor: "#1c1c1e",
        }}
        animate={{ left }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    );
  };
  

export default Motiondiv
