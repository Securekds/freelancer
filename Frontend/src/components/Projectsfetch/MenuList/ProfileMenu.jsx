import React, { useEffect, useState, useRef } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast, ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import EditOffIcon from '@mui/icons-material/EditOff';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';












function ProfileMenu({ handleDrawerClose, isOpen, onClose, handleClose1, handleClose }) {
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
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);

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
                <Content selected={selected} dir="ltr" TABS={TABS} handleClose1={handleClose1} />

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

const Content = ({ selected, dir, TABS, handleDrawerClose, isOpen, onClose, handleClose1, handleClose }) => {
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
    const isScreenUnder500px = useMediaQuery('(max-width:500px)');
    const isScreenUnder390px = useMediaQuery('(max-width:390px)');
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

    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);
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
                        width: '13rem',
                        padding: "1rem",
                        height: 'auto',
                        zIndex: '10',
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
                        zIndex: -1
                    }} />
                    {/* Arrow indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-30px',
                            left: currentLanguage === 'ar' ? 'calc(100% - 110px)' 
                            : '95px', 
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

const Pricing = ({ handleClose }) => {
    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);



    const [inputLink, setInputLink] = useState('https://localhost:5173/post/Nabil');
    const textFieldRef = useRef(null);

    const handleCopyClick = async () => {
        if (textFieldRef.current) {
            const linkToCopy = textFieldRef.current.value;

            try {
                await navigator.clipboard.writeText(linkToCopy);
                toast.success('Link copied to clipboard!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 9000,
                    style: {
                        background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                        color: 'white',
                    },
                    icon: <IconWhite />,
                    closeButton: <CloseButtonWhite />,
                });
            } catch (error) {
                console.error('Error copying: ', error);
                toast.error('Failed to copy link!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                });
            }
        }
    };
    const IconWhite = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14H8v-2h2v2zm0-4H8V7h2v5zm6 4h-3v-2h2v-2h-2v-2h3V7h-5v10h5v2z" />
        </svg>
    );

    const notify = () => toast.success('Link Copied !');


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
            <div className="Profile"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '1px', // Adjust the gap as needed
                    position: 'relative',
                    direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',

                }}
            >
                <div className='Cirlce'
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    {/* Active Badge */}
                    <Box
                        sx={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#4CAF50',
                            position: 'absolute',
                            top: '35px', // Position above the circle
                            right: '0', // Position at the right of the circle
                            zIndex: 1,

                            border: '2px solid white',
                        }}
                    />

                    {/* Profile Image */}
                    <div className='ProfileCircle' style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid #ccc',
                    }}>
                        <img src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg" alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
                <div className='Typos' >
                    <Typography
                        sx={{
                            marginTop: '8px', // Adjust as needed for spacing
                            textAlign: 'center',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Nabil Hamici')}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#cecece',
                            fontSize: '13px',
                            opacity: '0.5',
                            textAlign: 'center',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Websites Developer')}
                    </Typography>
                </div>
                <div className="LINE"
                    style={{
                        width: '90%',
                        marginTop: '15px',
                        height: '0.5px',
                        background: '#cecece',
                        opacity: '0.4',
                    }}
                >

                </div>
                <div className="Edit"
                    style={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'flex-start', // Align to the left
                        alignItems: 'center', // Center vertically
                        width: '100%', // Take full width
                        paddingLeft: '10px', // Add some left padding if needed
                        marginTop: '15px', // Add some top margin if needed
                        cursor: 'pointer',
                    }}
                >
                    <EditOffIcon sx={{ fontSize: '22px', }} />
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Edit profile')}
                    </Typography>
                </div>
                <div className="LINE"
                    style={{
                        width: '90%',
                        marginTop: '15px',
                        height: '0.5px',
                        background: '#cecece',
                        opacity: '0.4',
                    }}
                >

                </div>
                <div className="Settings"
                    style={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'flex-start', // Align to the left
                        alignItems: 'center', // Center vertically
                        width: '100%', // Take full width
                        paddingLeft: '10px', // Add some left padding if needed
                        marginTop: '15px', // Add some top margin if needed
                        cursor: 'pointer',
                    }}
                >
                    <SettingsSuggestIcon sx={{ fontSize: '25px', }} />
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Settings')}
                    </Typography>
                </div>
                <div className="LINE"
                    style={{
                        width: '90%',
                        marginTop: '15px',
                        height: '0.5px',
                        background: '#cecece',
                        opacity: '0.4',
                    }}
                >

                </div>
                <div className="Analystics"
                    style={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'flex-start', // Align to the left
                        alignItems: 'center', // Center vertically
                        width: '100%', // Take full width
                        paddingLeft: '10px', // Add some left padding if needed
                        marginTop: '15px', // Add some top margin if needed
                        cursor: 'pointer',
                    }}
                >
                    <AutoGraphIcon sx={{ fontSize: '25px', }} />
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Analystics')}
                    </Typography>
                </div>
                <div className="LINE"
                    style={{
                        width: '90%',
                        marginTop: '15px',
                        height: '0.5px',
                        background: '#cecece',
                        opacity: '0.4',
                    }}
                >

                </div>
                <div className="Help"
                    style={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'flex-start', // Align to the left
                        alignItems: 'center', // Center vertically
                        width: '100%', // Take full width
                        paddingLeft: '10px', // Add some left padding if needed
                        marginTop: '15px', // Add some top margin if needed
                        cursor: 'pointer',
                    }}
                >
                    <SupportAgentIcon sx={{ fontSize: '25px', }} />
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Help & Support')}
                    </Typography>
                </div>

            </div>





        </div>
    );
}



export default ProfileMenu
