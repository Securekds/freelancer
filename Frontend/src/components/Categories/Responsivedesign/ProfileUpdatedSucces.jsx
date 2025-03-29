import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import { Player } from '@lottiefiles/react-lottie-player';
import EmailCode from '../../../assets/images/small-logos/EmailCode.json';
import ProfileSucces from '../../../assets/images/small-logos/ProfileSucces.json'
import AccountEmailVerify from './AccountEmailVerify.jsx'
import EmailVerfiyDone from './EmailVerfiyDone.jsx';







function ProfileUpdatedSucces({ onCloseClick }) {

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
    const isEmailConfirmed = user?.ConfirmedEmail;

    const [opacity, setOpacity] = useState(1); // Default opacity
    const lineRef = useRef(null); // Reference to the div

    useEffect(() => {
        const updateOpacity = () => {
            if (lineRef.current) {
                const height = lineRef.current.offsetHeight;
                const maxHeight = 180; // Maximum height after which opacity is fully reduced
                const minHeight = 80; // Minimum height where opacity is at full
                const calculatedOpacity = Math.max(
                    0.1, // Minimum opacity value
                    Math.min(1, 1 - (height - minHeight) / (maxHeight - minHeight)) // Formula to reduce opacity as height increases
                );
                setOpacity(calculatedOpacity);
            }
        };

        // Call the update function on window resize
        window.addEventListener('resize', updateOpacity);
        updateOpacity(); // Initial calculation

        return () => {
            window.removeEventListener('resize', updateOpacity);
        };
    }, []); // Empty dependency array ensures this runs only on mount











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



    const [isProfileUpdated, setIsProfileUpdate] = useState(true);
    const [isEmailVerify, setIsEmailVerify] = useState(false);
    const [isEmailDone, setIsEmailDone] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);
    const [openedFromButton, setOpenedFromButton] = useState(false);




    const handleStartEmailVerification = () => {
        setStartAnimation(true); // Trigger the slide-up animation
        setOpenedFromButton(true); // Indicate it was opened from the button
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
            {isProfileUpdated && (
                <div className={`Styles ${startAnimation ? "slide-up" : ""}`}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',



                    }}
                >
                    <div className="ProfileVerifiedLottie"
                        style={{
                            width: isAnimationComplete ? 160 : 280,
                            height: isAnimationComplete ? 160 : 280,
                            transition: 'width 0.8s ease, height 0.8s ease, top 0.8s ease',






                        }}
                    >
                        <Player
                            src={ProfileSucces}
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                            onEvent={(event) => {
                                if (event === 'complete') {
                                    setIsAnimationComplete(true)
                                }
                            }}
                        />
                    </div>
                    {showSuccessMessage && (
                        <div className="VerificationTypo"

                            style={{

                                animation: 'scaleIn 0.5s ease forwards',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                {t('Profile Updated Successfully')}
                            </Typography>
                        </div>
                    )}
                    {showSuccessMessage2 && (

                        <div className="VerificationTypo"

                            style={{

                                animation: 'scaleIn 0.5s ease forwards',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '16px',
                                    opacity: '0.8',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                {t('Your profile has been successfully updated with the new information.')}
                            </Typography>
                        </div>
                    )}
                    {showSuccessMessage3 && !isEmailConfirmed && (
                        <div className="VerificationTypo"

                            style={{

                                animation: 'scaleIn 0.5s ease forwards',
                                width: '90%',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '16px',
                                    opacity: '0.8',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                {t('Ensure your profile information matches your ID to avoid rejection. Consistency helps verify your identity and keeps your account secure!')}
                            </Typography>
                        </div>
                    )}
                    {showSuccessMessage4 && !isEmailConfirmed && (
                        <div className="Button"

                            style={{
                                display: 'flex', // Enable flexbox
                                justifyContent: 'center', // Center horizontally
                                alignItems: 'center', // Center vertically
                                height: '100%', // Take the full height of the parent container
                                marginTop: 10, // Remove extra margin for proper centering
                                marginBottom: 0,
                            }}
                        >
                            <Button onClick={handleStartEmailVerification}
                                className="btn-grad"
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    width: 'auto', // Use automatic width to prevent overflow
                                    height: '40px',

                                    display: 'flex',
                                    alignItems: 'center', // Center text vertically
                                    justifyContent: 'center', // Center text horizontally
                                    padding: '0 20px', // Add horizontal padding for better spacing
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {t('Complete the email verification')}
                                </Typography>
                            </Button>
                        </div>
                    )}

                </div>
            )}
            {isEmailVerify && (


                <AccountEmailVerify
                    onSuccess={handleEmailVerificationSuccess}
                    isEmailVerify={isEmailVerify}
                    setIsEmailVerify={setIsEmailVerify}
                    openedFromButton={openedFromButton}

                />

            )}

            {isEmailDone && (
                <EmailVerfiyDone />
            )}



        </div>

    )
}

export default ProfileUpdatedSucces