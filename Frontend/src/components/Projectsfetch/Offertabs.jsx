import React, { useEffect, useState, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DangerousIcon from '@mui/icons-material/Dangerous';
import MessageIcon from '@mui/icons-material/Message';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Menu from '@mui/material/Menu';
import Lottie from 'lottie-react';
import PaymentDone from '../../assets/images/small-logos/PaymentDone.json';
import DOMPurify from 'dompurify';
import MenuItem from '@mui/material/MenuItem';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from '../../Context/UserContext.jsx'


// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});


function Offertabs({ handleCloseOffer, gigOwnerId }) {
    console.log("Received gigOwnerId:", gigOwnerId);

    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);


    const { gigId } = useParams();


    const { user, setUser, isProfileUpdated, updateUserProfile } = useUser(); // Make sure you're getting both user and setUser


    const [formData, setFormData] = useState({
        offerPrice: '',
        selectedTime: '',
        offerComment: '',

    });

    const [errors, setErrors] = useState({
        offerPriceError: '',
        offerTimeError: '',
        offerCommentError: '',

    });




    const [errorMessage, setErrorMessage] = useState('');

    const [showDefault, setShowDefault] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleOfferPriceChange = (e) => {
        const rawValue = e.target.value;

        // Remove all non-digit characters to get the pure number for validation
        const cleanNumber = rawValue.replace(/[^\d]/g, '');

        // Check if the number exceeds 1 million
        if (parseInt(cleanNumber) > 1000000) {
            setErrorMessage('We cannot handle more than 1 million for transaction payment.');
            setErrors(prevErrors => ({
                ...prevErrors,
                offerPriceError: true
            }));
            return;
        }

        // Check if the input contains any non-digit characters
        if (/[^\d,]/.test(rawValue)) {
            setErrorMessage('Please enter just numbers for the price.');
            setErrors(prevErrors => ({
                ...prevErrors,
                offerPriceError: true
            }));
            return;
        }

        // Clear error state when input is valid
        setErrorMessage('');
        setErrors(prevErrors => ({
            ...prevErrors,
            offerPriceError: false
        }));

        // Format the number with commas
        const formattedValue = cleanNumber
            ? new Intl.NumberFormat().format(cleanNumber)
            : '';

        // Update form data with the formatted value
        setFormData(prevData => ({
            ...prevData,
            offerPrice: formattedValue
        }));
    };


    const [isLoading, setIsLoading] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [openTimeMenu, setOpenTimeMenu] = useState(false);
    const [anchorElTime, setAnchorElTime] = useState(null); // Anchor for the menu

    const DaysRange = Array.from({ length: 90 }, (_, i) => i + 1);

    // Handle opening the dropdown menu
    const handleOpenTimeMenu = (event) => {
        setAnchorElTime(event.currentTarget);
        setOpenTimeMenu(true);
    };

    // Handle closing the dropdown menu
    const handleCloseTimeMenu = (value) => {
        const formattedValue = `${value} ${currentLanguage === 'ar' ? 'يوم' : 'day'}`;

        setSelectedTime(formattedValue); // Set formatted time for display

        setFormData(prev => ({
            ...prev,
            selectedTime: formattedValue, // Store the formatted time with unit for submission
        }));

        setOpenTimeMenu(false);
        setAnchorElTime(null);

        // Handle error state
        setErrors(prev => ({
            ...prev,
            offerTimeError: !value,
        }));

        setErrorMessage(value ? '' : 'Offer Time is required.');
    };


    const handleOfferCommentChange = (e) => {
        const value = e.target.value; // Remove the trim here to allow spaces between words


        if (!value) {
            setErrorMessage('Comment is required. Please provide a comment for your offer.');
            setErrors((prevErrors) => ({
                ...prevErrors,
                offerCommentError: true,
            }));
        } else if (value.length < 10) {
            setErrorMessage('Comment must be at least 10 characters long.');
            setErrors((prevErrors) => ({
                ...prevErrors,
                offerCommentError: true,
            }));
        } else if (/^\d+$/.test(value)) {
            setErrorMessage('Comment cannot be just numbers. Please provide a more descriptive comment.');
            setErrors((prevErrors) => ({
                ...prevErrors,
                offerCommentError: true,
            }));
        } else {
            // Clear error messages when input is valid
            setErrorMessage('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                offerCommentError: false,
            }));
        }

        // Update state with the new value
        setFormData((prevData) => ({
            ...prevData,
            offerComment: value,
        }));
    };

    const location = useLocation();







    const handleCreateOffer = async () => {
        // Initialize error tracking
        let isValid = true;
        let newErrors = { ...errors };
        setIsLoading(true);

        // Validate user authentication
        const userId = user?._id;
        if (!userId) {
            setErrorMessage("Please log in to submit an offer.");
            return;
        }

        // Get user plan and remaining offers
        const userPlan = user?.plan || "free";

        // Determine the correct remaining offers field based on the user's plan
        let remainingOffers;
        if (userPlan === "free") {
            remainingOffers = user?.remainingOffersFree ?? 15; // Default to 15 for free plan
        } else if (userPlan === "freelancerPro") {
            remainingOffers = user?.remainingOffersFreelancerPro ?? 40; // Default to 40 for freelancerPro plan
        } else {
            remainingOffers = Infinity; // Unlimited offers for proPlus plan
        }

        // Check if user has remaining offers (only for free and freelancerPro plans)
        if (userPlan === "free" || userPlan === "freelancerPro") {
            if (remainingOffers <= 0) {
                setErrorMessage("You have used all your available offers for this plan.");
                setIsLoading(false);
                return;
            }
        }

        // Validate gigId exists
        if (!gigId) {
            setErrorMessage("Invalid gig reference. Please refresh the page and try again.");
            return;
        }

        // Check if the seller has already submitted an offer for this gig
        try {
            const existingOfferResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/server/offers/check-offer`,
                {
                    params: { gigId, sellerId: userId },
                    withCredentials: true,
                }
            );

            if (existingOfferResponse.data.exists) {
                setErrorMessage("You have already submitted an offer for this gig.");
                setIsLoading(false);
                return;
            }
        } catch (error) {
            console.error("Error checking existing offer:", error);
            setErrorMessage("Failed to check existing offers. Please try again.");
            setIsLoading(false);
            return;
        }

        // Sanitize and validate inputs using DOMPurify
        const sanitizedData = {
            offerPrice: DOMPurify.sanitize(formData.offerPrice?.trim() || ''),
            selectedTime: DOMPurify.sanitize(formData.selectedTime?.trim() || ''),
            offerComment: DOMPurify.sanitize(formData.offerComment?.trim() || ''),
        };

        // Detailed validation checks
        if (!sanitizedData.offerPrice) {
            newErrors.offerPriceError = true;
            isValid = false;
        } else {
            // Remove commas and validate number format
            const priceValue = sanitizedData.offerPrice.replace(/,/g, '');
            if (isNaN(priceValue)) {
                newErrors.offerPriceError = true;
                isValid = false;
                setErrorMessage("Please enter a valid price.");
                return;
            }
            if (parseFloat(priceValue) <= 0) {
                newErrors.offerPriceError = true;
                isValid = false;
                setErrorMessage("Price must be greater than 0.");
                return;
            }
        }

        if (!sanitizedData.selectedTime) {
            newErrors.offerTimeError = true;
            isValid = false;
        }

        if (!sanitizedData.offerComment) {
            newErrors.offerCommentError = true;
            isValid = false;
        } else if (sanitizedData.offerComment.length < 10) {
            newErrors.offerCommentError = true;
            isValid = false;
            setErrorMessage("Comment must be at least 10 characters long.");
            return;
        }

        // Set validation errors if any field is invalid
        if (!isValid) {
            setErrors(newErrors);
            setIsLoading(false);
            setErrorMessage("Please fill in all required fields correctly.");
            return;
        }

        try {
            // Prepare the request body
            const requestBody = {
                userId,
                gigId,
                gigOwnerId,
                firstName: DOMPurify.sanitize(user?.firstName || ''), // Sanitize first name
                lastName: DOMPurify.sanitize(user?.lastName || ''),   // Sanitize last name
                profileImg: DOMPurify.sanitize(user?.profileImg || ''), // Sanitize profile image
                offerPrice: sanitizedData.offerPrice,
                selectedTime: sanitizedData.selectedTime,
                offerComment: sanitizedData.offerComment,
                projectLink: DOMPurify.sanitize(location.pathname), // Sanitize project link
            };

            console.log("Sending offer request:", requestBody);
            console.log("User details before request:", {
                firstName: user?.firstName,
                lastName: user?.lastName,
                profileImg: user?.profileImg,
            });

            // Make API request
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/offers/new-offer`,
                requestBody,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Debug logging
            console.log("Offer creation successful:", response.data);
            setShowDefault(false);
            setShowSuccess(true);

            // Reset form data and errors
            setFormData({
                offerPrice: "",
                selectedTime: "",
                offerComment: "",
            });
            setErrors({});
            setErrorMessage("");

            // Trigger success callback if provided
            if (typeof onOfferSubmitSuccess === 'function') {
                onOfferSubmitSuccess(response.data);
            }
        } catch (error) {
            console.error("Error creating offer:", error);

            // Detailed error handling
            let errorMessage = "Failed to create offer. Please try again.";

            // Show error toast
            toast.error('Failed to create Offer.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            if (error.response) {
                console.error("Error response:", {
                    data: error.response.data,
                    status: error.response.status,
                    headers: error.response.headers,
                });

                // Set specific error message based on response
                errorMessage = error.response.data?.message || errorMessage;

                // Handle specific status codes
                switch (error.response.status) {
                    case 400:
                        errorMessage = "Invalid offer details. Please check your input.";
                        break;
                    case 401:
                        errorMessage = "Please log in to submit an offer.";
                        break;
                    case 403:
                        errorMessage = "You don't have permission to submit offers.";
                        break;
                    case 404:
                        errorMessage = "The gig you're trying to offer on wasn't found.";
                        break;
                    case 429:
                        errorMessage = "Too many attempts. Please try again later.";
                        break;
                    case 500:
                        errorMessage = "Server error. Please try again later.";
                        break;
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
                errorMessage = "No response from server. Please check your internet connection.";
            } else {
                console.error("Error details:", error.message);
            }

            // Set error message
            setErrorMessage(errorMessage);

            // Optional: Handle specific error states
            if (error.response?.status === 401) {
                // Handle unauthorized error (e.g., redirect to login)
                // navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };



    const getArabicDayLabel = (day) => {
        if (day === 1) return "يوم"; // 2 يوم
        if (day >= 3 && day <= 10) return "أيام";
        if (day >= 11) return "يوم";
        return "يوم";
    };




    return (
        <div
            style={{
                width: '100%',
                height: errorMessage ? '296px' :
                    showSuccess ? '200px' :
                        '265px',
                minWidth: 'min-content',


            }}
        >
            <div style={{
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
                    <div className="HeaderTypo"
                        style={{
                            width: '101%',
                            display: 'flex',
                            justifyContent: 'space-between',

                        }}
                    >
                        <div className="Content"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                            }}

                        >
                            <div className="AddYourOffer">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >

                                    {t('Add your offer')}
                                </Typography>
                            </div>
                            <div className="Note">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontWeight: '400',
                                        fontSize: '16px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    <span
                                        style={{
                                            color: 'orange',
                                            marginRight: '8px',
                                            marginLeft: currentLanguage === 'ar' ? '8px' : 'unset',
                                        }}
                                    >
                                        {t('Note :')}
                                    </span>

                                    {t('Please ensure your offers are respectful and relevant to the client projects listed. Inappropriate or disrespectful comments may result in suspension. Thank you for your cooperation.')}
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
                            <div className="Inputs"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: '10px',
                                    gap: '13px',
                                }}
                            >
                                {currentLanguage === 'ar' ? (
                                    <>
                                        <CacheProvider value={cacheRtl}>
                                            <ThemeProvider theme={rtlTheme}>
                                                <div className="YourPrice">
                                                    <TextField
                                                        id="outlined-basic"
                                                        required
                                                        label={t('أدخل سعر عرضك')}
                                                        variant="outlined"
                                                        value={formData.offerPrice}
                                                        onChange={handleOfferPriceChange}
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
                                                                    {errors.offerPriceError ? (
                                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                                    ) : (
                                                                        <MonetizationOnIcon style={{ color: '#2df873' }} />  // Show AttachMoneyIcon when there's no error (green color)
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
                                                                    borderColor: errors.offerPriceError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: errors.offerPriceError ? '2px' : '2px',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.offerPriceError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: '2px',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.offerPriceError ? '#ff4d4d' : '#FFFFFF',
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
                                                        className={errors.offerPriceError ? 'shake' : ''}

                                                    />
                                                </div>
                                            </ThemeProvider>
                                        </CacheProvider>

                                        <CacheProvider value={cacheRtl}>
                                            <ThemeProvider theme={rtlTheme}>
                                                <div className="Time">
                                                    <TextField
                                                        id="project-time"
                                                        label="وقت الإنهاء"
                                                        variant="outlined"
                                                        size="small"
                                                        value={selectedTime}
                                                        onClick={handleOpenTimeMenu}
                                                        inputProps={{
                                                            maxLength: 70
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
                                                                    <IconButton onClick={handleOpenTimeMenu} edge="end">
                                                                        {openTimeMenu ? (
                                                                            <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                        ) : (
                                                                            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            flex: 1,
                                                            width: '100%',
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '& fieldset': {
                                                                    borderColor: errors.offerTimeError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: errors.offerTimeError ? '2px' : '2px',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.offerTimeError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: '2px',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.offerTimeError ? '#ff4d4d' : '#FFFFFF',
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
                                                                },
                                                            },
                                                        }}
                                                        className={errors.offerTimeError ? 'shake' : ''}
                                                    />

                                                    <Menu
                                                        anchorEl={anchorElTime}
                                                        open={openTimeMenu}
                                                        onClose={() => handleCloseTimeMenu('')}
                                                        PaperProps={{
                                                            style: {
                                                                background: 'rgba(0, 0, 0, 0.8)',
                                                                width: '59%',
                                                                border: '1px solid white',
                                                                color: 'white',
                                                                borderRadius: '8px',
                                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                                maxHeight: '120px',
                                                                overflowY: 'auto',
                                                            },
                                                        }}
                                                        MenuListProps={{
                                                            style: {
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                padding: 0
                                                            }
                                                        }}
                                                    >
                                                        {DaysRange.map((day) => (
                                                            <MenuItem
                                                                key={day}
                                                                onClick={() => handleCloseTimeMenu(day)} // Set selected time
                                                                style={{
                                                                    color: '#fff',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    padding: '8px 16px',
                                                                    width: '100%'
                                                                }}
                                                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset scale on mouse leave
                                                            >
                                                                <span
                                                                    style={{
                                                                        fontFamily: '"Airbnbcereal", sans-serif',
                                                                        marginLeft: '6px'


                                                                    }}>{day}
                                                                </span>{" "}
                                                                {currentLanguage === 'ar' ? getArabicDayLabel(day) : "days"}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div>
                                            </ThemeProvider>
                                        </CacheProvider>

                                        <CacheProvider value={cacheRtl}>
                                            <ThemeProvider theme={rtlTheme}>
                                                <div className="Comment">
                                                    <TextField
                                                        id="outlined-basic"
                                                        required
                                                        label={t('أدخل تعليقك على عرضك')}
                                                        variant="outlined"
                                                        value={formData.offerComment}
                                                        onChange={handleOfferCommentChange}
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

                                                            style: {
                                                                color: '#FFFFFF',
                                                            },
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {errors.offerCommentError ? (
                                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                                    ) : (
                                                                        <MessageIcon style={{ color: '#2df873' }} />  // Show AttachMoneyIcon when there's no error (green color)
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
                                                                    borderColor: errors.offerCommentError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: errors.offerCommentError ? '2px' : '2px',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.offerCommentError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: '2px',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.offerCommentError ? '#ff4d4d' : '#FFFFFF',
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
                                                        className={errors.offerCommentError ? 'shake' : ''}

                                                    />
                                                </div>
                                            </ThemeProvider>
                                        </CacheProvider>

                                    </>
                                ) : (
                                    <>
                                        <div className="YourPrice">
                                            <TextField
                                                id="outlined-basic"
                                                required
                                                label={t('Enter your offer price')}
                                                variant="outlined"
                                                value={formData.offerPrice}
                                                onChange={handleOfferPriceChange}
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
                                                            {errors.offerPriceError ? (
                                                                <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                            ) : (
                                                                <MonetizationOnIcon style={{ color: '#2df873' }} />  // Show AttachMoneyIcon when there's no error (green color)
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
                                                            borderColor: errors.offerPriceError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.offerPriceError ? '2px' : '2px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.offerPriceError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.offerPriceError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.offerPriceError ? 'shake' : ''}

                                            />
                                        </div>
                                        <div className="Time">
                                            <TextField
                                                id="project-time"
                                                label="Time to Finish"
                                                variant="outlined"
                                                size="small"
                                                value={selectedTime}
                                                onClick={handleOpenTimeMenu}
                                                inputProps={{
                                                    maxLength: 70
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
                                                            <IconButton onClick={handleOpenTimeMenu} edge="end">
                                                                {openTimeMenu ? (
                                                                    <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.offerTimeError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.offerTimeError ? '2px' : '2px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.offerTimeError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.offerTimeError ? '#ff4d4d' : '#FFFFFF',
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
                                                        },
                                                    },
                                                }}
                                                className={errors.offerTimeError ? 'shake' : ''}
                                            />

                                            <Menu
                                                anchorEl={anchorElTime}
                                                open={openTimeMenu}
                                                onClose={() => handleCloseTimeMenu('')}
                                                PaperProps={{
                                                    style: {
                                                        background: 'rgba(0, 0, 0, 0.8)',
                                                        width: '59%',
                                                        border: '1px solid white',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                        maxHeight: '120px',
                                                        overflowY: 'auto',
                                                    },
                                                }}
                                                MenuListProps={{
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        padding: 0
                                                    }
                                                }}
                                            >
                                                {DaysRange.map((day) => (
                                                    <MenuItem
                                                        key={day}
                                                        onClick={() => handleCloseTimeMenu(day)} // Set selected time
                                                        style={{
                                                            color: '#fff',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            padding: '8px 16px',
                                                            width: '100%'
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset scale on mouse leave
                                                    >
                                                        <span
                                                            style={{
                                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                                marginLeft: '6px'


                                                            }}>{day}
                                                        </span>{" "}
                                                        {currentLanguage === 'ar' ? getArabicDayLabel(day) : "days"}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                        <div className="Comment">
                                            <TextField
                                                id="outlined-basic"
                                                required
                                                label={t('Enter your offer comment')}
                                                variant="outlined"
                                                value={formData.offerComment}
                                                onChange={handleOfferCommentChange}
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

                                                    style: {
                                                        color: '#FFFFFF',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {errors.offerCommentError ? (
                                                                <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                            ) : (
                                                                <MessageIcon style={{ color: '#2df873' }} />  // Show AttachMoneyIcon when there's no error (green color)
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
                                                            borderColor: errors.offerCommentError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.offerCommentError ? '2px' : '2px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.offerCommentError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.offerCommentError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.offerCommentError ? 'shake' : ''}

                                            />
                                        </div>
                                    </>
                                )}


                            </div>
                            <div className="Button"
                                style={{
                                    marginTop: '5px',

                                }}
                            >
                                <Button onClick={handleCreateOffer}
                                    variant="outlined"
                                    className="btn-grad"
                                    sx={{
                                        width: '100%', // Matches TextField's width
                                        height: '38px',
                                        borderColor: 'none',
                                        opacity: isLoading ? '0.5' : 'unset',
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
                                            {t('Add Offer')}
                                        </Typography>
                                    )}
                                </Button>
                            </div>


                        </div>
                        <div className="CloseIcon"
                            onClick={handleCloseOffer}
                            style={{
                                cursor: 'pointer',
                                marginLeft: currentLanguage === 'ar' ? '-5px' : '-12px',
                            }}
                        >
                            <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
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
                                {t('Your Offer Has Been Successfully Submitted!')}
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
                                {t('Thank you for submitting your offer. The Buyer will review it shortly. You will be notified once a decision is made.')}
                            </Typography>
                            <Button
                                onClick={handleCloseOffer}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    marginTop: '5px',
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

export default Offertabs
