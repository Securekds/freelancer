import React, { useEffect, useState } from "react";
import { FiBarChart2, FiChevronDown, FiHome, FiPieChart } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import DrawIcon from '@mui/icons-material/Draw';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { width } from "@mui/system";



export const ShiftingDropDown = () => {

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

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]); // Update  

  const navigate = useNavigate();


  const TABS = [
    {
      title: (
        <Typography
          style={{
            fontSize: '1rem',
            fontWeight: '500',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
          }}
        >
          {location.pathname === '/userdashboard/projects/categories/programming/web-development' ? t('Web Development') :
            location.pathname === '/userdashboard/projects/categories/programming/mobileapp-development' ? t('App Development') :
              location.pathname === '/userdashboard/projects/categories/programming/database-development' ? t('Database-Dev') :
                location.pathname === '/userdashboard/projects/categories/programming/software-engineering' ? t('Software Engineering') :
                  location.pathname === '/userdashboard/projects/categories/programming/website-design' ? t('Website Design') :
                    location.pathname === '/userdashboard/projects/categories/programming/css-design' ? t('Css Design') :
                      location.pathname === '/userdashboard/projects/categories/programming/javascript-development' ? t('Javascript Dev') :
                        location.pathname === '/userdashboard/projects/categories/programming/php-development' ? t('Php Development') :
                          t('Categories')}
        </Typography>
      ),
      Component: Pricing,
    },
  ].map((n, idx) => ({ ...n, id: idx + 1 }));

  return (
    <div 
      style={{
        display: "flex",
        height: "24rem",
        width: "100%",
        justifyContent: "start",
        padding: "2rem",
        color: "white",
        
      }}
      className="md:justify-center"
    >
      <Tabs TABS={TABS} />
    </div>
  );
};

const Tabs = ({ TABS }) => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      style={{ position: "relative", display: "flex", height: "fit-content", gap: "0.5rem" }}
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} TABS={TABS} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        borderRadius: "9999px",
        padding: "0.375rem 0.75rem",
        fontSize: "0.875rem",
        transition: "color 0.2s",
        border: '1px white solid',
        background: 'transparent',

        color: selected === tab ? "#f5f5f5" : "#9ca3af",
      }}
    >
      <span>{children}</span>
      <FiChevronDown
        style={{
          transition: "transform 0.2s",
          transform: selected === tab ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </button>
  );
};

const Content = ({ selected, dir, TABS }) => {
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

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');
  const getMenuRight = () => {

    if (isSmallScreen) return '-28%';
    if (isMediumScreen) return '-1%';
    if (isLargeScreen) return '5%';
    return '22%';
  };
  const getArrowLeft = () => {
    if (isSmallScreen) return '72%';
    if (isMediumScreen) return '90%';
    if (isLargeScreen) return '90%';
    return '22%';
  };
    
  const color = 'black';
  const width = '100px';
  const height = '50px';



  return (
    <motion.div
      className="Nabil"
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
        width: "90vw",
        maxWidth: "400px",
        height: "auto",
        minWidth: "300px",
        top: "calc(100% + 40px)",
        right: isSmallScreen ? "-29%" : "5%",
        padding: "1rem",
        zIndex: "10",
        borderRadius: "16px",
   
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "16px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: -1,
        }}
      />

      {/* Snake Line implementation (replace the old line) */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-3%",
          transform: "translateY(50%)",
          rotate : '100deg',
          width: "40px",
          display: isSmallScreen ? "none" : "normal",
          height: "200px",
          zIndex: "5",
      
        }}
      >
        {/* New Snake-like Line */}
        <svg
          viewBox="0 0 200 50"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            transform: "rotate(180deg)",
            zIndex: "5",  
            
          }}
        >
          <path
            fill="transparent"
            stroke="white"
            strokeWidth="10"
            d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10"
          />
        </svg>
      </div>

      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div style={{ overflow: "hidden" }} key={t.id}>
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
  );
};

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

const Pricing = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  const categories = [
    { path: '/userdashboard/projects/categories/programming/web-development', label: 'Web Development' },
    { path: '/userdashboard/projects/categories/programming/mobileapp-development', label: 'App Development' },
    { path: '/userdashboard/projects/categories/programming/database-development', label: 'Database Development' },
    { path: '/userdashboard/projects/categories/programming/software-engineering', label: 'Software Engineering' },
    { path: '/userdashboard/projects/categories/programming/website-design', label: 'Website Design' },
    { path: '/userdashboard/projects/categories/programming/css-design', label: 'CSS Design' },
    { path: '/userdashboard/projects/categories/programming/javascript-development', label: 'JavaScript Development' },
    { path: '/userdashboard/projects/categories/programming/php-development', label: 'PHP Development' },
  ];
  

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);
  const navigate = useNavigate();

  const GoToAppDev = () => {
    navigate('/userdashboard/projects/categories/programming/mobileapp-development');
  };

  const GoToWebDev = () => {
    navigate('/userdashboard/projects/categories/programming/web-development');
  };

  const GoToDatabaseDev = () => {
    navigate('/userdashboard/projects/categories/programming/database-development');
  };

  const GoToSoftwareEngineering = () => {
    navigate('/userdashboard/projects/categories/programming/software-engineering');
  };

  const GoToWebsiteDesign = () => {
    navigate('/userdashboard/projects/categories/programming/website-design');
  };

  const GoToCssDesign = () => {
    navigate('/userdashboard/projects/categories/programming/css-design');
  };

  const GoToJavascriptDev = () => {
    navigate('/userdashboard/projects/categories/programming/javascript-development');
  };

  const GoToPhpDev = () => {
    navigate('/userdashboard/projects/categories/programming/php-development');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', borderTop: '2px solid #4b5563' }}>
      <div className="App-Dev-Sec" onClick={GoToAppDev} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
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

      <div className="Web-Dev-Sec" onClick={GoToWebDev} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '150px',
        textDecoration: 'none',
        padding: '0.5rem 0',
        color: '#9ca3af',
        background: 'transparent',
        transition: 'color 0.2s',
        cursor: 'pointer',
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
        <LanguageIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
        <span style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white',
          textWrap: 'nowrap',
          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        }}>
          {t('Website Development')}
        </span>
      </div>

      <div className="Database-Dev-Sec" onClick={GoToDatabaseDev} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
        <StorageIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
        <span style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white',
          position: 'relative',
          left: currentLanguage === 'fr' ? '20px' : 'undefined',
          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        }}>
          {t('Database Development')}
        </span>
      </div>

      <div className="Software-Eng-Sec" onClick={GoToSoftwareEngineering} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
        <TerminalIcon style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'white' }} />
        <span style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white',
          textWrap: 'nowrap',
          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        }}>
          {t('Software Engineering')}
        </span>
      </div>

      <div className="Website-Design-Sec" onClick={GoToWebsiteDesign} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
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

      <div className="Css-Design-Sec" onClick={GoToCssDesign} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
        <CssIcon style={{ marginBottom: '0.5rem', fontSize: '35px', color: 'white' }} />
        <span style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white',
          position: 'relative',
          top: '-10px',
          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        }}>
          {t('Css Design')}
        </span>
      </div>

      <div className="Javascript-Dev-Sec" onClick={GoToJavascriptDev} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
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

      <div className="Php-Dev-Sec" onClick={GoToPhpDev} style={{
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
      }} onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
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
  );
};

export default ShiftingDropDown;
