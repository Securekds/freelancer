import React, { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";
import { useUser } from '../../../Context/UserContext.jsx'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faSatelliteDish, faHandshake, faGlobe, faFolderOpen, faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddOfferToBuyer from '../Responsivedesign/AddOfferToBuyer.jsx';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from '../../../assets/images/small-logos/NoImages.json'
import { useParams } from 'react-router-dom';
import { useGig } from '../../../Context/GigContext.jsx';
import SkeletonLoading from './SkeletonLoading.jsx';



function SingleProjectOverView({ handleOpenUserVerify, handleOpenOffer, handleOpenOfferDetails, handleOpenOfferAccepted, handleOpenOfferDeclined }) {

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
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const { user, getImageUrl } = useUser(); // Make sure you're getting both user and setUser

    const colors = [
        { backgroundColor: "#4f1941", color: "#c22884" },
        { backgroundColor: "#2a5471", color: "#5bc1fd" },
        { backgroundColor: "#3d2d6f", color: "#8b5cf6" },
        { backgroundColor: "#1ba198", color: "#26eec3" },
        { backgroundColor: "#48233c", color: "#f85a9d" }, // Added color 1
        { backgroundColor: "#244d4f", color: "#2dffc8" }, // Added color 2
        { backgroundColor: "#362b55", color: "#9c72ff" }, // Added color 3
        { backgroundColor: "#1d5a77", color: "#72d8ff" }, // Added color 4
    ];

    const skills = [
        "Website Development",
        "Graphic Design",
        "SEO Marketing",
        "Data Analysis",
        "Mobile App Development",
        "UI/UX Design",
        "Content Creation",
        "Project Management",
        "Cybersecurity",
        "AI Development",
        "Cloud Computing",
        "Game Development",
        "Social Media Marketing",
        "Copywriting",
        "Product Management",
    ];

    const roleTitle = "Marketing Ceo";
    const LaunchDate = '2024 Jan 13'
    const CompletedProjects = '3 Done'
    const TimeToComplete = '3 Days'
    const formatJoinDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();

        return `${year} ${month} ${day}`;
    };


    const { gigId } = useParams();

    const { gig, isGigLoading, fetchGigById , offers } = useGig();

    useEffect(() => {
        if (gigId) {
            fetchGigById(gigId);
         

        }
    }, [gigId]);

    if (isGigLoading || !gig) {
        return <SkeletonLoading />;
    }
    


   

    const coverImage = gig?.userId?.coverImg
        ? `url(${getImageUrl(gig.userId.coverImg)}) center/cover no-repeat`
        : "none"; // Fallback if no image

    const containsArabic = (text) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    };


    const getArabicDayLabel = (day) => {
        if (day === 1) return "يوم"; // 1 يوم
        if (day === 2) return "يوم"; // 2 يوم
        if (day >= 3 && day <= 10) return "أيام"; // 3-10 أيام
        if (day >= 11) return "يوم"; // 11+ يوم
        return "يوم"; // Default fallback
    };



    return (
        <div
            style={{
                width: "96%",
                height: "auto",
                marginTop: "50px",
                borderRadius: "0.75rem",
                backgroundClip: "border-box",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: "0 solid rgba(0, 0, 0, 0.125)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                padding: '10px',
                gap: '10px',
            }}
        >
            <div className="ProjectTitel">
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        textAlign: 'center',
                        color: 'transparent',
                        fontFamily: gig?.projectTitle && containsArabic(gig.projectTitle)
                            ? '"Droid Arabic Kufi", serif'
                            : '"Airbnbcereal", sans-serif',


                    }}
                >
                    {gig?.projectTitle}
                </Typography>
            </div>
            <div className="UnderLine"
                style={{
                    width: '80%',
                    height: '1px',
                    background: 'white',
                }}
            >


            </div>
            <div className="InfoContainer"
                style={{
                    display: 'flex',
                    width: '100%',
                    gap: '10px',
                    flexDirection: isTabletScreen ? 'column' :
                        isSmallScreen ? 'column' :
                            'unset',


                }}
            >
                <div className="ClientInfo"
                    style={{
                        height: 'auto',
                        width: isTabletScreen ? '100%' :
                            isSmallScreen ? '100%' :
                                '50%',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        backgroundClip: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: isSmallScreen ? '15px' : 'unset',
                        gap: '34px',
                        paddingBottom: '15px',
                        position: 'relative', // Ensure inner content respects its position
                        zIndex: 1, // Ensure profile section is above the animated stars
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
                    <div className="Cover"
                        style={{
                            width: '100%',
                            height: '100px',
                            background: 'rgb(2,0,36)',
                            background: `url(${getImageUrl(user?.coverImg)}) center/cover no-repeat`,
                            borderTopRightRadius: '0.75rem',
                            borderTopLeftRadius: '0.75rem',
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <div className='ProfileCircle' style={{
                            width: '70px',
                            height: '70px',
                            display: 'flex',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid #ccc',
                            position: 'absolute',
                            bottom: '-30%',
                        }}>
                            <img
                                src={getImageUrl(gig.userId.profileImg)}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />

                        </div>

                    </div>
                    <div className="ClientName"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            style={{
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {gig.userId.firstName} {gig.userId.lastName}
                        </Typography>
                        <Typography
                            style={{
                                color: '#ffffff',
                                marginTop: '-5px',
                                opacity: '0.8',
                                fontFamily: /[\u0600-\u06FF]/.test(roleTitle)
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {roleTitle}
                        </Typography>
                    </div>
                    <div className="ClientInfo"
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '-10px',

                        }}
                    >
                        <div className="CssGlass joinData"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',

                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="JoinData"
                                    style={{
                                        backgroundColor: "#c8bbfa",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBusinessTime}
                                        style={{ transform: 'rotate(0deg)', fontSize: '18px', color: '#4a32c5' }} // Reset any unwanted rotation
                                    />
                                </div>

                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Join Date')}
                                    </Typography>
                                </div>
                            </div>


                            <Button
                                sx={{
                                    width: isSmallScreen ? '26%' : '23%',
                                    maxWidth: isSmallScreen ? '26%' : '23%',
                                    color: 'white',
                                    border: '1px solid white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: '16px',
                                    maxHeight: '400px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textWrap: 'nowrap',
                                        gap: '5px',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                    }}
                                >

                                    {formatJoinDate(gig.userId.createdAt)}
                                </Typography>
                            </Button>
                        </div>
                        <div className="CssGlass LuchData"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="Rank"
                                    style={{
                                        backgroundColor: "#acdeff",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faListCheck}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '23px',
                                            color: '#177fff',

                                        }} // Reset any unwanted rotation

                                    />
                                </div>


                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            textWrap: 'nowrap',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Launch Date')}
                                    </Typography>
                                </div>

                            </div>


                            <Button
                                sx={{
                                    width: isSmallScreen ? '26%' : '23%',
                                    maxWidth: isSmallScreen ? '26%' : '23%',
                                    color: 'white',
                                    border: '1px solid white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: '16px',
                                    maxHeight: '400px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textWrap: 'nowrap',
                                        gap: '5px',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                    }}
                                >

                                    {formatJoinDate(gig.createdAt)}
                                </Typography>
                            </Button>

                        </div>
                        <div className="CssGlass CompletedProjects"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="Rank"
                                    style={{
                                        backgroundColor: "#ffde9e",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCircleCheck}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '23px',
                                            color: '#f7972b'
                                        }} // Reset any unwanted rotation
                                    />
                                </div>

                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Projects Done')}
                                    </Typography>
                                </div>
                            </div>





                            <Button
                                sx={{
                                    width: '23%',
                                    maxWidth: '23%',
                                    color: 'white',
                                    border: '1px solid white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: '16px',
                                    maxHeight: '400px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textWrap: 'nowrap',
                                        gap: '5px',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                    }}
                                >

                                    {CompletedProjects}
                                </Typography>
                            </Button>


                        </div>

                    </div>


                </div>
                <div className="ProjectStatus"
                    style={{
                        height: 'auto',
                        width: isTabletScreen ? '100%' :
                            isSmallScreen ? '100%' :
                                '50%',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        backgroundClip: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '34px',
                        padding: isSmallScreen ? '15px' : 'unset',
                        paddingBottom: '15px',
                        position: 'relative', // Ensure inner content respects its position
                        zIndex: 1, // Ensure profile section is above the animated stars
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

                    <div className="StausTypo"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <Typography
                            style={{
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('Project Status')}
                        </Typography>
                        <Typography
                            style={{
                                color: '#ffffff',
                                marginTop: '-5px',
                                opacity: '0.8',

                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('General info')}
                        </Typography>
                    </div>
                    <div className="DataProject"
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '-10px',

                        }}
                    >
                        <div className="CssGlass ProjectStatu"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="JoinData"
                                    style={{
                                        backgroundColor: "#4f1941",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",

                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                    }}
                                >
                                    <FontAwesomeIcon icon={faSatelliteDish}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '18px',
                                            color: '#c22884'

                                        }} // Reset any unwanted rotation
                                    />
                                </div>

                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Project Status')}
                                    </Typography>
                                </div>
                            </div>


                            <Button
                                sx={{
                                    width: '23%',
                                    maxWidth: '23%',
                                    color: 'white',
                                    border: '1px solid white',
                                    background: gig.status === 'closed' ? '#fae3e3' : '#194e3d',
                                    borderRadius: '16px',
                                    maxHeight: '400px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: gig.status === 'closed' ? '#d32f2f' : '#2df873',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textWrap: 'nowrap',
                                        gap: '5px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {currentLanguage === 'ar'
                                        ? gig.status === 'closed' ? 'مغلق' : 'مفتوح'
                                        : gig.status}
                                </Typography>

                            </Button>
                        </div>
                        <div className="CssGlass ProjectOffer"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="Rank"
                                    style={{
                                        backgroundColor: "#2a5471",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faHandshake}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '23px',
                                            color: '#5bc1fd',

                                        }} // Reset any unwanted rotation

                                    />
                                </div>


                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            textWrap: 'nowrap',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Project Offers')}
                                    </Typography>
                                </div>

                            </div>


                            <Button
                                sx={{
                                    width: '23%',
                                    maxWidth: '23%',
                                    color: 'white',
                                    border: '1px solid white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: '16px',
                                    maxHeight: '400px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textWrap: 'nowrap',
                                        gap: '5px',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                    }}
                                >

                                    {offers.length}
                                </Typography>
                            </Button>

                        </div>
                        <div className="CssGlass ProjectBadget"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="IconBudget"
                                    style={{
                                        backgroundColor: "#3d2d6f",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faHandHoldingDollar}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '23px',
                                            color: '#8b5cf6',
                                        }} // Reset any unwanted rotation
                                    />
                                </div>

                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Project Budget')}
                                    </Typography>
                                </div>
                            </div>





                            <Button
                                sx={{
                                    color: 'white',
                                    border: '1px solid white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: '16px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                    padding: '0 16px', // Add horizontal padding for spacing
                                    whiteSpace: 'nowrap', // Prevent text wrapping
                                    minWidth: 'fit-content', // Ensure the button only takes the required width
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {gig.selectedBudget}
                                </Typography>
                            </Button>



                        </div>
                        <div className="CssGlass TimeToCopmpleteDate"
                            style={{
                                display: 'flex',
                                width: isSmallScreen ? '100%' : '90%',
                                gap: '10px',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ensure button goes to the end
                                margin: '0 auto', // Center the div horizontally
                            }}
                        >
                            {/* Rank and Typography Container */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px' // 5px gap between Rank and Typography 
                            }}>
                                <div className="Rank"
                                    style={{
                                        backgroundColor: "#1ba198",
                                        width: "40px", // Adjust size as needed
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faGlobe}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '23px',
                                            color: '#26eec3'
                                        }} // Reset any unwanted rotation
                                    />
                                </div>

                                <div className="TYpo">
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            lineHeight: '20px',
                                            fontSize: '15px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {t('Execution time')}
                                    </Typography>
                                </div>
                            </div>





                            <Button
                                sx={{
                                    width: '23%',
                                    maxWidth: '23%',
                                    color: 'white',
                                    border: '1px solid white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: '16px',
                                    maxHeight: '400px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center', // Center content vertically
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        textWrap: 'nowrap',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {/* Extract number and wrap in span */}
                                    {gig.selectedTime.match(/\d+/) && (
                                        <span
                                            style={{
                                                fontFamily: '"Airbnbcereal", sans-serif',

                                            }}
                                        >
                                            {gig.selectedTime.match(/\d+/)[0]}
                                        </span>
                                    )}

                                    {/* Extract label and display normally */}
                                    {currentLanguage === 'ar'
                                        ? getArabicDayLabel(parseInt(gig.selectedTime)) // Arabic label
                                        : "days" // English label
                                    }
                                </Typography>


                            </Button>


                        </div>

                    </div>


                </div>


            </div>

            <div className="ProjectContext"
                style={{
                    height: 'auto',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundClip: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '34px',
                    padding: '20px',
                    paddingBottom: '15px',
                    position: 'relative', // Ensure inner content respects its position
                    zIndex: 1, // Ensure profile section is above the animated stars
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
                <div className="ClientName"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    <div className="ProjectContextTypo"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            backgroundColor: "#2a5471",
                            borderRadius: '30Px',

                        }}
                    >

                        <Typography
                            style={{
                                color: '#5bc1fd',
                                fontWeight: 'bold',
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('Project Context')}
                        </Typography>
                        <Typography
                            style={{
                                color: '#5bc1fd',
                                marginTop: '-5px',


                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('Project description')}
                        </Typography>
                    </div>
                    <Typography
                        sx={{

                            color: '#fff',
                            fontWeight: 'bold',
                            lineHeight: 1.6,
                            fontFamily: gig?.projectDescription && containsArabic(gig.projectDescription)
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {gig.projectDescription}
                    </Typography>

                </div>
                <div className="SharedPhotoAndLink"
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'unset',
                        justifyContent: 'space-between',
                        background: 'rgba(0, 0, 0, 0.9)',
                        gap: '25px',
                        height: 'auto',
                        padding: '10px',
                        borderRadius: '16px',
                    }}
                >
                    <div className="PhotoAndVideos"

                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            width: isSmallScreen ? "100%" : "50%",
                        }}
                    >
                        {/* Title Section */}
                        <div
                            className="TYpoPhoto"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    fontFamily:
                                        currentLanguage === "ar"
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                }}
                            >
                                {t("Photos and Videos")}
                                <span
                                    style={{
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontSize: "13px",
                                        marginLeft: "5px",
                                        marginRight: currentLanguage === "ar" ? "10px" : "unset",
                                        opacity: "0.5",
                                        background: "rgba(255,255,255,0.5)",
                                        borderRadius: "16px",
                                        padding: "4px",
                                    }}
                                >
                                    {gig?.uploadedPhotos?.length || 0}
                                </span>
                            </Typography>
                            <span
                                style={{
                                    fontFamily:
                                        currentLanguage === "ar"
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: "13px",
                                    marginLeft: "5px",
                                    color: "white",
                                    opacity: "0.5",
                                    textDecoration: "underline",
                                    borderRadius: "16px",
                                    padding: "4px",
                                }}
                            >
                                {t("See all")}
                            </span>
                        </div>

                        {/* Images Section */}
                        <div className="Images"

                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                justifyContent: gig?.uploadedPhotos?.length === 0 ? "center" : "flex-start",
                                alignItems: gig?.uploadedPhotos?.length === 0 ? "center" : "unset",
                                minHeight: "200px", // Ensures proper centering even with empty state
                                width: "100%", // Keeps it centered properly
                            }}
                        >
                            {/* Check if uploadedPhotos array is empty */}
                            {gig?.uploadedPhotos?.length === 0 ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "rgba(255,255,255,0.6)",
                                            fontSize: "14px",
                                            fontFamily:
                                                currentLanguage === "ar"
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',

                                        }}
                                    >
                                        {t("No images available")}
                                    </Typography>
                                    <Lottie
                                        animationData={animationData}
                                        style={{ width: 200, height: 200 }}
                                    />
                                </div>
                            ) : (
                                gig.uploadedPhotos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="IMG"
                                        style={{
                                            width: "50%",
                                            height: isMediumScreen ? "100px" : "180px",
                                            background: "white",
                                            borderRadius: "0.75rem",
                                            backgroundImage: `url(${photo})`,
                                            backgroundSize: "cover",
                                            transition: "transform 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                ))
                            )}
                        </div>

                    </div>

                    <div className="Divider"
                        style={{
                            width: '1px',
                            height: 'auto',
                            background: 'white',
                        }}
                    >

                    </div>
                    <div className="SharedFiles"

                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            width: isSmallScreen ? '100%' : '50%',
                        }}
                    >
                        <div className="TYpoPhoto"

                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    textWrap: 'nowrap',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                                {t('Shared Files')}
                                <span
                                    style={{
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontSize: '13px',
                                        marginLeft: '5px',
                                        marginRight: currentLanguage === 'ar' ? '10px' : 'unset',
                                        opacity: '0.5',
                                        background: 'rgba(255,255,255,0.5)',
                                        borderRadius: '16px',
                                        padding: '4px',
                                    }}
                                >
                                    {gig?.projectLinks?.length || 0}
                                </span>
                            </Typography>
                            <span
                                style={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '13px',
                                    marginLeft: '5px',
                                    color: 'white',
                                    opacity: '0.5',
                                    textDecoration: 'underline',
                                    borderRadius: '16px',
                                    padding: '4px',
                                }}
                            >
                                {t('See all')}
                            </span>
                        </div>

                        <div className="Folders"

                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                                alignItems: gig?.projectLinks?.length === 0 ? 'center' : 'flex-start',
                                justifyContent: gig?.projectLinks?.length === 0 ? 'center' : 'flex-start',
                                minHeight: "200px", // Ensures proper centering even with empty state
                                width: "100%", // Keeps it centered properly

                            }}
                        >
                            {gig?.projectLinks?.length === 0 ? (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "rgba(255,255,255,0.6)",
                                                fontSize: "14px",
                                                fontFamily:
                                                    currentLanguage === "ar"
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',

                                            }}
                                        >
                                            {t("No Shared Links available")}
                                        </Typography>
                                        <Lottie
                                            animationData={animationData}
                                            style={{ width: 200, height: 200 }}
                                        />
                                    </div>
                                </>
                            ) : (
                                gig.projectLinks.map((link, index) => (
                                    <div
                                        key={index}
                                        className="IconAndTYpo"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    >
                                        <div
                                            className="FolderIcon"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '15px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFolderOpen}
                                                style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#fff', stroke: 4 }}
                                            />
                                        </div>
                                        <div className="TYpo">
                                            <Typography
                                                sx={{
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    fontSize: '13px',
                                                    maxWidth: '168px',
                                                    whiteSpace: 'normal',
                                                    textTransform: 'capitalize',
                                                    overflow: 'hidden',
                                                    fontFamily: containsArabic(link)
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    textOverflow: 'ellipsis',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    display: '-webkit-box',
                                                }}
                                            >
                                                {link}
                                            </Typography>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>



            </div>
            <div className="SkillsNeded"
                style={{
                    height: 'auto',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundClip: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '34px',
                    padding: '20px',
                    paddingBottom: '15px',

                    position: 'relative', // Ensure inner content respects its position
                    zIndex: 1, // Ensure profile section is above the animated stars
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
                <div className="Sills"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',

                    }}
                >
                    <div className="SillsNeeded"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            backgroundColor: "#2a5471",
                            borderRadius: '30Px',

                        }}
                    >

                        <Typography
                            style={{
                                color: '#5bc1fd',
                                fontWeight: 'bold',
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('Project Skills')}
                        </Typography>
                        <Typography
                            style={{
                                color: '#5bc1fd',
                                marginTop: '-5px',


                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('requeired skills')}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {gig.selectedSkills && gig.selectedSkills.length > 0 ? (
                            gig.selectedSkills.map((skill, index) => {
                                const { backgroundColor, color } = colors[index % colors.length];
                                return (
                                    <div
                                        key={index}
                                        className="AllSkills"
                                        style={{
                                            backgroundColor,
                                            borderRadius: "90px 30px 30px 90px",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "5px 10px 5px 25px",
                                            position: "relative",
                                            gap: "10px",
                                        }}
                                    >
                                        <div
                                            className="Point"
                                            style={{
                                                height: "8px",
                                                width: "8px",
                                                background: color,
                                                marginLeft: currentLanguage === 'ar' ? 'unset' : "-15px",
                                                borderRadius: "90px",
                                            }}
                                        />
                                        <Typography
                                            style={{
                                                color,
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                fontFamily: containsArabic(skill)
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            {skill}
                                        </Typography>
                                    </div>
                                );
                            })
                        ) : (
                            <Typography style={{ color: "#777", fontSize: "14px" }}>
                                {t("No skills selected")}
                            </Typography>
                        )}
                    </div>


                </div>




            </div>
            <div className="UsersOffers"
                style={{
                    height: 'auto',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundClip: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '34px',
                    padding: '20px',
                    paddingBottom: '15px',
                }}
            >


                <div className="UsersOffers"
                    style={{
                        width: '109%',
                        display: "flex",
                        justifyContent: "center",
                        marginTop: '15px',
                    }}
                >
                    <AddOfferToBuyer
                        gigStatus={gig?.status}
                        handleOpenOfferAccepted={handleOpenOfferAccepted}
                        gigOwnerId={gig.userId._id}
                        handleOpenOfferDetails={handleOpenOfferDetails}
                        gigId={gigId}
                        handleOpenOffer={handleOpenOffer}
                        handleOpenOfferDeclined={handleOpenOfferDeclined}
                         handleOpenUserVerify={handleOpenUserVerify}
                    />
                </div>






            </div>



        </div>
    )
}

export default SingleProjectOverView;
