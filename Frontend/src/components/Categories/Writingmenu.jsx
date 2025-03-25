import React, { useEffect, useState, useRef } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from '@mui/material/useMediaQuery';
import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ReportIcon from '@mui/icons-material/Report';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useNavigate } from 'react-router-dom';


const Writingmenu = ({setSelectedSubCategory}) => {
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
          'Content Writing': {
            path: '/userdashboard/projects/categories/writing/writing-content',
            displayKey: 'Content-Writing'
          },
          'Writing Articles': {
            path: '/userdashboard/projects/categories/writing/writing-articles',
            displayKey: 'Writing-Articles'
          },
          'Content Edit': {
            path: '/userdashboard/projects/categories/writing/content-editing',
            displayKey: 'Content-Edit'
          },
          'Writing Reports': {
            path: '/userdashboard/projects/categories/writing/writing-reports',
            displayKey: 'Writing-Reports'
          },
          'Research Scientific': {
            path: '/userdashboard/projects/categories/writing/research-scientific',
            displayKey: 'Research-Scientific'
          },
          'Writing Online': {
            path: '/userdashboard/projects/categories/writing/writing-online',
            displayKey: 'Writing-Online'
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
          <a
           onClick={() => handleSubCategorySelect('Content Writing', subCategories['Content Writing'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '180px',
              cursor: 'pointer',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              cursor : 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ContentPasteSearchIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Content writing')}
            </span>
          </a>

          {/* Second item */}
          <a
           onClick={() => handleSubCategorySelect('Writing Articles', subCategories['Writing Articles'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: currentLanguage === 'ar' ? '120px' : '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              background: 'transparent',
              transition: 'color 0.2s',
              border: 'none',
              borderBottom: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ArticleIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Writing Articles')}
            </span>
          </a>

          {/* Third item */}
          <a
            onClick={() => handleSubCategorySelect('Content Edit', subCategories['Content Edit'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '180px',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor  : 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <AutoFixHighIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Edit Content')}
            </span>
          </a>

          {/* Fourth item */}
          <a
           onClick={() => handleSubCategorySelect('Writing Reports', subCategories['Writing Reports'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: currentLanguage === 'ar' ? '120px' : '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              cursor: 'pointer',
              transition: 'color 0.2s',
              border: 'none',
              borderBottom: 'none',
              cursor : 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ReportIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Writing Reports')}
            </span>
          </a>

          {/* Fifth item */}
          <a
            onClick={() => handleSubCategorySelect('Research Scientific', subCategories['Research Scientific'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '180px',
              cursor: 'pointer',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor : 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ScienceIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Research Scientific')}
            </span>
          </a>

          {/* Sixth item */}
          <a
            onClick={() => handleSubCategorySelect('Writing Online', subCategories['Writing Online'].path)}

            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: currentLanguage === 'ar' ? '120px' : '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              cursor: 'pointer',
              transition: 'color 0.2s',
              border: 'none',
              borderBottom: 'none',
              cursor : 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <OnlinePredictionIcon style={{ marginBottom: '0.5rem', fontSize: '1.50rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Writing Online')}
            </span>
          </a>


        </div>
      </div>
    </div>
  );
};

export default Writingmenu;
