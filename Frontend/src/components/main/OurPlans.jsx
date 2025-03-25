import React from 'react'
import { Typography, Box } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

function OurPlans({handlePlanSelection}) {

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
    const [selectedMonth, setSelectedMonth] = useState(0);

    const handleMonthClick = (index) => {
        setSelectedMonth(index);
    };
    return (
        <div className='Container'
            style={{

                width: '100%',
                minHeight: isScreenUnder450px ? '370vh' : '240vh',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',

            }}
        >

            <Typography sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                textTransform: 'uppercase',
                fontSize: '20px',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                backgroundClip: 'text',
                fontWeight: '700',
                WebkitTextFillColor: 'transparent',

            }}>
                <span style={{
                    backgroundImage: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    backgroundClip: 'text',
                    fontWeight: '700',
                    WebkitTextFillColor: 'transparent',
                }}>
                    {t('Empower Your Journey to Success')}
                </span>
            </Typography>


            <div className='Line1'
                style={{
                    width: '250px',
                    height: '4px',

                    background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    margin: '20px auto',
                }}
            ></div>
            <div className="BorderContainer"
                style={{
                    width: '95%',
                    minHeight: isScreenUnder450px ? '293vh' : '130vh',
                    background: 'transparent',
                    border: '2px solid rgba(0,0,0,.05)',
                    borderRadius: '13px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div className="ContainerWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="TwoTypo" style={{ marginTop: '25px' }}>
                        <Typography
                            sx={{
                                color: '#999',
                                fontSize: '17px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                fontWeight: '500',
                                marginBottom: '10px',

                            }}
                        >
                            {t('SELECT')}
                        </Typography>
                        <Typography className='MonthsYears'
                            sx={{
                                textAlign: 'center',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '27px',
                                fontWeight: '500',
                                display: 'none',
                            }}
                        >
                            <Button className=''
                                variant="outlined"
                                sx={{
                                    color: 'black',
                                    fontSize: '17px',
                                    background: 'white',
                                    borderRadius: '15px',
                                    width: '150px',
                                    border: '1px solid #5B42F3',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                }}>

                                {t('Months')}
                            </Button>
                            {' '}
                            ≠
                            {' '}
                            <Button variant="outlined"
                                sx={{
                                    color: 'black',
                                    fontSize: '17px',
                                    background: 'white',
                                    borderRadius: '15px',
                                    width: '150px',
                                    border: '1px solid #5B42F3',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}>
                                {t('Years')}
                            </Button>
                        </Typography>
                    </div>
                    <div className="MonthsContainer" style={{
                        height: '70px',
                        width: '770px',
                        background: 'rgba(0,0,0,.03)',
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '5px',
                        borderRadius: '16px',
                        display: 'none',
                    }}>
                        {[...Array(12)].map((_, index) => (
                            <div key={index}
                                style={{
                                    textAlign: 'center',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    background: selectedMonth === index ? 'white' : 'transparent',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleMonthClick(index)}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: '20px',
                                        backgroundImage: selectedMonth === index ? 'linear-gradient(to right, #5B42F3, #00DDEB)' : 'none',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: selectedMonth === index ? 'transparent' : 'inherit',
                                        fontWeight: '700',
                                    }}
                                >
                                    {index + 1}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: '14px',
                                    }}
                                >
                                    <span style={{
                                        backgroundImage: selectedMonth === index ? 'linear-gradient(to right, #5B42F3, #00DDEB)' : 'none',
                                        backgroundClip: 'text',
                                        fontWeight: '700',
                                        WebkitTextFillColor: selectedMonth === index ? 'transparent' : 'inherit',
                                    }}>
                                        {t('Month')}
                                    </span>
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <div className='CardContainer '
                        style={{
                            display: isScreenUnder450px ? 'block' : 'flex',
                            marginTop: '35px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 0 18px 4px rgba(249,38,225,.07)',


                        }}
                    >

                        <div className="Card2"
                            style={{
                                height: isScreenUnder450px ? '640px' : '600px',
                                width: isScreenUnder450px ? '350px' : '390px',
                                background: 'rgb(14 12 21 / var(--tw-bg-opacity, 1))',
                                borderRight: '1px solid #ccc',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                position: isScreenUnder450px ? 'relative' : 'undinifed',
                                top: isScreenUnder450px ? '5px' : 'undifined',



                            }}
                        >
                            <div className='FirstText'
                                style={{
                                    position: 'relative',
                                    top: isScreenUnder450px ? '-10px' : '5px',

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',

                                        textAlign: 'center',
                                    }}
                                >
                                    <span style={{
                                        backgroundImage: 'linear-gradient(90deg,#f926e1,#2ab5fb)',
                                        backgroundClip: 'text',
                                        fontWeight: '700',
                                        WebkitTextFillColor: 'transparent',
                                    }}>
                                        {t('Freelancer Pro')}
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        marginTop: '5px',
                                        color: 'white',
                                        padding: '15px',
                                    }}
                                >
                                    {t('Start Your Freelance Journey with Freelancer Pro')}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#b1b1b1',
                                        textAlign: 'center',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        marginTop: '5px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    {t('Starting at 7 USD / First Month')}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button 
                                    onClick={() => handlePlanSelection('freelancerPro')}
                                    style={{
                                        color: 'white',
                                        background: 'linear-gradient(90deg,#f926e1,#2ab5fb)',
                                        border: 'none',
                                        borderRadius: '14px',
                                        width: '285px',
                                        fontSize: '16px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '600',
                                        height: "48px",
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                        marginTop: '20px',
                                    }}>
                                        {t('Unlock Now')}
                                    </button>

                                </div>

                            </div>
                            <div className='FutersContainer'
                                style={{
                                    marginRight: currentLanguage === 'ar' ? '45px' : 'undifined',
                                    position: 'relative',
                                    top: isScreenUnder450px ? '5px' : '20px',
                                }}
                            >
                                <div className='TOP1'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '10px',
                                        gap  : '5px',
                                    }}
                                >
                                    <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }}
                                    >
                                        {t('Request withdrawals starting from 25 USD')}
                                    </Typography>
                                </div>
                                <div className='TOP2'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                        gap : '5px',
                                    }}
                                >
                                    <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color : 'white',
                                        }}
                                    >
                                        {t('Priority listing for projects')}
                                    </Typography>
                                </div>
                                <div className='TOP3'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                        gap : '5px',
                                    }}
                                >
                                   <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color : 'white',
                                        }}
                                    >
                                        {t('Enhanced profile visibility')}
                                    </Typography>
                                </div>
                                <div className='TOP4'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                        gap : '5px',
                                    }}
                                >
                                    <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }}
                                    >
                                        {t('Advanced project insights')}
                                    </Typography>
                                </div>

                                <div className='TOP5'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                        gap : '5px',
                                    }}
                                >
                                    <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color : 'white',
                                        }}
                                    >
                                        {t('Dedicated customer support')}
                                    </Typography>
                                </div>
                                <div className='TOP6'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                        gap : '5px',
                                    }}
                                >
                                    <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color : 'white',
                                        }}
                                    >
                                        {t('Unlimited messaging with clients')}
                                    </Typography>
                                </div>
                              
                                <div className='TOP8'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                        gap : '5px',
                                    }}
                                >
                                    <svg style={{ transform: "none" }} width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="22" stroke="green" stroke-width="4" fill="none" />
                                        <path d="M14 24L21 31L34 17" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color : 'white',
                                        }}
                                    >
                                        {t('a 7% commission fee on your earnings')}
                                    </Typography>
                                </div>
                            </div>

                        </div>
                        <div className="Card3"
                            style={{
                                height: isScreenUnder450px ? '640px' : '600px',
                                width: isScreenUnder450px ? '350px' : '390px',
                                background: 'white',
                                borderRight: '1px solid #ccc',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                position: isScreenUnder450px ? 'relative' : 'undifined',
                                top: isScreenUnder450px ? '10px' : 'undifined',


                            }}
                        >
                            <div className='FirstText'
                                style={{
                                    position: 'relative',
                                    top: isScreenUnder450px ? '-10px' : '5px',

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',

                                        textAlign: 'center',
                                    }}
                                >
                                    <span style={{
                                        backgroundImage: 'linear-gradient(90deg,#f926e1,#2ab5fb)',
                                        backgroundClip: 'text',
                                        fontWeight: '700',
                                        WebkitTextFillColor: 'transparent',
                                    }}>
                                        {t('Freelancer Pro Plus')}
                                    </span>
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        marginTop: '5px',
                                        padding: '15px',
                                    }}
                                >
                                    {t('The Ultimate Toolkit for Freelancer Pro Plus plan')}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#b1b1b1',
                                        textAlign: 'center',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        marginTop: '5px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    {t('Starting at 12 USD / First Month')}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                    onClick={() => handlePlanSelection('proPlus')}
                                     style={{
                                        color: 'white',
                                        background: 'linear-gradient(90deg,#f926e1,#2ab5fb)',
                                        border: 'none',
                                        borderRadius: '14px',
                                        width: '285px',
                                        fontSize: '16px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '600',
                                        height: "48px",
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                        marginTop: '20px',
                                    }}>
                                        {t('Unlock Now')}
                                    </button>

                                </div>

                            </div>
                            <div className='FutersContainer'
                                style={{
                                    marginRight: currentLanguage === 'ar' ? '45px' : 'undifined',
                                    position: 'relative',
                                    top: isScreenUnder450px ? '5px' : '20px',
                                }}
                            >
                                <div className='TOP1'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('Withdrawals available from any amount')}
                                    </Typography>
                                </div>
                                <div className='TOP2'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('Unlimited Bids Per month')}
                                    </Typography>
                                </div>
                                <div className='TOP3'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('Advanced portfolio tools')}
                                    </Typography>
                                </div>
                                <div className='TOP4'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('Higher project success rate')}
                                    </Typography>
                                </div>

                                <div className='TOP5'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('Exclusive access to premium projects')}
                                    </Typography>
                                </div>
                                <div className='TOP6'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('Unlimited messaging with clients')}
                                    </Typography>
                                </div>
                              
                                <div className='TOP8'
                                    style={{
                                        display: 'flex',
                                        marginLeft: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <img src="https://assets.website-files.com/62865614b39c464b76d339aa/63fe08dd56f1ef2552260c0c_check_circle.svg" alt=""
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: currentLanguage === 'ar' ? '10px' : 'undifined',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {t('a 4% commission fee on your earnings')}
                                    </Typography>
                                </div>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
            <div className="PartnerShip"
                style={{
                    height: isScreenUnder450px ? '360px' : '290px',
                    width: isScreenUnder450px ? '94%' : '98%',
                    background: '#000',
                    borderRadius: '16px',
                    marginTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontSize: isScreenUnder450px ? '25px' : '35px',
                        fontWeight: 'bold',
                        textAlign: isScreenUnder450px ? 'center' : 'undifined',



                    }}
                >
                    {t('Want to become Khadamat platform Partner?')}

                </Typography>
                <Typography
                    sx={{
                        color: '#fff',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontSize: '16px',
                        marginTop: '20px',
                        textAlign: isScreenUnder450px ? 'center' : 'undifined',



                    }}
                >
                    {t('For more details on our partnership program offering a 0% commission fee on your earnings')}
                    <span
                        style={{
                            display: 'block',
                            textAlign: 'center'

                        }}
                    >{t('please get in touch with us.')}</span>

                </Typography>
                <button style={{
                    color: 'white',
                    background: 'linear-gradient(90deg,#f926e1,#2ab5fb)',
                    border: 'none',
                    borderRadius: '14px',
                    width: '285px',
                    fontSize: '16px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    fontWeight: '600',
                    height: "48px",
                    marginLeft: '5px',
                    cursor: 'pointer',
                    marginTop: '30px',
                }}>
                    {t('Contact Us')}
                </button>
            </div>
        </div>
    )
}

export default OurPlans
