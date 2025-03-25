import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import i18n from 'i18next';
import OfferButton from "./OfferButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';







const ResponsiveOffers = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
    const isLargeScreen = useMediaQuery('(min-width:960px)');

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

    const getWidth = () => {
        if (isSmallScreen) return '105%';
        if (isMediumScreen) return '100%';
        if (isLargeScreen) return '100%';
        return '90%';
    };



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


    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 'auto',
                        marginTop: '70px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        padding: '5px',
                        width: getWidth(),
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'width 0.3s ease-in-out',
                    }}
                >
                    <Box
                        sx={{
                            fontSize: '16px',
                            color: 'white',
                            fontWeight: 'bold',
                            marginLeft: '10px',
                            padding: currentLanguage === 'ar' ? '10px' : 'undefinied',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Offers Made')}
                    </Box>
                    <Box
                        sx={{
                            padding: '5px 10px',
                            fontSize: '14px',
                            display: 'flex',
                            position: 'relative',


                        }}
                    >
                        <div
                            style={{
                                marginLeft: currentLanguage === 'ar' ? '2px' : 'undefinied',
                                marginTop: '5px',
                            }}
                        >
                            <OfferButton />
                        </div>
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick1}
                        >
                            <SettingsSuggestIcon sx={{
                                color: 'white',
                                marginLeft: currentLanguage === 'ar' ? '-5px' : '15px',
                                
                                cursor: 'pointer',
                                marginTop: '4px',
                            }} />
                        </Button>
                    








                    </Box>
                </Box>
                <Box className='meteors-demo-container'
                    sx={{
                        width: getWidth(),
                        background: 'rgba(0, 0, 0, 0.2)',
                        padding: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'width 0.3s ease-in-out',
                        marginTop: '0px', // Adjust the spacing as needed
                        position: 'relative',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',


                    }}
                >
                    {/* Background Stars */}
                    <div>
                        <section className="meteors-demo-section">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </section>

                        {/* Background Image */}
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

                        {/* Profile Circle with Active Badge */}
                        <Box
                            style={{
                                position: 'absolute',
                                top: '15px', // Adjust the top position as needed
                                left: '15px', // Adjust the left position as needed
                                right: currentLanguage === 'ar' ? '15px' : 'undefinied',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {/* Active Badge */}
                            <Box
                                sx={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: '#4CAF50',
                                    position: 'absolute',
                                    top: '35px', // Adjust to position above the circle
                                    right: currentLanguage === 'ar' ? '35px' : '2px', // Adjust to position above the circle
                                    zIndex: 1,
                                    border: '2px solid white',
                                }}
                            />

                            {/* Profile Image */}
                            <div className='ProfileCircle' style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '2px solid #ccc',
                                position: 'relative',
                            }}>
                                <img src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg" alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        textAlign: 'center',
                                    }}
                                />
                            </div>
                        </Box>

                        {/* Typos and Settings Icon */}
                        <Box
                            style={{
                                position: 'absolute',
                                top: '15px', // Adjust the top position as needed
                                left: '95px', // Adjust the left position as needed, considering profile circle width + padding
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start', // Align items to start
                                width: 'calc(100% - 110px)', // Adjust width to leave space for profile circle and padding
                                padding: '0 5px', // Padding to keep content away from edges
                                boxSizing: 'border-box', // Ensure padding doesn't affect width
                            }}
                        >
                            {/* Typos */}
                            <div className='Typos' style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start', // Align items to start
                                marginTop: '5px',
                                marginLeft: '-25px',
                                marginRight: currentLanguage === 'ar' ? '50px' : 'undefinied',

                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '3px',
                                    gap: currentLanguage === 'ar' ? '8px' : 'undefinied',
                                    marginBottom: '5px', // Adjust margin as needed
                                }}>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            marginRight: '5px',
                                            fontSize: '13px',
                                            textWrap: 'nowrap',
                                        }}
                                    >
                                        {t('Nabil Hamici')}
                                    </Typography>
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
                                        {t('(Khadamat Partner)')}
                                    </Typography>
                                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon key={index} sx={{ color: '#FFD700', fontSize: '14px' }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="div" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: currentLanguage === 'ar' ? '4px' : 'undefinied',
                                    marginBottom: '5px', // Adjust margin as needed
                                }}>
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
                                    <div className="Line" style={{
                                        width: '1.4px',
                                        height: '15px',
                                        background: 'white',
                                        marginLeft: '6px',
                                        position: 'relative',
                                        right: currentLanguage === 'ar' ? '2px' : 'undefined',
                                    }}></div>
                                    <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '5px' }} />
                                    <Typography sx={{
                                        color: 'white',
                                        marginLeft: '3px',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        marginLeft: '5px',
                                    }}>
                                        {t('React Developer')}
                                    </Typography>
                                </div>
                            </div>

                            {/* Settings Icon */}
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick2}
                            >
                                <SettingsSuggestIcon sx={{
                                    color: 'white',
                                    marginLeft: 'auto',
                                    marginRight: currentLanguage === 'ar' ? '883px' : '-773px',
                                    marginTop: '-90px'
                                }} />
                            </Button>
                            <Menu   
                                id="fade-menu2"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                                TransitionComponent={Fade}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right', // Corrected spelling from 'rihgt'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    marginLeft: currentLanguage === 'ar' ? '-920px' : '660px',
                                    direction: currentLanguage === 'ar' ? 'rtl' : 'undefined',

                                    marginTop: '-30px',
                                }}
                            >
                                <MenuItem
                                    onClick={handleClose2}
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: currentLanguage === 'ar' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: currentLanguage === 'ar' ? 'row-reverse' : 'row'
                                        }}
                                    >
                                        <ReportProblemIcon
                                            sx={{
                                                margin: currentLanguage === 'ar' ? '0 0 0 5px' : '0 5px 0 0'
                                            }}
                                        />
                                        {t('Report')}
                                    </Box>
                                </MenuItem>

                            </Menu>

                            <div
                                style={{
                                    position: 'absolute',
                                    left: '-80px',
                                    top: '60px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#64748B',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',

                                    }}
                                >
                                    {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                </Typography>


                            </div>
                        </Box>
                    </div>
                </Box>












            </Box>

        </>

    );
};

export default ResponsiveOffers;
