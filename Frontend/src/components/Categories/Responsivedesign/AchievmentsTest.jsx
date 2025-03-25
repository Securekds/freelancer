import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '@mui/material/useMediaQuery';








function AchievmentsTest({ onCloseClick, ocClickOpen }) {

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


    const { user } = useUser(); // Access user data from UserCon

    const [opacity, setOpacity] = useState(1); // Default opacity
    const lineRef = useRef(null); // Reference to the div

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    useEffect(() => {
        const updateOpacity = () => {
            if (lineRef.current) {
                const height = lineRef.current.offsetHeight;
                const maxHeight = 180; // Maximum height after which opacity is fully reduced
                const minHeight = 80; // Minimum height where opacity is at full
                const calculatedOpacity = Math.max(
                    0.1, // Minimum opacity value
                    Math.min(1, 1 - (height - minHeight) / (maxHeight - minHeight)) // Formula to reduce opacity as height increases
                );
                setOpacity(calculatedOpacity);
            }
        };

        // Call the update function on window resize
        window.addEventListener('resize', updateOpacity);
        updateOpacity(); // Initial calculation

        return () => {
            window.removeEventListener('resize', updateOpacity);
        };
    }, []); // Empty dependency array ensures this runs only on mount


    const [selectedAchievement, setSelectedAchievement] = useState(0);



    const Achievmenets = [{
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
        AchievmenetsPoints: '500',
        OpacityIcon: faCrown,
        RewardHeight: '90px',
        Marginleft: 'unset',


    },
    {
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735407245/reward2-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_l41ga4.png',
        AchievmenetsPoints: '1500',
        OpacityIcon: faCrown,
        RewardHeight: '105px',
        Marginleft: 'unset',


    },
    {
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735407248/reward3-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_xpqwgd.png',
        AchievmenetsPoints: '3000',
        OpacityIcon: faCrown,
        RewardHeight: '120px',
        Marginleft: 'unset',


    },
    {
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735407247/reward4-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_ythqeq.png',
        AchievmenetsPoints: '5000',
        OpacityIcon: faCrown,
        RewardHeight: '140px',
        Marginleft: 'unset',


    },
    {
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735407247/reward5-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_sn95cs.png',
        AchievmenetsPoints: '8000',
        OpacityIcon: faCrown,
        RewardHeight: '160px',
        Marginleft: '15px',


    },
    {
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735488041/reward6_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_d37t8x.png',
        AchievmenetsPoints: '12000',
        OpacityIcon: faCrown,
        RewardHeight: '180px',
        Marginleft: '15px',


    },
    {
        Background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon: 'https://res.cloudinary.com/damicjacf/image/upload/v1735488047/reward7_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70__1_-removebg-preview_mvrynn.png',
        AchievmenetsPoints: '12001+',
        OpacityIcon: faCrown,
        RewardHeight: '220px',
        Marginleft: 'unset',
        Marginleft: '4px',


    },
    ]
    const achievementTitles = [
        { title: "Novice Navigator", level: "Level 1", points: "0-500" },
        { title: "Rising Star", level: "Level 2", points: "500-1,500" },
        { title: "Expert Explorer", level: "Level 3", points: "1,500-3,000" },
        { title: "Master Mariner", level: "Level 4", points: "3,000-5,000" },
        { title: "Legend Voyager", level: "Level 5", points: "5,000-8,000" },
        { title: "Elite Explorer", level: "Level 6", points: "8,000-12,000" },
        { title: "Ultimate Champion", level: "Level 7", points: "12,000+" }
    ];

    // Precise triangle positions for each achievement

    const trianglePositions = {
        0: '5.9%',    // Original first position
        1: '19.9%',
        2: '33.7%',
        3: '47.7%',
        4: '61.8%',
        5: '75.7%',
        6: '89.8%'
    };

    const ArabictrianglePositions = {
        0: '90.2%',    // Original first position
        1: '76%',
        2: '62.3%',
        3: '48.4%',
        4: '34.4%',
        5: '20.5%',
        6: '6.5%'
    };


// Get triangle position based on selected achievement and current language
const getTrianglePosition = (index) => {
    if (currentLanguage === 'ar') {
        return ArabictrianglePositions[index] || '90.2%'; // Fallback to first position if index not found
    }
    return trianglePositions[index] || '5.9%'; // Fallback to first position if index not found
};

    const [animatingIndex, setAnimatingIndex] = useState(null);


    const handleAchievementClick = (index) => {
        setSelectedAchievement(index);
        setAnimatingIndex(index);
        setTimeout(() => {
            setAnimatingIndex(null);
        }, 1200); // Slightly longer to ensure animation completes
    };

    // CSS keyframes as a string
    const keyframesStyle = `
       @keyframes scaleAndRotate {
           0% {
               transform: scale(1) rotate(0deg);
           }
           30% {
               transform: scale(1.2) rotate(0deg);
           }
           100% {
               transform: scale(1) rotate(360deg);
           }
       }
   `;



    return (
        <div
            className="MainContainer"
            style={{
                width: "100%",
                height: "auto",
                padding: "40px",

                paddingBottom: "30px",
                display: "flex",

                flexDirection: "column",
                gap: "20px",
                position: "relative", // Ensure positioning context for children

            }}
        >
            <div className="BlurBG"

                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    bottom: 0,
                    borderRadius: "16px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: "-1",
                }}
            />
            <div className="CloseIcon"

                style={{
                    position: "absolute", // Absolute positioning relative to the MainContainer
                    top: "10px", // Adjust from the top
                    right: "25px", // Adjust from the right
                    cursor: "pointer", // Show pointer cursor on hover
                    zIndex: 1, // Ensure it's on top of other elements
                }}
                onClick={onCloseClick} // Trigger the onCloseClick function when clicked
            >
                <CloseIcon style={{ color: "#ffffff", fontSize: "20px" }} />{" "}
                {/* Customize icon size and color */}
            </div>
            <div className="TYpo"
            >
                <div className="FirstTypo">
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'Yang Bagus, sans-serif',
                            whiteSpace: 'nowrap',
                            fontSize: isMediumScreen? '20px' : '25px',
                            color: 'white',
                            fontWeight: currentLanguage === 'ar' ? 'bold' : 'unset',
                            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                        }}
                    >
                        {currentLanguage === 'ar' ? 'مكافآت الإنجازات' : 'Achievements Rewards'}

                    </Typography>
                </div>
                <div className="SecondTypo"
                    style={{
                        width: '31%',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'linear-gradient(to left, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',

                    }}
                >
                    <div className="FirstTypo"
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'Yang Bagus, sans-serif',
                                whiteSpace: 'nowrap',
                                fontWeight: currentLanguage === 'ar' ? 'bold' : 'unset',
                                fontSize: isMediumScreen? '20px' : '25px',
                                color: 'white',
                                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                            }}
                        >
                            {t('Current Points  :')}
                        </Typography>
                    </div>
                    <div className="SecondTypo"
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        {currentLanguage === 'ar' ? (
                            <Typography
                                sx={{
                                    fontFamily: 'Yang Bagus, sans-serif',
                                    whiteSpace: 'nowrap',
                                    fontSize: isMediumScreen? '20px' : '25px',
                                    color: 'white',
                                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                }}
                            >
                                <span
                                    style={{
                                        marginLeft: '5px',
                                    }}
                                >
                                    300
                                </span>
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{
                                        fontSize: isMediumScreen? '20px' : '24px',
                                        color: '#FFDF00',
                                        marginTop: '-5px'
                                    }}

                                />

                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: 'Yang Bagus, sans-serif',
                                    whiteSpace: 'nowrap',
                                    fontSize: isMediumScreen? '20px' : '25px',
                                    color: 'white',
                                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{
                                        fontSize: isMediumScreen? '20px' : '24px',
                                        color: '#FFDF00',
                                        marginTop: '-5px'
                                    }}

                                />
                                <span
                                    style={{
                                        marginLeft: '5px',
                                    }}
                                >
                                    300
                                </span>
                            </Typography>
                        )}

                    </div>
                </div>
            </div>
            <div className="Rewards">
                {/* Add the keyframes to the DOM */}
                <style>{keyframesStyle}</style>
                <div
                    className="RewardsContainer"
                    style={{
                        width: '100%',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    {Achievmenets.map((review, index) => (
                        <div
                            className="Reward"
                            key={index}
                            onClick={() => handleAchievementClick(index)}
                            style={{
                                width: '9%',
                                height: review.RewardHeight,
                                display: 'flex',
                                marginBottom: '-10px',
                                cursor: 'pointer',
                                position: 'relative',
                            }}
                        >
                            {selectedAchievement === index && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: '4px',
                                        zIndex: 1,
                                        pointerEvents: 'none'
                                    }}
                                />
                            )}
                            <div
                                className="Line1"
                                style={{
                                    width: '5%',
                                    height: '100%',
                                    background: review.Background
                                }}
                            />
                            <div
                                className="Content"
                                style={{
                                    width: '82%',
                                    height: '100%',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    className="Background"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: review.Background,
                                        zIndex: -1
                                    }}
                                />

                                <div className="RewardIcon1"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginLeft: '-6px',
                                        width: '100%',
                                        marginTop: '-90px',
                                        position: 'relative',
                                        top: 0
                                    }}
                                >
                                    <img
                                        width={isMediumScreen ? 125 : 145}
                                        style={{
                                            display: 'block',
                                            marginLeft: review.Marginleft,
                                            animation: animatingIndex === index ? 'scaleAndRotate 1.2s ease-in-out' : 'none',
                                        }}
                                        src={review.AchievmenetIcon}
                                        alt=""
                                    />
                                    <div
                                        className="Typo"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '3px',
                                            width: '100%'
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                fontSize: '13px',
                                                color: '#FFDF00',
                                                marginTop: '-5px'
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontFamily: 'Yang Bagus, sans-serif',
                                                whiteSpace: 'nowrap',
                                                fontSize: '14px',
                                                color: 'white',
                                                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                                            }}
                                        >
                                            {review.AchievmenetsPoints}
                                        </Typography>
                                    </div>
                                </div>

                                <div
                                    className="OpacityIcon"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        marginTop: '15px'
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCrown}
                                        size="lg"
                                        style={{
                                            fontSize: '37px',
                                            color: 'white',
                                            opacity: '0.1',
                                            transform: 'rotate(0deg)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                className="Line2"
                                style={{
                                    width: '5%',
                                    height: '100%',
                                    background: review.Background
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className="Base"
                    style={{
                        width: '100%',
                        height: '10px',
                        background: '#00ade1',
                        boxShadow: '0 0 25px #00ade1',
                        position: 'relative'
                    }}
                />
                <div
                    className="Triangle"
                    style={{
                        width: '0',
                        height: '0',
                        borderLeft: '25px solid transparent',
                        borderRight: '25px solid transparent',
                        borderTop: '30px solid #00ade1',
                        position: 'absolute',
                        left: getTrianglePosition(selectedAchievement),
                        backgroundColor: 'transparent',
                        transition: 'left 0.3s ease-in-out'
                    }}
                />
            </div>
            <>
                {/* Your existing achievement mapping code here */}

                <div className="AchievementsStatus "
                    style={{
                        width: '100%',
                        height: 'auto',
                        marginTop: '-18px',
                        display: 'flex',
                        marginBottom: '-40px',
                    }}
                >
                    <div className="AchievementInfo"
                        style={{
                            width: '50%',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className="Img"
                            style={{
                                marginTop: '-10px',
                            }}
                        >
                            <img src={Achievmenets[selectedAchievement].AchievmenetIcon}
                             width={isMediumScreen ? 130 : 150}
                            />
                        </div>
                        <div className="TYpo"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                            }}
                        >
                            <div className="FirstTypo"
                                style={{
                                    display: 'flex',
                                    gap: '5px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'Yang Bagus, sans-serif',
                                        fontWeight: currentLanguage === 'ar' ? 'bold' : 'unset',
                                        whiteSpace: 'nowrap',
                                        fontSize: isMediumScreen? '18px' : '20px',
                                        color: 'white',
                                        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                    }}
                                >
                                    {t(achievementTitles[selectedAchievement].title)} :

                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'Yang Bagus, sans-serif',
                                        whiteSpace: 'nowrap',
                                        fontWeight: currentLanguage === 'ar' ? 'bold' : 'unset',
                                        fontSize: isMediumScreen? '18px' : '20px',
                                        color: 'rgba(0, 173, 225, 0.8)',
                                        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                    }}
                                >
                                    {currentLanguage === 'ar'
                                        ? t(achievementTitles[selectedAchievement].level)
                                        : achievementTitles[selectedAchievement].level
                                    }
                                </Typography>
                            </div>
                            <div className="SecondTypo"
                                style={{
                                    width: '31%',
                                    height: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '-10px',
                                    gap: '5px',
                                }}
                            >
                                <div className="FirstTypo"
                                    style={{
                                        marginTop: '5px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'Yang Bagus, sans-serif',
                                            whiteSpace: 'nowrap',
                                            fontSize: isMediumScreen? '18px' : '20px',
                                            fontWeight: currentLanguage === 'ar' ? 'bold' : 'unset',
                                            color: 'white',
                                            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                        }}
                                    >
                                        {t('Target Points  :')}
                                    </Typography>
                                </div>
                                <div className="SecondTypo"
                                    style={{
                                        marginTop: '5px',
                                        direction: currentLanguage === 'ar' ? 'ltr' : 'unset',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'Yang Bagus, sans-serif',
                                            whiteSpace: 'nowrap',
                                            fontSize: isMediumScreen? '18px' : '20px',
                                            color: 'white',
                                            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                fontSize: isMediumScreen? '18px' : '20px',
                                                color: '#FFDF00',
                                                marginTop: '-5px'
                                            }}
                                        />
                                        <span
                                            style={{
                                                marginLeft: '5px',

                                            }}
                                        >
                                            {achievementTitles[selectedAchievement].points}
                                        </span>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="RewardPrize"
                        style={{
                            width: currentLanguage === 'ar'? '60%' : '50%',
                            padding: '35px',
                            display: 'flex',
                            alignItems: currentLanguage === 'ar'? 'flex-end' : 'center',
                            flexDirection: 'column',
                            marginLeft : currentLanguage === 'ar'? '-250px' : 'unset',
                        }}
                    >
                        <div className="PrizeIcon"
                            style={{
                                marginLeft: '150px',
                                marginTop: '-20px',
                            }}
                        >
                            <img
                                width={isMediumScreen ? 150 : 220}
                                src="https://res.cloudinary.com/damicjacf/image/upload/v1735511429/MyprizeOriginal_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_dd33m8.png"
                                alt=""
                            />
                        </div>
                        <div className="SecondTypo"
                            style={{
                                width: '42%',
                                height: '35px',
                                display: 'flex',
                                marginLeft: '170px',
                                marginTop: isMediumScreen? '0px' : '-10px',
                                alignItems: 'center',
                                marginLeft : currentLanguage === 'ar'? '135px' : '150px',
                                justifyContent: 'center',
                                gap: '5px',
                                background: `linear-gradient(
                                to right, 
                                rgba(0, 173, 225, 0) 0%,
                                rgba(0, 173, 225, 0.2) 15%,
                                rgba(0, 173, 225, 0.4) 30%,
                                rgba(0, 173, 225, 0.7) 45%,
                                rgba(0, 173, 225, 0.8) 50%,
                                rgba(0, 173, 225, 0.7) 55%,
                                rgba(0, 173, 225, 0.4) 70%,
                                rgba(0, 173, 225, 0.2) 85%,
                                rgba(0, 173, 225, 0) 100%
                              )`,
                            }}
                        >
                            <div className="FirstTypo"
                                style={{
                                    marginTop: '5px',
                                
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: currentLanguage === 'ar' ? 'bold' : 'unset',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'Yang Bagus, sans-serif',
                                        whiteSpace: 'nowrap',
                                        fontSize: isMediumScreen? '20px' : '25px',
                                        color: 'white',
                                        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                    }}
                                >
                                    {t('Prize Locked')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>

    )
}

export default AchievmentsTest