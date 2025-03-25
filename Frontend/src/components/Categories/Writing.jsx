import { Button, Typography, tabClasses } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import animationData from '../../assets/images/small-logos/AnimationProg.json';

import animationData2 from '../../assets/images/small-logos/Animation - 1721224613686.json';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import PolicyIcon from '@mui/icons-material/Policy';
import AccountingComp from '../Projectsfetch/Accounting/AccountingComp';
import Accounting1 from '../../assets/images/small-logos/Accounting1.json';
import WritingComp from '../Projectsfetch/Writing/WritingComp';





function Writing() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getWidth = () => {
        if (width <= 600) return '93%';
        if (width > 600 && width <= 960) return '70.4%';
        if (width > 960 && width <= 2000) return '100%';
        if (width > 2000) return '78%';
        return '90%';
    };
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });


    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const getTopPosition = () => {
        if (isSmallScreen) return '-25px';
        if (isMediumScreen) return '-30px';
        if (isLargeScreen) return '-25px';
        return '60%';
    };
    const getFontSize = () => {
        if (isSmallScreen) return '18px';
        if (isMediumScreen) return '20px';
        if (isLargeScreen) return '25px';
        return '25px';
    };

    const getWidthText = () => {
        if (isSmallScreen) return '116%';
        if (isMediumScreen) return '98%';
        if (isLargeScreen) return '100%';
        return '70%'; // Default for larger screens
    };

    const getPosTextLeft = () => {
        if (isSmallScreen) return '0%';
        if (isMediumScreen) return '-7%';
        if (isLargeScreen) return '0%';
        return '50%';
    };

    const getPosTextTop = () => {
        if (isSmallScreen) return '20%';
        if (isMediumScreen) return '20px';
        if (isLargeScreen) return '110%';
        return '22%';
    };
    const getCharcterLeft = () => {
        if (isSmallScreen) return '0%';
        if (isMediumScreen) return '-5%';
        if (isLargeScreen) return '0%';
        return '50%';
    };
    const getBoxWidth = () => {
        if (isSmallScreen) return '119%';
        if (isMediumScreen) return '126%';
        if (isTabletScreen) return '132%';
        if (isLargeScreen) return '113%';
        return '50%';
    };
    const getSingleBoxWidth = () => {
        if (isSmallScreen) return '110%';
        if (isMediumScreen) return '43%';
        if (isTabletScreen) return '40%';
        if (isLargeScreen) return '23%';

    };
    const getOffersWidth = () => {
        if (isSmallScreen) return '97.3%';
        if (isMediumScreen) return '100%';
        if (isLargeScreen) return '100%';
    };
    const navigate = useNavigate();

    const navigateToProgramming = () => {
        navigate('/userdashboard/projects/categories/programming');
    };

    const navigateToDesign = () => {
        navigate('/userdashboard/projects/categories/design');
    };
    const navigateToMarketing = () => {
        navigate('/userdashboard/projects/categories/marketing');
    };
    const navigateToArchitecture = () => {
        navigate('/userdashboard/projects/categories/architecture');
    };
    const navigateToWriting = () => {
        navigate('/userdashboard/projects/categories/writing');
    };
    const navigateToAccounting = () => {
        navigate('/userdashboard/projects/categories/accounting');
    };
    const navigateToSupport = () => {
        navigate('/userdashboard/projects/categories/support');
    };
    const navigateToConsulting = () => {
        navigate('/userdashboard/projects/categories/consulting');
    };
    const handleBack = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    const handleForward = () => {
        // Navigate forward to the next page
        navigate(1);
    };
    return (
        <>

            <div className='ProgrammingContainer'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    position : 'relative',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    padding: '20px', 
                    marginRight :
                     isSmallScreen && currentLanguage === 'ar'? '0px' :
                     isTabletScreen && currentLanguage === 'ar'? '0px' :
                    currentLanguage === 'ar'? '10px' :
                     'unset',
                }}
            >
                <div className='aurora-hero'
                    style={{
                        width: isSmallScreen? '110%' : '100%',
                        Height: 'auto',
                        background: 'transparent',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'visible',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: `
                   linear-gradient(
                   to bottom,
                   transparent 99%,
                   #000 100%),
                   linear-gradient(
                   to right, 
                   transparent 99%,
                   #000 100%
                   )`,
                        backgroundSize: '100px 100px, 100px 100px',
                        backgroundPosition: '0 0, 0 0',
                        backgroundRepeat: 'repeat, repeat',
                    }}
                >


                    <div className='Stars'
                        style={{
                            position: 'absolute',
                            top: '5px',
                        }}
                    >
                        <div className="night"
                            style={{
                                position: 'absolute',
                                left: isSmallScreen ? '-140px' : '100px',
                                height: '80px',
                                width: '1px'
                            }}>
                            <div className="shooting_star"></div>
                        </div>
                        <div className="night"
                            style={{
                                position: 'absolute',
                                left: isSmallScreen ? '-140px' : '400px',
                                height: '80px',
                                width: '1px'
                            }}>
                            <div className="shooting_star"></div>
                        </div>
                        <div className="night1"
                            style={{
                                position: 'absolute',
                                left: isSmallScreen ? '-10px' : '200px',
                                height: '80px',
                                width: '1px'
                            }}>
                            <div className="shooting_star1"></div>
                        </div>
                        <div className="night2"
                            style={{
                                position: 'absolute',
                                left: isSmallScreen ? '135px' : '-400px',
                                height: '80px',
                                width: '1px'
                            }}>
                            <div className="shooting_star2"></div>
                        </div>
                        <div className="night3" style={{ position: 'absolute', left: '-300px', height: '80px', width: '1px' }}>
                            <div className="shooting_star3"></div>
                        </div>
                    </div>



                    <div className='Text '
                        style={{
                            textAlign: 'center',
                            width: getWidthText(),
                            marginBottom: '10px',
                            position: 'relative',


                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'grey',
                                fontWeight: 'bold',
                                fontSize: getFontSize(),
                            }}
                        >
                            {t('Discovering the brightest talents with our services')}
                        </Typography>
                        <h1
                            style={{
                                fontFamily: currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',
                                fontSize: getFontSize(),
                                color: 'white',
                                direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
                                marginTop: '10px',
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
                                    marginTop: '10px',
                                    whiteSpace: 'nowrap',
                                    
                                }}
                            >
                                {t('freelancers With [Khadamat].')}
                            </span>
                        </h1>
                    </div>

                    <div className="Character"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            width: '100%',
                            marginTop : '-70px',
                        }}
                    >
                        <div className="light-effect"></div>
                        <Lottie
                            animationData={Accounting1}
                            style={{ width: 300, height: 300, display: 'block', margin: '0 auto' }}
                        />
                    </div>
                    <div className='BoxesAR '
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center', // Center BoxesAR within aurora-hero
                            justifyContent: 'center',
                            width: '100%', // Full width to match aurora-hero
                            opacity : '0',
                            zIndex : '-1',
                            padding: '20px', // Add padding if needed for spacing


                        }}
                    >
                        <div className="CatBoxes"
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                                marginTop: '-70px',
                                width: getBoxWidth(), // Set a specific width to center CatBoxes
                                justifyContent: 'center', // Center boxes horizontally
                                alignItems: 'center', // Center boxes vertically
                                cursor: 'pointer',
                            }}
                        >

                            <div onClick={navigateToProgramming} className="Coding light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px #5B42F3 solid',
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                            }}

                            >
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <CodeIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px'
                                            }}
                                        >
                                            {t('Programming')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Web, App, and Game Development')}

                                        </Typography>
                                    </div>
                                </div>
                            </div>

                            <div onClick={navigateToDesign} className="Design light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px #5B42F3 solid',
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}

                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <DesignServicesIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px'
                                            }}
                                        >
                                            {t('Design')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                            width: currentLanguage === 'ar' ? '220px' : 'undifined',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Graphic, UI/UX, and Product Design, Video design')}

                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div onClick={navigateToMarketing} className="Design light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px #5B42F3 solid',
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                                background: 'rgb(255 255 255 / 15%)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}

                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <CampaignIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px'
                                            }}
                                        >
                                            {t('Marketing')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Digital Marketing, SEO, and Social Media')}

                                        </Typography>
                                    </div>
                                </div>

                            </div>
                            <div onClick={navigateToArchitecture} className="Architecture light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px #5B42F3 solid',
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <ArchitectureIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px'
                                            }}
                                        >
                                            {t('Architecture')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Engineering, architecture and interior design')}


                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div onClick={navigateToWriting} className="Writing light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px #5B42F3 solid',
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <GTranslateIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px',
                                                textWrap: 'nowrap',
                                                position: 'relative',
                                                right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                            }}
                                        >
                                            {t('Writing & Translation')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        width: currentLanguage === 'ar' ? '250px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Content writing, copywriting, translation')}

                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div onClick={navigateToAccounting} className="Accounting light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px #5B42F3 solid', /* Light border */
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <AccountBalanceIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px',
                                                textWrap: 'nowrap',
                                                position: 'relative',
                                            }}
                                        >
                                            {t('Finance & Accounting')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        marginTop: '13px',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Bookkeeping, financial analysis, tax')}

                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div onClick={navigateToSupport} className="Support light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                border: '1px #5B42F3 solid',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <SupportAgentIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px'
                                            }}
                                        >
                                            {t('Customer Support')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        marginTop: '13px',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Customer service, tech support')}

                                        </Typography>
                                    </div>
                                </div>

                            </div>
                            <div onClick={navigateToConsulting} className="Consulting light box" style={{
                                width: getSingleBoxWidth(),
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                border: '1px #5B42F3 solid',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                rder: '1px solid rgba(255, 255, 255, 0.18)',
                                ckdropFilter: 'blur(10px)', /* Blur effect */
                                bkitBackdropFilter: 'blur(10px)',
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <PolicyIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '17px',
                                                position: 'relative',
                                                textWrap: 'nowrap'
                                            }}
                                        >
                                            {t('Consulting & Advice')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        marginTop: '13px',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',

                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >

                                            {t('Business strategy, legal consulting')}

                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="IMG2"
                        style={{
                            display: 'flex',
                            position: 'relative',
                            justifyContent: 'center',
                            opacity: '0',
                            marginBottom: '-150px',
                        }}
                    >
                        <div className="light-effect"></div>
                        <Lottie animationData={animationData2} style={{ width: 100, height: 100 }} />
                    </div>
                </div>
             

                <div className='CarAR'
                    style={{
                        position: 'relative',
                        display: 'flex',           // Flexbox for centering
                        alignItems: 'center',       // Vertical center alignment
                        justifyContent: 'center',   // Horizontal center alignment
                        width: isSmallScreen? '103%' : '96%',  
                        position : 'absolute', 
                        top : isSmallScreen? '25%' :
                        isTabletScreen? '38%' :
                        isMediumScreen? '37%' :
                         '55%',
                                   
                    }}
                >
                    <div className="CatProjects"
                        style={{
                            width: '100%',   // Set specific width for CatProjects
                            display: 'flex',           // Flexbox for centering inner content
                            alignItems: 'center',       // Center vertically within CarAR
                            justifyContent: 'center',   // Center horizontally within CarAR
                            position: 'relative',

                        }}
                    >
                        <WritingComp />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Writing
