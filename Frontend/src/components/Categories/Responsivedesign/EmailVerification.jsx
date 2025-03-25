import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import EmailCode from '../../../assets/images/small-logos/EmailCode.json';
import ProfileSucces from '../../../assets/images/small-logos/ProfileSucces.json'
import AccountEmailVerify from './AccountEmailVerify.jsx'
import EmailVerfiyDone from './EmailVerfiyDone.jsx';







function EmailVerification({ onCloseClick, isProfileUpdatedOpen , }) {

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


    const { user } = useUser(); // Access user data from UserCon




    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessMessage2, setShowSuccessMessage2] = useState(false);
    const [showSuccessMessage3, setShowSuccessMessage3] = useState(false);
    const [showSuccessMessage4, setShowSuccessMessage4] = useState(false);



    const [isAnimationComplete, setIsAnimationComplete] = useState(false);


    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage(true), 400); // Adjust timing if needed
        }
    }, [isAnimationComplete]);
    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage2(true), 600); // Adjust timing if needed
        }
    }, [isAnimationComplete]);

    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage3(true), 900); // Adjust timing if needed
        }

    }, [isAnimationComplete]);

    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage4(true), 1200); // Adjust timing if needed
        }

    }, [isAnimationComplete]);



  
    const [isEmailVerify, setIsEmailVerify] = useState(false);
    const [isEmailDone, setIsEmailDone] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false); 



    const handleStartEmailVerification = () => {
        setStartAnimation(true); // Trigger the slide-up animation
        setTimeout(() => {
            setIsProfileUpdate(false); // Hide the ProfileUpdate component
            setIsEmailVerify(true); // Show the EmailVerify component
        }, 500); // Match the duration of the slide-up animation
    };

    // Handler to update the state when email verification is successful
    const handleEmailVerificationSuccess = () => {

            setIsEmailVerify(false); // Hide AccountEmailVerify component after animation
            setIsEmailDone(true); // Show success message or next component

    };
    return (
        <div
            className="MainContainer"
            style={{
                width: "100%",
                height: "auto",
                display: "flex",
                padding: '17px',
                flexDirection: "column",
                gap: "20px",
                position: "relative", 

            }}
        >
            <div className="BlurBG"

                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    bottom: 0,
                    borderRadius: "16px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: "-1",
                }}
            />
            <div className="CloseIcon"

                style={{
                    position: "absolute", // Absolute positioning relative to the MainContainer
                    top: "10px", // Adjust from the top
                    right: "25px", // Adjust from the right
                    cursor: "pointer", // Show pointer cursor on hover
                    zIndex: 1, // Ensure it's on top of other elements
                }}
                onClick={onCloseClick} // Trigger the onCloseClick function when clicked
            >
                <CloseIcon style={{ color: "#ffffff", fontSize: "20px" }} />{" "}
                {/* Customize icon size and color */}
            </div>
       
            {isEmailVerify && (


                <AccountEmailVerify
                    onSuccess={handleEmailVerificationSuccess}
                    isEmailVerify={isEmailVerify}       // Pass the state
                    setIsEmailVerify={setIsEmailVerify}

                />

            )}

            {isEmailDone && (
                <EmailVerfiyDone />
            )}



        </div>

    )
}

export default EmailVerification