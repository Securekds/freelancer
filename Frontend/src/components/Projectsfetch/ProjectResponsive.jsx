import { Button, Typography, tabClasses } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import animationData2 from '../../assets/images/small-logos/Animation - 1721224613686.json';
import animationData from '../../assets/images/small-logos/AnimationProg.json';

import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import First4 from '../Categories/Responsivedesign/First4';
import Typetext from '../Categories/Responsivedesign/Typetext';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import PolicyIcon from '@mui/icons-material/Policy';
import { FiArrowRight } from "react-icons/fi";
import ResponsiveallPro from '../Projectsfetch/ResponsiveallPro';



function ProjectResponsive() {
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
        if (width > 960 && width <= 2000) return '78%';
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
    const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');

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
        if (isMediumScreen) return '110.1%';
        if (isLargeScreen) return '110%';
        return '50%';
    };
    const getSingleBoxWidth = () => {
        if (isSmallScreen) return '110%';
        if (isMediumScreen) return '43%';
        if (isLargeScreen) return '23%';

    };
    const getOffersWidth = () => {
        if (isSmallScreen) return '106%';
        if (isMediumScreen) return '63%';
        if (isLargeScreen) return '101%';
    };
    const navigate = useNavigate();

    const navigateToProgramming = () => {
        navigate('/projects/categories/programming');
    };

    const navigateToDesign = () => {
        navigate('/projects/categories/design');
    };
    const navigateToMarketing = () => {
        navigate('/projects/categories/marketing');
    };
    const navigateToArchitecture = () => {
        navigate('/projects/categories/architecture');
    };
    const navigateToWriting = () => {
        navigate('/projects/categories/writing');
    };
    const navigateToAccounting = () => {
        navigate('/projects/categories/accounting');
    };
    const navigateToSupport = () => {
        navigate('/projects/categories/support');
    };
    const navigateToConsulting = () => {
        navigate('/projects/categories/consulting');
    };
    return (
        <>

            <div className="Container "
                style={{
                    width: isSmallScreen? '99%' : '77%',
                    height: 'auto',
                    position: 'absolute',
                    top: '20%',
                    left: isSmallScreen? '1%' : '22%',
                    display: 'flex',
                    overflow : 'hidden',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white',
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
                <div className='Text '
                    style={{
                        textAlign: 'center',
                        marginTop : '80px',
                        marginRight : isSmallScreen? '5px' : 'unset',

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
                       marginTop : '-40px',
                      }}
                  >
                      <div className="light-effect"></div>
                      <Lottie
                          animationData={animationData}
                          style={{ width: 300, height: 300, display: 'block', margin: '0 auto' }}
                      />
                  </div>
                
                <div className="CatProjects"
                       style={{
                           width: getOffersWidth(),
                           position : 'relative',
                           marginTop : '-40px',
                           right: isSmallScreen? 'unset' : '10px'
                        
                      
                           
                       }}
                   >
                       <ResponsiveallPro />
                   </div>
            
            </div>
        </> 

    )
}

export default ProjectResponsive
