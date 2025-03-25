import React from 'react'
import { Typography, Button } from '@mui/material'
import Lottie from 'react-lottie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import i18n from 'i18next';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import animationData from '../../assets/images/small-logos/Camera.json'; // Update with the path to your JSON file


function UnAuthPro() {
    const defaultOptions = {
        loop: true,  // Set to false if you don't want it to loop
        autoplay: true, // Set to false if you don't want it to autoplay
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice' // Adjust this if necessary
        },
    };

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


    const navigate = useNavigate();

    // Function to handle click and trigger animation
    const handleBackToLogin = () => {

        navigate('/auth/signin');

    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    return (
        <div className="ContainerRr"
            style={{
                width: '100%',
                height: '100vh',
                background: '#c33764',
                background: 'linear-gradient(to right, #1d2671, #c33764)',
                display: 'flex',
                justifyContent: 'center',

            }}
        >

            <div className="PageContent"
                style={{
                    width: '90%',
                    height : 'auto',
                    maxHeight : '85vh',
                    minHeight : '50%',
                    background: '#010020',
                    borderRadius: '30px',
                    margin: 'auto',
                    boxShadow: '0 0 10px #9521f3, 0 0 40px #c600ee, 0 0 80px #f704f7',
                    display: 'flex',
                }}
            >
                <div className="TextInfo"
                    style={{
                        width: '45%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        padding: isMediumScreen? '10px' : '40px',


                    }}
                >
                    <div className="Logo11">
                        <img width={230} src="https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png" alt="" />
                    </div>
                    <div className="MainText"
                        style={{
                            padding: '25px',
                            marginTop: isMediumScreen? '10px' :  '20px',


                        }}
                    >
                        <Typography className="glitch-text"
                            sx={{
                                fontSize: isMediumScreen? '30px' : '40px',
                            }}
                        >
                            Protected Data !
                        </Typography>
                    </div>
                    <div className="SubText"
                        style={{
                            padding: '20px',
                            marginTop: '-40px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                textShadow: '0 0 10px #9521f3, 0 0 40px #c600ee, 0 0 80px #f704f7',

                            }}
                        >
                            You are seeing this page because your account does not have the necessary permissions to access the
                            requested content or resource. Please log in with an authorized account or contact support for further assistance.
                        </Typography>
                    </div>
                    <div className="Buttons"
                        style={{
                            display: 'flex',
                            gap: '20px',
                            padding: '20px',
                        }}
                    >
                        <Button onClick={handleBackToLogin}
                            sx={{
                                width: '32%',
                                maxWidth: 360,
                                color: 'white',
                                border: '1px solid white',
                                background: 'black',
                                borderRadius: '16px',
                                maxHeight: '400px',
                                height: '32px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                ":hover": {
                                    background: 'black', // Keep background black on hover
                                    border: '1px solid white', // Keep the border the same
                                },
                            }}


                        >
                            <ArrowBackIcon sx={{ fontSize: '22px' }} />
                            <Typography
                                sx={{
                                    color: 'white',
                                    flex: 1,
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    textWrap : 'nowrap',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                                Back to Login
                            </Typography>

                        </Button>
                        <Button
                            sx={{
                                width: '32%',
                                maxWidth: 360,
                                color: 'white',
                                border: '1px solid white',
                                background: 'black',
                                borderRadius: '16px',
                                maxHeight: '400px',
                                height: '32px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                ":hover": {
                                    background: 'black', // Keep background black on hover
                                    border: '1px solid white', // Keep the border the same
                                },
                            }}


                        >

                            <Typography
                                sx={{
                                    color: 'white',
                                    flex: 1,
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    textWrap : 'nowrap',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                                Contact Support
                            </Typography>

                        </Button>
                    </div>

                </div>
                <div   className="StylesImages"
                  
                    style={{
                        width: '55%',
                  
                        display: 'flex',
                        flexDirection: 'column',
                
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start', // Ensures content aligns to the left
                        padding: '0', // Remove extra padding
                        position: 'relative', // Allows absolute positioning within
                    }}
                >
                    <div className="CameraSpy"
                        
                        style={{
                            position: 'absolute', // Positions it in the top-left corner
                            top: '-10%', // Adjust as needed
                            left: '-5%',
                        }}
                    >
                        <Lottie options={defaultOptions} style={{width : isMediumScreen? '150px' : '190px' , height : isMediumScreen? '50px' : '70px'}} />
                    </div>
                    <div className="ImgCyber "
                        style={{
                            position: 'absolute',
                            right: '3%',
                            top: '21%',

                        }}
                    >
                        <div className="light-effect3"></div>
                        <img style={{width : isMediumScreen? '450px' : '500px'}}
                         src="https://res.cloudinary.com/damicjacf/image/upload/v1729615148/cyber-security-concept_23-2148542046_ghwagg.jpg" alt="" srcset="" />
                    </div>
                    <div className="ImgCyber "
                        style={{
                            position: 'absolute',
                            right: '10%',
                            top: '15%',

                        }}
                    >
                        <div className="light-effect3"></div>
                        <img style={{width : isMediumScreen? '350px' : '400px'}}
                         src="https://res.cloudinary.com/damicjacf/image/upload/v1732291313/_80af88c5-5718-42c8-93c5-e1fe9b90c10a-removebg-preview_LE_upscale_magic_beta_x4_creativity_75_resemblance_50_tone_enhance_50_color_enhance_70-removebg-preview_hmgavc.png" alt="" srcset="" />
                    </div>
                    
                  <div className="light-effect3"></div>
                      
                </div>


            </div>

        </div>
    )
}

export default UnAuthPro