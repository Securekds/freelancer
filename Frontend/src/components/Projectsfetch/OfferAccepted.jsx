import React, { useEffect, useState, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from "react-router-dom";
import DangerousIcon from '@mui/icons-material/Dangerous';
import axios from "axios";
import DOMPurify from 'dompurify';
import Lottie from 'lottie-react';
import PaymentDone from '../../assets/images/small-logos/PaymentDone.json';
import { useUser } from '../../Context/UserContext.jsx'
import { useGig } from '../../Context/GigContext.jsx';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});



function OfferAccepted({ handleCloseOfferAccepted, selectedOffer, }) {

    console.log("Selected Offer:", selectedOffer);
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




    const { user, setUser, isProfileUpdated, updateUserProfile } = useUser();

    const { gigId } = useParams();
    const { gig, gigError, fetchGigById } = useGig();
    useEffect(() => {
        if (gigId) {
            fetchGigById(gigId);
        }
    }, [gigId]);





    const [formData, setFormData] = useState({
        title: '',
        sellerId: '',
        offerId: '',
        buyerId: '',
        budget: '',
        members: '',
        gigId: gigId || '',
    });

    const [errors, setErrors] = useState({
        titleError: '',
        sellerIdError: '',
        offerIdError: '',
        budgetError: '',
        membersError: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Retrieve userId from user context
    const userId = user ? user._id : null;


    const [showDefault, setShowDefault] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);


    const handleProjectTitleChange = (e) => {
        const value = e.target.value;

        // Sanitize the input using DOMPurify
        const sanitizedValue = DOMPurify.sanitize(value);

        setFormData((prevData) => ({
            ...prevData,
            title: sanitizedValue, // Use the sanitized value
        }));

        // Validate the project title
        if (!sanitizedValue.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                titleError: true, // Indicate an error for styling
            }));
            setErrorMessage('Project title is required. Please provide a title for your project.');
        } else if (sanitizedValue.length < 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                titleError: true,
            }));
            setErrorMessage('Project title must be at least 5 characters long. Provide a more descriptive title.');
        } else if (/^\d+$/.test(sanitizedValue)) {  // Check if the title contains only numbers
            setErrors((prevErrors) => ({
                ...prevErrors,
                titleError: true,
            }));
            setErrorMessage('Project title cannot contain only numbers. Please provide a more descriptive title.');
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                titleError: false,
            }));
            setErrorMessage(''); // Clear the error message when input is valid
        }
    };


    useEffect(() => {
        if (selectedOffer && user) {
            setFormData({
                title: '',  // Leave title empty for user input
                sellerId: selectedOffer.seller._id,
                offerId: selectedOffer._id,
                buyerId: userId,
                budget: selectedOffer.price,
                members: [userId, selectedOffer.seller._id],  // Include both buyer and seller
                gigId: gigId || '',  // ✅ Ensure gigId is included here

            });
        }
    }, [selectedOffer, user, gigId]);



    const createProject = async () => {
        setIsLoading(true); // Start loading

        if (!formData.title.trim()) {
            setErrorMessage('Project title is required. Please provide a title for your project.');
            setErrors((prevErrors) => ({
                ...prevErrors,
                titleError: true, // Set titleError to true
            }));
            setIsLoading(false);
            return; // Stop the function execution
        }

        // Check if there are any other errors (e.g., title too short or contains only numbers)
        if (errors.titleError) {
            setIsLoading(false);
            return; // Stop the function execution if there are existing errors
        }


        try {
            console.log("Project Creation Data:", formData);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/projects/create`,
                formData,
                { withCredentials: true }
            );

            console.log("Project Creation Response:", response.data);
            const offerUpdateResponse = await updateOfferStatus(selectedOffer._id, 'accepted');
            console.log("Offer Status Update Response:", offerUpdateResponse);
            setShowDefault(false);
            setShowSuccess(true);



        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
            // Optionally set an error state to show to the user
        } finally {
            setIsLoading(false); // Stop loading regardless of success or failure
        }
    };


    const updateOfferStatus = async (offerId, status) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/offers/${offerId}`,
                { status, userId, gigId },
                { withCredentials: true }
            );

            return response.data; // Return the response to log it in the createProject function



        } catch (error) {
            console.error("Error updating offer status:", error.response?.data || error.message);
            // Handle errors, maybe show to the user
        }
    };



    return (
        <div className='DailogContainer'
            style={{
                width: '100%',
                minHeight: 'auto',
                minWidth: 'min-content',
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',



            }}
        >
            <div className='BgBackground'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid white',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: '-1',

                }} />

            {showDefault && (
                <>
                    <div className="HeaderBasicInfo"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}
                    >
                        <div className="Typo">
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >

                                {t('Confirm Offer Acceptance')}
                            </Typography>
                        </div>

                        <div className="CloseIcon"
                            onClick={handleCloseOfferAccepted}
                            style={{
                                cursor: 'pointer',
                                marginTop: '8px',

                            }}
                        >
                            <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
                        </div>

                    </div>
                    <div className="Accept"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <div className="Note">
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: 'rgba(255, 255, 255, 0.8)', // Instead of opacity, use rgba for transparency

                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'orange',
                                        marginRight: '5px',
                                        marginLeft: currentLanguage === 'ar' ? '5px' : 'unset',
                                        opacity: '1',

                                    }}
                                >
                                    {t('Note :')}
                                </span>

                                {t('By accepting this offer, you are agreeing to start a new project with the selected seller. Please provide a project title to proceed.')}
                            </Typography>
                        </div>
                        {errorMessage && (
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    color: errorMessage === "Your profile is already up-to-date. No changes detected." ? '#2df873' : '#ff4d4d',
                                }}
                            >
                                {t(errorMessage)}
                            </Typography>
                        )}

                        {currentLanguage === 'ar' ? (
                            <>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider theme={rtlTheme}>
                                        <div className="ProjectTitleInput">
                                            <TextField
                                                id="outlined-basic"
                                                label={t('عنوان المشروع')}
                                                variant="outlined"
                                                value={formData.title}
                                                onChange={handleProjectTitleChange}
                                                size="small"
                                                inputProps={{
                                                    maxLength: 500 // Add this line
                                                }}
                                                InputLabelProps={{
                                                    style: { color: '#FFFFFF' },
                                                    sx: {
                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                    }
                                                }}
                                                InputProps={{
                                                    maxLength: 70,
                                                    style: {
                                                        color: '#FFFFFF',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {errors.titleError && (
                                                                <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                            )}
                                                        </InputAdornment>
                                                    ),

                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.titleError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.titleError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.titleError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.titleError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        width: '100%',
                                                        fontSize: '15px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#FFFFFF',
                                                        '&.Mui-focused, &.MuiFormLabel-filled': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                            padding: '0 4px',
                                                        }
                                                    },
                                                }}
                                                className={errors.titleError ? 'shake' : ''}

                                            />
                                        </div>
                                    </ThemeProvider>
                                </CacheProvider>
                            </>
                        ) : (
                            <>
                                <div className="ProjectTitleInput">
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Project Titel')}
                                        variant="outlined"
                                        value={formData.title}
                                        onChange={handleProjectTitleChange}
                                        size="small"
                                        inputProps={{
                                            maxLength: 500 // Add this line
                                        }}
                                        InputLabelProps={{
                                            style: { color: '#FFFFFF' },
                                            sx: {
                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                            }
                                        }}
                                        InputProps={{
                                            maxLength: 70,
                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {errors.titleError && (
                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                    )}
                                                </InputAdornment>
                                            ),

                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.titleError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.titleError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.titleError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.titleError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                width: '100%',
                                                fontSize: '15px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#FFFFFF',
                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                    padding: '0 4px',
                                                }
                                            },
                                        }}
                                        className={errors.titleError ? 'shake' : ''}

                                    />
                                </div>
                            </>

                        )}
                        <div className="OnceAccepted"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                            >
                                {t('Once Accepted :')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: 'rgba(255, 255, 255, 0.8)', // Instead of opacity, use rgba for transparency
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    ✅
                                </span>
                                {t('A new project will be created.')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: 'rgba(255, 255, 255, 0.8)', // Instead of opacity, use rgba for transparency
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    ✅
                                </span>
                                {t('This post status will be set Closed.')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: 'rgba(255, 255, 255, 0.8)', // Instead of opacity, use rgba for transparency
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    ✅
                                </span>
                                {t('The seller will be notified, so you can discuss the project details further.')}
                            </Typography>


                        </div>
                        <div className="CreateGigBu"
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',

                                marginBottom: '-20px',
                            }}
                        >
                            <Button onClick={createProject}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    color: 'white',

                                    borderColor: 'none',
                                    '&:hover': {
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
                                    {t('Confirm & Start Project')}
                                </Typography>

                            </Button>
                            <Button
                                onClick={handleCloseOfferAccepted}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    color: 'white',
                                    opacity: isLoading ? '0.5' : 'unset',
                                    borderColor: 'none',
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
                                        {t('Cancel')}
                                    </Typography>
                                )}
                            </Button>
                        </div>
                    </div>
                </>
            )}

            {showSuccess && (
                <>
                    <div className="Cont slide-from-right"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div className="Lottie"
                            style={{
                                marginTop: '-80px',
                            }}
                        >
                            <Lottie
                                animationData={PaymentDone}
                                loop={false}
                                style={{
                                    width: '260px',
                                    height: '260px',
                                }}
                            />
                        </div>
                        <div className="Div"
                            style={{
                                marginTop: '-80px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: 'white',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',

                                }}
                            >
                                {t('Offer Accepted – Seller Notified!')}
                            </Typography>
                            <Typography
                                style={{
                                    color: 'white',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',

                                }}
                            >
                                {t('You’ve successfully accepted the offer! The seller has been notified, and you can now connect to discuss the project details further.')}
                            </Typography>
                            <Button
                                onClick={handleCloseOfferAccepted}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    marginTop: '5px',
                                    marginBottom: '-20px',
                                    color: 'white',
                                    borderColor: 'none',
                                    '&:hover': {
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
                                    {t('Close')}
                                </Typography>


                            </Button>
                        </div>
                    </div>
                </>
            )}




        </div>
    )
}

export default OfferAccepted
