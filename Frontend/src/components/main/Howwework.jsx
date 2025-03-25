import React from 'react'
import { Typography } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMediaQuery from '@mui/material/useMediaQuery';



function Howwework() {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        // Retrieve language from localStorage on component mount
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en'; // Default language is 'en' if no language is stored
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language); // Store selected language in localStorage
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch(error => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]); // Update  

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');

    return (
        <div className='Container'
            style={{
                width: '100%',
                minHeight: '115vh',
                background: 'white',
                marginTop: '-404px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '50px',
                overflow: 'hidden',
            }}
        >
            <div className='AllElements' style={{ textAlign: 'center' }}>
                <Typography sx={{
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                    textTransform: 'uppercase',
                    fontSize: '20px',
                }}>
                    <span style={{
                        backgroundImage: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                        backgroundClip: 'text',
                        fontWeight: '700',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {t('How do you work at khadamat platform')}
                    </span>
                </Typography>
                <Typography sx={{
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    textTransform: 'uppercase',
                    fontSize: '27px',
                    background: '#2d2d2d',
                    textAlign: 'center',
                    WebkitBackgroundClip: 'text',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontWeight: '700',
                    WebkitTextFillColor: 'transparent',
                }}>
                    {t('SELLER ≠ BUYER')}
                </Typography>
                <div className='Line1'
                    style={{
                        width: '150px',
                        height: '4px',
                        marginTop: '35px !important',
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                        margin: 'auto',
                    }}
                ></div>
                <div style={{ width: '80%', margin: 'auto' }}  >
                    <Typography sx={{
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontSize: '20px',
                        marginTop: '15px',
                        background: '#2d2d2d',
                        color: '#2d2d2d',
                        WebkitBackgroundClip: 'text',
                        fontWeight: '700',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        lineHeight: '2',
                        marginTop: '30px'
                    }}>
                        {t('Experience the freedom to sell your services on your terms, with our platform providing the tools and support you need to thrive.')}
                    </Typography>
                </div  >

                <div className='FirstTwo ' style={{
                    display: isScreenUnder450px ? 'block' : 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '55px',


                }}  >
                    <div className='Box1' style={{
                        height: isScreenUnder450px ? '90px' : '120px',
                        width: isScreenUnder450px ? (currentLanguage === 'fr' ? '93%' : '90%') : '40%',
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)',
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)',
                        borderRadius: '12px',
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: isScreenUnder450px ? 'auto' : '0',



                    }} >


                        <div className="icon1 " style={{
                            height: isScreenUnder450px ? '55px' : '42%',
                            width: isScreenUnder450px ? '55px' : '52px',
                            borderRadius: '10px',
                            backgroundColor: '#fae8fb',
                            position: 'absolute',

                            left: isScreenUnder450px ? '10px' : '30px',
                            right: currentLanguage === 'ar' ? '25px' : 'undifined',
                        }}>
                            <AccountBoxIcon sx={{
                                color: '#9E16F5',
                                display: 'flex',
                                fontSize: '30px',
                                position: 'absolute',
                                left: '50%', // Move the icon to the horizontal center
                                top: '50%', // Move the icon to the vertical center
                                transform: 'translate(-50%, -50%)',



                            }} />
                        </div>
                        <div className="Type1 " style={{
                            position: 'absolute',
                            right: currentLanguage === 'ar' ? '95px' : '35px',
                            width: '370px', // Set a fixed width for the container
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            left: isScreenUnder450px ? '75px' : 'undifined',
                            display: 'flex',
                            position: 'absolute',
                            flexWrap: 'wrap', // Allow wrapping of text
                        }}>
                            {currentLanguage === 'fr' && !isScreenUnder450px ? (
                                <Typography className='' sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '19px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: currentLanguage === 'ar' ? '25px' : '25px',
                                }}>
                                    {t('Step one Starting by creating')}
                                    <span className='' style={{
                                        marginLeft: '-240px',
                                        display: 'block',
                                    }}>
                                        {t('a account')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'fr' && isScreenUnder450px ? (
                                <Typography className='' sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: currentLanguage === 'ar' ? '25px' : '25px',
                                }}>
                                    {t('Step one Starting')}
                                    <span className='' style={{
                                        marginLeft: '-60px',
                                        display: 'block',
                                    }}>
                                        {t('by creating a account')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'ar' && isScreenUnder450px ? (
                                <Typography className='' sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                }}>
                                    {t('Step one Starting by creating a')}
                                    <span className='' style={{
                                        marginRight: '-142px',
                                        display: 'block',
                                    }}>
                                        {t('account')}
                                    </span>
                                </Typography>
                            ) : (
                                <Typography className='' sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: isScreenUnder450px ? '17px' : '19px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: currentLanguage === 'ar' ? '25px' : '22px',
                                }}>
                                    {t('Step one Starting by creating a')}
                                    <span className='' style={{
                                        marginRight: isScreenUnder450px ? '188px' : (currentLanguage === 'ar' ? '-165px' : '213px'),
                                        display: 'block',
                                    }}>
                                        {t('account')}
                                    </span>
                                </Typography>
                            )}
                        </div>

                    </div>
                    <div className='Box2' style={{
                        height: isScreenUnder450px ? '90px' : '120px',
                        width: isScreenUnder450px ? (currentLanguage === 'fr' ? '93%' : '90%') : '40%',
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)',
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)',
                        borderRadius: '12px',
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: isScreenUnder450px ? 'auto' : '0',
                        marginTop: isScreenUnder450px ? '10px' : 'undifined',

                    }} >
                        <div className="icon2 " style={{
                            height: isScreenUnder450px ? '55px' : '42%',
                            width: isScreenUnder450px ? '55px' : '52px',
                            borderRadius: '10px',
                            backgroundColor: '#ffe4c3',
                            position: 'absolute',
                            left: isScreenUnder450px ? '10px' : '30px',
                            right: currentLanguage === 'ar' ? '25px' : 'undifined',
                        }}>
                            <FingerprintIcon sx={{
                                color: '#FF8F05',
                                display: 'flex',
                                fontSize: '30px',
                                position: 'absolute',
                                left: '50%', // Move the icon to the horizontal center
                                top: '50%', // Move the icon to the vertical center
                                transform: 'translate(-50%, -50%)',

                            }} />
                        </div>
                        <div className="Type2 " style={{
                            position: 'absolute',
                            right: currentLanguage === 'ar' ? '90px' :
                                currentLanguage === 'fr' && !isScreenUnder450px ? '-38px' :
                                    currentLanguage === 'fr' && isScreenUnder450px ? '-152px' :
                                        currentLanguage === 'en' && isScreenUnder450px ? '-165px' :
                                            '-45px',
                            width: '450px', // Set a fixed width or the container
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'flex',
                            flexWrap: 'wrap', // Allow wrapping of text
                        }}>
                            {currentLanguage === 'fr' && !isScreenUnder450px ? (
                                <Typography className='' sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontSize: '19px',
                                    width: '400Px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                }}>
                                    {t('Étape deux Vérifiez votre identité Sécurité ')}
                                    <span style={{
                                        display: 'block',
                                        marginRight: '-6px',
                                    }}>
                                        {t('et confiance au sein de notre communauté')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'fr' && isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                    position: 'relative',
                                    left: '1.5px',
                                }}>
                                    {t('Étape deux Vérifiez votre identité ')}
                                    <span
                                        style={{
                                            display: 'block',
                                            marginRight: '16px',
                                        }}
                                    >
                                        {t('pour la sécurité et la confiance')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'ar' ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Droid Arabic Kufi", serif',
                                    fontSize: isScreenUnder450px ? '17px' : '19px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '29px',
                                }}>
                                    {t('Step two Verify your identity')}
                                    <span style={{ marginLeft: '2px', display: 'block' }}>
                                        {t('ensuring Security and trust within our community')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'en' && isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '22px',
                                    marginRight: '90px'
                                }}>
                                    {t('Step two Verify your identity')}
                                    <span style={{
                                        marginLeft: '-5px',
                                        display: 'block',
                                    }}>
                                        {t('ensuring Security and trust')}
                                    </span>

                                </Typography>
                            ) : (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontSize: '19px',
                                    WebkitTextFillColor: 'transparent',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '550',
                                    lineHeight: '23px'
                                }} >
                                    {t('Step two Verify your identity')}
                                    <span
                                        style={{
                                            display: 'block',
                                            marginRight: '8px',
                                        }}
                                    >{t('ensuring Security and trust ')}</span>

                                </Typography>
                            )}
                        </div>
                    </div>
                </div>
                <div className="SecondTwo" style={{
                    display: isScreenUnder450px ? 'block' : 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '20px',

                }} >
                    <div className='Box1' style={{
                        height: isScreenUnder450px ? '90px' : '120px',
                        width: isScreenUnder450px ? (currentLanguage === 'fr' ? '93%' : '90%') : '40%',
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)',
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)',
                        borderRadius: '12px',
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: isScreenUnder450px ? 'auto' : '0',
                        marginTop: isScreenUnder450px ? '-10px' : 'undifined',


                    }} >


                        <div className="icon1 " style={{
                            height: isScreenUnder450px ? '55px' : '42%',
                            width: isScreenUnder450px ? '55px' : '52px',
                            borderRadius: '10px',
                            backgroundColor: '#eefaf4',
                            position: 'absolute',
                            left: isScreenUnder450px ? ' 10px' : '30px',
                            right: currentLanguage === 'ar' ? '25px' : 'undifined',

                        }}>
                            <AltRouteIcon sx={{
                                color: '#4EBA88',
                                display: 'flex',
                                fontSize: '30px',
                                position: 'absolute',
                                left: '50%', // Move the icon to the horizontal center
                                top: '50%', // Move the icon to the vertical center
                                transform: 'translate(-50%, -50%)',

                            }} />
                        </div>
                        <div className="Type1  " style={{
                            position: 'absolute',
                            right: currentLanguage === 'ar' ? '92px' :
                                currentLanguage === 'fr' && isScreenUnder450px ? '2px' :
                                    currentLanguage === 'fr' ? '57px' :
                                        '40px',
                            // Set a fixed width for the container

                            display: 'flex',

                        }} >
                            {currentLanguage === 'ar' ? (
                                <>
                                    {isScreenUnder450px ? (
                                        <Typography sx={{
                                            fontSize: '17px',
                                            fontFamily: '"Droid Arabic Kufi", serif',
                                            fontWeight: '600',
                                            background: '#2d2d2d',
                                            WebkitTextFillColor: 'transparent',
                                            WebkitBackgroundClip: 'text',
                                        }} className=''>
                                            {t('Step three Choose your')}
                                            <span style={{ display: 'block', marginLeft: '62px' }}>
                                                {t('path as either a seller or buyer')}
                                            </span>
                                        </Typography>
                                    ) : (
                                        <Typography className='' sx={{
                                            whiteSpace: 'wrap',
                                            fontFamily: '"Droid Arabic Kufi", serif',
                                            fontSize: '19px',
                                            background: '#2d2d2d',
                                            WebkitBackgroundClip: 'text',
                                            fontWeight: '600',
                                            WebkitTextFillColor: 'transparent',
                                            lineHeight: '25px',
                                            display: 'block',
                                        }}>
                                            {t('Step three Choose your path')}
                                            <span style={{ display: 'block', marginLeft: '130px' }}>
                                                {t('as either a seller')}
                                            </span>
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    {currentLanguage === 'fr' ? (
                                        <>
                                            {currentLanguage === 'fr' && isScreenUnder450px ? (
                                                <Typography className='FRLANG' sx={{
                                                    whiteSpace: 'wrap',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontSize: '17px',
                                                    background: '#2d2d2d',
                                                    zIndex: '40',
                                                    WebkitBackgroundClip: 'text',
                                                    fontWeight: '600',
                                                    WebkitTextFillColor: 'transparent',
                                                    lineHeight: '23px',
                                                    position: 'relative',
                                                    right: '8px',
                                                }}>
                                                    Troisième étape Choisissez votre
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            marginLeft: '17px'

                                                        }}
                                                    >chemin un vendeur ou un acheteur</span>
                                                </Typography>
                                            ) : (
                                                <Typography className='FRLANG' sx={{
                                                    whiteSpace: 'wrap',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontSize: '19px',
                                                    background: '#2d2d2d',
                                                    zIndex: '40',
                                                    WebkitBackgroundClip: 'text',
                                                    fontWeight: '600',
                                                    WebkitTextFillColor: 'transparent',
                                                    lineHeight: '25px',
                                                    position: 'relative',
                                                    left: '1.5px',
                                                }}>
                                                    Troisième étape Choisissez votre voie
                                                    <span style={{ display: 'block', marginLeft: '-45px' }}>
                                                        en tant que vendeur ou acheteur
                                                    </span>
                                                </Typography>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {currentLanguage === 'en' && isScreenUnder450px && (
                                                <Typography className='ENUP' sx={{
                                                    whiteSpace: 'wrap',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontSize: '17px',
                                                    background: '#2d2d2d',
                                                    WebkitBackgroundClip: 'text',
                                                    fontWeight: '600',
                                                    WebkitTextFillColor: 'transparent',
                                                    lineHeight: '23px',
                                                    position: 'relative',
                                                    right: '8px',
                                                }}>
                                                    Step three Choose your path
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            marginRight: '25px',
                                                        }}
                                                    >as either a seller or buyer</span>
                                                </Typography>
                                            )}
                                            {currentLanguage === 'en' && !isScreenUnder450px && (
                                                <Typography className='EN450' sx={{
                                                    whiteSpace: 'wrap',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontSize: '19px',
                                                    background: '#2d2d2d',
                                                    WebkitBackgroundClip: 'text',
                                                    fontWeight: '600',
                                                    WebkitTextFillColor: 'transparent',
                                                    lineHeight: '23px',
                                                    position: 'relative',
                                                    right: '15px', // Or adjust as needed
                                                }}>
                                                    Step three Choose your path as either
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            marginRight: '198px',
                                                        }}
                                                    > a seller or buyer</span>
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                    </div>
                    <div className='Box2' style={{

                        height: isScreenUnder450px ? '90px' : '120px',
                        right: currentLanguage === 'ar' ? (isScreenUnder450px ? '20px' : 'undifined') : 'undifined',
                        background: 'white',
                        width: isScreenUnder450px ? (currentLanguage === 'fr' ? '93%' : '90%') : '40%',
                        border: '1px solid rgba(249,38,225,.2)',
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)',
                        borderRadius: '12px',
                        display: 'flex',
                        position: 'relative',
                        left: isScreenUnder450px ? '12px' : 'undifined',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: isScreenUnder450px ? '11px' : 'undefined',



                    }} >
                        <div className="icon2" style={{
                            height: isScreenUnder450px ? '55px' : '42%',
                            width: isScreenUnder450px ? '55px' : '52px',
                            borderRadius: '10px',
                            backgroundColor: '#e8fafe',
                            position: 'absolute',
                            left: isScreenUnder450px ? ' 10px' : '30px',
                            right: currentLanguage === 'ar' ? '25px' : 'undifined',
                        }}>
                            <AdminPanelSettingsIcon sx={{
                                color: '#34A6FC',
                                display: 'flex',
                                fontSize: '34px',
                                position: 'absolute',
                                left: '50%', // Move the icon to the horizontal center
                                top: '50%', // Move the icon to the vertical center
                                transform: 'translate(-50%, -50%)',

                            }} />
                        </div>
                        <div className="Type2" style={{
                            position: 'absolute',
                            right: currentLanguage === 'ar' ? (isScreenUnder450px ? '81px' : '90px') :
                                currentLanguage === 'fr' && isScreenUnder450px ? '-95px' :
                                    currentLanguage === 'fr' ? '8px' :
                                        currentLanguage === 'en' && isScreenUnder450px ? '-42px' : '68px',
                            width: '400px', // Set a fixed width for the container

                            display: 'flex',
                            flexWrap: 'wrap', // Allow wrapping of text
                        }} >
                            {currentLanguage === 'ar' && !isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Droid Arabic Kufi", serif',
                                    fontSize: '19px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '27px',
                                }}>
                                    {t('Step four With excitement and anticipation')}
                                    <span style={{ display: 'block', marginLeft: '124px' }}>
                                        {t('go into action')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'ar' && isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                    display: 'grid',
                                    position: 'relative',
                                    right: currentLanguage === 'en' ? '18px' : '10px',
                                }}>
                                    {t('Step four With excitement and anticipation')}
                                    <span
                                        style={{ marginLeft: '110px' }}>
                                        {t('go into action')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'en' && isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: isScreenUnder450px ? '17px' : '19px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                    display: 'grid',
                                    position: 'relative',
                                    right: currentLanguage === 'en' ? '18px' : '10px',
                                }}>
                                    {t('Step four With excitement and')}
                                    <span style={{ marginRight: currentLanguage === 'en' ? '32px' : '10px', width: '400px' }}>
                                        {t('anticipation go into action')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'en' && !isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: isScreenUnder450px ? '17px' : '19px',
                                    background: '#2d2d2d',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                    display: 'grid',
                                    position: 'relative',
                                    right: currentLanguage === 'en' ? '18px' : '10px',
                                }}>
                                    {t('Step four With excitement and')}
                                    <span style={{ marginRight: currentLanguage === 'en' ? '32px' : '10px', width: '400px' }}>
                                        {t('anticipation go into action')}
                                    </span>
                                </Typography>
                            ) : currentLanguage === 'fr' && !isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontSize: '19px',
                                    background: '#2d2d2d',
                                    zIndex: '40',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                    position: 'relative',
                                    left: '1.5px',
                                }}>
                                    Quatrième étape Avec enthousiasme et
                                    <span
                                        style={{
                                            display: 'block',
                                            marginLeft: '-5px',
                                        }}
                                    >anticipation lancez-vous dans l’action</span>
                                </Typography>
                            ) : currentLanguage === 'fr' && isScreenUnder450px ? (
                                <Typography sx={{
                                    whiteSpace: 'wrap',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    background: '#2d2d2d',
                                    zIndex: '40',
                                    WebkitBackgroundClip: 'text',
                                    fontWeight: '600',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: '25px',
                                    position: 'relative',
                                    left: '1.5px',
                                }}>
                                    Quatrième étape Avec enthousiasme
                                    <span
                                        style={{
                                            display: 'block',
                                            marginLeft: '-40px',
                                        }}
                                    >et anticipation passer à l'action</span>
                                </Typography>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className='BTN1 ' >
                    <Button className='Signin1'
                        sx={{
                            color: 'white',
                            marginTop: '35px',
                            marginBottom: isScreenUnder450px ? '18px' : 'undifined',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            borderRadius: '10px', // Adjust border radius as needed
                            textTransform: 'none',
                            fontSize: '18px',
                            width: '230px',
                            fontWeight: '600',
                            background: 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)',
                            position: 'relative', // Set position to relative
                            overflow: 'hidden', // Hide overflow to contain pseudo-elements
                            height: '50px',
                            border: 'none', // Remove default border

                        }}
                    >
                        {t('Start Now')}
                        {currentLanguage === 'ar' ? (
                            <ArrowForwardIcon sx={{ margin : '5px'  , transform: 'scaleX(-1)' }} />
                        ) : (
                            <ArrowForwardIcon sx={{ marginLeft: '15px' }} />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Howwework