import { Tooltip, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { faSeedling, faMedal, faStar, faTrophy, faStarHalfAlt, faCrown, faAward, faCoins } from '@fortawesome/free-solid-svg-icons';
import { faPhoenixFramework } from '@fortawesome/free-brands-svg-icons';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { FaFireAlt, FaMeteor, FaFeatherAlt } from 'react-icons/fa';
import { GiTorch, GiLighthouse, GiFireball, } from 'react-icons/gi';

import { MdLocalFireDepartment } from 'react-icons/md';



function RankDesign() {

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

    const ranks = [
        {
            number: "#1",
            name: "Novice Freelancer",
            level: '5',
            icon: faSeedling,
            icon1: GiTorch,
            description: "",
            bgColor: "#E2E8F0", // Silver/grey
            iconColor: "#64748B",
            coinsColor: "#64748B", // Matching grey
            ach1: 'Complete your first task.',
            ach2: 'Complete 3 consecutive tasks.',
            ach3: 'Earn a 4-star or higher rating on a task.',
            points: 'Points: 0 - 500',
            levelAch: 'Level 1',
            totalpoints: '500',
            reward: 'Basic',
            pointnumbers: '96/500',


        },
        {
            number: "#2",
            name: "Junior Freelancer",
            icon: faMedal,
            icon1: GiTorch,
            level: '15',
            description: "",
            bgColor: "#86EFAC", // Light green
            iconColor: "#22C55E",
            coinsColor: "#22C55E", // Matching green
            ach1: 'Complete 10 Projects',
            ach2: 'Earn 1000+ USD',
            ach3: 'Receive 5 Positive Reviews',
            points: 'Points: 501 - 1500',
            progress: 'emty div',
            levelAch: 'Level 1',
            totalpoints: '1500',
            reward: 'Ember',
            pointnumbers: '600/1500',
        },
        {
            number: "#3",
            name: "Mid-Level Freelancer",
            icon: faStar,
            icon1: MdLocalFireDepartment,
            level: '30',
            coinsColor: "#EAB308", // Matching gold
            bgColor: "#FEF08A", // Light yellow/gold
            iconColor: "#EAB308",
            ach1: 'Complete 20 Projects',
            ach2: 'Earn 2000+ USD',
            ach3: 'Receive 10 Positive Reviews',
            points: 'Points: 1501 - 3000',
            progress: 'emty div',
            levelAch: 'Level 1',
            totalpoints: '1500',
            reward: 'Flame',
            pointnumbers: '1196/3000',
        },
        {
            number: "#4",
            name: "Senior Freelancer",
            icon: faTrophy,
            icon1: GiTorch,
            level: '50',
            description: "",
            bgColor: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)", // Blue gradient
            iconColor: "#ffffff",
            glow: "0 0 15px rgba(59, 130, 246, 0.5)",
            ach1: 'Complete 50 Projects',
            coinsColor: "#3B82F6", // Solid blue from gradient
            ach2: 'Earn 5000+ USD',
            ach3: 'Receive 25 Positive Reviews',
            points: 'Points: 3001 - 5000',
            progress: 'emty div',
            levelAch: 'Level 1',
            totalpoints: '5000',
            reward: 'Torch',
            pointnumbers: '600/5000',

        },
        {
            number: "#5",
            name: "Elite Freelancer",
            icon: faStarHalfAlt,
            level: '75',
            icon1: GiLighthouse,
            description: "",
            bgColor: "linear-gradient(135deg, #C084FC 0%, #A855F7 100%)", // Purple gradient
            iconColor: "#ffffff",
            glow: "0 0 15px rgba(168, 85, 247, 0.5)",
            ach1: 'Complete 100 Projects',
            ach2: 'Earn 9000+ USD',
            ach3: 'Work 1000+ Hours',
            points: 'Points: 5001 - 8000',
            progress: 'emty div',
            levelAch: 'Level 1',
            totalpoints: '8000',
            reward: 'Beacon',
            coinsColor: "#A855F7", // Solid purple from gradient
            pointnumbers: '2600/8000',
        },
        {
            number: "#6",
            name: "Pro Freelancer",
            icon: faCrown,
            description: "",
            icon1: GiFireball,
            level: '100',
            bgColor: "linear-gradient(135deg, #FDA4AF 0%, #F43F5E 100%)", // Pink/orange gradient
            iconColor: "#ffffff",
            coinsColor: "#F43F5E", // Solid pink from gradient
            glow: "0 0 15px rgba(244, 63, 94, 0.5)",
            ach1: 'Complete 200 Projects',
            ach2: 'Earn 15,000+ USD',
            ach3: 'Receive 100 Positive Reviews',
            points: 'Points: 8001 - 12000',
            progress: 'emty div',
            levelAch: 'Level 1',
            totalpoints: '12000',
            reward: 'Inferno',
            pointnumbers: '3600/12000',
        },
        {
            number: "#7",
            name: "Master Freelancer",
            icon: faAward,
            level: '150',
            icon1: faPhoenixFramework,
            description: "",
            coinsColor: "#FF6347", // Solid orange/red from gradient
            bgColor: "linear-gradient(135deg, #FFA07A 0%, #FF6347 100%)", // Orange/red gradient
            iconColor: "#ffffff",
            glow: "0 0 15px rgba(255, 99, 71, 0.5)",
            ach1: 'Complete 300 Projects',
            ach2: 'Earn 25,000+ USD',
            ach3: 'Maintain a 98%+ Client Satisfaction Rate',
            points: 'Points: 12001+',
            progress: 'emty div',
            levelAch: 'Level 1',
            totalpoints: '12001',
            reward: 'Phoenix',
            pointnumbers: '6600/12001',
        }
    ];


    // Helper function to check if icon is a FontAwesome icon
    const isFontAwesomeIcon = (icon) => {
        return icon && typeof icon === 'object' && icon.prefix && icon.iconName;
    };


    return (
        <div className='MainContainer'
            style={{
                width: '100%',
                maxWidth: '14000px',
                height: 'auto',
                padding: "25px",
                overflow: 'auto',
                overflowX: 'auto',
                paddingBottom: '30px',


            }}

        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid white',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: '-1',

            }} />
            <div className="Header"
                style={{
                    width: '100%',
                    minWidth: '1300px',
                    borderBottom: '1px solid white',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}
            >
                <div className="RankSymbol ">
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',

                            fontSize: '15px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        Rank Symbol
                    </Typography>
                </div>
                <div className="RankName"
                    style={{
                        position: 'absolute',
                        left: '14%',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        Rank Name
                    </Typography>
                </div>
                <div className="RankLevel"
                    style={{
                        position: 'absolute',
                        left: '30%',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        Target Level
                    </Typography>

                </div>
                <div className="AchievementRequirements"
                    style={{
                        position: 'absolute',
                        left: '45%',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        Achievement Requirements
                    </Typography>
                </div>
                <div className="AchievementPoints"
                    style={{
                        position: 'absolute',
                        left: '72%',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        Points
                    </Typography>
                </div>
                <div className="NextRankProgress"
                    style={{
                        position: 'absolute',
                        left: '90%',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center', // Ensure text is centered
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        Progress
                    </Typography>
                </div>
            </div>
            <div className="RankIcons "
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px', // Add gap between RankRow divs
                    marginTop: '10px',
                 
                    whiteSpace: 'nowrap', // Prevent the content from wrapping
                }}
            >
                {ranks.map((rank, index) => (
                    <div   className="RankRow"
                      
                        key={index}
                        style={{
                            display: 'flex',
                            width: '100%',
                           
                            gap: '20px',
                            minWidth: '1350px', // Adjust this based on the expected width of content
                            padding: '20px',
                            alignItems: 'center',

                        }}
                    >
                        {/* Rank Symbol Section */}
                        <div className="RankSymbol "


                            style={{
                                display: 'flex',
                                gap: '10px', // Gap between number and icon
                                alignItems: 'center',
                             
                            }}
                        >
                            {/* Rank Number */}
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    fontSize: '15px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {rank.number}
                            </Typography>
                            {/* Rank Icon */}
                            <div
                                style={{
                                    background: rank.bgColor,
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: rank.glow || 'none',
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={rank.icon}
                                    size="lg"
                                    style={{
                                        transform: 'rotate(0deg)',
                                        fontSize: '23px',
                                        color: rank.iconColor,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Rank Name Section */}
                        <div className="RankName "

                            style={{
                          width : '10%'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {rank.name}
                            </Typography>
                        </div>

                        {/* Rank Level Section */}
                        <div className="RankLevel "

                            style={{
                        
                         }}
                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {rank.level}
                            </Typography>
                        </div>

                        {/* Gap Container for Achievements */}
                        <div className="div border"
                        style={{
                          
                        }}
                        
                        >
                        <div className="RankLevelAchievements  
                        "

                            style={{
                               
                                gap: '10px', // Add gap between the achievement divs
                                 
                               
                                padding: '10px',
                               
                            }}
                        >
                            <div className="CssGlass RankLevel"

                                style={{
                                    padding: '5px',
                                    width: '290px', // Set a fixed width for all achievement divs
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                        lineHeight: '1.5', // Adjust line height for spacing
                                        textAlign: 'center', // Optional: centers the text
                                    }}
                                >
                                    <span style={{ display: 'block' }}>{rank.ach1}</span>
                                    <span style={{ display: 'block' }}>{rank.ach2}</span>
                                    <span style={{ display: 'block' }}>{rank.ach3}</span>
                                </Typography>
                            </div>
                        </div>

                        </div>

                        <div className="Points"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                
                                alignItems: 'center',
                                
                            

                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    lineHeight: '1.5', // Adjust line height for spacing
                                    textAlign: 'center', // Ensures the points are centered
                                }}
                            >
                                {rank.points}
                            </Typography>
                        </div>
                        <div className="CssGlass Progress"
                            style={{
                                display: 'flex',
                                height: '95px',
                                width: '230px',
                                marginTop: '14px',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '5px',

                                padding: '15px',

                            }}
                        >
                            <div className="TYpo "
                                style={{
                                    width: '100%',
                                    display: 'flex',

                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Wining point
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {rank.levelAch}
                                </Typography>

                            </div>
                            <div className="Earn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    gap: '7px'
                                }}
                            >
                                <div className="Max"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '7px'
                                    }}
                                >
                                    <FontAwesomeIcon
                                        style={{
                                            color: rank.coinsColor
                                        }}
                                        icon={faCoins} />
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontSize: '15px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {rank.totalpoints}
                                    </Typography>

                                </div>
                                <div className="Reward"
                                    style={{
                                        background: '#E2E8F0',
                                        display: 'flex',
                                        width: '90px',
                                        justifyContent: 'center',
                                        borderRadius: '16px',
                                        padding: '5px',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: rank.bgColor,
                                            width: "25px",
                                            height: "25px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: rank.glow || 'none',
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <div
                                            style={{
                                                transform: 'rotate(0deg)',
                                                fontSize: '15px',
                                                color: rank.iconColor,
                                            }}
                                        >
                                            {rank.icon1 && (
                                                isFontAwesomeIcon(rank.icon1) ? (
                                                    <FontAwesomeIcon icon={rank.icon1} size="sm" />
                                                ) : (
                                                    <rank.icon1 size={18} />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <Typography
                                        sx={{
                                            color: '#64748B',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {rank.reward}
                                    </Typography>

                                </div>


                            </div>
                            <div className="ProgressBar"
                                style={{
                                    width: '100%',
                                    background: 'white',
                                    height: '5px',
                                    borderRadius: '16px',
                                    position: 'relative',

                                }}
                            >
                                <div className="Progress"
                                    style={{
                                        width: '40%',
                                        background: rank.bgColor,
                                        boxShadow: rank.glow || 'none',
                                        transition: "all 0.3s ease",
                                        height: '5px',
                                        borderRadius: '16px',
                                        position: 'relative',

                                    }}
                                >

                                </div>

                            </div>
                            <div className="Numbers"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {rank.pointnumbers}
                                </Typography>
                                <div className="Reward"
                                    style={{

                                        display: 'flex',

                                        justifyContent: 'center',
                                        borderRadius: '16px',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Elite
                                    </Typography>
                                    <EmojiEventsIcon sx={{ color: rank.coinsColor, fontSize: '17px', }} />

                                </div>
                            </div>

                        </div>

                    </div>
                ))}
            </div>




        </div >
    )
}

export default RankDesign