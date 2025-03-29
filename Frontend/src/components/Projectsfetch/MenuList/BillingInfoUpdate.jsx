import React, { useEffect, useState, useRef } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';








function BillingInfoUpdate({ HandleUpdateClose, onAddCardClick1, onCloseClick }) {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);



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

            <Tabs TABS={TABS} HandleUpdateClose={HandleUpdateClose}  selected={selected} setSelected={setSelected} onAddCardClick1={onAddCardClick1} />





        </div>
    );
};


const Tabs = ({ HandleUpdateClose, TABS, selected, setSelected, logoPath, onAddCardClick1, onLogoClick, onCloseClick }) => {
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
                {selected && <Content HandleUpdateClose={HandleUpdateClose}  logoPath={logoPath} onLogoClick={onLogoClick} dir={dir} selected={selected} TABS={TABS} onAddCardClick1={onAddCardClick1} />}
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

const Content = ({ HandleUpdateClose,  selected, dir, TABS, onAddCardClick1, onLogoClick, logoPath, onCloseClick }) => {


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
                    width: isSmallScreen? '85vw' :
                    isMediumScreen? '60vw' :
                     '40vw',
                    padding: "1rem",
                    height: isSmallScreen? '472px' :
                    isMediumScreen? '490px' :
                     '445px',
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                                    <t.Component HandleUpdateClose={HandleUpdateClose}  onCloseClick={onCloseClick} logoPath={logoPath} onLogoClick={onLogoClick} onAddCardClick1={onAddCardClick1} />

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

const Pricing = ({ HandleUpdateClose, onCloseBillingUpdate }) => {



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
                top: '-30px',
                marginLeft: '-2px',
                alignItems: 'center',



            }}
        >
            <div className='ClosingIcon'
                onClick={HandleUpdateClose}
                style={{
                    position: 'absolute',
                    right: currentLanguage === 'ar' ? '95.5%' :
                    isSmallScreen? '-4%' :
                     '0%',
                    top: isSmallScreen? '20px' :
                    isMediumScreen? '22px' :
                     '40px',
                    zIndex: '22222',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                <CloseIcon sx={{ fontSize : isSmallScreen? '17px' : '20px', }} />
            </div>
            <div className='ProfileCircle' style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #ccc',
                position: 'absolute',
                top: '-30px',
            }}>
                <img src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg" alt="Profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        textAlign: 'center',
                    }}
                />
            </div>
            <div className="Hello"
                style={{
                    position: 'absolute',
                    top: isMediumScreen && currentLanguage === 'ar'? '72px' : '65px',

                }}
            >
                <Typography
                    sx={{
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                         textAlign : 'center',
                    }}
                >
                    {t("Hello Nabil ! Let's update your billing information.")}

                </Typography>
            </div>
            {currentLanguage === 'fr' ? (
                <div className="Inputs"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        gap: '10px',
                        width: '90%',
                        top: '100px',
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Nom de l'entreprise"
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Background of the input field
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Text color of the input
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Color of the label in normal state
                            },
                            '& .MuiInputLabel-shrink': {
                                color: 'white', // Color of the label when it shrinks (floats)
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                     <TextField
                        id="standard-basic"
                        label="Adresse e-mail"
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Background of the input field
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Text color of the input
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Color of the label in normal state
                            },
                            '& .MuiInputLabel-shrink': {
                                color: 'white', // Color of the label when it shrinks (floats)
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                      <TextField
                        id="standard-basic"
                        label="Numéro de TVA"
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Background of the input field
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Text color of the input
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Color of the label in normal state
                            },
                            '& .MuiInputLabel-shrink': {
                                color: 'white', // Color of the label when it shrinks (floats)
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                       <TextField
                        id="standard-basic"
                        label="Pays"
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Background of the input field
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Text color of the input
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Color of the label in normal state
                            },
                            '& .MuiInputLabel-shrink': {
                                color: 'white', // Color of the label when it shrinks (floats)
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                         <TextField
                        id="standard-basic"
                        label="Adresse"
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Background of the input field
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // Text color of the input
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Color of the label in normal state
                            },
                            '& .MuiInputLabel-shrink': {
                                color: 'white', // Color of the label when it shrinks (floats)
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    /> 

                </div>
            ) : (
                <div className="Inputs"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        gap: isSmallScreen && currentLanguage === 'ar'? '15px' : '10px',
                        width: '90%',
                        top: isSmallScreen? '120px' :
                        isMediumScreen? '110px' :
                         '100px',
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label={t("Company Name")}
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                marginTop : currentLanguage === 'ar'? '0px' :
                                  isMediumScreen && currentLanguage === 'ar'? '5px' :
                                isSmallScreen && currentLanguage === 'ar'? '0px' :
                                isMediumScreen? '-15px' :
                                 isSmallScreen? '-20px' :
                                 '-20px',

                            },
                            '& .MuiInputLabel-root': {
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                            },
                            '& .MuiInputLabel-shrink': {
                                color: currentLanguage === 'ar'? 'white' : 'red',
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '-30%' : 'unset',
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white',
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        label={t("Email Address")}
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                marginTop : currentLanguage === 'ar'? '0px' :
                                  isMediumScreen && currentLanguage === 'ar'? '5px' :
                                isSmallScreen && currentLanguage === 'ar'? '0px' :
                                isMediumScreen? '-15px' :
                                 isSmallScreen? '-20px' :
                                 '-20px',

                            },
                            '& .MuiInputLabel-root': {
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            },
                            '& .MuiInputLabel-shrink': {
                                color: currentLanguage === 'ar'? 'white' : 'red',
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '-32%' : 'unset',
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Label text color
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        label={t("Vat Number")}
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                marginTop : currentLanguage === 'ar'? '0px' : 
                                 isMediumScreen && currentLanguage === 'ar'? '5px' :
                                isSmallScreen && currentLanguage === 'ar'? '0px' :
                                isMediumScreen? '-15px' :
                                 isSmallScreen? '-20px' :
                                 '-20px',

                            },
                            '& .MuiInputLabel-root': {
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            },
                            '& .MuiInputLabel-shrink': {
                                color: currentLanguage === 'ar'? 'white' : 'red',
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '-32%' : 'unset',
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white', // Label text color
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        label={t("Country")}
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                marginTop : currentLanguage === 'ar'? '0px' :
                                 isMediumScreen && currentLanguage === 'ar'? '5px' :
                                isSmallScreen && currentLanguage === 'ar'? '0px' :
                                isMediumScreen? '-15px' :
                                 isSmallScreen? '-20px' :
                                 '-20px',
                            },
                            '& .MuiInputLabel-root': {
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            },
                            '& .MuiInputLabel-shrink': {
                                color:  currentLanguage === 'ar'? 'white' :'red',
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '-32%' : 'unset',
                            },

                            '& .MuiFormLabel-root': {
                                color: 'white', // Label text color
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        label={t("Addresse")}
                        variant="standard"
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                                marginTop : currentLanguage === 'ar'? '0px' :
                                 isMediumScreen && currentLanguage === 'ar'? '5px' :
                                isSmallScreen && currentLanguage === 'ar'? '0px' :
                                isMediumScreen? '-15px' :
                                 isSmallScreen? '-20px' :
                                 '-20px',

                            },
                            '& .MuiFormLabel-root': {
                                color:  'white', // Label text color
                            },

                            '& .MuiInputLabel-root': {
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '0%' : 'unset',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            },
                            '& .MuiInputLabel-shrink': {
                                color: currentLanguage === 'ar'? '#fff' : 'white',
                                position: currentLanguage === 'ar' ? 'absolute' : 'unset',
                                right: currentLanguage === 'ar' ? '-32%' : 'unset',
                            },
                            '& .MuiInput-underline:before': {
                                borderBottomColor: 'white', // Normal underline color
                            },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'white', // Hover underline color
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // Focus underline color
                            },
                        }}
                    />

                </div>
            )}
            <div className="button">
                <Button variant="outlined" className='btn-grad'
                    sx={{
                        width: '100%',
                        position: 'absolute',
                        top: isSmallScreen? '435px' :
                        isMediumScreen? '450px' :
                         '408px',
                        right: '0%',
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
                        {t('Update')}
                    </Typography>
                </Button>
            </div>







        </div >
    );
}

export default BillingInfoUpdate
