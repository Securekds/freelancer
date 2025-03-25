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
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import ForestIcon from '@mui/icons-material/Forest';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SourceIcon from '@mui/icons-material/Source';
import { FiChevronDown, FiHome, FiPieChart } from "react-icons/fi";



import { useNavigate } from 'react-router-dom';


const Consultingmenu = ({setSelectedSubCategory}) => {
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
          'Business Consulting': {
            path: '/userdashboard/projects/categories/consulting/business-consulting',
            displayKey: 'Business-Consulting'
          },
          'Financial Consulting': {
            path: '/userdashboard/projects/categories/consulting/financial-consulting',
            displayKey: 'Financial-Consulting'
          },
          'Marketing Consulting': {
            path: '/userdashboard/projects/categories/consulting/marketing-consulting',
            displayKey: 'Marketing-Consulting'
          },
          'IT Consulting': {
            path: '/userdashboard/projects/categories/consulting/it-consulting',
            displayKey: 'IT-Consulting'
          },
          'Human Resources Consulting': {
            path: '/userdashboard/projects/categories/consulting/human-resources-consulting',
            displayKey: 'Human-Resources-Consulting'
          },
          'Legal Consulting': {
            path: '/userdashboard/projects/categories/consulting/legal-consulting',
            displayKey: 'Legal-Consulting'
          },
          'Environmental Consulting': {
            path: '/userdashboard/projects/categories/consulting/environmental-consulting',
            displayKey: 'Environmental-Consulting'
          },
          'Health Consulting': {
            path: '/userdashboard/projects/categories/consulting/health-consulting',
            displayKey: 'Health-Consulting'
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
      label: 'Business Consulting', 
      icon: <BusinessCenterIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Business Consulting', subCategories['Business Consulting'].path),
      width: '180px' 
    },
    { 
      label: 'Financial Consulting', 
      icon: <PointOfSaleIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Financial Consulting', subCategories['Financial Consulting'].path),
      width: '170px', 
      adjustRight: true 
    },
    { 
      label: 'Marketing Consulting', 
      icon: <VisibilityIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Marketing Consulting', subCategories['Marketing Consulting'].path),
      width: '180px' 
    },
    { 
      label: 'IT Consulting', 
      icon: <DeviceHubIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('IT Consulting', subCategories['IT Consulting'].path),
      width: '170px', 
      adjustRight: true 
    },
    { 
      label: 'Human Resources Consulting', 
      icon: <SourceIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Human Resources Consulting', subCategories['Human Resources Consulting'].path),
      width: '180px' 
    },
    { 
      label: 'Legal Consulting', 
      icon: <LocalPoliceIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />, 
      onClick: () => handleSubCategorySelect('Legal Consulting', subCategories['Legal Consulting'].path),
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
        textAlign: 'center',
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

export default Consultingmenu;
