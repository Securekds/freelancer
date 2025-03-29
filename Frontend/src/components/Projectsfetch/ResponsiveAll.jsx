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
import axios from 'axios';
import { useUser } from '../../Context/UserContext.jsx'
import { useGig } from '../../Context/GigContext.jsx';
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




function ResponsiveAll({ handleOpenUserVerify }) {

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

    const { gigs, isLoaded, error, fetchGigs , currentPage, totalPages, handlePageChange } = useGig();


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

   

    const handlePageClick = (page) => {
        handlePageChange(page);
      };

   // Handle previous click
   const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Handle next click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };


    const navigate = useNavigate();

    const goToSinglePost = () => {
        navigate('/userdashboard/project/singlepost');
    };

    const NavigateAddNewBuyerProject = () => {
        navigate('/userdashboard/buyers/projects/newproject')
    }

    const { user, setUser, getImageUrl, isBuyer } = useUser();






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







    if (error) {
        return <div className="text-red-500">{error}</div>;
    }




    const handleGigClick = (gigId) => {
        navigate(`/userdashboard/project/singlepost/${gigId}`);
    };


    const containsArabic = (text) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    };

// Function to handle profile navigation
// Function to handle profile navigation
const handleProfileClick = (gig) => {
    console.log("Gig User ID:", gig?.userId?._id); // Extract the actual user ID
    console.log("Gig User Slug:", gig?.userId?.slug);
    console.log("Logged-in User ID:", user?._id);

    if (!gig?.userId?._id) {
        console.error("Gig user ID is missing!");
        return;
    }

    if (gig.userId._id === user?._id) { 
        // Redirect the gig owner to their actual profile
        navigate("/userdashboard/profile");
    } else if (gig?.userId?.slug) {
        // Redirect other users to the public profile version
        navigate(`/userdashboard/users/${gig.userId.slug}`);
    } else {
        console.error("User slug is missing!");
    }
};





    return (
        <>
            <div className="Container22"
                style={{
                    width: '96%',
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
                        {t('All Projects')}
                    </Typography>

                    {/* Button for settings */}
                    <div className="AddBuerProjectAndSettings">
                        {isBuyer && (
                            <Button
                                onClick={user.isVerified ? NavigateAddNewBuyerProject : handleOpenUserVerify}
                                variant="outlined"
                                sx={{
                                    color: 'white',
                                    border: '1px solid white',
                                    ":hover": {
                                        border: '1px solid white'
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        fontSize: '13px',
                                        textWrap: 'nowrap',
                                    }}
                                >
                                    {t('Add Your Project')}
                                </Typography>
                            </Button>
                        )}



                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick1}
                            sx={{
                                padding: '5px 10px',
                                marginLeft: currentLanguage === 'ar' ? '-5px' : '15px', // Fine-tune for RTL
                            }}
                        >
                            <SettingsSuggestIcon
                                sx={{
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px', // Adjust size if necessary
                                    marginTop: '4px', // Slight margin for visual balance
                                }}
                            />
                        </Button>

                    </div>

                    {/* Menu for filtering */}
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


                {/* Main Container */}
                <div>
                    {!isLoaded ? (
                        // Show 5 skeleton loaders while loading
                        Array.from({ length: 5 }).map((_, index) => (
                            <Box
                                key={`skeleton-${index}`}
                                className='meteors-demo-container'
                                sx={{
                                    width: '100%',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    padding: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    marginTop: 2,
                                    position: 'relative',
                                    minHeight: isSmallScreen || isTabletScreen ? '250px' : '210px',
                                    display: 'flex',
                                    overflow: 'hidden',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
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
                                        zIndex: 0,
                                    }}
                                />

                                {/* Skeleton Content */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <Card className=''
                                        style={{
                                            width: isSmallScreen ? '100%' : '100%',
                                            height: '290px',
                                            padding: '16px',
                                            position: 'absolute',
                                            top: '-10px',
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
                                                    isMediumScreen ? '14%' :
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
                                                    isMediumScreen ? '14%' :
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
                                                width: isSmallScreen ? '19rem' : '14rem',
                                                borderRadius: '8px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                right: currentLanguage === 'ar' && isMediumScreen ? '3%' :
                                                    currentLanguage === 'ar' && isSmallScreen ? '3%' :
                                                        currentLanguage === 'ar' ? '72%' : '3%',
                                                left:
                                                    isSmallScreen ? '3%' :

                                                        isMediumScreen ? '3%' :
                                                            'unset',
                                                top: isSmallScreen ? '25%' :
                                                    isMediumScreen ? '28%' :
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
                                                height: '5rem',
                                                width: isSmallScreen ? '96%' :
                                                    isMediumScreen ? '97%' :
                                                        currentLanguage === 'ar' ? '93.5%' :
                                                            '95.5%',
                                                borderRadius: '8px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '1.5%',
                                                top: isSmallScreen ? '34%' :
                                                    isMediumScreen ? '38%' :
                                                        '27%',
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
                                                            isMediumScreen ? '33%' :
                                                                '3%',
                                                top: isSmallScreen ? '66%' :
                                                    isMediumScreen ? '71%' :
                                                        '61%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >

                                        </div>
                                    </Card>
                                </div>
                            </Box>
                        ))
                    ) : gigs.length > 0 ? (
                        // Show actual gigs when loaded
                        gigs.map((gig) => (
                            <Box className='meteors-demo-container'
                            key={gig._id}
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
    
                            <style>
                                {loadingKeyframes}
                            </style>
    
                            {/* Skeleton Loader */}
                            {!isLoaded ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <Card className=''
                                        style={{
                                            width: isSmallScreen ? '100%' : '100%',
                                            height: '290px',
                                            padding: '16px',
                                            position: 'absolute',
                                            top: '-10px',
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
                                                    isMediumScreen ? '14%' :
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
                                                    isMediumScreen ? '14%' :
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
                                                width: isSmallScreen ? '19rem' : '14rem',
                                                borderRadius: '8px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                right: currentLanguage === 'ar' && isMediumScreen ? '3%' :
                                                    currentLanguage === 'ar' && isSmallScreen ? '3%' :
                                                        currentLanguage === 'ar' ? '72%' : '3%',
                                                left:
                                                    isSmallScreen ? '3%' :
    
                                                        isMediumScreen ? '3%' :
                                                            'unset',
                                                top: isSmallScreen ? '25%' :
                                                    isMediumScreen ? '28%' :
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
                                                height: '5rem',
                                                width: isSmallScreen ? '96%' :
                                                    isMediumScreen ? '97%' :
                                                        currentLanguage === 'ar' ? '93.5%' :
                                                            '95.5%',
                                                borderRadius: '8px',
                                                backgroundColor: '#111827',
                                                position: 'absolute',
                                                left: '1.5%',
                                                top: isSmallScreen ? '34%' :
                                                    isMediumScreen ? '38%' :
                                                        '27%',
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
                                                            isMediumScreen ? '33%' :
                                                                '3%',
                                                top: isSmallScreen ? '66%' :
                                                    isMediumScreen ? '71%' :
                                                        '61%',
                                                overflow: 'hidden',
                                                backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                            }}
                                        >
    
                                        </div>
                                    </Card>
                                </div>
    
                            ) : (
    
    
    
    
                                <>
    
                                    <Box className="profile-container "
                                        sx={{
                                            position: 'absolute',
                                            top: '15px',
                                            left: '1%',
                                            padding: isSmallScreen ? '5px' : 'unset',
                                            width: '97%',
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
                                       onClick={() => handleProfileClick(gig)}
                                            sx={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                border: '2px solid #ccc',
                                                position: 'relative',
                                                overflow: 'visible',
                                                cursor : 'pointer',
                                            }}>
                                                <img
                                                    src={getImageUrl(gig.userId.profileImg)}
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
    
                                                <Box sx={{
                                                    marginLeft: '15px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    marginRight: '3px',
                                                }}>
                                                    {/* User Name */}
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            fontFamily: (gig.userId.firstName && containsArabic(gig.userId.firstName)) ||
                                                                (gig.userId.lastName && containsArabic(gig.userId.lastName))
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                            fontSize: '14px',
                                                            maxWidth: isSmallScreen ? '90px' : '200px', // Set max width for the name
                                                            whiteSpace: 'nowrap', // Prevent wrapping
                                                            overflow: 'hidden', // Hide overflowed content
                                                            textOverflow: 'ellipsis', // Add ellipsis if text overflows
                                                        }}
                                                    >
                                                        {gig.userId.firstName} {gig.userId.lastName}
                                                    </Typography>
    
                                                    {/* User Role */}
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: '13px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {t('(Khadamat Buyer)')}
                                                    </Typography>
    
                                                    {/* Star Rating */}
    
                                                </Box>
                                                <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '7px', }}>
                                                    <div className="Time"
                                                        style={{
                                                            display: 'flex',
                                                            gap: currentLanguage === 'ar' ? '5px' : 'unset',
                                                        }}
                                                    >
                                                        <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                        <Typography sx={{
                                                            color: 'white',
                                                            marginLeft: '3px',
                                                            fontSize: '13px',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            '& .number': {
                                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                            }
                                                        }}>
                                                            {getTimeAgo(gig.createdAt, currentLanguage)}
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
                                                    <div className="Offers"
                                                        style={{
                                                            display: 'flex',
                                                            gap: currentLanguage === 'ar' ? '5px' : 'unset',
                                                        }}
                                                    >
                                                        <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', }} />
                                                        <Typography sx={{
                                                            color: 'white',
                                                            marginLeft: '5px',
                                                            fontSize: '13px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
    
                                                        }}>
                                                            <span
                                                                style={{
                                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                                    marginLeft: currentLanguage === 'ar' ? '3px' : 'unset',
                                                                    marginRight: '3px',
    
    
                                                                }}
                                                            >
                                                                {gig.offerCount}
    
                                                            </span>
                                                            {t('Offer')}
                                                        </Typography>
    
                                                    </div>
    
    
                                                </Box>
                                            </div>
                                        </Box>
    
                                        {/* Project Title */}
                                        <Box onClick={() => handleGigClick(gig._id)}
                                            sx={{
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                paddingRight: '10px',
    
    
                                            }}>
                                            <Typography
    
                                                sx={{
                                                    position: 'relative',
                                                    textDecoration: 'none',
                                                    color: 'white',
                                                    transition: 'color .15s ease-in-out',
                                                    display: 'inline-block',
                                                    fontFamily: gig.projectTitle && containsArabic(gig.projectTitle)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    cursor: 'pointer', // Make sure this is always a pointer
                                                    textWrap: 'nowrap',
                                                    width: '100%',
                                                    backgroundSize: '100% 100%',
                                                    '&:after': {
                                                        display: 'block',
                                                        content: '""',
                                                        position: 'absolute',
                                                        right: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '3px',
                                                        transform: 'translateY(0)', // Default to the visible state
                                                        opacity: 1, // Default to fully visible
                                                        background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                                        transition: 'transform .15s ease-in-out, opacity .15s ease-in-out',
                                                    },
                                                }}
                                            >
                                                {/* Apply the truncation logic directly to the title */}
                                                {(() => {
                                                    const text = gig.projectTitle;
                                                    const maxWords = isSmallScreen ? 6 : isMediumScreen ? 7 : isTabletScreen ? 10 : isLargeScreen ? 15 : 10; // Default to 10 words
                                                    const words = text.split(' ');
                                                    return words.length > maxWords
                                                        ? words.slice(0, maxWords).join(' ') + '...'
                                                        : text;
                                                })()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box className='ProjectDescription'
                                        style={{
                                            position: 'absolute',
                                            top: isSmallScreen || isTabletScreen ? '46%' : '37%',
                                            left: '1%',
                                            padding: isSmallScreen ? '5px' : 'unset',
                                            width: '97%',
                                            height: '88px',
                                            display: 'flex', // Enable flexbox
                                            justifyContent: 'flex-start', // Center content vertically
                                            alignItems: 'center', // Center content horizontally
                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Keep text alignment
                                            overflow: 'hidden', // Hide overflow if content exceeds bounds
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#64748B',
                                                fontWeight: 'bold',
                                                overflow: 'hidden',
                                                fontFamily: gig.projectDescription && containsArabic(gig.projectDescription)
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                display: '-webkit-box',
                                                '-webkit-line-clamp': '3', // Number of lines to display
                                                '-webkit-box-orient': 'vertical',
                                                textOverflow: 'ellipsis',
                                                lineHeight: '27px',
                                                wordWrap: 'break-word',
    
    
                                            }}
                                        >
                                            {gig.projectDescription}
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
                                        <div className="Button">
                                            <Button variant="outlined"
                                             onClick={() => handleGigClick(gig._id)}
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
                                                    {t('Make an offer')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </Box>
                                </>
                            )}
    
                        </Box>
                        ))
                    ) : (
                        // Empty state when no gigs found
                        <Box sx={{
                            width: '100%',
                            textAlign: 'center',
                            py: 4,
                            color: 'white'
                        }}>
                            <InventoryIcon sx={{ fontSize: 60, opacity: 0.5 }} />
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                {t('No gigs found')}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                {t('Check back later or create a new gig')}
                            </Typography>
                        </Box>
                    )}
                </div>

            












               {/* Pagination */}
      <div
        className="Pages"
        style={{
          width: "100%",
          height: "30px",
          background: "transparent",
          marginTop: "50px",
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div id="triangleLeft"></div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              width: "38px",
              height: "38px",
              background: page === currentPage ? "rgb(91, 66, 243)" : "hsl(240, 3.7%, 15.88%)",
              color: "white",
              borderRadius: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.1s ease-in-out, color 0.1s ease-in-out",
            }}
          >
            {page}
          </div>
        ))}
        <div id="triangleRight"></div>
      </div>

      {/* Previous/Next Buttons */}
      <div
        className="Buttonss"
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
          style={{
            color: "rgb(91, 66, 243)",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "capitalize",
            minWidth: "64px",
            height: "32px",
            padding: "0 12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.1)",
            transition: "transform 0.2s, colors 0.2s, opacity 0.2s",
            fontSize: "13px",
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          style={{
            color: "rgb(91, 66, 243)",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "capitalize",
            minWidth: "64px",
            height: "32px",
            padding: "0 12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.1)",
            transition: "transform 0.2s, colors 0.2s, opacity 0.2s",
            fontSize: "13px",
          }}
        >
          Next
        </button>
      </div>
    </div>
         
        </>


    )
}

export default ResponsiveAll