

import i18next from 'i18next';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import './utils/i18n';
import React, { useState, useRef } from 'react';
import arTranslation from './locales/ar.json';
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Herocontent from './components/hero/Herocontent';
import WhyUs from './components/hero/WhyUs';
import Howwework from './components/main/Howwework';
import Howwehelp from './components/main/Howwehelp';
import StarsCanvas from './components/main/StarsCanvas';
import Navbar from './components/main/Navbar';
import Signin from './components/Signin/Signin';
import Mylogin from './components/hero/Mylogin';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import OverlayAnimation from './OverlayAnimation';
import Sidenav from './components/userdashboard/Sidenav';
import NavRespo from './components/userdashboard/NavRespo';
import MeteorsDemo from './components/userdashboard/MeteorsDemo';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Profilecontent from './components/userdashboard/Profilecontent';
import { Typography } from '@mui/material';
import Billingcontent from './components/userdashboard/Billingcontent';
import Programming from './components/Categories/Programming';
import ShiftingDropDown from './components/Categories/ShiftingDropDown';
import Design from './components/Categories/Design';
import Marketing from './components/Categories/Marketing';
import Architecture from './components/Categories/Architecture';
import { ContainerProvider } from './Context/CenteringContext.jsx';
import Writing from './components/Categories/Writing';
import Accounting from './components/Categories/Accounting';
import Support from './components/Categories/Support';
import Consulting from './components/Categories/Consulting';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';
import i18n from 'i18next';
import { LanguageProvider } from './components/hero/LanguageContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import SidenavMobile from './components/userdashboard/SidenavMobile';
import Singleproject from './components/Projectsfetch/Singleproject';
import Test from './components/Projectsfetch/CopyButton';
import ResponsiveCard from './components/Projectsfetch/ResponsiveCard';
import ResponsiveSkills from './components/Projectsfetch/ResponsiveSkills';
import ResponsiveOffers from './components/Projectsfetch/ResponsiveOffers';
import DashboardRespo from './components/userdashboard/DashboardRespo';
import ProjectMobile from './components/Projectsfetch/ProjectMobile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BillingRespo from './components/userdashboard/BillingRespo';
import Cardsmenu from './components/Projectsfetch/MenuList/Cardsmenu';
import CardSelect from './components/Projectsfetch/MenuList/CardSelect';
import CardEdit from './components/Projectsfetch/MenuList/CardEdit';
import BillingInfoDelete from './components/Projectsfetch/MenuList/BillingInfoDelete';
import BillingInfoUpdate from './components/Projectsfetch/MenuList/BillingInfoUpdate';
import BillingInvoices from './components/Projectsfetch/BillingInvoices/BillingInvoices';
import SingleInvoice from './components/Projectsfetch/MenuList/SingleInvoice';
import InvoiceOne from './components/Projectsfetch/MenuList/InvoiceOne';
import InvoiceDelete from './components/Projectsfetch/MenuList/InvoiceDelete';
import ScrollToTop from './ScrollToTop';
import ProfileInfoUpdate from './components/Projectsfetch/MenuList/ProfileInfoUpdate';
import UpdateCover from './components/Projectsfetch/MenuList/UpdateCover';
import ProfileMessages from './components/userdashboard/ProfileMessages';
import Signup from './components/Signup/Signup';
import AccountVerifey from './components/userdashboard/AccountVerifey';
import zIndex from '@mui/material/styles/zIndex';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import AdminRoute from './components/ProtectedRoutes/AdminRoute';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import SignupMobile from './components/Signup/SignupMobile';
import GoogleRegisterMobile from './components/Signup/GoogleRegisterMobile';
import UnAuth from './components/AccesPages/UnAuth';
import SigninMobile from './components/Signin/SigninMobile';
import AccountCreation from './components/Signup/AccountCreation';
import FacebookRegMobile from './components/Signup/FacebookRegMobile';
import { UserProvider } from './Context/UserContext.jsx';
import { GigProvider } from './Context/GigContext.jsx';
import { ProjectProvider } from './Context/ProjectContext.jsx';
import { BillingProvider } from "./Context/BillingContext.jsx";
import { ChatProvider, useChat } from './Context/ChatContext.jsx';
import { NotificationProvider } from './Context/NotificationContext';
import { FontProvider } from './Context/FontContext.jsx';
import ContainerTest from './components/userdashboard/ContainerTest.jsx'
import ProfileSettings from './components/userdashboard/ProfileSettings';
import VerificationId from './components/Projectsfetch/MenuList/VerificationId';
import AllProjectsFetch from './components/Projectsfetch/AllProjectsFetch.jsx';
import UnAuthPro from './components/AccesPages/UnAuthPro.jsx';
import NewBilling from './components/userdashboard/NewBilling.jsx';
import AccountSettings from './components/Categories/Responsivedesign/AccountSettings.jsx'
import MyNav2 from './components/Categories/Responsivedesign/MyNav2.jsx'
import RankDesign from './components/Categories/Responsivedesign/RankDesign.jsx';
import RankRspoDesign from './components/Categories/Responsivedesign/RankRspoDesign.jsx';
import ReviewRespoDesign from './components/Categories/Responsivedesign/ReviewRespoDesign.jsx';
import AchievementRespoDesign from './components/Categories/Responsivedesign/AchievementRespoDesign.jsx';
import AchievmentsTest from './components/Categories/Responsivedesign/AchievmentsTest.jsx';
import ProfileUpdatedSucces from './components/Categories/Responsivedesign/ProfileUpdatedSucces.jsx';
import ProfilePasswordUpdatedSucces from './components/Projectsfetch/MenuList/ProfilePasswordUpdatedSucces.jsx';
import NewSideNav from './components/userdashboard/NewSideNav.jsx';
import GlowingBackground from './components/userdashboard/GlowingBackground.jsx';
import ChatAppNav from './components/userdashboard/ChatAppNav.jsx';
import ChatAppSearchBox from './components/userdashboard/ChatAppSearchBox.jsx';
import ChatAppCall from './components/Projectsfetch/MenuList/ChatAppCall.jsx';
import ChatAppVideoCall from './components/Projectsfetch/MenuList/ChatAppVideoCall.jsx';
import SingleProjectOverView from './components/Categories/Responsivedesign/SingleProjectOverView.jsx';
import Offertabs from './components/Projectsfetch/Offertabs.jsx';
import HireAFreelancer from './components/BuyersSection/HireAFreelancer.jsx';
import AddNewProject from './components/BuyersSection/AddNewProject.jsx';
import UpdateProfilePhoto from './components/Projectsfetch/MenuList/UpdateProfilePhoto.jsx';
import OfferDetails from './components/Projectsfetch/OfferDetails.jsx';
import OfferAccepted from './components/Projectsfetch/OfferAccepted.jsx';
import OfferDeclined from './components/Projectsfetch/OfferDeclined.jsx';
import AdminSideNav from './components/AdminSectionDashboard/AdminSideNav.jsx';
import AdmingigsControlle from './components/AdminSectionDashboard/AdmingigsControlle.jsx';
import AdminNavBar from './components/AdminSectionDashboard/AdminNavBar.jsx';
import Users from './components/AdminSectionDashboard/Users.jsx';
import FlipClock from './components/Projectsfetch/MenuList/FlipCountdown.jsx';
import FlipCountdown from './components/Projectsfetch/MenuList/FlipCountdown.jsx';
import AccountEmailVerify from './components/Categories/Responsivedesign/AccountEmailVerify.jsx';
import PhoneCodeVefify from './components/Categories/Responsivedesign/PhoneCodeVefify.jsx';
import NewEmail2Fauth from './components/Categories/Responsivedesign/NewEmail2Fauth.jsx';
import IsUserVerifeyd from './components/Categories/Responsivedesign/IsUserVerifeyd.jsx';
import HowitWork from './components/Projectsfetch/MenuList/HowitWork.jsx';
import DepositMenu from './components/Projectsfetch/MenuList/DepositMenu.jsx';
import SingleUserProfile from './components/Categories/Responsivedesign/SingleUserProfile.jsx';
import ProfileFetchInfo from './components/Projectsfetch/MenuList/ProfileFetchInfo.jsx';
import Content1 from './components/hero/Content1.jsx';
import Hero from './components/hero/Hero.jsx';
import Benefits from './components/Benefits.jsx';
import Collaboration from './components/Collaboration.jsx';
import Services from './components/Services.jsx'
import Pricing from './components/Pricing.jsx'
import Footer from './components/Footer.jsx'
import OurPlans from './components/main/OurPlans.jsx';
import PayMemberShipMenu from './components/Projectsfetch/MenuList/PayMemberShipMenu.jsx';
import BlackHole from './components/blackhole.jsx';
import UserFulldeatils from './components/AdminSectionDashboard/UserFulldeatils.jsx';
import AdminConversations from './components/AdminSectionDashboard/AdminConversations.jsx';


















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




  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>
      <div className="relative min-h-screen w-full pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-[#030014]">
        {/* StarsCanvas as Background */}
        <div style={{
          position: 'fixed', // Use fixed positioning to cover the entire viewport
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}>
          <StarsCanvas />
        </div>



        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>

          <Navbar />
          <Hero />
          <Benefits />
          <Collaboration />
          <Services />
          <Pricing />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
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


      <SigninMobile />



    </LanguageProvider>

  )
}
function Login1() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');


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
        <div className="MainContainer"
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',
            justifyContent: 'center',
            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >

          <UnAuthPro />

        </div>


      </div>
    </LanguageProvider>

  )
}
function User() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isMedScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [showAccountVerify, setShowAccountVerify] = useState(false); // State for showing AccountVerify

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }

    const storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
      setBackgroundUrl(storedBackgroundUrl);
    }

    // Check if the user has already seen the AccountVerify component
    const hasSeenAccountVerify = localStorage.getItem('hasSeenAccountVerify');
    if (!hasSeenAccountVerify && location.pathname === '/userdashboard') {
      // If not seen, show the component and set it as seen in localStorage
      setShowAccountVerify(true);
      localStorage.setItem('hasSeenAccountVerify', 'true');
    }
  }, [location.pathname]);

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleCloseAccountVerify = () => {
    setShowAccountVerify(false);
  };

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fetch user info from localStorage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>

      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' : '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' ? '259px' :
                'unset',
            width: isSmallScreen ? '100%' : 'calc(100% - 259px)', // 100% width on small screens, adjusted width on larger screens
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',
            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >

          <NavRespo />
          <DashboardRespo />

          <Sidenav />
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />






        </div>

      </div>
    </LanguageProvider>

  );
}



function Projects() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const [isUserVerify, setIsUserVerifyOpen] = useState(false);
  const [isUserVerifyClosing, setIsUserVerifyClosing] = useState(false);

  const handleOpenUserVerify = () => {
    setIsUserVerifyOpen(true);
    setIsUserVerifyClosing(false);
  };

  const handleCloseUserVerify = () => {
    setIsUserVerifyClosing(true);
    const timer = setTimeout(() => {
      setIsUserVerifyOpen(false);
      setIsUserVerifyClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <ProjectMobile handleOpenUserVerify={handleOpenUserVerify}
          />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />

          {isUserVerify && (
            <>

              <div
                className={`BlurBG ${isUserVerifyClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isUserVerifyClosing ? 0 : 1,
                }}
                onClick={handleCloseUserVerify}
              ></div>

              {/* Centered Dialog */}
              <div
                className={`dialog-container ${isUserVerifyClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  width: isSmallScreen ? '90%' :
                    isTabletScreen ? '80%' :
                      '55%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,

                }}
              >

                <IsUserVerifeyd
                  onClickOpen={handleOpenUserVerify}
                  onCloseClick={handleCloseUserVerify}

                />

              </div>
            </>
          )}



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
  const [isClosing, setIsClosing] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isCoverClosing, setIsCoverClosing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileClosing, setIsProfileClosing] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const [coverImg, setCoverImg] = useState('');
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
  const handleOpenProfileInfo = () => {
    setIsProfileMenuOpen(true);
    setIsClosing(false); // Ensure closing is reset when opening
  };

  const handleCloseProfileInfo = () => {
    setIsClosing(true);
  };

  const handleOpenCover = () => {
    setIsCoverOpen(true);
    setIsCoverClosing(false);
  };

  const handleCloseCover = () => {
    setIsCoverClosing(true);
  };



  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setIsProfileMenuOpen(false);
        setIsClosing(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isClosing]);



  useEffect(() => {
    if (isCoverClosing) {
      const timer = setTimeout(() => {
        setIsCoverOpen(false);
        setIsCoverClosing(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCoverClosing]);



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setCoverImg(user.coverImg);
    }
  }, []);

  // Function to update cover image
  const updateCoverImage = (newCoverImg) => {
    setCoverImg(newCoverImg); // Update the cover image in state
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
    setIsProfileClosing(false);
  };

  const handleCloseProfile = () => {
    setIsProfileClosing(true);
  };

  // Close profile after animation
  useEffect(() => {
    if (isProfileClosing) {
      const timer = setTimeout(() => {
        setIsProfileOpen(false);
        setIsProfileClosing(false);
      }, 1000); // Adjust timeout based on animation duration

      return () => clearTimeout(timer);
    }
  }, [isProfileClosing]);


  const [isShowProfile, setIsShowProfileOpen] = useState(false);
  const [isShowProfileClosing, setIsShowProfileClosing] = useState(false);


  const handleShowProfileInfoOpen = () => {
    setIsShowProfileOpen(true);
    setIsShowProfileClosing(false);
  };

  const handleShowProfileInfoClose = () => {
    setIsShowProfileClosing(true);
  };

  useEffect(() => {
    if (isShowProfileClosing) {
      const timer = setTimeout(() => {
        setIsShowProfileOpen(false);
        setIsShowProfileClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isShowProfileClosing]);

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >

      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >

        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: 'auto', // Changed from fixed calculation
            maxWidth: isSmallScreen || isTabletScreen ?
              '100%' :
              `calc(100% - ${currentLanguage === 'ar' ? '259px' : '259px'})`,
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >

          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />


          <Profilecontent handleOpenProfile={handleOpenProfile}
            coverImg={coverImg}
            handleOpenCover={handleOpenCover}
            handleShowProfileInfoOpen={handleShowProfileInfoOpen} />


          <Sidenav />


          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          {isShowProfile && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0, // Added right: 0
                  bottom: 0, // Added bottom: 0
                  width: '100vw', // Changed to viewport width
                  height: '100vh', // Changed to viewport height
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: '1000',
                }}
                onClick={handleShowProfileInfoClose}
              >

              </div>

              <div className={`dialog-container ${isShowProfileClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: isSmallScreen ? '50%' : '50%', // Center horizontally
                  top: isSmallScreen ? '50%' :
                    isMediumScreen ? '45%' :
                      '45%',  // Center vertically
                  zIndex: '1111',
                  maxHeight: '90vh', // Prevent extreme overflow
                  overflow: 'auto',


                }}>

                <ProfileFetchInfo handleShowProfileInfoClose={handleShowProfileInfoClose}

                />
              </div>

            </>
          )}

          {isCoverOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0, // Added right: 0
                  bottom: 0, // Added bottom: 0
                  width: '100vw', // Changed to viewport width
                  height: '100vh', // Changed to viewport height
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999, // Ensure it's just below the Cardsmenu
                }}
                onClick={handleCloseCover} // Optional: close menu when clicking on the background
              ></div>

              <div className={`dialog-container ${isCoverClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: isSmallScreen ? '50%' : '50%', // Center horizontally
                  top: isSmallScreen ? '32%' :
                    isMediumScreen ? '35%' :
                      '35%',  // Center vertically
                  zIndex: 1000,

                }}>
                <UpdateCover currentCoverImg={coverImg} onUpdateCoverImage={updateCoverImage} handleCloseCover={handleCloseCover} />
              </div>

            </>
          )}
          {isProfileOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0, // Added right: 0
                  bottom: 0, // Added bottom: 0
                  width: '100vw', // Changed to viewport width
                  height: '100vh', // Changed to viewport height
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999, // Ensure it's just below the Cardsmenu
                }}
                onClick={handleCloseProfile} // Optional: close menu when clicking on the background
              ></div>

              <div className={`dialog-container ${isProfileClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: isSmallScreen ? '50%' : '50%', // Center horizontally
                  top: isSmallScreen ? '32%' :
                    isMediumScreen ? '35%' :
                      '35%',  // Center vertically
                  zIndex: 1000,

                }}>
                <UpdateProfilePhoto currentCoverImg={coverImg} onUpdateCoverImage={updateCoverImage} handleCloseProfile={handleCloseProfile} />
              </div>

            </>
          )}




        </div>


      </div>

    </LanguageProvider>

  )
}

function SingleUser() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');
  const [isClosing, setIsClosing] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isCoverClosing, setIsCoverClosing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileClosing, setIsProfileClosing] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const [coverImg, setCoverImg] = useState('');
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

        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: 'auto', // Changed from fixed calculation
            maxWidth: isSmallScreen || isTabletScreen ?
              '100%' :
              `calc(100% - ${currentLanguage === 'ar' ? '259px' : '259px'})`,
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >

          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />

          <SingleUserProfile />


          <Sidenav />


          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />





        </div>


      </div>

    </LanguageProvider>

  )
}




function UsersMessages({ callState }) {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isChatCallOpen, setIsChatCallOpen] = useState(false);
  const [isChatCallClosing, setIsChatCallClosing] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isVideoCallClosing, setIsVideoCallClosing] = useState(false);
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const { isCalling, isCallConnected, isIncomingCall, isCallRejected, isVideoCall } = callState;
  const [callStartTime, setCallStartTime] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isShowWorkOpen, setIsShowWorkOpen] = useState(false);
  const [isShowWorkClosing, setIsShowWorkClosing] = useState(false);

  // Handle background change
  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    localStorage.setItem('backgroundUrl', url);
  };

  // Initialize language and background
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
    const storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
      setBackgroundUrl(storedBackgroundUrl);
    }
  }, []);

  // Language handling
  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };

  // Mobile sidenav handlers
  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };

  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };

  // Call dialog handlers
  const handleChatCallOpen = () => {
    setIsChatCallOpen(true);
    setIsChatCallClosing(false);
  };

  const handleChatCallClose = () => {
    setIsChatCallClosing(true);
  };

  const handleChatVideoCallOpen = () => {
    setIsVideoCallOpen(true);
    setIsVideoCallClosing(false);
  };

  const handleChatVideoCallClose = () => {
    setIsVideoCallClosing(true);
  };

  // How it works dialog handlers
  const handleHowItWorkOpen = () => {
    setIsShowWorkOpen(true);
    setIsShowWorkClosing(false);
  };

  const handleHowItsWorkClose = () => {
    setIsShowWorkClosing(true);
  };

  // Dialog closing effects
  useEffect(() => {
    if (isChatCallClosing) {
      const timer = setTimeout(() => {
        setIsChatCallOpen(false);
        setIsChatCallClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isChatCallClosing]);

  useEffect(() => {
    if (isVideoCallClosing) {
      const timer = setTimeout(() => {
        setIsVideoCallOpen(false);
        setIsVideoCallClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVideoCallClosing]);

  useEffect(() => {
    if (isShowWorkClosing) {
      const timer = setTimeout(() => {
        setIsShowWorkOpen(false);
        setIsShowWorkClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isShowWorkClosing]);

  // Call state management
  useEffect(() => {
    if (isCalling || isCallConnected || isIncomingCall) {
      if (isVideoCall) {
        handleChatVideoCallOpen();
        if (isChatCallOpen && !isChatCallClosing) {
          setIsChatCallClosing(true);
        }
      } else {
        handleChatCallOpen();
        if (isVideoCallOpen && !isVideoCallClosing) {
          setIsVideoCallClosing(true);
        }
      }
      setCallStartTime(Date.now());
    } else {
      if (isVideoCallOpen && !isVideoCallClosing) {
        setIsVideoCallClosing(true);
      }
      if (isChatCallOpen && !isChatCallClosing) {
        setIsChatCallClosing(true);
      }
      setCallStartTime(null);
      setCallDuration(0);
    }
  }, [isCalling, isCallConnected, isIncomingCall, isVideoCall]);

  // Call duration calculation
  useEffect(() => {
    let interval;
    if (callStartTime) {
      interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - callStartTime) / 1000);
        setCallDuration(elapsedTime);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStartTime]);

  const formatCallDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Style objects
  const blurBgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    zIndex: '111133333311',
  };

  const dialogStyle = {
    position: 'fixed',
    left: '50%',
    top: isSmallScreen ? '45%' : '45%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1111333333111',
  };

  const videoDialogStyle = {
    position: 'fixed',
    left: '50%',
    top: isSmallScreen ? '32%' : '45%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1111333333111',
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: 'auto',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <GlowingBackground />
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <ChatAppNav />
          <ProfileMessages 
            OpenChatVideoCall={handleChatVideoCallOpen}
            OpenChatCall={handleChatCallOpen}
            handleHowItWorkOpen={handleHowItWorkOpen}
          />
          <Sidenav />
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />

          {/* Audio Call Dialog */}
          {isChatCallOpen && !isVideoCall && (
            <>
              <div className='BlurBG' style={blurBgStyle} />
              <div className={`dialog-container ${isChatCallClosing ? 'hide' : 'show'}`} style={dialogStyle}>
                <ChatAppCall 
                  callState={callState} 
                  isClose={handleChatCallClose}
                  callDuration={formatCallDuration(callDuration)}
                />
              </div>
            </>
          )}

          {/* Video Call Dialog */}
          {isVideoCallOpen && isVideoCall && (
            <>
              <div className='BlurBG' style={blurBgStyle} />
              <div className={`dialog-container ${isVideoCallClosing ? 'hide' : 'show'}`} style={videoDialogStyle}>
                <ChatAppVideoCall
                  callState={callState}
                  isClose={handleChatVideoCallClose}
                  callDuration={formatCallDuration(callDuration)}
                />
              </div>
            </>
          )}

          {/* How It Works Dialog */}
          {isShowWorkOpen && (
            <>
              <div className='BlurBG' style={blurBgStyle} onClick={handleHowItsWorkClose} />
              <div className={`dialog-container ${isShowWorkClosing ? 'hide' : 'show'}`} style={dialogStyle}>
                <HowitWork handleHowItsWorkClose={handleHowItsWorkClose} />
              </div>
            </>
          )}
        </div>
      </div>
    </LanguageProvider>
  );
}

function Billing() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const [backgroundUrl, setBackgroundUrl] = useState('#111827');
  const [isCardsMenuOpen, setIsCardsMenuOpen] = useState(false);
  const [isCardsMenuClosing, setIsCardsMenuClosing] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isDepositClosing, setIsDepositClosing] = useState(false);
  const [isCardEditOpen, setIsCardEditOpen] = useState(false);
  const [isCardEditClosing, setIsCardEditClosing] = useState(false);
  const [isBillingInfoOpen, setIsBillingInfoOpen] = useState(false);
  const [isBillingInfoClosing, setIsBillingInfoClosing] = useState(false);
  const [isBillingUpdateOpen, setIsBillingUpdateOpen] = useState(false);
  const [isBillingUpdateClosing, setIsBillingUpdateClosing] = useState(false);

  // Cards Menu Handling
  const handleOpenDepositMenu = () => {

    setIsDepositOpen(true);
    setIsDepositClosing(false);
  };

  const handleCloseDespositMenu = () => {
    setIsDepositClosing(true);
  };

  useEffect(() => {
    if (isDepositClosing) {
      const timer = setTimeout(() => {
        setIsDepositOpen(false);
        setIsDepositClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isDepositClosing]);


  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    localStorage.setItem('backgroundUrl', url);
  };

  useEffect(() => {
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
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
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

  // Cards Menu Handling
  const handleOpenCardsMenu = () => {

    setIsCardsMenuOpen(true);
    setIsCardsMenuClosing(false);
  };

  const handleCloseCardsMenu = () => {
    setIsCardsMenuClosing(true);
  };

  useEffect(() => {
    if (isCardsMenuClosing) {
      const timer = setTimeout(() => {
        setIsCardsMenuOpen(false);
        setIsCardsMenuClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isCardsMenuClosing]);

  // Card Edit Handling
  const handleOpenCardEdit = () => {
    setIsCardEditOpen(true);
    setIsCardEditClosing(false);
  };

  const handleCloseCardEdit = () => {
    setIsCardEditClosing(true);
  };

  useEffect(() => {
    if (isCardEditClosing) {
      const timer = setTimeout(() => {
        setIsCardEditOpen(false);
        setIsCardEditClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isCardEditClosing]);

  // Billing Info Handling
  const handleOpenInfoDelete = () => {
    setIsBillingInfoOpen(true);
    setIsBillingInfoClosing(false);
  };

  const handleCloseInfoDelete = () => {
    setIsBillingInfoClosing(true);
  };

  useEffect(() => {
    if (isBillingInfoClosing) {
      const timer = setTimeout(() => {
        setIsBillingInfoOpen(false);
        setIsBillingInfoClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isBillingInfoClosing]);

  // Billing Update Handling
  const handleOpenInfoUpdate = () => {
    setIsBillingUpdateOpen(true);
    setIsBillingUpdateClosing(false);
  };

  const handleCloseInfoUpdate = () => {
    setIsBillingUpdateClosing(true);
  };

  useEffect(() => {
    if (isBillingUpdateClosing) {
      const timer = setTimeout(() => {
        setIsBillingUpdateOpen(false);
        setIsBillingUpdateClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isBillingUpdateClosing]);

  const [showCardSelect, setShowCardSelect] = useState(false);
  const [logoPath, setLogoPath] = useState('https://res.cloudinary.com/damicjacf/image/upload/v1722793005/Mastercard-removebg-preview_mywejo.png');

  const handleLogoClick = () => {
    setShowCardSelect(true);
  };

  const handleCardSelect = (selectedLogoPath) => {
    setLogoPath(selectedLogoPath);
    setShowCardSelect(false);
  };


  useEffect(() => {
    const shouldOpenMenu = localStorage.getItem('shouldOpenDepositMenu');

    if (shouldOpenMenu === 'true') {
      // Clear the flag immediately
      localStorage.removeItem('shouldOpenDepositMenu');

      // Slight delay to ensure component is fully mounted
      setTimeout(() => {
        handleOpenDepositMenu();
      }, 300);
    }
  }, []);




  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >

      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',
            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <NewBilling onOpenBillingUpdate={handleOpenInfoUpdate}

            onEditClick={handleOpenCardEdit}
            onAddCardClick={handleOpenCardsMenu}
            handleOpenDepositMenu={handleOpenDepositMenu}
          />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />
          {isCardsMenuOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                }}
                onClick={handleCloseCardsMenu}
              ></div>

              <div className={`dialog-container ${isCardsMenuClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}>
                <Cardsmenu onAddCardClick1={handleCloseCardsMenu} />
              </div>
            </>
          )}

          {isCardEditOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                }}
                onClick={handleCloseCardEdit} // Optional: close menu when clicking on the background
              ></div>

              <div className={`dialog-container ${isCardEditClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}>
                <CardEdit onCloseClick={handleCloseCardEdit} />
              </div>
            </>
          )}

          {isBillingInfoOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                }}
                onClick={handleCloseInfoDelete} // Optional: close menu when clicking on the background
              ></div>

              <div className={`dialog-container ${isBillingInfoClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}>
                <BillingInfoDelete InfoClose={handleCloseInfoDelete} />
              </div>
            </>
          )}

          {isBillingUpdateOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                }}
                onClick={handleCloseInfoUpdate} // Optional: close menu when clicking on the background
              ></div>

              <div className={`dialog-container ${isBillingUpdateClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '40%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}>
                <BillingInfoUpdate HandleUpdateClose={handleCloseInfoUpdate} />
              </div>
            </>
          )}

          {isDepositOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0, // Added right: 0
                  bottom: 0, // Added bottom: 0
                  width: '100vw', // Changed to viewport width
                  height: '100vh', // Changed to viewport height
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: '111133333311',
                }}

              >

              </div>

              <div className={`dialog-container ${isDepositClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: isSmallScreen ? '50%' : '50%', // Center horizontally
                  top: isSmallScreen ? '50%' :
                    isMediumScreen ? '45%' :
                      '45%',  // Center vertically
                  zIndex: '1111333333111',

                }}>

                <DepositMenu handleOpenDepositMenu={handleOpenDepositMenu} isClose={handleCloseDespositMenu}

                />
              </div>

            </>
          )}




        </div>
      </div>


    </LanguageProvider>
  );
}

function InvoiceId() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <InvoiceOne />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>


    </LanguageProvider>

  )
}
function BillingInvoice() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');


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

  const [isInvoiceDeleteOpen, setIsInvoiceDeleteOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);


  const handleOpenInvoice = () => {
    console.log('Clciked')
    setIsInvoiceDeleteOpen(true);

  };

  const handleCloseInvoice = () => {
    setIsInvoiceDeleteOpen(false);
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

  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

  // Function to open the dialog
  const handleOpenDialog = () => {
    if (isAnyCheckboxSelected) {
      // Logic to open the dialog
    } else {
      console.log("No invoices selected.");
    }
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <BillingInvoices isAnyCheckboxSelected={isAnyCheckboxSelected} SetOpenInvoice={handleOpenInvoice} />
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />
          {isInvoiceDeleteOpen && (
            <>
              <div className='BlurBG'
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
                onClick={handleCloseInvoice} // Optional: close menu when clicking on the background
              ></div>

              <div className={`dialog-container ${isClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed', // Changed to 'fixed' to center relative to viewport
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}>

                <InvoiceDelete handleCloseInvoice={handleCloseInvoice} />

              </div>

            </>
          )}





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
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>


    </LanguageProvider>

  )
}

function Programmingweb() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingmobile() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingdatabase() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');


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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingsoftware() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingdesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingcss() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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

        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingjs() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Programmingphp() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Programming />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Projectsdesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Designgraphic() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Designphotoshop() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Designvideo() {

  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Designlogo() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}


function Designmontage() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Designcreative() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Designidea() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Videodesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Design />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketingsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketinge() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Marketingmanagment() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Marketingsocial() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketingplan() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Marketingseo() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}


function Marketinginternet() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Marketing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Architecturesec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Architectureengineering() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Architectureinterior() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Architecturedesign() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Architectureidea() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Architecture3d() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Architectureplans() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Architecture />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Writingsec() {

  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingcontent() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingarticle() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingedit() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingreports() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingsearch() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Writingonline() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Writing />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Accountingfinance() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingevo() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountinganalysis() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingmanage() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Accountingtax() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Accountingadmin() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Accounting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customsupport() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customservice() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customdesk() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customlive() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Customemail() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Customtechnical() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )

}
function Customsocial() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Support />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingsec() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>

      </div>
    </LanguageProvider>

  )
}

function Consultingbusiness() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}

function Consultingfinancial() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}


function Consultingmarketing() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}
function Consultingit() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}

function Consultingresources() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}

function Consultinglegal() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}

function Consultingenvironmental() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




        </div>


      </div>
    </LanguageProvider>

  )
}

function Consultinghealth() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <Consulting />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />




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
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
          <AccountVerifey />
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
  const [isOfferCommentOpen, setIsOfferCommentOpen] = useState(false);
  const [isOfferCommentClosing, setIsOfferCommentClosing] = useState(false);
  const [isOfferDetailsOpen, setIsOfferDetailsOpen] = useState(false);
  const [isOfferDetailsClosing, setIsOfferDetailsClosing] = useState(false);
  const [isOfferAcceptedOpen, setIsOfferAcceptedOpen] = useState(false);
  const [isOfferAcceptedClosing, setIsOfferAcceptedClosing] = useState(false);
  const [isOfferDeclinedOpen, setIsOfferDeclinedOpen] = useState(false);
  const [isOfferDeclinedClosing, setIsOfferDeclinedClosing] = useState(false);
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
  const [gigOwnerId, setGigOwnerId] = useState(null); // Store gig owner ID
  const [isUserVerify, setIsUserVerifyOpen] = useState(false);
  const [isUserVerifyClosing, setIsUserVerifyClosing] = useState(false);



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


  const handleOpenOffer = (ownerId) => {
    setGigOwnerId(ownerId);
    setIsOfferCommentOpen(true);
    setIsOfferCommentClosing(false);
  };

  const handleCloseOffer = () => {
    setIsOfferCommentClosing(true);
  };




  useEffect(() => {
    if (isOfferCommentClosing) {
      const timer = setTimeout(() => {
        setIsOfferCommentOpen(false);
        setIsOfferCommentClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isOfferCommentClosing]);

  const handleOpenOfferDetails = (selectedOffer) => {
    setIsOfferDetailsOpen(true);
    setIsOfferDetailsClosing(false);
    setSelectedOffer(selectedOffer); // Store the selected offer
  };

  const handleCloseOfferDetails = () => {
    setIsOfferDetailsClosing(true);
  };




  useEffect(() => {
    if (isOfferDetailsClosing) {
      const timer = setTimeout(() => {
        setIsOfferDetailsOpen(false);
        setIsOfferDetailsClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isOfferDetailsClosing]);


  const [selectedOffer, setSelectedOffer] = useState(null); // Add this state at the top of your component



  const handleOpenOfferAccepted = (selectedOffer) => {
    setIsOfferAcceptedOpen(true);
    setIsOfferAcceptedClosing(false);
    setSelectedOffer(selectedOffer); // Store the selected offer



  };

  const handleCloseOfferAccepted = () => {
    setIsOfferAcceptedClosing(true);
  };




  useEffect(() => {
    if (isOfferAcceptedClosing) {
      const timer = setTimeout(() => {
        setIsOfferAcceptedOpen(false);
        setIsOfferAcceptedClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isOfferAcceptedClosing]);


  const handleOpenOfferDeclined = (selectedOffer) => {
    setIsOfferDeclinedOpen(true);
    setIsOfferDeclinedClosing(false);
    setSelectedOffer(selectedOffer); // Store the selected offer



  };

  const handleCloseOfferDeclined = () => {
    setIsOfferDeclinedClosing(true);
  };




  useEffect(() => {
    if (isOfferDeclinedClosing) {
      const timer = setTimeout(() => {
        setIsOfferDeclinedOpen(false);
        setIsOfferDeclinedClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isOfferDeclinedClosing]);



  const handleOpenUserVerify = () => {
    setIsUserVerifyOpen(true);
    setIsUserVerifyClosing(false);
  };

  const handleCloseUserVerify = () => {
    setIsUserVerifyClosing(true);
    const timer = setTimeout(() => {
      setIsUserVerifyOpen(false);
      setIsUserVerifyClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: isSmallScreen ? '0' :
              isTabletScreen ? '0' :
                '259px',
            marginRight: currentLanguage === 'ar' && isSmallScreen ? '0' :
              currentLanguage === 'ar' && isTabletScreen ? '0' :
                currentLanguage === 'ar' ? '259px' :
                  'unset',
            width: isTabletScreen ? '100%' :
              isSmallScreen ? '100%' :
                'calc(100% - 259px)',
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',
            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <SingleProjectOverView
            handleOpenOfferAccepted={handleOpenOfferAccepted}
            handleOpenOfferDetails={handleOpenOfferDetails}
            handleOpenOffer={handleOpenOffer}
            handleOpenOfferDeclined={handleOpenOfferDeclined}
            handleOpenUserVerify={handleOpenUserVerify}
          />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />

          {isOfferCommentOpen && (
            <>
              <div className="BlurBG"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isOfferCommentClosing ? 0 : 1,
                }}
                onClick={handleCloseOffer}
              />

              <div className={`dialog-container ${isOfferCommentClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: isMediumScreen ? '70%' : '84%',
                  maxWidth: '800px',
                  maxHeight: '600px',
                  margin: '0 auto',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                <div style={{
                  width: '100%',
                  height: 'auto',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                  '@media (max-width: 768px)': { // Adjust this breakpoint as needed
                    overflowX: 'auto', // Show horizontal scrollbar on smaller screens
                  }
                }}>
                  <Offertabs
                    handleCloseOffer={handleCloseOffer}
                    gigOwnerId={gigOwnerId}
                  />
                </div>
              </div>
            </>
          )}
          {isOfferDetailsOpen && (
            <>
              <div className="BlurBG"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isOfferDetailsClosing ? 0 : 1,
                }}
                onClick={handleCloseOfferDetails}
              />

              <div className={`dialog-container ${isOfferDetailsClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: isMediumScreen ? '70%' : '84%',
                  maxWidth: '800px',
                  minHeight: 'auto', // Allow the height to grow dynamically
                  maxHeight: '90vh', // Prevent it from going off-screen
                  margin: '0 auto',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                <div style={{
                  width: '100%',
                  height: 'auto', // Allow content to determine height
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                  '@media (max-width: 768px)': { // Adjust this breakpoint as needed
                    overflowX: 'auto', // Show horizontal scrollbar on smaller screens
                  }
                }}>
                  <OfferDetails
                    handleCloseOfferDetails={handleCloseOfferDetails}
                    selectedOffer={selectedOffer} // Pass the selected offer
                  />
                </div>
              </div>
            </>
          )}
          {isOfferAcceptedOpen && (
            <>
              <div className="BlurBG"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isOfferAcceptedClosing ? 0 : 1,
                }}
                onClick={handleCloseOfferAccepted}
              />

              <div className={`dialog-container ${isOfferAcceptedClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: isMediumScreen ? '70%' : '84%',
                  maxWidth: '800px',
                  minHeight: 'auto', // Allow the height to grow dynamically
                  maxHeight: '90vh', // Prevent it from going off-screen
                  margin: '0 auto',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                <div style={{
                  width: '100%',
                  height: 'auto', // Allow content to determine height
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                  '@media (max-width: 768px)': { // Adjust this breakpoint as needed
                    overflowX: 'auto', // Show horizontal scrollbar on smaller screens
                  }
                }}>
                  <OfferAccepted

                    selectedOffer={selectedOffer} // Pass the selected offer

                    handleCloseOfferAccepted={handleCloseOfferAccepted} />
                </div>
              </div>
            </>
          )}
          {isOfferDeclinedOpen && (
            <>
              <div className="BlurBG"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isOfferDeclinedClosing ? 0 : 1,
                }}
                onClick={handleCloseOfferDeclined}
              />

              <div className={`dialog-container ${isOfferDeclinedClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: '37%',
                  maxWidth: '800px',
                  minHeight: 'auto', // Allow the height to grow dynamically
                  maxHeight: '90vh', // Prevent it from going off-screen
                  margin: '0 auto',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                <div style={{
                  width: '100%',
                  height: 'auto', // Allow content to determine height
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                  '@media (max-width: 768px)': { // Adjust this breakpoint as needed
                    overflowX: 'auto', // Show horizontal scrollbar on smaller screens
                  }
                }}>
                  <OfferDeclined
                    selectedOffer={selectedOffer} // Pass the selected offer
                    handleCloseOfferDeclined={handleCloseOfferDeclined} />
                </div>
              </div>
            </>
          )}
          {isUserVerify && (
            <>

              <div
                className={`BlurBG ${isUserVerifyClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isUserVerifyClosing ? 0 : 1,
                }}
                onClick={handleCloseUserVerify}
              ></div>

              {/* Centered Dialog */}
              <div
                className={`dialog-container ${isUserVerifyClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  width: isSmallScreen ? '90%' :
                    isTabletScreen ? '80%' :
                      '55%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,

                }}
              >

                <IsUserVerifeyd
                  onClickOpen={handleOpenUserVerify}
                  onCloseClick={handleCloseUserVerify}

                />

              </div>
            </>
          )}





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
              position: 'absolute',
              left: '25%',
              top: '30%'

            }}
          >
            <CardSelect />
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>


          <Signup />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Responsive2() {
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>


          <Signin />




        </div>

      </div>
    </LanguageProvider>

  )
}
function Creation() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
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

  const handleSidenavMobileToggle = () => {
    setIsSidenavMobileOpen(!isSidenavMobileOpen);
  };
  const handleSidenavMobileClose = () => {
    setIsSidenavMobileOpen(false);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='Container'
          style={{
            background: '#111827',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>


          <ProfileSettings />




        </div>

      </div>
    </LanguageProvider>

  )
}

function FacebookCallbacks() {


  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');




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

      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <AccountCreation />
      </div>
    </LanguageProvider>


  )
}

function RouteTest() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')


  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
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


  // Helper function to detect Arabic text
  const containsArabic = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };


  const projectTitel = 'I will be Good'

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>
      <div className='MainContainer'
        style={{
          background: '#111827',
          height: '100vh',
          width: '100%',
          marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
          marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
          width: currentLanguage === 'ar'
            ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
            : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
          maxWidth: '1920px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'relative',
          gap: '20px',
          alignItems: 'center',
          WebkitOverflowScrolling: 'touch',
        }}
      >


        <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
        <Sidenav />
        <Typography
          sx={{
            color: 'white',
            fontFamily: containsArabic(projectTitel)
              ? '"Droid Arabic Kufi", serif'
              : '"Airbnbcereal", sans-serif',
            fontWeight: 'bold',
          }}
        >
          {projectTitel}
        </Typography>
        <FlipCountdown />


      </div>
    </LanguageProvider>
  );
}

function RankTest() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [isAchievementMenuOpen, setIsAchievementMenuOpen] = useState(true);
  const [isAchievementMenuClosing, setIsAchievementMenuClosing] = useState(false);
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
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

  // Firth modal handlers
  const handleOpenAchievementMenu = () => {
    setIsAchievementMenuOpen(true);
    setIsAchievementMenuClosing(false);
  };

  const handleCloseAchievementMenu = () => {
    setIsAchievementMenuClosing(true);
    const timer = setTimeout(() => {
      setIsAchievementMenuOpen(false);
      setIsAchievementMenuClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>
      <div className='MainContainer'
        style={{
          background: '#111827',
          height: '100vh',
          width: '100%',
          marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
          marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
          width: currentLanguage === 'ar'
            ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
            : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
          maxWidth: '1920px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden', // Prevent horizontal scroll
          overflowY: 'auto', // Keep vertical scroll working
          position: 'relative',

          gap: '20px',
          alignItems: 'center',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
        <RankDesign />

        <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
        <Sidenav />
        {isAchievementMenuOpen && (
          <>
            <div className={`BlurBG ${isAchievementMenuClosing ? 'closing' : ''}`}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                zIndex: 999,
                transition: 'opacity 0.3s ease-out',

              }}
              onClick={handleCloseAchievementMenu}
            />

            <div className={`dialog-container ${isAchievementMenuClosing ? 'hide' : 'show'}`}
              style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center center',
                zIndex: 1000,
                width: '80%',
                maxWidth: '135  0px',
                maxWidth: '1500px',
                height: '90vh', // Fixed height relative to viewport
                maxHeight: '800px', // Maximum height
                margin: '0 auto',
                borderRadius: '12px', // Optional: rounded corners
                display: 'flex',
                flexDirection: 'column',

              }}>
              <div style={{
                width: '100%',

                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '20px',
                boxSizing: 'border-box',
                // Optional: custom scrollbar styling
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(1, 1, 1, 0.2)',
                  borderRadius: '4px',
                },
              }}>
                <AchievmentsTest onClickOpen={handleOpenAchievementMenu} onCloseClick={handleCloseAchievementMenu} />
              </div>
            </div>
          </>
        )}





      </div>
    </LanguageProvider>
  );
}
function RankTest2() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);

  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
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
    <LanguageProvider value={{ currentLanguage, toggleLanguage }}>
      <div className='MainContainer'
        style={{
          background: '#111827',
          height: '100vh',
          width: '100%',

          width: '100%',
          maxWidth: '1920px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden', // Prevent horizontal scroll
          overflowY: 'auto', // Keep vertical scroll working
          position: 'relative',

          gap: '20px',
          alignItems: 'center',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <ChatAppSearchBox />

        <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />





      </div>
    </LanguageProvider>
  );
}


function Settings() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');
  const [verifyId, setVerifyId] = useState(false);
  const [verifyIdClose, setVerifyIdClose] = useState(false);
  const [isRankMenuOpen, setIsRankMenuOpen] = useState(false);
  const [isRankMenuClosing, setIsRankMenuClosing] = useState(false);
  const [isReviewMenuOpen, setIsReviewMenuOpen] = useState(false);
  const [isReviewMenuClosing, setIsReviewMenuClosing] = useState(false);
  const [isAchievementMenuOpen, setIsAchievementMenuOpen] = useState(false);
  const [isAchievementMenuClosing, setIsAchievementMenuClosing] = useState(false);
  const [isProfileUpdatedOpen, setIsProfileUpdatedOpen] = useState(false);
  const [isProfileUpdatedClosing, setIsProfileUpdatedClosing] = useState(false);
  const [isEmailUpdatedOpen, setIsEmailUpdatedOpen] = useState(false);
  const [isEmailUpdatedClosing, setIsEmailUpdatedClosing] = useState(false);
  const [isPasswordUpdatedOpen, setIsPasswordUpdatedOpen] = useState(false);
  const [isPasswordUpdatedClosing, setIsPasswordUpdatedClosing] = useState(false);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const [isPhoneCodeClosing, setIsPhoneCodeClosing] = useState(false);
  const [isNewEmailOpen, setIsNewEmailOpen] = useState(false);
  const [isNewEmailClosing, setIsNewEmailClosing] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');




  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }

  }, []);

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
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


  const handleOpenEmailUpdated = () => {
    setIsEmailUpdatedOpen(true);
    setIsEmailUpdatedClosing(false);
  };

  const handleCloseEmailUpdated = () => {
    setIsEmailUpdatedClosing(true);
    const timer = setTimeout(() => {
      setIsEmailUpdatedOpen(false);
      setIsEmailUpdatedClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };


  const handleOpenNewEmail = () => {
    setIsNewEmailOpen(true);
    setIsNewEmailClosing(false);
  };

  const handleCloseNewEmail = () => {
    setIsNewEmailClosing(true);
    const timer = setTimeout(() => {
      setIsNewEmailOpen(false);
      setIsNewEmailClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };


  const handleOpenPhoneCode = () => {
    setIsPhoneCodeOpen(true);
    setIsPhoneCodeClosing(false);
  };

  const handleClosePhoneCode = () => {
    setIsPhoneCodeClosing(true);
    const timer = setTimeout(() => {
      setIsPhoneCodeOpen(false);
      setIsPhoneCodeClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };





  // Second modal handlers
  const handleOpenRankMenu = () => {
    setIsRankMenuOpen(true);
    setIsRankMenuClosing(false);
  };

  const handleCloseRankMenu = () => {
    setIsRankMenuClosing(true);
    const timer = setTimeout(() => {
      setIsRankMenuOpen(false);
      setIsRankMenuClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  // Third modal handlers
  const handleOpenReviewMenu = () => {
    setIsReviewMenuOpen(true);
    setIsReviewMenuClosing(false);
  };

  const handleCloseReviewMenu = () => {
    setIsReviewMenuClosing(true);
    const timer = setTimeout(() => {
      setIsReviewMenuOpen(false);
      setIsReviewMenuClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };


  const handleOpenAchievementMenu = () => {
    setIsAchievementMenuOpen(true);
    setIsAchievementMenuClosing(false);
  };

  const handleCloseAchievementMenu = () => {
    setIsAchievementMenuClosing(true);
    const timer = setTimeout(() => {
      setIsAchievementMenuOpen(false);
      setIsAchievementMenuClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };




  const handleOpenProfileUpdated = () => {
    setIsProfileUpdatedOpen(true);
    setIsProfileUpdatedClosing(false);
  };

  const handleCloseProfileUpdated = () => {
    setIsProfileUpdatedClosing(true);
    const timer = setTimeout(() => {
      setIsProfileUpdatedOpen(false);
      setIsProfileUpdatedClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };


  // Six Modal Handlers 

  // First modal handlers
  const handleOpenUpdatedPassword = () => {
    setIsPasswordUpdatedOpen(true);
    setIsPasswordUpdatedClosing(false);
  };

  const handleCloseUpdatedPassword = () => {
    setIsPasswordUpdatedClosing(true);
    const timer = setTimeout(() => {
      setIsPasswordUpdatedOpen(false);
      setIsPasswordUpdatedClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  };



  const handleOpenVerify = () => {
    setVerifyId(true);
    setVerifyIdClose(false);
  };

  const handleCloseVerify = () => {
    setVerifyIdClose(true);
  };

  useEffect(() => {
    if (verifyIdClose) {
      const timer = setTimeout(() => {
        setVerifyId(false);
        setVerifyIdClose(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [verifyIdClose]);



  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >


      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',
            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >



          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <AccountSettings
            isProfileUpdatedOpen={isProfileUpdatedOpen}
            setIsProfileUpdatedOpen={setIsProfileUpdatedOpen}
            setIsPasswordUpdatedOpen={setIsPasswordUpdatedOpen}
            ocClickAchievement={handleOpenAchievementMenu}
            onClickOpen={handleOpenReviewMenu}
            ocClickOpen={handleOpenRankMenu}
            handleOpenEmailUpdated={handleOpenEmailUpdated}
            VerifyId={handleOpenVerify}
            handleOpenPhoneCode={handleOpenPhoneCode}
            handleOpenNewEmail={handleOpenNewEmail}
          />

          <Sidenav />
          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          {verifyId && (
            <>
              <div
                className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  display: 'flex',  // Add flex display
                  alignItems: 'center',  // Center vertically
                }}
                onClick={handleCloseVerify}
              />

              <div
                className={`dialog-container ${verifyIdClose ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '31%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: 'fit-content',
                  margin: 'auto',
                }}
              >
                <VerificationId handleCloseVerify={handleCloseVerify} />
              </div>
            </>
          )}
          {isRankMenuOpen && (
            <>
              <div className="BlurBG ${isRankMenuClosing ? 'closing' : ''}"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isRankMenuClosing ? 0 : 1,
                }}
                onClick={handleCloseRankMenu}
              />

              <div className="dialog-container ${isRankMenuClosing ? 'hide' : 'show'}"
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: isMediumScreen ? '98%' : '84%',
                  maxWidth: '1500px',
                  height: '95vh',
                  maxHeight: '900px',
                  margin: '0 auto',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                  '@media (max-width: 768px)': { // Adjust this breakpoint as needed
                    overflowX: 'auto', // Show horizontal scrollbar on smaller screens
                  }
                }}>
                  <RankRspoDesign ocClickOpen={handleOpenRankMenu} onCloseClick={handleCloseRankMenu} />
                </div>
              </div>
            </>
          )}
          {isReviewMenuOpen && (
            <>
              <div className={`BlurBG ${isReviewMenuClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isRankMenuClosing ? 0 : 1,
                }}
                onClick={handleCloseReviewMenu}
              />

              <div className={`dialog-container ${isReviewMenuClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: isMediumScreen ? '90%' : '80%',
                  maxWidth: '135  0px',
                  maxWidth: '1500px',
                  height: '90vh', // Fixed height relative to viewport
                  maxHeight: '800px', // Maximum height
                  margin: '0 auto',
                  borderRadius: '12px', // Optional: rounded corners
                  display: 'flex',
                  flexDirection: 'column',

                }}>
                <div style={{
                  width: '100%',

                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  boxSizing: 'border-box',

                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(1, 1, 1, 0.2)',
                    borderRadius: '4px',
                  },
                }}>
                  <ReviewRespoDesign onClickOpen={handleOpenReviewMenu} onCloseClick={handleCloseReviewMenu} />
                </div>
              </div>
            </>
          )}
          {isAchievementMenuOpen && (
            <>
              <div className={`BlurBG ${isAchievementMenuClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isRankMenuClosing ? 0 : 1,
                }}
                onClick={handleCloseAchievementMenu}
              />

              <div className={`dialog-container ${isAchievementMenuClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: isMediumScreen ? '98%' : '80%',
                  maxWidth: '135  0px',
                  maxWidth: '1500px',
                  maxHeight: '800px', // Maximum height
                  margin: '0 auto',
                  borderRadius: '12px', // Optional: rounded corners
                  display: 'flex',
                  flexDirection: 'column',

                }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '20px',
                  boxSizing: 'border-box',
                  // Optional: custom scrollbar styling
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(1, 1, 1, 0.2)',
                    borderRadius: '4px',
                  },
                }}>
                  <AchievmentsTest onClickOpen={handleOpenAchievementMenu} onCloseClick={handleCloseAchievementMenu} />
                </div>
              </div>
            </>
          )}
          {isProfileUpdatedOpen && (
            <>
              {/* Background Blur */}
              <div
                className={`BlurBG ${isProfileUpdatedClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isProfileUpdatedClosing ? 0 : 1,
                }}
                onClick={handleCloseProfileUpdated}
              ></div>

              {/* Centered Dialog */}
              <div
                className={`dialog-container ${isProfileUpdatedClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  width: isSmallScreen ? '90%' : '55%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}
              >

                <ProfileUpdatedSucces
                  onClickOpen={handleOpenProfileUpdated}
                  onCloseClick={handleCloseProfileUpdated}
                />

              </div>
            </>
          )}
          {isEmailUpdatedOpen && (
            <>
              {/* Background Blur */}
              <div
                className={`BlurBG ${isEmailUpdatedClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isEmailUpdatedClosing ? 0 : 1,
                }}
                onClick={handleCloseEmailUpdated}
              ></div>

              {/* Centered Dialog */}
              <div
                className={`dialog-container ${isEmailUpdatedClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  width: isSmallScreen ? '90%' : '55%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}
              >

                <AccountEmailVerify
                  onClickOpen={handleOpenEmailUpdated}
                  onCloseClick={handleCloseEmailUpdated}
                />

              </div>
            </>
          )}
          {isPasswordUpdatedOpen && (
            <>
              <div
                className={`BlurBG ${isPasswordUpdatedClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  display: 'flex',  // Add flex display
                  alignItems: 'center',  // Center vertically
                }}
                onClick={handleCloseUpdatedPassword}
              />

              <div
                className={`dialog-container ${isPasswordUpdatedClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',  // Changed to fixed
                  left: '50%',
                  top: '48%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                  width: '40%',
                  margin: 'auto',  // Additional centering
                }}
              >
                <ProfilePasswordUpdatedSucces handleCloseVerify={handleCloseUpdatedPassword} />
              </div>
            </>
          )}
          {isPhoneCodeOpen && (
            <>
              {/* Background Blur */}
              <div
                className={`BlurBG ${isPhoneCodeClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isPhoneCodeClosing ? 0 : 1,
                }}
                onClick={handleClosePhoneCode}
              ></div>

              {/* Centered Dialog */}
              <div
                className={`dialog-container ${isPhoneCodeClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  width: isSmallScreen ? '90%' :
                    isTabletScreen ? '80%' :
                      '55%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,

                }}
              >

                <PhoneCodeVefify
                  onClickOpen={handleOpenPhoneCode}
                  onCloseClick={handleClosePhoneCode}

                />

              </div>
            </>
          )}
          {isNewEmailOpen && (
            <>
              {/* Background Blur */}
              <div
                className={`BlurBG ${isNewEmailClosing ? 'closing' : ''}`}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 999,
                  transition: 'opacity 0.3s ease-out',
                  opacity: isNewEmailClosing ? 0 : 1,
                }}
                onClick={handleCloseNewEmail}
              ></div>

              {/* Centered Dialog */}
              <div
                className={`dialog-container ${isNewEmailClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  width: isSmallScreen ? '90%' :
                    isTabletScreen ? '80%' :
                      '55%',
                  maxWidth: '900px',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                  zIndex: 1000,
                }}
              >

                <NewEmail2Fauth
                  onClickOpen={handleOpenNewEmail}
                  onCloseClick={handleCloseNewEmail}
                />

              </div>
            </>
          )}






        </div>
      </div>

    </LanguageProvider>
  );
}

function HireFreelancer() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <HireAFreelancer />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />





        </div>

      </div>


    </LanguageProvider>

  )
}

function UsersPlans() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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

  const [isMemberShipOpen, setIsMemberShipOpen] = useState(false);
  const [isMemberShipClosing, setIsMemberShipClosing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Track the selected plan

    // Handle plan selection
    const handlePlanSelection = (plan) => {
      setSelectedPlan(plan); // Set the selected plan
      handleOpenMemberShipMenu(); // Open the payment menu
    };

  // Cards Menu Handling
  const handleOpenMemberShipMenu = () => {
    setIsMemberShipOpen(true);
    setIsMemberShipClosing(false);
  };

  const handleCloseMemberShipMenu = () => {
    setIsMemberShipClosing(true);
  };

  useEffect(() => {
    if (isMemberShipClosing) {
      const timer = setTimeout(() => {
        setIsMemberShipOpen(false);
        setIsMemberShipClosing(false);
      }, 300); // Animation duration: 300ms
      return () => clearTimeout(timer);
    }
  }, [isMemberShipClosing]);


  useEffect(() => {
    const shouldOpenMenu = localStorage.getItem('shouldOpenMemberShipMenu');

    if (shouldOpenMenu === 'true') {
      // Clear the flag immediately
      localStorage.removeItem('shouldOpenMemberShipMenu');

      
      setTimeout(() => {
        handleOpenMemberShipMenu();
      }, 300);
    }
  }, []);


  return (
    <LanguageProvider value={{ currentLanguage, toggleLanguage }} >

      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <OurPlans handlePlanSelection={handlePlanSelection}  handleOpenMemberShipMenu={handleOpenMemberShipMenu}  />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />

          {isMemberShipOpen && (
            <>
              <div className='BlurBG'
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0, // Added right: 0
                  bottom: 0, // Added bottom: 0
                  width: '100vw', // Changed to viewport width
                  height: '100vh', // Changed to viewport height
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(5px)',
                  zIndex: '111133333311',
                }}

              >

              </div>

              <div className={`dialog-container ${isMemberShipClosing ? 'hide' : 'show'}`}
                style={{
                  position: 'fixed',
                  left: isSmallScreen ? '50%' : '50%', // Center horizontally
                  top: isSmallScreen ? '50%' :
                    isMediumScreen ? '45%' :
                      '45%',  // Center vertically
                  zIndex: '1111333333111',

                }}>

                <PayMemberShipMenu
                 handleOpenMemberShipMenu={handleOpenMemberShipMenu}
                  isClose={handleCloseMemberShipMenu}
                  selectedPlan={selectedPlan} // Pass the selected plan

                />
              </div>

            </>
          )}



        </div>

      </div>


    </LanguageProvider>

  )
}
function Showcase() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />
          <ProjectMobile />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />





        </div>

      </div>


    </LanguageProvider>

  )
}

function NewBuyerProject() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavRespo onSidenavMobileToggle={handleSidenavMobileToggle} />

          <AddNewProject />

          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />
          <Sidenav />





        </div>

      </div>


    </LanguageProvider>

  )
}


function Admin() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AdminSideNav />
          <AdminNavBar />
          <Users />



          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />






        </div>

      </div>


    </LanguageProvider>

  )
}

function UserDetails() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AdminSideNav />
          <AdminNavBar />
          <UserFulldeatils />



          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />






        </div>

      </div>


    </LanguageProvider>

  )
}

function UsersConversations() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AdminSideNav />
          <AdminNavBar />
          <AdminConversations />



          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />






        </div>

      </div>


    </LanguageProvider>

  )
}

function Admingigs() {
  const [isSidenavMobileOpen, setIsSidenavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
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
        <div className='MainContainer'
          style={{
            background: '#111827',
            height: '100vh',
            width: '100%',
            marginLeft: currentLanguage === 'ar' ? 'unset' : (isSmallScreen || isTabletScreen ? '0' : '259px'),
            marginRight: currentLanguage === 'ar' ? (isSmallScreen || isTabletScreen ? '0' : '259px') : 'unset',
            width: currentLanguage === 'ar'
              ? (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)')
              : (isSmallScreen || isTabletScreen ? '100%' : 'calc(100% - 259px)'),
            maxWidth: '1920px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden', // Prevent horizontal scroll
            overflowY: 'auto', // Keep vertical scroll working
            position: 'relative',

            gap: '20px',
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AdminSideNav />
          <AdminNavBar />
          <AdmingigsControlle />




          <SidenavMobile isOpen={isSidenavMobileOpen} onClose={handleSidenavMobileClose} />






        </div>

      </div>


    </LanguageProvider>

  )
}

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isOverlayVisible, setOverlayVisible] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(true);

  const previousPathRef = useRef(location.pathname);

  // Define routes where the Snackbar and Overlay should appear
  const routesWithSnackbar = [
    '/userdashboard',
    '/userdashboard/profile',
    '/userdashboard/billing',
    '/userdashboard/project',
  ];

  const routesWithOverlay = [
    '/',
    '/userdashboard',
    '/userdashboard/project',
    '/userdashboard/profile',
    '/userdashboard/profile/settings',
  ];

  useEffect(() => {
    // Only trigger animations if the path has actually changed
    const isPathChanged = previousPathRef.current !== location.pathname;
    previousPathRef.current = location.pathname;

    // Handle Snackbar visibility
    if (routesWithSnackbar.includes(location.pathname)) {
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }

    // Handle Overlay visibility only on actual route changes
    if (isPathChanged && routesWithOverlay.includes(location.pathname)) {
      setOverlayVisible(true);
      const timer = setTimeout(() => setOverlayVisible(false), 1000);
      return () => clearTimeout(timer);
    } else if (!isPathChanged) {
      setOverlayVisible(false);
    }
  }, [location.pathname]);

  const handleSnackbarClose = () => {
    setShowSnackbar(false); // Dismiss the Snackbar when close icon is clicked
  };

  const { callState } = useChat();
  return (
    <>
      <OverlayAnimation isVisible={isOverlayVisible} />

      <>
        <ScrollToTop />
        <AnimatePresence mode='wait'>
          <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
            <ContainerProvider>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="Register" element={<Login />} />
                <Route path="/auth/signup" element={<Responsive1 />} />
                <Route path="/auth/signin" element={<Responsive2 />} />
                <Route path="/auth/AccountCreation" element={<FacebookCallbacks />} />
                <Route path="/routefortest" element={<RouteTest />} />
                <Route path="/rank" element={<RankTest />} />
                <Route path="/rank1" element={<RankTest2 />} />
                <Route path="respo" element={<Responsive />} />
                <Route path="/privatesection" element=
                  {
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>

                  } />
                     <Route path="/privatesection/user/fulldetails/:userId" element=
                  {
                    <AdminRoute>
                      <UserDetails />
                    </AdminRoute>

                  } />
                           <Route path="/privatesection/conversations" element=
                  {
                    <AdminRoute>
                      <UsersConversations />
                    </AdminRoute>

                  } />
                <Route path="/privatesection/gigs" element={
                  <AdminRoute>
                    <Admingigs />
                  </AdminRoute>
                } />
                <Route
                  path="/userdashboard/project/singlepost/:gigId"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Singlepost />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route path="Login" element={<Login />} />
                <Route path="account" element={<Creation />} />
                <Route path="/dThZslg3uJ5rQ4OBZImUgcYZo7tGfhpJ/verifyunauth" element={<Login1 />} />
                <Route
                  path="/userdashboard/buyers/hirefreelancer"
                  element={
                    <ProtectedRoute>
                      <HireFreelancer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/membership"
                  element={
                    <ProtectedRoute>
                      <UsersPlans />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/buyers/projects/newproject"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <NewBuyerProject />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/buyers/showcase"
                  element={
                    <ProtectedRoute>
                      <Showcase />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/userdashboard"
                  element={
                    <ProtectedRoute>
                      <User />
                    </ProtectedRoute>
                  }
                />
                <Route path="dailog" element={<Drawer />} />
                <Route
                  path="/userdashboard/project"
                  element={
                    <GigProvider>
                      <Projects />
                    </GigProvider>
                  }
                />
                <Route
                  path="/userdashboard/users/:slug"
                  element={<SingleUser />}
                />
                <Route
                  path="/userdashboard/profile/messages"
                  element={
                    <ProtectedRoute>
                      <UsersMessages callState={callState} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/billing/userinvoices/id"
                  element={
                    <ProtectedRoute>
                      <InvoiceId />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/profile/settings"
                  element={
                    <UserProvider>
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    </UserProvider>
                  }
                />
                <Route
                  path="/userdashboard/billing"
                  element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userdashboard/text"
                  element={
                    <ProtectedRoute>
                      <Text />
                    </ProtectedRoute>
                  }
                />
                {/* Wrap all /userdashboard/projects/... routes with GigProvider */}
                <Route
                  path="/userdashboard/projects/categories/programming"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Projectsprogramming />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Projectsdesign />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/web-development"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingweb />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/mobileapp-development"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingmobile />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/database-development"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingdatabase />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/software-engineering"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingsoftware />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/website-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingdesign />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/css-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingcss />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/javascript-development"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingjs />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/programming/php-development"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Programmingphp />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/graphic-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designgraphic />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/photoshop"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designphotoshop />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/video-production"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designvideo />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/logo-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designlogo />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/video-montage"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designmontage />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/creative-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designcreative />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/design-idea"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Designidea />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/design/video-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Videodesign />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketingsec />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing/e-marketing"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketinge />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing/marketing-managment"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketingmanagment />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing/marketing-social"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketingsocial />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing/marketing-plan"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketingplan />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing/marketing-seo"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketingseo />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/marketing/marketing-internet"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Marketinginternet />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architecturesec />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture/architecture-engineering"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architectureengineering />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture/architecture-interior"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architectureinterior />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture/architecture-design"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architecturedesign />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture/architecture-idea"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architectureidea />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture/architecture-3d"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architecture3d />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/architecture/architecture-plans"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Architectureplans />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingsec />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing/writing-content"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingcontent />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing/writing-articles"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingarticle />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing/content-editing"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingedit />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing/writing-reports"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingreports />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing/research-scientific"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingsearch />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/writing/writing-online"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Writingonline />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountingsec />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting/financial-accounting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountingfinance />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting/financial-evaluation"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountingevo />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting/financial-analysis"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountinganalysis />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting/financial-management"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountingmanage />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting/tax-strategy"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountingtax />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/accounting/administrative-reports"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Accountingadmin />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customsupport />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support/customer-service"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customservice />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support/technical-support"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customtechnical />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support/desk-support"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customdesk />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support/live-chat-support"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customlive />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support/email-support"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customemail />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/support/social-media-support"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Customsocial />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingsec />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/business-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingbusiness />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/financial-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingfinancial />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/marketing-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingmarketing />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/it-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingit />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/human-resources-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingresources />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/legal-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultinglegal />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/environmental-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultingenvironmental />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/projects/categories/consulting/health-consulting"
                  element={
                    <ProtectedRoute>
                      <GigProvider>
                        <Consultinghealth />
                      </GigProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/billing/userinvoices"
                  element={
                    <ProtectedRoute>
                      <BillingInvoice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="userdashboard/post"
                  element={<Postsec />}
                />
              </Routes>
            </ContainerProvider>
          </GoogleReCaptchaProvider>
        </AnimatePresence>
      </>
    </>
  );
};


const App = () => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
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
    <Router>
      <ScrollToTop />
      <Toaster
        containerStyle={{
          top: isSmallScreen ? '100px' :
            '40px',    // Distance from the top
          left: isSmallScreen && currentLanguage === 'ar' ? '40px' :
            currentLanguage === 'ar' ? '-480px' :
              isSmallScreen ? '20px' :
                '470px',   // Distance from the left
          width: isSmallScreen && currentLanguage === 'ar' ? '98%' : 'unset',

        }}
        toastOptions={{
          style: {
            textWrap: 'nowrap',


          },
        }}
      />
      <ToastContainer />
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>

        <UserProvider>
          <ChatProvider>
            <ProjectProvider>
              <BillingProvider>
                <NotificationProvider>
                  <AnimatedRoutes />
                </NotificationProvider>
              </BillingProvider>
            </ProjectProvider>
          </ChatProvider>
        </UserProvider>

      </GoogleReCaptchaProvider>
    </Router>
  );
};


export default App;