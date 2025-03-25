import React, { useEffect, useState } from 'react';
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
import { useBilling } from '../../Context/BillingContext.jsx'
import { useUser } from '../../Context/UserContext.jsx'
import BillingInvoices from '../Projectsfetch/BillingInvoices/BillingInvoices.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { Card, Skeleton } from "@nextui-org/react";
import { width } from '@mui/system';
import BillingTransactions from '../Projectsfetch/BillingInvoices/BillingTransactions.jsx';

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




function NewBilling({ onAddCardClick,
    onTouchBilling, handleOpenCardEdit,
    onOpenBillingUpdate, onEditClick, handleOpenDepositMenu }) {
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
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isUnder1300 = useMediaQuery('(min-width:1001px) and (max-width:1300px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');



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


    const invoiceData = [
        {
            date: 'March, 01, 2024',
            invoiceNumber: '#MS-415646',
            amount: '180 DZA',
            pdfLink: '#', // Replace with actual link if needed
        },
        {
            date: 'March, 01, 2024',
            invoiceNumber: '#MS-415647',
            amount: '250 DZA',
            pdfLink: '#', // Replace with actual link if needed
        },
        {
            date: 'March, 02, 2024',
            invoiceNumber: '#MS-415648',
            amount: '300 DZA',
            pdfLink: '#', // Replace with actual link if needed
        },
        {
            date: 'March, 03, 2024',
            invoiceNumber: '#MS-415649',
            amount: '150 DZA',
            pdfLink: '#', // Replace with actual link if needed
        },
        {
            date: 'March, 04, 2024',
            invoiceNumber: '#MS-415650',
            amount: '200 DZA',
            pdfLink: '#', // Replace with actual link if needed
        },
        {
            date: 'March, 04, 2024',
            invoiceNumber: '#MS-415650',
            amount: '200 DZA',
            pdfLink: '#', // Replace with actual link if needed
        },
    ];


    const { wallet,  loadingWallet,  error,  } = useBilling();
    const { user , isSeller } = useUser();


    return (
        <div className="MainComponent"
            style={{

                width: currentLanguage === 'ar' ? '95.5%' :
                    isUnder1300 ? '97%' :
                        '96%',
                display: 'flex',
                marginTop: '50px',
                marginRight: currentLanguage === 'ar' ? '10px' : 'unset',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '60px',

            }}
        >
          

            {isUnder1300 ? (
                <>
                 
                    <div className="GridContainer"

                        style={{
                            width: isSmallScreen ? '100%' :
                                isTabletScreen ? '50%' :
                                    '34%',
                            flexGrow: 1, // Let it grow dynamically

                            display: isSmallScreen ? 'flex' : 'grid',
                            flexDirection: isSmallScreen ? 'column' : 'unset',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '10px',
                        }}
                    >
                        <div className='TotalBalace'
                            style={{
                                height: '100px',
                                borderRadius: '0.75re2',
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
                            {loadingWallet && (
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
                            {!loadingWallet && wallet && (
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
                                            {wallet.Totalbalance.toFixed(2)} USD
                                        </Typography>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='SuspendBalance'
                            style={{
                                height: '100px',
                                borderRadius: '0.75re2',
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
                            {/* Skeleton Loader for Suspend */}
                            {loadingWallet && (
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
                            {/* Actual Content */}
                            {!loadingWallet && wallet && (
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
                                            {wallet.Suspendbalance.toFixed(2)} USD
                                        </Typography>
                                    </div>
                                </>
                            )}

                        </div>
                        <div className='AvailbeBalance'
                            style={{
                                height: '100px',
                                borderRadius: '0.75re2',
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
                            {/* Skeleton Loader for Suspend */}
                            {loadingWallet && (
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
                            {/* Actual Content */}
                            {!loadingWallet && wallet && (
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
                                                width: currentLanguage === 'fr' ? '130px' : 'unset',
                                                marginTop: '5px',
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
                                                marginBottom: '-5px',
                                            }}
                                        >
                                            {wallet.Availablebalance.toFixed(2)} USD
                                        </Typography>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='WithdrawalBalance'
                            style={{
                                height: '100px',
                                borderRadius: '0.75re2',
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
                            {/* Skeleton Loader for Withdrawal */}
                            {loadingWallet && (
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
                            {/* Actual Content */}
                            {!loadingWallet && wallet && (
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
                                                width: currentLanguage === 'fr' ? '130px' : 'unset',
                                                marginTop: '5px',
                                                opacity: '1',

                                            }}
                                        >
                                            {t('The remaining amount of profits you made')}

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
                                                marginBottom: '-5px',
                                            }}
                                        >
                                            {wallet.Withdrawalbalance.toFixed(2)} USD
                                        </Typography>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="PaymentMethod"
                        style={{
                            width: '100%',
                            marginTop: '1px',
                            borderRadius: '0.75rem',
                            border: '0 solid rgba(0, 0, 0, 0.125)',
                            padding: '20px',
                            color: 'white',
                            position: 'relative',
                            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2), 0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            minHeight: isSmallScreen ? '332px' : '175px',

                        }}>
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
                        {/* New content that takes full width */}
                        {isLoaded && (
                            <>
                                <div className='Payment'
                                    style={{
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
                                        margin: 'auto',
                                        flexDirection: isSmallScreen ? 'column' :
                                            isMediumScreen ? 'row' :
                                                'unset',
                                        gap: isSmallScreen ? '10px' :
                                            isMediumScreen ? '20px' :
                                                isTabletScreen ? '20px' :
                                                    'unset',
                                        marginTop: '30px',
                                        width: isTabletScreen ? '99%' : '90%',

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
                                                onClick={handleOpenCardEdit}
                                                style={{
                                                    flexShrink: 0,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}>

                                                <EditIcon
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
                                                <EditIcon


                                                    style={{ verticalAlign: 'middle', fontSize: '20px' }} />
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
                                                <EditIcon
                                                    style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="Div"
                    style={{
                        width : '100%',
                    }}
                    >
                        <BillingTransactions handleOpenDepositMenu={handleOpenDepositMenu} />
                    </div>
                 
                    <div className="Div"
                    style={{
                        width : '100%',
                    }}
                    >
                        <BillingInvoices/>
                    </div>



                </>
            ) : (
                <>
                  <div className="GridContainer"

style={{
    width: isSmallScreen ? '100%' :
        isTabletScreen ? '50%' :
            '34%',
    flexGrow: 1, // Let it grow dynamically

    display: isSmallScreen ? 'flex' : 'grid',
    flexDirection: isSmallScreen ? 'column' : 'unset',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
}}
>
<div className='TotalBalace'
    style={{
        height: '100px',
        borderRadius: '0.75re2',
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
    {loadingWallet && (
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
    {!loadingWallet && wallet && (
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
                    {wallet.Totalbalance.toFixed(2)} USD
                </Typography>
            </div>
        </>
    )}
</div>
<div className='SuspendBalance'
    style={{
        height: '100px',
        borderRadius: '0.75re2',
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
    {/* Skeleton Loader for Suspend */}
    {loadingWallet && (
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
    {/* Actual Content */}
    {!loadingWallet && wallet && (
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
                    {wallet.Suspendbalance.toFixed(2)} USD
                </Typography>
            </div>
        </>
    )}

</div>
<div className='AvailbeBalance'
    style={{
        height: '100px',
        borderRadius: '0.75re2',
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
    {/* Skeleton Loader for Suspend */}
    {loadingWallet && (
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
    {/* Actual Content */}
    {!loadingWallet && wallet && (
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
                        width: currentLanguage === 'fr' ? '130px' : 'unset',
                        marginTop: '5px',
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
                        marginBottom: '-5px',
                    }}
                >
                    {wallet.Availablebalance.toFixed(2)} USD
                </Typography>
            </div>
        </>
    )}
</div>
<div className='WithdrawalBalance'
    style={{
        height: '100px',
        borderRadius: '0.75re2',
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
    {/* Skeleton Loader for Withdrawal */}
    {loadingWallet && (
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
    {/* Actual Content */}
    {!loadingWallet && wallet && (
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
                        width: currentLanguage === 'fr' ? '130px' : 'unset',
                        marginTop: '5px',
                        opacity: '1',

                    }}
                >
                    {t('The remaining amount of profits you made')}

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
                        marginBottom: '-5px',
                    }}
                >
                    {wallet.Withdrawalbalance.toFixed(2)} USD
                </Typography>
            </div>
        </>
    )}
</div>
</div>
                    <div className="PaymentMethod"
                        style={{
                            width: '100%',
                            marginTop: '1px',
                            borderRadius: '0.75rem',
                            border: '0 solid rgba(0, 0, 0, 0.125)',
                            padding: '20px',
                            color: 'white',
                            position: 'relative',
                            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2), 0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            minHeight: isSmallScreen ? '332px' : '175px',

                        }}>
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
                        {/* New content that takes full width */}
                        {isLoaded && (
                            <>
                                <div className='Payment'
                                    style={{
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
                                        margin: 'auto',
                                        flexDirection: isSmallScreen ? 'column' :
                                            isMediumScreen ? 'row' :
                                                'unset',
                                        gap: isSmallScreen ? '10px' :
                                            isMediumScreen ? '20px' :
                                                isTabletScreen ? '20px' :
                                                    'unset',
                                        marginTop: '30px',
                                        width: isTabletScreen ? '99%' : '90%',

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
                                            <div className="Number"
                                                style={{ flexGrow: 1, textAlign: 'center' }}>
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
                                            <div className="modify" onClick={onEditClick}

                                                style={{
                                                    flexShrink: 0,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}>

                                                <EditIcon
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
                                            <div onClick={onEditClick}
                                                className="modify" style={{ flexShrink: 0, cursor: 'pointer', }}>
                                                <EditIcon


                                                    style={{ verticalAlign: 'middle', fontSize: '20px' }} />
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
                                            <div className="modify" onClick={onEditClick}
                                                style={{ flexShrink: 0, cursor: 'pointer', }}>
                                                <EditIcon
                                                    style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="Div"
                    style={{
                        width : '100%',
                    }}
                    >
                        <BillingTransactions/>
                    </div>
                 
                    <div className="Div"
                    style={{
                        width : '100%',
                    }}
                    >
                        <BillingInvoices/>
                    </div>
                  


                </>
            )}

        </div>
    )
}

export default NewBilling