
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../Context/UserContext.jsx';
import { Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import InventoryIcon from '@mui/icons-material/Inventory';
import AvatarGroup from '@mui/material/AvatarGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import MyChart from '../chart/Mychart';
import Linechart from '../chart/Linechart';
import MyLineChart3 from '../chart/MyLineChart3';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MailLockIcon from '@mui/icons-material/MailLock';
import PaidIcon from '@mui/icons-material/Paid';
import { Card, Skeleton } from "@nextui-org/react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import MainTable from './MainTable';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const loadingKeyframes = `
 @keyframes loading {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
            `;

function DashboardRespo() {


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
  const navigate = useNavigate();
  const theme = useTheme();
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder1000px = useMediaQuery('(max-width:1000px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isUltraSmallScreen = useMediaQuery('(max-width:380px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');


  const getWidth = () => {
    if (isScreenUnder500px) return '99%';
    if (isScreenUnder768px) return '92%';
    if (isScreenUnder1000px) return 'calc(50% - 30px)';
    return 'calc(25% - 30px)';
  };
  const getWidthChart = () => {
    if (isScreenUnder500px) return '96%';
    if (isScreenUnder768px) return '97%';
    if (isScreenUnder1000px) return 'calc(50% - 30px)';
    return 'calc(32% - 30px)';
  };
  const getTaskChart = () => {
    if (isScreenUnder500px) return '96%';
    if (isScreenUnder768px) return '97%';
    if (isScreenUnder1000px) return 'calc(100% - 30px)';
    return 'calc(32% - 30px)';
  };
  const getWidthChart1 = () => {
    if (isScreenUnder500px) return '94%';
    if (isScreenUnder768px) return '95%';
    if (isScreenUnder1000px) return 'calc(102% - 30px)';
    return 'calc(102% - 30px)';
  };
  const getOrder = () => {
    if (isScreenUnder500px) return '102%';
    if (isScreenUnder768px) return '95%';
    if (isScreenUnder1000px) return 'calc(106% - 30px)';
    return 'calc(33% - 30px)';
  };

  const boxesRef = useRef([]);
  useEffect(() => {
    boxesRef.current.forEach((box) => {
      const divider = box.querySelector('.Divider');
      if (divider) {
        divider.style.width = `${box.offsetWidth}px`;
      }
    });
  }, [isScreenUnder1000px, isScreenUnder768px, isScreenUnder500px]);

  const [isLoaded, setIsLoaded] = useState(false);





  const [isScreenUnder600px, setIsScreenUnder600px] = useState(false);

  // Update screen size based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsScreenUnder600px(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial state based on the current window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoaded(false);
      setError(null);

      if (!userId) {
        setError("User not found. Please log in again.");
        setIsLoaded(true); // Consider setting to false if you want skeletons during auth check
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/server/projects/user/${userId}`,
          { withCredentials: true }
        );
        setProjects(response.data.projects);
        setIsLoaded(true); // Data fetched successfully
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setIsLoaded(true); // Stop showing skeletons even on error
      }
    };

    fetchProjects();
  }, [userId]);


  return (
    <>
      <div className="DashboardContent "
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '70Px',
          width: '100%',
          margin: 0,
          marginTop: '50px',
          padding: 0,


        }}
      >

        <div className="box-containe"
          style={{
            display: 'flex',
            flexFlow: 'wrap',
            width: isScreenUnder600px ? '100%' :
              isScreenUnder1000px ? '103%' :
                '100%',
            gap: '10px',
            height: isScreenUnder600px ? '670Px' : 'unset',
            justifyContent: 'space-around',
            flexDirection: isScreenUnder600px ? 'column' : 'row',
            alignItems: 'center',
            direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
            margin: isScreenUnder600px ? '0px' : '-10',
            padding: 0,

          }}
        >
          {['Balance', 'Projects', 'Messages', 'Users'].map((boxType, index) => (
            <div
              key={boxType}
              className={boxType}
              ref={(el) => (boxesRef.current[index] = el)}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '0.75rem',
                boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
                height: isScreenUnder600px ? '190px' : '135px', // Adjust height here


                color: '#344767',
                flex: isScreenUnder600px
                  ? '1 1 100px'                  // Full width under 600px
                  : isScreenUnder1000px
                    ? '1 1 calc(45% - 20px)'     // 45% width under 1000px
                    : '1 1 calc(22% - 20px)',    // 22% width on larger screens
                maxWidth: isScreenUnder600px
                  ? '100%'                      // Full width under 600px
                  : isScreenUnder1000px
                    ? 'calc(45% - 20px)'         // 45% width under 1000px
                    : 'calc(22% - 20px)',
                position: 'relative',
                marginBottom: isScreenUnder1000px ? '28px' : '0',
                width: '96%',

              }}
            >
              <style>
                {loadingKeyframes}
              </style>

              {/* Skeleton Loader */}
              {!isLoaded && (
                <div className='' style={{
                  display: 'flex', flexDirection: 'column', gap: '12px',

                  width: '100%',
                  height: isScreenUnder600px ? '130px' : '135px',



                }}>
                  <Card
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '0.75rem',
                      boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
                      height: '135px',
                      color: '#344767',
                      flex: isScreenUnder600px
                        ? '1 1 100%'
                        : isScreenUnder1000px
                          ? '1 1 calc(45% - 20px)'     // 45% width under 1000px
                          : '1 1 calc(22% - 20px)',    // 22% width on larger screens

                      position: 'relative',
                      width: '100%',
                      padding: '16px', // Additional padding for the skeleton
                    }}
                  >
                    <div className='Icon'
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '-25px',
                        left: '10px',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Typo'
                      style={{
                        height: '1rem',
                        width: '5rem',
                        borderRadius: '8px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        right: '10%',
                        top: '12%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Typo'
                      style={{
                        height: '1rem',
                        width: '3rem',
                        borderRadius: '8px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        right: '17%',
                        top: '28%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Line'
                      style={{
                        height: '0.2rem',
                        width: '99%',
                        borderRadius: '8px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        left: '1%',
                        top: '72%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Last'
                      style={{
                        height: '1rem',
                        width: '8rem',
                        borderRadius: '8px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        left: '3%',
                        top: '82%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>

                  </Card>
                </div>

              )}
              {isLoaded && (
                <>
                  <div
                    className={`FloatingIcon${index + 1}`}
                    style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '10px',
                      width: '50px',
                      height: '50px',
                      background: `linear-gradient(195deg, ${index === 0
                        ? '#323a54, #111827'
                        : index === 1
                          ? '#49a3f1, #1A73E8'
                          : index === 2
                            ? '#66BB6A, #43A047'
                            : '#EF5350, #E53935'
                        })`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '15px',
                      boxShadow:
                        '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',
                    }}
                  >
                    {index === 0 ? (
                      <PaidIcon sx={{ color: 'white', fontSize: '30px' }} />
                    ) : index === 1 ? (
                      <AccountTreeIcon sx={{ color: 'white', fontSize: '30px' }} />
                    ) : index === 2 ? (
                      <MailLockIcon sx={{ color: 'white', fontSize: '30px' }} />
                    ) : (
                      <GroupAddIcon sx={{ color: 'white', fontSize: '30px' }} />
                    )}
                  </div>
                  <div
                    className={`${boxType}Typo`}
                    style={{
                      marginTop: '10px',
                      textAlign: 'center',
                      position: 'absolute',
                      right: '25px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: '300',
                        fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t(boxType)}
                      <span
                        style={{
                          display: 'block',
                          color: 'white',
                          fontSize: '18px',
                          marginLeft: '7px',
                        }}
                      >
                        {boxType === 'Balance' ? '0.00$' : boxType === 'Users' ? '00' : t('New')}
                      </span>
                    </Typography>
                  </div>
                  <div
                    className={`${boxType}Week`}
                    style={{
                      marginTop: '8px',
                      textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                      position: 'absolute',
                      bottom: '5px',

                      width: '100%', // Ensure the width is 100% of the box
                    }}
                  >
                    <div
                      className="Divider"
                      style={{
                        height: '0.7px', // Adjust to make it more visible
                        width: '100%', // Full width within the parent container
                        maxWidth: '100%', // Ensure it doesn't exceed the container width

                        opacity: isScreenUnder600px ? 0.8 : 1,
                        marginBottom: isScreenUnder600px ? '20px' : '10px',
                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
                      }}
                    ></div>
                    <Typography
                      sx={{
                        color: '#ffffffcc',
                        fontWeight: '300',
                        fontSize: '16px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      <span style={{ color: '#4CAF50', margin: '10px', fontWeight: '700' }}>+0.00%</span>
                      {t('last week')}
                    </Typography>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>


        <div className="ChartContainer"
          style={{

            display: 'flex',
            flexFlow: 'wrap',
            padding: '1px',
            gap: isScreenUnder600px ? '15px' : 'unset',
            justifyContent: 'space-around',
            margin: currentLanguage === 'ar' && isScreenUnder600px ? '1px' :
              currentLanguage === 'ar' && isScreenUnder1000px ? '6px' :

                0, // Remove default margin
            padding: 0,
            width: '100%',


          }}
        >
          <div className="Chart1"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '0.75rem',
              height: '335px',
              width: getWidthChart(),
              color: '#344767',
              position: 'relative',
              boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
            }}
          >
            <style>
              {loadingKeyframes}
            </style>

            {/* Skeleton Loader */}
            {!isLoaded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Card
                  style={{
                    width: isSmallScreen ? '100%' : '100%',
                    height: '334px',
                    padding: '16px',
                    borderRadius: '12px',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',



                  }}
                >
                  <div className='Typo1'
                    style={{
                      width: isScreenUnder1000px ? '35%' : '30%',
                      height: isSmallScreen && currentLanguage === 'ar' ? '22px' :
                        isSmallScreen ? '19px' :
                          currentLanguage === 'ar' ? '20px' :
                            '17px',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: isSmallScreen && currentLanguage === 'ar' ? '60%' :
                        isSmallScreen ? '63%' :
                          currentLanguage === 'ar' ? '60.5%' :
                            '63.5%',
                      zIndex: '11111',
                      left: isSmallScreen && currentLanguage === 'ar' ? '53.4%' :
                        currentLanguage === 'fr' ? '3%' :
                          currentLanguage === 'ar' ? '53%' :
                            isSmallScreen ? '3.8%' :
                              '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo2'
                    style={{
                      width: isScreenUnder1000px ? '70%' : '60%',
                      height: isSmallScreen && currentLanguage === 'ar' ? '24px' :
                        isSmallScreen ? '19px' :
                          currentLanguage === 'ar' ? '21px' :

                            '17px',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: isSmallScreen && currentLanguage === 'ar' ? '67.5%' :
                        currentLanguage === 'ar' ? '68.3%' :
                          '70%',
                      zIndex: '11111',
                      left: currentLanguage === 'fr' ? '3%' :
                        currentLanguage === 'ar' ? '25.3%' :
                          isSmallScreen ? '3.8%' :
                            '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Line'
                    style={{
                      width: '90%',
                      height: '0.3rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '81%',
                      zIndex: '11111',
                      left: '5%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo3'
                    style={{
                      width: '90%',
                      height: currentLanguage === 'ar' ? '22px' : '1.2rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: currentLanguage === 'ar' ? '87%' : '88%',
                      zIndex: '11111',
                      left: '4%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>





                </Card>
              </div>

            )}


            <div className="Chart1TYPO ">
              <div style={{
                position: 'absolute',
                bottom: '80px',
                left: '18px',
                right: currentLanguage === 'ar' ? '18px' : 'unset',

              }}>

                <Typography sx={{
                  color: 'white',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  fontWeight: 'bold',
                  marginLeft: currentLanguage === 'fr' ? '-6px' : 'unset',
                  lineHeight: currentLanguage === 'ar' ? '28px' : 'undofined',
                }} >
                  {t('Daily active')}
                  <span style={{
                    display: 'block',
                    color: '#ffffffcc',
                    fontWeight: 'initial',
                    fontSize: '15px',



                  }} >
                    {t('Last Campaign Performance')}
                  </span>
                </Typography>
              </div>

              <div className="LINE"
                style={{
                  height: '1.2px',
                  opacity: '0.7',
                  width: '98%',
                  position: 'absolute',
                  left: '1px',
                  bottom: '60px',
                  background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',

                }}
              >

              </div>
              <div className='Icon ' style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '5px',
                position: 'absolute',
                bottom: '20px',
                left: '18px',
                right: currentLanguage === 'ar' ? '18px' : 'unset',



              }}>
                <AccessTimeIcon sx={{
                  color: '#ffffffcc',
                  fontSize: '17px',

                }} />
                <Typography sx={{
                  color: '#ffffffcc', position: 'relative',

                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif'
                }} >
                  {t('campaign sent 2 days ago')}
                </Typography>
              </div>
              <div className="FloatingIcon1" style={{
                position: 'absolute',
                top: '-23px',
                left: '12px',
                background: !isLoaded ? 'unset' : 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: getWidthChart1(),
                height: '200px',
                borderRadius: '15px',
                boxShadow: !isLoaded ? 'unset' : '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',

              }}

              >
                <style>
                  {loadingKeyframes}
                </style>

                {/* Skeleton Loader */}
                {!isLoaded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Card
                      style={{
                        width: '265px',
                        height: '200px',
                        padding: '16px',
                        borderRadius: '12px',
                        position: 'relative',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',


                      }}
                    >
                      <div className='DailyActive'
                        style={{
                          width: '80px',
                          height: '15px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',
                          position: 'absolute',
                          top: '5%',
                          left: '35%',
                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                        }}
                      >

                      </div>
                      <div className='Status'
                        style={{
                          width: '80px',
                          height: '15px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',
                          position: 'absolute',
                          top: '14%',
                          left: '35%',
                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                        }}
                      >

                      </div>
                      <div className="Bar"
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginTop: '40px',
                        }}
                      >
                        <div className='Bar1'
                          style={{
                            width: '30px',
                            height: '90px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        >

                        </div>
                        <div className='Bar2'
                          style={{
                            width: '30px',
                            height: '90px',
                            backgroundColor: '#111827',
                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        >

                        </div>
                        <div className='Bar3'
                          style={{
                            width: '30px',
                            height: '90px',
                            backgroundColor: '#111827',
                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        >

                        </div>
                        <div className='Bar4'
                          style={{
                            width: '30px',
                            height: '90px',
                            backgroundColor: '#111827',
                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        >

                        </div>
                        <div className='Bar5'
                          style={{
                            width: '30px',
                            height: '90px',
                            backgroundColor: '#111827',
                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        >

                        </div>
                        <div className='Bar6'
                          style={{
                            width: '30px',
                            height: '90px',
                            backgroundColor: '#111827',
                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        >

                        </div>
                      </div>
                      <div className="Days"
                        style={{
                          display: 'flex',
                          width: '100%',
                          marginTop: '15px',
                          marginLeft: '-15px',
                        }}
                      >
                        <div className='Day1'
                          style={{
                            width: '60px',
                            height: '8px',
                            borderRadius: '15px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                            transform: 'rotate(-40deg)', // Rotate in the opposite direction
                            transformOrigin: 'top right',
                          }}
                        >
                        </div>
                        <div className='Day2'
                          style={{
                            width: '60px',
                            height: '8px',
                            borderRadius: '15px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                            transform: 'rotate(-40deg)', // Rotate in the opposite direction
                            transformOrigin: 'top right',
                          }}
                        >
                        </div>
                        <div className='Day3'
                          style={{
                            width: '60px',
                            height: '8px',
                            borderRadius: '15px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                            transform: 'rotate(-40deg)', // Rotate in the opposite direction
                            transformOrigin: 'top right',
                          }}
                        >
                        </div>
                        <div className='Day4'
                          style={{
                            width: '60px',
                            height: '8px',
                            borderRadius: '15px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                            transform: 'rotate(-40deg)', // Rotate in the opposite direction
                            transformOrigin: 'top right',
                          }}
                        >
                        </div>
                        <div className='Day5'
                          style={{
                            width: '60px',
                            height: '8px',
                            borderRadius: '15px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                            transform: 'rotate(-40deg)', // Rotate in the opposite direction
                            transformOrigin: 'top right',
                          }}
                        >
                        </div>
                        <div className='Day6'
                          style={{
                            width: '60px',
                            height: '8px',
                            borderRadius: '15px',
                            backgroundColor: '#111827',

                            overflow: 'hidden',
                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                            backgroundSize: '200% 100%',
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                            transform: 'rotate(-40deg)', // Rotate in the opposite direction
                            transformOrigin: 'top right',
                          }}
                        >
                        </div>

                      </div>



                    </Card>
                  </div>

                )}
                {isLoaded && (
                  <>
                    <MyChart />
                  </>
                )}
              </div>
            </div>


          </div>
          <div className="Chart2"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '0.75rem',
              height: '335px',

              width: getWidthChart(),
              position: 'relative',
              color: '#344767',
              marginTop: isScreenUnder768px ? '55px' : 'unset',
              boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
            }}
          >
            <style>
              {loadingKeyframes}
            </style>

            {/* Skeleton Loader */}
            {!isLoaded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Card
                  style={{
                    width: isSmallScreen ? '100%' : '100%',
                    height: '334px',
                    padding: '16px',
                    borderRadius: '12px',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',


                  }}
                >
                  <div className='Typo1'
                    style={{
                      width: isScreenUnder1000px ? '35%' : '30%',
                      height: isSmallScreen && currentLanguage === 'ar' ? '23px' :
                        isSmallScreen ? '19px' :
                          currentLanguage === 'ar' ? '22px' :
                            '17px',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: isSmallScreen && currentLanguage === 'ar' ? '60%' :
                        isSmallScreen ? '63%' :
                          currentLanguage === 'ar' ? '60.5%' :
                            '63.5%',
                      zIndex: '11111',
                      left: isSmallScreen && currentLanguage === 'ar' ? '53.4%' :
                        currentLanguage === 'fr' ? '3%' :
                          currentLanguage === 'ar' ? '53%' :
                            isSmallScreen ? '3.8%' :
                              '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo2'
                    style={{
                      width: isScreenUnder1000px ? '77%' : '60%',
                      height: isSmallScreen && currentLanguage === 'ar' ? '28px' :
                        isSmallScreen ? '19px' :
                          currentLanguage === 'ar' ? '24px' :

                            '18px',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: isSmallScreen && currentLanguage === 'ar' ? '67.5%' :
                        currentLanguage === 'ar' ? '68.3%' :
                          '70%',
                      zIndex: '11111',
                      left: currentLanguage === 'fr' ? '3%' :
                        currentLanguage === 'ar' ? '21%' :
                          isSmallScreen ? '3.8%' :
                            '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Line'
                    style={{
                      width: '90%',
                      height: '0.3rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '81%',
                      zIndex: '11111',
                      left: '5%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo3'
                    style={{
                      width: currentLanguage === 'fr' ? '92%' : '90%',
                      height: currentLanguage === 'ar' ? '22px' : '1.2rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: currentLanguage === 'ar' ? '87%' : '88%',
                      zIndex: '11111',
                      left: '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>




                </Card>
              </div>

            )}

            <div
              style={{
                position: 'absolute',
                left: '18px',
                right: currentLanguage === 'ar' ? '18px' : 'unset',
                bottom: '80px',
              }}
            >
              <Typography sx={{
                color: 'white',
                marginLeft: currentLanguage === 'fr' ? '-10px' : 'unset',
                fontWeight: 'bold',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }} >
                {t('Daily Sales')}

                <span className='' style={{
                  display: 'block',
                  color: '#ffffffcc',
                  fontWeight: 'initial',
                  lineHeight: currentLanguage === 'ar' ? '28px' : 'undifined',
                  fontSize: '15px',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  whiteSpace: currentLanguage === 'fr' ? 'nowrap' : 'normal'

                }} >
                  {t('(+15%) increase in today sales.')}
                </span>
              </Typography>
            </div>
            <div className="LINE"
              style={{
                height: '1.2px',
                opacity: '0.7',
                width: '98%',
                position: 'absolute',
                left: '1px',
                bottom: '60px',
                background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',

              }}
            >

            </div>
            <div className='Icon ' style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '5px',
              position: 'absolute',
              bottom: '20px',
              right: currentLanguage === 'ar' ? '18px' : 'unset',
              left: '18px',


            }}>
              <AccessTimeIcon sx={{
                color: '#ffffffcc',
                fontSize: '17px',

              }} />
              <Typography sx={{
                color: '#ffffffcc',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }} >
                {t('updated 4 min ago')}
              </Typography>
            </div>
            <div className="FloatingIcon2" style={{
              position: 'absolute',
              top: '-23px',
              left: '12px',
              background: !isLoaded ? 'unset' : 'linear-gradient(195deg, #66BB6A, #43A047)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: getWidthChart1(),
              height: '200px',
              borderRadius: '15px',
              boxShadow: !isLoaded ? 'unset' : '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',

            }}

            >
              <style>
                {loadingKeyframes}
              </style>

              {/* Skeleton Loader */}
              {!isLoaded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Card
                    style={{
                      width: '265px',
                      height: '200px',
                      padding: '16px',
                      borderRadius: '12px',
                      position: 'relative',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',


                    }}
                  >
                    <div className='DailyActive'
                      style={{
                        width: '80px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '5%',
                        left: '35%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Status'
                      style={{
                        width: '80px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '14%',
                        left: '35%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Line'
                      style={{ marginLeft: '-15px', width: '300px', height: '150px', position: 'relative' }}>
                      <svg width="100%" height="100%" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">

                        <path
                          d="M10,140 Q40,70 70,90 T130,80 T190,100 T250,60"
                          fill="none"
                          stroke={isLoaded ? 'url(#lineGradient)' : '#111827'}
                          strokeWidth="4"
                          strokeLinecap="round"
                          style={{
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        />
                      </svg>


                    </div>
                    <div className="Days"
                      style={{
                        display: 'flex',
                        width: '90%',
                        position: 'absolute',
                        top: '80%',
                        left: '3%',
                      }}
                    >
                      <div className='Day1'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day2'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day3'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day4'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day5'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day6'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>

                    </div>



                  </Card>
                </div>

              )}
              {isLoaded && (
                <>
                  <Linechart />
                </>
              )}
            </div>
          </div>
          <div className="Chart3"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '0.75rem',
              height: '335px',
              width: getTaskChart(),

              position: 'relative',
              marginTop: isScreenUnder1000px ? '55px' : 'unset',
              color: '#344767',
              boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
            }}
          >
            <style>
              {loadingKeyframes}
            </style>

            {/* Skeleton Loader */}
            {!isLoaded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', }}>
                <Card
                  style={{
                    width: isSmallScreen ? '100%' : '100%',
                    height: '334px',
                    padding: '16px',
                    borderRadius: '12px',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',


                  }}
                >
                  <div className='Typo1'
                    style={{
                      width: '40%',
                      height: isSmallScreen && currentLanguage === 'ar' ? '25px' :
                        isSmallScreen ? '19px' :
                          currentLanguage === 'ar' ? '23px' :
                            '17px',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: isSmallScreen && currentLanguage === 'ar' ? '60%' :
                        isSmallScreen ? '63%' :
                          currentLanguage === 'ar' ? '60.5%' :
                            '63.5%',
                      zIndex: '11111',
                      left: isScreenUnder1000px ? '2%' :
                        isSmallScreen && currentLanguage === 'ar' ? '53.4%' :
                          currentLanguage === 'fr' ? '3%' :
                            currentLanguage === 'ar' ? '53%' :
                              isSmallScreen ? '3.8%' :
                                '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo2'
                    style={{
                      width: '60%',
                      height: isSmallScreen && currentLanguage === 'ar' ? '28px' :
                        isSmallScreen ? '19px' :
                          currentLanguage === 'ar' ? '21px' :

                            '17px',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: isSmallScreen && currentLanguage === 'ar' ? '68%' :
                        currentLanguage === 'ar' ? '68.3%' :
                          '70%',
                      zIndex: '11111',
                      left: isScreenUnder1000px ? '2%' :
                        isSmallScreen && currentLanguage === 'ar' ? '25.4%' :
                          currentLanguage === 'fr' ? '3%' :
                            currentLanguage === 'ar' ? '25.3%' :
                              isSmallScreen ? '3.8%' :
                                '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Line'
                    style={{
                      width: isScreenUnder1000px ? '90%' : '90%',
                      height: '0.3rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '81%',
                      zIndex: '11111',
                      left: '5%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo3'
                    style={{
                      width: currentLanguage === 'fr' ? '92%' : '90%',
                      height: '1.2rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '88%',
                      zIndex: '11111',
                      left: isScreenUnder1000px ? '2%' : '3%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>





                </Card>
              </div>

            )}
            <div
              style={{
                position: 'absolute',
                left: '18px',
                right: currentLanguage === 'ar' ? '18px' : 'unset',
                bottom: '80px',
              }}
            >
              <Typography sx={{
                color: 'white',
                marginLeft: currentLanguage === 'fr' ? '-10px' : 'unset',
                fontWeight: 'bold',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }} >
                {t('Completed Tasks')}

                <span className='' style={{
                  display: 'block',
                  color: '#ffffffcc',
                  fontWeight: 'initial',
                  lineHeight: currentLanguage === 'ar' ? '28px' : 'undifined',
                  fontSize: '15px',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  whiteSpace: currentLanguage === 'fr' ? 'nowrap' : 'normal'

                }} >
                  {t('Last Campaign Performance')}
                </span>
              </Typography>
            </div>
            <div className="LINE"
              style={{
                height: '1.2px',
                opacity: '0.7',
                width: '98%',
                position: 'absolute',
                left: '1px',
                bottom: '60px',
                background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',

              }}
            >

            </div>
            <div className='Icon ' style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '5px',
              position: 'absolute',
              right: currentLanguage === 'ar' ? '18px' : 'unset',
              bottom: '20px',
              left: '18px',


            }}>
              <AccessTimeIcon sx={{
                color: '#ffffffcc',
                fontSize: '17px',

              }} />
              <Typography sx={{
                color: '#ffffffcc',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }} >
                {t('just updated')}
              </Typography>
            </div>
            <div className="FloatingIcon3" style={{
              position: 'absolute',
              top: '-23px',
              left: '12px',
              background: !isLoaded ? 'unset' : 'linear-gradient(195deg, #323a54, #111827)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: getWidthChart1(),
              height: '200px',
              borderRadius: '15px',
              boxShadow: !isLoaded ? 'unset' : '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',

            }}

            >
              <style>
                {loadingKeyframes}
              </style>

              {/* Skeleton Loader */}
              {!isLoaded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Card
                    style={{
                      width: '265px',
                      height: '200px',
                      padding: '16px',
                      borderRadius: '12px',
                      position: 'relative',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',


                    }}
                  >
                    <div className='DailyActive'
                      style={{
                        width: '80px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '5%',
                        left: '35%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Status'
                      style={{
                        width: '80px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '14%',
                        left: '35%',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Line'
                      style={{ marginLeft: '-15px', width: '300px', height: '150px', position: 'relative' }}>
                      <svg width="100%" height="100%" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">

                        <path
                          d="M10,140 Q40,70 70,90 T130,80 T190,100 T250,60"
                          fill="none"
                          stroke={isLoaded ? 'url(#lineGradient)' : '#111827'}
                          strokeWidth="4"
                          strokeLinecap="round"
                          style={{
                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                          }}
                        />
                      </svg>


                    </div>
                    <div className="Days"
                      style={{
                        display: 'flex',
                        width: '90%',
                        position: 'absolute',
                        top: '80%',
                        left: '3%',
                      }}
                    >
                      <div className='Day1'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day2'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day3'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day4'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day5'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>
                      <div className='Day6'
                        style={{
                          width: '60px',
                          height: '8px',
                          borderRadius: '15px',
                          backgroundColor: '#111827',

                          overflow: 'hidden',
                          backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                          backgroundSize: '200% 100%',
                          animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                          transform: 'rotate(-40deg)', // Rotate in the opposite direction
                          transformOrigin: 'top right',
                        }}
                      >
                      </div>

                    </div>



                  </Card>
                </div>

              )}
              {isLoaded && (
                <>
                  <MyLineChart3 />
                </>
              )}
            </div>
          </div>

        </div>
        <div className='Container1'

          style={{
            display: 'flex',
            flexDirection: isScreenUnder1000px ? 'column' : 'row',
            alignItems: isScreenUnder1000px ? 'flex-start' : 'center',
            width: '100%',
            padding: isScreenUnder1000px ? '8px' : '11px',
            justifyContent: 'space-between',
            margin: 0,
            gap: isScreenUnder600px ? '20px' : '1Px',
            marginTop: isScreenUnder1000px ? '-9%' : '-4%',





          }}
        >
          <div className="Table"

            style={{

              padding: isScreenUnder600px ? '1px' : '10px',
              width: isScreenUnder600px ? '100%' :
                isScreenUnder1000px ? '101%' :
                  '66%',
              marginBottom: isScreenUnder1000px ? '16px' : 'unset',



            }}
          >
            <style>
              {loadingKeyframes}
            </style>

            {!isLoaded ? (
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '12px',


              }}>
                <Card className='border'
                  style={{
                    width: '100%',
                    height: '535px',
                    padding: '16px',
                    borderRadius: '8px',

                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    overflow: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.18)',


                  }}
                >
                  <div className="div"
                    style={{
                      width: isSmallScreen ? '160%' : '100%',

                    }}
                  >
                    <div className='ProjectTypo '
                      style={{
                        width: '80px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '5%',
                        left: '5%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '12%' : 'unset',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='ProjectDone'
                      style={{
                        width: '120px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '9%',
                        left: '5%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '12%' : 'unset',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Options'
                      style={{
                        width: '5px',
                        height: '30px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '5%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '90%' : '5%',

                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='ProjectName '
                      style={{
                        width: '110px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '20%',
                        left: '5%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '12%' : 'unset',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='ProjectMember '
                      style={{
                        width: '90px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '20%',
                        left: isSmallScreen ? '51%' : '38%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '58%' : 'unset',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='ProjectBudget '
                      style={{
                        width: '70px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '20%',
                        left: isSmallScreen ? '88%' : '62%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '98%' : 'unset',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='ProjectStatus '
                      style={{
                        width: '90px',
                        height: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#111827',
                        position: 'absolute',
                        top: '20%',
                        left: isSmallScreen ? '120%' : '80%',
                        right: currentLanguage === 'ar' && isSmallScreen ? '125%' : 'unset',
                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className="Line"
                      style={{
                        width: '97%',
                        height: '1px',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '26%',
                        left: '1.5%',
                        overflow: 'hidden',

                      }}
                    >

                    </div>
                    <div style={{}}>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="Content1"
                          style={{
                            position: 'absolute',
                            top: `${30 + index * 12}%`, // Adjusts the top position for each mapped item
                            left: '0%',
                            width: '100%',
                            display: 'flex',
                          }}
                        >
                          <div className='ProjectName '
                            style={{
                              width: '110px',
                              height: '15px',
                              borderRadius: '15px',
                              backgroundColor: '#111827',
                              position: 'absolute',
                              top: '20%',
                              left: '5%',
                              right: currentLanguage === 'ar' && isSmallScreen ? '12%' : 'unset',
                              overflow: 'hidden',
                              backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                              backgroundSize: '200% 100%',
                              animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                          />

                          <div className="Mz"
                            style={{
                              position: isSmallScreen ? 'absolute' : 'unset',
                              left: isSmallScreen ? '5%' : 'unset',
                              right: currentLanguage === 'ar' && isSmallScreen ? '2%' : 'unset',
                              width: '130%',


                            }}
                          >

                            <div className='ProjectMember '
                              style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '15px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                marginTop: '-5px',
                                top: '2%',
                                left: '38%',

                                overflow: 'hidden',
                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                              }}
                            />
                            <div className='ProjectMember'
                              style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '15px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                marginTop: '-5px',
                                top: '40%',
                                left: '41%',
                                overflow: 'hidden',
                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                              }}
                            />
                            <div className='ProjectMember'
                              style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '15px',
                                marginTop: '-5px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                top: '20%',
                                left: '44%',
                                overflow: 'hidden',
                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                              }}
                            />
                            <div className='ProjectMember'
                              style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '15px',
                                marginTop: '-5px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                top: '20%',
                                left: '47%',
                                overflow: 'hidden',
                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                              }}
                            />
                          </div>

                          <div className='ProjectBudget'
                            style={{
                              width: '70px',
                              height: '15px',
                              borderRadius: '15px',
                              backgroundColor: '#111827',
                              position: 'absolute',
                              top: '20%',
                              left: isSmallScreen ? '88%' : '62%',
                              right: currentLanguage === 'ar' && isSmallScreen ? '100%' : 'unset',
                              overflow: 'hidden',
                              backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                              backgroundSize: '200% 100%',
                              animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                          />
                          <div className='ProjectStatus'
                            style={{
                              width: '90px',
                              height: '15px',
                              borderRadius: '15px',
                              backgroundColor: '#111827',
                              position: 'absolute',
                              top: '20%',
                              left: isSmallScreen ? '120%' : '80%',
                              right: currentLanguage === 'ar' && isSmallScreen ? '125%' : 'unset',
                              overflow: 'hidden',
                              backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                              backgroundSize: '200% 100%',
                              animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                          />
                        </div>
                      ))}
                      <div className="Line"
                        style={{
                          width: '97%',
                          height: '1px',
                          borderRadius: '15px',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: '37%',
                          left: '1.5%',
                          overflow: 'hidden',
                        }}
                      />
                      <div className="Line2"
                        style={{
                          width: '97%',
                          height: '1px',
                          borderRadius: '15px',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: '49%',
                          left: '1.5%',
                          overflow: 'hidden',
                        }}
                      />
                      <div className="Line2"
                        style={{
                          width: '97%',
                          height: '1px',
                          borderRadius: '15px',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: '61%',
                          left: '1.5%',
                          overflow: 'hidden',
                        }}
                      />
                      <div className="Line3"
                        style={{
                          width: '97%',
                          height: '1px',
                          borderRadius: '15px',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: '73%',
                          left: '1.5%',
                          overflow: 'hidden',
                        }}
                      />
                      <div className="Line4"
                        style={{
                          width: '97%',
                          height: '1px',
                          borderRadius: '15px',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: '85%',
                          left: '1.5%',
                          overflow: 'hidden',
                        }}
                      />
                    </div>
                  </div>




                </Card>
              </div>
            ) : projects.length === 0 ? (
              <div className='' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                height: '535px',
                gap: '20px',
                color: '#ffffffcc'
              }}>
                <InventoryIcon sx={{ fontSize: '4rem', opacity: 0.5 }} />
                <Typography variant="h6" sx={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif' }}>
                  {t('No active projects yet')}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {t('Once you have an active project, it will appear here.')}
                </Typography>

              </div>

            ) : (
              <MainTable projects={projects} />

            )}
          </div>
          <div className="OrderContainer"
            style={{
              width: isScreenUnder600px ? '100%' :
                isScreenUnder1000px ? '101%' :
                  '31.5%',

            }}
          >
            <div className='Order'
              style={{

                minHeight: '535px',
                background: '#202940',
                borderRadius: '0.75rem',
                position: 'relative',
                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2), 0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '20px',
                margin: isScreenUnder600px ? '1px' : '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: 'white',
              }}
            >
              <style>
                {loadingKeyframes}
              </style>

              {/* Skeleton Loader */}
              {!isLoaded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                  <div className='Typo1'
                    style={{
                      width: '110px',
                      height: '1rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '5%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '4%' : 'unset',
                      left: '10px',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Typo2'
                    style={{
                      width: '100px',
                      height: '1rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '9%',
                      left: '10px',
                      right: currentLanguage === 'ar' && isSmallScreen ? '4%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className="ICONS"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '30px',
                      position: 'absolute',
                      top: '22%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '7%' : 'unset',
                      left: '5%',
                      zIndex: '11111',
                    }}
                  >
                    <div className='Typo1'
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '18px',
                        backgroundColor: '#111827',

                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Typo2'
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '18px',
                        backgroundColor: '#111827',

                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Typo3'
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '18px',
                        backgroundColor: '#111827',

                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Typo4'
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '18px',
                        backgroundColor: '#111827',

                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                    <div className='Typo5'
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '18px',
                        backgroundColor: '#111827',

                        overflow: 'hidden',
                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                        backgroundSize: '200% 100%',
                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                      }}
                    >

                    </div>
                  </div>
                  <div className='LINE'
                    style={{
                      width: '5px',
                      height: '16rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '25%',
                      left: '10%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '11%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon1Typo'
                    style={{
                      width: '150px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '23%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon1Typo'
                    style={{
                      width: '110px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '26%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon2Typo'
                    style={{
                      width: '150px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '35%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon2Typo'
                    style={{
                      width: '110px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '38%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      left: '19%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon3Typo'
                    style={{
                      width: '190px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '47%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon3Typo'
                    style={{
                      width: '110px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '50%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon4Typo'
                    style={{
                      width: '198px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '59%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon4Typo'
                    style={{
                      width: '110px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '62%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon5Typo'
                    style={{
                      width: '150px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '72%',
                      left: '19%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>
                  <div className='Icon5Typo'
                    style={{
                      width: '110px',
                      height: '0.7rem',
                      borderRadius: '15px',
                      backgroundColor: '#111827',
                      position: 'absolute',
                      top: '75%',
                      right: currentLanguage === 'ar' && isSmallScreen ? '20%' : 'unset',
                      left: '19%',
                      overflow: 'hidden',
                      backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                      backgroundSize: '200% 100%',
                      animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                    }}
                  >

                  </div>


                </div>

              )}
              {isLoaded && (
                <>
                  <Typography
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      lineHeight: '20px',
                      fontSize: '15px',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    {t('Orders overview')}
                    <span
                      style={{
                        display: 'block',
                        alignItems: 'center',
                        color: '#ffffffcc',
                        fontWeight: '300',
                        fontSize: '13px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      <ArrowUpwardIcon
                        style={{
                          marginRight: currentLanguage === 'ar' ? '-5px' : '5px',
                          position: 'relative',
                          top: '5px',
                          color: '#4CAF50',
                        }}
                      />
                      {t('24% this month')}
                    </span>
                  </Typography>
                  <div className='IconsContainer'
                    style={{
                      marginTop: '10px',
                      position: 'absolute',
                      alignItems: 'center',
                      width: '90%',
                      display: 'flex',
                      flexDirection: 'column',


                    }}
                  >
                    <div className="First"
                      style={{
                        position: 'absolute',
                        left: '-1px',
                        top: '30px',
                        right: currentLanguage === 'ar' ? '-7px' : 'unset',
                        gap: currentLanguage === 'ar' ? '10px' : 'unset',
                        zIndex: '1',
                        display: 'flex',
                      }}
                    >
                      <div className='NotIcon'
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: '#4CAF50',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <NotificationsRoundedIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />
                      </div>
                      <div className="TYpos">
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('$2400, Design changes')}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '200',
                            opacity: '0.7',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('22 DEC 7:20 PM')}
                        </Typography>
                      </div>
                    </div>
                    <div className="Second"
                      style={{
                        position: 'absolute',
                        left: '-1px',
                        top: '100px',
                        zIndex: '1',
                        right: currentLanguage === 'ar' ? '-7px' : 'unset',
                        gap: currentLanguage === 'ar' ? '10px' : 'unset',
                        display: 'flex',
                      }}
                    >
                      <div className='NotIcon'
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: '#F44335',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />
                      </div>
                      <div className="TYpos">
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('New order #1832412')}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '200',
                            opacity: '0.7',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('21 DEC 9:34 PM')}
                        </Typography>
                      </div>
                    </div>
                    <div className="Third"
                      style={{
                        position: 'absolute',
                        left: '-1px',
                        top: '170px',
                        right: currentLanguage === 'ar' ? '-7px' : 'unset',
                        gap: currentLanguage === 'ar' ? '10px' : 'unset',
                        zIndex: '1',
                        display: 'flex',
                      }}
                    >
                      <div className='NotIcon'
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: '#1A73E8',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />
                      </div>
                      <div className="TYpos">
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('New card added for #4395133s')}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '200',
                            opacity: '0.7',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('21 APR 9:34 PM')}
                        </Typography>
                      </div>
                    </div>
                    <div className="Firth"
                      style={{
                        position: 'absolute',
                        left: '-1px',
                        top: '240px',
                        zIndex: '1',
                        display: 'flex',
                        right: currentLanguage === 'ar' ? '-7px' : 'unset',
                        gap: currentLanguage === 'ar' ? '10px' : 'unset',
                      }}
                    >
                      <div className='NotIcon'
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: '#fb8c00',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />
                      </div>
                      <div className="TYpos">
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('New card added for #4395133s')}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '200',
                            opacity: '0.7',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('21 APR 9:34 PM')}
                        </Typography>
                      </div>
                    </div>
                    <div className="Fifth"
                      style={{
                        position: 'absolute',
                        left: '-1px',
                        right: currentLanguage === 'ar' ? '-7px' : 'unset',
                        gap: currentLanguage === 'ar' ? '10px' : 'unset',
                        top: '310px',
                        zIndex: '1',
                        display: 'flex',
                      }}
                    >
                      <div className='NotIcon'
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: '#e91e63',
                          color: '#ffffff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />
                      </div>
                      <div className="TYpos">
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('New card added for #4395133s')}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '200',
                            opacity: '0.7',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('21 APR 9:34 PM')}
                        </Typography>
                      </div>
                    </div>
                    <div className='LINE'
                      style={{
                        position: 'absolute',
                        top: '50px',
                        left: '16px',
                        right: currentLanguage === 'ar' ? '20px' : 'unset',
                        width: '1px',
                        height: '295px',
                        background: '#ffffffcc',

                      }}
                    />
                  </div>
                </>
              )}

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default DashboardRespo
