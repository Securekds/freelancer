import { Typography, tabClasses } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';



function Typetext() {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });



    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    return (
        <div>
            {isScreenUnder450px ? (
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            position: 'relative',
                            textAlign: 'center',
                            marginTop: currentLanguage === 'ar' ? '20px' : '20px',
                            padding: '10px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'grey',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                position: 'relative',
                                top: '30px',

                            }}
                        >
                            {t('Discovering the brightest talents with our services')}
                        </Typography>
                    </div>
                    <div className="div" style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1
                            style={{
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                fontSize: '20px',
                                width: '100%',
                                color: 'white',
                                textAlign: 'left',
                                position: 'relative',
                                textAlign: 'center',
                            }}
                        >
                            {t('Unveiling top-notch projects and skilled')}
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'block',
                                    height: '100px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    marginTop: '15px',

                                }}
                            >
                                {t('freelancers With [Khadamat].')}
                            </span>
                        </h1>
                    </div>
                </div>
            ) : isScreenUnder768px ? (
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            position: 'relative',
                            textAlign: 'center',
                            marginTop: '70px',

                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'grey',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                position: 'relative',
                                fontSize: '25px',
                                position: 'relative',
                                top: '30px',


                            }}
                        >
                            {t('Discovering the brightest talents with our services')}
                        </Typography>
                    </div>
                    <div className="div" style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1
                            style={{
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                fontSize: '30px',
                                width: '100%',
                                color: 'white',
                                textAlign: 'left',
                                position: 'relative',
                                textAlign: 'center',
                            }}
                        >
                            {t('Unveiling top-notch projects and skilled')}
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'block',
                                    height: '100px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    marginTop: '15px',

                                }}
                            >
                                {t('freelancers With [Khadamat].')}
                            </span>
                        </h1>
                    </div>
                </div>
            ) : isScreenUnder1200px ? (
                <div className='' style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            position: 'relative',
                            textAlign: 'center',
                            marginTop: '70px',

                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'grey',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                position: 'relative',
                                fontSize: '25px',
                                position: 'relative',
                                top: '30px',


                            }}
                        >
                            {t('Discovering the brightest talents with our services')}
                        </Typography>
                    </div>
                    <div className="div" style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h1
                            style={{
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                fontSize: '30px',
                                width: '100%',
                                color: 'white',
                                textAlign: 'left',
                                position: 'relative',
                                textAlign: 'center',
                            }}
                        >
                            {t('Unveiling top-notch projects and skilled')}
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'block',
                                    height: '100px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    marginTop: '15px',

                                }}
                            >
                                {t('freelancers With [Khadamat].')}
                            </span>
                        </h1>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            position: 'relative',
                            textAlign: 'center',
                            marginTop: '70px',
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '240px' : 'undifined',

                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'grey',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                position: 'relative',
                                fontSize: '25px',
                                top: '30px',
                                right: currentLanguage === 'ar' ? '10px' : 'undifined',


                            }}
                        >
                            {t('Discovering the brightest talents with our services')}
                        </Typography>
                    </div>
                    <div className='effect' style={{
                        textAlign: 'center',
                        marginTop: '50px',
                        marginRight: currentLanguage === 'ar' ? '470px' : 'undifined',
                    }}>
                        <h1
                            style={{
                                fontFamily: currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',
                                fontSize: '30px',
                                width: '100%',
                                color: 'white',
                                textAlign: 'center',
                                direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
                                paddingRight: currentLanguage === 'ar' ? '20px' : '0',
                            }}
                        >
                            {t('Unveiling top-notch projects and skilled')}
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'block',
                                    height: '100px',
                                    textAlign: 'center',
                                    marginTop: '15px',
                                }}
                            >
                                {t('freelancers With [Khadamat].')}
                            </span>
                        </h1>
                    </div>

                </div>
            )}

        </div>
    )
}

export default Typetext
