import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import DrawIcon from '@mui/icons-material/Draw';
import i18n from 'i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Consultingmenu from '../Consultingmenu'

function Consultingcat() {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });


    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1400px)');
    const isScreenUnder900px = useMediaQuery('(max-width:900px)');
    const isScreenUnder1920px = useMediaQuery('(max-width:1920px)');


    return (

<div>
    {isScreenUnder400px ? (
        <div 
            style={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'space-between',
                width: '390%',
                maxWidth : '400px',
                position: 'relative',
                right: currentLanguage === 'ar' ? '-10px' : '276px',
            }}
        >
            <div className="div">
                <Button
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
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        height: '50px',
                        borderRadius: '25px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            border: 'none',
                            backgroundColor: 'none',
                        },
                    }}
                    onClick={() => console.log('Button clicked')}
                >
                    <PsychologyIcon sx={{ color: 'white' }} />
                    <span
                        style={{
                            fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Consulting')}
                    </span>
                </Button>
                <div
                    className="Underline"
                    style={{
                        width: currentLanguage === 'ar' ? '80px' : '80px',
                        marginLeft: '13px',
                        height: '3px',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '38px' : '-20px',
                        marginTop: '3px',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    }}
                />
            </div>
            <div className="div" style={{ marginTop: '-15px', cursor: 'pointer' }}>
                <Consultingmenu />
            </div>
        </div>
    ) : isScreenUnder450px ? (
        <div
            style={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'space-between',
                width: '420px',
                position: 'relative',
                right: currentLanguage === 'ar' ? '1px' : '260px',
            }}
        >
            <div className="div">
                <Button
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
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        height: '50px',
                        borderRadius: '25px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            border: 'none',
                            backgroundColor: 'none',
                        },
                    }}
                    onClick={() => console.log('Button clicked')}
                >
                    <PsychologyIcon sx={{ color: 'white' }} />
                    <span
                        style={{
                            fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Consulting')}
                    </span>
                </Button>
                <div
                    className="Underline"
                    style={{
                        width: currentLanguage === 'ar' ? '90px' : '120px',
                        marginLeft: '13px',
                        height: '3px',
                        marginRight: currentLanguage === 'ar' ? '30px' : 'undefined',
                        marginTop: '3px',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    }}
                />
            </div>
            <div className="div" style={{ marginTop: '-15px' }}>
                <Consultingmenu />
            </div>
        </div>
    ) : isScreenUnder768px ? (
        <div
            style={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'space-between',
                width: '150%',
                position: 'relative',
                right: currentLanguage === 'ar' ? '-10px' : '250px',
            }}
        >
            <div className="div">
                <Button
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
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        height: '50px',
                        borderRadius: '25px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            border: 'none',
                            backgroundColor: 'none',
                        },
                    }}
                    onClick={() => console.log('Button clicked')}
                >
                    <PsychologyIcon sx={{ color: 'white' }} />
                    <span
                        style={{
                            fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Consulting')}
                    </span>
                </Button>
                <div
                    className="Underline"
                    style={{
                        width: currentLanguage === 'ar' ? '80px' : '120px',
                        marginLeft: '13px',
                        height: '3px',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '38px' : 'undefined',
                        marginTop: '3px',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    }}
                />
            </div>
            <div className="div" style={{ marginTop: '-15px', cursor: 'pointer' }}>
                <Consultingmenu />
            </div>
        </div>
    ) : isScreenUnder1200px ? (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '150%',
                maxWidth: '1024px',
                margin: '0 auto',
                padding: '0 10px',
                position: 'relative',
                right: currentLanguage === 'ar' ? '-18px' : '270px',
            }}
        >
            <div className="button-container">
                <Button
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
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        height: '50px',
                        borderRadius: '25px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            border: 'none',
                            backgroundColor: 'none',
                        },
                    }}
                    onClick={() => console.log('Button clicked')}
                >
                    <PsychologyIcon sx={{ color: 'white' }} />
                    <span
                        style={{
                            fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Consulting')}
                    </span>
                </Button>
                <div
                    className="Underline"
                    style={{
                        width: currentLanguage === 'ar' ? '100px' : '120px',
                        height: '3px',
                        marginTop: '3px',
                        marginLeft: '12px',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '25px' : 'undefined',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    }}
                />
            </div>
            <div className="menu-container" style={{ marginTop: '-15px' }}>
                <Consultingmenu />
            </div>
        </div>
    ) : isScreenUnder1440px ? (
        <div
            style={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '1440px',
                position: 'relative',
                left: '5px',
                right: currentLanguage === 'ar' ? '250px' : 'undefined',
            }}
        >
            <div className="div">
                <Button
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
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        height: '50px',
                        borderRadius: '25px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            border: 'none',
                            backgroundColor: 'none',
                        },
                    }}
                    onClick={() => console.log('Button clicked')}
                >
                    <PsychologyIcon sx={{ color: 'white' }} />
                    <span
                        style={{
                            fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Consulting')}
                    </span>
                </Button>
                <div
                    className="Underline"
                    style={{
                        width: currentLanguage === 'ar' ? '85px' : '130px',
                        marginLeft: '13px',
                        height: '3px',
                        marginTop: '3px',
                        marginRight: currentLanguage === 'ar' ? '33px' : 'undefined',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    }}
                />
            </div>
            <div className="div" style={{ marginTop: '-15px' }}>
                <Consultingmenu/>
            </div>
        </div>
    ) : (
        <div
            style={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'space-between',
                width: '95%',
                maxWidth: '1500px',
                position: 'relative',
                left: '10px',
                right: currentLanguage === 'ar' ? '310px' : 'undefined',
            }}
        >
            <div className="div">
                <Button
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
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        height: '50px',
                        borderRadius: '25px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            border: 'none',
                            backgroundColor: 'none',
                        },
                    }}
                    onClick={() => console.log('Button clicked')}
                >
                    <PsychologyIcon sx={{ color: 'white' }} />
                    <span
                        style={{
                            fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >
                        {t('Consulting')}
                    </span>
                </Button>
                <div
                    className="Underline"
                    style={{
                        width: '90px',
                        marginLeft: '13px',
                        height: '3px',
                        marginTop: '3px',
                        marginRight: currentLanguage === 'ar' ? '33px' : 'undefined',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    }}
                />
            </div>
            <div className="div" style={{ marginTop: '-15px' }}>
                <Consultingmenu />
            </div>
        </div>
    )}
</div>

    )
}

export default Consultingcat
