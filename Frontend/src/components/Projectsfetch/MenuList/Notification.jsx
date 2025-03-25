import React, { useEffect, useState, useRef } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast, ToastContainer } from 'react-toastify';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SystemIcon from '@mui/icons-material/SettingsSystemDaydream';
import Badge from '@mui/material/Badge';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useUser } from '../../../Context/UserContext.jsx'
import { useNotifications } from '../../../Context/NotificationContext.jsx'














function Notification({ handleDrawerClose, isOpen }) {
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
                        overflow: 'hidden',
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
            <Tabs TABS={TABS} selected={selected} setSelected={setSelected} />
            <div
                style={{
                    position: 'relative',
                    opacity: '0',
                    left: '400px',
                    zIndex: '1111'
                }}
            >
                <Content selected={selected} dir="ltr" TABS={TABS} handleDrawerClose={handleDrawerClose} />

            </div>

        </div>
    );
};
const Tabs = ({ TABS, selected, setSelected }) => {
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
                {selected && <Content dir={dir} selected={selected} TABS={TABS} />}
            </AnimatePresence>
        </div>
    );
};

const Tabe = ({ children, tab, handleSetSelected, selected }) => {
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
const Tab = ({ children, tab, handleSetSelected, selected }) => {
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

const Content = ({ selected, dir, TABS, handleDrawerClose, isOpen, }) => {
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
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');



    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]); // Update  

    const [selected1, setSelected1] = useState(null);

    const handleTabClick = (tabId) => {
        if (selected1 === tabId) {
            setSelected(null);
        } else {
            setSelected1(tabId);
        }
    };

    const handleNotificationClick = (event) => {
        event.stopPropagation(); // Prevents closing when clicking on the notification icon
    };
    return (

        <div className='Motion1'>

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
                    position: "absolute",
                    right: currentLanguage === 'ar' ? 'calc(50% - 260px)' : 'calc(50% - 552px)',
                    top: '-108px',
                    width: '15rem',
                    padding: "1rem",
                    height: 'auto',
                    zIndex: '10',
                    borderRadius: '16px',



                }}
            >


                {/* Line indicator */}
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
                    zIndex: -1
                }} />
                {/* Arrow indicator */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-30px',
                        left: currentLanguage === 'ar' ? 'calc(100% - 205px)'
                            : '166px',
                        transform: 'translateY(50%)',
                        width: '0',
                        height: '0',
                        borderTop: '10px solid transparent',
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderBottom: '10px solid white', // Adjust color and transparency as needed
                        zIndex: '5',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '50%',  // Adjust top position as needed
                        left: currentLanguage === 'ar' ? 'calc(100% - 10px)' : '10px', // Position based on language direction
                        transform: 'translateY(-50%)',
                        width: '1px', // Adjust width as needed
                        height: 'calc(100% - 30px)', // Adjust height as needed
                        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Example background color
                        zIndex: '5', // Ensure it's behind your content
                    }}
                />



                {TABS.map((t) => {
                    return (
                        <div style={{ overflow: "hidden" }} key={t.id}>
                            {selected === t.id && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                                    }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                >
                                    <t.Component />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </motion.div>

        </div>
    );
};
const Bridge = () => (
    <div
        style={{ position: "absolute", top: "-24px", left: 0, right: 0, height: "24px" }}
    />
);

const Nub = ({ selected }) => {
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

const Pricing = () => {
    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);




    const navigate = useNavigate();


    const { user } = useUser();
    const { getTypeBadgeCount } = useNotifications();
    const systemUnreadCount = getTypeBadgeCount('system'); // Get unread count for 'system' type notifications
    const projectUnreadCount = getTypeBadgeCount('projects'); // Get unread count for 'system' type notifications



    return (

        <div className="line">
            <div className="Toast">
                <ToastContainer toastClassName="custom-toast"
                    toastStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: 'white',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                    }} />
            </div>
            <div className='NotList'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: '5px',
                    gap: '10px',

                    direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
                }}
            >
                <Button
                    onClick={() => {
                        navigate('/userdashboard/profile/settings', { state: { fromSystem: true } });
                        onClose();  // Close the notification list if applicable
                    }}
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.05)',  // Scale up by 5% on hover
                            transition: 'transform 0.2s ease-in-out',  // Smooth transition for scaling
                        }
                    }}
                >
                    <div className="System"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            color: 'white'
                        }}
                    >
                        <Badge
                              badgeContent={systemUnreadCount > 0 ? systemUnreadCount : null} 
                            color="error"
                            max={99}
                        >
                            <SystemIcon />
                        </Badge>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                                textWrap: 'nowrap',
                                textTransform: 'capitalize',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {t('System notifications')}
                        </Typography>
                    </div>
                </Button>

                <Button
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.05)',  // Scale up by 5% on hover
                            transition: 'transform 0.2s ease-in-out',  // Smooth transition for scaling
                        }
                    }}
                >
                    <div className="Projects"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            color: 'white',


                        }}
                    >
                          <Badge
                              badgeContent={projectUnreadCount > 0 ? projectUnreadCount : null} 
                            color="error"
                            max={99}
                        >
                            <RoomPreferencesIcon />
                        </Badge>
                        <Typography 
                            sx={{

                                fontWeight: 'bold',
                                fontSize: '13px',
                                textTransform: 'capitalize',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {t('Project Notifications')}
                        </Typography>


                    </div>
                </Button>
                <Button
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.05)',  // Scale up by 5% on hover
                            transition: 'transform 0.2s ease-in-out',  // Smooth transition for scaling
                        }
                    }}
                >
                    <div className="MSG"
                        style={{
                            display: 'flex',
                            gap: '10Px',
                            color: 'white'
                        }}
                    >
                        <CreditScoreIcon />
                        <Typography
                            sx={{

                                fontWeight: 'bold',
                                fontSize: '13px',
                                textTransform: 'capitalize',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            {t('payment Notifications')}
                        </Typography>


                    </div>
                </Button>


            </div>




        </div>
    );
}



export default Notification
