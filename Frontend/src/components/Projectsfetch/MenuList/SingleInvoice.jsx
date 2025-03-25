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




function SingleInvoice({ onAddCardClick1, onLogoClick, logoPath }) {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const navigate = useNavigate();



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
                        isMediumScreen ? '80vw' :
                            '90vw',
                    padding: "1rem",
                    height: isSmallScreen ? '410px' : '550px',
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
                flexDirection: 'column',
                position: 'relative',




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


            <div className="KhadamatLogo"
                style={{
                    position: 'absolute',
                    left: '-2%',
                    top: '-30px',
                }}
            >
                <img width={'210px'} src="https://res.cloudinary.com/damicjacf/image/upload/v1720192174/Newlogo_igqvci.png" alt="" srcset="" />

            </div>
            <div className="CompanyInfo"

                style={{
                    position: 'absolute',
                    top: '120px',
                    left: '1%',
                    width: '98%',
                    display: 'flex',
                    flexDirection: 'row', // Changed from 'column' to 'row'
                    justifyContent: 'space-between', // Distribute space between the two divs
                    alignItems: 'center', // Vertically align items
                }}
            >
                <div>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Khadamat Platform
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Rue Amir A'Ek Boumedfaa, Ain-Defla
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        khadmatplatfrom@khadamat.com
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        +213 06-55-85-41-20
                    </Typography>
                </div>
                <div
                    className="DAte"
                    style={{
                        display: 'flex',
                        flexDirection: 'column', // Ensure the dates stack vertically
                        alignItems: 'flex-end', // Align to the right
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Date : 03/8/2023
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Due Date : 10/8/2023
                    </Typography>
                </div>
            </div>

            <div className="Content "
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '98%',
                    position: 'absolute',
                    height: 'auto',
                    top: '230px',
                    left: '1%',
                }}
            >
                <div className="ClientINfo"
                    style={{
                        width: '30%',
                        height: '130px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '10px',
                        boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',

                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '15px',
                        }}
                    >
                        Client Inforamtion :
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        Nabil Hamici
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        Canada , Montreal Rue SantDefin 2334
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        +234 556-557-343
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        ilyesdaniplo33@gmail.com
                    </Typography>

                </div>
                <div className="ProjectINfo"
                    style={{
                        width: '30%',
                        height: '130px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '10px',
                        boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                        gap: '5px',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '15px',
                        }}
                    >
                        Order Inforamtion :
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        Project Type : Web-development
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',

                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: '#ffffffcc',
                            }}
                        >
                            Status :
                        </Typography>
                        <div className="ICN"
                            style={{
                                width: '50px',
                                backgroundColor: '#c2fbd7',
                                color: 'green',
                                display: 'flex',
                                justifyContent: 'center',
                                borderRadius: '50rem',
                                marginLeft: '10px',
                            }}
                        >
                            <Typography>
                                Paid
                            </Typography>
                        </div>

                    </div>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        Id : #23343
                    </Typography>

                </div>
                <div className="IdINfo"
                    style={{
                        width: '30%',
                        height: '130px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '10px',
                        boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                        }}
                    >
                        INVOICE NUMBER # 1343434544433
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#ffffffcc',
                            marginTop: '10px',
                        }}
                    >
                        TOTAL DUE : 53900 DZA
                    </Typography>
                    <div class="area" >
                        <ul class="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div >
                </div>

            </div>


        </div>
    );
}

export default SingleInvoice
