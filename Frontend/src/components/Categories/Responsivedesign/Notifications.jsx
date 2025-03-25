import React, { useState, useEffect, useRef } from "react";
import i18n from 'i18next';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, InputAdornment } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../../Context/UserContext.jsx'
import { useNotifications } from '../../../Context/NotificationContext.jsx'
import { faBell, faMoneyCheckDollar, faBriefcase, faShield } from '@fortawesome/free-solid-svg-icons';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";





function Notifications({ setSelectedSection }) {
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


    const { user } = useUser();
    const {
        notifications,
        unreadCount,
        markAllAsRead,
        markSingleNotificationAsRead,
        startConversation,
        isLoading,
    } = useNotifications();





    // Handle marking a single notification as read
    const handleMarkAsRead = (notificationId) => {
        markSingleNotificationAsRead(notificationId);

    };

    // Handle marking all notifications as read
    const handleMarkAllAsRead = () => {
        markAllAsRead();
        toast.success('All notifications marked as read');
    };


    // Helper function to get the correct profile image URL
    const getProfileImage = (profileImg) => {
        const defaultCloudinaryURL = "https://res.cloudinary.com/damicjacf/image/upload/v1728490158/_227d921a-77b1-4047-8480-964083c7dcf7_pttzxu.png"; // Default Cloudinary URL

        // Check if it's a file stored under 'uploads' and prepend backend URL
        if (profileImg && profileImg.startsWith("uploads")) {
            return `${import.meta.env.VITE_BACKEND_URL}/${profileImg}`; // Concatenate the backend URL with the image path
        }

        // Return the profile image URL as is (for Cloudinary or other URLs)
        return profileImg || defaultCloudinaryURL; // Fallback to default image if profileImg is missing
    };

    const containsArabic = (text) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    };

    const navigate = useNavigate();




    return (
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
            <div className="Header">
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
                    {t('Notification Section')}
                </Typography>
            </div>
            <div className="Categories"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',

                }}
            >
                <div className="CssGlass SystemNot"

                    style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '10px',
                        cursor: 'pointer',
                        alignItems: 'center',


                    }}
                >


                    <div className="System"
                        style={{
                            backgroundColor: "#ede5fe",
                            width: "35px", // Adjust size as needed
                            height: "35px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 10px 4px #5BC1FD", // Glow effect with the same color as the icon

                        }}
                    >

                        <FontAwesomeIcon
                            icon={faBell}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#5BC1FD', stroke: 4 }} // Reset any unwanted rotation
                        />

                    </div>
                    <div className="TYpo"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                lineHeight: '20px',
                                fontSize: '15px',
                                textAlign: 'center',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}
                        >

                            {t('System Notifications')}
                        </Typography>


                    </div>



                </div>
                <div className="CssGlass PaymentsNotifications "

                    style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '10px',
                        cursor: 'pointer',
                        alignItems: 'center',


                    }}
                >


                    <div className="PaymentsNotifications"
                        style={{
                            backgroundColor: "#ede5fe",
                            width: "35px", // Adjust size as needed
                            height: "35px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 10px 4px #c22884",  // Glow effect with the same color as the icon

                        }}
                    >

                        <FontAwesomeIcon
                            icon={faMoneyCheckDollar}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#c22884', stroke: 4 }} // Reset any unwanted rotation
                        />

                    </div>
                    <div className="TYpo"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                lineHeight: '20px',
                                textAlign: 'center',
                                fontSize: '15px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}
                        >

                            {t('Payments Notifications')}
                        </Typography>


                    </div>



                </div>
                <div className="CssGlass ProjectsNot"

                    style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '10px',
                        cursor: 'pointer',
                        alignItems: 'center',


                    }}
                >


                    <div className="Projects"
                        style={{
                            backgroundColor: "#ede5fe",
                            width: "35px", // Adjust size as needed
                            height: "35px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 10px 4px #8b5cf6", // Glow effect with the same color as the icon

                        }}
                    >

                        <FontAwesomeIcon
                            icon={faBriefcase}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#8b5cf6', stroke: 4 }} // Reset any unwanted rotation
                        />

                    </div>
                    <div className="TYpo"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                lineHeight: '20px',
                                textAlign: 'center',
                                fontSize: '15px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}
                        >

                            {t('Projects Notifications')}
                        </Typography>


                    </div>



                </div>
                <div className="CssGlass ProjectsNot"

                    style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '10px',
                        cursor: 'pointer',
                        alignItems: 'center',


                    }}
                >


                    <div className="Projects"
                        style={{
                            backgroundColor: "#ede5fe",
                            width: "35px", // Adjust size as needed
                            height: "35px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 10px 4px rgb(38, 238, 195)", // Glow effect with the same color as the icon

                        }}
                    >

                        <FontAwesomeIcon
                            icon={faBriefcase}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: 'rgb(38, 238, 195)', stroke: 4 }} // Reset any unwanted rotation
                        />

                    </div>
                    <div className="TYpo"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                lineHeight: '20px',
                                textAlign: 'center',
                                fontSize: '15px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}
                        >

                            {t('Chats Notifications')}
                        </Typography>


                    </div>



                </div>


            </div>
            <div className="Line"
                style={{
                    width: '100%',
                    height: '1px',
                    background: 'white',

                }}
            >

            </div>
            <div>


                {notifications.map((notification) => (
                    <React.Fragment key={notification._id}>
                        <div className="NotContent"
                            style={{
                                display: 'flex',

                                borderRadius: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                height: 'auto',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div className="Header"
                                style={{
                                    width: '100%',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    padding: '10px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="FirstSec"
                                    style={{
                                        display: 'flex',
                                        gap: '5px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div className="KhadmatLogo"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            borderRadius: '50%',
                                            border: '1.5px solid white',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <img
                                            src={
                                                notification.type === "system" || notification.type === "payments"
                                                    ? "/src/assets/images/small-logos/NotLogo.png"
                                                    : notification.sender?.profileImg // Use optional chaining to avoid errors
                                                        ? getProfileImage(notification.sender.profileImg)
                                                        : "/src/assets/images/default-profile.png" // Fallback image
                                            }
                                            alt="Khadamat Logo"
                                            style={{
                                                width: "90%",
                                                height: "90%",
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                            }}
                                        />

                                    </div>
                                    <div className="KhadamatName">
                                        <Typography
                                            sx={{
                                                color: 'rgb(91, 193, 253)',
                                                fontFamily: 'Airbnbcereal, sans-serif',
                                                fontSize: '15px',

                                            }}>

                                            {notification.sender
                                                ? `${notification.sender.firstName} ${notification.sender.lastName}`
                                                : "System Notification"}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: 'Airbnbcereal, sans-serif',
                                                opacity: '0.8',
                                                fontSize: '14px',
                                                direction: currentLanguage === 'ar' ? 'ltr' : 'unset',
                                            }}
                                        >
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </Typography>
                                    </div>
                                </div>


                                <div className="SecondSec"
                                    style={{
                                        background: 'grey',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '30px',
                                        padding: '5px',
                                        gap: '5px', // Ensures spacing between icon and text
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: 'Airbnbcereal, sans-serif',
                                            fontSize: '14px',

                                        }}
                                    >
                                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                    </Typography>
                                    <FontAwesomeIcon
                                        icon={faShield}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '19px',
                                            color: '#2df873',
                                        }} // Reset any unwanted rotation
                                    />
                                </div>


                            </div>
                            <div className="Line"
                                style={{
                                    width: '100%',
                                    height: '1px',
                                    background: 'grey',
                                }}
                            />
                            <div className="TitelAndContent"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '10px',
                                    gap: '10px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        fontSize: '16px',
                                    }}
                                >
                                    {t(notification.title)}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                        fontSize: '15px',
                                        opacity: '0.8',
                                        lineHeight: '25px',
                                    }}
                                >
                                    {notification.description === "register" ? (
                                        <>
                                            {t('Hi')}
                                            <span
                                                style={{
                                                    fontFamily: notification.firstName && containsArabic(notification.firstName)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {notification.firstName}
                                            </span>
                                            {t(', We are thrilled to have you on board! 🎉 To unlock the full potential of your account and start connecting with buyers and sellers, please verify your account. This step ensures a secure and seamless experience for you and the Khadamat community.')}

                                            <span style={{ display: 'block' }}>
                                                {t('Verify Account :')}
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => setSelectedSection("Account")}
                                                    sx={{

                                                        marginLeft: '5px',
                                                        borderRadius: '16px',
                                                        background: 'rgb(91, 193, 253)',
                                                        "&:hover": {
                                                            borderColor: "white",
                                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                        },
                                                    }}

                                                >
                                                    <Typography
                                                        sx={{
                                                            color: "white",
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                            fontWeight: "bold",
                                                            textTransform: "capitalize",
                                                            fontSize: "13px",
                                                            display: 'flex',
                                                            gap: '5px',
                                                            alignItems: 'center',
                                                        }}
                                                    >

                                                        {t('Start From Here')}

                                                    </Typography>
                                                </Button>
                                            </span>
                                        </>

                                    ) : notification.description === "offerdeclined" ? (
                                        <>
                                            {t('Hi')}
                                            <span
                                                style={{
                                                    fontFamily: notification.firstName && containsArabic(notification.firstName)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {notification.firstName}
                                            </span>
                                            {t(', we regret to inform you that your offer for the project has been declined. Dont be discouraged keep submitting great offers, and the right opportunity will come your way! 🚀')}

                                        </>
                                    ) : notification.description === "offeraccepted" ? (
                                        <>
                                            {t('Congratulations ,')}
                                            <span
                                                style={{
                                                    fontFamily: user?.firstName && containsArabic(user?.firstName)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('🎉 Your offer has been accepted! A new project,')}
                                            <span
                                                style={{
                                                    fontFamily: notification.titel && containsArabic(notification.titel)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',
                                                    color: 'rgb(91, 193, 253)'
                                                }}
                                            >
                                                [{notification.projectitel}]
                                            </span>
                                            {t('has been officially created by')}
                                            <span
                                                style={{
                                                    fontFamily: (notification.sender.firstName && containsArabic(notification.firstName)) ||
                                                        (notification.lastName && containsArabic(notification.lastName))
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {notification.sender.firstName} .
                                            </span>
                                            {t('Get ready to bring your expertise to life and collaborate on something amazing!')}
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',

                                                }}
                                            >
                                                {t('You can message the buyer directly through the platform to coordinate everything smoothly to discuss the next steps, finalize details, and begin the work.')}


                                                <Button
                                                    onClick={() => startConversation(user?._id, notification.sender._id, notification.projectId)}
                                                    disabled={isLoading} // Disable button when loading
                                                    variant="outlined"

                                                    sx={{

                                                        marginLeft: '5px',
                                                        height: '27px',
                                                        borderRadius: '16px',
                                                        background: 'rgb(91, 193, 253)',
                                                        "&:hover": {
                                                            borderColor: "white",
                                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                        },
                                                    }}

                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <div className="lds-dual-ring1" ></div>

                                                        </>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                color: "white",
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                fontWeight: "bold",
                                                                textTransform: "capitalize",
                                                                fontSize: "13px",
                                                                display: 'flex',
                                                                gap: '5px',
                                                                alignItems: 'center',
                                                            }}
                                                        >

                                                            {t('Send a Message')}

                                                        </Typography>
                                                    )}
                                                </Button>

                                            </span>
                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Wishing you a successful project! 🚀')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>

                                        </>
                                    ) : notification.description === "buyeroffersnot" ? (
                                        <>
                                            {t('🎉 Great news!')}

                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {t('A freelancer has just submitted an offer for your project Review the details and take the next step towards hiring the best match for your project. 🚀')}
                                            </span>
                                            <span style={{ display: 'block' }}>
                                                {t('Your Project :')}
                                                <a
                                                    href={notification.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: 'rgb(91, 193, 253)',
                                                        marginLeft: currentLanguage === 'ar' ? '3px' : '5px',
                                                        marginRight: '5px',
                                                        cursor: 'pointer',
                                                        textDecoration: 'none',
                                                        fontFamily: notification.link && containsArabic(notification.link)
                                                            ? '"Droid Arabic Kufi", serif'
                                                            : '"Airbnbcereal", sans-serif',
                                                    }}
                                                >
                                                    {import.meta.env.VITE_FRONTEND_URL}{notification.link}
                                                </a>
                                            </span>




                                        </>
                                    ) : notification.description === "idaccepted" ? (
                                        <>
                                            {t('🎉 Great news!')}
                                            <span
                                                style={{
                                                    fontFamily: notification.firstName && containsArabic(notification.firstName)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {notification.firstName}
                                            </span>
                                            {t('Your identity verification has been successfully approved. You now have full access to all features and services on Khadamat. This verification enhances your credibility and unlocks more opportunities. Start exploring, connecting, and growing your freelancing journey with confidence!')}
                                            <div className="Trusted"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px', // Reduced gap for better alignment
                                                    marginTop: '12px', // Slightly reduced margin for better spacing
                                                }}
                                            >
                                                <span>
                                                    {t('Badge Earned :')}
                                                </span>
                                                <div className="Trusted"
                                                    style={{
                                                        backgroundColor: '#194e3d',
                                                        borderRadius: '90px 30px 30px 90px',
                                                        display: 'flex',
                                                        width: '22.5%', // Reduced width for a tighter look
                                                        alignItems: 'center',
                                                        padding: '4px 8px 4px 12px', // Less padding for a more compact design
                                                        gap: '8px', // Reduced gap inside the badge
                                                    }}
                                                >
                                                    <div className="point"
                                                        style={{
                                                            height: '6px', // Slightly smaller dot
                                                            width: '6px',
                                                            background: '#2df873',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                    </div>
                                                    <Typography
                                                        sx={{
                                                            color: '#2df873',
                                                            fontWeight: 'bold',
                                                            fontSize: '13px', // Slightly smaller text for balance
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            textWrap: 'nowrap',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        Trusted by Khadamat
                                                        <img width={30} src="/src/assets/images/small-logos/Badge.png" alt="Badge" />
                                                    </Typography>
                                                </div>
                                            </div>

                                        </>
                                    ) : notification.description === "idrejected" ? (
                                        <>
                                            {t('Unfortunately,😢')}
                                            <span
                                                style={{
                                                    fontFamily: notification.firstName && containsArabic(notification.firstName)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {notification.firstName}
                                            </span>
                                            {t('We were unable to verify your identity at this time. This may be due to missing or unclear information in your submitted documents. Please review our verification guidelines and submit a new request to gain full access to Khadamat platform features.')}
                                            <div className="Trusted"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',

                                                }}
                                            >
                                                <div className="Typo">
                                                    <Typography
                                                        style={{
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                        }}
                                                    >
                                                        {t('If you believe this was a mistake, feel free to contact our support team for assistance.')}
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            color: 'rgb(91, 193, 253)',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                        }}
                                                    >
                                                        {t('🔹 Next Steps:')}
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            color: 'rgb(91, 193, 253)',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                        }}
                                                    >
                                                        {t('✔ Ensure your uploaded documents are clear and valid.')}
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            color: 'rgb(91, 193, 253)',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                        }}
                                                    >
                                                        {t('✔ Resubmit your verification request through your profile settings.')}
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            color: 'rgb(91, 193, 253)',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                        }}
                                                    >
                                                        {t('✔ Contact support if you need further clarification.')}
                                                    </Typography>
                                                    <div className="Buttons"
                                                        style={{
                                                            display: 'flex',
                                                            gap: '20px',
                                                            padding: '20px',
                                                        }}
                                                    >
                                                        <Button
                                                            sx={{
                                                                width: '20%',
                                                                maxWidth: 360,
                                                                color: 'white',
                                                                border: '1px solid white',
                                                                background: 'black',
                                                                borderRadius: '16px',
                                                                maxHeight: '400px',
                                                                height: '32px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                ":hover": {
                                                                    background: 'black', // Keep background black on hover
                                                                    border: '1px solid white', // Keep the border the same
                                                                },
                                                            }}


                                                        >
                                                            <Typography
                                                                sx={{
                                                                    color: 'white',
                                                                    flex: 1,
                                                                    fontSize: '12px',
                                                                    fontWeight: 'bold',
                                                                    textWrap: 'nowrap',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                }}
                                                            >
                                                                {t('Contact Support')}
                                                            </Typography>

                                                        </Button>
                                                        <Button
                                                            sx={{
                                                                width: '20%',
                                                                maxWidth: 360,
                                                                color: 'white',
                                                                border: '1px solid white',
                                                                background: 'black',
                                                                borderRadius: '16px',
                                                                maxHeight: '400px',
                                                                height: '32px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                ":hover": {
                                                                    background: 'black', // Keep background black on hover
                                                                    border: '1px solid white', // Keep the border the same
                                                                },
                                                            }}


                                                        >

                                                            <Typography
                                                                sx={{
                                                                    color: 'white',
                                                                    flex: 1,
                                                                    fontSize: '12px',
                                                                    fontWeight: 'bold',
                                                                    textWrap: 'nowrap',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                }}
                                                            >
                                                                {t('Resubmit request')}
                                                            </Typography>

                                                        </Button>
                                                    </div>
                                                </div>



                                            </div>
                                        </>
                                    ) : notification.description === "buyerprojectcreated" ? (
                                        <>
                                            {t('Congratulations! Your project')}
                                            <span
                                                style={{
                                                    fontFamily: notification.titel && containsArabic(notification.titel)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',
                                                    color: 'rgb(91, 193, 253)'
                                                }}
                                            >
                                                [{notification.projectitel}]
                                            </span>
                                            {t('has been successfully created. As the next step, the seller will reach out to you soon to validate and begin the project. You can also take the initiative by checking your chat or contacting the seller directly')}
                                            <Button
                                                onClick={() => startConversation(notification.sender._id, notification.userId, notification.projectId)}
                                                disabled={isLoading} // Disable button when loading
                                                variant="outlined"

                                                sx={{

                                                    marginLeft: '5px',
                                                    height: '27px',
                                                    borderRadius: '16px',
                                                    background: 'rgb(91, 193, 253)',
                                                    "&:hover": {
                                                        borderColor: "white",
                                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                    },
                                                }}

                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="lds-dual-ring1" ></div>

                                                    </>
                                                ) : (
                                                    <Typography
                                                        sx={{
                                                            color: "white",
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                            fontWeight: "bold",
                                                            textTransform: "capitalize",
                                                            fontSize: "13px",
                                                            display: 'flex',
                                                            gap: '5px',
                                                            alignItems: 'center',
                                                        }}
                                                    >

                                                        {t('Send a Message')}

                                                    </Typography>
                                                )}
                                            </Button>
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',

                                                }}
                                            >
                                                {t('Stay connected for updates!.')}
                                            </span>
                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Wishing you a successful project! 🚀')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "requestbuyervalidation" ? (
                                        <>
                                            {t('Hello')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('The seller has submitted the final price and delivery timeline for your project. Please review and validate the offer to proceed. Once validated, the project will officially begin, and the agreed-upon funds will be held securely until completion. This step ensures a smooth and protected transaction for both parties. validate the offer in the Chat App under the WorkFlow section.')}


                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Wishing you a successful project! 🚀')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "sellerprojectstartdeclined" ? (
                                        <>
                                            {t('Hello')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('The buyer has declined your proposed price and delivery timeline. You can submit a revised offer or start a conversation to understand their concerns and negotiate further.')}
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',



                                                }}

                                            >

                                            </span>


                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Wishing you a successful project! 🚀')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "fundsadded" ? (
                                        <>
                                            {t('Congratulations!')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('Your funds have been successfully added to your account. You can now start unlocking top-tier freelancers, posting new projects, and bringing your ideas to life. Get ready to connect with skilled professionals and turn your vision into reality on Khadamat! 🚀')}
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',



                                                }}

                                            >

                                            </span>


                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "buyerprojectstartaccepted" ? (
                                        <>
                                            {t('Congratulations!')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('The buyer has accepted your offer, and the project funds have been securely added to your suspended balance. Once you successfully deliver the project, the payment will be released to your available balance.')}
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',



                                                }}

                                            >
                                                {t('Please ensure that you complete and deliver the project within the agreed timeframe to maintain a smooth process.')}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',



                                                }}

                                            >
                                                {t('✅ Your time is protected! If the buyer does not respond within the delivery period, the funds will be automatically released to you.')}
                                            </span>


                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "projectstarted" ? (
                                        <>
                                            {t('Great news!')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('The freelancer has started working on your project. To ensure a secure transaction, we have held your funds in escrow, and they will only be released to the seller once you receive the project and confirm your satisfaction.')}
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',



                                                }}

                                            >
                                                {t('Rest assured, you are on a safe and protected platform—your rights are always our priority. If any issues arise, you have the option to request revisions before approving the final delivery.')}

                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',



                                                }}

                                            >
                                                {t('Sit back and let the freelancer bring your vision to life! 💼✨')}

                                            </span>


                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "sellerprojectsent" ? (
                                        <>
                                            {t('Hello')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('Your freelancer has completed and submitted the project. Please review the work and release the payment. If no action is taken within 2 days, the funds will be automatically released, and the option to request revisions will no longer be available.')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',


                                                }}

                                            >
                                                {t('You can review and take action from the ChatApp under the Work Section:')}

                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',


                                                }}

                                            >
                                                {t('Profile - Messages - Work.')}


                                            </span>



                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "buyerfundsreleased" ? (
                                        <>
                                            {t('Thank You for Your Trust! 🙌')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('Your project is now complete, and the payment has been successfully released to the freelancer. We’d love to hear about your experience! 🌟')}


                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'block',


                                                }}

                                            >
                                                {t('Your feedback helps us improve our services and create a better experience for you. Let us know what went well and what we can do better.')}


                                            </span>



                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "sellerfundsreleased" ? (
                                        <>
                                            {t('Congratulations!')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('The buyer has released your payment, and the funds have been successfully transferred to your account. 🚀')}


                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                    ) : notification.description === "sellergotreview" ? (
                                        <>
                                            {t('Great news!')}

                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                    marginLeft: '5px',


                                                }}

                                            >
                                                {user?.firstName}
                                            </span>
                                            {t('A buyer has left feedback on your work. Check your reviews to see their thoughts and continue building your reputation!🚀')}




                                            <div className="Div"
                                                style={{
                                                    marginTop: '10px',
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('Best regards,')}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        display: 'block',

                                                    }}
                                                >
                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                </span>

                                            </div>
                                        </>
                                          ) : notification.description === "buyerrequestedchanges" ? (
                                            <>
                                                {t('Hello')}
    
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                        marginLeft: '5px',
    
    
                                                    }}
    
                                                >
                                                    {user?.firstName}
                                                </span>
                                                {t('The buyer was not satisfied with the delivery and has requested changes. Please review the buyer feedback and make the necessary updates to complete the project.')}
    
    
    
    
                                                <div className="Div"
                                                    style={{
                                                        marginTop: '10px',
                                                    }}
                                                >
    
                                                    <span
                                                        style={{
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                            display: 'block',
    
                                                        }}
                                                    >
                                                        {t('Best regards,')}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                            display: 'block',
    
                                                        }}
                                                    >
                                                        {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                    </span>
    
                                                </div>
                                            </>
                                               ) : notification.description === "gigdeletebbyadmin" ? (
                                                <>
                                                    {t('Hello')}
        
                                                    <span
                                                        style={{
                                                            fontFamily: user?.firstName && containsArabic(user?.firstName)
                                                            ? '"Droid Arabic Kufi", serif'
                                                            : '"Airbnbcereal", sans-serif',
                                                            marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                            marginLeft: '5px',
        
        
                                                        }}
        
                                                    >
                                                        {user?.firstName}
                                                    </span>
                                                    {t('We regret to inform you that your gig,')}
                                                    <span
                                                        style={{
                                                            fontFamily: notification.link && containsArabic(notification.link)
                                                            ? '"Droid Arabic Kufi", serif'
                                                            : '"Airbnbcereal", sans-serif',
                                                            marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                            marginLeft: '5px',
                                                            color: 'rgb(91, 193, 253)'
        
        
                                                        }}
        
                                                    >
                                                        [{notification?.link}]
                                                    </span>
                                                    {t('has been removed from our platform. This action may have been taken due to a violation of our Terms of Service or other platform policies.')}
        
        
        
        
                                                    <div className="Div"
                                                        style={{
                                                            marginTop: '10px',
                                                        }}
                                                    >
        
                                                        <span
                                                            style={{
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                display: 'block',
        
                                                            }}
                                                        >
                                                            {t('Best regards,')}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                display: 'block',
        
                                                            }}
                                                        >
                                                            {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                        </span>
        
                                                    </div>
                                                </>
                                                   ) : notification.description === "sellerofferdeletebbyadmin" ? (
                                                    <>
                                                        {t('Hello')}
            
                                                        <span
                                                            style={{
                                                                fontFamily: user?.firstName && containsArabic(user?.firstName)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                                marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                marginLeft: '5px',
            
            
                                                            }}
            
                                                        >
                                                            {user?.firstName}
                                                        </span>
                                                        {t('We regret to inform you that your offer for the gig,')}
                                                        <span
                                                            style={{
                                                                fontFamily: notification.link && containsArabic(notification.link)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                                marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                marginLeft: '5px',
                                                                color: 'rgb(91, 193, 253)'
            
            
                                                            }}
            
                                                        >
                                                            [{notification?.link}]
                                                        </span>
                                                        {t('has been removed from our platform. This action may have been taken due to a violation of our Terms of Service or other platform policies.')}
            
            
            
            
                                                        <div className="Div"
                                                            style={{
                                                                marginTop: '10px',
                                                            }}
                                                        >
            
                                                            <span
                                                                style={{
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                    display: 'block',
            
                                                                }}
                                                            >
                                                                {t('Best regards,')}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                    display: 'block',
            
                                                                }}
                                                            >
                                                                {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                            </span>
            
                                                        </div>
                                                    </>
                                                       ) : notification.description === "membershipupgrade" ? (
                                                        <>
                                                            {t('Congratulations!')}
                
                                                            <span
                                                                style={{
                                                                    fontFamily: user?.firstName && containsArabic(user?.firstName)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                    marginLeft: '5px',
                
                
                                                                }}
                
                                                            >
                                                                {user?.firstName}
                                                            </span>
                                                            {t('Your membership')}
                                                            <span
                                                                style={{
                                                                    fontFamily: notification.link && containsArabic(notification.link)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                    marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                    marginLeft: '5px',
                                                                    color: 'rgb(91, 193, 253)'
                
                
                                                                }}
                
                                                            >
                                                                [{notification?.link}]
                                                            </span>
                                                            {t('has been successfully upgraded. Enjoy exclusive features and benefits. 🚀🎊')}
                
                
                
                
                                                            <div className="Div"
                                                                style={{
                                                                    marginTop: '10px',
                                                                }}
                                                            >
                
                                                                <span
                                                                    style={{
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                        display: 'block',
                
                                                                    }}
                                                                >
                                                                    {t('Best regards,')}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        marginRight: currentLanguage === 'ar' ? '5px' : '5px',
                                                                        display: 'block',
                
                                                                    }}
                                                                >
                                                                    {t('[Nabil Hamici] Khadamat-Platform CEO')}
                                                                </span>
                
                                                            </div>
                                                        </>
    
                                        ) : (

                                  

                                        <>

                                            {t(notification.title)}
                                        </>
                                    )}
                                </Typography>



                            </div>
                            <div className="Button"
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '10px',
                                    marginBottom: '15px',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: "white",
                                        "&:hover": {
                                            borderColor: "white",
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                    }}
                                    onClick={() => {
                                        if (!notification.isRead) {
                                            handleMarkAsRead(notification._id); // ✅ Pass notification ID
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontFamily: "Airbnbcereal, sans-serif",
                                            fontWeight: "bold",
                                            textTransform: "capitalize",
                                            fontSize: "13px",
                                            display: 'flex',
                                            gap: '5px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {notification.isRead ? (
                                            <>
                                                Read <DoneAllIcon sx={{ color: "#2df873", fontSize: "18px" }} />
                                            </>
                                        ) : (
                                            "Mark as read"
                                        )}
                                    </Typography>
                                </Button>


                                <Button variant="outlined"
                                    sx={{
                                        borderColor: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: 'Airbnbcereal, sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '13px',
                                        }}
                                    >
                                        Remove
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                        <div className="Line"
                            style={{
                                width: '90%',
                                height: '1px',
                                background: 'white',
                                margin: '20px auto',
                            }}
                        >

                        </div>
                    </React.Fragment>
                ))}
            </div>


        </div>
    )
}

export default Notifications
