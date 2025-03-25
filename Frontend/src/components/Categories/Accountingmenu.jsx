import React, { useEffect, useState, useRef } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from '@mui/material/useMediaQuery';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useNavigate } from 'react-router-dom';


const Accountingmenu = ({setSelectedSubCategory}) => {
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
          'Financial Accounting': {
            path: '/userdashboard/projects/categories/accounting/financial-accounting',
            displayKey: 'Financial-Accounting'
          },
          'Financial Evaluation': {
            path: '/userdashboard/projects/categories/accounting/financial-evaluation',
            displayKey: 'Financial-Evaluation'
          },
          'Financial Analysis': {
            path: '/userdashboard/projects/categories/accounting/financial-analysis',
            displayKey: 'Financial-Analysis'
          },
          'Financial Management': {
            path: '/userdashboard/projects/categories/accounting/financial-management',
            displayKey: 'Financial-Management'
          },
          'Tax Strategy': {
            path: '/userdashboard/projects/categories/accounting/tax-strategy',
            displayKey: 'Tax-Strategy'
          },
          'Administrative Reports': {
            path: '/userdashboard/projects/categories/accounting/administrative-reports',
            displayKey: 'Administrative-Reports'
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
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '1rem',
      borderTop: '2px solid #4b5563',
      paddingTop: '1rem',
      justifyContent: 'center',
    }}
  >
    {[
   { icon: LocalAtmIcon, label: 'Financial Accounting', onClick: () => handleSubCategorySelect('Financial Accounting', subCategories['Financial Accounting'].path) },
   { icon: CurrencyExchangeIcon, label: 'Financial Evaluation', onClick: () => handleSubCategorySelect('Financial Evaluation', subCategories['Financial Evaluation'].path) },
   { icon: InsightsIcon, label: 'Financial Analysis', onClick: () => handleSubCategorySelect('Financial Analysis', subCategories['Financial Analysis'].path) },
   { icon: ManageAccountsIcon, label: 'Financial Management', onClick: () => handleSubCategorySelect('Financial Management', subCategories['Financial Management'].path) },
   { icon: ChromeReaderModeIcon, label: 'Tax Strategy', onClick: () => handleSubCategorySelect('Tax Strategy', subCategories['Tax Strategy'].path) },
   { icon: LocalAtmIcon, label: 'Administrative Reports', onClick: () => handleSubCategorySelect('Administrative Reports', subCategories['Administrative Reports'].path) }
    ].map(({ icon: Icon, label, onClick }, idx) => (
      <a
        key={idx}
        onClick={onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          padding: '0.5rem 0',
          color: '#9ca3af',
          transition: 'color 0.2s, transform 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Icon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
          }}
        >
          {t(label)}
        </span>
      </a>
    ))}
  </div>
</div>

    </div>
  );
};

export default Accountingmenu;
