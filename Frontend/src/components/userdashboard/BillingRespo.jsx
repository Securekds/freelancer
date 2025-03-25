import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import WifiIcon from '@mui/icons-material/Wifi';
import { Button, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { Card, Skeleton } from "@nextui-org/react";


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



function BillingRespo({ onAddCardClick, onEditClick, onTouchBilling, onOpenBillingUpdate }) {
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
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isUltraSmallScreen = useMediaQuery('(max-width:380px)');
    const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
    const isLargeScreen = useMediaQuery('(min-width:960px)');
    const getWidth = () => {
        if (isSmallScreen) return '97%';
        if (isMediumScreen) return '100%';
        if (isLargeScreen) return '97%';
        return '90%';
    };
    const getCardsWidth = () => {
        if (isSmallScreen) return '98%';
        if (isMediumScreen) return '63.3%';
        if (isLargeScreen) return '40%';
        return '90%';
    };
    const getBalance1sWidth = () => {
        if (isSmallScreen) {
            return currentLanguage === 'ar' ? '287%' : '140%';
        }
        if (isMediumScreen) return '238px';
        if (isLargeScreen) {
            return currentLanguage === 'ar' ? '37.3%' : '33%';
        }
        return '90%';
    };
    const getBalance2sWidth = () => {
        if (isSmallScreen) {
            return currentLanguage === 'ar' ? '280%' : '153%';
        }
        if (isMediumScreen) return '238px';
        if (isLargeScreen) {
            return currentLanguage === 'ar' ? '36.4%' : '37.8%';
        }
        return '90%';
    };

    const getInvoicesWidth = () => {
        if (isSmallScreen) return '339px';
        if (isMediumScreen) return '484px';
        if (isLargeScreen) return '307px';
        return '90%';
    };
    const getPaymentWidth = () => {
        if (isSmallScreen) {
            return currentLanguage === 'ar' ? '98.2%' : '341px';
        }
        if (isMediumScreen) return '484px';
        if (isLargeScreen) {
            return currentLanguage === 'ar' ? '99%' : '100.3%';
        }
        return '90%';
    };
    const getBillinginfoWidth = () => {
        if (isSmallScreen) {
            return currentLanguage === 'ar' ? '98.2%' : '98%';
        }
        if (isMediumScreen) return '484px';
        if (isLargeScreen) {
            return currentLanguage === 'ar' ? '99%' : '56%';
        }
        return '90%';
    };
    const getTransactionWidth = () => {
        if (isSmallScreen) {
            return currentLanguage === 'ar' ? '9%' : '98%';
        }
        if (isMediumScreen) return '484px';
        if (isLargeScreen) {
            return currentLanguage === 'ar' ? '99%' : '43.3%';
        }
        return '90%';
    };


    const navigate = useNavigate();

    const goToUserInvoicesList = () => {
        navigate('/userdashboard/billing/userinvoices');
    };

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 2000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="Container"
            style={{
               
                width: '100%',
                padding : "2px",
         
            
              
            }}
        >
            <div className='CARDS'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    direction: currentLanguage === 'ar' ? 'ltr' : 'unset',
                    position: 'relative',
                    left: currentLanguage === 'ar' ? '598px' :
                        'unset',
                    right: currentLanguage === 'ar' && isSmallScreen ? '10px' :
                        currentLanguage === 'ar' && isMediumScreen ? '0px' : 'unset',


                }}
            >
                <div className="MasterCard"
                    style={{
                        width: getCardsWidth(),
                        minHeight: '230px',
                        backgroundColor: isLoaded ? '#0c0014' : 'unset',
                        boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                        position: 'relative',
                        marginTop: '20px',
                        backgroundImage: isLoaded
                            ? 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22 viewBox=%220 0 1600 800%22%3E%3Cg%3E%3Cpolygon fill=%22%230d1838%22 points=%221600%2C160 0%2C460 0%2C350 1600%2C50%22/%3E%3Cpolygon fill=%22%230e315d%22 points=%221600%2C260 0%2C560 0%2C450 1600%2C150%22/%3E%3Cpolygon fill=%22%230f4981%22 points=%221600%2C360 0%2C660 0%2C550 1600%2C250%22/%3E%3Cpolygon fill=%22%231062a6%22 points=%221600%2C460 0%2C760 0%2C650 1600%2C350%22/%3E%3Cpolygon fill=%22%23117aca%22 points=%221600%2C800 0%2C800 0%2C750 1600%2C450%22/%3E%3C/g%3E%3C/svg%3E")'
                            : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '0.75rem',
                        border: '0px solid rgba(0, 0, 0, 0.125)',

                    }}
                >
                    <style>
                        {loadingKeyframes}
                    </style>

                    {/* Skeleton Loader */}
                    {!isLoaded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Card className=''
                                style={{
                                    width: '100%',
                                    height: '230px',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',


                                }}
                            >
                                <div className='Wifi'
                                    style={{
                                        height: '2rem',
                                        width: '2rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '6%',
                                        top: '15%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='Number'
                                    style={{
                                        height: '2rem',
                                        width: '16rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '6%',
                                        top: '38%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='Name'
                                    style={{
                                        height: '4rem',
                                        width: isSmallScreen ? '5rem' : '7rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '6%',
                                        top: '60%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='EXP'
                                    style={{
                                        height: '4rem',
                                        width: isSmallScreen ? '5rem' : '7rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '37%',
                                        top: '60%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='Cvv'
                                    style={{
                                        height: '4rem',
                                        width: isSmallScreen ? '5rem' : '7rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '67.8%',
                                        top: '60%',
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
                            <div className="CardContainer "
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '20px',
                                }}
                            >
                                <div className="Wifi"
                                    style={{
                                        marginTop: '25px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <WifiIcon sx={{ color: 'white' }} />
                                </div>
                                <div className="CardNumber"
                                    style={{
                                        marginTop: '20px',
                                    }}
                                >
                                    <Typography sx={{
                                        color: 'white',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        letterSpacing: '1.5px',
                                        wordSpacing: '8px',
                                    }} >
                                        4562 1122 4594 7852
                                    </Typography>
                                    <div className="CardNameEXP"
                                        style={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: currentLanguage === 'ar' ? '249px' : '220px'
                                        }}
                                    >
                                        <div className='Cardname'>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '0.8',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {t('Card Holder')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    fontWeight: 'bold',
                                                    textWrap: 'nowrap',
                                                    fontSize: '16px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Nabil Hamici
                                            </Typography>
                                        </div>
                                        <div className='CardEXP'
                                            style={{
                                                marginRight: currentLanguage === 'fr' ? '-25px' : 'unset',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '0.8',
                                                    fontSize: '16px',
                                                    textWrap: 'nowrap',


                                                }}
                                            >
                                                {t('Expires')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                11/27
                                            </Typography>
                                        </div>
                                        <div className="Logo"
                                            style={{
                                                position: 'absolute',
                                                top: '70%',
                                                left: '75%',
                                            }}
                                        >
                                            <img width={60} src="https://res.cloudinary.com/damicjacf/image/upload/v1722793005/Mastercard-removebg-preview_mywejo.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="DahabiyaCard"
                    style={{
                        width: getCardsWidth(),
                        height: '230px',
                        background: 'linear-gradient(195deg, #323a54, #111827)',
                        boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                        position: 'relative',
                        marginTop: '12px',
                        backgroundSize: 'cover, cover',
                        backgroundImage: isLoaded
                            ? `url('https://i.ibb.co/PYss3yv/map.png'), linear-gradient(45deg, #0045c7, #ff2c7d)`
                            : 'none',
                        backgroundBlendMode: 'overlay',
                        borderRadius: '0.75rem',
                        border: '0 solid rgba(0, 0, 0, 0.125)'
                    }}
                >

                    <style>
                        {loadingKeyframes}
                    </style>

                    {/* Skeleton Loader */}
                    {!isLoaded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Card className='border'
                                style={{
                                    width: '100%',
                                    height: '230px',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',


                                }}
                            >
                                <div className='Wifi'
                                    style={{
                                        height: '2rem',
                                        width: '2rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '6%',
                                        top: '15%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='Number'
                                    style={{
                                        height: '2rem',
                                        width: '16rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '6%',
                                        top: '38%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='Name'
                                    style={{
                                        height: '4rem',
                                        width: isSmallScreen ? '5rem' : '7rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '6%',
                                        top: '60%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='EXP'
                                    style={{
                                        height: '4rem',
                                        width: isSmallScreen ? '5rem' : '7rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '37%',
                                        top: '60%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                    }}
                                >

                                </div>
                                <div className='Cvv'
                                    style={{
                                        height: '4rem',
                                        width: isSmallScreen ? '5rem' : '7rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '67.8%',
                                        top: '60%',
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
                            <div className="CardContainer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '20px',
                                }}
                            >
                                <div className="Wifi"
                                    style={{
                                        marginTop: '25px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <WifiIcon sx={{ color: 'white' }} />
                                </div>
                                <div className="CardNumber"
                                    style={{
                                        marginTop: '20px',
                                    }}
                                >
                                    <Typography sx={{
                                        color: 'white',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        letterSpacing: '1.5px',
                                        wordSpacing: '8px',
                                    }} >
                                        4562 1122 4594 7852
                                    </Typography>
                                    <div className="CardNameEXP"
                                        style={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: currentLanguage === 'ar' ? '240px' : '220px'
                                        }}
                                    >
                                        <div className='Cardname'>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '0.8',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {t('Card Holder')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                    textWrap: 'nowrap',
                                                }}
                                            >
                                                Nabil Hamici
                                            </Typography>
                                        </div>
                                        <div className='CardEXP'
                                            style={{
                                                marginRight: currentLanguage === 'fr' ? '-25px' : 'unset',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '0.8',
                                                    fontSize: '16px',
                                                    textWrap: 'nowrap',
                                                }}
                                            >
                                                {t('Expires')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                11/27
                                            </Typography>
                                        </div>
                                        <div className="Logo"
                                            style={{
                                                position: 'absolute',
                                                top: '70%',
                                                left: '75%',
                                            }}
                                        >
                                            <img style={{ marginLeft: '10px' }} width={40} src="https://res.cloudinary.com/damicjacf/image/upload/v1722793929/dahabiya-removebg-preview_qmce2d.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="Balance1"
                style={{
                    position: 'absolute',
                    top: isSmallScreen ? '103%' :
                        isMediumScreen ? '103%' :
                            '4%',
                    left: isSmallScreen ? '0%' :
                        isMediumScreen ? '0%' :

                            currentLanguage === 'ar' ? '25.2%' :
                                '40.8%',
                    right: currentLanguage === 'ar' && isSmallScreen ? '5.5%' :
                        isMediumScreen && currentLanguage === 'ar' ? '37%' :
                            'unset',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'unset',
                    width:
                        isMediumScreen && currentLanguage === 'ar' ? '310%' :
                            currentLanguage === 'ar' ? '34%' :
                                isSmallScreen && currentLanguage === 'ar' ? '94%' :

                                    isMediumScreen ? '90%' :
                                        isSmallScreen ? '70%' :
                                            '40.8%',
                    gap: '10px',
                }}
            >
                <div className='Total'
                    style={{
                        width: getBalance1sWidth(),
                        padding: '20px',
                        borderRadius: '8px',
                        height: isSmallScreen ? '250px' : '230px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        display: 'flex',
                        position: 'relative',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >


                    <style>
                        {loadingKeyframes}
                    </style>

                    {/* Skeleton Loader */}
                    {!isLoaded && (
                        <>

                            <div className='Icon'
                                style={{
                                    height: '4rem',
                                    width: '4rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827', // Dark background for the card image area
                                    position: 'absolute',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded
                                        ? 'none'
                                        : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className='Text1'
                                style={{
                                    height: isSmallScreen ? '1rem' : '0.75rem',
                                    width: '7rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827', // Dark background for the card image area
                                    position: 'absolute',
                                    top: isSmallScreen ? '37.5%' : '41%',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded
                                        ? 'none'
                                        : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className='Text2'
                                style={{
                                    height: isSmallScreen ? '3rem' : '2.4rem',
                                    width: isSmallScreen ? '19rem' : '7rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827', // Dark background for the card image area
                                    position: 'absolute',
                                    top: isSmallScreen ? '48%' : '52%',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded
                                        ? 'none'
                                        : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className='Text3'
                                style={{
                                    height: '0.5rem',
                                    width: '5rem',
                                    display: isSmallScreen ? 'none' : 'unset',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827', // Dark background for the card image area
                                    position: 'absolute',
                                    top: '73%',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded
                                        ? 'none'
                                        : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className='Text4 '
                                style={{
                                    height: isSmallScreen ? '3.5rem' : '2rem',
                                    width: isSmallScreen ? '7rem' : '5rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827', // Dark background for the card image area
                                    position: 'absolute',
                                    top: isSmallScreen ? '71.5%' : '80%',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded
                                        ? 'none'
                                        : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            ></div>

                        </>
                    )}

                    {/* Actual Content */}
                    {isLoaded && (
                        <>
                            <div
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                }}
                            >
                                <AccountBalanceIcon sx={{ color: 'white' }} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '16px' : '13px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('Total balance')}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: isSmallScreen ? '1rem' : '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',
                                        width: isSmallScreen ? '290px' : '140px',
                                    }}
                                >
                                    {t('The entire balance in your account now')}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    position: 'relative',
                                    top: '5px',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
                                }}
                            />
                            <div>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    276.520.76 {t('DZA')}
                                </Typography>
                            </div>
                        </>
                    )}
                </div>
                <div className='Suspend'
                    style={{
                        width: getBalance1sWidth(),
                        background: '#202940',
                        padding: '20px',
                        borderRadius: '8px',
                        height: isSmallScreen ? '250px' : '230px',
                        position: 'relative',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>
                    <style>
                        {loadingKeyframes}
                    </style>
                    {/* Skeleton Loader for Suspend */}
                    {!isLoaded && (
                        <>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',

                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            />
                            <div className="text1"
                                style={{
                                    height: isSmallScreen ? '1rem' : '0.75rem',
                                    width: '7rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '37.5%' : '41%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text2"
                                style={{

                                    height: isSmallScreen ? '3rem' : '2.4rem',
                                    width: isSmallScreen ? '19rem' : '7rem',

                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '48%' : '52%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text3"
                                style={{
                                    height: '0.5rem',
                                    width: '5rem',
                                    borderRadius: '8px',
                                    display: isSmallScreen ? 'none' : 'unset',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: '73%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text4"
                                style={{
                                    height: isSmallScreen ? '3.5rem' : '2rem',
                                    width: isSmallScreen ? '7rem' : '5rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '71.5%' : '80%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                        </>
                    )}

                    {isLoaded && (
                        <>

                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <HourglassBottomIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '16px' : '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    {t('Suspended balance')}

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: isSmallScreen ? '1rem' : '0.75rem',
                                        width: currentLanguage === 'fr' ? '130px' : 'unset',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    {t('your projects under implementation')}

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    position: 'relative',
                                    top: '5px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}>

                            </div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    340.500 {t('DZA')}
                                </Typography>
                            </div>
                        </>
                    )}

                </div>
            </div>
            <div className="Balance2"
                style={{
                    position: 'absolute',
                    top: isSmallScreen && currentLanguage === 'ar' ? '196%' :
                        isSmallScreen ? '207.6%' :
                            isMediumScreen ? '151%' :
                                '52.3%',
                    left: isSmallScreen ? '0%' :
                        isMediumScreen ? '0%' :
                            currentLanguage === 'ar' ? '24.3%' :
                                '40.8%',
                    right: currentLanguage === 'ar' && isSmallScreen ? '5.5%' :
                        isMediumScreen && currentLanguage === 'ar' ? '37%' :
                            'unset',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'unset',
                    width: isMediumScreen && currentLanguage === 'ar' ? '320%' :
                        currentLanguage === 'ar' ? '35%' :

                            isSmallScreen && currentLanguage === 'ar' ? '94%' :

                                isMediumScreen ? '90%' :
                                    isSmallScreen ? '64%' :
                                        '35.6%',
                    gap: '10px',
                }}
            >
                <div className='Available'
                    style={{
                        width: getBalance2sWidth(),
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        padding: '20px',
                        height: isSmallScreen ? '250px' : '230px',
                        position: 'relative',
                        height: '238px',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>

                    <style>
                        {loadingKeyframes}
                    </style>
                    {/* Skeleton Loader for Suspend */}
                    {!isLoaded && (
                        <>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',

                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            />
                            <div className="text1"
                                style={{
                                    height: isSmallScreen ? '1rem' : '0.75rem',
                                    width: '7rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '37.5%' : '41%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text2"
                                style={{

                                    height: isSmallScreen ? '3rem' : '2.4rem',
                                    width: isSmallScreen ? '19rem' : '7rem',

                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '48%' : '52%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text3"
                                style={{
                                    height: '0.5rem',
                                    width: '5rem',
                                    borderRadius: '8px',
                                    display: isSmallScreen ? 'none' : 'unset',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: '73%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text4"
                                style={{
                                    height: isSmallScreen? '3.5rem' : '2rem',
                                    width: isSmallScreen? '7rem' : '5rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '71.5%' : '80%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                        </>
                    )}

                    {isLoaded && (
                        <>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <EventAvailableIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '16px' : '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    {t('Available balance')}

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: isSmallScreen ? '1rem' : '0.75rem',
                                        marginTop: '5px',
                                        width: isSmallScreen ? '290px' : '140px',
                                        opacity: '1',

                                    }}
                                >
                                    {t('The balance that you can use to open new projects')}

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    position: 'relative',
                                    top: '5px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}>

                            </div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    245.54.00 {t('DZA')}
                                </Typography>
                            </div>
                        </>
                    )}

                </div>
                <div className='Withdrawal'
                    style={{
                        width: getBalance2sWidth(),
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        padding: '20px',
                        height: isSmallScreen ? '250px' : '230px',
                        position: 'relative',
                        height: '238px',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>
                    <style>
                        {loadingKeyframes}
                    </style>
                    {/* Skeleton Loader for Withdrawal */}
                    {!isLoaded && (
                        <>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',

                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            />
                            <div className="text1"
                                style={{
                                    height: isSmallScreen ? '1rem' : '0.75rem',
                                    width: '7rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '37.5%' : '41%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text2"
                                style={{

                                    height: isSmallScreen ? '3rem' : '2.4rem',
                                    width: isSmallScreen ? '19rem' : '7rem',

                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '48%' : '52%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text3"
                                style={{
                                    height: '0.5rem',
                                    width: '5rem',
                                    borderRadius: '8px',
                                    display: isSmallScreen ? 'none' : 'unset',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: '73%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                            <div className="text4"
                                style={{
                                    height: isSmallScreen ? '3.5rem' : '2rem',
                                    width: isSmallScreen ? '7rem' : '5rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#111827',
                                    position: 'absolute',
                                    top: isSmallScreen ? '71.5%' : '80%',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            ></div>
                        </>
                    )}
                    {isLoaded && (
                        <>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <PublishedWithChangesIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '16px' : '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    {t('Withdrawal balance')}


                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: isSmallScreen ? '1rem' : '0.75rem',
                                        marginTop: '5px',
                                        textWrap: 'wrap',
                                        width: isSmallScreen ? '290px' : '125px',
                                        opacity: '1',

                                    }}
                                >
                                    {t('The remaining amount of profits you made in Khadamat')}

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    position: 'relative',
                                    top: '5px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}>

                            </div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    289.932.42 {t('DZA')}
                                </Typography>
                            </div>
                        </>
                    )}

                </div>
            </div>
            <div className="PaymentMethod"
                style={{
                    width: isSmallScreen ? '98%' :
                        isMediumScreen ? '63.5%' :
                            currentLanguage === 'ar' ? '98.8%' :
                                '100.5%',
                    minHeight: isSmallScreen ? '332px' : '175px',
                    background: '#202940',
                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                    position: 'absolute',
                    top: isSmallScreen && currentLanguage === 'ar' ? '296%' :
                        isMediumScreen ? '201%' :
                            isSmallScreen ? '307.5%' :
                                '103%',
                    left: currentLanguage === 'ar' && isSmallScreen ? '-3.9%' : 'unset',
                    right: isMediumScreen && currentLanguage === 'ar' ? '37%' : 'unset',
                    borderRadius: '0.75rem',
                    border: '0 solid rgba(0, 0, 0, 0.125)',
                    padding: '20px',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
            >
                <style>
                    {loadingKeyframes}
                </style>

                {/* Skeleton Loader */}
                {!isLoaded && (
                    <>

                        <div className='Titel'
                            style={{
                                height: '1.3rem',
                                width: '8rem',
                                borderRadius: '8px',
                                backgroundColor: '#111827', // Dark background for the card image area
                                position: 'absolute',
                                overflow: 'hidden',
                                top: isSmallScreen ? '11%' : 'unset',
                                backgroundImage: isLoaded
                                    ? 'none'
                                    : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                        ></div>
                        <div className='BTN'
                            style={{
                                height: '2.4rem',
                                width: '7rem',
                                borderRadius: '8px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                right: ' 3%',
                                top: '8%',
                                overflow: 'hidden',
                                backgroundImage: isLoaded
                                    ? 'none'
                                    : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                        ></div>
                        <div className='Card1'
                            style={{
                                height: '70px',
                                width: isSmallScreen ? '20rem' : '18rem',
                                borderRadius: '8px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                top: isLargeScreen ? '40%' : '28%',
                                right: isSmallScreen ? '3.2%' : 'unset',
                                overflow: 'hidden',
                                backgroundImage: isLoaded
                                    ? 'none'
                                    : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                        ></div>
                        <div className='Card2'
                            style={{
                                height: '70px',
                                width: isSmallScreen ? '20rem' : '18rem',
                                borderRadius: '8px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                top: isLargeScreen ? '40%' : '52%',
                                right: isSmallScreen ? '3.2%' : 'unset',
                                left: isLargeScreen ? '35%' : 'unset',
                                overflow: 'hidden',
                                backgroundImage: isLoaded
                                    ? 'none'
                                    : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                        ></div>
                        <div className='Card3'
                            style={{
                                height: '70px',
                                width: isSmallScreen ? '20rem' : '18rem',
                                borderRadius: '8px',
                                backgroundColor: '#111827',
                                position: 'absolute',
                                top: isSmallScreen ? '76%' : '40%',
                                right: isSmallScreen ? '3.2%' : '3%',
                                overflow: 'hidden',
                                backgroundImage: isLoaded
                                    ? 'none'
                                    : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                            }}
                        ></div>



                    </>
                )}
                {isLoaded && (
                    <>
                        <div className='Payment'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                }}
                            >
                                {t('Payment Method')}
                            </Typography>
                            <Button onClick={onAddCardClick}
                                sx={{
                                    background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    width: currentLanguage === 'fr' ? '225px' : '160px',
                                    height: '40px',
                                    boxShadow: '0rem 0.1875rem 0.1875rem 0rem rgba(52, 71, 103, 0.15),0rem 0.1875rem 0.0625rem -0.125rem rgba(52, 71, 103, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(52, 71, 103, 0.15)',

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'uppercase',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('+  Add New Card')}
                                </Typography>
                            </Button>

                        </div>
                        <div className="Cards"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: isSmallScreen && currentLanguage === 'ar' ? 'center' :
                                    isMediumScreen ? 'center' :
                                        'unset',
                                flexDirection: isSmallScreen ? 'column' :
                                    isMediumScreen ? 'column' :
                                        'unset',
                                gap: isSmallScreen ? '10px' :
                                    isMediumScreen ? '20px' :
                                        'unset',
                                marginTop: '20px',

                            }}
                        >
                            <div className="Master"
                                style={{
                                    width: '300px',
                                    height: '70px',
                                    border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                    borderRadius: '0.5rem',
                                }}
                            >
                                <div className='Container'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '15px',
                                        alignItems: 'center',
                                        marginTop: '8px',
                                    }}
                                >
                                    <div className="Img" style={{ flexShrink: 0 }}>
                                        <img width={35} src="https://res.cloudinary.com/damicjacf/image/upload/v1722793005/Mastercard-removebg-preview_mywejo.png" alt="" />
                                    </div>
                                    <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                letterSpacing: '1.5px',
                                                wordSpacing: '8px',

                                            }}
                                        >
                                            ****  ****  ****  7852
                                        </Typography>
                                    </div>
                                    <div className="modify"
                                        style={{
                                            flexShrink: 0,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>

                                        <EditIcon onClick={onEditClick}
                                            style={{
                                                verticalAlign: 'middle',
                                                fontSize: '20px',

                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="Dahabiya"
                                style={{
                                    width: '300px',
                                    height: '70px',
                                    border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                    borderRadius: '0.5rem',
                                }}
                            >
                                <div className='Container'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '15px',
                                        alignItems: 'center',
                                        marginTop: '8px',
                                    }}
                                >
                                    <div className="Img" style={{ flexShrink: 0 }}>
                                        <img width={25} src="https://res.cloudinary.com/damicjacf/image/upload/v1722806900/Old_Visa_Logo.svg_fntz8w.png" alt="" />
                                    </div>
                                    <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                letterSpacing: '1.5px',
                                                wordSpacing: '8px',

                                            }}
                                        >
                                            ****  ****  ****  7852
                                        </Typography>
                                    </div>
                                    <div className="modify" style={{ flexShrink: 0, cursor: 'pointer', }}>
                                        <EditIcon onClick={onEditClick} style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="Dahabiya "
                                style={{
                                    width: '300px',
                                    height: '70px',
                                    border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                    borderRadius: '0.5rem',
                                }}
                            >
                                <div className='Container'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '15px',
                                        alignItems: 'center',
                                        marginTop: '8px',
                                    }}
                                >
                                    <div className="Img" style={{ flexShrink: 0 }}>
                                        <img width={25} src="https://pay.chargily.dz/test/images/edahabia-card.svg" alt="" />
                                    </div>
                                    <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                letterSpacing: '1.5px',
                                                wordSpacing: '8px',

                                            }}
                                        >
                                            ****  ****  ****  7852
                                        </Typography>
                                    </div>
                                    <div className="modify" style={{ flexShrink: 0, cursor: 'pointer', }}>
                                        <EditIcon onClick={onEditClick} style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="Invoice "
                style={{
                    position: 'absolute',

                    left:

                        isSmallScreen ? '0%' :
                            isMediumScreen ? '0%' :

                                currentLanguage === 'ar' ? '1.2%' :
                                    '69.5%',
                    top: isMediumScreen && currentLanguage === 'ar' ? '436%' :
                        isSmallScreen && currentLanguage === 'ar' ? '527%' :
                            isSmallScreen ? '523.8%' :

                                isMediumScreen ? '422%' :
                                    '4%',
                    right:
                        isSmallScreen && currentLanguage === 'ar' ? '5.7%' :
                            isMediumScreen && currentLanguage === 'ar' ? '36.8%' :
                                'unset',
                    width: isSmallScreen ? '98%' :
                        isMediumScreen ? '63.3%' :
                            '31%',



                }}
            >
                <div className="Invoice"
                    style={{
                        width: '100%',
                        height: '475px',
                        background: '#202940',
                        borderRadius: '0.75rem',
                        position: 'relative',
                        boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',

                    }}
                >
                    <style>
                        {loadingKeyframes}
                    </style>
                    {!isLoaded && (
                        <div style={{ width: '100%', marginTop: '20px' }}>

                            {/* Header */}
                            <div className="Header"
                                style={{
                                    width: '90%',
                                    height: '2.5rem',
                                    background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                    borderRadius: '0.5rem',
                                    margin: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                    marginBottom: '10px',
                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'loading 2.5s infinite'
                                }}
                            >
                                {/* Header Content */}
                            </div>

                            {/* Map Content1 Structure 4 Times */}
                            {[...Array(7)].map((_, index) => (
                                <div key={index} className='Content1'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '90%',
                                        margin: '0 auto',
                                        marginTop: '20px',
                                    }}>
                                    <div className="1"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '5px',
                                        }}
                                    >

                                        <div className="Element1"
                                            style={{
                                                height: '1rem',
                                                width: '90px',
                                                borderRadius: '8px',
                                                backgroundColor: '#111827',
                                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'loading 2.5s infinite',
                                                marginRight: '10px'  // Space between the first and second element
                                            }}
                                        >
                                            {/* Element1 Content */}
                                        </div>

                                        <div className="Element2"
                                            style={{
                                                height: '1rem',
                                                width: '80px',
                                                borderRadius: '8px',
                                                backgroundColor: '#111827',
                                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'loading 2.5s infinite',
                                                marginRight: 'auto'  // Ensures the third element is centered
                                            }}
                                        >
                                            {/* Element2 Content */}
                                        </div>
                                    </div>

                                    <div className="Element3"
                                        style={{
                                            height: '1rem',
                                            width: '30%',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                            marginRight: '16px',
                                        }}
                                    >
                                        {/* Element3 Content */}
                                    </div>

                                    <div className="Element4"
                                        style={{
                                            height: '1rem',
                                            width: '20%',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite'
                                        }}
                                    >
                                        {/* Element4 Content */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    {isLoaded && (
                        <>
                            <div className="Header"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('Invoices')}
                                </Typography>
                                <Button onClick={goToUserInvoicesList}
                                    sx={{


                                        background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                        color: 'white',
                                        borderRadius: '10px',
                                        width: '90px',


                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t('View All')}
                                    </Typography>

                                </Button>
                            </div>
                            <div className="Content "
                                style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('March')}, 01, 2024
                                    <span style={{
                                        display: 'block',
                                        letterSpacing: '0.03333em',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',

                                    }} >
                                        #MS-415646
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',
                                    }}
                                >
                                    180 {t('DZA')}
                                </Typography>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                    <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('PDF')}
                                    </Typography>
                                </div>
                            </div>
                            <div className="Content1"
                                style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('March')}, 01, 2024
                                    <span style={{
                                        display: 'block',
                                        letterSpacing: '0.03333em',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',

                                    }} >
                                        #MS-415646
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',
                                    }}
                                >
                                    180 {t('DZA')}
                                </Typography>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                    <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>
                            <div className="Content2"
                                style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('March')} , 01, 2024
                                    <span style={{
                                        display: 'block',
                                        letterSpacing: '0.03333em',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',

                                    }} >
                                        #MS-415646
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',
                                    }}
                                >
                                    190 {t('DZA')}
                                </Typography>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                    <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>
                            <div className="Content3"
                                style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('March')} , 01, 2024
                                    <span style={{
                                        display: 'block',
                                        letterSpacing: '0.03333em',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',

                                    }} >
                                        #MS-415646
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',
                                    }}
                                >
                                    2220 {t('DZA')}
                                </Typography>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                    <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>
                            <div className="Content4"
                                style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('March')} , 01, 2024
                                    <span style={{
                                        display: 'block',
                                        letterSpacing: '0.03333em',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',

                                    }} >
                                        #MS-415646
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',
                                    }}
                                >
                                    4580 {t('DZA')}
                                </Typography>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                    <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>
                            <div className="Content5"
                                style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('March')} , 01, 2024
                                    <span style={{
                                        display: 'block',
                                        letterSpacing: '0.03333em',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',

                                    }} >
                                        #MS-415646
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: '#ffffffcc',
                                        opacity: '1',
                                        fontWeight: '300',
                                    }}
                                >
                                    24480 {t('DZA')}
                                </Typography>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                    <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="BillingInformation"
                style={{
                    width: isMediumScreen && currentLanguage === 'ar' ? '63%' :
                        isSmallScreen && currentLanguage === 'ar' ? '98%' :
                            currentLanguage === 'ar' ? '55%' :
                                getBillinginfoWidth(),
                    height: currentLanguage === 'ar' ? '390px' : '355px',
                    background: '#202940',
                    position: 'absolute',
                    top: isSmallScreen && currentLanguage === 'ar' ? '365%' :
                        isMediumScreen ? '274%' :
                            isSmallScreen ? '376.4%' :
                                '140%',
                    right: currentLanguage === 'ar' && isSmallScreen ? '6%' :
                        isMediumScreen && currentLanguage === 'ar' ? '37%' :
                            'unset',
                    borderRadius: '0.75rem',
                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                    border: '0 solid rgba(0, 0, 0, 0.125)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: currentLanguage === 'ar' ? '25px' : 'unset',
                    border: '1px solid rgba(255, 255, 255, 0.18)',

                }}
            >
                <style>
                    {loadingKeyframes}
                </style>
                {!isLoaded && (
                    <div style={{ width: '100%',
                     marginTop: '20px' , 
                     }}>

                        {/* Header */}
                        <div className="Header"
                            style={{
                                width: '30%',
                                height: '1.3rem',
                                background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                borderRadius: '0.5rem',
                                position : 'absolute',
                                top : '5%',
                                left :'3.4%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                marginBottom: '10px',
                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'loading 2.5s infinite'
                            }}
                        >
                         
                        </div>

                       
                       
                            <div  className='Content1'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'column',
                                    width: '90%',
                                    gap : '10px',
                                    marginLeft : '20px',
                                    marginTop: '85px',
                                }}>
                                <div className="1"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '100px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                    <div className="Element2"
                                        style={{
                                            height: '1rem',
                                            width: '80px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                            marginLeft : '60px',
                                          
                                        }}
                                    >
                                        {/* Element2 Content */}
                                    </div>
                                    <div className="Element3"
                                        style={{
                                            height: '1rem',
                                            width: '80px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                           
                                        }}
                                    >
                                        {/* Element2 Content */}
                                    </div>
                                </div>
                                <div className="2"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        marginTop : '20px',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                  
                                </div>
                                <div className="3"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        marginTop : '0px',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                  
                                </div>
                                <div className="4"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        marginTop : '0px',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                  
                                </div>

                                
                            </div>
                            <div  className='Content2'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'column',
                                    width: '90%',
                                    gap : '10px',
                                    marginLeft : '20px',
                                    marginTop: '25px',
                                }}>
                                <div className="1"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '100px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                    <div className="Element2"
                                        style={{
                                            height: '1rem',
                                            width: '80px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                            marginLeft : '60px',
                                          
                                        }}
                                    >
                                        {/* Element2 Content */}
                                    </div>
                                    <div className="Element3"
                                        style={{
                                            height: '1rem',
                                            width: '80px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                           
                                        }}
                                    >
                                        {/* Element2 Content */}
                                    </div>
                                </div>
                                <div className="2"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        marginTop : '20px',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                  
                                </div>
                                <div className="3"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        marginTop : '0px',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                  
                                </div>
                                <div className="4"
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        marginTop : '0px',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                  
                                </div>

                                
                            </div>
                     
                    </div>
                )}

                {isLoaded && (
                    <>
                        <div style={{
                            marginTop: '20px',
                            marginLeft: '20px',
                        }} >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                }}
                            >
                                {t('Billing Information')}
                            </Typography>

                            <div className="typo "
                                style={{
                                    marginTop: '40px',
                                    marginLeft: isSmallScreen ? '0px' : '20px',
                                    width: isSmallScreen ? '280px' :
                                        isMediumScreen ? '420px' :
                                            '440px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        width: '200px',


                                    }}
                                >
                                    {t('Nabil Hamici')}
                                </Typography>
                                <div onClick={onTouchBilling} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
                                    <DeleteIcon sx={{ color: '#F65F53', fontSize: '17px' }} />
                                    <Typography
                                        sx={{
                                            color: '#F65F53',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                        }}
                                    >
                                        {t('DELETE')}
                                    </Typography>
                                </div>
                                <div onClick={onOpenBillingUpdate}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2px',
                                        cursor: 'pointer',
                                        marginRight: currentLanguage === 'ar' && isSmallScreen ? '10px' : 'unset',
                                        marginLeft:
                                            isSmallScreen ? '12px' :
                                                'unset',
                                    }} >
                                    <EditIcon sx={{ color: '#fff', fontSize: '17px' }} />
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {t('EDIT')}
                                    </Typography>
                                </div>
                            </div>
                            <div className="information"
                                style={{
                                    marginTop: '20px',
                                    marginLeft: isSmallScreen ? '0px' : '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',

                                }}
                            >
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '',
                                            fontSize: '12px',
                                            width: '200px',


                                        }}
                                    >
                                        {t('Company Name :')}
                                        <span
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontWeight: 'bold'

                                            }}
                                        >
                                            Viking Burrito
                                        </span>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '',
                                            fontSize: '12px',
                                            width: '250px',


                                        }}
                                    >
                                        {t('Email Address :')}
                                        <span
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontWeight: 'bold'

                                            }}
                                        >
                                            oliver@burrito.com
                                        </span>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '',
                                            fontSize: '12px',
                                            width: '200px',


                                        }}
                                    >
                                        {t('VAT Number :')}
                                        <span
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontWeight: 'bold'

                                            }}
                                        >
                                            FRB1235476

                                        </span>
                                    </Typography>
                                </div>
                            </div>
                            <div className="typo "
                                style={{
                                    marginTop: '40px',
                                    marginLeft: isSmallScreen ? '0px' : '20px',
                                    width: isSmallScreen ? '280px' :
                                        isMediumScreen ? '420px' :
                                            '440px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        width: '200px',


                                    }}
                                >
                                    {t('Nabil Hamici')}
                                </Typography>
                                <div style={{ display: 'flex', alignItems: 'center', }} >
                                    <DeleteIcon sx={{ color: '#F65F53', fontSize: '17px' }} />
                                    <Typography
                                        sx={{
                                            color: '#F65F53',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                        }}
                                    >
                                        {t('DELETE')}
                                    </Typography>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2px',
                                        marginRight: currentLanguage === 'ar' && isSmallScreen ? '10px' : 'unset',
                                        marginLeft: isSmallScreen ? '12px' : 'unset',
                                    }} >
                                    <EditIcon sx={{ color: '#fff', fontSize: '17px' }} />
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {t('EDIT')}
                                    </Typography>
                                </div>
                            </div>
                            <div className="information"
                                style={{
                                    marginTop: '20px',
                                    marginLeft: isSmallScreen ? '0px' : '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',

                                }}
                            >
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '',
                                            fontSize: '12px',
                                            width: '200px',


                                        }}
                                    >
                                        {t('Company Name :')}
                                        <span
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontWeight: 'bold'

                                            }}
                                        >
                                            Viking Burrito
                                        </span>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '',
                                            fontSize: '12px',
                                            width: '250px',


                                        }}
                                    >
                                        {t('Email Address :')}
                                        <span
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontWeight: 'bold'

                                            }}
                                        >
                                            oliver@burrito.com
                                        </span>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '',
                                            fontSize: '12px',
                                            width: '200px',


                                        }}
                                    >
                                        {t('VAT Number :')}
                                        <span
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontWeight: 'bold'

                                            }}
                                        >
                                            FRB1235476

                                        </span>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="Transaction's"
                style={{
                    width: isMediumScreen && currentLanguage === 'ar' ? '63%' :
                        isSmallScreen && currentLanguage === 'ar' ? '98%' :
                            currentLanguage === 'ar' ? '43%' :
                                getTransactionWidth(),
                    height: currentLanguage === 'ar' ? '390px' : '355px',
                    background: '#202940',
                    position: 'absolute',
                    top: isSmallScreen && currentLanguage === 'ar' ? '446%' :
                        isMediumScreen && currentLanguage === 'ar' ? '355%' :
                            isMediumScreen ? '348%' :
                                isSmallScreen ? '450%' :
                                    '140%',
                    padding: currentLanguage === 'ar' ? '20px' : 'unset',
                    left: isSmallScreen && currentLanguage === 'ar' ? '-3.7%' :
                        currentLanguage === 'ar' ? '1%' :
                            isSmallScreen ? '0%' :
                                isMediumScreen ? '0%' :
                                    '57%',
                    right: isSmallScreen && currentLanguage === 'ar' ? '6%' :

                        'unset',
                    right: isMediumScreen && currentLanguage === 'ar' ? '37%' : 'unset',
                    borderRadius: '0.75rem',
                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                    border: '0 solid rgba(0, 0, 0, 0.125)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
            >
                    <style>
                    {loadingKeyframes}
                </style>
                {!isLoaded && (
                    <div style={{ width: '100%',
                     marginTop: '20px' , 
                     }}>

                    
                        <div className="Titel"
                            style={{
                                width: '35%',
                                height: '1.3rem',
                                background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                borderRadius: '0.5rem',
                                position : 'absolute',
                                top : '5%',
                                left :'3.4%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                marginBottom: '10px',
                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'loading 2.5s infinite'
                            }}
                        >
                         
                        </div>
                        <div className="Date"
                            style={{
                                width: '35%',
                                height: '1.3rem',
                                background: 'linear-gradient(310deg,#5e72e4,#825ee4)',
                                borderRadius: '0.5rem',
                                position : 'absolute',
                                top : '5%',
                                right :'7%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                marginBottom: '10px',
                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'loading 2.5s infinite'
                            }}
                        >
                         
                        </div>

                       
                       
                            <div  className='Titel'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'column',
                                    width: '90%',
                                    gap : '10px',
                                    marginLeft : '0px',
                                    marginTop: '85px',
                                }}>
                                <div className="1 "
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '90px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                              
                            </div>
                            <div  className='Content1'
                                style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'row',
                                    justifyContent : 'space-between',
                                    width: '87%',
                                    gap : '10px',
                                    marginLeft : '20px',
                                    marginTop: '25px',
                                }}>
                                <div className="Circle"
                                    style={{
                                        display: 'flex',
                                  
                                        
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '2.5rem',
                                            width: '42px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                                <div className="Typo"
                                    style={{
                                        display: 'flex',
                                        flexDirection : 'column',
                                        gap: '5px',
                                        marginRight : '40px',
                                       
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '60px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>
                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                                <div className="Price"
                                    style={{
                                        display: 'flex',
                                       
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '70px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                              
                            </div>
                            <div  className='Content2'
                                style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'row',
                                    justifyContent : 'space-between',
                                    width: '87%',
                                    gap : '10px',
                                    marginLeft : '20px',
                                    marginTop: '25px',
                                }}>
                                <div className="Circle"
                                    style={{
                                        display: 'flex',
                                  
                                        
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '2.5rem',
                                            width: '42px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                                <div className="Typo"
                                    style={{
                                        display: 'flex',
                                        flexDirection : 'column',
                                        gap: '5px',
                                        marginRight : '40px',
                                       
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '60px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>
                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                                <div className="Price"
                                    style={{
                                        display: 'flex',
                                       
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '70px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                              
                            </div>
                            <div  className='Titel2'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'column',
                                    width: '90%',
                                    gap : '10px',
                                    marginLeft : '0px',
                                    marginTop: '30px',
                                }}>
                                <div className="1 "
                                    style={{
                                        display: 'flex',
                                        width : '88%',
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '90px',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                              
                            </div>
                            <div  className='Content3'
                                style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection : 'row',
                                    justifyContent : 'space-between',
                                    width: '87%',
                                    gap : '10px',
                                    marginLeft : '20px',
                                    marginTop: '25px',
                                }}>
                                <div className="Circle"
                                    style={{
                                        display: 'flex',
                                  
                                        
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '2.5rem',
                                            width: '42px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                                <div className="Typo"
                                    style={{
                                        display: 'flex',
                                        flexDirection : 'column',
                                        gap: '5px',
                                        marginRight : '40px',
                                       
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '60px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>
                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '190px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                                <div className="Price"
                                    style={{
                                        display: 'flex',
                                       
                                        justifyContent : 'space-between',
                                        gap: '5px',
                                    }}
                                >

                                    <div className="Element1"
                                        style={{
                                            height: '1rem',
                                            width: '70px',
                                            borderRadius: '30px',
                                            backgroundColor: '#111827',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite',
                                         
                                        }}
                                    >
                                        {/* Element1 Content */}
                                    </div>

                                </div>
                              
                            </div>
                           
                     
                    </div>
                )}
                 {isLoaded && (
                    <>
                <div className='Header' style={{
                    marginTop: '20px',
                    marginLeft: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: isSmallScreen ? '310px' :
                        isMediumScreen ? '440px' :
                            '360px',

                }} >
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '15px',
                        }}
                    >
                        {t('Your Transactions')}
                    </Typography>
                    <div style={{ display: 'flex', gap: '5px' }} >
                        <DateRangeIcon sx={{ fontSize: '20px', color: '#ffffffcc' }} />
                        <Typography
                            sx={{
                                color: '#ffffffcc',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: '400',
                                fontSize: '14px',
                            }}
                        >
                            23 - 30 {t('March')} 2024
                        </Typography>
                    </div>
                </div>
                <div className="Content"
                    style={{
                        marginTop: '40px',
                        marginLeft: '20px',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffffcc',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                        }}
                    >
                        {t('NEWEST')}
                    </Typography>
                </div>
                <div className="Content1 "
                    style={{
                        marginTop: '20px',
                        marginLeft: isSmallScreen ? '10px' : '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: isSmallScreen ? '315px' :
                            '360px',

                    }}
                >
                    <div className="div"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#202940',
                            display: 'flex',
                            justifyContent: 'center',
                            marginRight: '6px',
                            alignItems: 'center',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '2px solid #F44335',
                        }}
                    >
                        <ArrowDropDownIcon sx={{ color: '#F44335', }} />
                    </div>

                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        {t('Netflix')}
                        <span
                            style={{
                                display: 'block',
                                color: '#ffffffcc',
                                fontWeight: '400',


                            }}
                        >
                            27 {t('March')} 2020, at 12:30 PM

                        </span>
                    </Typography>
                    <Typography
                        sx={{
                            color: '#F44335',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: '600',
                            opacity: '1',
                            fontSize: '13px',
                            marginLeft: '40px',
                        }}
                    >
                        - 12000
                        <span
                            style={{
                                display: isSmallScreen ? 'block' : 'unset',
                                textAlign: 'center',
                                marginLeft: isSmallScreen ? '10px' : 'unset',
                                marginRight: currentLanguage === 'ar' ? '5px' : 'unset'
                            }}
                        >{t('DZA')}</span>

                    </Typography>
                </div>
                <div className="Content2"
                    style={{
                        marginTop: '20px',
                        marginLeft: isSmallScreen ? '10px' : '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: isSmallScreen ? '315px' : '360px',

                    }}
                >
                    <div className="div"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#202940',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: '6px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            border: '1px solid #4CAF50',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '2px solid #4CAF50',
                        }}
                    >
                        <ArrowDropUpIcon sx={{ color: '#4CAF50' }} />
                    </div>

                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginRight: '8px'
                        }}
                    >
                        {t('Appel')}
                        <span
                            style={{
                                display: 'block',
                                color: '#ffffffcc',
                                fontWeight: '400',


                            }}
                        >
                            21 {t('May')} 2020, at 15:30 PM

                        </span>
                    </Typography>
                    <Typography
                        sx={{
                            color: '#4CAF50',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: '600',
                            opacity: '1',
                            fontSize: '13px',
                            marginLeft: '40px',
                        }}
                    >
                        + 9000
                        <span
                            style={{
                                display: isSmallScreen ? 'block' : 'unset',
                                textAlign: 'center',
                                marginLeft: isSmallScreen ? '10px' : 'unset',
                                marginRight: currentLanguage === 'ar' ? '5px' : 'unset'
                            }}
                        >{t('DZA')}</span>


                    </Typography>
                </div>
                <div className="Content"
                    style={{
                        marginTop: '40px',
                        marginLeft: '20px',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffffcc',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                        }}
                    >
                        {t('YESTERDAY')}
                    </Typography>
                </div>
                <div className="Content1"
                    style={{
                        marginTop: '20px',
                        marginLeft: isSmallScreen ? '10px' : '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: isSmallScreen ? '315px' : '360px',

                    }}
                >
                    <div className="div"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#202940',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: '6px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            border: '1px solid #F44335',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '2px solid #F44335',

                        }}
                    >
                        <ArrowDropDownIcon sx={{ color: '#F44335' }} />
                    </div>

                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        {t('Stripe')}
                        <span
                            style={{
                                display: 'block',
                                color: '#ffffffcc',
                                fontWeight: '400',


                            }}
                        >
                            27 {t('March')} 2020, at 12:30 PM

                        </span>
                    </Typography>
                    <Typography
                        sx={{
                            color: '#F44335',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: '600',
                            opacity: '1',
                            fontSize: '13px',
                            marginLeft: '40px',

                        }}
                    >
                        - 1000
                        <span
                            style={{
                                display: isSmallScreen ? 'block' : 'unset',
                                textAlign: 'center',
                                marginLeft: isSmallScreen ? '10px' : 'unset',
                                marginRight: currentLanguage === 'ar' ? '5px' : 'unset'
                            }}
                        >{t('DZA')}</span>


                    </Typography>
                </div>
                </>
                 )}



            </div>



        </div>
    )
}

export default BillingRespo