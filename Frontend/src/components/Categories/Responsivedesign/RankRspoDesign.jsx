import { Tooltip, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from 'i18next';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import {
    faSeedling,
    faMedal,
    faStar,
    faTrophy,
    faStarHalfAlt,
    faCrown,
    faAward,
    faCoins,
    faScrewdriver,
    faKey,
    faSpa,
    faDove,
    faFireFlameCurved,
    faBolt,
    faBacon
} from '@fortawesome/free-solid-svg-icons';





import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon from Material UI or use any other icon




function RankRspoDesign({ onCloseClick, ocClickOpen }) {

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





    const [ranks, setRanks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    // Create an icons mapping object
    const iconsMap = {
        seedling: { icon: faSeedling, color: '#65758e' },      // Bright green
        medal: { icon: faMedal, color: '#5bc269' },           // Gold
        star: { icon: faStar, color: '#d6b027' },             // Yellow
        trophy: { icon: faTrophy, color: '#fff' },         // Orange
        starhalfalt: { icon: faStarHalfAlt, color: '#fff' }, // Gold
        crown: { icon: faCrown, color: '#fff' },           // Gold
        award: { icon: faAward, color: '#fff' }            // Silver
    };

    const iconsMap1 = {
        screwdriver: { icon: faScrewdriver, color: 'grey' },
        key: { icon: faKey, color: 'grey' },
        spa: { icon: faSpa, color: '#d6b027' },
        dove: { icon: faDove, color: '#87CEEB' },
        fireflamecurved: { icon: faFireFlameCurved, color: '#fff' },
        bolt: { icon: faBolt, color: '#fff' },
        bacon: { icon: faBacon, color: '#fff' }
    };





    const commonStyles = {
        marginTop: '25px',
        height: '95px',  // Set consistent height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const fetchRanks = async () => {
        setLoading(true);
        setError(null); // Reset error state before the request
        try {
            const response = await axios.get("http://localhost:8800/server/ranks/get-totalranks");

            // Log the entire response to check the structure
            console.log('Fetched ranks:', response.data);

            // Assuming response.data contains ranks, otherwise adjust this based on the actual response structure
            setRanks(response.data); // If ranks are directly in `response.data`, no need for .data
        } catch (err) {
            console.error("Error fetching ranks:", err);
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again later."
            );
        } finally {
            setLoading(false); // Always stop loading regardless of success or failure
        }
    };

    useEffect(() => {
        fetchRanks();
    }, []);



    return (
        <div className='MainContainer'
            style={{
                width: '100%',
                height: 'auto',
                padding: "25px",
                minWidth: 'min-content', // Add this to ensure content doesn't shrink below its minimum width
                height: '100%',
            }}

        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                bottom: 0,
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid white',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: '-1',

            }} />
         
            <div
                style={{
                    position: 'absolute',  // Absolute positioning relative to the MainContainer
                    top: '10px',           // Adjust from the top
                    right: '25px',         // Adjust from the right
                    cursor: 'pointer',     // Show pointer cursor on hover
                    zIndex: 1,             // Ensure it's on top of other elements
                }}
                onClick={onCloseClick}  // Trigger the onCloseClick function when clicked
            >
                <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />  {/* Customize icon size and color */}
            </div>
            <div className="Header"
                style={{
                    width: '90%',
                    minWidth: '1150px',
                    marginTop: '-15px',
                    borderBottom: '1px solid white',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}
            >
                <div className="RankSymbol"
                    style={{
                        height: 'auto',
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
                            marginRight: currentLanguage === 'ar' ? '22px' : 'unset',
                            whiteSpace: 'nowrap', // Prevent wrapping
                        }}
                    >
                        {t('Rank Symbol')}
                    </Typography>

                </div>
                <div className="RankName"
                    style={{
                        position: 'absolute',
                        left: currentLanguage === 'ar' ? '80%' : '14%',
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
                        {t('Rank Name')}
                    </Typography>
                </div>


                <div className="AchievementRequirements"
                    style={{
                        position: 'absolute',
                        left: currentLanguage === 'ar' ? '57%' : '30%',
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
                        {t('Achievement Requirements')}
                    </Typography>
                </div>
                <div className="RankLevel"
                    style={{
                        position: 'absolute',
                        left: currentLanguage === 'ar' ? '36.6%' : '55%',
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
                        {t('Target Level')}
                    </Typography>

                </div>

                <div className="AchievementPoints"
                    style={{
                        position: 'absolute',
                        left: currentLanguage === 'ar' ? '24%' : '70%',
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
                        {t('Points')}
                    </Typography>
                </div>
                <div className="NextRankProgress"
                    style={{
                        position: 'absolute',
                        left: currentLanguage === 'ar' ? '5%' : '90%',
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
                        {t('Progress')}
                    </Typography>
                </div>
            </div>
            <div className="ContectMapedData"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {ranks.map((rank, index) => (
                    <div className="MapedData Rank1"
                        key={index}
                        style={{
                            width: '95%',
                            display: 'flex',
                            minWidth: '1300px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <div className="RankSymbolsContainer"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '6%',
                            }}
                        >
                            <div className="RankSymbol"
                                style={{
                                    ...commonStyles,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    marginTop: '25px',
                                    width: '100%',
                                    marginRight: currentLanguage === 'ar' ? '15px' : 'unset',
                                    marginLeft: '15px',
                                    height: 'auto',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {rank.rankNumber}
                                </Typography>
                                <div className='RankIncons'
                                    style={{
                                        background: rank.bgColor,
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.9)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {rank.icon ? (
                                        iconsMap[rank.icon.toLowerCase()] ? (
                                            <FontAwesomeIcon
                                                icon={iconsMap[rank.icon.toLowerCase()].icon}
                                                style={{
                                                    transform: 'rotate(0deg)',
                                                    fontSize: '22px',
                                                    color: iconsMap[rank.icon.toLowerCase()].color,
                                                }}
                                            />
                                        ) : (
                                            <span>Invalid Icon: {rank.icon}</span>
                                        )
                                    ) : (
                                        <span>No Icon Available</span>
                                    )}
                                </div>


                            </div>
                        </div>

                        <div className="RankNameContainer"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '13%',
                                marginTop: '-10px',
                            }}
                        >
                            <div className="RankName"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    marginTop: '43px',
                                    marginLeft: '-9px',
                                    width: '100%',
                                    height: 'auto',
                                    marginRight: currentLanguage === 'ar' ? '-14px' : 'unset',
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
                                    {t(rank.rankName)}
                                </Typography>
                            </div>
                        </div>

                        <div className="RankAchievement Container"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '23%',
                            }}
                        >
                            <div className="CssGlass RankAchievement"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    marginTop: '25px',
                                    padding: '10px',
                                    width: '100%',
                                    marginLeft: '-40px',
                                    height: 'auto',
                                    marginRight: currentLanguage === 'ar' ? '-40px' : 'unset',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        whiteSpace: 'normal',
                                        lineHeight: '1.5',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {rank.achievements.map((achievement, idx) => (
                                        <span key={idx} style={{ display: 'block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {t(achievement.description)}
                                        </span>
                                    ))}
                                </Typography>
                            </div>
                        </div>

                        <div className="RankLevelContainer"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '10%',
                                marginTop: '-18px',
                            }}
                        >
                            <div className="RankSymbol"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    marginTop: '42px',
                                    width: '100%',
                                    height: 'auto',
                                    marginLeft: '-60px',
                                    marginRight: currentLanguage === 'ar' ? '-42px' : 'unset',
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
                                    {t(rank.rankLevel)}
                                </Typography>
                            </div>
                        </div>

                        <div className="RankPoints"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '15%',
                            }}
                        >
                            <div
                                className="RankPoints"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    marginTop: '25px',
                                    width: '100%',
                                    marginLeft: '-113px',
                                    height: 'auto',
                                    marginRight: currentLanguage === 'ar' ? '-90px' : 'unset',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {t('Points')}: {`${rank.pointsRange.min}-${rank.pointsRange.max || '∞'}`}
                                </Typography>
                            </div>
                        </div>

                        <div className="RankProgressContainer"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '15%',
                                flexShrink: 0,
                            }}
                        >
                            <div className="CssGlass RankSymbol"

                                style={{
                                    display: 'flex',
                                    height: '100px',
                                    width: '230px',
                                    marginTop: '14px',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '-145px',
                                    gap: '5px',
                                    padding: '15px 15px',
                                    marginRight: currentLanguage === 'ar' ? '-130px' : 'unset',
                                }}
                            >
                                <div className="TYpo"
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
                                        {t('Wining points')}
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
                                        {t(rank.levelAch)}
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
                                            icon={faCoins}
                                        />
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                fontSize: '15px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {t(rank.totalPoints.toString())}
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
                                        <div className='RankIncons1'
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
                                            {rank.icon1 ? (
                                                <FontAwesomeIcon
                                                    icon={iconsMap1[rank.icon1.toLowerCase()].icon}
                                                    style={{
                                                        transform: 'rotate(0deg)',
                                                        fontSize: '15px',
                                                        color: iconsMap1[rank.icon1.toLowerCase()].color,
                                                    }}
                                                />
                                            ) : (
                                                <span>No Icon Available</span>
                                            )}
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
                                            {t(rank.reward)}
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
                                            background: rank.progressbar,
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
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {rank.pointNumbers}
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
                                            {t('Elite')}
                                        </Typography>
                                        <EmojiEventsIcon sx={{ color: rank.coinsColor, fontSize: '17px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>












        </div >
    )
}

export default RankRspoDesign