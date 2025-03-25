import React, { useEffect, useState, useRef } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import WifiIcon from '@mui/icons-material/Wifi';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import Fade from '@mui/material/Fade';
import CardSelect from './CardSelect';
import { textAlign } from '@mui/system';




function Cardsmenu({ onAddCardClick1, onLogoClick, logoPath }) {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const navigate = useNavigate();

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1400px)');

    const TABS = [
        {
            title: (
                <Typography
                    style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: 'white',

                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                >
                    {location.pathname === '/projects/categories/writing/writing-content' ? t('Content writing') :
                        location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing Articles') :
                            location.pathname === '/projects/categories/writing/content-editing' ? t('Content Edit') :
                                location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing Reports') :
                                    location.pathname === '/projects/categories/writing/research-scientific' ? t('Research Scientific') :
                                        location.pathname === '/projects/categories/writing/writing-online' ? t('Writing Online') :
                                            ''}
                </Typography>
            ),
            Component: Pricing,
        },
    ].map((n, idx) => ({ ...n, id: idx + 1 }));

    // Initialize selected tab to show by default
    const [selected, setSelected] = useState(1); // Set default selected tab here

    return (
        <div
            style={{
                display: "flex",
                height: "24rem",
                width: "100%",
                justifyContent: "start",
                padding: "2rem",
                color: "white",
            }}
            className="md:justify-center"
        >

            <Tabs TABS={TABS} logoPath={logoPath} onLogoClick={onLogoClick} selected={selected} setSelected={setSelected} onAddCardClick1={onAddCardClick1} />





        </div>
    );
};


const Tabs = ({ TABS, selected, setSelected, logoPath, onAddCardClick1, onLogoClick }) => {
    const [dir, setDir] = useState(null);

    const handleSetSelected = (val) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }

        setSelected(val);
    };

    return (
        <div
            style={{ position: "relative", display: "flex", height: "fit-content", gap: "0.5rem" }}
        >
            {TABS.map((t) => {
                return (
                    <Tab
                        key={t.id}
                        selected={selected}
                        handleSetSelected={handleSetSelected}
                        tab={t.id}
                    >
                        {t.title}
                    </Tab>
                );
            })}

            <AnimatePresence>
                {selected && <Content logoPath={logoPath} onLogoClick={onLogoClick} dir={dir} selected={selected} TABS={TABS} onAddCardClick1={onAddCardClick1} />}
            </AnimatePresence>
        </div>
    );
};

const Tabe = ({ children, tab, handleSetSelected, selected, onAddCardClick1 }) => {
    return (
        <button
            onClick={() => handleSetSelected(tab)}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                borderRadius: "9999px",
                padding: "0.375rem 0.75rem",
                fontSize: "0.875rem",
                transition: "color 0.2s",
                border: '1px white solid',
                background: 'transparent',
                color: selected === tab ? "#f5f5f5" : "#9ca3af",
            }}
        >

            <FiChevronDown
                style={{
                    transition: "transform 0.2s",
                    transform: selected === tab ? "rotate(180deg)" : "rotate(0deg)",
                }}
            />
        </button>
    );
};
const Tab = ({ children, tab, handleSetSelected, selected, onAddCardClick1 }) => {
    return (
        <button
            id={`shift-tab-${tab}`}
            onMouseEnter={() => handleSetSelected(tab)}
            onClick={() => handleSetSelected(tab)}
            style={{

                display: 'none'
            }}
        >


        </button>
    );
};

const Content = ({ selected, dir, TABS, onAddCardClick1, onLogoClick, logoPath }) => {


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
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isSmallScreen1 = useMediaQuery('(max-width:400px)');
    const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');




    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]); // Update  


    return (

        <div className='Motion1 '
            style={{

            }}
        >

            <motion.div className="Nabil"
                id="overlay-content"
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: 8,
                }}
                style={{
                    width: isSmallScreen ? '93vw' :
                    isMediumScreen? '80vw' :
                     '50vw',
                     maxWidth :'740px',
                    padding: "1rem",
                    height: isSmallScreen ? '410px' : '370px',
                    zIndex: '11110',
                    borderRadius: '16px',


                }}
            >


                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: '-1',

                }} />



                {TABS.map((t) => {
                    return (
                        <div style={{}} key={t.id}>
                            {selected === t.id && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                                    }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                >
                                    <t.Component logoPath={logoPath} onLogoClick={onLogoClick} onAddCardClick1={onAddCardClick1} />

                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </motion.div>

        </div>
    );
};

const Bridge = ({ onAddCardClick1 }) => (
    <div
        style={{ position: "absolute", top: "-24px", left: 0, right: 0, height: "24px" }}
    />
);

const Nub = ({ selected, onAddCardClick1 }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        moveNub();
    }, [selected]);

    const moveNub = () => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");

            if (!hoveredTab || !overlayContent) return;

            const tabRect = hoveredTab.getBoundingClientRect();
            const { left: contentLeft } = overlayContent.getBoundingClientRect();

            const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

            setLeft(tabCenter);
        }
    };

    return (
        <motion.span
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
                position: "absolute",
                top: 0,
                height: "1rem",
                display: 'none',
                width: "1rem",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
                borderRadius: "0.25rem 0 0 0",
                backgroundColor: "#1c1c1e",
            }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
        />
    );
};

const Pricing = ({ handleDrawerClose, onAddCardClick1, onLogoClick, logoPath }) => {



    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');



    const handleMenuItemClick1 = (cardType) => {
        setSelectedCard(cardType);
        handleClose1();
    };

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu1 = () => {
        setIsProfileMenuOpen((prev) => !prev);
    };

    const handleCloseProfileMenu1 = () => {
        setIsProfileMenuOpen(false);
    };
    const [isNotMenuOpen, setIsNotMenuOpen] = useState(false);





    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);






    const formatCardNumber = (number) => {
        // Remove non-digit characters and limit to 16 digits
        const cleanedNumber = number.replace(/\D/g, '').slice(0, 16);
        // Format with spaces every 4 digits
        return cleanedNumber.replace(/(.{4})/g, '$1 ').trim();
    };
    const displayCvv = cvv.replace(/./g, '*');


    const [anchorEl, setAnchorEl] = React.useState(null);


    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [logoSrc, setLogoSrc] = React.useState('https://res.cloudinary.com/damicjacf/image/upload/v1722793929/dahabiya-removebg-preview_qmce2d.png');
    const handleMenuItemClick = (logoUrl) => {
        setLogoSrc(logoUrl);
        handleClose(); // Close the menu after selection
    };



    return (

        <div className="Container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative',
                marginLeft: '-2px',
                alignItems: 'center',



            }}
        >
            <div className='ClosingIcon'
                onClick={onAddCardClick1}
                style={{
                    position: 'absolute',
                    right: currentLanguage === 'ar' ? '95.5%' : '0%',
                    top: '5%',
                    zIndex: '22222',
                    display: isSmallScreen ? 'none' : 'unset',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                <CloseIcon sx={{ fontSize: '20px' }} />
            </div>

            <div className="DahabiyaCard"
                style={{
                    width: isSmallScreen ? '95%' : '65%',
                    height: '210px',
                    background: 'linear-gradient(195deg, #323a54, #111827)',
                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                    marginTop: '12px',
                    position: 'relative',
                    top: '-130px',
                    backgroundImage: `url('https://i.ibb.co/PYss3yv/map.png'), linear-gradient(45deg, #0045c7, #ff2c7d)`,
                    backgroundSize: 'cover, cover',
                    backgroundBlendMode: 'overlay',
                    borderRadius: '0.75rem',
                    border: '0 solid rgba(0, 0, 0, 0.125)'
                }}
            >
                <div className="CardContainer"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '20px',
                    }}
                >
                    <div className="Wifi "
                        style={{
                            marginTop: '1px',
                            marginLeft: '10px',
                            marginRight: currentLanguage === 'ar' ? '20px' : 'unset',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width:currentLanguage === 'fr'? '93%' : currentLanguage === 'ar'? '97%' : isLargeScreen? '96%' : 
                     
                            isSmallScreen? '89%' :
                            isMediumScreen? '98%' :
                            '103%',
                        }}
                    >
                        <WifiIcon sx={{ color: 'white' }} />


                        <div className="logo" onClick={handleClick}
                        style={{
                           
                            alignItems : 'center',
                           
                            position : 'relative',

                        }}
                         >
                             
                          

                            <CardSelect/>




                        </div>




                   
                    </div>
                    <div className="CardNumber"
                        style={{
                            marginTop: '20px',
                            marginRight: currentLanguage === 'ar' ? '20px' :
                             'unset',
                               marginLeft : isSmallScreen? '15px' : 'unset',
                        }}
                    >
                        <Typography sx={{
                            color: 'white',
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            textWrap : isSmallScreen && currentLanguage === 'ar'? 'nowrap' : 'unset',
                            letterSpacing: '1.5px',
                            marginLeft : isSmallScreen && currentLanguage === 'fr'? '-10px' : 'unset',
                            wordSpacing: '8px',
                        }} >
                            {formatCardNumber(cardNumber) || '#### #### #### ####'}
                        </Typography>
                        <div className="CardNameEXP "
                            style={{
                                marginTop: '50px',
                                display: 'flex',
                                padding: '15px',
                                marginRight: currentLanguage === 'ar' && isSmallScreen ? '-25px' : 'unset',
                                alignItems: 'center',
                                position: 'relative',
                                left:isSmallScreen && currentLanguage === 'fr'? '-35px' : currentLanguage === 'ar' && isSmallScreen ? '5px' :

                                    'unset',
                                right: currentLanguage === 'ar' ? '-2%' :
                                    isSmallScreen ? '10%' :
                                        '3%',
                                width: '120%',
                                justifyContent: 'space-between',

                            }}>

                            <div className='Cardname'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    position: 'absolute',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100px',
                                }}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        letterSpacing: '0.02857em',
                                        opacity: '0.8',
                                        fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                                    }}>
                                    {t('Card Holder')}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        letterSpacing: '0.02857em',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        textAlign: 'center',
                                    }}>
                                    {cardHolder || '####'}
                                </Typography>
                            </div>

                            <div className='CardEXP '
                                style={{
                                    marginLeft: isSmallScreen ? '20px' : 'unset',
                                    right: currentLanguage === 'ar' && isSmallScreen ? '38%' :
                                        currentLanguage === 'ar' ? '32%' :
                                            'unset',
                                    left:isSmallScreen && currentLanguage === 'fr'? '30%' : isSmallScreen ? '35%' : 
                                    
                                    currentLanguage === 'fr'? '31%' :
                                    '40%',
                                    position: 'absolute',
                                    display : 'flex',
                                    flexDirection :'column',
                                  
                                }}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        letterSpacing: '0.02857em',
                                        opacity: '0.8',
                                        textWrap : 'nowrap',

                                        fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                                    }}>
                                   {currentLanguage === 'fr' ? "Date D'exp" : t('Expires')}
                                </Typography>
                                <Typography 
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        letterSpacing: '0.02857em',
                                        fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                                         marginRight : isSmallScreen && currentLanguage === 'ar'? '15px' :
                                         currentLanguage === 'ar'? '-40px' :
                                          'unset',
                                          textAlign : 'center',
                                        textWrap : 'nowrap',
                                    }}>
                                    {`${expMonth || t('MM')}/${expYear || t('YY')}`}
                                </Typography>
                            </div>

                            <div className="Cvv"
                                style={{
                                    position: 'absolute',
                                    right: currentLanguage === 'ar' && isSmallScreen ? '78%' :

                                        currentLanguage === 'ar' ? '66%' :
                                            'unset',
                                    left: currentLanguage === 'ar'? '16%' : '70%',

                                }}
                            >
                                <Typography
                                    onClick={handleClick}
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        letterSpacing: '0.02857em',
                                        opacity: '0.8',
                                        textWrap: 'nowrap',
                                        fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                                        cursor: 'pointer',
                                    }}>
                                    {t('Cvv >')}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        letterSpacing: '0.02857em',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        marginRight : isSmallScreen && currentLanguage === 'ar'? '15px' :
                                        currentLanguage === 'ar'? '-15px' :
                                         'unset',

                                        fontSize: '16px',
                                    }}>
                                    {displayCvv || '***'}
                                </Typography>
                            </div>
                        </div>

                    </div>
                </div>



            </div>
            <div className="CardsINFO"
                style={{
                    position: 'absolute',
                    left: '1%',
                    top: '48%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',

                }}

            >
                <div class="form-input" style={{ width: '100%' }}>
                    <input
                        style={{ width: '100%', height: '50px' }}
                        type="text"
                        placeholder="Enter subtitle"
                        id="card-number"
                        value={formatCardNumber(cardNumber)}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    />
                    <label
                        for="card-number"
                        style={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            width: currentLanguage === 'fr'? '17%' : currentLanguage === 'ar' ? '14%' :
                                isSmallScreen ? '27%' :
                                    '15%',
                            right: currentLanguage === 'ar' ? '1%' : 'unset',
                            textWrap: 'nowrap',
                            background: 'rgba(0, 0, 0, 0.9)',
                            padding: currentLanguage === 'ar' ? '0 5px' : '0',
                            zIndex: '22',

                            pointerEvents: currentLanguage === 'ar' ? 'none' : 'auto', // Disable pointer events if needed
                        }}
                    >
                        {t('Card Number')}
                    </label>
                </div>


                <div class="form-input" style={{ width: '100%' }}>
                    <input
                        style={{ width: '100%', height: '50px' }}
                        type="text"
                        placeholder="Enter subtitle"
                        id="subtitle"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                    />
                    <label
                        for="subtitle"
                        style={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            width: currentLanguage === 'fr'? '12%' : currentLanguage === 'ar' ? '14%' :
                                isSmallScreen ? '25%' :
                                    '14%',
                            right: currentLanguage === 'ar' ? '1%' : 'unset',
                            textWrap: 'nowrap',
                            background: 'rgba(0, 0, 0, 0.9)',
                            padding: currentLanguage === 'ar' ? '0 5px' : '0', // Optional padding to cover input border
                            zIndex: '22',
                            pointerEvents: currentLanguage === 'ar' ? 'none' : 'auto', // Disable pointer events if needed
                        }}
                    >
                        {t('Card Holder')}
                    </label>
                </div>

                <div className="3Inputs" style={{ display: 'flex', gap: '10px' }}>
                    <div class="form-input" style={{ width: '100%' }}>
                        <input
                            style={{ width: '100%', height: '50px' }}
                            type="text"
                            placeholder="Enter subtitle"
                            id="subtitle"
                            value={expMonth}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,2}$/.test(value)) {
                                    setExpMonth(value);
                                }
                            }}
                        />
                        <label
                            for="subtitle"
                            style={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                width: currentLanguage === 'ar' ? '45%' :
                                    isSmallScreen ? '56%' :
                                        '47%',
                                right: currentLanguage === 'ar' ? '1%' : 'unset',
                                textWrap: 'nowrap',
                                background: 'rgba(0, 0, 0, 0.9)',
                                padding: currentLanguage === 'ar' ? '0 5px' : '0', // Optional padding to cover input border
                                zIndex: '22',
                                pointerEvents: currentLanguage === 'ar' ? 'none' : 'auto', // Disable pointer events if needed
                            }}
                        >
                            {isSmallScreen ? t('Exp mm') : t('Expiration mm')}
                        </label>
                    </div>
                    <div class="form-input" style={{ width: '100%' }}>
                        <input
                            style={{ width: '100%', height: '50px' }}
                            type="text"
                            placeholder="Enter subtitle"
                            id="subtitle"
                            value={expYear}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,2}$/.test(value)) {
                                    setExpYear(value);
                                }
                            }}
                        />
                        <label
                            for="subtitle"
                            style={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                width: currentLanguage === 'ar' ? '45%' : '47%',
                                right: currentLanguage === 'ar' ? '1%' : 'unset',
                                textWrap: 'nowrap',
                                background: 'rgba(0, 0, 0, 0.9)',
                                padding: currentLanguage === 'ar' ? '0 5px' : '0', // Optional padding to cover input border
                                zIndex: '27',
                                pointerEvents: currentLanguage === 'ar' ? 'none' : 'auto', // Disable pointer events if needed
                            }}
                        >
                            {isSmallScreen ? t('Exp yy') : t('Expiration yy')}
                        </label>
                    </div>
                    <div class="form-input" style={{ width: '100%' }}>
                        <input
                            style={{ width: '100%', height: '50px' }}
                            type="password"
                            placeholder="Enter subtitle"
                            id="subtitle"
                            value={cvv}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,4}$/.test(value)) {
                                    setCvv(value);
                                }
                            }}
                        />
                        <label
                            for="subtitle"
                            style={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                width: currentLanguage === 'ar' ? '36%' :
                                    isSmallScreen ? '30%' :
                                        '18%',
                                right: currentLanguage === 'ar' ? '1%' : 'unset',
                                textWrap: 'nowrap',
                                background: 'rgba(0, 0, 0, 0.8)',
                                padding: currentLanguage === 'ar' ? '0 5px' : '0', // Optional padding to cover input border
                                zIndex: '22',
                                pointerEvents: currentLanguage === 'ar' ? 'none' : 'auto', // Disable pointer events if needed
                            }}
                        >
                            {t('Cvv')}
                        </label>
                    </div>
                </div>

                <div className="SubmitBtn">
                    <div className="button">
                        <Button variant="outlined" className='btn-grad'
                            sx={{
                                width: '100%',
                                position: 'relative',
                                height: '38px',

                                borderColor: 'none', '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',

                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    fontSize: '13px',

                                }}
                            >
                                {t('Add')}
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div className="ExitBtn">
                    <div className="button">
                        <Button variant="outlined" className='btn-grad'
                            onClick={onAddCardClick1}
                            sx={{
                                width: '100%',
                                position: 'relative',
                                height: '38px',
                                marginTop: '-10px',
                                display: isSmallScreen ? 'normal' : 'none',
                                borderColor: 'none', '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',

                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    fontSize: '13px',

                                }}
                            >
                                {t('Exit')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default Cardsmenu
