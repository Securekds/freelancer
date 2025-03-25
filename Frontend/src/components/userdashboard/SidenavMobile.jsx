import Button from '@mui/material/Button';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/material/ClickAwayListener';






const SidenavMobile = ({ isOpen, onClose }) => {
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');

    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });


    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);



    const [selectedButton, setSelectedButton] = useState('');

    // Hook to access the current location
    const location = useLocation();
    const navigate = useNavigate();
    // Effect to update the selected button based on the current route
    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;

        // Set the selected button based on the pathname
        if (pathname === '/userdashboard') {
            setSelectedButton('Dashboard');
        } else if (pathname.startsWith('/userdashboard/project')) {
            setSelectedButton('Projects');
        } else if (pathname === '/userdashboard/profile') {
            setSelectedButton('Profile');
        } else if (pathname.startsWith('/userdashboard/billing')) {
            setSelectedButton('Billing');
        }
    }, [location]);





    return (
        <>
        {isOpen && (
          <ClickAwayListener onClickAway={onClose}>
        <div className='Sidenav ' style={{
            position: 'fixed',
            top: 0,
            right: currentLanguage === 'ar' ? (isOpen ? 3 : '-100%') : 'unset', // Fixed position on the right if language is Arabic
            left: currentLanguage !== 'ar' ? (isOpen ? 0 : '-100%') : 'unset',
            height: '100vh',
            width: '250px',
            transition: 'left 0.3s ease',
            zIndex: 999,


        }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(19px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: -1,
                }}
            />

            <Button>
                <CloseIcon onClick={onClose}
                    sx={{
                        stroke: "#7b809a",
                        strokeWidth: '1.5',
                        fontSize: '17px',
                        color: '#7b809a',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '200px' : '-190px',
                        top: '15px'
                    }} />
            </Button>


            <div
                style={{ position: 'relative', right: currentLanguage === 'ar' ? '-38px' : '4px' }}
            >
                <div className="KhadamatLogo "
                    style={{
                        position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                        right: currentLanguage === 'ar' ? '35px' : 'undifined',
                    }}
                >
                    <img
                        style={{}}

                        width={'250'} src="https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png" alt="" srcset="" />
                </div>
            </div>
            <div className="Divider" style={{ position: 'relative', right: '4px', height: '0.5px', width: '100%', background: 'linear-gradient(to right, rgba(91, 66, 243, 0), #5B42F3, #00DDEB, rgba(0, 221, 235, 0))' }}></div>

            <div className='Buttons '
                style={{
                    position: 'relative',
                    top: '30px',
                    left: currentLanguage === 'ar' ? '-25px' : '10px',
                }}>
                <div style={{ marginTop: '-15px', }} className="button ">
                    <Button startIcon={<SpaceDashboardIcon sx={{ marginLeft: '15px', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', color: 'white' }} className={selectedButton === 'Dashboard' ? 'selectedButton' : ''}
                        onClick={() => {
                            setSelectedButton('Dashboard');
                            navigate('/userdashboard');
                            handleButtonClick('Dashboard');
                        }}
                    >
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Dashboard')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<BackupTableIcon sx={{ marginLeft: '15px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', color: 'white' }}
                        className={selectedButton === 'Projects' ? 'selectedButton' : ''}
                        onClick={() => {
                            setSelectedButton('Projects');
                            navigate('/userdashboard/project');
                            handleButtonClick('Projects');
                        }}
                    >
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Projects')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<AccountBalanceIcon sx={{ marginLeft: '15px', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', color: 'white' }} className={selectedButton === 'Billing' ? 'selectedButton' : ''}
                        onClick={() => {
                            setSelectedButton('Billing');
                            navigate('/userdashboard/billing');
                            handleButtonClick('Billing');
                        }}
                    >
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Billing')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<AccountBoxIcon sx={{ marginLeft: '15px', }} />}
                        sx={{
                            width: '200px',
                            height: '47px',
                            borderRadius: '0.375rem',
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            color: 'white'
                        }}
                        className={selectedButton === 'Profile' ? 'selectedButton' : ''}
                        onClick={() => {
                            setSelectedButton('Profile');
                            navigate('/userdashboard/profile');
            
                            handleButtonClick('Profile');
                            // Navigate to the 'Profile' path
                        }}
                    >
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Profile')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<NotificationsActiveIcon sx={{ marginLeft: '15px', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', color: 'white' }} className={selectedButton === 'Notifications' ? 'selectedButton' : ''} onClick={() => setSelectedButton('Notifications')}>
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Notifications')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<ExitToAppIcon sx={{ marginLeft: '15px', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', color: 'white' }} className={selectedButton === 'Analytics Tools' ? 'selectedButton' : ''} onClick={() => setSelectedButton('Analytics Tools')}>
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Analytics Tools')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<ExitToAppIcon sx={{ marginLeft: '15px', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', color: 'white' }} className={selectedButton === 'Payment' ? 'selectedButton' : ''} onClick={() => setSelectedButton('Payment')}>
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('withdraw')}</span>
                    </Button>
                </div>
                <div style={{ marginTop: '3px' }} className="button">
                    <Button startIcon={<ExitToAppIcon sx={{ marginLeft: '15px', }} />} sx={{ width: '200px', height: '47px', borderRadius: '0.375rem', textTransform: 'none', justifyContent: 'flex-start', color: 'white' }} className={selectedButton === 'Signout' ? 'selectedButton' : ''} onClick={() => setSelectedButton('Signout')}>
                        <span style={{ marginLeft: '5px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }}>{t('Signout')}</span>
                    </Button>
                </div>
                <div className='selectedButtonFixed' style={{ marginTop: '14px', }}>
                    <Button startIcon={<SpaceDashboardIcon
                        sx={{ marginLeft: '15px', }} />}
                        sx={{
                            width: '200px',
                            height: '40px',
                            borderRadius: '0.375rem',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', color: 'white'
                        }}
                    >
                        <span
                            style={{ marginTop: '4px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', marginLeft: '5px', fontWeight: 'bold', fontSize: '12px', }}>{t('UPGRADE TO PRO')}</span>
                    </Button>
                </div>

            </div>
        </div>
        </ClickAwayListener>
      )}
    </>
    )
}

export default SidenavMobile
