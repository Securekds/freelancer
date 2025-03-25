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
import animationData from '../../../assets/images/small-logos/CoverPhoto.json'
import animationData1 from '../../../assets/images/small-logos/CoverDone.json'
import CountrySelect from './CountrySelect';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUser } from '../../../Context/UserContext.jsx';
import axios from 'axios';




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


function UpdateProfilePhoto({ currentCoverImg, onUpdateCoverImage, handleCloseProfile, onAddCardClick1, onCloseClickBilling, setCoverPhoto, onCloseClick }) {
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

            <Tabs TABS={TABS} onUpdateCoverImage={onUpdateCoverImage} currentCoverImg={currentCoverImg} handleCloseProfile={handleCloseProfile} onCloseClickBilling={onCloseClickBilling} onCloseClick={onCloseClick} selected={selected} setSelected={setSelected} onAddCardClick1={onAddCardClick1} />





        </div>
    );
};


const Tabs = ({ onUpdateCoverImage, currentCoverImg, handleCloseProfile, onCloseClickBilling, TABS, selected, setSelected, logoPath, onAddCardClick1, onLogoClick, onCloseClick, setCoverPhoto }) => {
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
                {selected && <Content currentCoverImg={currentCoverImg} onUpdateCoverImage={onUpdateCoverImage} handleCloseProfile={handleCloseProfile} onCloseClickBilling={onCloseClickBilling} onCloseClick={onCloseClick} logoPath={logoPath} onLogoClick={onLogoClick} dir={dir} selected={selected} TABS={TABS} onAddCardClick1={onAddCardClick1} />}
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

const Content = ({ currentCoverImg, onUpdateCoverImage, handleCloseProfile, onCloseClickBilling, selected, dir, TABS, onAddCardClick1, onLogoClick, logoPath, onCloseClick }) => {


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
                            isMediumScreen ? '810px' :
                                '500px',
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
                                    <t.Component onUpdateCoverImage={onUpdateCoverImage} currentCoverImg={currentCoverImg} handleCloseProfile={handleCloseProfile} onCloseClickBilling={onCloseClickBilling} onCloseClick={onCloseClick} logoPath={logoPath} onLogoClick={onLogoClick} onAddCardClick1={onAddCardClick1} />

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

const Pricing = ({ handleCloseProfile, onUpdateCoverImage, currentCoverImg }) => {



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




    const handleClose = () => {
        setAnchorEl(null);
    };

    const [logoSrc, setLogoSrc] = React.useState('https://res.cloudinary.com/damicjacf/image/upload/v1722793929/dahabiya-removebg-preview_qmce2d.png');
    const handleMenuItemClick = (logoUrl) => {
        setLogoSrc(logoUrl);
        handleClose(); // Close the menu after selection
    };

    const [selectedCountryCode, setSelectedCountryCode] = useState('+213'); // Default to Algeria
    const [phoneNumber, setPhoneNumber] = useState('');

    // Handle country code change
    const handleCountryChange = (code) => {
        setSelectedCountryCode(code);
        // Optional: Update the input field with the new country code if empty
        if (!phoneNumber.startsWith(code)) {
            setPhoneNumber(code); // Set the initial value with country code
        }
    };

    // Handle input change
    const handleInputChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [imageName, setImageName] = useState('');
    const [imageSize, setImageSize] = useState('');
    const { user, updateUserProfileImage } = useUser(); // Access user data from UserContext
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileToUpload, setFileToUpload] = useState(null); // Store the file selected by the user
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [DefaultDesign, setDefaultDesign] = useState(true);
    const [CoverUpdatedDesign, setCoverUpdatedDesign] = useState(false);



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
        }
    };

    // Function to process and upload the image
    const processImage = async (file) => {
        console.log('Processing image:', file.name);
        setImage(URL.createObjectURL(file));
        setImageName(file.name);
        setImageSize((file.size / (1024 * 1024)).toFixed(2));
        setFileToUpload(file); // Store the file to upload later

    };
    // Function to upload profile image to the backend
    const uploadProfileImageToBackend = async (file) => {
        if (!user?._id) {
            console.error('User ID is missing!');
            return;
        }
        if (!fileToUpload) {
            console.error('No file selected to upload!');
            return;
        }

        console.log('Uploading profile image to backend for user:', user._id);

        setIsUploading(true);
        setIsLoading(true);  // Start loading animation
        setLoadingProgress(0);

        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/users/${user._id}/profile-photo`,  // Make sure the URL matches
                formData,
                {
                    withCredentials: true, // Send cookies with the request
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setLoadingProgress(percentCompleted);
                        console.log(`Upload progress: ${percentCompleted}%`);

                        // Stop loading when progress reaches 100%
                        if (percentCompleted === 100) {
                            setIsLoading(false);
                        }
                    },
                }
            );

            // Update the user's profile image in context
            const { user: updatedUser } = response.data;
              // Add this log to see what the backend is returning
        console.log('Response from backend:', response.data);
            updateUserProfileImage(updatedUser.profileImg); // This updates the profile image

            // Set the uploaded image URL
            setUploadedImageUrl(updatedUser.profileImg);

            // Set success state
            setDefaultDesign(false);
            setCoverUpdatedDesign(true);

        } catch (error) {
            console.error('Error uploading profile image:', error);
        } finally {
            setIsUploading(false);
            setIsLoading(false); // Ensure loading stops on error
        }
    };



    return (

        <div className="Container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative',
                top: CoverUpdatedDesign ? '20px' : '-30px',
                marginLeft: '-2px',
                alignItems: 'center',



            }}
        >

            {DefaultDesign && (
                <>
                    <div className='ClosingIcon'
                        onClick={handleCloseProfile}
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
                            gap: '2px',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >
                            {t('Upload your profile photo')}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '13px',
                                color: ' grey',
                            }}
                        >
                            {t('Supported formats : jpg or .jpeg')}
                        </Typography>
                    </div>
                    {/* Drag and Drop Area */}
                    <div className="Drag"

                        style={{
                            width: '99%',
                            height: '240px',
                            border: `2px dashed ${dragging ? 'blue' : '#fff'}`, // Change border to blue when dragging
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: '120px',
                            transform: `scale(${dragging ? '1.05' : '1'})`, // Scale up when dragging
                            transition: 'transform 0.3s ease',
                        }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="Animation"
                            style={{ marginTop: '-20px', }}>
                            <Lottie animationData={animationData} style={{ width: 200, height: 200, display: 'block', margin: '0 auto' }} />
                        </div>
                        <div className="Typo"
                            style={{
                                marginTop: '-20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                marginRight: isSmallScreen && currentLanguage === 'ar' ? '8px' : 'unset',



                            }}
                        >


                            <Typography onClick={handleClick}
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textDecoration: 'underline',
                                    textDecorationColor: 'white',
                                    lineHeight: '20px',
                                    cursor: 'pointer',
                                    zIndex: '111111111111111111111'


                                }}
                            >
                                {t('Click to upload or drag and drop')}
                            </Typography>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileSelect} // File selection handler
                            />
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                            >
                                {t('Maximum photo size 10MB.')}
                            </Typography>
                        </div>
                    </div>


                    <div className="ImageState"

                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            border: '2px solid rgba(255, 255, 255, 0.18)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            width: '100%',
                            height: 'auto',
                            position: 'absolute',
                            borderRadius: '10px',
                            direction: 'ltr',
                            display: 'flex',
                            flexDirection: 'column', // Stack items vertically
                            padding: '10px',
                            top: '370px',
                            boxSizing: 'border-box', // Ensures padding is included in the width/height
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            {image && (
                                <div className="ImageIcon"
                                    style={{
                                        width: '3rem',
                                        height: '2.5rem',
                                        background: 'transparent',
                                        marginRight: '10px',
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt="Profile"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            textAlign: 'center',
                                        }}
                                    />
                                </div>
                            )}
                            <div className="ImageInfo "
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        lineHeight: '20px',

                                    }}
                                >
                                    {t('YourImage.jpg')}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: currentLanguage === 'ar' ? '14px' : 'unset',
                                    }}
                                >
                                    {imageSize} {t('MB')}
                                </Typography>
                            </div>
                            <div
                                className='ClosingIcon'
                                onClick={() => {
                                    setImage(null);
                                    setLoadingProgress(0);
                                    setImageSize('0');
                                }}

                                style={{
                                    position: 'absolute',
                                    right: '1%',
                                    top: '4%',
                                    zIndex: '22222',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                <CloseIcon sx={{ fontSize: '15px' }} />
                            </div>
                        </div>
                        <div
                            className="CompleteStatusWhite"
                            style={{
                                width: '88%',
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
                                    top: '0%',
                                    borderRadius: '2px',
                                    transition: 'width 0.5s ease-in-out', // Smooth transition for the progress bar
                                }}
                            ></div>
                        </div>
                        <div>
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    right: '2%',
                                    top: '84%',
                                    transform: 'translateY(-50%)',
                                    color: 'white',
                                    fontSize: '12px',

                                }}
                            >
                                {loadingProgress}%
                            </Typography>
                        </div>

                    </div>
                    <div className="button">
                        <Button
                            variant="outlined"
                            className="btn-grad"
                            onClick={uploadProfileImageToBackend}
                            disabled={isUploading || !fileToUpload}
                            sx={{
                                width: '99%',
                                position: 'absolute',
                                top: isSmallScreen && currentLanguage === 'ar' ? '465px' :
                                    isSmallScreen ? '460px' :
                                        isMediumScreen ? '475px' :
                                            '460px',
                                right: '0.3%',
                                height: '38px',
                                cursor: !fileToUpload ? 'not-allowed' : 'pointer',
                                borderColor: 'none',
                                opacity: !fileToUpload || isUploading ? 0.5 : 1, // Set opacity when no file or when uploading
                                transition: 'opacity 0.3s ease', // Smooth transition effect
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="lds-dual-ring" style={{ margin: 'auto' }}></div>

                                </>
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

            {CoverUpdatedDesign && (
                <>

                    <div
                        className="CoverUpdatedSucces slide-from-right"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: '90%',
                            left: '0%',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            className="UploadTypoSucces"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                }}
                            >
                                {t('Profile Photo Updated Successfully')}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    color: 'grey',
                                }}
                            >
                                {t('Your new profile photo has been saved successfully.')}
                            </Typography>
                        </div>

                        <div className="LottiesSucces" style={{ marginTop: '-30px' }}>
                            <Lottie animationData={animationData1} style={{ width: 350, height: 350 }} />
                        </div>

                        <div
                            className="Close"
                            onClick={handleCloseProfile}
                            style={{
                                display: 'flex',
                                gap: '5px',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginTop: '0px',
                            }}
                        >
                            <ArrowBackIcon />
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                }}
                            >
                                {t('Close')}
                            </Typography>
                        </div>
                    </div>


                </>
            )}















        </div >
    );
}

export default UpdateProfilePhoto
