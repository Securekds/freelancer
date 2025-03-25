import React, { useEffect, useState, useRef } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from '@mui/material/useMediaQuery';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import BiotechIcon from '@mui/icons-material/Biotech';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Diversity3Icon from '@mui/icons-material/Diversity3';


import { useNavigate } from 'react-router-dom';


const Supportmenu = ({setSelectedSubCategory}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');


  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const itemTextsRef = useRef([]);

  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleButtonClick = () => {
    if (isAnimating) return;

    const menu = menuRef.current;

    setIsAnimating(true); // Lock animations
    menu.classList.toggle("closed");

    if (isOpen) {
      menuItemsRef.current.forEach((item) => item.classList.add("text-hides"));
      itemTextsRef.current.forEach((text) =>
        setTimeout(() => text.classList.remove("text-in"), 150)
      );
    } else {
      menuItemsRef.current.forEach((item) => item.classList.remove("text-hides"));
      itemTextsRef.current.forEach((text, index) =>
        setTimeout(() => text.classList.add("text-in"), index * 150)
      );
    }

    setTimeout(() => setIsAnimating(false), 300); // Unlock animations
    setIsOpen((prev) => !prev);
  };

  const handleAnimationEnd = () => setIsAnimating(false);

  const navigate = useNavigate();



      useEffect(() => {
          const currentCategory = Object.keys(subCategories).find(
            key => subCategories[key].path === location.pathname
          );
          if (currentCategory) {
            setSelectedSubCategory(currentCategory);
          }
        }, [location.pathname]); // Runs whenever the URL changes
      
        const handleSubCategorySelect = (subCategory, path) => {
          setSelectedSubCategory(subCategory);
          navigate(path);
        };
      
        const subCategories = {
          'Customer Service': {
            path: '/userdashboard/projects/categories/support/customer-service',
            displayKey: 'Customer-Service'
          },
          'Desk Support': {
            path: '/userdashboard/projects/categories/support/desk-support',
            displayKey: 'Desk-Support'
          },
          'Live Chat Support': {
            path: '/userdashboard/projects/categories/support/live-chat-support',
            displayKey: 'Live-Chat-Support'
          },
          'Email Support': {
            path: '/userdashboard/projects/categories/support/email-support',
            displayKey: 'Email-Support'
          },
          'Technical Support': {
            path: '/userdashboard/projects/categories/support/technical-support',
            displayKey: 'Technical-Support'
          },
          'Social Media Support': {
            path: '/userdashboard/projects/categories/support/social-media-support',
            displayKey: 'Social-Media-Support'
          }
        };
        
        
      
        const getCurrentDisplayText = () => {
          const currentPath = location.pathname;
          const category = Object.values(subCategories).find(cat => cat.path === currentPath);
          return category ? t(category.displayKey) : t('Categories');
        };


  return (
    <div className="sticky-menu-container">
      <div className="outer-button"
        style={{
          zIndex: 4444,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          borderRadius: "9999px",
          padding: "0.375rem 0.75rem",
          fontSize: "0.875rem",
          transition: "color 0.2s",
          marginRight: '20px',
          border: "1px white solid",
          background: "transparent",


        }}
        ref={buttonRef}
        onClick={handleButtonClick}
        onAnimationEnd={handleAnimationEnd}
      >
        {isOpen ? (
          <>
            <CloseIcon className="slide-from-right" sx={{ color: "white", transition: "transform 0.3s ease" }} />
          </>
        ) : (
          <>
            <Typography
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "white",
                whiteSpace: "nowrap",
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily:
                  currentLanguage === "ar"
                    ? '"Droid Arabic Kufi", serif'
                    : '"Airbnbcereal", sans-serif',
              }}
            >
            {getCurrentDisplayText()}
            </Typography>
            <KeyboardArrowDownSharpIcon sx={{ color: "white", transition: "transform 0.3s ease" }} />
          </>
        )}
      </div>

      <div
        className={`inner-menu closed ${currentLanguage === 'ar' ? 'ar' : ''}`}
        ref={menuRef}
      >
        <div
          style={{
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
            zIndex: -1,
          }}
        />
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', borderTop: '1px solid #4b5563' }}>
  {[
    { 
      label: 'Customer Service', 
      icon: <MiscellaneousServicesIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Customer Service', subCategories['Customer Service'].path), 
      width: '180px' 
    },
    { 
      label: 'Technical Support', 
      icon: <BiotechIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Technical Support', subCategories['Technical Support'].path), 

      width: '170px', 
      adjustRight: true 
    },
    { 
      label: 'Desk Support', 
      icon: <DisplaySettingsIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Desk Support', subCategories['Desk Support'].path), 
      width: '180px' 
    },
    { 
      label: 'Social Media Support', 
      icon: <Diversity3Icon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Social Media Support', subCategories['Social Media Support'].path), 
      width: '170px', 
      adjustRight: true 
    },
    { 
      label: 'Live Chat Support', 
      icon: <FeedbackIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Live Chat Support', subCategories['Live Chat Support'].path), 
      width: '180px' 
    },
    { 
      label: 'Email Support', 
      icon: <MarkEmailUnreadIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Email Support', subCategories['Email Support'].path), 

      width: '170px', 
      adjustRight: true 
    },
  ].map(({ label, icon, onClick, width, adjustRight }, index) => (
    <a
      key={index}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        textAlign : 'center',
        padding: '0.5rem 0',
        color: '#9ca3af',
        transition: 'color 0.2s',
        cursor: 'pointer',
        
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {icon}
      <p
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white',
          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        }}
      >
        {t(label)}
      </p>
    </a>
  ))}
</div>

      </div>

    </div>
  );
};

export default Supportmenu;
