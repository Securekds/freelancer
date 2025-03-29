import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import EmailCode from '../../../assets/images/small-logos/EmailCode.json';
import EmailSuccess from '../../../assets/images/small-logos/EmailSuccess.json';
import useMediaQuery from '@mui/material/useMediaQuery';
import DangerousIcon from '@mui/icons-material/Dangerous';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';












function LoginEmailAuth({ onVerificationSuccess, user }) {
    console.log("Received user data in LoginAuthEmail:", user);
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


    const { login } = useUser();

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');





    const inputRefs = useRef([]);
    const [formData, setFormData] = useState({
        secondaryEmail: '',
    });

    const [errors, setErrors] = useState({
        secondaryEmailError: '',       // Error message for project title

    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetInputSuccess, setResetInputSuccess] = useState({ code: false });
    const [wrongAttempts, setWrongAttempts] = useState(0); // Track number of wrong attempts
    const [cooldown, setCooldown] = useState(0); // Stores remaining seconds
    const [emailVerifyCode, setEmailVerifyCode] = useState(Array(4).fill('')); // Changed state name to emailVerifyCode
    const [disableResend, setDisableResend] = useState(false);


    const handleSecondaryEmailInputChange = (e) => {
        const value = e.target.value;

        // Email validation regex pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        setFormData((prev) => ({ ...prev, secondaryEmail: value }));

        // Clear errors when user starts typing
        setErrors((prev) => ({ ...prev, secondaryEmailError: false }));
        setErrorMessage("");

        if (value.trim().length === 0) {
            setErrors((prev) => ({ ...prev, secondaryEmailError: true }));
            setErrorMessage("Please enter a valid email.");
        } else if (!emailPattern.test(value)) {
            setErrors((prev) => ({ ...prev, secondaryEmailError: true }));
            setErrorMessage("Please enter a valid email.");
        }
    };



    const [verifyEmail, setVerifyEmail] = useState(true);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [isScaling, setIsScaling] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessMessage2, setShowSuccessMessage2] = useState(false);
    const [showSuccessMessage3, setShowSuccessMessage3] = useState(false);
    const [showSuccessMessage4, setShowSuccessMessage4] = useState(false);

    useEffect(() => {
        // Start scaling animation
        const scaleTimer = setTimeout(() => setIsScaling(false), 1200); // Scaling duration (adjust if needed)

        // Show messages sequentially after scaling is complete
        const messageTimers = [
            setTimeout(() => setShowSuccessMessage(true), 1400), // 200ms after scaling ends
            setTimeout(() => setShowSuccessMessage2(true), 1600),
            setTimeout(() => setShowSuccessMessage3(true), 1800),
            setTimeout(() => setShowSuccessMessage4(true), 2000),
        ];

        return () => {
            clearTimeout(scaleTimer);
            messageTimers.forEach(clearTimeout);
        };
    }, []);


    const handleCodeChange = (value, index) => {
        const sanitizedValue = value.replace(/[^0-9]/g, ''); // Only allow numbers

        const newCode = [...emailVerifyCode];
        newCode[index] = sanitizedValue;
        setEmailVerifyCode(newCode);

        // Clear error message when user starts typing again
        setErrorMessage('');
        setSuccessMessage("");

        // Move focus to next input if filled
        if (sanitizedValue && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    const maskEmail = (email) => {
        if (!email) return "";

        const [name, domain] = email.split("@");
        if (name.length <= 2) {
            return `${name[0]}***@${domain}`; // If short, show only first letter
        }
        return `${name[0]}***${name[name.length - 1]}@${domain}`;
    };



    const sendEmailVerificationCode = async () => {


        // Prevent excessive resend attempts
        if (resendAttempts >= 3) {
            setErrorMessage("Too many attempts. Please wait before trying again.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/auth/send-email-code`,
                {
                    userId: user._id,
                    email: user.secondaryEmail,

                },
                { withCredentials: true }
            );

            // Check if the response was successful
            if (response.data && response.status === 200) {
                setIsLoading(false);
                setErrorMessage("");

                // Reset verification code inputs
                setEmailVerifyCode(Array(4).fill(''));

                // Reset attempts and cooldown
                setWrongAttempts(0);
                setCooldown(0);
                setDisableResend(false);
                setResendAttempts(0);

                console.log("✅ Verification code sent successfully!");
            } else {
                throw new Error(response.data?.message || "Failed to send verification code");
            }
        } catch (error) {
            setIsLoading(false);
            console.error("❌ Error during email verification request:", error);

            setErrorMessage(error.response?.data?.message || "Failed to send verification code.");

        }
    };

    useEffect(() => {
        if (user?._id && user?.secondaryEmail) {
            sendEmailVerificationCode();
        }
    }, []);



    const handleEmailCodeVerify = async () => {
        const userId = user ? user._id : null;
        if (!userId) {
            setErrorMessage("User ID is missing. Please try again.");
            return;
        }

        if (cooldown > 0) return;

        const enteredCode = emailVerifyCode.join('');
        if (enteredCode.length !== 4) {
            setErrorMessage('Please enter the full 4-digit code.');
            return;
        }

        if (wrongAttempts >= 3) {
            setErrorMessage(`Too many failed attempts. Please wait ${cooldown}s before requesting another code.`);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/auth/verify-email-code`,
                {
                    userId,
                    code: enteredCode,

                },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log("Verification successful:", response.data);
            setResetInputSuccess((prev) => ({ ...prev, code: true }));
            setWrongAttempts(0);
            setErrorMessage("");

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/auth/finalize-login`,
                { userId: user._id },
                { withCredentials: true }
            );

            login(res.data);
            onVerificationSuccess(res.data);


        } catch (error) {
            console.error("Error during verification:", error);
            setWrongAttempts((prev) => prev + 1);

            if (wrongAttempts + 1 >= 3) {
                setErrorMessage("Too many failed attempts. Please wait 1 minute before requesting another code.");
                startCooldown();
                setDisableResend(true);
            } else {
                setErrorMessage(error.response?.data?.message || "Invalid verification code.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    const [resendAttempts, setResendAttempts] = useState(0);

    const startCooldown = () => {
        setCooldown(60); // 60 seconds cooldown
        setDisableResend(true);

        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setDisableResend(false);
                    setResendAttempts(0); // Reset attempts after cooldown
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleResendCode = async () => {
        const newAttempts = resendAttempts + 1;
        setResendAttempts(newAttempts);

        if (newAttempts >= 3) {
            startCooldown();
            setSuccessMessage("");
            setErrorMessage("Too many request Please wait 1 minute before requesting another code.");
            return; // Return early to prevent API call
        }

        setIsLoading(true);
        const userId = user?._id;
        const email = user?.secondaryEmail;
        const firstName = user?.firstName;

        if (!userId || !email || !firstName) {
            setErrorMessage("Required information is missing. Please try again.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/send-email-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, email, firstName }),
            });

            if (response.ok) {
                setErrorMessage("");
                setSuccessMessage("We have sent you a new code");
            } else {
                const result = await response.json();
                setErrorMessage(result.message || "Failed to resend code. Please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Error resending the code:", error);
            setErrorMessage("An error occurred while resending the code.");
            setSuccessMessage("");
        } finally {
            setIsLoading(false);
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

            <div className="ContainreEmail"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >



                {verifyEmail && (
                    <>
                        <div className="EamilCodeLotties"

                            style={{
                                marginBottom: '-35px',
                                marginTop: '-25px',
                            }}
                        >
                            <Player
                                src={EmailCode}
                                autoplay
                                loop
                                style={{ width: 170, height: 170 }}
                            />                        </div>
                        <div className="VerificationTypo"

                            style={{
                                width: '100%',
                                textAlign: 'center',

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
                                {t("We've sent a code to")}
                                <span style={{
                                    color: '#4776E6',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold', marginLeft: '5px',
                                    marginRight: currentLanguage === 'ar' ? '6px' : 'unset',

                                }}>
                                    {maskEmail(user?.secondaryEmail)}
                                </span>
                            </Typography>
                        </div>
                        {errorMessage && (
                            <Typography sx={{
                                color: 'red',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                marginTop: '-10px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}>
                                {t(errorMessage)}
                            </Typography>
                        )}
                        {successMessage && (
                            <Typography sx={{
                                color: '#2df873',
                                fontSize: '15px',
                                marginTop: '-10px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold'
                            }}>
                                {t(successMessage)}
                            </Typography>
                        )}
                        <div className="CodeEnter slide-from-right"
                            style={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '-3px',

                            }}
                        >
                            {emailVerifyCode.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={digit}
                                    maxLength="1"
                                    onChange={(e) => handleCodeChange(e.target.value, index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && !digit && index > 0) {
                                            inputRefs.current[index - 1]?.focus();
                                        }
                                    }}
                                    className={errorMessage ? 'shake' : ''} // Apply shake class on error
                                    style={{
                                        height: '55px',
                                        width: '55px',
                                        border: errorMessage
                                            ? '2px solid red'
                                            : resetInputSuccess.code
                                                ? '2px solid green'
                                                : '2px solid rgb(0, 116, 255)', // Success border
                                        borderRadius: '10px',
                                        textAlign: 'center',
                                        background: 'transparent',
                                        color: 'white',
                                        fontSize: '24px',
                                        outline: 'none',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="VerifyCodeButton slide-from-right"

                            style={{
                                marginTop: '3px',
                            }}
                        >
                            <Button
                                onClick={handleEmailCodeVerify}
                                variant="outlined"
                                disabled={wrongAttempts >= 3 || cooldown > 0}
                                className="btn-grad"
                                sx={{
                                    width: isSmallScreen ? '270px' : '315px',
                                    height: '38px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    borderColor: 'none',
                                    textTransform: 'capitalize',
                                    opacity: wrongAttempts >= 3 || cooldown > 0 ? 0.5 :
                                        isLoading ? '0.5' :
                                            'unset',
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
                                    <Typography>
                                        {cooldown > 0 ? (
                                            <span style={{ color: 'white', fontWeight: 'bold' }}>
                                                {t('Wait')} {cooldown}s
                                            </span>
                                        ) : (
                                            t('Verify')
                                        )}
                                    </Typography>
                                )}
                            </Button>
                        </div>
                        <div className="DidntGetCode slide-from-right" style={{ marginTop: '-3px' }}>
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontSize: '15px',
                                }}
                            >
                                {t("Didn't receive the email?")}
                                <Button

                                    onClick={disableResend ? null : handleResendCode}
                                    style={{
                                        marginLeft: '5px',
                                        color: disableResend ? 'gray' : '#4776E6',
                                        pointerEvents: disableResend ? 'none' : 'auto',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                    }}
                                >
                                    {disableResend ? `${t('Wait')} ${cooldown}s` : t('Resend Code')}
                                </Button>
                            </Typography>
                        </div>



                    </>
                )}



            </div>



        </div>

    )
}

export default LoginEmailAuth