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












function NewEmail2Fauth({ onCloseClick }) {

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


    const { user } = useUser();

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


    const [enterEmail, setEnterEmail] = useState(true);
    const [verifyEmail, setVerifyEmail] = useState(false);
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
    const sendEmailVerificationCode = async () => {
        if (!formData.secondaryEmail) {
            setErrorMessage("Please enter a valid email.");
            setErrors((prev) => ({ ...prev, secondaryEmailError: true }));
            return;
        }

        // Prevent using the same email as the primary
        if (formData.secondaryEmail === user?.email) {
            setErrorMessage("The secondary email must be different from your primary email.");
            setErrors((prev) => ({ ...prev, secondaryEmailError: true }));
            return;
        }

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
                    email: formData.secondaryEmail,
                    isSecondaryEmail: true,
                },
                { withCredentials: true }
            );

            // Check if the response was successful
            if (response.data && response.status === 200) {
                setIsLoading(false);
                setEnterEmail(false);
                setVerifyEmail(true);
                setEmailSuccess(false); // Ensure we're not skipping directly to success
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

            // Keep the email input visible on error
            setEnterEmail(true);
            setVerifyEmail(false);
        }
    };





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
                    isSecondaryEmail: true  // <== Ensure backend knows it's verifying secondary email
                },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setResetInputSuccess((prev) => ({ ...prev, code: true }));
            setVerifyEmail(false);
            setEmailSuccess(true);
            setWrongAttempts(0);
            setErrorMessage("");

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
        const email = formData.secondaryEmail;
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
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: "-1",
                }}
            />
            <div className="CloseIcon"

                style={{
                    position: "absolute",
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
            <div id="recaptcha-container"></div>

            <div className="ContainreEmail"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >

                {enterEmail && (
                    <>
                        <div className="EmailIcon"
                            style={{
                                height: '55px',
                                width: '55px',
                                borderRadius: '10px',
                                border: '1px solid white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                style={{ transform: 'rotate(0deg)', fontSize: '28px', color: 'white', stroke: 4 }} // Reset any unwanted rotation
                            />

                        </div>
                        <div className="Typo"
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '18px',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                {t('Enter your secondary email to enable two-factor authentication')}
                            </Typography>
                            {errorMessage && (
                                <Typography
                                    sx={{
                                        marginTop: '-6px',
                                        textAlign: 'center',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        color: errorMessage === "Your profile is already up-to-date. No changes detected." ? '#2df873' : '#ff4d4d',
                                    }}
                                >
                                    {t(errorMessage)}
                                </Typography>
                            )}
                            <TextField
                                id="outlined-basic"
                                label={t('Secondary Email')}
                                variant="outlined"
                                value={formData.secondaryEmail}
                                onChange={handleSecondaryEmailInputChange}
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
                                            {errors.secondaryEmailError && (
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
                                            borderColor: errors.secondaryEmailError ? '#ff4d4d' : '#FFFFFF',
                                            borderWidth: errors.secondaryEmailError ? '2px' : '1px',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: errors.secondaryEmailError ? '#ff4d4d' : '#FFFFFF',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: errors.secondaryEmailError ? '#ff4d4d' : '#FFFFFF',
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
                                className={errors.secondaryEmailError ? 'shake' : ''}
                            />
                            <Button
                                onClick={sendEmailVerificationCode}
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
                                        {t('Verfiy Email')}
                                    </Typography>
                                )}

                            </Button>
                        </div>
                    </>
                )}

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
                                    {formData.secondaryEmail}
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

                {emailSuccess && (
                    <>
                        <div className="ProfileVerifiedLottie"

                            style={{
                                width: isScaling ? 400 : 240, // Increased sizes
                                height: isScaling ? 400 : 240,
                                transition: 'all 1.2s ease', // Smooth transition
                                marginTop: '-40px',
                                marginBottom: '-40px',
                            }}
                        >
                            <Player
                                src={EmailSuccess}
                                autoplay
                                loop
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        {showSuccessMessage && (
                            <div className="VerificationTypo"
                                style={{ animation: 'fadeIn 0.5s ease forwards' }}>
                                <Typography

                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textAlign: 'center',
                                        whiteSpace: 'wrap',
                                        position: 'relative',
                                    }}
                                >
                                    {t('Your secondary email has been successfully verified')}
                                </Typography>
                            </div>
                        )}

                        {showSuccessMessage2 && (
                            <div className="VerificationTypo" style={{ animation: 'fadeIn 0.5s ease forwards' }}>
                                <Typography

                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        opacity: '0.8',
                                        textAlign: 'center',

                                    }}
                                >
                                    {t('You can now enable Two-Factor Authentication (2FA) for enhanced security.')}
                                </Typography>
                            </div>
                        )}
                        {showSuccessMessage3 && (
                            <div
                                className="Button"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                            >
                                <Button
                                    className="btn-grad"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        height: '40px',
                                        padding: '0 20px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '14px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {t('Enable (2FA)')}
                                    </Typography>
                                </Button>
                            </div>
                        )}
                    </>
                )}

            </div>



        </div>

    )
}

export default NewEmail2Fauth