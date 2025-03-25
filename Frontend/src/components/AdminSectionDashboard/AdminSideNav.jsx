import React from 'react';
import { FaHome, FaWallet, FaDiscord, FaTelegram, FaReddit } from 'react-icons/fa';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import i18n from 'i18next';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket,  faDiagramProject, faMoneyCheckDollar, faUserDoctor, faBell, faUserTie, faBriefcase, faChartPie, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane, faDiscord, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { fontSize } from '@mui/system';
import { useUser } from '../../Context/UserContext.jsx'


const AdminSideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    i18n
      .changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch((error) => console.error('Error changing language:', error));
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);
  const [selectedButton, setSelectedButton] = useState('');
  const [loading, setLoading] = useState(false);

  // Highlight the active menu based on route
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/privatesection') setSelectedButton('Users');
    else if (pathname.startsWith('/userdashboard/project')) setSelectedButton('Project');
    else if (pathname.startsWith('/userdashboard/billing')) setSelectedButton('Billing');
    else if (pathname.startsWith('/userdashboard/profile')) setSelectedButton('Profile');
    else if (pathname.startsWith('/userdashboard/buyers/hirefreelancer')) setSelectedButton('Hire a Freelancer');
    else if (pathname.startsWith('/userdashboard/buyers/showcase')) setSelectedButton('Showcase');
  }, [location]);

  const handleNavigation = (path, label) => {
    setSelectedButton(label);
    navigate(path);
  };


  const handleLogout = async () => {
    setLoading(true); // Set loading state to true

    // Wait for 2 seconds before making the request
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:8800/server/auth/logout', {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to logout');
        }

        const data = await response.json();
        console.log(data.message); // Optional: Log the response message
        // Optionally, clear any user data stored in localStorage if necessary
        localStorage.removeItem('userData'); // Adjust this to your actual user data key

        // Redirect to login or home page
        navigate('/auth/signin'); // Use navigate for redirection
      } catch (error) {
        console.error('Logout error:', error);
        // Optionally, set an error message state here to show to the user
      } finally {
        setLoading(false); // Reset loading state
      }
    }, 2000); // 2 seconds delay before making the request
  };


  const { isSeller , isBuyer} = useUser();

  return (
    <div
      style={{
        width: currentLanguage === 'ar' ? '260px' :
          '250px',
        height: 'calc(100vh - 16px)',
        background: '#0B1221',
        borderRadius: '15px',
        padding: '20px',
        border: '2px solid rgba(255, 255, 255, 0.18)',
        display: isTabletScreen || isSmallScreen ? 'none' : 'block',
        position: 'fixed',
        top: '9px',
        overflow: 'auto',
        left: currentLanguage === 'ar' ? 'auto' : '10px',
        right: currentLanguage === 'ar' ? '10px' : 'auto',
        backgroundImage: `
         radial-gradient(
          circle at left center,
          rgba(20, 30, 48, 0.4) 0%,
          rgba(36, 59, 85, 0.1) 10%,
          transparent 70%
        ),
        radial-gradient(
          circle at right center,
          rgba(20, 30, 48, 0.4) 0%,
          rgba(36, 59, 85, 0.1) 40%,
          transparent 70%
        ),
        radial-gradient(
          circle at left center,
          rgba(20, 30, 48, 0.4) 0%,
          rgba(36, 59, 85, 0.1) 10%,
          transparent 70%
        ),
         radial-gradient(
          circle at left center,
          rgba(20, 30, 48, 0.4) 0%,
          rgba(36, 59, 85, 0.1) 30%,
          transparent 70%
        )
      `,


      }}
    >
      {/* Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top Section */}
        <div>
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <img
              style={{ maxWidth: '100%', height: 'auto' }}
              src="https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png"
              alt="Logo"
            />
          </div>
          {/* Menu List */}
          <div className='MenuListContainer'
           style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className='Users'
              style={getMenuButtonStyle(selectedButton === 'Users')}
              onClick={() => handleNavigation('/privatesection', 'Users')}
            >
              <FontAwesomeIcon icon={faUserDoctor}
                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Users')}</span>

            </button>
            <button className='Project'
              style={getMenuButtonStyle(selectedButton === 'Project')}
              onClick={() => handleNavigation('/privatesection/gigs', 'Project')}
            >

              <FontAwesomeIcon icon={faDiagramProject}
                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Projects')}</span>
            </button>
          

            <button className='Conversarions'
              style={getMenuButtonStyle(selectedButton === 'Conversarions')}
              onClick={() => handleNavigation('/privatesection/conversations', 'Conversarions')}
            >
              <FontAwesomeIcon icon={faMoneyCheckDollar}
                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Conversarions')}</span>
            </button>
            <button className='Profile'
              style={getMenuButtonStyle(selectedButton === 'Profile')}
              onClick={() => handleNavigation('/userdashboard/profile', 'Profile')}
            >
              <FontAwesomeIcon icon={faUserDoctor}
                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Profile')}</span>
            </button>
            <button
              style={getMenuButtonStyle(selectedButton === '')}
              onClick={() => handleNavigation('/userdashboard/profile', 'Profile')}
            >
              <FontAwesomeIcon icon={faBell}
                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Notifications')}</span>
            </button>
            <button
              style={getMenuButtonStyle(selectedButton === '')}
              onClick={() => handleNavigation('/userdashboard/profile', 'Profile')}
            >
              <FontAwesomeIcon icon={faMoneyBillTransfer}

                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Withdraw')}</span>
            </button>
            <button
              style={getMenuButtonStyle(selectedButton === '')}
              onClick={() => handleNavigation('/userdashboard/profile', 'Profile')}
            >
              <FontAwesomeIcon icon={faChartPie}

                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
              <span style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Analytics Tools')}</span>

            </button>
            <button className='Signout'
            style={getMenuButtonStyle(selectedButton === '')}
              onClick={() => {
                setSelectedButton('SignOut');
                handleLogout(); // Call logout function
              }}
              
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket}

                style={{
                  marginRight: '12px', fontSize: '17px',
                  transform: 'rotate(0deg)',
                  verticalAlign: 'middle', // Aligns with text

                }} />
                    {loading ? (
            <div className="lds-dual-ring" style={{ margin: 'auto' }}></div> // Show loading ring
          ) : (
              <span 
              style={{ marginRight: currentLanguage === 'ar' ? '8px' : 'unset', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>
                {t('SignOut')}
                </span>
          )}

            </button>

          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <SocialIcon
              icon={
                <TelegramIcon
                  style={{
                    color: '#2196F3',
                    filter: 'brightness(1.1)',
                    fontSize: '24px',
                    transition: 'filter 0.3s ease',


                  }}
                />
              }
              style={{ background: 'transparent' }} // This removes the background
            />

            <SocialIcon
              icon={
                <FontAwesomeIcon
                  icon={faDiscord}
                  style={{
                    color: '#5865F2', // Discord's official blue color
                    filter: 'brightness(1.1)',
                    fontSize: '18px',
                    transition: 'filter 0.3s ease',
                    transform: 'rotate(0deg)',

                  }}
                />
              }
            />

            <SocialIcon
              icon={
                <FontAwesomeIcon
                  icon={faRedditAlien}
                  style={{
                    color: '#FF4500', // Reddit's official orange color
                    filter: 'brightness(1.1)',
                    fontSize: '22px',
                    transition: 'filter 0.3s ease',
                    transform: 'rotate(0deg)',


                  }}
                />
              }
            />
          </div>
          <div style={{ textAlign: 'center', cursor: 'pointer' }}>
            <RiArrowLeftSLine size={24} color="#fff" />
            <span style={{ color: '#fff', marginLeft: '5px' }}>Collapse Sidebar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const getMenuButtonStyle = (isActive, currentLanguage) => ({
  display: 'flex',
  alignItems: 'center',
  background: isActive ? 'rgb(91, 193, 253)' : 'transparent',
  borderRadius: '10px',
  padding: '12px 16px',
  cursor: 'pointer',
  fontSize: '15px',
  border: 'none',
  color: isActive ? '#ffffff' : '#ffffff',
  fontWeight: isActive ? 'bold' : 'bold',
  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

});

const SocialIcon = ({ icon }) => (
  <div
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '39%',
      border: '1px solid #2f374d',
      display: 'flex',
      background: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
      textShadow: '0 0 10px #2196F3'
    }}
  >
    {icon}
  </div>
);

export default AdminSideNav;
