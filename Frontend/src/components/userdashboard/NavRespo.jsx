
import HomeIcon from '@mui/icons-material/Home';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import TextField from '@mui/material/TextField';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Button, Typography, Box, Popover } from '@mui/material';
import * as React from 'react';
import Colors from './Colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useUser } from '../../Context/UserContext.jsx'
import { useNotifications } from '../../Context/NotificationContext.jsx'
import Notification from '../Projectsfetch/MenuList/Notification';
import ProfileMenu from '../Projectsfetch/MenuList/ProfileMenu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';








function NavRespo({ onSidenavMobileToggle, onBackgroundChange, toggleProfileMenu }) {


    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });






    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');

    let pageTitle = 'Dashboard'; // Default title
    if (location.pathname === '/userdashboard/profile') {
        pageTitle = 'Profile';
    } else if (location.pathname === '/userdashboard/project') {
        pageTitle = 'Projects';
    } else if (location.pathname === '/userdashboard/billing') {
        pageTitle = 'Billing';
    } else if (location.pathname === '/projects/categories/programming') {
        pageTitle = t('Dashboard / Projects / Programming').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/programming/web-development') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Web-development');
        } else {
            pageTitle = t('Projects / Programming / Web-development').replace(/\s+/g, '\u00A0');
        }

    } else if (location.pathname === '/projects/categories/design') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Tableau de bord / Projets / Design');
        } else {
            pageTitle = t('Dashboard / Projects / Design').replace(/\s+/g, '\u00A0');
        }
    } else if (location.pathname === '/projects/categories/programming/mobileapp-development') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / App-development');
        } else {
            pageTitle = t('Projects / Programming / App-development');
        }

    } else if (location.pathname === '/projects/categories/programming/database-development') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Database-development');
        } else {
            pageTitle = t(' Projects / Programming / Database-development').replace(/\s+/g, '\u00A0');
        }

    } else if (location.pathname === '/projects/categories/programming/software-engineering') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Software-engineering');
        } else {
            pageTitle = t('Projects / Programming / Software-engineering').replace(/\s+/g, '\u00A0');
        }

    } else if (location.pathname === '/projects/categories/programming/website-design') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Website-Design');
        } else {
            pageTitle = t('Projects / Programming / Website-Design').replace(/\s+/g, '\u00A0');
        }
    } else if (location.pathname === '/projects/categories/programming/css-design') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Css-Design');
        } else {
            pageTitle = t('Projects / Programming / Css-Design').replace(/\s+/g, '\u00A0');
        }
    } else if (location.pathname === '/projects/categories/programming/javascript-development') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Javascript-development');
        } else {
            pageTitle = t('Projects / Programming / Javascript-development').replace(/\s+/g, '\u00A0');
        }
    } else if (location.pathname === '/projects/categories/programming/php-development') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Programming / Php-development');
        } else {
            pageTitle = t('Projects / Programming / Php-development').replace(/\s+/g, '\u00A0');
        }
    } else if (location.pathname === '/projects/categories/design/graphic-design') {
        if (currentLanguage === 'fr' && isScreenUnder450px) {
            pageTitle = t('Projects / Design / Graphic-design');
        } else {
            if (currentLanguage === 'ar' && isScreenUnder450px) {
                pageTitle = t('Projects / Design / Graphic-design').replace('Dashboard / ', '');
            } else {
                pageTitle = t('Projects / Design / Graphic-design').replace(/\s+/g, '\u00A0');
            }
        }
    } else if (location.pathname === '/projects/categories/design/photoshop') {
        pageTitle = t('Dashboard / Projects / Design / Photoshop').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/design/video-production') {
        if (currentLanguage === 'ar' && isScreenUnder450px) {
            pageTitle = t('Projects / Design / Video-production').replace('Dashboard / ', '');
        } else {
            pageTitle = t('Dashboard / Projects / Design / Video-production').replace(/\s+/g, '\u00A0');
        }
    } else if (location.pathname === '/projects/categories/design/logo-design') {
        pageTitle = t('Projects / Design / Logo-design').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/design/video-montage') {
        pageTitle = t('Projects / Design / Video-montage').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/design/creative-design') {
        pageTitle = t('Projects / Design / Creative-design').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/design/design-idea') {
        pageTitle = t('Projects / Design / Design-idea').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/design/video-design') {
        pageTitle = t('Projects / Design / Video-design').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing/e-marketing') {
        pageTitle = t('Projects / Marketing / E-marketing').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing/marketing-managment') {
        pageTitle = t('Projects / Marketing / Marketing-managment').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing/marketing-social') {
        pageTitle = t('Projects / Marketing / Marketing-social').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing/marketing-plan') {
        pageTitle = t('Projects / Marketing / Marketing-plan').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing/marketing-seo') {
        pageTitle = t('Projects / Marketing / Marketing-seo').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing/marketing-internet') {
        pageTitle = t('Projects / Marketing / Marketing-internet').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture') {
        pageTitle = t('Projects / Architecture').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture/architecture-engineering') {
        pageTitle = t('Projects / Architecture / Architecture-engineering').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture/architecture-interior') {
        pageTitle = t('Projects / Architecture / Architecture-interior').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture/architecture-design') {
        pageTitle = t('Projects / Architecture / Architecture-design').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture/architecture-idea') {
        pageTitle = t('Projects / Architecture / Architecture-idea').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture/architecture-3d') {
        pageTitle = t('Projects / Architecture / Architecture-3d').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/architecture/architecture-plans') {
        pageTitle = t('Projects / Architecture / Architecture-plans').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/marketing') {
        pageTitle = t('Projects / Marketing').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing') {
        pageTitle = t('Projects / Writing').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing/writing-content') {
        pageTitle = t('Projects / Writing / Writing-content').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing/writing-articles') {
        pageTitle = t('Projects / Writing / Writing-articles').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing/content-editing') {
        pageTitle = t('Projects / Writing / Content-edit').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing/writing-reports') {
        pageTitle = t('Projects / Writing / Writing-reports').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing/research-scientific') {
        pageTitle = t('Projects / Writing / Research-scientific').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/writing/writing-online') {
        pageTitle = t('Projects / Writing / Writing-online').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting') {
        pageTitle = t('Projects / Accounting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting/financial-accounting') {
        pageTitle = t('Projects / Accounting / Financial-accounting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting/financial-evaluation') {
        pageTitle = t('Projects / Accounting / Financial-evaluation').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting/financial-analysis') {
        pageTitle = t('Projects / Accounting / Financial-analysis').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting/financial-management') {
        pageTitle = t('Projects / Accounting / Financial-management').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting/tax-strategy') {
        pageTitle = t('Projects / Accounting / Tax-strategy').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/accounting/administrative-reports') {
        pageTitle = t('Projects / Accounting / Administrative-reports').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support') {
        pageTitle = t('Projects / Support').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support/customer-service') {
        pageTitle = t('Projects / Support / Customer-service').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support/desk-support') {
        pageTitle = t('Projects / Support / Desk-support').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support/live-chat-support') {
        pageTitle = t('Projects / Support / Live-chat-support').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support/email-support') {
        pageTitle = t('Projects / Support / Email-support').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support/technical-support') {
        pageTitle = t('Projects / Support / Technical-support').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/support/social-media-support') {
        pageTitle = t('Projects / Support / Social-media-support').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting') {
        pageTitle = t('Projects / Consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/business-consulting') {
        pageTitle = t('Projects / Consulting / Business-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/financial-consulting') {
        pageTitle = t('Projects / Consulting / Financial-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/marketing-consulting') {
        pageTitle = t('Projects / Consulting / Marketing-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/it-consulting') {
        pageTitle = t('Projects / Consulting / It-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/human-resources-consulting') {
        pageTitle = t('Projects / Consulting / Human-resources-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/legal-consulting') {
        pageTitle = t('Projects / Consulting / Legal-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/environmental-consulting') {
        pageTitle = t('Projects / Consulting / Environmental-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/projects/categories/consulting/health-consulting') {
        pageTitle = t('Projects / Consulting / Health-consulting').replace(/\s+/g, '\u00A0');
    } else if (location.pathname === '/project') {
        pageTitle = t('Projects').replace(/\s+/g, '\u00A0');
    }




    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isScreenUnder390px = useMediaQuery('(max-width:390px)');

    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')




    const getWidth = () => {

        if (isScreenUnder500px) return '95%';
        if (isScreenUnder390px) return '80px';
        if (isSmallScreen) return 'calc(152% - 250px)'; // Adjust for small screens
        if (isMediumScreen) return 'calc(95% - 250px)'; // Adjust for medium screens
        return 'calc(90%)'; // Adjust for large screens
    };


    const isScreenUnder500px = useMediaQuery('(max-width:500px)');
    const isScreenUnder768px = useMediaQuery('(min-width:768px)');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Function to toggle the Notification component
    const toggleNotification = () => {
        setIsNotificationOpen(prevState => !prevState);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = () => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorE2, setAnchorE2] = useState(null);
    const open1 = Boolean(anchorE2);
    const handleClick1 = () => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorE2(null);
    };



    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu1 = () => {
        setIsProfileMenuOpen((prev) => !prev);
    };

    const handleCloseProfileMenu1 = () => {
        setIsProfileMenuOpen(false);
    };
    const [isNotMenuOpen, setIsNotMenuOpen] = useState(false);

    const toggleNotMenu1 = () => {
        setIsNotMenuOpen((prev) => !prev);
    };

    const handleCloseNotMenu1 = () => {
        setIsNotMenuOpen(false);
    };

    const { user } = useUser();
    const { unreadCount } = useNotifications();
    





    return (

        <>


            <Box className='ResponsiveNav '
                style={{
                    boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
                    height: 'auto',
                    borderRadius: '0.75rem',
                    width: '96%',
                    position: 'relative', // Ensure it participates in the normal flow
                    padding: '10px',
                    display: 'flex',
                    marginTop: '10px',
                    flexDirection: isScreenUnder500px ? 'column' : 'undefinied',
                    alignItems: isScreenUnder500px ? 'flex-start' : 'center',
                    marginRight: isSmallScreen && currentLanguage === 'ar' ? '0px' :
                        isTabletScreen && currentLanguage === 'ar' ? '0px' :
                            currentLanguage === 'ar' ? '10px' :
                                'unset',
                    zIndex: '44',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
            >
                <div className="Typos" style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.875rem',
                            textWrap: 'nowrap',
                        }}
                    >
                        <HomeIcon sx={{ marginRight: '8px', fontSize: '17px', color: 'grey' }} />
                        <span style={{ color: 'grey' }} >/</span>
                        <span className=''
                            style={{
                                marginRight: '8px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontWeight: 'bold',



                            }}>
                        </span>{t('Dashboard')}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop: '1px',
                            marginRight: '15px',

                        }}
                    >
                        {
                            location.pathname === '/userdashboard/projects/categories/programming' ? t('Programming') :
                                location.pathname === '/userdashboard/projects/categories/programming/web-development' ? t('Web-development') :
                                    location.pathname === '/userdashboard/projects/categories/design' ? t('Design') :
                                        location.pathname === '/userdashboard/projects/categories/programming/mobileapp-development' ? t('App-development') :
                                            location.pathname === '/userdashboard/projects/categories/programming/database-development' ? t('Database-Development') :
                                                location.pathname === '/userdashboard/projects/categories/programming/software-engineering' ? t('Software-engineering') :
                                                    location.pathname === '/userdashboard/projects/categories/programming/website-design' ? t('Website-design') :
                                                        location.pathname === '/userdashboard/projects/categories/programming/css-design' ? t('Css-design') :
                                                            location.pathname === '/userdashboard/projects/categories/programming/javascript-development' ? t('Javascript-development') :
                                                                location.pathname === '/userdashboard/projects/categories/programming/php-development' ? t('Php-development') :
                                                                    location.pathname === '/userdashboard/projects/categories/design/graphic-design' ? t('Graphic-design') :
                                                                        location.pathname === '/userdashboard/projects/categories/design/photoshop' ? t('Photoshop') :
                                                                            location.pathname === '/userdashboard/projects/categories/design/video-production' ? t('Video-production') :
                                                                                location.pathname === '/userdashboard/projects/categories/design/logo-design' ? t('Logo-design') :
                                                                                    location.pathname === '/userdashboard/projects/categories/design/video-montage' ? t('Video-montage') :
                                                                                        location.pathname === '/userdashboard/projects/categories/design/creative-design' ? t('Creative-design') :
                                                                                            location.pathname === '/userdashboard/projects/categories/design/design-idea' ? t('Design-idea') :
                                                                                                location.pathname === '/userdashboard/projects/categories/design/video-design' ? t('Video-design') :
                                                                                                    location.pathname === '/userdashboard/projects/categories/marketing/e-marketing' ? t('E-marketing') :
                                                                                                        location.pathname === '/userdashboard/projects/categories/marketing/marketing-managment' ? t('Marketing-managment') :
                                                                                                            location.pathname === '/userdashboard/projects/categories/marketing/marketing-social' ? t('Marketing-social') :
                                                                                                                location.pathname === '/userdashboard/projects/categories/marketing/marketing-plan' ? t('Marketing-plan') :
                                                                                                                    location.pathname === '/userdashboard/projects/categories/marketing/marketing-seo' ? t('Marketing-seo') :
                                                                                                                        location.pathname === '/userdashboard/projects/categories/marketing/marketing-internet' ? t('Marketing-internet') :
                                                                                                                            location.pathname === '/userdashboard/projects/categories/architecture' ? t('Architecture') :
                                                                                                                                location.pathname === '/userdashboard/projects/categories/architecture/architecture-engineering' ? t('Architecture-engineering') :
                                                                                                                                    location.pathname === '/userdashboard/projects/categories/architecture/architecture-interior' ? t('Architecture-interior') :
                                                                                                                                        location.pathname === '/userdashboard/projects/categories/architecture/architecture-design' ? t('Architecture-design') :
                                                                                                                                            location.pathname === '/userdashboard/projects/categories/architecture/architecture-idea' ? t('Architecture-idea') :
                                                                                                                                                location.pathname === '/userdashboard/projects/categories/architecture/architecture-3d' ? t('Architecture-3d') :
                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/architecture/architecture-plans' ? t('Architecture-plans') :
                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/marketing' ? t('Marketing') :
                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/writing' ? t('Writing') :
                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/writing/writing-content' ? t('Writing-content') :
                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/writing/writing-articles' ? t('Writing-articles') :
                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/writing/content-editing' ? t('Content-edit') :
                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/writing/writing-reports' ? t('Writing-reports') :
                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/writing/research-scientific' ? t('Research-scientific') :
                                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/writing/writing-online' ? t('Writing-online') :
                                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/accounting' ? t('Accounting') :
                                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/accounting/financial-accounting' ? t('Financial-accounting') :
                                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/accounting/financial-evaluation' ? t('Financial-evaluation') :
                                                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/accounting/financial-analysis' ? t('Financial-analysis') :
                                                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/accounting/financial-management' ? t('Financial-management') :
                                                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/accounting/tax-strategy' ? t('Tax-strategy') :
                                                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/accounting/administrative-reports' ? t('Administrative-reports') :
                                                                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/support' ? t('Support') :
                                                                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/support/customer-service' ? t('Customer-service') :
                                                                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/support/desk-support' ? t('Desk-support') :
                                                                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/support/live-chat-support' ? t('Live-chat-support') :
                                                                                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/support/email-support' ? t('Email-support') :
                                                                                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/support/technical-support' ? t('Technical-support') :
                                                                                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/support/social-media-support' ? t('Social-media-support') :
                                                                                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/consulting' ? t('Consulting') :
                                                                                                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/consulting/business-consulting' ? t('Business-consulting') :
                                                                                                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/consulting/financial-consulting' ? t('Financial-consulting') :
                                                                                                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/consulting/marketing-consulting' ? t('Marketing-consulting') :
                                                                                                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/consulting/it-consulting' ? t('It-consulting') :
                                                                                                                                                                                                                                                                    location.pathname === '/userdashboard/projects/categories/consulting/human-resources-consulting' ? t('Human-resources-consulting') :
                                                                                                                                                                                                                                                                        location.pathname === '/userdashboard/projects/categories/consulting/legal-consulting' ? t('Legal-consulting') :
                                                                                                                                                                                                                                                                            location.pathname === '/userdashboard/projects/categories/consulting/environmental-consulting' ? t('Environmental-consulting') :
                                                                                                                                                                                                                                                                                location.pathname === '/userdashboard/projects/categories/consulting/health-consulting' ? t('Health-consulting') :

                                                                                                                                                                                                                                                                                    t(pageTitle)}
                    </Typography>
                </div>
                <div
                    style={{
                        position: 'relative',
                        left: isScreenUnder450px ? '5px' : 'unset',
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '-3px' : '6px',


                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                left: isScreenUnder768px ? (currentLanguage === 'ar' ? '-35px' : '25px') : 'unset',

                            }}
                        >
                            <div className="icons"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative',


                                    justifyContent: isScreenUnder500px ? 'flex-start' : 'flex-end',
                                    width:
                                        isScreenUnder390px && currentLanguage === 'ar' ? '83%' :
                                            isScreenUnder390px ? '90%' :
                                                '100%',

                                }}
                            >

                                <TextField
                                    id="outlined-search"
                                    label={t('Search field')}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '14px',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif'
                                        }
                                    }}
                                    sx={{
                                        width: isSmallScreen ? '170px' :
                                            isMediumScreen ? '130px' :



                                                '200px',
                                        height: '55px',
                                        color: 'white',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'white' }
                                        },
                                        marginRight: '-30px',

                                        marginTop: '14px',
                                        position: 'relative',
                                        right: currentLanguage === 'ar' && isScreenUnder500px ? '40px' : 'unset',
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                                <div style={{
                                    display: 'flex', gap: '20px',
                                    marginLeft: '40px',
                                    position: 'relative',
                                    left: '20px',

                                    right: currentLanguage === 'ar' ? '50px' : 'unset',

                                }} >
                                    <div className='Account'
                                        style={{
                                            position: 'relative',
                                            left: currentLanguage === 'ar' && isScreenUnder500px ? '-28px' : 'unset',
                                            top: currentLanguage === 'ar' && isScreenUnder500px ? '7px' : '7px'
                                        }}
                                    >
                                        <ClickAwayListener onClickAway={handleCloseProfileMenu1}>
                                            <div onClick={toggleProfileMenu1}
                                                sx={{
                                                    position: 'relative',
                                                    right: currentLanguage === 'ar' ? '70px' : 'undefinied',

                                                }}
                                            >

                                                <AccountCircleRoundedIcon sx={{ color: 'white', fontSize: '23px', cursor: 'pointer' }} />
                                                {isProfileMenuOpen && (
                                                    <div
                                                        className="ProfileMenuContainer"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '363%', // Adjust based on your needs
                                                            right: currentLanguage === 'ar' ? '106px' :
                                                                '1723%',


                                                            transform: 'translateX(-50%)',
                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '8px',
                                                            zIndex: 1000,
                                                        }}
                                                    >
                                                        <ProfileMenu />
                                                    </div>
                                                )}

                                            </div>
                                        </ClickAwayListener>
                                    </div>
                                    <div className='Not'
                                        style={{
                                            position: 'relative',
                                            left: currentLanguage === 'ar' && isScreenUnder500px ? '-25px' : 'unset',
                                            top: currentLanguage === 'ar' && isScreenUnder500px ? '7px' : '7px'
                                        }}
                                    >
                                        <ClickAwayListener onClickAway={handleCloseNotMenu1}>
                                            <div onClick={toggleNotMenu1}
                                                sx={{
                                                    position: 'relative',
                                                    right: currentLanguage === 'ar' ? '55px' : 'undefinied',


                                                }}
                                            >
                                                <Badge
                                                    badgeContent={unreadCount > 0 ? unreadCount : null}
                                                    color="error"  // Red color for the badge
                                                    max={99}  // Limit the max number to 99, anything more will display 99+
                                                >

                                                    <NotificationsRoundedIcon sx={{
                                                        color: 'white', fontSize: '23px',
                                                        cursor: 'pointer',

                                                    }} />
                                                </Badge>
                                                {isNotMenuOpen && (
                                                    <div
                                                        className="NotificationMenuContainer"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '363%', // Adjust based on your needs
                                                            right: currentLanguage === 'ar' ? '10px' :
                                                                '1890%',


                                                            transform: 'translateX(-50%)',
                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '8px',
                                                            zIndex: 1000,
                                                        }}
                                                    >
                                                        <Notification />
                                                    </div>
                                                )}
                                            </div>
                                        </ClickAwayListener>

                                    </div>
                                    <div
                                        style={{
                                            position: 'relative',
                                            right: currentLanguage === 'ar' && isScreenUnder500px ? '20px' : 'unset',
                                        }}
                                    >
                                        <div className='Colors'
                                            style={{
                                                position: 'relative',
                                                left: currentLanguage === 'ar' && isScreenUnder500px ? '-20px' : '-20px',
                                                right: '-17px',
                                            }}
                                        >
                                            <div sx={{
                                                position: 'relative',
                                                right: currentLanguage === 'ar' ? '15px' : 'undefinied',





                                            }}  >
                                                <Colors
                                                    onBackgroundChange={onBackgroundChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Menu"
                                        style={{
                                            position: 'relative',
                                            top: '3px',
                                            right: currentLanguage === 'ar'
                                                ? isSmallScreen
                                                    ? '-18px'
                                                    : isTabletScreen
                                                        ? '-40px'
                                                        : '40px'
                                                : '40px',

                                        }}
                                    >
                                        <MenuOpenIcon onClick={onSidenavMobileToggle}
                                            sx={{
                                                color: 'white',
                                                fontSize: '30px',
                                                cursor: 'pointer',
                                                display: isTabletScreen ? 'flex' :
                                                    isSmallScreen ? 'flex' :

                                                        'none',
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Box>


        </>
    )
}

export default NavRespo
