
import Navbar from './components/hero/Navbar';
import i18next from 'i18next';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import './utils/i18n';
import React, { useState, useRef } from 'react';
import arTranslation from './locales/ar.json';
import { useEffect } from 'react';
import Herocontent from './components/hero/Herocontent';
import Howwework from './components/main/Howwework';
import Howwehelp from './components/main/Howwehelp';
import Pricing from './components/main/Pricing';
import Signin from './components/Signin/Signin';
import Mylogin from './components/hero/Mylogin';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Sidenav from './components/userdashboard/Sidenav';
import NavRespo from './components/userdashboard/NavRespo';
import MeteorsDemo from './components/userdashboard/MeteorsDemo';
import { useTheme } from '@mui/material/styles';
import Profilecontent from './components/userdashboard/Profilecontent';
import Billingcontent from './components/userdashboard/Billingcontent';
import Programming from './components/Categories/Programming';
import ShiftingDropDown from './components/Categories/ShiftingDropDown';
import Design from './components/Categories/Design';
import Marketing from './components/Categories/Marketing';
import Architecture from './components/Categories/Architecture';
import Writing from './components/Categories/Writing';
import Accounting from './components/Categories/Accounting';
import Support from './components/Categories/Support';
import Consulting from './components/Categories/Consulting';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import i18n from 'i18next';
import { LanguageProvider } from './components/hero/LanguageContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import SidenavMobile from './components/userdashboard/SidenavMobile';
import Singleproject from './components/Projectsfetch/Singleproject';
import Test from './components/Projectsfetch/CopyButton';
import ResponsiveCard from './components/Projectsfetch/ResponsiveCard';
import ResponsiveSkills from './components/Projectsfetch/ResponsiveSkills';
import ResponsiveOffers from './components/Projectsfetch/ResponsiveOffers';
import Notification from './components/Projectsfetch/MenuList/Notification';
import ProfileMenu from './components/Projectsfetch/MenuList/ProfileMenu';
import Offertabs from './components/Projectsfetch/Offertabs';
import OfferButton from './components/Projectsfetch/OfferButton';
import ScrollToTop from './components/userdashboard/ScrollToTop';
import DashboardRespo from './components/userdashboard/DashboardRespo';
import ProjectResponsive from './components/Projectsfetch/ProjectResponsive';
import Respo1 from './components/Categories/Responsivedesign/Respo1';
import ResponsiveAll from './components/Projectsfetch/ResponsiveAll';
import ProjectMobile from './components/Projectsfetch/ProjectMobile';
import { height, width } from '@mui/system';
import BillingRespo from './components/userdashboard/BillingRespo';
import Cardsmenu from './components/Projectsfetch/MenuList/Cardsmenu';











// Initialize i18next
i18next.init({
  lng: 'en', // Default language
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    ar: { translation: arTranslation }
  }
});



function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic to handle logout
    setIsLoggedIn(false);
  };
  const handleSubmit = async (username, password, navigate, setError) => {
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      // Save user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // Navigate to home page after successful login
      navigate("/");
      // Update login status in App component
      handleLogin();
    } catch (err) {
      // Handle error
      setError(err.response.data);
    }
  };




  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar isLoggedIn={isLoggedIn} currentLanguage={currentLanguage} toggleLanguage={toggleLanguage} />
        <Herocontent />
        <Howwework />
        <Howwehelp />
        <Pricing />


      </div>
    </LanguageProvider>

  )
}
function Login() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };


  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >


      <Signin />



    </LanguageProvider>

  )
}
function Login1() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };


  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>

        <Mylogin />


      </div>
    </LanguageProvider>

  )
}
function User() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');

  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    localStorage.setItem('backgroundUrl', url);
  };

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }

    // Retrieve background URL from localStorage on component mount
    const storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
      setBackgroundUrl(storedBackgroundUrl);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };

  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <div className='Container'
          style={{
            backgroundSize: 'cover',
            background: backgroundUrl.startsWith('linear') || backgroundUrl.startsWith('url') ? `url(${backgroundUrl})` : backgroundUrl,

            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>

          <Sidenav />
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <div
            style={{
              position: 'relative',
              left: currentLanguage === 'ar' && isScreenUnder450px ? '18px' : currentLanguage === 'ar' ? '-262px' : 'unset',






            }}
          >
            <NavRespo onBackgroundChange={handleBackgroundChange} />
            <DashboardRespo />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

function Projects() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');
  const [backgroundUrl, setBackgroundUrl] = useState('linear-gradient(45deg, #29323c, #485563)');

  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    localStorage.setItem('backgroundUrl', url);
  };

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
    const storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
      setBackgroundUrl(storedBackgroundUrl);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '500vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              left: isScreenUnder500px ? '-2px' : 'unset',
              right: currentLanguage === 'ar' ? (isScreenUnder500px ? '-18px' : '261px')

                : 'unset',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>

          {isScreenUnder500px && isSidenavMobileOpen && <SidenavMobile onClose={handleSidenavMobileClose} />}

          <div
            style={{
              position: 'relative',
              left: currentLanguage === 'ar' && isScreenUnder500px ? '520px' : 'unset',

            }}
          >
            <ProjectMobile />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}
function Profile() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');
  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    localStorage.setItem('backgroundUrl', url);
  };

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
    // Retrieve background URL from localStorage on component mount
    const storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
      setBackgroundUrl(storedBackgroundUrl);
    }
  }, []);


  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };
  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };



  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container '
          style={{
            minHeight: '100vh',
            background: backgroundUrl.startsWith('linear') || backgroundUrl.startsWith('url') ? `url(${backgroundUrl})` : backgroundUrl,

            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <Sidenav />
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle}
            onBackgroundChange={handleBackgroundChange}
          />
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <Profilecontent />

        </div>

      </div>
    </LanguageProvider>

  )
}

function Billing() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');
  const [isCardsMenuOpen, setIsCardsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const isScreenUnder1440px = useMediaQuery('(max-width:1400px)');

  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    localStorage.setItem('backgroundUrl', url);
  };

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
    // Retrieve background URL from localStorage on component mount
    const storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
      setBackgroundUrl(storedBackgroundUrl);
    }
  }, []);
  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  const handleOpenCardsMenu = () => {
    setIsCardsMenuOpen(true);
  };

  const handleCloseCardsMenu = () => {
    setIsCardsMenuOpen(false);
    console.log('Closed')
    setIsClosing(true);
  };
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setIsCardsMenuOpen(false);
        setIsClosing(false);
      }, 1000); // Duration of the closing animation

      return () => clearTimeout(timer);
    }
  }, [isClosing]);



  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            height: '600vh',
            background: backgroundUrl.startsWith('linear') || backgroundUrl.startsWith('url') ? `url(${backgroundUrl})` : backgroundUrl,
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
            <div className={`dialog-container ${isClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: isSmallScreen && currentLanguage === 'ar'? '25%' :
                  isSmallScreen? '8.4%' :
                   '47%',
                  top: isSmallScreen? '63%' : '66%',
                  transform: 'translate(-50%, -50%)',
                  display: 'block',

                  zIndex: 1000,
                }}
              >


                <Cardsmenu onAddCardClick1={handleCloseCardsMenu} />



              
              </div>
          <div
            style={{
              position: 'relative',
              left: isScreenUnder500px ? '-2px' : 'unset',
              right: currentLanguage === 'ar' ? (isScreenUnder500px ? '-18px' : '261px')

                : 'unset',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <Sidenav />
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          {isCardsMenuOpen && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999, // Ensure it's just below the Cardsmenu
                }}
                onClick={handleCloseCardsMenu} // Optional: close menu when clicking on the background
              ></div>

              
            </>
          )}


          <div
            style={{
              position: 'relative',
              right: isSmallScreen ? '260px' :
                currentLanguage === 'ar' && isSmallScreen ? '200px' :
                  currentLanguage === 'ar' && isMediumScreen ? '34.2%' :
                    currentLanguage === 'ar' ? '555px' :
                      'unset',

            }}
          >
            <BillingRespo onAddCardClick={handleOpenCardsMenu} />
          </div>
        </div>

      </div>
    </LanguageProvider>

  )
}
function Text() {



  return (


    <div className='app'>
      <ShiftingDropDown />
    </div>




  )
}
function Projectsprogramming() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };


  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '300vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',



            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>





        </div>

      </div>
    </LanguageProvider>

  )
}

function Programmingweb() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };


  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',



            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingmobile() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>





        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingdatabase() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingsoftware() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');
  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingdesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingcss() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingjs() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>





        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingphp() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Programming />
          </div>






        </div>

      </div>
    </LanguageProvider>

  )
}
function Projectsdesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
<SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>






        </div>

      </div>
    </LanguageProvider>

  )
}
function Designgraphic() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Designphotoshop() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Designvideo() {

  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Designlogo() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}


function Designmontage() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Designcreative() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}
function Designidea() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Videodesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Design />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketingsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketinge() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}
function Marketingmanagment() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}
function Marketingsocial() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketingplan() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketingseo() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>


        </div>

      </div>
    </LanguageProvider>

  )
}


function Marketinginternet() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Marketing />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Architecturesec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}
function Architectureengineering() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Architectureinterior() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Architecturedesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Architectureidea() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>

        </div>

      </div>
    </LanguageProvider>

  )
}

function Architecture3d() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>

        </div>

      </div>
    </LanguageProvider>

  )
}
function Architectureplans() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Architecture />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Writingsec() {

  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingcontent() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingarticle() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingedit() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>


        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingreports() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingsearch() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingonline() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Writing />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>


        </div>

      </div>
    </LanguageProvider>

  )
}
function Accountingfinance() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingevo() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>


        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountinganalysis() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingmanage() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingtax() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Accountingadmin() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Accounting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Customsupport() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Customservice() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customdesk() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customlive() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Customemail() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>

        </div>

      </div>
    </LanguageProvider>

  )
}
function Customtechnical() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )

}
function Customsocial() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Support />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingbusiness() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingfinancial() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}


function Consultingmarketing() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Consultingit() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingresources() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultinglegal() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>



        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingenvironmental() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultinghealth() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container' style={{ background: '#111827', minHeight: '300vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'hidden' }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                currentLanguage === 'ar' ? '262px' :
                  '2px',
            }}
          >
            <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          </div>
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />


          <div
            style={{
              position: 'relative',
              right: isLargeScreen && currentLanguage === 'ar' ? '260px' : 'unset',
              left: isMediumScreen ? (currentLanguage === 'ar' ? '-215px' : '50px') : 'unset',

            }}
          >
            <Consulting />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}
function Postsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '300vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <NavRespo />
          <Sidenav />
          <Singleproject />
        </div>

      </div>
    </LanguageProvider>

  )
}


function Drawer() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '300vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <Test />
        </div>

      </div>
    </LanguageProvider>

  )
}


function Singlepost() {
  const menuContainerRef = useRef(null); // Create the ref
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');
  const isScreenUnder490px = useMediaQuery('(max-width:490px)');
  const isScreenUnder412px = useMediaQuery('(max-width:412px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');
  const isScreenBetween768And1050px = useMediaQuery('(min-width:768px) and (max-width:1050px)');
  const isScreenBetween768And1440px = useMediaQuery('(min-width:768px) and (max-width:1440px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  const handleCloseProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen, menuContainerRef]);




  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '300vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>

          <Sidenav

          />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />




          <div
            style={{
              position: 'relative',

              right: isScreenBetween768And1050px ? (currentLanguage === 'ar' ? '-2px' : '4px') : 'unset',


            }}
          >
            <div
              style={{
                position: 'relative',
                right: currentLanguage === 'ar' && isSmallScreen ? '-18px' :
                  currentLanguage === 'ar' ? '262px' :
                    '2px',



              }}
            >
              <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
            </div>

            <div
              style={{
                position: 'relative',
                top: '-340px',
                left: currentLanguage === 'ar' && isScreenUnder490px ? '281px' : 'unset'
              }}
            >
              <div
                style={{
                  marginLeft: isScreenUnder490px ? '10px' : '290px',
                  marginTop: '60px',
                  position: 'relative',
                  right: currentLanguage === 'ar' ? '280px' : '14px',
                }}
              >
                <ResponsiveCard />
                <div
                  style={{
                    position: 'relative',
                    right: isScreenBetween768And1050px ? (currentLanguage === 'ar' ? '-150px' : '125px') : 'unset',

                  }}
                >
                  <div

                  >
                    <div
                      style={{
                        position: 'relative',
                        left: currentLanguage === 'ar' && isScreenUnder490px ? '140px' : 'unset'
                      }}
                    >
                      <div class="astrodivider ">
                        <div class="astrodividermask"
                          style={{
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '550px' : '280px',
                            top: '-15px',
                            left: isScreenUnder490px ? '-395px' : 'undefined',
                          }}
                        >

                        </div>
                        <span className='border' ><i>&#9733;</i></span>
                      </div>
                    </div>
                  </div>
                </div>
                <ResponsiveSkills />
                <div

                >
                  <div
                    style={{
                      position: 'relative',
                      right: isScreenBetween768And1050px ? (currentLanguage === 'ar' ? '-150px' : '125px') : 'unset',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        left: currentLanguage === 'ar' && isScreenUnder490px ? '140px' : 'unset'
                      }}
                    >
                      <div class="astrodivider ">
                        <div class="astrodividermask"
                          style={{
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '550px' : '280px',
                            top: '-15px',
                            left: isScreenUnder490px ? '-395px' : 'undefined',
                          }}
                        >

                        </div>
                        <span className='border' ><i>&#9733;</i></span>
                      </div>
                    </div>
                  </div>
                </div>
                <ResponsiveOffers />
              </div>
            </div>
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Responsive() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '300vh',
            width: '100%',
            display: 'flex',
            position: 'reltive',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <Sidenav />
          <div
            style={{
              position: 'relative',
              right: currentLanguage === 'ar' && isScreenUnder500px ? '-18px' :
                currentLanguage === 'ar' ? '265px' :
                  'unset',
            }}
          >

            <NavRespo />



          </div>
          <div
            style={{


            }}
          >
            <ProjectResponsive />
          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}

function Responsive1() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');

  useEffect(() => {
    // Retrieve language preference from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    // Update language preference in localStorage and state
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    // Change language using i18next
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '300vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <Sidenav />
          <NavRespo />
          <div

          >

            <ProjectMobile />


          </div>




        </div>

      </div>
    </LanguageProvider>

  )
}




function App() {


  return (

        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Register" element={<Login />} />
            <Route path="respo1" element={<Responsive1 />} />
            <Route path="respo" element={<Responsive />} />
            <Route path="project/singlepost" element={<Singlepost />} />
            <Route path="Login" element={<Login />} />
            <Route path="test" element={<Login1 />} />
            <Route path="dashboard" element={<User />} />
            <Route path="dailog" element={<Drawer />} />
            <Route
              path="project"
              element={<Projects />}
            />
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="billing"
              element={<Billing />}
            />
            <Route
              path="text"
              element={<Text />}
            />
            <Route
              path="projects/categories/programming"
              element={<Projectsprogramming />}
            />
            <Route
              path="projects/categories/design"
              element={<Projectsdesign />}
            />
            <Route
              path="projects/categories/programming/web-development"
              element={<Programmingweb />}
            />
            <Route
              path="projects/categories/programming/mobileapp-development"
              element={<Programmingmobile />}
            />
            <Route
              path="projects/categories/programming/database-development"
              element={<Programmingdatabase />}
            />
            <Route
              path="projects/categories/programming/software-engineering"
              element={<Programmingsoftware />}
            />
            <Route
              path="projects/categories/programming/website-design"
              element={<Programmingdesign />}
            />
            <Route
              path="projects/categories/programming/css-design"
              element={<Programmingcss />}
            />

            <Route
              path="projects/categories/programming/javascript-development"
              element={<Programmingjs />}
            />
            <Route
              path="projects/categories/programming/php-development"
              element={<Programmingphp />}
            />
            <Route
              path="projects/categories/design/graphic-design"
              element={<Designgraphic />}
            />
            <Route
              path="projects/categories/design/photoshop"
              element={<Designphotoshop />}
            />

            <Route
              path="projects/categories/design/video-production"
              element={<Designvideo />}
            />


            <Route
              path="projects/categories/design/logo-design"
              element={<Designlogo />}
            />
            <Route
              path="projects/categories/design/video-montage"
              element={<Designmontage />}
            />
            <Route
              path="projects/categories/design/creative-design"
              element={<Designcreative />}
            />

            <Route
              path="projects/categories/design/design-idea"
              element={<Designidea />}
            />
            <Route
              path="projects/categories/design/video-design"
              element={<Videodesign />}
            />
            <Route
              path="projects/categories/marketing"
              element={<Marketingsec />}
            />

            <Route
              path="projects/categories/marketing/e-marketing"
              element={<Marketinge />}
            />
            <Route
              path="projects/categories/marketing/marketing-managment"
              element={<Marketingmanagment />}
            />
            <Route
              path="projects/categories/marketing/marketing-social"
              element={<Marketingsocial />}
            />
            <Route
              path="projects/categories/marketing/marketing-plan"
              element={<Marketingplan />}
            />
            <Route
              path="projects/categories/marketing/marketing-seo"
              element={<Marketingseo />}
            />
            <Route
              path="projects/categories/marketing/marketing-internet"
              element={<Marketinginternet />}
            />
            <Route
              path="projects/categories/architecture"
              element={<Architecturesec />}
            />
            <Route
              path="projects/categories/architecture/architecture-engineering"
              element={<Architectureengineering />}
            />
            <Route
              path="projects/categories/architecture/architecture-interior"
              element={<Architectureinterior />}
            />
            <Route
              path="projects/categories/architecture/architecture-design"
              element={<Architecturedesign />}
            />
            <Route
              path="projects/categories/architecture/architecture-idea"
              element={<Architectureidea />}
            />
            <Route
              path="projects/categories/architecture/architecture-3d"
              element={<Architecture3d />}
            />
            <Route
              path="projects/categories/architecture/architecture-plans"
              element={<Architectureplans />}
            />
            <Route
              path="projects/categories/writing"
              element={<Writingsec />}
            />
            <Route
              path="projects/categories/writing/writing-content"
              element={<Writingcontent />}
            />
            <Route
              path="projects/categories/writing/writing-articles"
              element={<Writingarticle />}
            />
            <Route
              path="projects/categories/writing/content-editing"
              element={<Writingedit />}
            />
            <Route
              path="projects/categories/writing/writing-reports"
              element={<Writingreports />}
            />
            <Route
              path="projects/categories/writing/research-scientific"
              element={<Writingsearch />}
            />
            <Route
              path="projects/categories/writing/writing-online"
              element={<Writingonline />}
            />
            <Route
              path="projects/categories/accounting"
              element={<Accountingsec />}
            />
            <Route
              path="projects/categories/accounting/financial-accounting"
              element={<Accountingfinance />}
            />
            <Route
              path="projects/categories/accounting/financial-evaluation"
              element={<Accountingevo />}
            />
            <Route
              path="projects/categories/accounting/financial-analysis"
              element={<Accountinganalysis />}
            />
            <Route
              path="projects/categories/accounting/financial-management"
              element={<Accountingmanage />}
            />
            <Route
              path="projects/categories/accounting/tax-strategy"
              element={<Accountingtax />}
            />
            <Route
              path="projects/categories/accounting/administrative-reports"
              element={<Accountingadmin />}
            />
            <Route
              path="projects/categories/support"
              element={<Customsupport />}
            />
            <Route
              path="projects/categories/support/customer-service"
              element={<Customservice />}
            />
            <Route
              path="projects/categories/support/technical-support"
              element={<Customtechnical />}
            />
            <Route
              path="projects/categories/support/desk-support"
              element={<Customdesk />}
            />
            <Route
              path="projects/categories/support/live-chat-support"
              element={<Customlive />}
            />
            <Route
              path="projects/categories/support/email-support"
              element={<Customemail />}
            />
            <Route
              path="projects/categories/support/social-media-support"
              element={<Customsocial />}
            />
            <Route
              path="projects/categories/consulting"
              element={<Consultingsec />}
            />
            <Route
              path="projects/categories/consulting/business-consulting"
              element={<Consultingbusiness />}
            />
            <Route
              path="projects/categories/consulting/financial-consulting"
              element={<Consultingfinancial />}
            />
            <Route
              path="projects/categories/consulting/marketing-consulting"
              element={<Consultingmarketing />}
            />
            <Route
              path="projects/categories/consulting/it-consulting"
              element={<Consultingit />}
            />
            <Route
              path="projects/categories/consulting/human-resources-consulting"
              element={<Consultingresources />}
            />
            <Route
              path="projects/categories/consulting/legal-consulting"
              element={<Consultinglegal />}
            />
            <Route
              path="projects/categories/consulting/environmental-consulting"
              element={<Consultingenvironmental />}
            />
            <Route
              path="projects/categories/consulting/health-consulting"
              element={<Consultinghealth />}
            />
            <Route
              path="post"
              element={<Postsec />}
            />
          </Routes>
        </Router>
   

        );
}

        export default App;