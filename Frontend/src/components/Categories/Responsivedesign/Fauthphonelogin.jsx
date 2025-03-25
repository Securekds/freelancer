import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import PhoneCode from '../../../assets/images/small-logos/PhoneCode.json';
import PhoneDone from '../../../assets/images/small-logos/PhoneDone.json';
import { motion } from "framer-motion";
import axios from 'axios';












function Fauthphonelogin({ user , onVerificationSuccess }) {
    console.log("Received user data in Fauthphonelogin:", user);

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




    const inputRefs = useRef([]);
  const { login } = useUser(); // Add UserContext hook
        const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');






    // Timer and state initialization
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [timerActive, setTimerActive] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0); // Track number of wrong attempts
    const [codeSentBack, setCodeSentBack] = useState('');
    const [emailVerifyCode, setEmailVerifyCode] = useState(Array(6).fill('')); // Changed state name to emailVerifyCode
    const [activeSection, setActiveSection] = useState('accountInfo'); // Default section
    const [resetInputSuccess, setResetInputSuccess] = useState({ code: false });
    const [isLoading, setIsLoading] = useState(false);


    // Start countdown when the active section is 'verifyEmail'
    useEffect(() => {
        if (activeSection === 'verifyEmail') {
            setTimeRemaining(120); // Reset countdown to 2 minutes
            setWrongAttempts(0);   // Reset attempts
            setErrorMessage("");   // Clear error message
            setTimerActive(true);  // Activate the timer
        }
    }, [activeSection]);

    // Countdown effect
    useEffect(() => {
        let interval;

        if (timerActive && timeRemaining > 0 && wrongAttempts < 3) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0 || wrongAttempts >= 3) {
            clearInterval(interval);   // Stop the countdown
            setTimerActive(false);     // Deactivate the timer
            if (wrongAttempts >= 3) {
                setErrorMessage("Too many incorrect attempts. Please request a new code.");
            }
        }

        return () => clearInterval(interval); // Cleanup
    }, [timeRemaining, timerActive, wrongAttempts]);



    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timerInterval); // Stop timer at 0
                    return 0;
                }
                return prev - 1; // Decrease time by 1 second
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timerInterval);
    }, []); // Empty dependency array ensures this runs once on mount

    // Format the time remaining as MM:SS only if attempts are within limit
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedTime =
        wrongAttempts < 3
            ? `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            : '';
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [isBlocked, setIsBlocked] = useState(false); // Block after 3 attempts

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);


    const [codeSent, setCodesent] = useState(true);
    const [codeSentSuccess, setCodesentSuccess] = useState(false);

    const handleOtpChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers

        const newOtp = [...otp];

        if (value === "") {
            newOtp[index] = ""; // Clear the current input
            setOtp(newOtp);

            // Move focus to the previous input when deleting (only if it's empty)
            if (index > 0) {
                setTimeout(() => inputRefs.current[index - 1]?.focus(), 10);
            }
        } else {
            newOtp[index] = value.slice(-1); // Keep only the last digit
            setOtp(newOtp);

            inputRefs.current[index].style.border = "2px solid rgb(0, 116, 255)"; // Reset border color when typing

            // Move focus to the next input if a number is entered
            if (index < otp.length - 1) {
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
            }
        }

        setErrorMessage(""); // Clear error message when user starts typing
        setSuccessMessage("");
    };




    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };




    const requestNewOTP = async () => {
        setWrongAttempts(0);  // Reset wrong attempts count
        setOtp(Array(6).fill("")); // Clear the OTP input fields
        setErrorMessage("");
        setIsLoading(true);

        try {
            await sendOTP(); // Reuse the existing sendOTP function
            setSuccessMessage("A new verification code has been sent");
        } catch (err) {
            setErrorMessage("Error sending new OTP. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };



    const formatPhoneNumber = (countryCode, phoneNumber) => {
        if (!countryCode || !phoneNumber) return "";

        // Remove any existing '+' symbols
        let cleanCountryCode = countryCode.replace(/\+/g, '');
        let cleanPhoneNumber = phoneNumber.replace(/\+/g, '');

        // Remove any instances of the country code from the beginning of the phone number
        while (cleanPhoneNumber.startsWith(cleanCountryCode)) {
            cleanPhoneNumber = cleanPhoneNumber.slice(cleanCountryCode.length);
        }

        // Remove leading zero if present
        if (cleanPhoneNumber.startsWith('0')) {
            cleanPhoneNumber = cleanPhoneNumber.slice(1);
        }

        // Return formatted number with single '+' prefix
        return `+${cleanCountryCode}${cleanPhoneNumber}`;
    };

    const [error, setError] = useState(null);

    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);

    const sendOTP = async () => {
        if (isCooldown) return; // Prevent multiple OTP requests
    
        setIsLoading(true);
        setError(null);
        setIsCooldown(true); // Start cooldown
    
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/sms/send-verification`,
                { phone: user?.phoneNumber, userId: user?._id }, // Use phoneNumber directly
                { withCredentials: true }
            );
    
            console.log("OTP sent successfully:", response.data);
            setCooldownTime(30); // Set cooldown period (30 seconds)
            startCooldown();
        } catch (err) {
            console.error("Error sending OTP:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "Failed to send OTP");
            setIsCooldown(false); // Reset cooldown if request fails
        } finally {
            setIsLoading(false);
        }
    };
    



    // Countdown timer function
    const startCooldown = () => {
        const interval = setInterval(() => {
            setCooldownTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsCooldown(false); // Enable resend after cooldown
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVerifyOTP = async () => {
        if (otp.includes("")) {
            setErrorMessage("Please enter the verification code.");
            otp.forEach((digit, index) => {
                if (!digit) {
                    inputRefs.current[index].style.border = "2px solid red";
                }
            });
            return;
        }

        setIsLoading(true); // Start loading state
        setErrorMessage(""); // Clear any previous errors

        const enteredCode = otp.join("");

        console.log("Verification attempt:", {
            userId: user?._id,
            code: enteredCode,
        });

        try {
            // Delay for 2 seconds before sending the request
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/sms/verify-otp`,
                {
                    userId: user?._id, // Send user ID instead of phone
                    code: enteredCode
                },
                { withCredentials: true }
            );

            console.log("Verification successful:", response.data);
            setErrorMessage("");
            setCodesent(false);
            setCodesentSuccess(true);
  
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/auth/finalize-login`,
                { userId: user._id },
                { withCredentials: true }
            );

            login(res.data);
            onVerificationSuccess(res.data);

     
        } catch (err) {
            console.error("Verification error:", {
                status: err.response?.status,
                error: err.response?.data
            });

            setWrongAttempts((prev) => prev + 1);

            if (wrongAttempts + 1 >= 3) {
                setIsBlocked(true);
                setErrorMessage("Too many failed attempts. Request a new code.");
            } else {
                setErrorMessage("The verification code you entered is incorrect. Please try again.");
            }
        } finally {
            setIsLoading(false); // Stop loading state
        }
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
                justifyContent: 'center',
                alignItems: 'center',
                gap: "10px",
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
                  
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: "-1",
                }}
            />
            
          
            <div id="recaptcha-container"></div>


            {codeSent && (
                <>

                    <div className="EamilCodeLotties"

                        style={{
                            marginBottom: '-35px',
                            marginTop: '-20px',
                        }}
                    >
                        <Lottie animationData={PhoneCode} loop={false} style={{ width: 170, height: 170 }} />
                    </div>


                    <div className="VerificationTypo"

                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '20px',

                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            {t('Enter verification code')}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                opacity: '0.8',
                            }}
                        >
                            {t("We've sent a code to your phone number")}
                        
                        </Typography>
                    </div>

                    <div
                        style={{
                            marginTop: '-10px',
                            marginBottom: '5px',
                        }}
                    >
                        {errorMessage && (
                            <Typography sx={{
                                color: 'red',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}>
                                {t(errorMessage)}
                            </Typography>
                        )}
                        {successMessage && (
                            <Typography sx={{
                                color: '#2df873', fontSize: '15px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold'
                            }}>
                                {t(successMessage)}
                            </Typography>
                        )}
                    </div>

                    <div className="CodeEnter slide-from-right"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '-8px',

                        }}
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                value={digit}
                                maxLength="1"
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                className="otp-input"
                                style={{
                                    height:  "55px",
                                    width: isSmallScreen? '40px' : "55px",
                                    border: "2px solid rgb(0, 116, 255)",
                                    borderRadius: "10px",
                                    textAlign: "center",
                                    background: "transparent",
                                    color: "white",
                                    fontSize: "24px",
                                    outline: "none",
                                }}
                            />
                        ))}

                    </div>

                    <div className="VerifyCodeButton slide-from-right"

                        style={{
                            marginTop: '4px',
                        }}
                    >
                        <Button
                            onClick={handleVerifyOTP}
                            variant="outlined"
                            disabled={wrongAttempts >= 3 || isBlocked}
                            className="btn-grad"
                            sx={{
                                width: isSmallScreen? '300px' : "378px",
                                height: "38px",
                                backgroundColor: "transparent",
                                color: "white",

                                borderColor: "none",
                                opacity: wrongAttempts >= 3 ? 0.5 :
                                    isLoading ? '0.5' :
                                        "unset",
                                "&:hover": {
                                    borderColor: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                },
                            }}
                        >
                            {isLoading ? (
                                <div className="lds-dual-ring" style={{ margin: "auto" }}></div>
                            ) : (
                                <Typography
                                    sx={{
                                        color: "white",
                                        fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: "bold",
                                        textTransform: "capitalize",
                                        fontSize: "13px",
                                    }}
                                >
                                    {t("Verify")}
                                </Typography>
                            )}
                        </Button>
                    </div>

                    <div className="DidntGetCode slide-from-right"

                        style={{
                            marginTop: '5px',

                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '15px',
                            }}
                        >
                            {t("Didn't receive the SMS?")}
                            <button
                                onClick={requestNewOTP}
                                disabled={isLoading}  // Prevents multiple requests
                                style={{
                                    marginLeft: '5px',
                                    color: isLoading ? '#A0A0A0' : '#4776E6', // Greyed out when loading
                                    background: 'none',
                                    border: 'none',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '15px',
                                    fontFamily: 'inherit',
                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                    textDecoration: 'underline'
                                }}
                            >
                                {isLoading ? t('Sending...') : t('Click here')}
                            </button>
                        </Typography>

                    </div>
                    <div className="Code expire slide-from-right"

                        style={{
                            marginTop: '-6px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '15px',
                            }}
                        >

                            {t('(Code will expire within)')}
                            <span
                                style={{
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                    marginLeft: '5px',

                                }}
                            >
                                {formattedTime}

                            </span>
                        </Typography>
                    </div>
                </>
            )}

            {codeSentSuccess && (
                <>
                    <div className="Div slide-from-right"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >


                        <motion.div
                            className="PhoneDoneLotti"
                            initial={{ scale: 1 }} // Start at normal size
                            animate={{ scale: [3, 1] }} // Scale up (1.5) then back to normal (1)
                            transition={{ duration: 0.9, ease: "easeOut" }} // Smooth transition
                            style={{
                                marginBottom: '-35px',
                                marginTop: '-20px',
                            }}
                        >
                            <Lottie animationData={PhoneDone} loop={true} style={{ width: 170, height: 170 }} />
                        </motion.div>
                        <div className="VerificationTypo"

                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {t('Your phone number has been successfully verified!')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {t('You can now enhance your account security by enabling Two-Factor Authentication (2FA) for an extra layer of protection.')}
                            </Typography>

                        </div>
                    </div>
                </>
            )}



        </div>

    )
}

export default Fauthphonelogin