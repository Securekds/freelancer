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
import Lottie from 'lottie-react';
import HttpsIcon from '@mui/icons-material/Https';
import animationData from '../../../assets/images/small-logos/SuccesID.json'
import animationData2 from '../../../assets/images/small-logos/SystemID.json'
import CountrySelect from './CountrySelect';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useUser } from '../../../Context/UserContext.jsx'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';






const safeStringify = (obj) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return;
            seen.add(value);
        }
        return value;
    });
};


function VerificationId({ currentCoverImg, onUpdateCoverImage, handleCloseVerify, onAddCardClick1, onCloseClickBilling, setCoverPhoto, onCloseClick }) {
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

            <Tabs TABS={TABS} onUpdateCoverImage={onUpdateCoverImage} currentCoverImg={currentCoverImg} handleCloseVerify={handleCloseVerify} onCloseClickBilling={onCloseClickBilling} onCloseClick={onCloseClick} selected={selected} setSelected={setSelected} onAddCardClick1={onAddCardClick1} />





        </div>
    );
};


const Tabs = ({ onUpdateCoverImage, currentCoverImg, handleCloseVerify, onCloseClickBilling, TABS, selected, setSelected, logoPath, onAddCardClick1, onLogoClick, onCloseClick, setCoverPhoto }) => {
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
                {selected && <Content currentCoverImg={currentCoverImg} onUpdateCoverImage={onUpdateCoverImage} handleCloseVerify={handleCloseVerify} onCloseClickBilling={onCloseClickBilling} onCloseClick={onCloseClick} logoPath={logoPath} onLogoClick={onLogoClick} dir={dir} selected={selected} TABS={TABS} onAddCardClick1={onAddCardClick1} />}
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

const Content = ({ currentCoverImg, onUpdateCoverImage, handleCloseVerify, onCloseClickBilling, selected, dir, TABS, onAddCardClick1, onLogoClick, logoPath, onCloseClick }) => {


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
                    width: isSmallScreen ? '85vw' :
                        isMediumScreen ? '60vw' :
                            '40vw',
                    padding: "1rem",
                    height: isSmallScreen && currentLanguage === 'ar' ? '510px' :
                        isSmallScreen ? '500px' :
                            isMediumScreen ? '510px' :
                                '530px',
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
                                    <t.Component onUpdateCoverImage={onUpdateCoverImage} currentCoverImg={currentCoverImg} handleCloseVerify={handleCloseVerify} onCloseClickBilling={onCloseClickBilling} onCloseClick={onCloseClick} logoPath={logoPath} onLogoClick={onLogoClick} onAddCardClick1={onAddCardClick1} />

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

const Pricing = ({ handleCloseVerify, onUpdateCoverImage, currentCoverImg }) => {



    const [cvv, setCvv] = useState('');
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const isLargeScreen = useMediaQuery('(min-width:1025px) and (max-width:2000px)');









    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);




    const [isUploading, setIsUploading] = useState(false); // To track if upload is in progress
    const [startAnimation, setStartAnimation] = useState(false);


    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [imageSize, setImageSize] = useState('');
    const [fileToUpload, setFileToUpload] = useState(null);
    const [fileToUpload1, setFileToUpload1] = useState(null);




    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        console.log('File dropped');

        const file = event.dataTransfer.files[0];
        if (file) {
            console.log('Dropped file:', file.name, `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
        }
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        } else {
            console.log('Invalid file type. Only images are allowed.');
        }
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        console.log('File selected:', file ? file.name : 'No file selected');
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        } else {
            console.log('Invalid file type. Only images are allowed.');
            setErrorMessage('Invalid file type. Only images are allowed.');
        }
    };

    const processImage = async (file) => {
        console.log('Processing image:', file.name);
        setImage(URL.createObjectURL(file));
        setImageName(file.name);
        setImageSize((file.size / (1024 * 1024)).toFixed(2));
        setFileToUpload(file);

        // Start upload animation
        setIsUploading(true);
        setShowAnimation(true);

        // Simulate upload process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                // Keep animation showing for a brief moment after completion
                setTimeout(() => {
                    setShowAnimation(true);
                    setIsUploading(false);
                }, 1000); // Adjust this delay as needed
            }
        }, 100);
    };


    const [uploadedImageUrl2, setUploadedImageUrl2] = useState('');
    const fileInputRef2 = useRef(null);
    const [dragging2, setDragging2] = useState(false);
    const [loadingProgress2, setLoadingProgress2] = useState(0);
    const [image2, setImage2] = useState('');
    const [imageName2, setImageName2] = useState('');
    const [imageSize2, setImageSize2] = useState('');
    const [isUploading2, setIsUploading2] = useState(false);

    const handleClick2 = () => {
        if (fileInputRef2.current) {
            fileInputRef2.current.click();
        }
    };

    const handleDragOver2 = (event) => {
        event.preventDefault();
        setDragging2(true);
    };

    const handleDragLeave2 = () => {
        setDragging2(false);
    };

    const handleDrop2 = (event) => {
        event.preventDefault();
        setDragging(false);
        console.log('File dropped');

        const file = event.dataTransfer.files[0];
        if (file) {
            console.log('Dropped file:', file.name, `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
        }
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        } else {
            console.log('Invalid file type. Only images are allowed.');
        }
    };


    const handleFileSelect2 = async (event) => {
        const file = event.target.files[0];
        console.log('File selected:', file ? file.name : 'No file selected');
        if (file && file.type.startsWith('image/')) {
            processImage2(file);
        } else {
            console.log('Invalid file type. Only images are allowed.');
            setErrorMessage('Invalid file type. Only images are allowed.');
        }
    };

    const processImage2 = async (file) => {
        console.log('Processing image:', file.name);
        setImage2(URL.createObjectURL(file));
        setImageName2(file.name);
        setImageSize2((file.size / (1024 * 1024)).toFixed(2));
        setFileToUpload2(file);

        // Start upload animation
        setIsUploading2(true);
        setShowAnimation2(true);

        // Simulate upload process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setLoadingProgress2(progress);

            if (progress >= 100) {
                clearInterval(interval);
                // Keep animation showing for a brief moment after completion
                setTimeout(() => {
                    setShowAnimation2(true);
                    setIsUploading2(false);
                }, 1000); // Adjust this delay as needed
            }
        }, 100);
    };


    const [fileToUpload2, setFileToUpload2] = useState(null);
    const { user , updateUserVerificationStatus , setUser } = useUser();






    const [selected, setSelected] = useState('IDCard'); // Default selected item
    const [showAnimation, setShowAnimation] = useState(false);
    const [showAnimation2, setShowAnimation2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');




    const messages = {  
        IDCard: 'Take a photo of your ID card ',
        Residense: 'Take a photo of your Residence permit',
        Passport: 'Take a photo of your Passport',
        DrivingLCN: 'Take a photo of your Driving license',
    };

    const userId = user ? user._id : null;
    const [VerfiyId, setIsVerifyId] = useState(true);
    const [VerifySucces, setIsVerifySucces] = useState(false);

    const handleUpload = async () => {
        if (!fileToUpload || !fileToUpload2) {
            setErrorMessage('Please select both front and back images of your ID.');
            return;
        }
    
        setErrorMessage(''); // Clear any previous error
        setLoading(true);
    
        // Introduce a 2-second delay before starting the upload process
        setTimeout(async () => {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('idType', selected);  // ✅ 
            formData.append('idImages', fileToUpload); 
            formData.append('idImages', fileToUpload2); 
    
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/server/get/verifications/upload`, 
                    formData, {
                        withCredentials: true,
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
    
                console.log('Upload success:', response.data);
                
                // ✅ Update the user state using setUser
            setUser(prevUser => {
                const updatedUser = {
                    ...prevUser,
                    requests: [...(prevUser?.requests || []), response.data.request]
                };
                localStorage.setItem('userData', JSON.stringify(updatedUser)); // Sync localStorage
                return updatedUser;
            });

    
                setIsVerifyId(false);
                setIsVerifySucces(true);
            } catch (error) {
                console.error('Error uploading ID images:', error);
                setErrorMessage('Failed to upload images. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 2000); // ⏳ 2-second delay before starting the upload
    };
    
   

    useEffect(() => {
        if (VerifySucces) {
            setTimeout(() => {
                setStartAnimation(true);
            }, 2000); // 2 seconds delay
        }
    }, [VerifySucces]);



  



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
            {VerfiyId && (
                <>

                    <div className='ClosingIcon'
                        onClick={handleCloseVerify}
                        style={{
                            position: 'absolute',
                            right: currentLanguage === 'ar' ? '95.5%' :
                                isSmallScreen ? '-3%' :
                                    '0%',
                            top: isSmallScreen ? '20px' :
                                isMediumScreen ? '22px' :
                                    '40px',
                            zIndex: '22222',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <CloseIcon sx={{ fontSize: isSmallScreen ? '17px' : '20px', }} />
                    </div>
                    <div className="UploadTypo"
                        style={{
                            position: 'absolute',
                            left: '0%',
                            right: currentLanguage === 'ar' ? '0%' : 'unset',
                            top: '40px',
                            display: 'flex',
                            gap: '8px',
                            flexDirection: 'column',
                        }}
                    >
                        {errorMessage && (
                            <Typography color="error"
                                sx={{
                                    marginTop: '-17px',
                                    marginBottom: '-5px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                }}>
                                {t(errorMessage)}
                            </Typography>
                        )}

                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >
                            {t('Id Verification')}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                color: ' white',
                            }}
                        >
                            {t('The Conditions : ')}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                color: ' grey',
                            }}
                        >
                            {t('To serve you better we ask that you provide original identifying documents. This will secure your account in cases of account recovery. it also helps to ensure trust and reliability across our community.')}
                        </Typography>
                        <div className="DataSave"
                            style={{
                                width: '60%',
                                height: '34px',
                                position: 'absolute',
                                borderRadius: '10px',
                                padding: '8px',
                                background: '#194e3d',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                color: '#2df873',
                                top: '110%',


                            }}
                        >
                            <HttpsIcon sx={{ fontSize: '20px' }} />
                            <Typography
                                sx={{
                                    textwrap: 'nowrap',
                                    fontSize: '14px',
                                }}
                            >
                                All data is safely stored and encrypted
                            </Typography>



                        </div>
                    </div>
                    <div style={{ position: 'relative', width: '95%' }}>
                        <div className="ID-Prof"

                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                position: 'absolute',
                                top: '230px',
                            }}
                        >
                            <div
                                className="IDCard"
                                onClick={() => setSelected('IDCard')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Typography>ID card</Typography>
                            </div>
                            <div
                                className="Residense"
                                onClick={() => setSelected('Residense')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Typography>Residence permit</Typography>
                            </div>
                            <div
                                className="Passport"
                                onClick={() => setSelected('Passport')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Typography>Passport</Typography>
                            </div>
                            <div
                                className="Driving-LCN"
                                onClick={() => setSelected('DrivingLCN')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Typography>Driver's license</Typography>
                            </div>
                        </div>

                        <div className="UnderLine"

                            style={{
                                width: '102.3%',
                                height: '2px',
                                background: 'grey',
                                position: 'absolute',
                                top: '260px',
                                left: '-2%',
                                transition: 'all 0.3s ease', // Transition for smoothness
                            }}
                        >
                            {/* Only show the underline for the selected div */}
                            {selected === 'IDCard' && (
                                <div
                                    className="IDCard"
                                    style={{
                                        height: '2px',
                                        width: '17%',
                                        background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                        transition: 'width 0.3s ease', // Transition for width
                                    }}
                                />
                            )}
                            {selected === 'Residense' && (
                                <div
                                    className="Residense"
                                    style={{
                                        height: '2px',
                                        width: '29%',
                                        position: 'absolute',
                                        top: '-0px',
                                        left: '20%',
                                        background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                        transition: 'width 0.3s ease', // Transition for width
                                    }}
                                />
                            )}
                            {selected === 'Passport' && (
                                <div
                                    className="Passport"
                                    style={{
                                        height: '2px',
                                        width: '17%',
                                        position: 'absolute',
                                        top: '-0px',
                                        left: '54%',
                                        background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                        transition: 'width 0.3s ease', // Transition for width
                                    }}
                                />
                            )}
                            {selected === 'DrivingLCN' && (
                                <div
                                    className="Driving-LCN"
                                    style={{
                                        height: '2px',
                                        width: '26%',
                                        position: 'absolute',
                                        top: '-0px',
                                        left: '74%',
                                        background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                        transition: 'width 0.3s ease', // Transition for width
                                    }}
                                />
                            )}
                        </div>
                        <div className="PhotoAction"
                            style={{
                                position: 'absolute',
                                top: '270px',
                                left: '-2%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    color: ' grey',
                                }}
                            >
                                {messages[selected]}
                            </Typography>
                        </div>

                    </div>
                    <>

                        <div className="Drag1"

                            style={{
                                width: '47%',
                                height: '173px',
                                border: `2px dashed ${dragging ? 'blue' : '#fff'}`, // Change border to blue when dragging
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                borderRadius: '10px',
                                top: '300px',
                                left: '1%',
                                transform: `scale(${dragging ? '1.05' : '1'})`, // Scale up when dragging
                                transition: 'transform 0.3s ease',
                            }}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="FrontSide"
                                style={{
                                    position: 'absolute',
                                    top: '10%',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        color: 'white',
                                        opacity: '0.7'
                                    }}
                                >
                                    Front side
                                </Typography>
                            </div>
                            <div className="FileIcon"
                                style={{
                                    display: 'flex',
                                    width: '19%',
                                    borderRadius: '12px',
                                    height: '40px',
                                    position: 'absolute',
                                    top: '26%',
                                    padding: '10px',
                                    background: showAnimation ? '#194e3d' : 'transparent',
                                    border: showAnimation ? 'none' : '2px solid #4776E6',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {isUploading ? (
                                    showAnimation ? (
                                        <div className="Animation" style={{ display: 'flex', marginTop: '9px' }}>
                                            <Lottie
                                                loop={false}
                                                animationData={animationData}
                                                style={{ width: 170, height: 170 }}
                                            />
                                        </div>
                                    ) : (
                                        <CloudUploadIcon />
                                    )
                                ) : (
                                    <CloudUploadIcon />
                                )}
                            </div>

                            <div className="Typo"
                                style={{

                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    position: 'absolute',
                                    top: '56%',



                                }}
                            >


                                <Typography onClick={handleClick}
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textDecoration: 'underline',
                                        textDecorationColor: 'white',
                                        lineHeight: '20px',
                                        opacity: '0.8',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        display: 'flex',
                                        zIndex: '111111111111111111111'


                                    }}
                                >
                                    {t('Drop file here or Upload')}
                                </Typography>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect} // File selection handler
                                />

                            </div>
                            <div className="Types"
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    top: '84%',
                                    gap: '10px',
                                }}
                            >
                                <div className="PNG"
                                    style={{
                                        background: 'grey',
                                        opacity: '0.8',
                                        height: '20px',
                                        width: '37px',
                                        borderRadius: '13px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            fontSize: '12px',
                                            color: ' white',
                                            opacity: '0.8'
                                        }}
                                    >
                                        PNG
                                    </Typography>
                                </div>
                                <div className="JPG"
                                    style={{
                                        background: 'grey',
                                        opacity: '0.8',
                                        height: '20px',
                                        width: '37px',
                                        borderRadius: '13px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            fontSize: '12px',
                                            color: ' white',
                                            opacity: '0.8'
                                        }}
                                    >
                                        JPG
                                    </Typography>
                                </div>
                                <div className="PDF"
                                    style={{
                                        background: 'grey',
                                        opacity: '0.8',
                                        height: '20px',
                                        width: '37px',
                                        borderRadius: '13px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            fontSize: '12px',
                                            color: ' white',
                                            opacity: '0.8'
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>

                            <div className="ImageState"

                                style={{

                                    width: '100%',
                                    height: 'auto',
                                    position: 'absolute',
                                    borderRadius: '10px',
                                    direction: 'ltr',
                                    display: 'flex',
                                    flexDirection: 'column', // Stack items vertically
                                    padding: '10px',
                                    left: '11%',
                                    top: '105px',
                                    boxSizing: 'border-box', // Ensures padding is included in the width/height
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>


                                </div>
                                <div
                                    className="CompleteStatusWhite"
                                    style={{
                                        width: '75%',
                                        height: '5px',
                                        background: 'white',
                                        position: 'relative',
                                        marginTop: 'auto',
                                        display: 'flex',
                                        gap: '20%',
                                        borderRadius: '2px',
                                    }}
                                >
                                    <div className="ProgressBlue"

                                        style={{
                                            width: `${loadingProgress}%`, // Dynamic width based on the loading progress
                                            height: '5px',
                                            background: 'blue',
                                            position: 'absolute',
                                            top: '1%',
                                            borderRadius: '2px',
                                            transition: 'width 0.5s ease-in-out', // Smooth transition for the progress bar
                                        }}
                                    ></div>
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '73.5%',
                                        top: '62%',
                                    }}
                                >
                                    <Typography
                                        sx={{

                                            transform: 'translateY(-50%)',
                                            color: 'white',
                                            fontSize: '12px',

                                        }}
                                    >
                                        {loadingProgress}%
                                    </Typography>
                                </div>

                            </div>
                        </div>
                        <div className="Drag2"

                            style={{
                                width: '47%',
                                height: '173px',
                                border: `2px dashed ${dragging2 ? 'blue' : '#fff'}`, // Change border to blue when dragging
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                borderRadius: '10px',
                                top: '300px',
                                right: '1%',
                                transform: `scale(${dragging2 ? '1.05' : '1'})`, // Scale up when dragging
                                transition: 'transform 0.3s ease',
                            }}
                            onDragOver={handleDragOver2}
                            onDragLeave={handleDragLeave2}
                            onDrop={handleDrop2}
                        >
                            <div className="BackSide"
                                style={{
                                    position: 'absolute',
                                    top: '10%',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        color: 'white',
                                        opacity: '0.7'
                                    }}
                                >
                                    Back side
                                </Typography>
                            </div>
                            <div className="FileIcon"
                                style={{
                                    display: 'flex',
                                    width: '19%',
                                    borderRadius: '12px',
                                    height: '40px',
                                    position: 'absolute',
                                    top: '26%',
                                    padding: '10px',
                                    background: showAnimation2 ? '#194e3d' : 'transparent',
                                    border: showAnimation2 ? 'none' : '2px solid #4776E6',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {isUploading2 ? (
                                    showAnimation2 ? (
                                        <div className="Animation" style={{ display: 'flex', marginTop: '9px' }}>
                                            <Lottie
                                                loop={false}
                                                animationData={animationData}
                                                style={{ width: 170, height: 170 }}
                                            />
                                        </div>
                                    ) : (
                                        <CloudUploadIcon />
                                    )
                                ) : (
                                    <CloudUploadIcon />
                                )}
                            </div>
                            <div className="Animation "
                                style={{ marginTop: '-20px', display: 'none' }}>
                                <Lottie animationData={animationData} style={{ width: 200, height: 200, display: 'block', margin: '0 auto' }} />
                            </div>
                            <div className="Typo"
                                style={{

                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    position: 'absolute',
                                    top: '56%',



                                }}
                            >


                                <Typography onClick={handleClick2}
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textDecoration: 'underline',
                                        textDecorationColor: 'white',
                                        lineHeight: '20px',
                                        opacity: '0.8',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        display: 'flex',
                                        zIndex: '111111111111111111111'


                                    }}
                                >
                                    {t('Drop file here or Upload')}
                                </Typography>
                                <input
                                    type="file"
                                    ref={fileInputRef2}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect2} // File selection handler
                                />

                            </div>
                            <div className="Types"
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    top: '84%',
                                    gap: '10px',
                                }}
                            >
                                <div className="PNG"
                                    style={{
                                        background: 'grey',
                                        opacity: '0.8',
                                        height: '20px',
                                        width: '37px',
                                        borderRadius: '13px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            fontSize: '12px',
                                            color: ' white',
                                            opacity: '0.8'
                                        }}
                                    >
                                        PNG
                                    </Typography>
                                </div>
                                <div className="JPG"
                                    style={{
                                        background: 'grey',
                                        opacity: '0.8',
                                        height: '20px',
                                        width: '37px',
                                        borderRadius: '13px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            fontSize: '12px',
                                            color: ' white',
                                            opacity: '0.8'
                                        }}
                                    >
                                        JPG
                                    </Typography>
                                </div>
                                <div className="PDF"
                                    style={{
                                        background: 'grey',
                                        opacity: '0.8',
                                        height: '20px',
                                        width: '37px',
                                        borderRadius: '13px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            fontSize: '12px',
                                            color: ' white',
                                            opacity: '0.8'
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </div>
                            </div>
                            <div className="ImageState"

                                style={{

                                    width: '100%',
                                    height: 'auto',
                                    position: 'absolute',
                                    borderRadius: '10px',
                                    direction: 'ltr',
                                    display: 'flex',
                                    flexDirection: 'column', // Stack items vertically
                                    padding: '10px',
                                    left: '11%',
                                    top: '105px',
                                    boxSizing: 'border-box', // Ensures padding is included in the width/height
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>


                                </div>
                                <div
                                    className="CompleteStatusWhite"
                                    style={{
                                        width: '75%',
                                        height: '5px',
                                        background: 'white',
                                        position: 'relative',
                                        marginTop: 'auto',
                                        display: 'flex',
                                        gap: '20%',
                                        borderRadius: '2px',
                                    }}
                                >
                                    <div className="ProgressBlue"

                                        style={{
                                            width: `${loadingProgress2}%`, // Dynamic width based on the loading progress
                                            height: '5px',
                                            background: 'blue',
                                            position: 'absolute',
                                            top: '1%',
                                            borderRadius: '2px',
                                            transition: 'width 0.5s ease-in-out', // Smooth transition for the progress bar
                                        }}
                                    ></div>
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '73.5%',
                                        top: '62%',
                                    }}
                                >
                                    <Typography
                                        sx={{

                                            transform: 'translateY(-50%)',
                                            color: 'white',
                                            fontSize: '12px',

                                        }}
                                    >
                                        {loadingProgress2}%
                                    </Typography>
                                </div>

                            </div>

                        </div>
                    </>
                    <div className="button">
                        <Button variant="outlined" className='btn-grad' onClick={handleUpload}
                            sx={{
                                width: '99%',

                                position: 'absolute',
                                top: isSmallScreen && currentLanguage === 'ar' ? '465px' :
                                    isSmallScreen ? '460px' :
                                        isMediumScreen ? '475px' :
                                            '490px',
                                right: '0.3%',
                                height: '38px',
                                opacity: loading ? '0.5' : '1',
                                cursor: loadingProgress < 100 ? 'not-allowed' : 'pointer',
                                borderColor: 'none', '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',

                                },
                            }}
                        >
                            {loading ? (
                                <div className="lds-dual-ring"
                                 style={{ margin: 'auto' , opacity : loading? '0.5' : '1' }}></div> // Show loading ring
                            ) : (
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        fontSize: '13px',

                                    }}

                                >

                                    {t('Upload')}
                                </Typography>
                            )}
                        </Button>
                    </div>

                </>
            )}
           {VerifySucces && (
    <>
    <div className="Div slide-from-right ">

        <motion.div
            initial={{ marginTop: 80 }}
            animate={{ marginTop: startAnimation ? -30 : 80 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                width: "100%",
                height: "295px",
                display: "flex",
                overflow: "hidden",
                justifyContent: "center",
            }}
        >
            <Lottie
                loop={true}
                animationData={animationData2}
                style={{ width: 390, height: 390 }}
            />
        </motion.div>

        {/* Typography with Staggered Animations */}
        <div className="TYpos" style={{ marginTop: '20px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startAnimation ? 1 : 0, y: startAnimation ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.5 }} // Delay after Lottie
            >
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}>
                    {t('Your ID Verification is in Progress')}
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startAnimation ? 1 : 0, y: startAnimation ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1 }} // Extra delay for second text
            >
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 'bold',
                        textAlign: 'center',
                        opacity: '0.8',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}>
                    {t('Thank you for submitting your ID for verification. Our team is currently reviewing your document to ensure compliance with our security standards. This process may take some time.')}
                </Typography>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startAnimation ? 1 : 0, y: startAnimation ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1 }} // Extra delay for second text
            >
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: '600',
                        textAlign: 'center',
                        opacity: '0.8',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}>
                    {t('You will receive a notification within 24 hours once the review is complete.')}
                </Typography>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: startAnimation ? 1 : 0, y: startAnimation ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1 }} // Extra delay for second text
            >
                <div className="Div"
                onClick={handleCloseVerify}
                style={{
                    display : 'flex',
                    justifyContent : 'center',
                    gap : '5px',
                    marginTop : '30px',
                    cursor : 'pointer',
                }}
                >
                <ArrowBackIcon/>
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 'bold',
                        textAlign: 'center',
                        
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}>
                   {t('Close')}
                </Typography>
                </div>
            </motion.div>
        </div>
    </div>
       

      
    </>
)}

        </div >
    );
}

export default VerificationId
