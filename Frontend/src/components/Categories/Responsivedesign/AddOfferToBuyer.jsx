import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import i18n from 'i18next';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useNavigate } from 'react-router-dom';
import { Card, Skeleton } from "@nextui-org/react";
import animationData from '../../../assets/images/small-logos/NoGigFound.json';
import { display, height, width } from '@mui/system';
import { faHandHoldingDollar, faHourglassHalf, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useUser } from '../../../Context/UserContext.jsx'
import { useGig } from '../../../Context/GigContext.jsx'
import OfferButton from '../../Projectsfetch/OfferButton.jsx'


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




function AddOfferToBuyer({ handleOpenUserVerify, gigStatus, handleOpenOffer, gigId, handleOpenOfferDetails, gigOwnerId, handleOpenOfferAccepted, handleOpenOfferDeclined }) {

    const theme = useTheme();

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px)');

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


    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const boxContents = ['Content 1', 'Content 2', 'Content 3', 'Content 4'];

    const [selectedPage, setSelectedPage] = useState(1);

    const pages = [1, 2, 3, 4, 5, '...', 10];

    const handlePageClick = (page) => {
        if (typeof page === 'number') {
            setSelectedPage(page);
        }
    };

    const handlePreviousClick = () => {
        if (selectedPage > 1) {
            setSelectedPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextClick = () => {
        if (selectedPage < 10) {
            setSelectedPage((prevPage) => prevPage + 1);
        }
    };

    const { user, setUser, getImageUrl, isSeller, isBuyer } = useUser();



    const navigate = useNavigate();

    const goToSinglePost = () => {
        navigate('/userdashboard/project/singlepost');
    };

    const { offers, isLoaded, error } = useGig(); // Use context data






    const getTimelineText = (timelineDays, language = 'en') => {
        const translations = {
            en: {
                day: 'day',
                days: 'days'
            },
            ar: {
                day: 'يوم',
                days: 'أيام'
            }
        };

        const formatNumber = (num, lang) => {
            if (lang === 'ar') {
                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                return num.toString().split('').map(digit => arabicNumbers[digit]).join('');
            }
            return num.toString();
        };

        const number = formatNumber(timelineDays, language);
        const unit = language === 'ar' ? (timelineDays === 1 ? 'يوم' : 'أيام') : (timelineDays === 1 ? 'day' : 'days');

        return `${number} ${unit}`;
    };

    const userId = user ? user._id : null;

    const isGigOwner = userId === gigOwnerId;

    const containsArabic = (text) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    };

    const getTimeAgo = (dateString, lang = 'en') => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMinutes = Math.floor((now - past) / (1000 * 60));

        const timeFormats = {
            en: {
                prefix: '',
                minute: ['minute ago', 'minutes ago'],
                hour: ['hour ago', 'hours ago'],
                day: ['day ago', 'days ago']
            },
            ar: {
                prefix: 'منذ',
                minute: ['دقيقة', 'دقائق'],
                hour: ['ساعة', 'ساعات'],
                day: ['يوم', 'أيام']
            }
        };

        const format = timeFormats[lang] || timeFormats.en;

        // Helper function to get correct plural form for Arabic
        const getArabicForm = (number, forms) => {
            if (number === 1) return forms[0];
            if (number >= 3 && number <= 10) return forms[1];
            return forms[0];
        };

        // Helper function to get correct plural form for English
        const getEnglishForm = (number, forms) => {
            return number === 1 ? forms[0] : forms[1];
        };

        const getTimeString = (number, unit) => {
            if (lang === 'ar') {
                return (
                    <>
                        {format.prefix}{' '}
                        <span className="number">{number}</span>{' '}
                        {getArabicForm(number, unit)}
                    </>
                );
            }
            return (
                <>
                    <span className="number">{number}</span>{' '}
                    {getEnglishForm(number, unit)}
                </>
            );
        };

        if (diffInMinutes < 60) {
            return getTimeString(diffInMinutes, format.minute);
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return getTimeString(hours, format.hour);
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return getTimeString(days, format.day);
        }
    };





    const translateTimeline = (timeline, currentLanguage) => {
        if (!timeline || currentLanguage !== 'ar') return timeline;

        // Extract the number from the timeline string
        const number = parseInt(timeline);
        if (isNaN(number)) return timeline;

        // Arabic translation rules for days
        const getArabicDays = (num) => {
            if (num === 0) return 'صفر يوم';
            if (num === 1) return 'يوم واحد';
            if (num === 2) return 'يومان';
            if (num >= 3 && num <= 10) return `${num} أيام`;
            return `${num} يوماً`;
        };

        return getArabicDays(number);
    };




    return (
        <>
            <div className="Container22"
                style={{
                    width: isSmallScreen ? '103%' : '96%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '-40px',
                }}
            >
                <div class="gradient-divider"
                    style={{
                        width: '100%',

                    }}
                ></div>
                <div className="box-header"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '5px',
                        width: '100%',
                        height: '55px',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center', // Align title and button horizontally
                    }}
                >
                    {/* Typography for title */}
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: 'white',
                            fontWeight: 'bold',
                            marginLeft: '10px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('All Offers')}
                    </Typography>

                    <div className="OfferButtonSettings"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '5px',
                        }}
                    >
                        {isSeller && gigStatus !== "closed" && (
                            <>
                                <OfferButton handleOpenUserVerify={handleOpenUserVerify} gigOwnerId={gigOwnerId} handleOpenOffer={handleOpenOffer} />
                            </>
                        )}
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick1}
                            sx={{
                                padding: '5px 10px',
                                marginLeft: currentLanguage === 'ar' ? '-5px' :
                                    isSmallScreen ? '-5px' :
                                        '15px',
                            }}
                        >
                            <SettingsSuggestIcon
                                sx={{
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px', // Adjust size if necessary
                                    marginLeft: '25px',
                                }}
                            />
                        </Button>
                    </div>


                    <Menu
                        id="fade-menu1"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button1',
                        }}
                        anchorEl={anchorEl1}
                        open={open1}
                        onClose={handleClose1}
                        TransitionComponent={Fade}
                        container={document.querySelector('.box-header')} // Reference your Header div
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{
                            width: '140px', // Keep the menu width consistent
                            marginRight: currentLanguage === 'ar' && isSmallScreen ? '67%' :
                                currentLanguage === 'ar' ? '92%' :
                                    'unset',

                        }}
                    >
                        <MenuItem
                            onClick={handleClose1}
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            <ArrowUpwardIcon
                                sx={{
                                    marginRight: currentLanguage === 'ar' ? '0' : '5px',
                                    marginLeft: currentLanguage === 'ar' ? '5px' : '0',
                                }}
                            />
                            <span style={{
                                marginLeft: currentLanguage === 'ar' ? '5px' : '0',
                                marginRight: currentLanguage === 'ar' ? '0' : '5px',
                            }}>
                                {t('Newest')}
                            </span>
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose1}
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            <ArrowDownwardIcon
                                sx={{
                                    marginRight: currentLanguage === 'ar' ? '0' : '5px',
                                    marginLeft: currentLanguage === 'ar' ? '5px' : '0',
                                }}
                            />
                            <span style={{
                                marginLeft: currentLanguage === 'ar' ? '5px' : '0',
                                marginRight: currentLanguage === 'ar' ? '0' : '5px',
                            }}>
                                {t('Oldest')}
                            </span>
                        </MenuItem>
                    </Menu>
                </div>
                <div className="OffersFetch"
                    style={{
                        position: 'relative',
                        minHeight: isSmallScreen || isTabletScreen ? '250px' : '220px', // Minimum height for different screen sizes
                    }}
                >
                    {!isLoaded && !error && (
                        <>
                            <style>
                                {loadingKeyframes}
                            </style>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Card className=''

                                    style={{
                                        width: isSmallScreen ? '100%' : '100%',
                                        height: isSmallScreen ? '280px' : '250px',
                                        padding: '16px',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0%',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                        border: '1px solid rgba(255, 255, 255, 0.18)',
                                    }}
                                >
                                    <div className='Circle'
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            left: '1.5%',
                                            right: currentLanguage === 'ar' ? '1.5%' : 'unset',
                                            top: '5%',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='UserName'
                                        style={{
                                            height: '1rem',
                                            width: '16rem',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            left: isSmallScreen ? '17%' :
                                                isMediumScreen ? '7%' :
                                                    isTabletScreen ? '9%' :
                                                        '7%',
                                            right: currentLanguage === 'ar' && isMediumScreen ? '15%' :
                                                currentLanguage === 'ar' && isSmallScreen ? '18%' :
                                                    currentLanguage === 'ar' ? '7%' :

                                                        'unset',
                                            top: '8%',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='OffersStatus'
                                        style={{
                                            height: '1rem',
                                            width: '14rem',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            left: isSmallScreen ? '17%' :
                                                isMediumScreen ? '7%' :
                                                    isTabletScreen ? '9%' :
                                                        '7%',
                                            right: currentLanguage === 'ar' && isMediumScreen ? '15%' :
                                                currentLanguage === 'ar' && isSmallScreen ? '18%' :
                                                    currentLanguage === 'ar' ? '7%' : 'unset',
                                            top: '15%',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='ProjectTitel'
                                        style={{
                                            height: '1rem',
                                            width: isSmallScreen ? '19rem' : '22rem',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            right: currentLanguage === 'ar' && isMediumScreen ? '3%' :
                                                currentLanguage === 'ar' && isSmallScreen ? '3%' :
                                                    currentLanguage === 'ar' ? '72%' : '3%',
                                            left: isSmallScreen ? '3%' :

                                                isMediumScreen ? '62%' :
                                                    isTabletScreen ? '3%' :
                                                        'unset',
                                            top: isSmallScreen ? '29%' :
                                                isMediumScreen ? '13%' :
                                                    isTabletScreen ? '30%' :
                                                        '12%',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='OfferInfo'
                                        style={{
                                            height: '7rem',
                                            width: isSmallScreen ? '96%' :
                                                isMediumScreen ? '97%' :
                                                    currentLanguage === 'ar' ? '93.5%' :
                                                        '95.5%',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            left: '1.5%',
                                            top: isSmallScreen ? '41%' :
                                                isMediumScreen ? '33%' :
                                                    isTabletScreen ? '40%' :
                                                        '33%',
                                            right: currentLanguage === 'ar' ? '1.5%' : 'unset',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                    <div className='OfferBTN'
                                        style={{
                                            height: isSmallScreen ? '2rem' : '1rem',
                                            width: '8rem',
                                            borderRadius: '8px',
                                            backgroundColor: '#111827',
                                            position: 'absolute',
                                            right: currentLanguage === 'ar' && isMediumScreen ? '35%' :
                                                isSmallScreen ? '32%' :
                                                    currentLanguage === 'ar' ? '81.5%' :
                                                        isMediumScreen ? '2%' :
                                                            '3%',
                                            top: isSmallScreen ? '85%' :
                                                isMediumScreen ? '90%' :
                                                    '90%',
                                            overflow: 'hidden',
                                            backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                        }}
                                    >

                                    </div>
                                </Card>
                            </div>

                        </>
                    )}

                    {/* Show error message if fetching failed */}
                    {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                    {/* Show "No Gigs Found" Message if loaded but empty */}
                    {isLoaded && offers.length === 0 && (
                        <div
                            style={{
                                width: isSmallScreen ? '100%' : '100%',
                                height: isSmallScreen ? '280px' : '250px',
                                padding: '16px',
                                position: 'absolute',
                                top: '0px',
                                left: '0%',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div className="TYpo"
                                style={{
                                    marginTop: '40px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',

                                    }}
                                >
                                    {t('No Offers have been posted in this section yet.')}
                                </Typography>
                            </div>

                            <div className="Lottie"
                                style={{
                                    marginTop: '-15px',
                                }}
                            >
                                <Lottie animationData={animationData} style={{ width: 250, height: 250 }} />
                            </div>


                        </div>
                    )}
                    {isLoaded && offers.map(offer => (
                        <Box key={offer.id} className='meteors-demo-container MainBox'

                            sx={{
                                width: '100%',
                                background: 'rgba(0, 0, 0, 0.2)', // Background color
                                padding: '10px', // Padding inside the box
                                border: '1px solid rgba(255, 255, 255, 0.1)', // Border styling
                                transition: 'width 0.3s ease-in-out', // Smooth transition for width changes
                                marginTop: 0, // Remove any space between the header and box content
                                position: 'relative',
                                minHeight: isSmallScreen || isTabletScreen ? '250px' : '210px', // Minimum height for different screen sizes
                                display: 'flex',
                                overflow: 'hidden',
                                flexDirection: 'column', // Arrange content vertically
                                alignItems: 'center', // Center-align the items horizontally
                                textAlign: 'center', // Center-align the text
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Optional: Add shadow for depth
                            }}
                        >
                            <img
                                src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                alt="Background SVG"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.1,
                                    zIndex: 0, // Makes sure the image is behind the content
                                }}
                            />






                            <Box className="profile-container"
                                sx={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '1%',
                                    padding: isSmallScreen ? '5px' : 'unset',
                                    width: '96%',
                                    right: currentLanguage === 'ar' ? '15px' : 'unset',
                                    display: 'flex',
                                    gap: isSmallScreen || isTabletScreen ? '8px' : 'unset',
                                    justifyContent: 'space-between',
                                    flexDirection: isSmallScreen || isTabletScreen ? 'column' : 'row',
                                    alignItems: isSmallScreen || isTabletScreen ? 'flex-start' : 'center',
                                }}
                            >
                                {/* Profile Info Section */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: currentLanguage === 'ar' ? '6px' : 'unset' }}>

                                    <Box
                                        onClick={() => {
                                            console.log("Offer Seller ID:", offer?.seller?._id);
                                            console.log("Logged-in User ID:", user?._id);

                                            if (!offer?.seller?._id) {
                                                console.error("Seller ID is missing!");
                                                return;
                                            }

                                            if (offer.seller._id === user?._id) {
                                                navigate("/userdashboard/profile"); // Navigate to private profile
                                            } else if (offer?.seller?.slug) {
                                                navigate(`/userdashboard/users/${offer.seller.slug}`); // Navigate to public profile
                                            } else {
                                                console.error("User slug is missing!");
                                            }
                                        }}

                                        sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            border: '2px solid #ccc',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            overflow: 'visible',
                                        }}>
                                        <img
                                            src={getImageUrl(offer.seller.profileImg)}
                                            alt="Profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        {/* Active Badge */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '35px',
                                                left: '87%',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: '#4CAF50',
                                                border: '2px solid white',
                                                zIndex: 1,
                                                transform: 'translateX(-50%)', // Shift the badge half of its width back to the left

                                            }}
                                        />
                                    </Box>

                                    <div className="UserInfo"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '3px',
                                        }}
                                    >

                                        <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {/* User Name */}
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: (offer.seller.firstName && containsArabic(offer.seller.firstName)) ||
                                                        (offer.seller.lastName && containsArabic(offer.seller.lastName))
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    fontSize: '14px',

                                                    maxWidth: isSmallScreen ? '90px' : '200px', // Set max width for the name
                                                    whiteSpace: 'nowrap', // Prevent wrapping
                                                    overflow: 'hidden', // Hide overflowed content
                                                    textOverflow: 'ellipsis', // Add ellipsis if text overflows
                                                }}
                                            >
                                                {offer.seller.firstName} {offer.seller.lastName}
                                            </Typography>



                                            <div className="Trusted"
                                                style={{
                                                    backgroundColor: '#194e3d',
                                                    borderRadius: '16px',
                                                    display: 'flex',

                                                    alignItems: 'center',
                                                    height: '20px',
                                                    gap: '8px',
                                                    padding: currentLanguage === 'ar' ? '5px 10px 5px 5px' : '5px 0px 5px 10px',
                                                }}
                                            >

                                                <Typography
                                                    sx={{
                                                        color: '#2df873',
                                                        fontWeight: 'bold',
                                                        fontSize: '12px', // Slightly smaller text for balance
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        textWrap: 'nowrap',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}
                                                >
                                                    {isSmallScreen ?  (
                                                        <>
                                                    {t('Trusted')}
                                                        </>
                                                  ) : (  
                                                    <>
                                                    {t('Trusted by Khadamat')}
                                                        </>
                                                     )}
                                                    <img width={30} src="/src/assets/images/small-logos/Badge.png" alt="Badge" />
                                                </Typography>
                                            </div>


                                        </Box>
                                        <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '7px', }}>
                                            <div className="Time"
                                                style={{
                                                    display: 'flex',
                                                    gap: currentLanguage === 'ar' ? '5px' : '1px',
                                                }}
                                            >
                                                <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '13px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        '& .number': {
                                                            fontFamily: '"Airbnbcereal", sans-serif',
                                                        }

                                                    }}
                                                >
                                                    {getTimeAgo(offer.createdAt, currentLanguage)}
                                                </Typography>


                                            </div>
                                            <div className="Line"
                                                style={{
                                                    height: '15px',
                                                    width: '1px',
                                                    background: 'white',
                                                }}
                                            >

                                            </div>
                                            <div className="OfferPrice"
                                                style={{
                                                    display: 'flex',
                                                    gap: currentLanguage === 'ar' ? '5px' : '1px',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHandHoldingDollar}
                                                    style={{
                                                        transform: 'rotate(0deg)',
                                                        fontSize: '16px',
                                                        color: 'white',
                                                    }} // Reset any unwanted rotation
                                                />
                                                <Typography sx={{
                                                    color: 'white',
                                                    marginLeft: '5px',
                                                    fontSize: '13px',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',

                                                }}>
                                                    {offer.price} $
                                                </Typography>

                                            </div>
                                            <div className="Line"
                                                style={{
                                                    height: '15px',
                                                    width: '1px',
                                                    background: 'white',
                                                }}
                                            >

                                            </div>
                                            <div className="TimeToFinish"
                                                style={{
                                                    display: 'flex',
                                                    gap: currentLanguage === 'ar' ? '5px' : '1px',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHourglassHalf}
                                                    style={{
                                                        transform: 'rotate(0deg)',
                                                        fontSize: '14px',
                                                        color: 'white',
                                                    }} // Reset any unwanted rotation
                                                />
                                                <Typography sx={{
                                                    color: 'white',
                                                    marginLeft: '5px',
                                                    fontSize: '13px',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',

                                                }}>
                                                    {translateTimeline(offer.timeline, currentLanguage)}

                                                </Typography>

                                            </div>


                                        </Box>
                                    </div>
                                </Box>
                                {!isGigOwner && (
                                    <>
                                        <div className="OfferStatus For the Seller"
                                            style={{
                                                display: isSmallScreen ? 'none' : 'unset',
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '30%' : '100px',
                                                    maxWidth: '110px',
                                                    color: 'white',
                                                    backgroundColor:
                                                        offer.status === 'accepted' ? '#194e3d' :
                                                            offer.status === 'rejected' ? '#fae3e3' :
                                                                'rgba(0, 116, 255, 0.2)',
                                                    boxShadow:
                                                        offer.status === 'accepted' ? '0px 4px 6px rgba(45, 248, 115, 0.4), 0px 1px 3px rgba(45, 248, 115, 0.3)' :
                                                            offer.status === 'rejected' ? '0px 4px 6px rgba(211, 47, 47, 0.4), 0px 1px 3px rgba(211, 47, 47, 0.3)' :
                                                                '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                                    borderRadius: '16px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            offer.status === 'accepted' ? '#194e3d' :
                                                                offer.status === 'rejected' ? '#fae3e3' :
                                                                    'rgba(0, 116, 255, 0.2)',
                                                        boxShadow:
                                                            offer.status === 'accepted' ? '0px 4px 6px rgba(45, 248, 115, 0.6), 0px 1px 3px rgba(45, 248, 115, 0.5)' :
                                                                offer.status === 'rejected' ? '0px 4px 6px rgba(211, 47, 47, 0.6), 0px 1px 3px rgba(211, 47, 47, 0.5)' :
                                                                    '0px 4px 6px rgba(0, 116, 255, 0.3), 0px 1px 3px rgba(0, 116, 255, 0.3)',
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color:
                                                            offer.status === 'accepted' ? '#2df873' :
                                                                offer.status === 'rejected' ? '#d32f2f' :
                                                                    'rgba(0, 116, 255)',
                                                        flex: 1,
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                
                                                        {offer.status}
                                                     
                                                  
                                                </Typography>

                                            </Button>
                                        </div>
                                    </>
                                )}
                                {isGigOwner && offer.status !== 'accepted' && offer.status !== 'rejected' && (
                                    <>
                                        <div className="Button">
                                            <Button variant="outlined"
                                                onClick={() => handleOpenOfferDetails(offer)} // Pass the offer object

                                                sx={{

                                                    borderColor: 'white', '&:hover': {
                                                        borderColor: 'white',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
                                                    },
                                                }}
                                            >

                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontSize: '13px',

                                                    }}
                                                >
                                                    {t('View Details')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </>
                                )}
                                {isGigOwner && (offer.status === 'accepted' || offer.status === 'rejected') && (
                                    <>
                                        <div className="OfferStatus">
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '30%' : '100px',
                                                    maxWidth: '110px',
                                                    color: 'white',
                                                    backgroundColor:
                                                        offer.status === 'accepted' ? '#194e3d' :
                                                            offer.status === 'rejected' ? '#fae3e3' :
                                                                'rgba(0, 116, 255, 0.2)',
                                                    boxShadow:
                                                        offer.status === 'accepted' ? '0px 4px 6px rgba(45, 248, 115, 0.4), 0px 1px 3px rgba(45, 248, 115, 0.3)' :
                                                            offer.status === 'rejected' ? '0px 4px 6px rgba(211, 47, 47, 0.4), 0px 1px 3px rgba(211, 47, 47, 0.3)' :
                                                                '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                                    borderRadius: '16px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            offer.status === 'accepted' ? '#194e3d' :
                                                                offer.status === 'rejected' ? '#fae3e3' :
                                                                    'rgba(0, 116, 255, 0.2)',
                                                        boxShadow:
                                                            offer.status === 'accepted' ? '0px 4px 6px rgba(45, 248, 115, 0.6), 0px 1px 3px rgba(45, 248, 115, 0.5)' :
                                                                offer.status === 'rejected' ? '0px 4px 6px rgba(211, 47, 47, 0.6), 0px 1px 3px rgba(211, 47, 47, 0.5)' :
                                                                    '0px 4px 6px rgba(0, 116, 255, 0.3), 0px 1px 3px rgba(0, 116, 255, 0.3)',
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color:
                                                            offer.status === 'accepted' ? '#2df873' :
                                                                offer.status === 'rejected' ? '#d32f2f' :
                                                                    'rgba(0, 116, 255)',
                                                        flex: 1,
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {offer.status}
                                                </Typography>
                                            </Button>
                                        </div>


                                    </>
                                )}

                            </Box>
                            <Box className='ProjectDescription'
                                style={{
                                    position: 'absolute',
                                    top: isSmallScreen || isTabletScreen ? '36%' : '35%',
                                    left: '1%',
                                    padding: isSmallScreen ? '5px' : 'unset',
                                    width: '97%',
                                    height: '88px',
                                    display: 'flex', // Enable flexbox

                                    alignItems: 'center', // Center content horizontally
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#64748B',
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                        display: '-webkit-box',
                                        '-webkit-line-clamp': '3', // Number of lines to display
                                        '-webkit-box-orient': 'vertical',
                                        fontFamily: offer.comment && containsArabic(offer.comment)
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',



                                        textOverflow: 'ellipsis',
                                        lineHeight: '27px',
                                        wordWrap: 'break-word',


                                    }}
                                >
                                    {offer.comment}
                                </Typography>
                            </Box>
                            <Box className="ButtonContainer"
                                style={{
                                    position: 'absolute',
                                    top: isSmallScreen || isTabletScreen ? '82%' : '80%',
                                    width: '97%',
                                    left: currentLanguage === 'ar' ? '2%' : '0%',
                                    display: 'flex',
                                    justifyContent: isSmallScreen || isTabletScreen ? 'center' : "space-between",
                                }}
                            >
                                <div className="FakeSpace">
                                    <Typography
                                        sx={{
                                            opacity: '0',
                                            display: isSmallScreen || isTabletScreen ? 'none' : 'normal',

                                        }}
                                    >
                                        Nabil
                                    </Typography>
                                </div>
                              
                                {isGigOwner && offer.status !== 'accepted' && offer.status !== 'rejected' && (


                                    <>
                                        <div className="Accept/Decline"
                                            style={{
                                                display: 'flex',
                                                gap: '10px',
                                            }}
                                        >
                                            <Button variant="outlined"
                                                onClick={() => handleOpenOfferAccepted(offer)} // Pass the entire offer object
                                                sx={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    alignItems: 'center',
                                                    borderColor: 'white', '&:hover': {
                                                        borderColor: 'white',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
                                                    },
                                                }}
                                            >


                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontSize: '13px',

                                                    }}
                                                >
                                                    {t('Accept Offer')}
                                                </Typography>
                                                <FontAwesomeIcon icon={faCheck}
                                                    style={{
                                                        transform: 'rotate(0deg)',
                                                        fontSize: '16px',
                                                        color: '#2df873',
                                                    }} // Reset any unwanted rotation
                                                />
                                            </Button>
                                            <Button variant="outlined"
                                                onClick={() => handleOpenOfferDeclined(offer)} // Pass the entire offer object

                                                sx={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    alignItems: 'center',
                                                    borderColor: 'white', '&:hover': {
                                                        borderColor: 'white',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
                                                    },
                                                }}
                                            >

                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontSize: '13px',

                                                    }}
                                                >
                                                    {t('Decline offer')}
                                                </Typography>
                                                <FontAwesomeIcon icon={faXmark}
                                                    style={{
                                                        transform: 'rotate(0deg)',
                                                        fontSize: '16px',
                                                        color: 'red',
                                                    }} // Reset any unwanted rotation
                                                />
                                            </Button>
                                        </div>
                                    </>
                                )}
                                {isGigOwner && offer.status === 'accepted' && (
                                    <>
                                        <div className="Button">
                                            <Button variant="outlined"
                                                onClick={handleOpenOfferDetails}
                                                sx={{

                                                    borderColor: 'white', '&:hover': {
                                                        borderColor: 'white',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
                                                    },
                                                }}
                                            >

                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontSize: '13px',

                                                    }}
                                                >
                                                    {t('View Details')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Box>
                            <div className="Box"
                               style={{
                                position: 'absolute',
                                top: isSmallScreen || isTabletScreen ? '82%' : '80%',
                                width: '97%',
                                left: currentLanguage === 'ar' ? '2%' : '0%',
                                display: 'flex',
                                justifyContent: isSmallScreen || isTabletScreen ? 'center' : "space-between",
                            }}
                            >
                                {!isGigOwner && (
                                    <>
                                        <div className="OfferStatus For the Seller"
                                            style={{
                                                display: isSmallScreen ? 'flex' : 'none',
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '130px' : '100px',
                                                   
                                                    color: 'white',
                                                    backgroundColor:
                                                        offer.status === 'accepted' ? '#194e3d' :
                                                            offer.status === 'rejected' ? '#fae3e3' :
                                                                'rgba(0, 116, 255, 0.2)',
                                                    boxShadow:
                                                        offer.status === 'accepted' ? '0px 4px 6px rgba(45, 248, 115, 0.4), 0px 1px 3px rgba(45, 248, 115, 0.3)' :
                                                            offer.status === 'rejected' ? '0px 4px 6px rgba(211, 47, 47, 0.4), 0px 1px 3px rgba(211, 47, 47, 0.3)' :
                                                                '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                                    borderRadius: '16px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            offer.status === 'accepted' ? '#194e3d' :
                                                                offer.status === 'rejected' ? '#fae3e3' :
                                                                    'rgba(0, 116, 255, 0.2)',
                                                        boxShadow:
                                                            offer.status === 'accepted' ? '0px 4px 6px rgba(45, 248, 115, 0.6), 0px 1px 3px rgba(45, 248, 115, 0.5)' :
                                                                offer.status === 'rejected' ? '0px 4px 6px rgba(211, 47, 47, 0.6), 0px 1px 3px rgba(211, 47, 47, 0.5)' :
                                                                    '0px 4px 6px rgba(0, 116, 255, 0.3), 0px 1px 3px rgba(0, 116, 255, 0.3)',
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color:
                                                            offer.status === 'accepted' ? '#2df873' :
                                                                offer.status === 'rejected' ? '#d32f2f' :
                                                                    'rgba(0, 116, 255)',
                                                        flex: 1,
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {currentLanguage === 'ar' ? (
                                                        offer.status === 'accepted' ? 'مقبول' :
                                                            offer.status === 'rejected' ? 'مرفوض' :
                                                                'قيد الانتظار' // Default for 'pending'
                                                    ) : (
                                                        offer.status // Show original English value
                                                    )}
                                                </Typography>

                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>






                        </Box>
                    ))}
                </div>

                <div className="Pages"

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
                    <div id={currentLanguage === 'ar' ? 'triangleRight' : 'triangleLeft'}>

                    </div>
                    {pages.map((page, index) => (
                        <div
                            key={index}
                            onClick={() => handlePageClick(page)}
                            style={{
                                width: '38px',
                                height: isSmallScreen ? '30px' : '38px',
                                background: page === selectedPage ? 'rgb(91, 66, 243)' : 'hsl(240, 3.7%, 15.88%)',
                                color: page === selectedPage ? 'white' : 'white',
                                borderRadius: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.1s ease-in-out, color 0.1s ease-in-out',
                                '&:hover': {
                                    background: (page === 1 || page === 2) ? '#e5e7eb' : 'rgba(255,255,255,0.2)',
                                },

                            }}
                        >
                            <Typography>{page}</Typography>
                        </div>
                    ))}
                    <div id={currentLanguage === 'ar' ? 'triangleLeft' : 'triangleRight'}
                        style={{

                        }}
                    >


                    </div>

                </div>
                <div className="Buttonss"

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


            </div>
        </>


    )
}

export default AddOfferToBuyer