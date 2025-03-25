import React, { useState, useEffect, useRef } from "react";
import { TextField, Box, List, Typography, ListItem, InputAdornment, Button } from "@mui/material";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useChat } from "../../Context/ChatContext.jsx";
import { useProject } from "../../Context/ProjectContext.jsx";
import DangerousIcon from '@mui/icons-material/Dangerous';
import ProgressBubble from './ProgressBubble.jsx'; // Import the new component
import Lottie from 'lottie-react';
import UploadProject from '../../assets/images/small-logos/UploadProject.json';
import PaymentDone from '../../assets/images/small-logos/PaymentDone.json';
import useMediaQuery from '@mui/material/useMediaQuery';
import NoProjects from '../../assets/images/small-logos/NoProjects.json';
import Review from '../../assets/images/small-logos/Review.json';
import axios from "axios";
import MakeAReview from '../Categories/Responsivedesign/MakeAReview.jsx';
import { useUser } from '../../Context/UserContext.jsx'
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import DOMPurify from 'dompurify';
import ProjectCardSkeleton from './ProjectCardSkeleton.jsx'
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';


// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});




function ProjectManagment({ selectedConversation, handleHowItWorkOpen }) {


    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n
            .changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);


      const isSmallScreen = useMediaQuery('(max-width:600px)');
        const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
        const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
        const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const { getProfileImage } = useChat();
    const { project,
        setProject,
        fetchProjectByConversationId,
        loading,
        error,
        sendValidationRequest,
        declineOffer,
        acceptOffer,
        sendProjectToBuyer,
        handleNotSatisfied,
        releaseFunds
    } = useProject();







    const fileInputRef = useRef(null); // ✅ Using useRef for file input

    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

    const [cloudErrors, setCloudErrors] = useState("");


    // 📌 Open file selector when clicking upload button
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    // 📌 Trigger upload immediately after file selection
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            handleUpload(selectedFile);
        }
    };



    const handleUpload = async (file) => {
        if (!file || !project?._id) {
            console.error("No file selected or project ID missing!");
            return;
        }

        try {
            // ✅ Get signed upload details from backend
            const { data: signData } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/server/upload/sign-upload`,
                {
                    withCredentials: true, // ✅ Include credentials (cookies, session, etc.)
                }
            );

            const { timestamp, signature, apiKey } = signData;

            // ✅ Prepare FormData for Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "projects"); // Your Cloudinary preset
            formData.append("folder", "client-projects");
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            formData.append("api_key", apiKey);

            // ✅ Upload to Cloudinary with progress tracking
            const { data: uploadData } = await axios.post(
                `https://api.cloudinary.com/v1_1/damicjacf/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    },
                }
            );

            console.log("Uploaded File URL:", uploadData.secure_url);
            setUploadedFileUrl(uploadData.secure_url);
            setUploadComplete(true);

            // ✅ Save the file URL in the database
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/projects/upload/${project._id}`,
                { projectFileUrl: uploadData.secure_url },
                { withCredentials: true }
            );

            console.log("File URL saved successfully in DB!");
        } catch (error) {
            console.error("Upload failed:", error);
            setCloudErrors("Upload failed. Please try again.");
        }
    };




    const { user, setUser } = useUser();





    const isSeller = user?._id === selectedConversation?.sellerId?._id;
    const isBuyer = !isSeller;





    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        lastPrice: '',
        deliveryTime: '',       // For display (DD/MM/YYYY format)
        deliveryTimeISO: null   // For actual date calculations and backend
    });

    const [errors, setErrors] = useState({
        lastPriceError: '',
        deliveryTimeError: '',

    });

    const handleLastPriceChange = (e) => {
        const sanitizedValue = DOMPurify.sanitize(e.target.value);
        const rawValue = sanitizedValue.replace(/[^0-9.]/g, '');
        console.log("Last Price Input:", rawValue); // Debugging

        // Check if the number exceeds 1 million
        if (parseInt(rawValue.replace(/[^\d]/g, '')) > 1000000) {
            setErrorMessage('We cannot handle more than 1 million for transaction payment.');
            setErrors(prev => ({ ...prev, lastPriceError: true }));
            return;
        }

        // Clear error state when input is valid
        setErrorMessage('');
        setErrors(prev => ({ ...prev, lastPriceError: false }));

        // Update form data
        setFormData(prev => ({ ...prev, lastPrice: rawValue }));
    };

    const handleDeliveryTimeChange = (e) => {
        // Sanitize the input value using DOMPurify
        const sanitizedValue = DOMPurify.sanitize(e.target.value);

        // Remove non-numeric characters
        const rawValue = sanitizedValue.replace(/[^\d]/g, '');
        let formattedValue = '';

        // Auto-format as MM/DD/YYYY
        if (rawValue.length > 0) formattedValue = rawValue.slice(0, 2); // MM
        if (rawValue.length > 2) formattedValue += '/' + rawValue.slice(2, 4); // MM/DD
        if (rawValue.length > 4) formattedValue += '/' + rawValue.slice(4, 8); // MM/DD/YYYY

        let isoDate = null;
        if (rawValue.length === 8) { // Ensure the full date is entered (MMDDYYYY)
            const month = parseInt(rawValue.slice(0, 2), 10); // Extract month
            const day = parseInt(rawValue.slice(2, 4), 10); // Extract day
            const year = parseInt(rawValue.slice(4, 8), 10); // Extract year (full 4 digits)

            // Create ISO date (JavaScript Date months are 0-based)
            const dateObj = new Date(year, month - 1, day);

            // Validate date
            const isValid = (
                dateObj.getFullYear() === year && // Ensure year matches
                dateObj.getMonth() === month - 1 && // Ensure month matches (0-based)
                dateObj.getDate() === day && // Ensure day matches
                dateObj > new Date() // Ensure the date is in the future
            );

            if (!isValid) {
                setErrors(prev => ({ ...prev, deliveryTimeError: true }));
                setErrorMessage('Please enter a valid future date (MM/DD/YYYY)');
                return;
            }

            isoDate = dateObj.toISOString(); // Convert to ISO format
        }

        // Update form data with the sanitized and formatted value
        setFormData(prev => ({
            ...prev,
            deliveryTime: formattedValue, // Formatted as MM/DD/YYYY
            deliveryTimeISO: isoDate // ISO date for backend
        }));

        // Update errors
        setErrors(prev => ({ ...prev, deliveryTimeError: !isoDate }));
        setErrorMessage(isoDate ? '' : 'Please complete the date (MM/DD/YYYY)');
    };

    // Add this format function
    const formatDate = (isoString) => {
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) {
                return 'Invalid date';
            }
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        } catch (error) {
            console.error('Error formatting date:', error, isoString);
            return 'Error formatting date';
        }
    };


    useEffect(() => {
        if (selectedConversation?._id) {
            fetchProjectByConversationId(selectedConversation._id);
        }
    }, [selectedConversation]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set loading state to true
        setIsLoading(true);

        // Sanitize form data using DOMPurify
        const sanitizedLastPrice = DOMPurify.sanitize(formData.lastPrice);
        const sanitizedDeliveryTime = DOMPurify.sanitize(formData.deliveryTime);

        // Validate form data
        if (!sanitizedLastPrice || !sanitizedDeliveryTime) {
            setErrorMessage('Please fill in all fields.');
            setIsLoading(false); // Reset loading state
            return;
        }

        // Validate ISO date exists
        if (!formData.deliveryTimeISO) {
            setErrorMessage('Invalid delivery date format');
            setIsLoading(false); // Reset loading state
            return;
        }

        try {
            // Send ISO date to backend
            await sendValidationRequest(
                project._id,
                sanitizedLastPrice,
                formData.deliveryTimeISO // Send ISO date instead of formatted string
            );

            // Update local state with ISO date
            setProject((prev) => ({
                ...prev,
                lastPrice: sanitizedLastPrice,
                deliveryTime: formData.deliveryTimeISO, // Store ISO date
                isBuyerNotified: true
            }));

            // Reset form data
            setFormData({
                lastPrice: '',
                deliveryTime: '',
                deliveryTimeISO: null
            });

            setErrorMessage('Validation request sent successfully!');
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleDeclineoffer = async (e) => {
        e.preventDefault();



        try {
            // Send validation request
            await declineOffer(project._id);

            // Update the local project state
            setProject((prevProject) => ({
                ...prevProject,

                isBuyerNotified: false, // Update isBuyerNotified locally
            }));



            // Show success message
            setErrorMessage('Validation request sent successfully!');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleAcceptOffer = async (e) => {
        e.preventDefault();
        try {
            await acceptOffer(project._id);

            // Update local state
            setProject(prev => ({
                ...prev,
                status: 'In Progress',
                fundsHeld: true,
                startTime: new Date().toISOString()
            }));

            setErrorMessage('Offer accepted successfully! Funds have been held.');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleSendProjectToBuyer = async () => {
        try {
            await sendProjectToBuyer(project._id);
            // Update local state
            setProject(prev => ({
                ...prev,
                isProjectSent: true,
                isProjectNeedChanges :false,
                projectFileUrl: project.projectFileUrl,

            }));

            setErrorMessage('Project Has Been sent successfully!');

        } catch (error) {

        }
    };


    const handleNeedChanges = async () => {
        try {
            await handleNotSatisfied(project._id);
            // Update local state
            setProject(prev => ({
                ...prev,
                isProjectSent: false,
                isProjectNeedChanges: true,


            }));



        } catch (error) {

        }
    };






    const CountdownTimer = ({ deliveryTime }) => {
        const [timeLeft, setTimeLeft] = useState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: false,
            isValid: false
        });

        useEffect(() => {
            const calculateTimeLeft = () => {
                const end = new Date(deliveryTime);
                const now = new Date();

                if (isNaN(end)) { // Check for invalid date
                    return { isValid: false };
                }

                const totalMs = end - now;

                return {
                    days: Math.max(0, Math.floor(totalMs / (1000 * 60 * 60 * 24))),
                    hours: Math.max(0, Math.floor((totalMs / (1000 * 60 * 60)) % 24)),
                    minutes: Math.max(0, Math.floor((totalMs / 1000 / 60) % 60)),
                    seconds: Math.max(0, Math.floor((totalMs / 1000) % 60)),
                    expired: totalMs <= 0,
                    isValid: true
                };
            };

            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            // Initial calculation
            setTimeLeft(calculateTimeLeft());

            return () => clearInterval(timer);
        }, [deliveryTime]); // Only depend on deliveryTime

        if (!timeLeft.isValid) {
            return (
                <Typography sx={{ color: 'yellow' }}>
                    Loading delivery time...
                </Typography>
            );
        }

        if (timeLeft.expired) {
            return <Typography sx={{ color: 'red' }}>Delivery time expired!</Typography>;
        }

        return (
            <Typography sx={{ color: 'white', fontFamily: 'monospace' }}>
                {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            </Typography>
        );
    };

    const handleReleaseFunds = async () => {
        try {
            await releaseFunds(project._id);


            setProject(prev => ({
                ...prev,
                status: 'Completed',


            }));

            console.log("Funds released successfully!");
        } catch (error) {
            console.error("Error releasing funds:", error);
        }
    };


    const [reviewErrorMessage, setReviewErrorMessage] = useState('');
    const [reviewError, setReviewError] = useState({
        commentError: '',

    });
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState({
        interactionBrilliance: 0,
        engagement: 0,
        craftedExcellence: 0,
        domainExpertise: 0
    });

    // Handle rating change for a specific category
    const handleRatingChange = (category, value) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [category]: value
        }));
    };


    const containsArabic = (text) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    };


    const [reviewSection, setReviewSection] = useState(true);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    const handleReviewComment = (e) => {
        const value = e.target.value;
    
        // Sanitize the input using DOMPurify
        const sanitizedValue = DOMPurify.sanitize(value);
    
        // Check if the input contains only numbers
        if (/^\d+$/.test(sanitizedValue)) {
            setReviewErrorMessage('Comment cannot be just numbers.');
            setReviewError(prevErrors => ({
                ...prevErrors,
                commentError: true
            }));
            return;
        }
    
        // Clear error state if input is valid
        setReviewErrorMessage('');
        setReviewError(prevErrors => ({
            ...prevErrors,
            commentError: false
        }));
    
        // Update the comment state with the sanitized value
        setComment(sanitizedValue);
    };
    
    const submitReview = async () => {
        setIsLoading(true); // Start loading
        try {
            const isRatingValid = Object.values(ratings).every(rating => rating >= 1);
            if (!isRatingValid) {
                setReviewErrorMessage('Please provide at least 1 star for each rating category.');
                setIsLoading(false); // Stop loading
                return;
            }
    
            // Validate comment
            if (reviewError.commentError || !comment.trim()) {
                setReviewErrorMessage('Please enter a valid comment.');
                setIsLoading(false); // Stop loading
                return;
            }
    
            // Sanitize the comment again before sending it to the backend
            const sanitizedComment = DOMPurify.sanitize(comment);
    
            // Prepare the request payload
            const payload = {
                sellerId: selectedConversation?.sellerId?._id, // Dynamic sellerId
                projectId: project._id,
                ratings,
                comment: sanitizedComment // Use the sanitized comment
            };
    
            // Make the API request
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/reviews/generalreviews`,
                payload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Handle success
            if (response.data.success) {
                console.log('Review created successfully:', response.data.data);
    
                setComment('');
                setRatings({
                    interactionBrilliance: 0,
                    engagement: 0,
                    craftedExcellence: 0,
                    domainExpertise: 0
                });
    
                setReviewSection(false);
                setReviewSuccess(true);
            } else {
                throw new Error(response.data.message || 'Failed to create review');
            }
        } catch (error) {
            console.error('Error creating review:', error.response ? error.response.data : error.message);
            setReviewErrorMessage(error.response?.data?.message || 'Unable to submit review');
        } finally {
            setIsLoading(false);
        }
    };
 


    if (loading) return <ProjectCardSkeleton/>;
    if (error) return <p>Error: {error}</p>;



    return (
        <div className="ProjectContainer"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflowY: 'auto',
            }}
        >
            <div className="Header"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems : isSmallScreen? 'center' : 'unset',
                    width: '100%',
                    gap: '10px',
                }}
            >
                <div className="Titel">
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily:
                                currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '17px',
                            fontWeight: 'bold',

                        }}
                    >
                        {t('Manage, Deliver & Track Your Projects Effortlessly')}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily:
                                currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',

                            display: 'flex',
                             textAlign : 'center',
                            fontSize: '15px',
                            opacity: '0.5',
                            fontWeight: 'bold',

                        }}
                    >
                        {t('Welcome to the Project Workflow section. Here is how you can seamlessly manage your project')}
                    </Typography>


                </div>
                <Button
                    onClick={handleHowItWorkOpen}
                    variant="outlined"
                    className=""
                    sx={{
                        width: isSmallScreen? '90%' : '30%',
                        position: 'relative',
                        cursor: 'pointer',
                        background: 'black',
                        border : '1px solid white',
                        borderRadius: '16px',
                        height: '38px',
                        color: 'white',

                        borderColor: 'none',
                        '&:hover': {
                            borderColor: 'white',

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
                        {t('See how its work')}
                    </Typography>


                </Button>


            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}

            />
            {project ? (
                <div style={{ display: 'flex',
                 gap: '20px',
                  width: '100%',
                  justifyContent : isSmallScreen? 'center' :'unset',
                   }}>
                    <div className="ProjectCard"
                        style={{
                            border: '1px solid grey',
                            borderRadius: '10px',
                            width: isSmallScreen? '90%' : '40%',
                            height: 'auto',
                            padding: '20px',
                            gap: '20px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            background: 'rgba(0, 0, 0, 0.3)',

                        }}
                    >
                        <div className="CardHeader"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: project?.title && containsArabic(project?.title)
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                            >
                                {project?.title}
                            </Typography>

                        </div>

                        <div className="StatusBadge"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >

                            {project?.status === 'Inactive' && (

                                <Button
                                    sx={{
                                        color: "white",
                                        backgroundColor: "rgba(220, 38, 38, 0.15)", // Light red background with transparency
                                        boxShadow:
                                            "0px 4px 6px rgba(220, 38, 38, 0.15), 0px 1px 3px rgba(220, 38, 38, 0.2)",
                                        borderRadius: "16px",
                                        height: "32px",
                                        display: "flex",
                                        justifyContent: "center",
                                        "&:hover": {
                                            backgroundColor: "rgba(220, 38, 38, 0.2)", // Slightly darker on hover
                                            boxShadow:
                                                "0px 4px 6px rgba(220, 38, 38, 0.15), 0px 1px 3px rgba(220, 38, 38, 0.2)",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "rgb(220, 38, 38)", // Modern red text that matches the background
                                            flex: 1,
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            textTransform: "capitalize",
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                            textAlign: "center",
                                            textWrap: 'nowrap',
                                        }}
                                    >
                                        {t("Inactive")}
                                    </Typography>
                                </Button>
                            )}
                            {project?.status === 'In Progress' && (

                                <Button
                                    sx={{

                                        color: 'white',
                                        backgroundColor: 'rgba(255, 153, 0, 0.2)',  // Orange
                                        boxShadow: '0px 4px 6px rgba(255, 153, 0, 0.2), 0px 1px 3px rgba(255, 153, 0, 0.3)',
                                        borderRadius: '16px',
                                        height: '32px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 153, 0, 0.2)',
                                            boxShadow: '0px 4px 6px rgba(255, 153, 0, 0.2), 0px 1px 3px rgba(255, 153, 0, 0.3)',
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'rgb(255, 153, 0)',  // Orange text
                                            flex: 1,
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('In Progress')}
                                    </Typography>
                                </Button>
                            )}
                            {project?.status === 'On Hold' && (

                                <Button
                                    sx={{

                                        color: 'white',
                                        backgroundColor: 'rgba(0, 116, 255, 0.2)',
                                        boxShadow: '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                        borderRadius: '16px',
                                        height: '32px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 116, 255, 0.2)',
                                            boxShadow: '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'rgba(0, 116, 255)',
                                            flex: 1,
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('On Hold')}
                                    </Typography>
                                </Button>
                            )}
                            {project?.status === 'Completed' && (

                                <Button
                                    sx={{

                                        color: 'white',
                                        backgroundColor: '#194e3d',  // Green for accepted
                                        boxShadow: '0px 4px 6px rgba(40, 167, 69, 0.2), 0px 1px 3px rgba(40, 167, 69, 0.2)',
                                        borderRadius: '16px',
                                        height: '32px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: 'rgba(40, 167, 69, 0.2)',
                                            boxShadow: '0px 4px 6px rgba(40, 167, 69, 0.2), 0px 1px 3px rgba(40, 167, 69, 0.2)',
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#2df873', // Green text
                                            flex: 1,
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('Completed')}
                                    </Typography>
                                </Button>
                            )}
                            {project?.status === 'Cancelled' && (

                                <Button
                                    sx={{

                                        color: 'white',
                                        backgroundColor: '#194e3d',  // Green for accepted
                                        boxShadow: '0px 4px 6px rgba(40, 167, 69, 0.2), 0px 1px 3px rgba(40, 167, 69, 0.2)',
                                        borderRadius: '16px',
                                        height: '32px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: 'rgba(40, 167, 69, 0.2)',
                                            boxShadow: '0px 4px 6px rgba(40, 167, 69, 0.2), 0px 1px 3px rgba(40, 167, 69, 0.2)',
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#2df873', // Green text
                                            flex: 1,
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('Cancelled')}
                                    </Typography>
                                </Button>
                            )}
                            {project?.status === 'In Review' && (

                                <Button
                                    sx={{

                                        color: 'white',
                                        backgroundColor: 'rgb(61, 45, 111)',  // Green for accepted
                                        boxShadow: '0px 4px 6px rgba(40, 167, 69, 0.2), 0px 1px 3px rgba(40, 167, 69, 0.2)',
                                        borderRadius: '16px',
                                        height: '32px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: 'rgba(40, 167, 69, 0.2)',
                                            boxShadow: '0px 4px 6px rgba(40, 167, 69, 0.2), 0px 1px 3px rgba(40, 167, 69, 0.2)',
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'rgb(139, 92, 246)', // Green text
                                            flex: 1,
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('In Review')}
                                    </Typography>
                                </Button>
                            )}
                        </div>

                        <div className="CardDetails"
                            style={{

                                display: 'flex',
                                justifyContent: 'center',
                                gap: '15px',
                                marginTop: '20px',
                            }}
                        >
                            <div className="First"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                }}
                            >
                                <div className="DetailItem"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            fontSize: '12px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {t('Project Budget')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 'medium',
                                            color: 'white',
                                            opacity: '0.5',
                                        }}
                                    >

                                        {project?.gigId?.selectedBudget}
                                    </Typography>
                                </div>
                                <div className="DetailItem"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            fontSize: '12px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {t('Offer Price')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 'medium',
                                            color: 'white',
                                            opacity: '0.5',
                                        }}
                                    >
                                        {project?.budget}$
                                    </Typography>
                                </div>

                            </div>
                            <div className="Second"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                }}
                            >
                                <div className="DetailItem"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            fontSize: '12px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {t('Delivery time')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 'medium',
                                            color: 'white',
                                            opacity: '0.5',
                                        }}
                                    >
                                        {project?.gigId?.selectedTime}
                                    </Typography>
                                </div>

                                <div className="DetailItem"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily:
                                                currentLanguage === 'ar'
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            fontSize: '12px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {t('Created At')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 'medium',
                                            color: 'white',
                                            opacity: '0.5',
                                        }}
                                    >
                                        {formatDate(project.createdAt)}
                                    </Typography>
                                </div>
                            </div>



                        </div>


                        <div className="CardFooter"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px',
                                gap: '10px',
                            }}
                        >
                            <div className="Div">
                                <Typography
                                    sx={{
                                        fontFamily:
                                            currentLanguage === 'ar'
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    {t('Project Members')}
                                </Typography>
                            </div>
                            <div className="MembersContainer"
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    padding: '0 10px',
                                }}
                            >
                                {/* Seller Profile */}
                                <div className="MemberProfile"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <div style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        overflow: 'hidden',
                                    }}>
                                        <img
                                            src={getProfileImage(selectedConversation?.sellerId?.profileImg)}
                                            alt="Seller Profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <Typography
                                        sx={{
                                            fontFamily: (selectedConversation?.sellerId?.firstName && containsArabic(selectedConversation?.sellerId?.firstName)) ||
                                                (selectedConversation?.sellerId?.lastName && containsArabic(selectedConversation?.sellerId?.lastName))
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                            fontSize: '12px',
                                            color: 'white',
                                        }}
                                    >
                                        {selectedConversation?.sellerId?.firstName} {selectedConversation?.sellerId?.lastName}
                                    </Typography>
                                </div>

                                {/* Buyer Profile */}
                                <div className="MemberProfile"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <div style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        overflow: 'hidden',
                                    }}>
                                        <img
                                            src={getProfileImage(selectedConversation?.buyerId?.profileImg)}
                                            alt="Buyer Profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <Typography
                                        sx={{
                                            fontFamily: (selectedConversation?.buyerId?.firstName && containsArabic(selectedConversation?.buyerId?.firstName)) ||
                                                (selectedConversation?.buyerId?.lastName && containsArabic(selectedConversation?.buyerId?.lastName))
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                            fontSize: '12px',
                                            color: 'white',
                                        }}
                                    >
                                        {selectedConversation?.buyerId?.firstName} {selectedConversation?.buyerId?.lastName}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        {errorMessage && (
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    color: errorMessage === "Validation request sent successfully!" && "Project Has Been sent successfully!" ? '#2df873' : '#ff4d4d',
                                }}
                            >
                                {t(errorMessage)}
                            </Typography>
                        )}
                        {successMessage && (
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    color: '#2df873',
                                }}
                            >
                                {t(successMessage)}
                            </Typography>
                        )}
                        {isSeller && (
                            <>
                                {project.status === 'In Review' ? (
                                    <>
                                        {project.isProjectNeedChanges ? (
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    textTransform: 'capitalize',
                                                    fontSize: '13px',
                                                    textAlign: 'center',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                {t('The buyer has reviewed the project and requested changes')}
                                            </Typography>
                                        ) : (
                                            <>
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontSize: '13px',
                                                        textAlign: 'center',
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    {t('Waiting For the Client Review!')}
                                                </Typography>
                                                <div className="DataSave"
                                                    style={{
                                                        borderRadius: '10px',
                                                        padding: '8px',
                                                        background: '#194e3d',
                                                        display: 'flex',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        gap: '10px',
                                                        alignItems: 'center',
                                                        color: '#2df873',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            textAlign: 'center',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('No Need to Worry! If the buyer does not respond within 2 days, the funds will be automatically transferred to your account. 🚀')}
                                                    </Typography>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : project.status === 'In Progress' ? (
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Typography variant="h6"
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}>
                                            {t('You have to Delivery Within')}
                                        </Typography>
                                        <CountdownTimer
                                            startTime={project.startTime}
                                            deliveryTime={project.deliveryTime}
                                        />
                                        <Typography sx={{
                                            color: '#f5f5f5', mt: 1,
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}>
                                            {t('Last Price:')}
                                            <span
                                                style={{
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                }}
                                            >
                                                {project.lastPrice}$
                                            </span>
                                        </Typography>
                                        <Typography sx={{
                                            color: '#f5f5f5',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}>
                                            {t('Delivery Time:')}
                                            <span
                                                style={{
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                }}
                                            >
                                                {formatDate(project.deliveryTime)}
                                            </span>
                                        </Typography>
                                    </Box>
                                ) : project.status === 'Completed' ? (
                                    <div className="DataSave"
                                        style={{
                                            borderRadius: '10px',
                                            padding: '16px',
                                            background: '#194e3d',
                                            display: 'flex',
                                            gap: '10px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#2df873',
                                            marginTop: '16px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            {t('Project Completed Successfully! 🎉')}
                                        </Typography>
                                    </div>
                                ) : (
                                    <>
                                        {!project.isBuyerNotified ? (
                                            // Existing seller input form
                                            <>
                                                {currentLanguage === 'ar' ? (
                                                    <>
                                                        <CacheProvider value={cacheRtl}>
                                                            <ThemeProvider theme={rtlTheme}>
                                                                <div className="Twoinputs"
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: '9px',
                                                                        marginTop: '10px',
                                                                    }}
                                                                >
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label={t('آخر سعر')}
                                                                        variant="outlined"
                                                                        value={formData.lastPrice}
                                                                        onChange={handleLastPriceChange}
                                                                        size="small"
                                                                        inputProps={{ maxLength: 15 }}
                                                                        InputLabelProps={{
                                                                            style: { color: '#FFFFFF' },
                                                                            sx: {
                                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                            },
                                                                        }}
                                                                        InputProps={{
                                                                            style: { color: '#FFFFFF' },
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                    {errors.lastPriceError && <DangerousIcon style={{ color: '#ff4d4d' }} />}
                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                        sx={{
                                                                            flex: 1,
                                                                            width: '100%',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '8px',
                                                                                '& fieldset': {
                                                                                    borderColor: errors.lastPriceError ? '#ff4d4d' : '#FFFFFF',
                                                                                    borderWidth: errors.lastPriceError ? '2px' : '1px',
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: errors.lastPriceError ? '#ff4d4d' : '#FFFFFF',
                                                                                    borderWidth: '2px',
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: errors.lastPriceError ? '#ff4d4d' : '#FFFFFF',
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
                                                                        className={errors.lastPriceError ? 'shake' : ''}
                                                                    />
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="تاريخ التسليم (شهر/يوم/سنة)"
                                                                        variant="outlined"
                                                                        value={formData.deliveryTime}
                                                                        onChange={handleDeliveryTimeChange}
                                                                        size="small"
                                                                        inputProps={{ maxLength: 10 }}
                                                                        InputLabelProps={{
                                                                            style: { color: '#FFFFFF' },
                                                                            sx: {
                                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                            },
                                                                        }}
                                                                        InputProps={{
                                                                            style: { color: '#FFFFFF' },
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                    {errors.deliveryTimeError && <DangerousIcon style={{ color: '#ff4d4d' }} />}
                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                        sx={{
                                                                            flex: 1,
                                                                            width: '100%',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '8px',
                                                                                '& fieldset': {
                                                                                    borderColor: errors.deliveryTimeError ? '#ff4d4d' : '#FFFFFF',
                                                                                    borderWidth: errors.deliveryTimeError ? '2px' : '1px',
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: errors.deliveryTimeError ? '#ff4d4d' : '#FFFFFF',
                                                                                    borderWidth: '2px',
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: errors.deliveryTimeError ? '#ff4d4d' : '#FFFFFF',
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
                                                                        className={errors.deliveryTimeError ? 'shake' : ''}
                                                                    />
                                                                </div>
                                                            </ThemeProvider>
                                                        </CacheProvider>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="Twoinputs"
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: '9px',
                                                                marginTop: '10px',
                                                            }}
                                                        >
                                                            <TextField
                                                                id="outlined-basic"
                                                                label={t('Last Price')}
                                                                variant="outlined"
                                                                value={formData.lastPrice}
                                                                onChange={handleLastPriceChange}
                                                                size="small"
                                                                inputProps={{ maxLength: 15 }}
                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    sx: {
                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {errors.lastPriceError && <DangerousIcon style={{ color: '#ff4d4d' }} />}
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                sx={{
                                                                    flex: 1,
                                                                    width: '100%',
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: '8px',
                                                                        '& fieldset': {
                                                                            borderColor: errors.lastPriceError ? '#ff4d4d' : '#FFFFFF',
                                                                            borderWidth: errors.lastPriceError ? '2px' : '1px',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.lastPriceError ? '#ff4d4d' : '#FFFFFF',
                                                                            borderWidth: '2px',
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.lastPriceError ? '#ff4d4d' : '#FFFFFF',
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
                                                                className={errors.lastPriceError ? 'shake' : ''}
                                                            />
                                                            <TextField
                                                                id="outlined-basic"
                                                                label="Delivery Date (MM/DD/YYYY)"
                                                                variant="outlined"
                                                                value={formData.deliveryTime}
                                                                onChange={handleDeliveryTimeChange}
                                                                size="small"
                                                                inputProps={{ maxLength: 10 }}
                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    sx: {
                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {errors.deliveryTimeError && <DangerousIcon style={{ color: '#ff4d4d' }} />}
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                sx={{
                                                                    flex: 1,
                                                                    width: '100%',
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: '8px',
                                                                        '& fieldset': {
                                                                            borderColor: errors.deliveryTimeError ? '#ff4d4d' : '#FFFFFF',
                                                                            borderWidth: errors.deliveryTimeError ? '2px' : '1px',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.deliveryTimeError ? '#ff4d4d' : '#FFFFFF',
                                                                            borderWidth: '2px',
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.deliveryTimeError ? '#ff4d4d' : '#FFFFFF',
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
                                                                className={errors.deliveryTimeError ? 'shake' : ''}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <Button
                                                    onClick={handleSubmit}
                                                    variant="outlined"
                                                    className="btn-grad"
                                                    sx={{
                                                        width: '100%',
                                                        position: 'relative',
                                                        cursor: 'pointer',
                                                        height: '38px',
                                                        marginTop: '10px',
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
                                                            {t('Request Validation')}
                                                        </Typography>
                                                    )}
                                                </Button>
                                            </>
                                        ) : (
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    textTransform: 'capitalize',
                                                    fontSize: '13px',
                                                    textAlign: 'center',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                {t('Waiting For Buyer Validation')}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {isBuyer && (
                            <>
                                {project.status === 'In Review' ? (
                                    <>
                                        {project.isProjectNeedChanges ? (
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    textTransform: 'capitalize',
                                                    fontSize: '13px',
                                                    textAlign: 'center',
                                                    marginTop : '10px',
                                                }}
                                            >
                                                {t('Waiting for the seller to make the requested changes...')}
                                            </Typography>
                                        ) : (
                                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            currentLanguage === 'ar'
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                        fontSize: '14px',
                                                        color: '#f5f5f5',
                                                        marginTop: '10px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {t('The Seller Has Sent the Project for Review')}
                                                </Typography>
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    marginTop: '10px',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                }}>
                                                    {/* Button 1: Download & Review The Project */}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        component="a"
                                                        href={project.projectFileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    currentLanguage === 'ar'
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                fontSize: '14px',
                                                                color: '#f5f5f5',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {t('Download & Review The Project')}
                                                        </Typography>
                                                    </Button>

                                                    {/* Button 2: Am Satisfied & Release Funds */}
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={handleReleaseFunds}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    currentLanguage === 'ar'
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                fontSize: '14px',
                                                                color: '#f5f5f5',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {t('Am Satisfied & Release Funds')}
                                                        </Typography>
                                                    </Button>

                                                    {/* Button 3: Not Satisfied & Request Changes */}
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNeedChanges}
                                                        color="error"
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    currentLanguage === 'ar'
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                fontSize: '14px',
                                                                color: '#f5f5f5',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {t('Am Not Satisfied & Request Changes')}
                                                        </Typography>
                                                    </Button>
                                                </div>
                                            </Box>
                                        )}
                                    </>
                                ) : project.status === 'In Progress' ? (
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Typography variant="h6"
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}>
                                            {t('Your Project Will be Ready in')}
                                        </Typography>
                                        <CountdownTimer
                                            startTime={project.startTime}
                                            deliveryTime={project.deliveryTime}
                                        />
                                        <Typography sx={{
                                            color: '#f5f5f5', mt: 1,
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}>
                                            {t('Agreed Price:')}
                                            <span
                                                style={{
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                }}
                                            >
                                                {project.lastPrice}$
                                            </span>
                                        </Typography>
                                        <Typography sx={{
                                            color: '#f5f5f5',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}>
                                            {t('Delivery Deadline:')}
                                            <span
                                                style={{
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                }}
                                            >
                                                {formatDate(project.deliveryTime)}
                                            </span>
                                        </Typography>
                                    </Box>
                                ) : project.status === 'Completed' ? (
                                    <div className="DataSave"
                                        style={{
                                            borderRadius: '10px',
                                            padding: '16px',
                                            background: '#194e3d',
                                            display: 'flex',
                                            gap: '10px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#2df873',
                                            marginTop: '16px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            {t('Project Completed Successfully! 🎉')}
                                        </Typography>
                                    </div>
                                ) : (
                                    <>
                                        {!project.isBuyerNotified ? (
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            currentLanguage === 'ar'
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                        fontSize: '14px',
                                                        color: '#f5f5f5',
                                                        fontStyle: 'italic',
                                                        marginTop: '10px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {t("Waiting for seller to start the project")}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            currentLanguage === 'ar'
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                        fontSize: '14px',
                                                        color: '#f5f5f5',
                                                        fontStyle: 'italic',
                                                        marginTop: '10px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {t('A Request from the Seller')}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            currentLanguage === 'ar'
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                        fontSize: '14px',
                                                        color: '#f5f5f5',
                                                        marginTop: '10px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {t('Last Price:')}
                                                    <span
                                                        style={{
                                                            fontFamily: '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {project.lastPrice} $
                                                    </span>
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            currentLanguage === 'ar'
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                        fontSize: '14px',
                                                        color: '#f5f5f5',
                                                        marginTop: '10px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {t('Delivery Time:')}
                                                    <span
                                                        style={{
                                                            fontFamily: '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {formatDate(project.deliveryTime)}
                                                    </span>
                                                </Typography>
                                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={handleAcceptOffer}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    currentLanguage === 'ar'
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                fontSize: '14px',
                                                                color: '#f5f5f5',
                                                                fontStyle: 'italic',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {t('Accept')}
                                                        </Typography>
                                                    </Button>
                                                    <Button
                                                        onClick={handleDeclineoffer}
                                                        variant="contained"
                                                        color="error"
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    currentLanguage === 'ar'
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                fontSize: '14px',
                                                                color: '#f5f5f5',
                                                                fontStyle: 'italic',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {t('Decline')}
                                                        </Typography>
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}


                    </div>

                    {isSeller && project?.status === 'In Progress' && !project.isProjectSent && (

                        <>
                            <div className="EmptyCard"
                                style={{
                                    border: '1px solid grey',
                                    borderRadius: '10px',
                                    width: '40%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '20px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <div className="Lottie"
                                    style={{}}
                                >
                                    <Lottie
                                        animationData={UploadProject}

                                        style={{
                                            width: '200px',
                                            height: '200px',
                                        }} />
                                </div>
                                <div className="Div">
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar'
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('Project Ahead of Schedule? Upload Your Work Now!')}
                                    </Typography>
                                </div>
                                <div className="Div"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {uploadComplete ? (
                                        <>
                                            <Button
                                                onClick={handleSendProjectToBuyer}
                                                variant="outlined"
                                                className="btn-grad"
                                                sx={{
                                                    width: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    height: '38px',
                                                    marginTop: '10px',
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
                                                    {t('Send The Project to the client')}
                                                </Typography>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={handleFileSelect}
                                            variant="outlined"
                                            className="btn-grad"
                                            sx={{
                                                width: '100%',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                height: '38px',
                                                marginTop: '10px',
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
                                                {t('Upload The Project')}
                                            </Typography>
                                        </Button>
                                    )}
                                </div>

                                {/* Show Upload Progress */}
                                {uploadProgress > 0 && !uploadComplete && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                                        <ProgressBubble progress={uploadProgress} size={120} />

                                    </div>
                                )}
                                {/* Show Uploaded URL When Complete */}
                                {uploadComplete && (
                                    <Typography style={{
                                        marginTop: "10px",
                                        color: "#2df873", textAlign: 'center',
                                        fontFamily:
                                            currentLanguage === 'ar'
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                    }}>
                                        {t('File Uploaded Successfully Please Send the project now')}
                                    </Typography>
                                )}

                                {/* Show Errors */}
                                {cloudErrors && (
                                    <Typography style={{ marginTop: "10px", color: "red" }}>
                                        {cloudErrors}
                                    </Typography>
                                )}

                            </div>

                        </>
                    )}
                    {!isSeller && project?.status === 'Completed' && !project?.isSellerReviewed && (

                        <>
                            {reviewSection && (
                                <>
                                    <div className="EmptyCard"
                                        style={{
                                            border: '1px solid grey',
                                            borderRadius: '10px',
                                            width: '40%',
                                            height: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '10px',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        <div className="Lottie"
                                            style={{
                                                marginTop: '-30px',
                                            }}
                                        >
                                            <Lottie
                                                animationData={Review}

                                                style={{
                                                    width: '200px',
                                                    height: '200px',
                                                }} />
                                        </div>
                                        <div className="FirstTypo"
                                            style={{
                                                marginTop: '-30px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar'
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    fontSize: '15px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {t('Share your experience!')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar'
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    fontSize: '15px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {t('Leave a review to support your freelancer and help improve our community.')}
                                            </Typography>
                                        </div>

                                        <div className="Reviews"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '100%',
                                                marginTop: '5px',
                                                gap : '10px',
                                            }}
                                        >
                                            <div className="First"
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '5px',
                                                }}
                                            >
                                                <div className="FirstSec"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <div className="Typo"
                                                        style={{
                                                            display: 'flex',

                                                            width: '60%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily: currentLanguage === 'ar'
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                textWrap: 'nowrap',
                                                            }}
                                                        >
                                                            {t('Interaction Brilliance')}
                                                        </Typography>

                                                    </div>
                                                </div>
                                                <div className="StartsSec"
                                                    style={{
                                                        width: '35%',
                                                    }}
                                                >
                                                    <MakeAReview
                                                        initialRating={ratings.interactionBrilliance}
                                                        onRatingChange={(value) => handleRatingChange('interactionBrilliance', value)}


                                                    />
                                                </div>
                                            </div>
                                            <div className="Second"
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '5px',
                                                    marginTop: '-10px',

                                                }}
                                            >
                                                <div className="FirstSec"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <div className="Typo"
                                                        style={{
                                                            display: 'flex',

                                                            width: '60%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily: currentLanguage === 'ar'
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                textWrap: 'nowrap',
                                                            }}
                                                        >
                                                            {t('Engagement')}
                                                        </Typography>

                                                    </div>
                                                </div>
                                                <div className="StartsSec"
                                                    style={{
                                                        width: '35%',
                                                    }}
                                                >
                                                    <MakeAReview
                                                        initialRating={ratings.engagement}
                                                        onRatingChange={(value) => handleRatingChange('engagement', value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="Third"
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '5px',
                                                    marginTop: '-10px',
                                                }}
                                            >
                                                <div className="FirstSec"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <div className="Typo"
                                                        style={{
                                                            display: 'flex',

                                                            width: '60%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily: currentLanguage === 'ar'
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                textWrap: 'nowrap',
                                                            }}
                                                        >
                                                            {t('Crafted Excellence')}
                                                        </Typography>

                                                    </div>
                                                </div>
                                                <div className="StartsSec"
                                                    style={{
                                                        width: '35%',
                                                    }}
                                                >
                                                    <MakeAReview
                                                        initialRating={ratings.craftedExcellence}
                                                        onRatingChange={(value) => handleRatingChange('craftedExcellence', value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="Firth"
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '5px',
                                                    marginTop: '-10px',
                                                }}
                                            >
                                                <div className="FirstSec"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <div className="Typo"
                                                        style={{
                                                            display: 'flex',

                                                            width: '60%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily: currentLanguage === 'ar'
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                textWrap: 'nowrap',
                                                            }}
                                                        >
                                                            {t('Domain Expertise')}
                                                        </Typography>

                                                    </div>
                                                </div>
                                                <div className="StartsSec"
                                                    style={{
                                                        width: '35%',
                                                    }}
                                                >
                                                    <MakeAReview
                                                        initialRating={ratings.domainExpertise}
                                                        onRatingChange={(value) => handleRatingChange('domainExpertise', value)}
                                                    />
                                                </div>
                                            </div>
                                            {reviewErrorMessage && (
                                                <Typography
                                                    sx={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        fontSize: '14px',
                                                        marginTop: '10px',
                                                        marginBottom: '5px',
                                                        textAlign: 'center',
                                                        color: reviewErrorMessage === "Validation request sent successfully!" && "Project Has Been sent successfully!" ? '#2df873' : '#ff4d4d',
                                                    }}
                                                >
                                                    {t(reviewErrorMessage)}
                                                </Typography>
                                            )}
                                            <TextField
                                                id="outlined-basic"
                                                label={t('Comment')}
                                                variant="outlined"
                                                value={comment}
                                                onChange={handleReviewComment}
                                                size="small"
                                                inputProps={{ maxLength: 80 }}
                                                InputLabelProps={{
                                                    style: { color: '#FFFFFF' },
                                                    sx: {
                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    },
                                                }}
                                                InputProps={{
                                                    style: { color: '#FFFFFF' },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {reviewError.commentError && <DangerousIcon style={{ color: '#ff4d4d' }} />}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: reviewError.commentError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: reviewError.commentError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: reviewError.commentError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: reviewError.commentError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={reviewError.commentError ? 'shake' : ''}
                                            />
                                            <Button
                                                onClick={submitReview}
                                                variant="outlined"
                                                className="btn-grad"
                                                sx={{
                                                    width: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    height: '38px',
                                                    marginTop: '10px',
                                                    opacity: isLoading ? '0.5' : '1',
                                                    color: 'white',
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
                                                        {t('Send a Review')}
                                                    </Typography>
                                                )}
                                            </Button>

                                        </div>


                                    </div>
                                </>
                            )}
                            {reviewSuccess && (
                                <>
                                    <div className="EmptyCard slide-from-right"
                                        style={{
                                            border: '1px solid grey',
                                            borderRadius: '10px',
                                            width: '40%',
                                            height: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '10px',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        <div className="Lottie"
                                            style={{
                                                marginTop: '-30px',
                                            }}
                                        >
                                            <Lottie
                                                animationData={PaymentDone}

                                                style={{
                                                    width: '250px',
                                                    height: '250px',
                                                }} />
                                        </div>
                                        <div className="FirstTypo"
                                            style={{
                                                marginTop: '-30px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar'
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    fontSize: '15px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {t('Thank You for Your Feedback!')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar'
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                    fontSize: '15px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {t('We appreciate you taking the time to share your experience!')}
                                            </Typography>
                                        </div>



                                    </div>
                                </>
                            )}

                        </>
                    )}
                    {isSeller && project?.status === 'In Review' && !project.isProjectSent && (

                        <>
                            <div className="EmptyCard"
                                style={{
                                    border: '1px solid grey',
                                    borderRadius: '10px',
                                    width: '40%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '20px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <div className="Lottie"
                                    style={{}}
                                >
                                    <Lottie
                                        animationData={UploadProject}

                                        style={{
                                            width: '200px',
                                            height: '200px',
                                        }} />
                                </div>
                                <div className="Div">
                                    <Typography
                                        sx={{
                                            fontFamily: currentLanguage === 'ar'
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('Have you done the changes?')}
                                    </Typography>
                                </div>
                                <div className="Div"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {uploadComplete ? (
                                        <>
                                            <Button
                                                onClick={handleSendProjectToBuyer}
                                                variant="outlined"
                                                className="btn-grad"
                                                sx={{
                                                    width: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    height: '38px',
                                                    marginTop: '10px',
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
                                                    {t('Send The Project to the client')}
                                                </Typography>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={handleFileSelect}
                                            variant="outlined"
                                            className="btn-grad"
                                            sx={{
                                                width: '100%',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                height: '38px',
                                                marginTop: '10px',
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
                                                {t('Upload The Project Again')}
                                            </Typography>
                                        </Button>
                                    )}
                                </div>

                                {/* Show Upload Progress */}
                                {uploadProgress > 0 && !uploadComplete && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                                        <ProgressBubble progress={uploadProgress} size={120} />

                                    </div>
                                )}
                                {/* Show Uploaded URL When Complete */}
                                {uploadComplete && (
                                    <Typography style={{
                                        marginTop: "10px",
                                        color: "#2df873", textAlign: 'center',
                                        fontFamily:
                                            currentLanguage === 'ar'
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                    }}>
                                        {t('File Uploaded Successfully Please Send the project now')}
                                    </Typography>
                                )}

                                {/* Show Errors */}
                                {cloudErrors && (
                                    <Typography style={{ marginTop: "10px", color: "red" }}>
                                        {cloudErrors}
                                    </Typography>
                                )}

                            </div>

                        </>
                    )}
                </div>
            ) : (
                <div className="NoPtokect"
                    style={{
                        height: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',


                    }}
                >
                    <div className="Lottie"
                        style={{

                        }}
                    >
                        <Lottie
                            animationData={NoProjects}

                            style={{
                                width: '250px',
                                height: '250px',
                            }} />
                    </div>
                    <div className="FirstTypo"
                        style={{

                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            {t('No project found for this conversation.')}
                        </Typography>

                    </div>


                </div>
            )}
        </div>








    )
}

export default ProjectManagment
