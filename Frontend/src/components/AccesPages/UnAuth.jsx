import React, { useState, useRef, useEffect } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from '@mui/icons-material/Language';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import DrawIcon from '@mui/icons-material/Draw';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';
import { useNavigate } from 'react-router-dom';

const UnAuth = ({ selectedSubCategory, setSelectedSubCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);



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
    'App Development': {
      path: '/userdashboard/projects/categories/programming/mobileapp-development',
      displayKey: 'App-Dev'
    },
    'Web Development': {
      path: '/userdashboard/projects/categories/programming/web-development',
      displayKey: 'Web-Dev'
    },
    'Database Development': {
      path: '/userdashboard/projects/categories/programming/database-development',
      displayKey: 'Database-Dev'
    },
    'Software Engineering': {
      path: '/userdashboard/projects/categories/programming/software-engineering',
      displayKey: 'Software-Eng'
    },
    'Website Design': {
      path: '/userdashboard/projects/categories/programming/website-design',
      displayKey: 'Website-Design'
    },
    'CSS Design': {
      path: '/userdashboard/projects/categories/programming/css-design',
      displayKey: 'Css-Design'
    },
    'JavaScript (Scripting)': {
      path: '/userdashboard/projects/categories/programming/javascript-development',
      displayKey: 'Javascript-Dev'
    },
    'PHP Development': {
      path: '/userdashboard/projects/categories/programming/php-development',
      displayKey: 'Php-Dev'
    }
  };

  const getCurrentDisplayText = () => {
    const currentPath = location.pathname;
    const category = Object.values(subCategories).find(cat => cat.path === currentPath);
    return category ? t(category.displayKey) : t('Categories');
  };

  return (
    <div className="sticky-menu-container ">
      <div
        className="outer-button"
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
          <div className="App-Dev-Sec"
            onClick={() => handleSubCategorySelect('App Development', subCategories['App Development'].path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <PhoneAndroidIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('App Development')}
            </span>
          </div>

          <div className="Web-Dev-Sec"
            onClick={() => handleSubCategorySelect('Web Development', subCategories['Web Development'].path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <LanguageIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('Website Development')}
            </span>
          </div>

          <div className="Database-Dev-Sec"
            onClick={() => handleSubCategorySelect('Database Development', subCategories['Database Development'].path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <StorageIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              textWrap : 'nowrap',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('Database Development')}
            </span>
          </div>

          <div className="Software-Eng-Sec"
            onClick={() => handleSubCategorySelect('Software Engineering', subCategories['Software Engineering'].path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <TerminalIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('Software Engineering')}
            </span>
          </div>

          <div className="Website-Design-Sec"
            onClick={() => handleSubCategorySelect('Website Design', subCategories['Website Design'].path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <DrawIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('Website Design')}
            </span>
          </div>

          <div className="Css-Design-Sec"
            onClick={() => handleSubCategorySelect('CSS Design', subCategories['CSS Design'].path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <CssIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('CSS Design')}
            </span>
          </div>


          <div className="Javascript-Dev-Sec"
           onClick={() => handleSubCategorySelect('JavaScript (Scripting)', subCategories['JavaScript (Scripting)'].path)}
           style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            textDecoration: 'none',
            position: 'relative',
            top: '-10px',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
            <JavascriptIcon style={{ marginBottom: '0.5rem', fontSize: '35px', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              position: 'relative',
              top: '-10px',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('JavaScript (Scripting)')}
            </span>
          </div>

          <div className="Php-Dev-Sec"
          onClick={() => handleSubCategorySelect('PHP Development', subCategories['PHP Development'].path)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '150px',
            textDecoration: 'none',
            marginTop: '-30px',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
            <PhpIcon style={{ marginBottom: '0.5rem', fontSize: '2rem', color: 'white' }} />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}>
              {t('PHP Development')}
            </span>
          </div>


        </div>
      </div>
    </div>
  );
};

export default UnAuth;
