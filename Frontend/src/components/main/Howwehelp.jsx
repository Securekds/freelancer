import React from 'react'
import { Typography, Box } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PublicIcon from '@mui/icons-material/Public';




function Howwehelp() {
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
                minHeight: '104vh',
                background: 'rgba(236,236,236,.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '50px',
                overflow: 'hidden',
            }}
        >
            <div className="AllElements">
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
                        {t('How khadamt platform will help you')}
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
                <div className="First3Boxes" style={{
                    display: isScreenUnder450px? 'block' : 'flex',
                    

                }}>
                    <Box className='Box1' style={{
                        width: '380px', // Adjust width as needed
                        height: '230px', // Adjust height as needed
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)', // Add border color
                        borderRadius: '12px', // Add border radius
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)', // Add box shadow
                        display: 'flex', // Change to flex
                        flexDirection: 'column', // Stack content vertically
                        justifyContent: 'center', // Center content vertically
                        alignItems: 'center', // Center content horizontally
                        margin: isScreenUnder450px? '0 15px' : '0 0px',
                    }}>
                        <div className="Box1icon" style={{
                            height: '22%',
                            width: '15%',
                            borderRadius: '10px',
                            backgroundColor: '#fae8fb',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position : 'relative',
                            top : '-12px',
                        }}>
                            <SupervisorAccountIcon sx={{color: '#9E16F5',
                            fontSize :'45px',
                        }} />
                        
                        </div>
                        <div>
                            <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '21px',   
                                fontWeight : '700',
                                textAlign :'center',
                            }}
                            >{t('Acting as a mediator')} 
                            </Typography>
                            <Typography sx={{
                                textAlign :'center',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color : '#6d6d6d',
                                fontSize : '17px',
                                fontWeight : '400',
                                opacity : '8',
                                marginTop : '10px',
                            }} >
                            {t('between project owners and freelancers, our platform streamlines communication, ensuring clarity and efficiency in every transaction.')}
                            </Typography>
                        </div>
                    </Box>
                    <Box className='Box2' style={{
                        width: '380px', // Adjust width as needed
                        height: '230px', // Adjust height as needed
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)', // Add border color
                        borderRadius: '12px', // Add border radius
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)', // Add box shadow
                        display: 'flex',
                        display: 'flex', // Change to flex
                        flexDirection: 'column',
                        margin: isScreenUnder450px? '15px' : '0 15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                         <div className="Box2icon " style={{
                            height: '22%',
                            width: '15%',
                            borderRadius: '10px',
                            backgroundColor: '#ffe4c3',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position : 'relative',
                            top : '-12px',
                            
                        }}>
                            <PaymentIcon sx={{color: '#FF8F05',
                            fontSize :'45px',
                        }} />
                        </div>
                        <div>
                            <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '21px',   
                                fontWeight : '700',
                                textAlign :'center',
                            }}
                            >{t('Secure Payment Assurance')} 
                            </Typography>
                            <Typography sx={{
                                textAlign :'center',
                                fontFamily:  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color : '#6d6d6d',
                                fontSize : '17px',
                                fontWeight : '400',
                                opacity : '8',
                                marginTop : '10px',
                            }} >
                                {t('Rest assured, our platform guarantees secure and reliable payment transactions, providing peace of mind to all users.')}
                            </Typography>
                        </div>
                    </Box>
                    <Box className='Box3' style={{
                        width: '380px', // Adjust width as needed
                        height: '230px', // Adjust height as needed
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)', // Add border color
                        borderRadius: '12px', // Add border radius
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)', // Add box shadow
                        display: 'flex',
                        display: 'flex', // Change to flex
                        flexDirection: 'column',
                        margin: isScreenUnder450px? '15px' : '0 0px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                         <div className="Box1icon" style={{
                            height: '22%',
                            width: '15%',
                            borderRadius: '10px',
                            backgroundColor: '#e8fafe',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position : 'relative',
                            top : '-12px',
                        }}>
                            <AttachMoneyIcon sx={{color: '#34A6FC',
                            fontSize :'45px',
                        }} />
                        </div>
                        <div>
                            <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '21px',   
                                fontWeight : '700',
                                textAlign :'center',
                            }}
                            >{t('Cost-Efficient Projects')}
                            </Typography>
                            <Typography sx={{
                                textAlign :'center',
                                fontFamily:  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color : '#6d6d6d',
                                fontSize : '17px',
                                fontWeight : '400',
                                opacity : '8',
                                marginTop : '10px',
                            }} >
                                 {t('high-quality projects at Our platform connects buyers with freelancers, ensuring cost-effective solutions without sacrificing quality.')}
                            </Typography>
                        </div>
                    </Box>
                </div>
                <div className="Second3Boxes" style={{
                    display: isScreenUnder450px? 'block' : 'flex',
                    marginTop : '10px',
                    

                }}>
                    <Box className='Box1' style={{
                        width: '380px', // Adjust width as needed
                        height: '230px', // Adjust height as needed
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)', // Add border color
                        borderRadius: '12px', // Add border radius
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)', // Add box shadow
                        display: 'flex', // Change to flex
                        flexDirection: 'column', // Stack content vertically
                        justifyContent: 'center', // Center content vertically
                        alignItems: 'center', // Center content horizontally
                        margin: isScreenUnder450px? '0 15px' : '0 0px',
                    }}>
                        <div className="Box1icon" style={{
                            height: '22%',
                            width: '15%',
                            borderRadius: '10px',
                            backgroundColor: '#fae8fb',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position : 'relative',
                            top : '-12px',
                        }}>
                            <SelfImprovementIcon sx={{color: '#9E16F5',
                            fontSize :'45px',
                        }} />
                        
                        </div>
                        <div>
                            <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '21px',   
                                fontWeight : '700',
                                textAlign :'center',
                            }}
                            >{t('Quality-Driven Freelancers')} 
                            </Typography>
                            <Typography sx={{
                                textAlign :'center',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color : '#6d6d6d',
                                fontSize : '17px',
                                fontWeight : '400',
                                opacity : '8',
                                marginTop : '10px',
                            }} >
                            {t('Discover top-tier freelancers renowned for their expertise and professionalism. Our platform ensures access to the best talent')}
                            </Typography>
                        </div>
                    </Box>
                    <Box className='Box2' style={{
                        width: '380px', // Adjust width as needed
                        height: '230px', // Adjust height as needed
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)', // Add border color
                        borderRadius: '12px', // Add border radius
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)', // Add box shadow
                        display: 'flex',
                        display: 'flex', // Change to flex
                        flexDirection: 'column',
                        margin: isScreenUnder450px? '15px' : '0 15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                         <div className="Box2icon " style={{
                            height: '22%',
                            width: '15%',
                            borderRadius: '10px',
                            backgroundColor: '#ffe4c3',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position : 'relative',
                            top : '-12px',
                            
                        }}>
                            <Diversity3Icon sx={{color: '#FF8F05',
                            fontSize :'45px',
                        }} />
                        </div>
                        <div>
                            <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '21px',   
                                fontWeight : '700',
                                textAlign :'center',
                            }}
                            >{t('Efficient Collaboration')} 
                            </Typography>
                            <Typography sx={{
                                textAlign :'center',
                                fontFamily:  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color : '#6d6d6d',
                                fontSize : '17px',
                                fontWeight : '400',
                                opacity : '8',
                                marginTop : '10px',
                            }} >
                                {t('Streamline teamwork for faster project completion. Collaborate effortlessly on our platform.')}
                            </Typography>
                        </div>
                    </Box>
                    <Box className='Box3' style={{
                        width: '380px', // Adjust width as needed
                        height: '230px', // Adjust height as needed
                        background: 'white',
                        border: '1px solid rgba(249,38,225,.2)', // Add border color
                        borderRadius: '12px', // Add border radius
                        boxShadow: '0 16px 44px rgba(0,0,0,.03)', // Add box shadow
                        display: 'flex',
                        display: 'flex', // Change to flex
                        flexDirection: 'column',
                        margin: isScreenUnder450px? '15px' : '0 0px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                         <div className="Box1icon" style={{
                            height: '22%',
                            width: '15%',
                            borderRadius: '10px',
                            backgroundColor: '#e8fafe',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position : 'relative',
                            top : '-12px',
                        }}>
                            <PublicIcon sx={{color: '#34A6FC',
                            fontSize :'45px',
                        }} />
                        </div>
                        <div>
                            <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '21px',   
                                fontWeight : '700',
                                textAlign :'center',
                            }}
                            >{t('Global Talent Pool')}
                            </Typography>
                            <Typography sx={{
                                textAlign :'center',
                                fontFamily:  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color : '#6d6d6d',
                                fontSize : '17px',
                                fontWeight : '400',
                                opacity : '8',
                                marginTop : '10px',
                            }} >
                                 {t('Facilitate seamless collaboration among team members. Enhance project efficiency and productivity effortlessly.')}
                            </Typography>
                        </div>
                    </Box>
                </div>
                
                

            </div>

        </div>
    )
}

export default Howwehelp
