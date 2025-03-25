import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar } from '@fortawesome/free-solid-svg-icons';








function AchievementRespoDesign({ onCloseClick, ocClickOpen }) {

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


    const { user } = useUser(); // Access user data from UserContext

    const [opacity, setOpacity] = useState(1); // Default opacity
    const lineRef = useRef(null); // Reference to the div

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



    const Achievmenets = [{
          Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
          AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
          AchievmenetsPoints : '500',
          OpacityIcon : faCrown,
          RewardHeight : '90px',


    },
    {
        Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
        AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
        AchievmenetsPoints : '500',
        OpacityIcon : faCrown,
        RewardHeight : '120px',


  },
  {
    Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
    AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
    AchievmenetsPoints : '500',
    OpacityIcon : faCrown,
    RewardHeight : '90px',


},
{
    Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
    AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
    AchievmenetsPoints : '500',
    OpacityIcon : faCrown,
    RewardHeight : '90px',


},
{
    Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
    AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
    AchievmenetsPoints : '500',
    OpacityIcon : faCrown,
    RewardHeight : '90px',


},
{
    Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
    AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
    AchievmenetsPoints : '500',
    OpacityIcon : faCrown,
    RewardHeight : '90px',


},
{
    Background : 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',
    AchievmenetIcon : 'https://res.cloudinary.com/damicjacf/image/upload/v1735407246/reward1-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_mqrfvt.png',
    AchievmenetsPoints : '500',
    OpacityIcon : faCrown,
    RewardHeight : '90px',


},
]


    return (
        <div
            className="MainContainer"
            style={{
                width: "100%",
                height: "auto",
                padding: "20px",
                overflow: "auto",
                overflowX: "auto",
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            <div   className="CloseIcon"
              
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
            <div className="AchievementContainer "

                style={{
                    width: "94%",
                    height: 'auto',
                    borderRadius: "16px",
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '15px',

                }}
            >
                <div className="RewardsContainer "
                    style={{
                        width: '100%',
                        padding: '10px',
                       
                        display : 'flex',
                        justifyContent : 'space-between',

                    }}
                >
                     {Achievmenets.map((review, index) => (
                    <div className="Reward"
                    kep={index}
                        style={{
                            width: '9%',
                            height: review.RewardHeight,
                            display: 'flex',
                        }}
                    >
                        <div
                            className="Line1"
                            style={{
                                width: '5%',
                                height: 'auto',
                                background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',

                            }}
                        >
                        </div>
                        <div className="Content"
                            style={{
                                width: '82%',
                                height: 'auto',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',

                                gap: '25px',
                            }}
                        >
                            {/* Background gradient */}
                            <div className="Background"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background : review.Background,
                                    zIndex: -1,
                                }}
                            />

                            {/* Reward Icon and Points */}
                            <div className="RewardIcon1 "
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                     marginLeft : '-6px',
                                    width: '100%', // Added to ensure full width for centering
                                }}
                            >
                                <img
                                    width={130}
                                    style={{
                                        display: 'block', // Added for better centering

                                    }}
                                    src={review.AchievmenetIcon}
                                    alt=""
                                />

                                {/* Points display */}
                                <div className="Typo"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', // Added to center horizontally
                                        gap: '3px',
                                        width: '100%', // Added to ensure full width
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        style={{
                                            fontSize: '13px',
                                            color: '#FFDF00',
                                            marginTop: '-5px',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: 'Yang Bagus, sans-serif',
                                            whiteSpace: 'nowrap',
                                            fontSize: '14px',
                                            color: 'white',
                                            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                                        }}
                                    >
                                        {review.AchievmenetsPoints}
                                    </Typography>
                                </div>
                            </div>

                            {/* Crown Icon */}
                            <div className="OpacityIcon"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center', // Added to center horizontally
                                    width: '100%', // Added to ensure full width
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCrown}
                                    size="lg"
                                    style={{
                                        fontSize: '37px',
                                        color: 'white',
                                        opacity: '0.1',
                                        transform: 'rotate(0deg)',
                                    
                                        marginTop: '-15px',
                                    }}
                                />
                            </div>

                            {/* Triangle */}
                            <div className="Triangle"
                                style={{
                                    width: '0',
                                    height: '0',
                                    borderLeft: '25px solid transparent',
                                    borderRight: '25px solid transparent',
                                    borderTop: '30px solid #00ade1',
                                    backgroundColor: 'transparent',
                                    margin: '0 auto', // Added to center horizontally
                                }}
                            />
                        </div>

                        <div className="Line2"
                            style={{
                                width: '5%',
                                height: 'auto',
                                background: 'linear-gradient(to bottom, rgba(0, 173, 225, 0) 0%, rgba(0, 173, 225, 0.3) 20%, rgba(0, 173, 225, 0.4) 40%, rgba(0, 173, 225, 0.6) 60%, rgba(0, 173, 225, 0.8) 80%, rgba(0, 173, 225, 1) 100%)',

                            }}
                        >

                        </div>

                    </div>
                     ))}




                </div>
                <div className="Base" style={{
                    width: '100%',
                    height: '10px',
                    marginTop: '-10px',
                    background: '#00ade1',
                    boxShadow: '0 0 25px #00ade1', // Default glow effect
                    position: 'relative', // Ensure the triangle is positioned relative to this div
                }}>

                </div>

             



            </div>
        </div>

    )
}

export default AchievementRespoDesign