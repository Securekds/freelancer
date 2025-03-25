import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';


import CopyButton from "./CopyButton";

const ResponsiveSkills = () => {
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

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 'auto',
                        background: 'rgba(0, 0, 0, 0.2)',
                        marginTop: '70px',
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
                            marginLeft : '10px',
                            padding : currentLanguage === 'ar'? '10Px' : 'undefinied',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Required Skills')}
                    </Box>
                    <Box
                        sx={{
                            padding: '5px 10px',
                            fontSize: '14px',
                        }}
                    >
                        <CopyButton />
                    </Box>
                </Box>

                <Box className='meteors-demo-container'
                    sx={{
                        width: getWidth(),
                        height: 'auto',
                        background: 'rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'width 0.3s ease-in-out',
                        marginTop: '0px', // Adding some space between the boxes
                        position: 'relative', // Ensure the container is positioned relatively
                        display: 'flex',
                        flexDirection: 'column', // Align items in a column
                        alignItems: 'center', // Center horizontally
                        textAlign: 'center', // Center text content
                    }}
                >
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

                    <div style={{ display: 'flex',
                     flexWrap: 'wrap', }}>
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
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                        <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Small
                        </Button>
                    </div>
                </Box>








            </Box>

        </>

    );
};

export default ResponsiveSkills;
