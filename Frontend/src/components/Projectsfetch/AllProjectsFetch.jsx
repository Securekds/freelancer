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
import ShiftingDropDown from '../Categories/ShiftingDropDown';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import { Card, Skeleton } from "@nextui-org/react";
import { display, width } from '@mui/system';


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




function AllProjectsFetch() {

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

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 2000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();

    const goToSinglePost = () => {
        navigate('/userdashboard/project/singlepost');
    };


    return (
        <>
            <div className="Container22"
                style={{
                    width: '96%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >

                <div className="box-header"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '5px',
                        width: '100%',
                        position : 'relative',
                        height: '65px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center', // Align title and button horizontally
                    }}
                >
                    {/* Typography for title */}
                    <Button
                        className="Programming"
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            width: '150px',
                            padding: '0.5rem 0',
                            color: '#9ca3af',
                            background: 'transparent',
                            cursor: 'pointer',
                            border: 'none',
                            height: '50px',
                            borderRadius: '25px',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            position: 'relative', // Keeps Button positioned as reference
                            transition: 'box-shadow 0.5s, transform 0.5s',

                            '&:hover': {
                                boxShadow: `
                                 0 0 15px #5B42F3,
                                 0 0 25px #00DDEB,
                                 0 0 35px #5B42F3
                               `,
                                transform: 'scale(1.1)',
                                color: 'white',
                            },
                        }}
                    >
                        <CodeIcon
                            sx={{
                                color: 'white',
                                transition: 'box-shadow 0.5s, transform 0.5s',
                                '&:hover': {
                                    boxShadow: `
                                     0 0 15px #5B42F3,
                                     0 0 25px #00DDEB,
                                     0 0 35px #5B42F3
                                   `,
                                    transform: 'scale(1.1)',
                                },
                            }}
                        />
                        <span
                            style={{
                                fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                position: 'relative', // Needed for underline
                                display: 'inline-block', // Ensures span takes exact width
                            }}
                        >
                            {t('Programming')}
                            <span
                                style={{
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: '-5px', // Adjust to position the underline below the text
                                    left: 0,
                                    width: '100%',
                                    height: '3px',
                                    background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                }}
                            />
                        </span>
                    </Button>



                   <div className="CaTegories">
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
                    <div className="Menu"
                       style={{
                        position: 'absolute',
                        height: '10px',
                        top: '-28%',
                        right :'4%'
                       
                    }}
                    >
                        <ShiftingDropDown/>
                    </div>

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
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{
                            width: '140px', // Keep the menu width consistent
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
                {boxContents.map((content, index) => (
                    <Box key={index} className='meteors-demo-container'

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
                        {!isLoaded && (
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

                        )}



                        {isLoaded && (
                            <>
                                <Box className="profile-container"
                                    sx={{
                                        position: 'absolute',
                                        top: '15px',
                                        left: '1%',
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
                                        {/* Profile Picture with Badge */}
                                        <Box sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            border: '2px solid #ccc',
                                            position: 'relative',
                                            overflow: 'visible',
                                        }}>
                                            <img
                                                src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
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
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontSize: '14px',
                                                        maxWidth: '200px', // Set max width for the name
                                                        whiteSpace: 'nowrap', // Prevent wrapping
                                                        overflow: 'hidden', // Hide overflowed content
                                                        textOverflow: 'ellipsis', // Add ellipsis if text overflows
                                                    }}
                                                >
                                                    {t('Nabil Hamici')}
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
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    {[...Array(5)].map((_, index) => (
                                                        <StarIcon key={index} sx={{ color: '#FFD700', fontSize: '14px' }} />
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '7px', }}>
                                                <div className="Time"
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '13px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {t('13 minutes ago')}
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
                                                        {t('27 Offers')}
                                                    </Typography>

                                                </div>


                                            </Box>
                                        </div>
                                    </Box>

                                    {/* Project Title */}
                                    <Box sx={{
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
                                                const text = t('[Programming an integrated online store with react and express and more ee plex erd fdf ]');
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
                                        width: '97%',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#64748B',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            overflow: 'hidden',
                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                            display: '-webkit-box',
                                            '-webkit-line-clamp': '3', // Number of lines to display
                                            '-webkit-box-orient': 'vertical',
                                            textOverflow: 'ellipsis',
                                            lineHeight: '27px',
                                            wordWrap: 'break-word',


                                        }}
                                    >
                                        {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                    </Typography>
                                </Box>
                                <Box className="ButtonContainer"
                                    style={{
                                        position: 'absolute',
                                        top: isSmallScreen || isTabletScreen ? '82%' : '80%',
                                        width: '97%',
                                        left: '1%',
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
                ))}

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

export default AllProjectsFetch