import React, { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiHome, FiPieChart } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import CloseIcon from "@mui/icons-material/Close";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import useMediaQuery from '@mui/material/useMediaQuery';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { useNavigate } from 'react-router-dom';
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const Designmenu = ({setSelectedSubCategory , }) => {
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

  const GoToGraphicDesign = () => navigate('/userdashboard/projects/categories/design/graphic-design');
  const GoToPhotoshop = () => navigate('/userdashboard/projects/categories/design/photoshop');
  const GoToVideoProduction = () => navigate('/userdashboard/projects/categories/design/video-production');
  const GoToLogoDesign = () => navigate('/userdashboard/projects/categories/design/logo-design');
  const GoToVideoMontage = () => navigate('/userdashboard/projects/categories/design/video-montage');
  const GoToCreativeDesign = () => navigate('/userdashboard/projects/categories/design/creative-design');
  const GoToDesignIdea = () => navigate('/userdashboard/projects/categories/design/design-idea');
  const GoToVideoDesign = () => navigate('/userdashboard/projects/categories/design/video-design');

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
      'Graphic Design': {
        path: '/userdashboard/projects/categories/design/graphic-design',
        displayKey: 'Graphic-Design'
      },
      'Photoshop': {
        path: '/userdashboard/projects/categories/design/photoshop',
        displayKey: 'Photoshop'
      },
      'Video Production': {
        path: '/userdashboard/projects/categories/design/video-production',
        displayKey: 'Video-Production'
      },
      'Logo Design': {
        path: '/userdashboard/projects/categories/design/logo-design',
        displayKey: 'Logo-Design'
      },
      'Video Montage': {
        path: '/userdashboard/projects/categories/design/video-montage',
        displayKey: 'Video-Montage'
      },
      'Creative Design': {
        path: '/userdashboard/projects/categories/design/creative-design',
        displayKey: 'Creative-Design'
      },
      'Design Idea': {
        path: '/userdashboard/projects/categories/design/design-idea',
        displayKey: 'Design-Idea'
      },
      'Video Design': {
        path: '/userdashboard/projects/categories/design/video-design',
        displayKey: 'Video-Design'
      }
    };
  
    const getCurrentDisplayText = () => {
      const currentPath = location.pathname;
      const category = Object.values(subCategories).find(cat => cat.path === currentPath);
      return category ? t(category.displayKey) : t('Categories');
    };

  return (
    <div className="sticky-menu-container">
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
          <div  onClick={() => handleSubCategorySelect('Graphic Design', subCategories['Graphic Design'].path)}

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
            <AutoGraphIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Graphic Design')}
            </span>
          </div>

          <div onClick={GoToPhotoshop} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '150px',
            padding: '0.5rem 0',
            color: '#9ca3af',
            background: 'transparent',
            transition: 'color 0.2s',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <AutoAwesomeIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('PhotoShop')}
            </span>
          </div>

          <div onClick={GoToVideoProduction} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            textDecoration: 'none',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <VideoSettingsIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Video production')}
            </span>
          </div>

          <div onClick={GoToLogoDesign} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '150px',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <FlutterDashIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Logo Designing')}
            </span>
          </div>

          <div onClick={GoToVideoMontage} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            textDecoration: 'none',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <EmergencyRecordingIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Video montage')}
            </span>
          </div>

          <div onClick={GoToCreativeDesign} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '150px',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <EmojiObjectsIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Creative design')}
            </span>
          </div>

          <div onClick={GoToDesignIdea} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            textDecoration: 'none',
            padding: '0.5rem 0',
            color: '#9ca3af',
            transition: 'color 0.2s',
            cursor: 'pointer',
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
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Design idea')}
            </span>
          </div>

          <div onClick={GoToVideoDesign} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '150px',
            padding: '0.5rem 0',
            color: '#9ca3af',
            position: 'relative',
            top: '-2px',
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <OndemandVideoIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Video design')}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Designmenu;
