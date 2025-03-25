import React, { useEffect, useState, useRef } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CloseIcon from "@mui/icons-material/Close";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import GoogleIcon from '@mui/icons-material/Google';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import RoofingIcon from '@mui/icons-material/Roofing';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PublicIcon from '@mui/icons-material/Public';
import LanIcon from '@mui/icons-material/Lan';
import { useNavigate } from 'react-router-dom';


const Architecturemenu = ({setSelectedSubCategory}) => {
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
        'Architecture Engineering': {
          path: '/userdashboard/projects/categories/architecture/architecture-engineering',
          displayKey: 'Architecture-Engineering'
        },
        'Architecture Interior': {
          path: '/userdashboard/projects/categories/architecture/architecture-interior',
          displayKey: 'Architecture-Interior'
        },
        'Architecture Design': {
          path: '/userdashboard/projects/categories/architecture/architecture-design',
          displayKey: 'Architecture-Design'
        },
        'Architecture Idea': {
          path: '/userdashboard/projects/categories/architecture/architecture-idea',
          displayKey: 'Architecture-Idea'
        },
        'Architecture 3D': {
          path: '/userdashboard/projects/categories/architecture/architecture-3d',
          displayKey: 'Architecture-3D'
        },
        'Architecture Plans': {
          path: '/userdashboard/projects/categories/architecture/architecture-plans',
          displayKey: 'Architecture-Plans'
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

      <div className={`inner-menu closed ${currentLanguage === 'ar' ? 'ar' : ''}`}
        ref={menuRef}>
        <div style={{
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem',
          borderTop: '2px solid #4b5563',
          paddingTop: '1rem',
        }}>
          <a     onClick={() => handleSubCategorySelect('Architecture Engineering', subCategories['Architecture Engineering'].path)}

        
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: isSmallScreen ? '120px' : '180px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              cursor: 'pointer',
              color: '#9ca3af',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <HolidayVillageIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
            {t('Architectural Engineering')}
            </span> 
          </a>

          {/* Second item */}
          <a
            onClick={() => handleSubCategorySelect('Architecture Interior', subCategories['Architecture Interior'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: isSmallScreen ? '140px' : '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              cursor: 'pointer',
              background: 'transparent',
              transition: 'color 0.2s',
              border: 'none',
              borderBottom: 'none',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <MeetingRoomIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
          {t('Architecture Interior')}
            </span>
          </a>

          {/* Third item */}
          <a
            onClick={() => handleSubCategorySelect('Architecture Design', subCategories['Architecture Design'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: isSmallScreen ? '120px' : '180px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              cursor : 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <RoofingIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                textWrap : 'nowrap',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
             {t('Architectural Design')}
            </span>
          </a>

          {/* Fourth item */}
          <a
           onClick={() => handleSubCategorySelect('Architecture Idea', subCategories['Architecture Idea'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              width: isSmallScreen ? '140px' : '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              border: 'none',
              cursor  : 'pointer',
              borderBottom: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <TipsAndUpdatesIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
            {t('Architecture Idea')}
            </span>
          </a>

          {/* Fifth item */}
          <a
            onClick={() => handleSubCategorySelect('Architecture 3D', subCategories['Architecture 3D'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: isSmallScreen ? '120px' : '180px',
              cursor: 'pointer',
              textDecoration: 'none',
              padding: '0.5rem 0',
              cursor : 'pointer',
              color: '#9ca3af',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ThreeDRotationIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('3D Architect')}
            </span>
          </a>

          {/* Sixth item */}
          <a
            onClick={() => handleSubCategorySelect('Architecture Plans', subCategories['Architecture Plans'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              justifyContent: 'center',
              textDecoration: 'none',
              width: isSmallScreen ? '140px' : '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              border: 'none',
              cursor : 'pointer',
              borderBottom: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <EditRoadIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
             
            {t('Architectural Plans')}
              
            </span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default Architecturemenu;
