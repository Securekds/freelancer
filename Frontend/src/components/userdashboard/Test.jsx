import { Box, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

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


function CardSelect() {
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
    const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');


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
    const [selectedImage, setSelectedImage] = useState('https://res.cloudinary.com/damicjacf/image/upload/v1722793929/dahabiya-removebg-preview_qmce2d.png');
    const handleMenuItemClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        handleClose2();
    };

    return (
        <div style={{ color: 'white', position: 'relative', }} >
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick2}
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <Box
                    sx={{
                        
                       
                    }}
                >
                    <Typography
                        sx={{
                            cursor: 'pointer',
                            marginRight: isSmallScreen && currentLanguage === 'ar' ? '-17px' :
                            isLargeScreen? '-15px' :
                                currentLanguage === 'ar' ? '-25px' : 'unset',
                            textWrap: 'nowrap',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            color: 'white',
                            textTransform: 'initial'
                        }}
                    >
                        {t('Card Type')}
                    </Typography>
                </Box>
                <img className='Type'
                    src={selectedImage}
                    style={{
                        margin: 0,  // Ensure no margin
                        padding: 0, // Ensure no padding
                        cursor: 'pointer',
                        marginLeft: 'auto',
                    }}
                    width={40}
                    alt="logo"
                />
            </Button>

            <Menu className=''
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

                    direction: currentLanguage === 'ar' ? 'rtl' : 'undefined',
                    width: isSmallScreen ? '70%' : '17%',
                    height: '350px',
                    marginTop: isSmallScreen && currentLanguage === 'ar' ? '-1px' : currentLanguage === 'ar' ? '5px' : '0px',
                    marginLeft: isSmallScreen && currentLanguage === 'ar' ? '200px' :
                        isSmallScreen ? '-42px' :
                            '-187px',
                    marginRight: isSmallScreen && currentLanguage === 'ar' ? '195px' : currentLanguage === 'ar' ? '1120px' : 'unset',

                 

                    '& .MuiPaper-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(50px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        color: 'rgba(255, 255, 255, 1)',
                        border: '1px solid white',
                        borderRadius: '16px',
                    },
                    '& .MuiMenuItem-root': {
                        bgcolor: 'transparent',
                    },
                    '& .MuiMenuItem-root:hover': {
                        transform: 'scale(1.05)', // Slight zoom effect
                        bgcolor: 'transparent',
                    },


                }}
            >
                <MenuItem
                    onClick={() => handleMenuItemClick('https://res.cloudinary.com/damicjacf/image/upload/v1722793929/dahabiya-removebg-preview_qmce2d.png')}
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
                            gap: '10px',
                            flexDirection: currentLanguage === 'ar' ? 'row-reverse' : 'row'
                        }}
                    >
                        <img width={40} src='https://res.cloudinary.com/damicjacf/image/upload/v1722793929/dahabiya-removebg-preview_qmce2d.png'
                            sx={{
                                margin: currentLanguage === 'ar' ? '0 0 0 5px' : '0 5px 0 0',
                                marginRight: '10px'
                            }}
                        />
                        {t('Dahabiya Card')}
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick('https://res.cloudinary.com/damicjacf/image/upload/v1722966543/VISA-logo_leqrqs.png')}
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
                            gap: '10px',
                            flexDirection: currentLanguage === 'ar' ? 'row-reverse' : 'row'
                        }}
                    >
                        <img width={40} src='https://res.cloudinary.com/damicjacf/image/upload/v1722966543/VISA-logo_leqrqs.png'
                            sx={{
                                margin: currentLanguage === 'ar' ? '0 0 0 5px' : '0 5px 0 0',
                                marginRight: '10px'
                            }}
                        />
                        {t('Visa Card')}
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick('https://res.cloudinary.com/damicjacf/image/upload/v1722793005/Mastercard-removebg-preview_mywejo.png')}
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
                            gap: '10px',
                            flexDirection: currentLanguage === 'ar' ? 'row-reverse' : 'row'
                        }}
                    >
                        <img width={40} src='https://res.cloudinary.com/damicjacf/image/upload/v1722793005/Mastercard-removebg-preview_mywejo.png'
                            sx={{
                                margin: currentLanguage === 'ar' ? '0 0 0 5px' : '0 5px 0 0',
                                marginRight: '10px'
                            }}
                        />
                        {t('Master Card')}
                    </Box>
                </MenuItem>

            </Menu>
        </div>
    )
}

export default CardSelect