import React, { useState, useEffect, useRef } from "react";
import i18n from 'i18next';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, InputAdornment } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../../Context/UserContext.jsx'
import { motion, AnimatePresence } from "framer-motion";
import { faCircleInfo, faTrash, faLock, faMobileScreenButton, faTabletScreenButton, faEllipsisVertical, faLaptop } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay.jsx'



function Security({ handleOpenPhoneCode, handleOpenNewEmail }) {

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
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser, loginAttempts, pagination, currentPage, setCurrentPage, isLoaded, error } = useUser();

    const navigate = useNavigate();
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);



    const enableTwoFactorAuth = async () => {
        const userId = user?._id; // Extract user ID

        if (!userId) {  // Corrected condition to check if userId is missing
            console.error("User ID is missing.");
            return alert("User ID is required to enable 2FA.");
        }

        setIsLoading(true); // Start loading

        setTimeout(async () => { // Add 2-second delay
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/server/users/enable-2fa`,
                    { userId }, // Send userId in the request body
                    { withCredentials: true } // Ensures cookies are sent
                );

                console.log("2FA Enabled:", response.data.message);
                setUser((prevUser) => ({ ...prevUser, twoFactorEnabled: true }));



            } catch (error) {
                console.error("Error enabling 2FA:", error.response?.data?.message || error.message);
                alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
            } finally {
                setIsLoading(false); // Stop loading
            }
        }, 2000); // 2-second delay
    };

    const ShutTwoFactorAuth = async () => {
        const userId = user?._id; // Extract user ID

        if (!userId) {  // Corrected condition to check if userId is missing
            console.error("User ID is missing.");
            return alert("User ID is required to enable 2FA.");
        }

        setIsLoading(true); // Start loading

        setTimeout(async () => { // Add 2-second delay
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/server/users/shut-2fa`,
                    { userId }, // Send userId in the request body
                    { withCredentials: true } // Ensures cookies are sent
                );

                console.log("2FA Disblayed:", response.data.message);
                setUser((prevUser) => ({ ...prevUser, twoFactorEnabled: false }));



            } catch (error) {
                console.error("Error enabling 2FA:", error.response?.data?.message || error.message);
                alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
            } finally {
                setIsLoading(false); // Stop loading
            }
        }, 2000); // 2-second delay
    };

    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;

        const fetchSessions = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/server/sessions/active-sessions/${userId}`,
                    { withCredentials: true }
                );
                setSessions(response.data);

                // Find current session
                const currentSession = response.data.find(session => session.isCurrentSession);
                if (currentSession) {
                    setCurrentSessionId(currentSession.sessionId);
                }

                console.log('Active Sessions', response.data);
            } catch (error) {
                console.error("Error fetching active sessions:", error);
            }
        };

        fetchSessions();
    }, [userId]);

    const getDeviceIcon = (device) => {
        if (!device) return faLaptop; // Default to laptop if no info is available

        const lowerDevice = device.toLowerCase();

        if (lowerDevice.includes('windows') || lowerDevice.includes('mac') || lowerDevice.includes('linux')) {
            return faLaptop;
        } else if (lowerDevice.includes('iphone') || lowerDevice.includes('android')) {
            return faMobileScreenButton;
        } else if (lowerDevice.includes('ipad') || lowerDevice.includes('tablet')) {
            return faTabletScreenButton;
        }

        return faLaptop; // Default fallback
    };


    const [showChatDetails, setShowChatDetails] = useState(false);
    const menuRef = useRef(null);
    const [menuActive, setMenuActive] = useState(false);

    const [activeMenu, setActiveMenu] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const toggleMenu = (sessionId) => {
        if (activeMenu === sessionId) {
            // If the clicked menu is already active, close it
            setIsClosing(true);
            setTimeout(() => {
                setActiveMenu(null);
                setIsClosing(false);
            }, 300);
        } else {
            // Open the clicked menu
            setActiveMenu(sessionId);
        }
    };


    const handleOutsideClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            if (menuActive) handleToggleMenu();
        }
    };

    const handleLoadingComplete = () => {
        navigate('/auth/signin');
    };



    const handleSignOutAllDevices = async () => {
        try {
            const userId = user?._id;
            if (!userId) return console.error("Invalid user ID");

            // Show loading overlay immediately
            setShowLoadingOverlay(true);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/sessions/sign-out-all/${userId}`,
                {}, // No request body needed
                { withCredentials: true }
            );

            if (response.status !== 200) throw new Error("Failed to sign out from all devices");

            console.log(response.data.message); // "Logged out from all devices successfully"

            // Hide loading overlay after successful sign-out
            setShowLoadingOverlay(false);

            // Clear the sessions state in the UI
            setSessions([]);

            // Navigate to the sign-in page
            navigate('/auth/signin');
        } catch (error) {
            console.error("Error signing out from all devices:", error);

            // Hide loading overlay in case of error
            setShowLoadingOverlay(false);
        }
    };

    const handleSignOutDevice = async (sessionId) => {
        try {
            const userId = user?._id;
            if (!userId || !sessionId) return console.error("Invalid user or session ID");

            // Show loading overlay immediately
            setShowLoadingOverlay(true);

            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/server/sessions/sessions/${userId}/${sessionId}`,
                { withCredentials: true }
            );

            if (response.status !== 200) throw new Error("Failed to sign out session");

            // If it's NOT current session and there are still sessions, update the list
            if (!response.data.isCurrentSession && response.data.sessions.length > 0) {
                setShowLoadingOverlay(false);
                setSessions(response.data.sessions);
            } else {
                // If it's the current session or no sessions left, navigate to sign-in page
                navigate('/auth/signin');
            }
        } catch (error) {
            console.error("Error signing out session:", error);
            setShowLoadingOverlay(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/auth/logout`,
                {}, // empty body
                { withCredentials: true }
            );

            if (response.status !== 200) {
                throw new Error('Failed to logout');
            }

            // Clear any local state/context here
            // For example, if you're using a user context:
            // setUser(null);

            // Redirect to login page
            navigate('/auth/signin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    const [direction, setDirection] = useState(0);
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };


    const pages = Array.from(
        { length: pagination.totalPages },
        (_, index) => index + 1
    );

    const handlePageClick = (page) => {
        setDirection(page > currentPage ? 1 : -1);
        setCurrentPage(page);
        loginAttempts(page);
    };


    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setDirection(-1);
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < pagination.totalPages) {
            setDirection(1);
            setCurrentPage(prev => prev + 1);
        }
    };


    return (

        <>

            <div className="slide-from-right"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundClip: 'border-box',
                    padding: '20px',
                    gap: '15px',
                }}
            >
                <div className="SecuritySection">
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        {t('Security Section')}
                    </Typography>
                </div>
                <div className="FirstSEc"
                    style={{
                        display: 'flex',
                        gap: '10px',
                    }}
                >
                    <div className="TwoAuth"
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            width: '50%',
                            height: 'auto',
                            padding: '15px',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',

                            textAlign: 'center',
                            gap: '15px',


                        }}

                    >
                        {user?.twoFactorEnabled && (
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(10px)" }} // Start blurred
                                animate={{ opacity: 1, filter: "blur(0px)" }} // Clear blur
                                transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
                                className="2FStatus"
                                style={{
                                    width: '90%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="Status">
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            lineHeight: '1.2',
                                        }}
                                    >
                                        {t('2FA Status')}
                                    </Typography>
                                </div>
                                <div className="StatusColor"
                                    style={{
                                        background: '#194e3d',
                                        height: '20px',
                                        width: '70px',
                                        borderRadius: '16px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#2df873",
                                            fontFamily: "Airbnbcereal, sans-serif",
                                            fontWeight: "bold",
                                            textTransform: "capitalize",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {t('Active')}
                                    </Typography>
                                </div>
                            </motion.div>
                        )}

                        <div className="SecurityIcon"
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '13px',

                                background: 'rgb(91, 193, 253)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faLock}
                                style={{ transform: 'rotate(0deg)', fontSize: '23px', color: 'white', stroke: 4 }} // Reset any unwanted rotation
                            />

                        </div>
                        <div className="typo"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',

                                gap: '5px',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    margin: 'auto',
                                    display: 'flex',
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap', // Prevent wrapping
                                }}
                            >
                                {t('Two-Factor Authentication')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                    display: 'flex',

                                    fontSize: '14px',


                                }}
                            >
                                {t('Two-Factor Authentication (2FA) adds an extra layer of security to your account by requiring a second verification step, keeping your data safe from unauthorized access.')}
                            </Typography>

                        </div>
                        <div className="Options"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            {!user?.ConfirmedSecondaryEmail && (
                                <div className="1 "
                                    style={{
                                        width: '90%',
                                        border: '1px solid white',
                                        height: 'auto',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        padding: '10px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div className="IconAndTypo"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center', // Ensures vertical alignment
                                            gap: '10px', // Increase spacing if needed
                                        }}
                                    >
                                        <div className="Icon" style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon
                                                icon={faMobileScreenButton}
                                                style={{
                                                    fontSize: '26px',
                                                    color: 'white',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            />
                                        </div>

                                        <div className="TYpo"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start'

                                            }}>
                                            <Typography
                                                sx={{
                                                    color: '#ffffff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'nowrap',
                                                    lineHeight: '1.2', // Ensure proper spacing
                                                }}
                                            >
                                                {t('SMS Recovery')}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: '#ffffff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '0.8',
                                                    fontSize: '14px',
                                                    whiteSpace: 'nowrap',
                                                    marginTop: '2px', // Adjust margin for better alignment
                                                }}
                                            >
                                                {t('With your phone number')}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div className="Button">
                                        <Button
                                            variant="outlined"
                                            onClick={user?.isPhoneVerified ? null : handleOpenPhoneCode} // Disable click if verified
                                            sx={{
                                                borderColor: user?.isPhoneVerified ? "#2df873" : "white",
                                                backgroundColor: user?.isPhoneVerified ? "#194e3d" : "transparent",
                                                "&:hover": {
                                                    borderColor: user?.isPhoneVerified ? "#2df873" : "white",
                                                    backgroundColor: user?.isPhoneVerified
                                                        ? "#194e3d"
                                                        : "rgba(255, 255, 255, 0.1)",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: user?.isPhoneVerified ? "#2df873" : "white",
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                    fontWeight: "bold",
                                                    textTransform: "capitalize",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {user?.isPhoneVerified ? t("Active") : t("Setup")}

                                            </Typography>
                                        </Button>
                                    </div>



                                </div>
                            )}
                            {!user?.isPhoneVerified && (
                                <div className="2"
                                    style={{
                                        width: '90%',
                                        border: '1px solid white',
                                        height: 'auto',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        padding: '10px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div className="IconAndTypo"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center', // Ensures vertical alignment
                                            gap: '10px', // Increase spacing if needed
                                        }}
                                    >
                                        <div className="Icon" style={{ display: 'flex', alignItems: 'center' }}>
                                            <FontAwesomeIcon
                                                icon={faMobileScreenButton}
                                                style={{
                                                    fontSize: '26px',
                                                    color: 'white',
                                                    transform: 'rotate(0deg)'
                                                }}
                                            />
                                        </div>

                                        <div className="TYpo"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start'

                                            }}>
                                            <Typography
                                                sx={{
                                                    color: '#ffffff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'nowrap',
                                                    lineHeight: '1.2', // Ensure proper spacing
                                                }}
                                            >
                                                {t('Another E-mail')}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: '#ffffff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    opacity: '0.8',
                                                    fontSize: '14px',
                                                    whiteSpace: 'nowrap',
                                                    marginTop: '2px', // Adjust margin for better alignment
                                                }}
                                            >
                                                {t('Email to send verification link')}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div className="Button">
                                        <Button
                                            variant="outlined"
                                            onClick={user?.ConfirmedSecondaryEmail ? null : handleOpenNewEmail} // Disable click if confirmed
                                            sx={{
                                                borderColor: user?.ConfirmedSecondaryEmail ? "#2df873" : "white",
                                                backgroundColor: user?.ConfirmedSecondaryEmail ? "#194e3d" : "transparent",
                                                "&:hover": {
                                                    borderColor: user?.ConfirmedSecondaryEmail ? "#2df873" : "white",
                                                    backgroundColor: user?.ConfirmedSecondaryEmail
                                                        ? "#194e3d"
                                                        : "rgba(255, 255, 255, 0.1)",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: user?.ConfirmedSecondaryEmail ? "#2df873" : "white",
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                    fontWeight: "bold",
                                                    textTransform: "capitalize",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {user?.ConfirmedSecondaryEmail ? t("Active") : t("Setup")}
                                            </Typography>
                                        </Button>

                                    </div>



                                </div>
                            )}




                            {(user?.ConfirmedSecondaryEmail || user?.isPhoneVerified) && (
                                <Button
                                    onClick={user?.twoFactorEnabled ? ShutTwoFactorAuth : enableTwoFactorAuth}
                                    className="btn-grad"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        height: '40px',
                                        width: '90%',
                                        opacity: isLoading ? '0.5' : 'unset',
                                        padding: '0 20px',
                                    }}
                                    disabled={isLoading} // Disable button while loading
                                >
                                    {isLoading ? (
                                        <div className="lds-dual-ring" style={{ margin: 'auto' }}></div>
                                    ) : (
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '14px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {user?.twoFactorEnabled ? t('Disable (2FA)') : t('Enable (2FA)')}
                                        </Typography>
                                    )}
                                </Button>

                            )}


                        </div>

                    </div>
                    <div className="Devices"
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            width: '50%',
                            height: 'auto',
                            padding: '15px',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',

                            textAlign: 'center',
                            gap: '15px',


                        }}

                    >
                        <div className="DeviceIcon"
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '13px',
                                background: 'linear-gradient(195deg, rgb(239, 83, 80), rgb(229, 57, 53))',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faLaptop}
                                style={{ transform: 'rotate(0deg)', fontSize: '23px', color: 'white', stroke: 4 }} // Reset any unwanted rotation
                            />

                        </div>
                        <div className="typo"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',

                                gap: '5px',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    margin: 'auto',
                                    display: 'flex',
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap', // Prevent wrapping
                                }}
                            >
                                {t('Devices')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                    display: 'flex',

                                    fontSize: '14px',


                                }}
                            >
                                {t('See a list of devices that have accessed your account. Manage and secure your logins by reviewing active sessions and signing out of unrecognized devices.')}
                            </Typography>

                        </div>
                        <Button
                            onClick={handleSignOutAllDevices}
                            className="btn-grad"
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                height: '40px',
                                width: '90%',
                                opacity: isLoading ? '0.5' : 'unset',
                                padding: '0 20px',
                            }}
                            disabled={showLoadingOverlay}
                        >

                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '14px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                }}
                            >
                              {showLoadingOverlay ? t("Signing Out...") : t("Sign Out from All Devices")}

                            </Typography>

                        </Button>
                        <div className="List"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            {sessions.length > 0 ? (
                                sessions.map((session) => (
                                    <div className="border"  key={session._id || session.sessionId}
                                        style={{
                                            width: '90%',
                                            border: '1px solid white',
                                            height: 'auto',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            padding: '10px',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* Left Section: Device Icon + Info */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}>
                                            <FontAwesomeIcon
                                                icon={faLaptop} // Change icon based on session.device type
                                                style={{
                                                    fontSize: '23px',
                                                    color: 'white',
                                                    transform: 'rotate(0deg)',
                                                }}
                                            />

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                            }}>
                                                <Typography sx={{
                                                    color: '#ffffff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {session.browser} on {session.os}
                                                </Typography>

                                                <Typography sx={{
                                                    color: '#ffffff',
                                                    opacity: '0.8',
                                                    fontSize: '14px',
                                                    whiteSpace: 'nowrap',
                                                    marginTop: '2px',
                                                }}>
                                                    {session.location} - {new Date(session.loginTime).toLocaleString()}
                                                </Typography>
                                            </div>
                                        </div>


                                        <div className="menu-wrapper" ref={menuRef}>
                                            <FontAwesomeIcon
                                                className=""
                                                icon={faEllipsisVertical}
                                                onClick={() => toggleMenu(session._id)} // Pass session ID
                                                style={{
                                                    transform: "rotate(0deg)",
                                                    fontSize: "20px",
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                    position : 'relative',
                                                    opacity: activeMenu === session._id ? 1 : 0.3, // Make active one fully visible
                                                }}
                                            />

                                            {activeMenu === session._id && (
                                                <div className={`menu-items ${isClosing ? "closing" : ""}`}

                                                    style={{
                                                        position: "absolute",
                                                     
                                                        [currentLanguage === 'ar' ? 'left' : 'right']: '7%',
                                                        background: "rgba(0, 0, 0, 0.9)",
                                                        border: "1px solid white",
                                                        borderRadius: currentLanguage === 'ar' ? "00px 20px 20px 20px" : "20px 0px 20px 20px",
                                                        marginTop: "10px",
                                                        width : '280px',
                                                        minWidth: "270px",
                                                        
                                                        zIndex: 1000,
                                                        padding: 0,
                                                        transition: activeMenu === session._id
                                                            ? "all 0.5s cubic-bezier(0.000, 0.105, 0.035, 1.570)"
                                                            : "all 0.3s ease-in-out",
                                                    }}
                                                >
                                                    <div className="ListContainer"
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '15px',
                                                            padding: '15px',
                                                            transition: "all 0.3s ease-in-out",
                                                        }}
                                                    >
                                                        <div className="Option1"
                                                            style={{
                                                                width: '100%',
                                                                height: '50px',
                                                                background: 'rgba(255,255,255,0.1)',
                                                                borderRadius: '16px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                padding: '5px',
                                                                cursor: 'pointer',
                                                                gap: '8px',
                                                                transition: 'transform 0.3s ease',
                                                            }}
                                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                            onClick={() => setShowChatDetails(true)} 
                                                        >
                                                            <div className="OpetionIcon"
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    background: 'rgb(42, 84, 113)',
                                                                    borderRadius: '16px',

                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faCircleInfo}
                                                                    style={{
                                                                        transform: 'rotate(0deg)',
                                                                        fontSize: '24px',
                                                                        color: '#5BC1FD',
                                                                    }} // Reset any unwanted rotation
                                                                />


                                                            </div>
                                                            <div className="TYpo">
                                                                <Typography
                                                                    sx={{
                                                                        color: "white",
                                                                        fontSize: '14px',
                                                                        fontWeight: 'bold',

                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                                    }}>
                                                                    {t('Report Suspicious Activity')}
                                                                </Typography>
                                                            </div>




                                                        </div>
                                                        <div className="Option2"
                                                            onClick={() => handleSignOutDevice(session._id)}
                                                            style={{
                                                                width: '100%',
                                                                height: '50px',
                                                                background: 'rgba(255,255,255,0.1)',
                                                                borderRadius: '16px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                padding: '5px',
                                                                gap: '8px',
                                                                cursor: 'pointer',
                                                                transition: 'transform 0.3s ease',
                                                            }}
                                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                        >
                                                            <div className="OpetionIcon"
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    background: 'rgb(79, 25, 65)',
                                                                    borderRadius: '16px',

                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash}
                                                                    style={{
                                                                        transform: 'rotate(0deg)',
                                                                        fontSize: '18px',
                                                                        color: 'rgb(194, 40, 132)',
                                                                    }} // Reset any unwanted rotation
                                                                />

                                                            </div>
                                                            <div className="DetailsTypo">
                                                                <Typography
                                                                    sx={{
                                                                        color: "white",
                                                                        fontSize: '14px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                                    }}>
                                                                    {t('Sign Out This Device')}
                                                                </Typography>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography sx={{ color: '#ffffff', opacity: '0.7', fontSize: '14px' }}>
                                    No active sessions found.
                                </Typography>
                            )}
                        </div>


                    </div>
                </div>
                <div className="UserLoginLogs"
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        width: '100%',
                        height: 'auto',
                        padding: '15px',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '15px',
                    }}
                >
                    <div className="LogsTypo">
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                margin: 'auto',
                                display: 'flex',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap', // Prevent wrapping
                            }}
                        >
                            {t('Login History & Security Logs')}
                        </Typography>
                    </div>
                    <div className="Datatable"
                        style={{
                            width: "100%",
                            padding: "5px",
                            background: "rgba(0, 0, 0, 0.8)",
                            color: "white",
                            borderRadius: "16px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Header Row */}
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                padding: "5px",
                                justifyContent: "space-between",
                                borderBottom: "1px solid grey",
                            }}
                        >
                            {[
                                { label: "Browser", flex: 2 },
                                { label: "Device", flex: 2 },
                                { label: "IP", flex: 2 },
                                { label: "Location", flex: 2 },
                                { label: "Time", flex: 1.5 },
                                { label: "Status", flex: 1.5 },
                            ].map(({ label, flex }) => (
                                <div key={label} style={{ flex, textAlign: "center" }}>
                                    <Typography
                                        sx={{
                                            color: "#ffffff",
                                            fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: "600",
                                            fontSize: "15px",
                                        }}
                                    >
                                       {t(label)}

                                    </Typography>
                                </div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                        >
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div
                                    key={currentPage}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                >
                                    {loginAttempts.length > 0 ? (
                                        loginAttempts.map((attempt) => (
                                            <div
                                                key={attempt._id}
                                                className="attempt-item"
                                                style={{
                                                    display: "flex",
                                                    width: "100%",
                                                    alignItems: "center",
                                                    padding: "10px 5px",
                                                    justifyContent: "space-between",
                                                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                                                }}
                                            >
                                                {[
                                                    { value: attempt.browser || "Unknown", flex: 2 },
                                                    { value: attempt.device || "Unknown", flex: 2 },
                                                    { value: attempt.ip || "Unknown", flex: 2 },
                                                    { value: attempt.location || "Unknown", flex: 2 },
                                                    { value: new Date(attempt.timestamp).toLocaleString(), flex: 1.5 },
                                                ].map(({ value, flex }) => (
                                                    <div key={value} style={{ flex, textAlign: "center" }}>
                                                        <Typography
                                                            sx={{
                                                                color: "#ffffff",
                                                                fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            {value}
                                                        </Typography>
                                                    </div>
                                                ))}

                                                <div style={{ flex: 1.5, display: "flex", justifyContent: "center" }}>
                                                    <div
                                                        className="StatusColor"
                                                        style={{
                                                            background: attempt.status === "success" ? "#194e3d" : "#4e1919",
                                                            height: "20px",
                                                            width: "70px",
                                                            borderRadius: "16px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: attempt.status === "success" ? "#2df873" : "#f82d2d",
                                                                fontFamily: "Airbnbcereal, sans-serif",
                                                                fontWeight: "bold",
                                                                textTransform: "capitalize",
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            {attempt.status}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ padding: "10px", textAlign: "center", color: "#bbb" }}>
                                            {error ? error : "No login attempts found."}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination Controls - Original Styling */}
                            <div
                                className="Pages"
                                style={{
                                    width: '100%',
                                    height: '30px',
                                    background: 'transparent',
                                    marginTop: '50px',
                                    display: 'flex',
                                    gap: '5px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    right: isSmallScreen ? (currentLanguage === 'ar' ? '0px' : '5px') : 'unset',
                                }}
                            >
                                <div id={currentLanguage === 'ar' ? 'triangleRight' : 'triangleLeft'}></div>
                                {pages.map((page) => (
                                    <div
                                        key={page}
                                        onClick={() => handlePageClick(page)}
                                        style={{
                                            width: '38px',
                                            height: isSmallScreen ? '30px' : '38px',
                                            background: page === currentPage ? 'rgb(91, 66, 243)' : 'hsl(240, 3.7%, 15.88%)',
                                            color: page === currentPage ? 'white' : 'white',
                                            borderRadius: '13px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
                                        }}
                                    >
                                        <Typography>{page}</Typography>
                                    </div>
                                ))}
                                <div id={currentLanguage === 'ar' ? 'triangleLeft' : 'triangleRight'}></div>
                            </div>

                            {/* Next/Previous Buttons - Original Styling */}
                            <div
                                className="Buttonss"
                                style={{
                                    display: 'flex',
                                    gap: '5px',
                                    justifyContent: 'center',
                                    marginTop: '20px',
                                }}
                            >
                                <Button
                                    onClick={handlePreviousClick}
                                    sx={{
                                        color: 'rgb(91, 66, 243)',
                                        WebkitTapHighlightColor: 'transparent',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        minWidth: '64px',
                                        height: '32px',
                                        padding: '0 12px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        appearance: 'none',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        transition: 'transform 0.2s, colors 0.2s, opacity 0.2s',
                                        userSelect: 'none',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {t('Previous')}
                                </Button>
                                <Button
                                    onClick={handleNextClick}
                                    sx={{
                                        color: 'rgb(91, 66, 243)',
                                        WebkitTapHighlightColor: 'transparent',
                                        borderRadius: '8px',
                                        boxSizing: 'border-box',
                                        appearance: 'none',
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                        fontSize: '13px',
                                        width: '80px',
                                        fontWeight: 'bold',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        transition: 'transform 0.2s, colors 0.2s, opacity 0.2s',
                                        textTransform: 'capitalize',
                                        height: '32px',
                                        padding: '0 12px',
                                        outline: 'none',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {t('Next')}
                                </Button>
                            </div>
                        </motion.div>






                    </div>



                </div>

            </div>

            <LoadingOverlay
                isVisible={showLoadingOverlay}
                onComplete={() => navigate('/auth/signin')}
            />


        </>
    )
}

export default Security
