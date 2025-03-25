import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleButton from '@mui/material/ToggleButton';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import { useContainerStyle } from '../../Context/CenteringContext.jsx'
import { useNavigate } from 'react-router-dom';
import { faImages, faUserDoctor, faPanorama } from "@fortawesome/free-solid-svg-icons";
import ProfileSettings from './ProfileSettings';
import ProfileMessages from './ProfileMessages';
import { Card, Skeleton } from "@nextui-org/react";
import { useUser } from '../../Context/UserContext.jsx'



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






function Profilecontent({ handleOpenProfile, handleOpenCover, handleOpenVerify , handleShowProfileInfoOpen }) {

    // State to track the selected button in the sidenav
    const [selectedButton, setSelectedButton] = useState('');

    // Hook to access the current location
    const location = useLocation();

    // Effect to update the selected button based on the current route
    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;

        // Get the previously selected button from local storage
        const storedSelectedButton = localStorage.getItem('selectedButton');

        // If there is a previously selected button in local storage and the current route matches, set the selected button
        if (storedSelectedButton && pathname === `/${storedSelectedButton}`) {
            setSelectedButton(storedSelectedButton);
        } else {
            // Set the selected button based on the pathname
            if (pathname === '/Profile') {
                setSelectedButton('Profile');
            } else {
                // Handle other routes if needed
            }
        }
    }, [location]);

    // Effect to save the selected button to local storage
    useEffect(() => {
        localStorage.setItem('selectedButton', selectedButton);
    }, [selectedButton]);

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


    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 52,
        height: 31,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 3,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                },
            },
        },
        '& .MuiSwitch-thumb': {

            width: 20,
            height: 20,
            marginLeft: -2,
            marginTop: 1,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));


    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
    const getWidth = () => {
        if (isSmallScreen) return '100%';
        if (isMediumScreen) return '100%';
        if (isLargeScreen) return '100%';
        return '90%';
    };

    const userData = [1, 2, 3, 4, 5];

    const elementsArray = Array(4).fill(0);



    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };



    const [rotate, setRotate] = useState(false); // Track rotation state
    const [selectedOption, setSelectedOption] = useState('App'); // Track selected option
    const navigate = useNavigate(); // Initialize navigate hook

    const handleOptionClick = (optionName) => {
        if (optionName !== selectedOption) {
            setRotate(true); // Start rotation animation

            // Set a timeout for navigating after the rotation
            setTimeout(() => {
                setSelectedOption(optionName); // Update selected option
                setRotate(false); // Stop the rotation

                // Navigate based on the option selected
                if (optionName === 'Messages') {
                    navigate('/userdashboard/profile/messages');
                } else if (optionName === 'App') {
                    navigate('/userdashboard/profile/app'); // Example for App navigation
                } else if (optionName === 'Settings') {
                    navigate('/userdashboard/profile/settings'); // Example for Settings navigation
                }
            }, 500); // Duration matching the rotation animation
        }
    };



    const handleProfileSettings = () => {
        setProfile(false)
        setProfileSettings(true)
    }

    const [profile, setProfile] = useState(true);
    const [profileSettings, setProfileSettings] = useState(false);

    const { user, isLoaded } = useUser();
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;

        if (imagePath.startsWith('http')) {
            return imagePath;
        }

        const cleanPath = imagePath.startsWith('/')
            ? imagePath
            : `/${imagePath}`;

        const fullUrl = `${import.meta.env.VITE_BACKEND_URL}${cleanPath}`;
        console.log('Generated image URL:', fullUrl);
        return fullUrl;
    };

    const coverImageUrl = user?.coverImg ? getImageUrl(user.coverImg) : null;

    const profileImageUrl = user?.profileImg ? getImageUrl(user.profileImg) : null;

    useEffect(() => {
        console.log('User data in AccountSettings:', user);
    }, [user]);


    return (




        <div className='MainConrtainer'
            style={{
                width: '96%',
                height: 'auto',
                marginTop: '50px',
                paddingBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',




            }}
        >

            <div className='CoverMobile'
                style={{
                    width: '100%',
                    margin: '0 auto', // Center the cover photo
                    padding: '0', // Adjust padding as needed
                }}
            >

                <div className="CoverPhoto slide-from-left"

                    style={{
                        minHeight: '18.75rem',
                        width: '100%',
                        background: '#fff',
                        marginTop: '18px',
                        position: 'relative',
                        color: '#344767',
                        borderRadius: '0.75rem',
                        backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        filter: profileSettings ? 'blur(110px)' : 'none',
                    }}
                >
                    {/* Skeleton Loader */}
                    {!isLoaded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Card
                                style={{
                                    width: '100%',
                                    height: '230px',
                                    padding: '16px',
                                    borderRadius: '0.75rem',
                                    position: 'relative',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                }}
                            >
                                <div
                                    style={{
                                        height: '20rem',
                                        width: '102%',
                                        borderRadius: '8px',
                                        backgroundColor: '#111827',
                                        position: 'absolute',
                                        left: '-1%',
                                        top: '-1%',
                                        overflow: 'hidden',
                                        backgroundImage: isLoaded
                                            ? 'none'
                                            : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                    }}
                                />
                            </Card>
                        </div>
                    )}
                    {isLoaded && (
                        <>
                            <div className="ChangeCover"

                                style={{
                                    position: 'absolute',
                                    top: '5%',
                                    right: '2%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#344767',
                                    borderRadius: '16px',
                                    padding: '0 16px',
                                    height: '35px',
                                    cursor: 'pointer',
                                }}
                            >
                                <IconButton
                                    onClick={handleClick1}
                                    size="small"
                                    sx={{ p: 0, display: 'flex', alignItems: 'center' }}
                                    aria-controls={open1 ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open1 ? 'true' : undefined}
                                >
                                    <PhotoCamera sx={{ color: 'white', marginRight: '5px' }} />
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            color: 'white',
                                            marginRight: currentLanguage === 'ar' ? '10px' : 'unset',
                                        }}
                                    >
                                        {t('Edit cover photo')}
                                    </Typography>
                                </IconButton>
                            </div>
                            <div className='Menu'>
                                <Menu
                                    anchorEl={anchorEl1}
                                    id="account-menu"
                                    open={open1}
                                    onClose={handleClose1}
                                    onClick={handleClose1}
                                    sx={{
                                        width: '245px',
                                        marginRight: isMediumScreen && currentLanguage === 'ar' ? '84.5%' :
                                            currentLanguage === 'ar' && isSmallScreen ? '52.5%' :
                                                isSmallScreen ? '45%' :
                                                    '86.5%',
                                        '& .MuiPaper-root': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            backdropFilter: 'blur(50px)',
                                            WebkitBackdropFilter: 'blur(20px)',
                                            color: 'rgba(255, 255, 255, 1)',
                                            border: '1px solid white',
                                            borderRadius: '16px',
                                        },
                                        '& .MuiMenuItem-root': {
                                            bgcolor: 'transparent',
                                        },
                                        '& .MuiMenuItem-root:hover': {
                                            transform: 'scale(1.09)', // Slight zoom effect
                                            bgcolor: 'transparent',
                                        },

                                    }}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem
                                        className="menu-item"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            flexDirection: 'column',
                                            gap: '5px',

                                        }}
                                        onClick={handleClose1}
                                    >
                                        <div className="Upload"
                                            onClick={handleOpenCover}

                                            style={{
                                                display: 'flex',
                                                gap: '5px',
                                                marginRight: '9px',
                                                alignItems: 'center',
                                                marginLeft: currentLanguage === 'ar' ? '20px' : 'unset',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPanorama}
                                                style={{
                                                    fontSize: '20px',
                                                    color: 'white',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                }}
                                            >

                                                {t('Upload Cover photo')}

                                            </Typography>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className="menu-item"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            flexDirection: 'column',
                                            gap: '5px',

                                        }}
                                        onClick={handleClose1}
                                    >
                                        <div className="Upload"
                                            onClick={handleOpenProfile}

                                            style={{
                                                display: 'flex',
                                                gap: '5px',
                                                marginRight: '9px',
                                                alignItems: 'center',
                                                marginLeft: currentLanguage === 'ar' ? '20px' : 'unset',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserDoctor}
                                                style={{
                                                    fontSize: '20px',
                                                    color: 'white',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                }}
                                            >

                                                {t('Upload Profile photo')}

                                            </Typography>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            flexDirection: 'column',
                                            gap: '5px',

                                        }}
                                    >
                                        <div className="Remove"

                                            style={{
                                                display: 'flex',
                                                gap: '5px',
                                                marginLeft: currentLanguage === 'ar' ? '12px' : 'unset',
                                            }}
                                        >
                                            <DeleteOutlinedIcon />
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                }}
                                            >
                                                {t('Remove Cover')}
                                            </Typography>
                                        </div>
                                    </MenuItem>

                                </Menu>
                            </div>
                        </>
                    )}
                </div>

            </div>

            {profile && (
                <>
                    <div className="ProfileContainer slide-from-right"
                        style={{
                            height: 'auto',
                            width: isMediumScreen ? '96%' : '94%',
                            background: '#202940',
                            paddingBottom: isSmallScreen ? '30px' : 'unset',
                            borderRadius: '0.75rem',
                            backgroundClip: 'border-box',
                            border: '0 solid rgba(0, 0, 0, 0.125)',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                            transition: 'transform 0.5s ease', // Apply transition to rotation
                            transform: rotate ? 'rotateY(180deg)' : 'rotateY(0deg)', // Apply rotation
                            marginTop: '-50px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                        }}
                    >

                        <div className="FirstSec"
                            style={{
                                width: '96%',
                                height: '100px',
                                position: 'relative',
                                top: '15px',
                                left: '5px',
                            }}
                        >
                            <style>
                                {loadingKeyframes}
                            </style>

                            {/* Skeleton Loader */}
                            {!isLoaded && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>

                                    <div className='Profile'
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '10px') : (currentLanguage === 'ar' ? 'auto' : '20px'),
                                            right: isSmallScreen ? (currentLanguage === 'ar' ? '20px' : 'auto') : (currentLanguage === 'ar' ? '20px' : 'auto'),
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='Names'
                                        style={{
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            display: 'flex',
                                            width: '100%',
                                            flexDirection: 'column',
                                            gap: '5px',
                                            top: isSmallScreen && currentLanguage === 'ar' ? '15px' : '14px',
                                            left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '100px') : (currentLanguage === 'ar' ? 'auto' : '100px'),
                                            right: isSmallScreen ? (currentLanguage === 'ar' ? '100px' : 'auto') : (currentLanguage === 'ar' ? '100px' : 'auto'),

                                        }}
                                    >
                                        <div className="Name"
                                            style={{
                                                backgroundColor: '#111827',
                                                width: isSmallScreen ? '40%' : '15%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                            }}
                                        >

                                        </div>
                                        <div className="role"
                                            style={{
                                                backgroundColor: '#111827',
                                                width: isSmallScreen ? '35%' : '12%',
                                                height: '20px',
                                                overflow: 'hidden',
                                                borderRadius: '16px',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                            }}
                                        >

                                        </div>

                                    </div>
                                    <div className='Settings'
                                        style={{
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            display: 'flex',
                                            justifyContent: isSmallScreen ? 'center' : 'unset',
                                            width: '100%',
                                            gap: '5px',
                                            top: isSmallScreen ? (currentLanguage === 'ar' ? '115%' : currentLanguage === 'fr' ? '80%' : '110%') : '29%',
                                            left: isSmallScreen ? (currentLanguage === 'ar' ? '10px' : '1%') : (currentLanguage === 'ar' ? '-57%' : '60%'),
                                            right: isSmallScreen ? (currentLanguage === 'ar' ? '2%' : '10px') : (currentLanguage === 'ar' ? 'auto' : '20px'),

                                        }}
                                    >
                                        <div className="app"
                                            style={{
                                                backgroundColor: '#111827',
                                                width: isSmallScreen ? '28%' : '15%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                            }}
                                        >

                                        </div>
                                        <div className="msg"
                                            style={{
                                                backgroundColor: '#111827',
                                                width: isSmallScreen ? '28%' : '12%',
                                                height: '20px',
                                                overflow: 'hidden',
                                                borderRadius: '16px',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                            }}
                                        >

                                        </div>
                                        <div className="settings"
                                            style={{
                                                backgroundColor: '#111827',
                                                width: isSmallScreen ? '28%' : '12%',
                                                height: '20px',
                                                overflow: 'hidden',
                                                borderRadius: '16px',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                            }}
                                        >

                                        </div>

                                    </div>
                                </div>

                            )}

                            {isLoaded && (
                                <>

                                    <div className='ProfileCircleMobile' style={{
                                        position: 'absolute',
                                        left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '10px') : (currentLanguage === 'ar' ? 'auto' : '20px'),
                                        right: isSmallScreen ? (currentLanguage === 'ar' ? '20px' : 'auto') : (currentLanguage === 'ar' ? '20px' : 'auto'),
                                    }}>
                                        <div className='ProfileCircle' style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid #ccc',
                                        }}>
                                            <img
                                                src={user?.profileImg ? getImageUrl(user.profileImg) : ''}
                                                alt="Profile"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            {/* Active Badge */}
                                            <div className="ActiveBadge" style={{
                                                position: 'absolute',
                                                bottom: '10px', // Adjust based on badge size
                                                right: currentLanguage === 'ar' ? '83%' : '0px',  // Keeps it fixed at the bottom-right of the circle
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: 'green',
                                                border: '2px solid white',
                                            }}></div>
                                        </div>
                                    </div>



                                    {/* Profile Name */}
                                    <div>

                                        <div className="ProfileName" style={{
                                            position: 'absolute',
                                            top: isSmallScreen && currentLanguage === 'ar' ? '15px' : '14px',
                                            left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '100px') : (currentLanguage === 'ar' ? 'auto' : '100px'),
                                            right: isSmallScreen ? (currentLanguage === 'ar' ? '100px' : 'auto') : (currentLanguage === 'ar' ? '100px' : 'auto'),
                                        }}>
                                            <Typography sx={{
                                                color: 'white',
                                                fontFamily: /[\u0600-\u06FF]/.test(user?.firstName + user?.lastName) && currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif' // Arabic font for Arabic names
                                                    : currentLanguage === 'ar'
                                                        ? '"Airbnbcereal", sans-serif' // English font for Arabic mode with Latin names
                                                        : '"Airbnbcereal", sans-serif', // Default font for non-Arabic languages
                                                fontWeight: 'bold',
                                                fontSize: currentLanguage === 'ar' ? '16px' : '20px',
                                                lineHeight: currentLanguage === 'ar' ? '29px' : 'unset',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {user?.firstName} {user?.lastName}
                                            </Typography>
                                            <Typography sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                letterSpacing: '0.02857em',
                                                opacity: '1',
                                                fontWeight: '400',
                                                fontSize: '14px',
                                            }}>
                                                {t('CEO / Founder')} {/* Make sure 't' is defined in your component */}
                                            </Typography>
                                        </div>

                                    </div>




                                    <div className='SettingsMobile ' style={{
                                        position: 'absolute',
                                        top: (isSmallScreen
                                            ? (currentLanguage === 'ar'
                                                ? '95%'
                                                : currentLanguage === 'fr'
                                                    ? '80%'
                                                    : '90%')
                                            : '20px'),

                                        left: isSmallScreen ? (currentLanguage === 'ar' ? '10px' : '8%') :
                                            (currentLanguage === 'ar' ? '20px' : 'auto'),
                                        right:
                                            (isSmallScreen
                                                ? (currentLanguage === 'ar' ? '8%' : '10px')
                                                : (currentLanguage === 'ar' ? 'auto' : '20px')),
                                    }}>
                                        <div className="ProfileSetting" style={{
                                            display: 'flex',
                                            gap: '1px',
                                            alignItems: isSmallScreen && currentLanguage === 'fr' ? 'center' : 'unset',
                                            flexDirection: isSmallScreen && currentLanguage === 'fr' ? 'column' : 'row',
                                        }}>
                                            <div className="app" style={{ display: 'flex', alignItems: 'center' }}>
                                                <ToggleButton
                                                    sx={{
                                                        background: selectedOption === 'App' ? '#344767' : 'transparent',
                                                        width: currentLanguage === 'fr' && isSmallScreen ? '260px' :
                                                            currentLanguage === 'fr' ? '80px' :
                                                                currentLanguage === 'ar' ? '105px' : '80px',
                                                        height: '35px',
                                                        borderRadius: '17px',
                                                        display: 'flex',
                                                        justifyContent: currentLanguage === 'fr' && isSmallScreen ? 'center' : 'space-between',
                                                        padding: '0 10px',
                                                        border: 'none',
                                                        transition: 'all .5s ease',
                                                        '&:hover': { background: selectedOption === 'App' ? '#344767' : 'transparent' },
                                                    }}
                                                    onClick={() => handleOptionClick('App')}
                                                >
                                                    <HomeIcon
                                                        sx={{
                                                            fontSize: '25px',
                                                            color: 'white',
                                                            marginLeft: currentLanguage === 'ar' ? '5px' :

                                                                '0',
                                                            transition: 'all .5s ease',
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            fontSize: '15px',
                                                            color: 'white',

                                                            textTransform: 'capitalize',
                                                            marginLeft: currentLanguage !== 'ar' ? '10px' : '0', // Ensures space between icon and text for non-AR languages
                                                            transition: 'all .5s ease',

                                                        }}
                                                    >
                                                        {t('App')}
                                                    </Typography>
                                                </ToggleButton>
                                            </div>


                                            <div className="Messages" style={{ display: 'flex', alignItems: 'center' }}>
                                                <ToggleButton
                                                    sx={{
                                                        background: selectedOption === 'Messages' ? '#344767' : 'transparent',
                                                        width: currentLanguage === 'fr' && isSmallScreen ? '260px' :
                                                            currentLanguage === 'ar' ? '100px' :
                                                                '120px',
                                                        height: '35px',
                                                        borderRadius: '17px',
                                                        display: 'flex',
                                                        justifyContent: currentLanguage === 'fr' && isSmallScreen ? 'center' : 'space-between',
                                                        padding: '0 10px',
                                                        border: 'none',
                                                        transition: 'all .5s ease', // Smooth transition added
                                                        '&:hover': { background: selectedOption === 'Messages' ? '#344767' : 'transparent' },
                                                    }}
                                                    onClick={() => handleOptionClick('Messages')}
                                                >
                                                    <EmailIcon sx={{
                                                        fontSize: '23px',
                                                        color: 'white',
                                                        transition: 'all .5s ease',
                                                        marginRight: isSmallScreen && currentLanguage === 'fr' ? '10px' : 'unset',
                                                    }} />
                                                    <Typography
                                                        sx={{
                                                            fontSize: '15px',
                                                            color: 'white',
                                                            textTransform: 'capitalize',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            transition: 'all .5s ease', // Smooth transition for text
                                                        }}
                                                    >
                                                        {t('Messages')}
                                                    </Typography>
                                                </ToggleButton>
                                            </div>

                                            <div className="Settings" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginRight: isSmallScreen && currentLanguage === 'fr' ? '10px' : 'unset',
                                            }}>
                                                <ToggleButton
                                                    sx={{
                                                        background: selectedOption === 'Settings' ? '#344767' : 'transparent',
                                                        width: currentLanguage === 'fr' && isSmallScreen ? '260px' : '105px',
                                                        height: '35px',
                                                        borderRadius: '17px',
                                                        display: 'flex',
                                                        justifyContent: currentLanguage === 'fr' && isSmallScreen ? 'center' : 'space-between',

                                                        padding: '0 10px',
                                                        border: 'none',
                                                        transition: 'all .5s ease', // Smooth transition added
                                                        '&:hover': { background: selectedOption === 'Settings' ? '#344767' : 'transparent' },
                                                    }}
                                                    onClick={() => handleOptionClick('Settings')}
                                                >
                                                    <SettingsIcon
                                                        sx={{
                                                            fontSize: '23px',
                                                            color: 'white',
                                                            marginLeft: currentLanguage === 'ar' ? '5px' : '0',
                                                            transition: 'all .5s ease',
                                                            marginRight: isSmallScreen && currentLanguage === 'fr' ? '10px' : 'unset',
                                                        }} />
                                                    <Typography
                                                        sx={{
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            fontSize: '15px',
                                                            color: 'white',
                                                            textTransform: 'capitalize',
                                                            transition: 'all .5s ease', // Smooth transition for text
                                                        }}
                                                    >
                                                        {t('Settings')}
                                                    </Typography>
                                                </ToggleButton>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="SecondSec"

                            style={{
                                width: '100%',
                                marginTop: isSmallScreen ? '50px' : '10px',
                                display: isTabletScreen ? 'column' :
                                    isSmallScreen ? 'column' :
                                        'flex',
                                gap: '20px',
                                padding: '20px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div className="PlatformSettings"

                                style={{
                                    flex: 1,
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    padding: '10px', // Inner spacing
                                    boxSizing: 'border-box',
                                    padding: '20px',
                                    position: 'relative',
                                    borderRadius: '16px',
                                    width: '100%',
                                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                                }}
                            >
                                {/* Skelton for Platform Settings */}
                                <style>
                                    {loadingKeyframes}
                                </style>

                                {/* Skeleton Loader */}
                                {!isLoaded && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '12px',
                                            width: '100%',
                                            height: isSmallScreen ? '430px' :
                                                isTabletScreen ? '450px' :
                                                    'unset',
                                            direction: currentLanguage === 'ar' ? 'rtl' : 'unset',



                                        }}>


                                        <div className='Platfrom '
                                            style={{
                                                width: '40%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '4%',
                                                top: isSmallScreen ? '1%' : 'unset',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='Account '
                                            style={{
                                                width: '20%',
                                                height: '16px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '4%',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                top: '12%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='EMAIL '
                                            style={{
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                width: '290%',
                                                display: 'flex',
                                                justifyContent: isSmallScreen ? 'center' : 'unset',
                                                gap: '5px',
                                                alignItems: 'center',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                left: '4%',
                                                top: '18%',

                                            }}
                                        >
                                            <div className="app"
                                                style={{
                                                    backgroundColor: '#111827',
                                                    width: '5%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                }}
                                            >

                                            </div>
                                            <div className="EMAIL"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    gap: '5px',
                                                    marginLeft: '15px',
                                                }}


                                            >
                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '22%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>
                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '12%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>

                                            </div>



                                        </div>
                                        <div className='POST'
                                            style={{
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                display: 'flex',
                                                justifyContent: isSmallScreen ? 'center' : 'unset',
                                                width: '290%',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                gap: '5px',
                                                alignItems: 'center',
                                                left: '4%',
                                                top: '32%',

                                            }}
                                        >
                                            <div className="app"
                                                style={{
                                                    backgroundColor: '#111827',
                                                    width: '5%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                }}
                                            >

                                            </div>
                                            <div className="EMAIL"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    gap: '5px',
                                                    marginLeft: '15px',
                                                }}


                                            >
                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '22%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>
                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '12%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>

                                            </div>
                                        </div>
                                        <div className='POST'
                                            style={{
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                display: 'flex',
                                                justifyContent: isSmallScreen ? 'center' : 'unset',
                                                width: '290%',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                gap: '5px',
                                                alignItems: 'center',
                                                left: '4%',
                                                top: '45%',

                                            }}
                                        >
                                            <div className="app"
                                                style={{
                                                    backgroundColor: '#111827',
                                                    width: '5%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                }}
                                            >

                                            </div>
                                            <div className="EMAIL"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    gap: '5px',
                                                    marginLeft: '15px',
                                                }}


                                            >
                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '22%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>
                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '12%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>

                                            </div>



                                        </div>
                                        <div className='Apllication'
                                            style={{
                                                width: '40%',
                                                height: '16px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '4%',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                top: '58%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='LunchNewProjects'
                                            style={{
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                display: 'flex',
                                                justifyContent: isSmallScreen ? 'center' : 'unset',
                                                width: '190%',
                                                gap: '5px',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                alignItems: 'center',
                                                left: '4%',
                                                top: '65%',

                                            }}
                                        >
                                            <div className="app"
                                                style={{
                                                    backgroundColor: '#111827',
                                                    width: '5%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                }}
                                            >

                                            </div>
                                            <div className="lunch"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    gap: '5px',
                                                    marginLeft: '15px',
                                                }}


                                            >

                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '22%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>

                                            </div>



                                        </div>
                                        <div className='MonthlyProjects'
                                            style={{
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                display: 'flex',
                                                justifyContent: isSmallScreen ? 'center' : 'unset',
                                                width: '190%',
                                                gap: '5px',
                                                alignItems: 'center',
                                                left: '4%',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                top: '75%',

                                            }}
                                        >
                                            <div className="app"
                                                style={{
                                                    backgroundColor: '#111827',
                                                    width: '5%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                }}
                                            >

                                            </div>
                                            <div className="lunch"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    gap: '5px',
                                                    marginLeft: '15px',
                                                }}


                                            >

                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '22%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>

                                            </div>



                                        </div>
                                        <div className='Subscribe'
                                            style={{
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                display: 'flex',
                                                justifyContent: isSmallScreen ? 'center' : 'unset',
                                                width: '190%',
                                                gap: '5px',
                                                right: currentLanguage === 'ar' ? '3.5%' : 'unset',
                                                alignItems: 'center',
                                                left: '4%',
                                                top: '85%',

                                            }}
                                        >
                                            <div className="app"
                                                style={{
                                                    backgroundColor: '#111827',
                                                    width: '5%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                }}
                                            >

                                            </div>
                                            <div className="lunch"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    gap: '5px',
                                                    marginLeft: '15px',
                                                }}


                                            >

                                                <div className="1"
                                                    style={{
                                                        backgroundColor: '#111827',
                                                        width: '22%',
                                                        height: '15px',
                                                        overflow: 'hidden',
                                                        borderRadius: '16px',
                                                        backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite'

                                                    }}
                                                >

                                                </div>

                                            </div>



                                        </div>
                                        <div className="Divid1 "
                                            style={{
                                                height: '1px',
                                                width: '103%',
                                                display: isLargeScreen ? 'none' : 'normal',
                                                opacity: '1',
                                                position: 'absolute',
                                                top: '100%',
                                                left: currentLanguage === 'ar' && isSmallScreen ? '0%' : '-6%',
                                                background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                            }}></div>
                                    </div>
                                )}
                                {/* Content for Platform Settings */}
                                {isLoaded && (
                                    <>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '16px',


                                            }}
                                        >
                                            {t('Platform Settings')}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                opacity: '1',
                                                fontWeight: '700',
                                                fontSize: currentLanguage === 'ar' ? '14px' : '12px',
                                                marginTop: '20px',

                                            }}
                                        >
                                            {t('ACCOUNT')}
                                        </Typography>
                                        <div className="EmailsOption"
                                            style={{
                                                marginLeft: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '5px',
                                                marginRight: currentLanguage === 'ar' ? '-25px' : 'unset',




                                            }} >
                                            <FormControlLabel
                                                control={<MaterialUISwitch />}

                                            />
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14.5px',
                                                    lineHeight: '25px',
                                                    marginRight: currentLanguage === 'ar' ? '10px' : 'unset',



                                                }}
                                            >
                                                {t('Email me when someone')}
                                                <span style={{
                                                    display: currentLanguage === 'ar' ? 'unset' : 'block',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',

                                                }} >
                                                    {t('follows me')}
                                                </span>
                                            </Typography>
                                        </div>
                                        <div className="PostsOption"
                                            style={{
                                                marginLeft: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '5px',
                                                marginRight: currentLanguage === 'ar' ? '-25px' : 'unset',

                                            }} >
                                            <FormControlLabel
                                                control={<MaterialUISwitch />}

                                            />
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14.5px',
                                                    lineHeight: '25px',
                                                    marginRight: currentLanguage === 'ar' ? '10px' : 'unset',


                                                }}
                                            >
                                                {t('Email me when someone')}
                                                <span style={{
                                                    display: currentLanguage === 'ar' ? 'unset' : 'block',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',

                                                }} >
                                                    {t('answers on my post')}
                                                </span>
                                            </Typography>
                                        </div>
                                        <div className="MentionsOption"
                                            style={{
                                                marginLeft: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '5px',
                                                marginRight: currentLanguage === 'ar' ? '-25px' : 'unset',

                                            }} >
                                            <FormControlLabel
                                                control={<MaterialUISwitch />}

                                            />
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14.5px',
                                                    lineHeight: '25px',
                                                    marginRight: currentLanguage === 'ar' ? '10px' : 'unset',


                                                }}
                                            >
                                                {t('Email me when someone')}
                                                <span style={{
                                                    display: currentLanguage === 'ar' ? 'unset' : 'block',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',

                                                }} >
                                                    {t('mentions me')}
                                                </span>
                                            </Typography>
                                        </div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                opacity: '1',
                                                fontWeight: '700',
                                                fontSize: currentLanguage === 'ar' ? '14px' : '12px',
                                                marginTop: '20px',

                                            }}
                                        >
                                            {t('APPLICATION')}
                                        </Typography>
                                        <div className="LunchOption"
                                            style={{
                                                marginLeft: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '15px',
                                                marginRight: currentLanguage === 'ar' ? '-25px' : 'unset',


                                            }} >
                                            <FormControlLabel
                                                control={<MaterialUISwitch />}

                                            />
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14.5px',
                                                    lineHeight: currentLanguage === 'fr' ? '20px' : '25px',
                                                    marginRight: currentLanguage === 'ar' ? '10px' : 'unset',


                                                }}
                                            >
                                                {t('New launches and projects')}


                                            </Typography>
                                        </div>
                                        <div className="ProductOption"
                                            style={{
                                                marginLeft: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '20px',
                                                marginRight: currentLanguage === 'ar' ? '-25px' : 'unset',


                                            }} >
                                            <FormControlLabel
                                                control={<MaterialUISwitch />}

                                            />
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14.5px',
                                                    lineHeight: currentLanguage === 'fr' ? '20px' : '25px',
                                                    marginRight: currentLanguage === 'ar' ? '10px' : 'unset',


                                                }}
                                            >

                                                {t('Monthly projects updates')}
                                            </Typography>
                                        </div>
                                        <div className="SubsecribeOption"
                                            style={{
                                                marginLeft: '3px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '20px',
                                                marginRight: currentLanguage === 'ar' ? '-25px' : 'unset',


                                            }} >
                                            <FormControlLabel
                                                control={<MaterialUISwitch />}

                                            />
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14.5px',
                                                    lineHeight: '25px',
                                                    marginRight: currentLanguage === 'ar' ? '10px' : 'unset',


                                                }}
                                            >

                                                {t('Subscribe to newsletter')}
                                            </Typography>

                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="ProfileInformation"

                                style={{
                                    flex: 1,
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    padding: '10px', // Inner spacing
                                    boxSizing: 'border-box',
                                    padding: '20px',
                                    marginTop: isSmallScreen ? '20px' :
                                        isTabletScreen ? '20px' :
                                            'unset',
                                    borderRadius: '16px',
                                    position: 'relative',
                                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                                }}
                            >
                                {/* Skeleton Loader */}
                                <style>
                                    {loadingKeyframes}
                                </style>

                                {/* Skeleton Loader */}
                                {!isLoaded && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '12px',
                                            width: isSmallScreen ? '200%' : '100%',
                                            height: isSmallScreen ? '380px' :
                                                isTabletScreen ? '450px' :
                                                    'unset',
                                            direction: currentLanguage === 'ar' && isSmallScreen ? 'unset' :
                                                currentLanguage === 'ar' ? 'ltr' :

                                                    'unset',

                                        }}>

                                        <div className='ProfileInfo'
                                            style={{
                                                width: isSmallScreen ? '20%' : '40%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: currentLanguage === 'ar' ? '55%' : '4%',
                                                right: isSmallScreen && currentLanguage === 'ar' ? '25%' : 'unset',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>

                                        <div className='Description'
                                            style={{
                                                width: isSmallScreen ? '40%' : '70%',
                                                height: '150px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: currentLanguage === 'ar' ? '26%' : '4%',
                                                top: '14%',
                                                right: isSmallScreen && currentLanguage === 'ar' ? '25%' : 'unset',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className="Divid1 "
                                            style={{
                                                height: '1px',
                                                width: '90%',
                                                opacity: '1',
                                                margin: 'auto',
                                                position: 'absolute',
                                                top: '50%',
                                                left: currentLanguage === 'ar' && isSmallScreen ? '29%' : '4%',
                                                background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                            }}>

                                        </div>
                                        <div className='UserInfo'
                                            style={{
                                                position: 'absolute',
                                                left: '4%',
                                                top: '54%',
                                                right: isSmallScreen && currentLanguage === 'ar' ? '25%' :
                                                    currentLanguage === 'ar' ? '5%' :
                                                        'unset',
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                direction: currentLanguage === 'ar' ? 'rtl' : 'unset',
                                                gap: '10px',

                                            }}
                                        >
                                            <div className='FullName'
                                                style={{
                                                    width: '60%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    backgroundColor: '#111827',

                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >


                                            </div>
                                            <div className='PhoneNumber'
                                                style={{
                                                    width: '66%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    backgroundColor: '#111827',

                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>
                                            <div className='Email'
                                                style={{
                                                    width: '65%',
                                                    height: '26px',
                                                    borderRadius: '16px',
                                                    backgroundColor: '#111827',

                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>
                                        </div>
                                        <div className='UserInfo'
                                            style={{
                                                position: 'absolute',
                                                left: '4%',
                                                top: '75%',
                                                direction: currentLanguage === 'ar' ? 'rtl' : 'unset',
                                                right: isSmallScreen && currentLanguage === 'ar' ? '25%' :
                                                    currentLanguage === 'ar' ? '5%' :
                                                        'unset',
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',

                                            }}
                                        >
                                            <div className='FullName'
                                                style={{
                                                    width: '60%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    backgroundColor: '#111827',

                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>
                                            <div className='PhoneNumber'
                                                style={{
                                                    width: '65%',
                                                    height: '20px',
                                                    borderRadius: '16px',
                                                    backgroundColor: '#111827',

                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>

                                        </div>



                                    </div>

                                )}
                                {/* Content for Profile Information */}
                                {isLoaded && (
                                    <>
                                        <div className="Div"
                                        style={{
                                            display : 'flex',
                                            justifyContent : 'space-between',
                                        }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {t('Profile Information')}
                                            </Typography>
                                            <Button

                                                 onClick={handleShowProfileInfoOpen}
                                                sx={{
                                                    background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                                    color: '#fff',
                                                    borderRadius: '10px',

                                                    height: '25px',
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
                                                    {t('Setup')}
                                                </Typography>
                                            </Button>
                                        </div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                opacity: '1',
                                                fontWeight: '300',
                                                width: '240px',
                                                fontSize: '0.875rem',
                                                marginTop: '20px',
                                                letterSpacing: '0.02857em',
                                                opacity: '1',
                                                lineHeight: '1.5',
                                            }}
                                        >
                                            {t('We are excited to have you here! Take a moment to personalize your profile and showcase your skills. Click on "Edit" to update your information and make your profile stand out.Let’s get started! ✨')}
                                        </Typography>
                                        <div className="Divider "
                                            style={{
                                                height: isSmallScreen ? '1px' : '0.5px',
                                                width: '100%',
                                                opacity: isSmallScreen ? '0.2' : '0.3',
                                                background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
                                                marginTop: '20px',
                                                position: isSmallScreen ? 'relative' : 'undifined',
                                                right: isSmallScreen ? '10px' : 'undifined',
                                            }}></div>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            {t('Full Name :')}
                                            <span style={{
                                                fontSize: '0.875rem',
                                                color: '#ffffffcc',
                                                fontFamily: /[\u0600-\u06FF]/.test(user.firstName + user.lastName) && currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif' // Arabic font for Arabic names
                                                    : currentLanguage === 'ar'
                                                        ? '"Airbnbcereal", sans-serif' // English font for Arabic mode with Latin names
                                                        : '"Airbnbcereal", sans-serif', // Default font for non-Arabic languages
                                                opacity: '1',
                                                fontWeight: '300',
                                                marginLeft: '10px',
                                            }} >
                                                {user.firstName} {user.lastName}
                                            </span>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            {t('Mobile :')}
                                            <span style={{
                                                fontSize: '0.875rem',
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                opacity: '1',
                                                fontWeight: '300',
                                                marginLeft: '10px',
                                            }} >
                                                (44) 123 1234 123
                                            </span>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            {t('Email :')}
                                            <span style={{
                                                fontSize: '0.875rem',
                                                color: '#ffffffcc',
                                                fontFamily: /[\u0600-\u06FF]/.test(user?.email) && currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif' // Arabic font for Arabic names
                                                    : currentLanguage === 'ar'
                                                        ? '"Airbnbcereal", sans-serif' // English font for Arabic mode with Latin names
                                                        : '"Airbnbcereal", sans-serif', // Default font for non-Arabic languages
                                                opacity: '1',
                                                fontWeight: '300',
                                                marginLeft: '10px',
                                            }} >
                                                {user?.email}
                                            </span>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            {t('Country :')}
                                            <span style={{
                                                fontSize: '0.875rem',
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                opacity: '1',
                                                fontWeight: '300',
                                                marginLeft: '10px',
                                            }} >
                                                {t('Algeria')}
                                            </span>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            {t('Social :')}
                                            <span style={{
                                                fontSize: '0.875rem',
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                opacity: '1',
                                                fontWeight: '300',
                                                marginLeft: '10px',
                                            }} >
                                                {t('Algeria')}
                                            </span>
                                        </Typography>
                                    </>
                                )}
                            </div>
                            <div className="Conversations"

                                style={{
                                    flex: 1,
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '16px',
                                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                                    boxSizing: 'border-box',
                                    marginTop: isSmallScreen ? '20px' :
                                        isTabletScreen ? '20px' :
                                            'unset',
                                    padding: '10px', // Inner spacing
                                    padding: '20px',
                                    position: 'relative',
                                }}
                            >
                                {/* Skeleton Loader */}
                                <style>
                                    {loadingKeyframes}
                                </style>


                                {!isLoaded && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '12px',
                                            width: currentLanguage === 'ar' && isSmallScreen ? '280%' :
                                                isSmallScreen ? '310%' :
                                                    '100%',
                                            height: '470px',

                                        }}>

                                        <div className='LastConversation '
                                            style={{
                                                width: '40%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                position: 'absolute',
                                                left: '4%',
                                                right: currentLanguage === 'ar' ? '4%' : 'unset',
                                                backgroundColor: '#111827',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div>
                                            {elementsArray.map((_, index) => (
                                                <div key={index} className="LastConvr1"
                                                    style={{
                                                        display: 'flex',
                                                        position: 'absolute',
                                                        alignItems: 'center',
                                                        right: currentLanguage === 'ar' ? '4%' : 'unset',
                                                        justifyContent: 'space-between',
                                                        left: '4%',
                                                        top: `${11 + index * 23}%`, // Adjust top dynamically for each element
                                                        width: '80%',
                                                        zIndex: '111111',
                                                    }}
                                                >
                                                    {/* Circle */}
                                                    <div className="Circle"
                                                        style={{
                                                            backgroundColor: '#111827',
                                                            overflow: 'hidden',
                                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                            backgroundSize: '200% 100%',
                                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                            width: '60px',
                                                            height: '50px',
                                                            borderRadius: '50%',
                                                        }}
                                                    />

                                                    {/* UserContainer */}
                                                    <div className="UserContainer"
                                                        style={{
                                                            display: 'flex',
                                                            width: '70%',
                                                            flexDirection: 'column',
                                                            gap: '3px',
                                                            marginLeft: '10px',
                                                            marginRight: currentLanguage === 'ar' ? '10px' : 'unset',
                                                        }}
                                                    >
                                                        <div className="UserName"
                                                            style={{
                                                                width: '60%',
                                                                height: '16px',
                                                                borderRadius: '16px',
                                                                backgroundColor: '#111827',
                                                                overflow: 'hidden',
                                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                                backgroundSize: '200% 100%',
                                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                            }}
                                                        />
                                                        <div className="Msg"
                                                            style={{
                                                                width: '47%',
                                                                height: '16px',
                                                                borderRadius: '16px',
                                                                backgroundColor: '#111827',
                                                                overflow: 'hidden',
                                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                                backgroundSize: '200% 100%',
                                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                            }}
                                                        />
                                                        <div className="Msg1"
                                                            style={{
                                                                width: '40%',
                                                                height: '16px',
                                                                borderRadius: '16px',
                                                                backgroundColor: '#111827',
                                                                overflow: 'hidden',
                                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                                backgroundSize: '200% 100%',
                                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Reply */}
                                                    <div className="Reply"
                                                        style={{
                                                            width: '20%',
                                                            height: '16px',
                                                            borderRadius: '16px',
                                                            backgroundColor: '#111827',
                                                            overflow: 'hidden',
                                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                            backgroundSize: '200% 100%',
                                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>




                                    </div>

                                )}
                                {/* Content for Conversations */}
                                {isLoaded && (
                                    <>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {t('Last Conversations')}
                                        </Typography>

                                        <div>
                                            {userData.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="UsersMsg1"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: isMediumScreen ? 'space-between' :
                                                            currentLanguage === 'ar' ? 'flex-start' : 'space-between',
                                                        alignItems: 'center',
                                                        marginTop: '20px',
                                                        marginRight: currentLanguage === 'ar' ? '-10px' : 'unset',
                                                        width: currentLanguage === 'fr' ? '90%' : '100%',
                                                    }}
                                                >
                                                    <div
                                                        className='ProfileCircle'
                                                        style={{
                                                            position: 'relative',
                                                            width:
                                                                currentLanguage === 'ar' ? '60px' :

                                                                    '60px',
                                                            height: currentLanguage === 'ar' && isMediumScreen ? '40px' :
                                                                currentLanguage === 'ar' ? '50px' :
                                                                    isMediumScreen ? '45px' :

                                                                        '60px',

                                                            borderRadius: '50%',
                                                            overflow: 'hidden',
                                                            border: '2px solid #ccc',
                                                        }}
                                                    >
                                                        <img
                                                            src="/src/assets/images/small-logos/nabil1.png"
                                                            alt="Profile"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                textAlign: 'center',
                                                            }}
                                                        />
                                                    </div>

                                                    <div
                                                        className="ProfileName"
                                                        style={{
                                                            marginLeft: currentLanguage === 'ar' ? '5px' : '20px',
                                                            marginRight: currentLanguage === 'ar' ? '20px' : '5px',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: 'white',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                fontWeight: 'bold',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            {t('Nabil Hamici')}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: '#ffffffcc',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '300',
                                                                fontSize: '0.75rem',
                                                            }}
                                                        >
                                                            {t('Hi! I need more information..')}
                                                        </Typography>
                                                    </div>

                                                    <div
                                                        style={{
                                                            marginLeft: isMediumScreen && currentLanguage === 'ar' ? '0' : 'auto',
                                                            marginRight: isMediumScreen && currentLanguage === 'ar' ? 'auto' : '0',
                                                        }}
                                                    >
                                                        <Button
                                                            variant="text"
                                                            sx={{
                                                                fontSize: currentLanguage === 'fr' ? '10px' : '12px',
                                                                fontWeight: '600',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            }}
                                                        >
                                                            {t('REPLY')}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="ThirdSEc"
                            style={{
                                width: '96%',
                                marginTop: '10px',
                                display: 'flex',
                                gap: '20px',
                                borderRadius: '16px',
                                padding: '20px', // Optional padding for the section
                                background: 'rgba(0, 0, 0, 0.2)',
                                padding: isSmallScreen ? '20px' : '20px', // Inner spacing
                                boxSizing: 'border-box',
                                position: 'relative',
                                flexDirection: 'column',
                                height: 'auto',
                            }}
                        >
                            {/* Skeleton Loader */}
                            <style>
                                {loadingKeyframes}
                            </style>

                            {/* Skeleton Loader */}
                            {!isLoaded && (
                                <div style={{
                                    display: 'flex  ',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    height: '460px',
                                    width: isSmallScreen ? '450%' : '100%',
                                    gap: '12px',

                                }}>

                                    <div className='Projects '
                                        style={{
                                            width: '72px',
                                            height: '22px',
                                            borderRadius: '16px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            right: currentLanguage === 'ar' ? '0%' : 'unset',
                                            left: '2%',
                                            overflow: 'hidden',

                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='ProjectCat '
                                        style={{
                                            width: isSmallScreen ? '15%' : '20%',
                                            height: '22px',
                                            borderRadius: '16px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            left: '2%',
                                            top: '8%',
                                            right: currentLanguage === 'ar' ? '0%' : 'unset',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='Project1'>

                                        <div className='ProjectPhoto'
                                            style={{
                                                width: '20.4%',
                                                height: '95px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '2%',
                                                top: '17%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectNumber'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '2%',
                                                top: '43%',
                                                right: currentLanguage === 'ar' ? '80.5%' : 'unset',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectMade'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '2%',
                                                top: '51%',
                                                right: currentLanguage === 'ar' ? '80.5%' : 'unset',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectDesc'
                                            style={{
                                                width: '20%',
                                                height: '64px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '2%',
                                                top: '58.5%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectBTNdetails'
                                            style={{
                                                width: '14%',
                                                height: '51px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '2%',
                                                right: currentLanguage === 'ar' ? '80.4%' : 'unset',
                                                top: '76.3%',
                                                zIndex: '111',

                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >
                                            <div className="Memebers"
                                                style={{
                                                    display: 'flex',
                                                    position: 'absolute',
                                                    right: '-53%',
                                                    top: '20%',

                                                    right: currentLanguage === 'ar' ? '80.5%' :
                                                        isSmallScreen ? '-20%' :
                                                            'unset',
                                                }}
                                            >
                                                <div className="Avatar1"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar2"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar3"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar4"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                                        right: currentLanguage === 'ar' ? '80%' : 'unset',
                                                        border: '2px solid white',
                                                        height: '30px',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='Project2'>
                                        <div className='ProjectPhoto'
                                            style={{
                                                width: '20.4%',
                                                height: '95px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '26%',
                                                top: '17%',

                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectNumber'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '26%',
                                                right: currentLanguage === 'ar' ? '54%' : 'unset',
                                                top: '43%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectMade'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '26%',
                                                right: currentLanguage === 'ar' ? '54%' : 'unset',
                                                top: '51%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectDesc'
                                            style={{
                                                width: '20%',
                                                height: '64px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '26%',
                                                top: '58.5%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectBTNdetails'
                                            style={{
                                                width: '14%',
                                                height: '51px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: currentLanguage === 'ar' ? '31.7%' : '26%',
                                                top: '76.3%',
                                                zIndex: '111',

                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >
                                            <div className="Memebers"
                                                style={{
                                                    display: 'flex',
                                                    position: 'absolute',
                                                    right: currentLanguage === 'ar' ? '85%' : '-53%',

                                                    top: '20%',
                                                }}
                                            >
                                                <div className="Avatar1"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar2"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar3"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar4"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        border: '2px solid white',
                                                        position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                                        right: currentLanguage === 'ar' ? '80%' : 'unset',
                                                        height: '30px',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='Project3'>
                                        <div className='ProjectPhoto'
                                            style={{
                                                width: '20.4%',
                                                height: '95px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '52%',
                                                top: '17%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectNumber'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                right: currentLanguage === 'ar' ? '28%' : 'unset',
                                                left: '52%',
                                                top: '43%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectMade'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '52%',
                                                right: currentLanguage === 'ar' ? '28%' : 'unset',
                                                top: '51%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectDesc'
                                            style={{
                                                width: '20%',
                                                height: '64px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '52%',
                                                right: currentLanguage === 'ar' ? '28%' : 'unset',
                                                top: '58.5%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectBTNdetails'
                                            style={{
                                                width: '14%',
                                                height: '51px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                right: currentLanguage === 'ar' ? '28%' : 'unset',
                                                left: '52%',
                                                top: '76.3%',
                                                zIndex: '111',

                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >
                                            <div className="Memebers"
                                                style={{
                                                    display: 'flex',
                                                    position: 'absolute',
                                                    right: currentLanguage === 'ar' ? '85%' : '-53%',
                                                    top: '20%',
                                                }}
                                            >
                                                <div className="Avatar1"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar2"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar3"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar4"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                                        right: currentLanguage === 'ar' ? '80%' : 'unset',
                                                        border: '2px solid white',
                                                        height: '30px',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='Project4'>
                                        <div className='ProjectPhoto'
                                            style={{
                                                width: '20.4%',
                                                height: '95px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                                left: '78%',
                                                top: '17%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectNumber'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '78%',
                                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                                top: '43%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectMade'
                                            style={{
                                                width: '10%',
                                                height: '18px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '78%',
                                                top: '51%',
                                                overflow: 'hidden',
                                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectDesc'
                                            style={{
                                                width: '20%',
                                                height: '64px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '78%',
                                                top: '58.5%',
                                                overflow: 'hidden',
                                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                        <div className='ProjectBTNdetails'
                                            style={{
                                                width: '14%',
                                                height: '51px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                                left: '78%',
                                                top: '76.3%',
                                                zIndex: '111',

                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >
                                            <div className="Memebers"
                                                style={{
                                                    display: 'flex',
                                                    position: 'absolute',
                                                    right: '-53%',
                                                    top: '20%',
                                                    right: currentLanguage === 'ar' ? '80%' : 'unset',
                                                }}
                                            >
                                                <div className="Avatar1"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar2"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar3"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        height: '30px',
                                                        marginRight: '-15px',
                                                        border: '2px solid white',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                                <div className="Avatar4"
                                                    style={{
                                                        overflow: 'hidden',
                                                        backgroundSize: '200% 100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                                        animation: isLoaded ? 'none' : 'loading 2.5s infinite',
                                                        width: '30px',
                                                        border: '2px solid white',
                                                        position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                                        right: currentLanguage === 'ar' ? '80%' : 'unset',

                                                        height: '30px',
                                                        borderRadius: '50%',

                                                    }}
                                                >

                                                </div>
                                            </div>

                                        </div>
                                    </div>




                                </div>


                            )}
                            {/* Content for Third Section */}
                            {isLoaded && (
                                <>
                                    <div className='ProjectsCaTT '
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div className='ProjectsCat' >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {t('Projects')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: '240px',
                                                    fontSize: '0.875rem',
                                                    marginTop: '5px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('Architects design houses')}
                                            </Typography>
                                        </div>
                                        <div className="NewProjectBtn">
                                            <Button
                                                sx={{
                                                    background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                                    color: '#fff',
                                                    borderRadius: '10px',
                                                    width: currentLanguage === 'fr' ? '225px' :
                                                        isSmallScreen ? '90px' :
                                                            '120px',
                                                    height: '35px',
                                                    boxShadow: '0rem 0.1875rem 0.1875rem 0rem rgba(52, 71, 103, 0.15),0rem 0.1875rem 0.0625rem -0.125rem rgba(52, 71, 103, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(52, 71, 103, 0.15)',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '12px',
                                                        fontWeight: '700',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        textTransform: 'uppercase',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {t('+  Add New')}
                                                </Typography>
                                            </Button>
                                        </div>

                                    </div>
                                    <div className="Projects" style={{
                                        marginTop: '25px',
                                        display: 'flex',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        flexDirection: isSmallScreen ? 'column' : 'undifined',
                                        justifyContent: 'space-between',

                                    }} >
                                        <div className="Project1"
                                            style={{
                                                width: isSmallScreen ? '100%' : '20%',
                                                height: 'auto',
                                                borderRadius: '0.75rem',

                                            }}
                                        >
                                            <div className='IMG'
                                                style={{
                                                    width: '100%',
                                                    height: '140px',
                                                    background: 'white',
                                                    borderRadius: '0.75rem',
                                                    backgroundImage: 'url(/src/assets/images/small-logos/images.jpg)',
                                                    backgroundSize: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} // Increase size on hover
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} // Reset size when hover ends
                                            >
                                            </div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: '240px',
                                                    fontSize: '0.875rem',
                                                    marginTop: '15px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('Project #1')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '19px',
                                                    marginTop: '8px',
                                                    marginRight: isSmallScreen && currentLanguage === 'ar' ? '5px' : 'unset'
                                                    ,
                                                }}
                                            >
                                                {t('Modern')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: 'auto',
                                                    fontSize: '0.875rem',
                                                    marginTop: '8px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('As Uber works through a huge amount of internal management turmoil.')}
                                            </Typography>
                                            <div>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        marginTop: '15px',
                                                        borderColor: '#1A73E8',
                                                        background: 'transparent',
                                                        color: '#1A73E8',
                                                        borderRadius: '10px',
                                                        width: isSmallScreen ? '125px' : '108px',
                                                        height: isSmallScreen ? '40px' : 'unset',
                                                    }}
                                                >
                                                    {!isSmallScreen ? (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        >
                                                            {t('View')}
                                                            <span style={{ display: 'block', whiteSpace: 'normal' }}>
                                                                {t('Project')}
                                                            </span>
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {t('View Project')}
                                                        </Typography>
                                                    )}
                                                </Button>
                                                <AvatarGroup total={4}
                                                    sx={{
                                                        position: 'relative',
                                                        top: isSmallScreen ? '-28px' : '-36px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '1', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Remy Sharp" src="http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '2', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Travis Howard" src="http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '3', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Agnes Walker" src="http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '4', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Trevor Henderson" src="http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg" />
                                                </AvatarGroup>
                                            </div>


                                        </div>
                                        <div className="Project2"
                                            style={{
                                                width: isSmallScreen ? '100%' : '20%',
                                                height: 'auto',
                                                marginTop: isSmallScreen ? '25px' : 'undifined',
                                                borderRadius: '0.75rem',

                                            }}
                                        >
                                            <div className='IMG'
                                                style={{
                                                    width: '100%',
                                                    height: '140px',
                                                    background: 'white',
                                                    borderRadius: '0.75rem',
                                                    backgroundImage: 'url(/src/assets/images/small-logos/images.jpg)',
                                                    backgroundSize: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                }}

                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                            </div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: '240px',
                                                    fontSize: '0.875rem',
                                                    marginTop: '15px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('Project #2')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '19px',
                                                    marginTop: '8px',
                                                }}
                                            >
                                                {t('Modern')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: 'auto',
                                                    fontSize: '0.875rem',
                                                    marginTop: '8px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('As Uber works through a huge amount of internal management turmoil.')}
                                            </Typography>
                                            <div>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        marginTop: '15px',
                                                        borderColor: '#1A73E8',
                                                        background: 'transparent',
                                                        color: '#1A73E8',
                                                        borderRadius: '10px',
                                                        width: isSmallScreen ? '125px' : '108px',

                                                    }}
                                                >
                                                    {!isSmallScreen ? (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        >
                                                            {t('View')}
                                                            <span style={{ display: 'block', whiteSpace: 'normal' }}>
                                                                {t('Project')}
                                                            </span>
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {t('View Project')}
                                                        </Typography>
                                                    )}
                                                </Button>
                                                <AvatarGroup total={4}
                                                    sx={{
                                                        position: 'relative',
                                                        top: isSmallScreen ? '-28px' : '-36px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '1', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Remy Sharp" src="http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '2', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Travis Howard" src="http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '3', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Agnes Walker" src="http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '4', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Trevor Henderson" src="http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg" />
                                                </AvatarGroup>
                                            </div>


                                        </div>
                                        <div className="Project3"
                                            style={{
                                                width: isSmallScreen ? '100%' : '20%',
                                                height: 'auto',
                                                marginTop: isSmallScreen ? '25px' : 'undifined',
                                                borderRadius: '0.75rem',

                                            }}
                                        >
                                            <div className='IMG'
                                                style={{
                                                    width: '100%',
                                                    height: '140px',
                                                    background: 'white',
                                                    borderRadius: '0.75rem',
                                                    backgroundImage: 'url(/src/assets/images/small-logos/download.jpg)',
                                                    backgroundSize: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} // Increase size on hover
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} // Reset size when hover ends


                                            >
                                            </div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: '240px',
                                                    fontSize: '0.875rem',
                                                    marginTop: '15px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('Project #3')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '19px',
                                                    marginTop: '8px',
                                                }}
                                            >
                                                {t('Modern')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: 'auto',
                                                    fontSize: '0.875rem',
                                                    marginTop: '8px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('As Uber works through a huge amount of internal management turmoil.')}
                                            </Typography>
                                            <div>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        marginTop: '15px',
                                                        borderColor: '#1A73E8',
                                                        background: 'transparent',
                                                        color: '#1A73E8',
                                                        borderRadius: '10px',
                                                        width: isSmallScreen ? '125px' : '108px',

                                                    }}
                                                >
                                                    {!isSmallScreen ? (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        >
                                                            {t('View')}
                                                            <span style={{ display: 'block', whiteSpace: 'normal' }}>
                                                                {t('Project')}
                                                            </span>
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {t('View Project')}
                                                        </Typography>
                                                    )}
                                                </Button>
                                                <AvatarGroup total={4}
                                                    sx={{
                                                        position: 'relative',
                                                        top: isSmallScreen ? '-28px' : '-36px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '1', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Remy Sharp" src="http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '2', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Travis Howard" src="http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '3', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Agnes Walker" src="http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '4', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Trevor Henderson" src="http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg" />
                                                </AvatarGroup>
                                            </div>


                                        </div>
                                        <div className="Project4"
                                            style={{
                                                width: isSmallScreen ? '100%' : '20%',
                                                height: 'auto',
                                                marginTop: isSmallScreen ? '25px' : 'undifined',
                                                borderRadius: '0.75rem',
                                            }}
                                        >
                                            <div className='IMG'
                                                style={{
                                                    width: '100%',
                                                    height: '140px',
                                                    background: 'white',
                                                    borderRadius: '0.75rem',
                                                    backgroundImage: 'url(/src/assets/images/small-logos/downloadshare.jpg)',
                                                    backgroundSize: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} // Increase size on hover
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} // Reset size when hover ends

                                            >
                                            </div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: '240px',
                                                    fontSize: '0.875rem',
                                                    marginTop: '15px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('Project #4')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '19px',
                                                    marginTop: '8px',
                                                }}
                                            >
                                                {t('Modern')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '1',
                                                    fontWeight: '300',
                                                    width: 'auto',
                                                    fontSize: '0.875rem',
                                                    marginTop: '8px',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '1',
                                                    lineHeight: '1.5',
                                                }}
                                            >
                                                {t('As Uber works through a huge amount of internal management turmoil.')}
                                            </Typography>
                                            <div>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        marginTop: '15px',
                                                        borderColor: '#1A73E8',
                                                        background: 'transparent',
                                                        color: '#1A73E8',
                                                        borderRadius: '10px',
                                                        width: isSmallScreen ? '124px' : '108px',

                                                    }}
                                                >
                                                    {!isSmallScreen ? (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'normal',
                                                            }}
                                                        >
                                                            {t('View')}
                                                            <span style={{ display: 'block', whiteSpace: 'normal' }}>
                                                                {t('Project')}
                                                            </span>
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textTransform: 'uppercase',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {t('View Project')}
                                                        </Typography>
                                                    )}
                                                </Button>
                                                <AvatarGroup total={4}
                                                    sx={{
                                                        position: 'relative',
                                                        top: isSmallScreen ? '-28px' : '-36px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '1', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Remy Sharp" src="http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '2', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Travis Howard" src="http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '3', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Agnes Walker" src="http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg" />
                                                    <Avatar sx={{
                                                        width: '20px', height: '20px', zIndex: '4', '&:hover': {
                                                            zIndex: 5,
                                                        },
                                                    }} alt="Trevor Henderson" src="http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg" />
                                                </AvatarGroup>
                                            </div>


                                        </div>
                                    </div>
                                </>
                            )}

                        </div>



                    </div>
                </>
            )}

            {profileSettings && (
                <>
                    <ProfileSettings handleOpenVerify={handleOpenVerify} setProfile={setProfile} setProfileSettings={setProfileSettings} />
                </>
            )}
        </div>




    )
}

export default Profilecontent
