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
import PublicIcon from '@mui/icons-material/Public';
import LanIcon from '@mui/icons-material/Lan';
import { useNavigate } from 'react-router-dom';


const Marketingmenu = ({setSelectedSubCategory}) => {
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
      'E Marketing': {
        path: '/userdashboard/projects/categories/marketing/e-marketing',
        displayKey: 'E-Marketing'
      },
      'Marketing Management': {
        path: '/userdashboard/projects/categories/marketing/marketing-managment',
        displayKey: 'Marketing-Management'
      },
      'Marketing Social': {
        path: '/userdashboard/projects/categories/marketing/marketing-social',
        displayKey: 'Marketing-Social'
      },
      'Marketing Plan': {
        path: '/userdashboard/projects/categories/marketing/marketing-plan',
        displayKey: 'Marketing-Plan'
      },
      'Marketing SEO': {
        path: '/userdashboard/projects/categories/marketing/marketing-seo',
        displayKey: 'Marketing-SEO'
      },
      'Marketing Internet': {
        path: '/userdashboard/projects/categories/marketing/marketing-internet',
        displayKey: 'Marketing-Internet'
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
          <a     onClick={() => handleSubCategorySelect('E Marketing', subCategories['E Marketing'].path)}

          
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
              cursor : 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <LanIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('E-Marketing')}
            </span>
          </a>

          {/* Second item */}
     <a   onClick={() => handleSubCategorySelect('Marketing Management', subCategories['Marketing Management'].path)}
         
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: '170px',
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
            <HowToRegIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Marketing Management')}
            </span>
          </a>

          {/* Third item */}
          <a   onClick={() => handleSubCategorySelect('Marketing Social', subCategories['Marketing Social'].path)}

           
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '160px',
              textDecoration: 'none',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor : 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ReduceCapacityIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Social marketing')}
            </span>
          </a>

          {/* Fourth item */}
          <a   onClick={() => handleSubCategorySelect('Marketing Plan', subCategories['Marketing Plan'].path)}

           
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: '170px',
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
            <AddRoadIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Marketing plan')}
            </span>
          </a>

          {/* Fifth item */}
                  <a   onClick={() => handleSubCategorySelect('Marketing SEO', subCategories['Marketing SEO'].path)}

          
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '160px',
              textDecoration: 'none',
              cursor : 'pointer',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <GoogleIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Seo marketing')}
            </span>
          </a>

          {/* Sixth item */}
          <a   onClick={() => handleSubCategorySelect('Marketing Internet', subCategories['Marketing Internet'].path)}

         
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: '170px',
              padding: '0.5rem 0',
              color: '#9ca3af',
              transition: 'color 0.2s',
              cursor : 'pointer',
              border: 'none',
              borderBottom: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <PublicIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Internet marketing')}
            </span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default Marketingmenu;
