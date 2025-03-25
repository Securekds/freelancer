import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../../Context/UserContext.jsx'
import Lottie from 'lottie-react';
import EmailCode from '../../../assets/images/small-logos/EmailCode.json';
import EnterEmailCodeWaiting from '../../../assets/images/small-logos/EnterEmailCodeWaiting.json';
import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import EmailVerfiyDone from './EmailVerfiyDone.jsx';





function AccountEmailVerify({ onSuccess, onCloseClick, isEmailVerify , openedFromButton }) {

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

    const { user, setUser } = useUser(); // Make sure you're getting both user and setUser
    const inputRefs = useRef([]);


    const handleCodeChange = (value, index) => {
        const sanitizedValue = value.replace(/[^0-9]/g, ''); // Only allow numbers

        const newCode = [...emailVerifyCode]; // Updated variable name
        newCode[index] = sanitizedValue;
        setEmailVerifyCode(newCode);

        // Clear error message when user starts typing again
        setErrorMessage('');
        setSuccessMessage('');

        // Move to next input if current one is filled
        if (sanitizedValue && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };



    // Timer and state initialization
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [showDefault , setShowDefault] = useState(true);
      const [isEmailDone, setIsEmailDone] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0); // Track number of wrong attempts
    const [codeSentBack, setCodeSentBack] = useState('');
    const [emailVerifyCode, setEmailVerifyCode] = useState(Array(4).fill('')); // Changed state name to emailVerifyCode
    const [activeSection, setActiveSection] = useState('accountInfo'); 
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

    const sendEmailVerificationCode = async (userId, email, setErrorMessage, setIsLoading) => {
        try {
            setIsLoading(true);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/send-email-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({ userId, email }),
            });

            const result = await response.json();

            if (response.ok) {
                setIsLoading(false);



            } else {
                setIsLoading(false);
                setErrorMessage(result.message || "Failed to send verification code.");
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error during email verification request:', error);
            setErrorMessage('Failed to send verification code. Please try again later.');
        }
    };

    // Call sendEmailVerificationCode when isEmailVerify becomes true
    useEffect(() => {
        if (user && isEmailVerify) {
            const userId = user._id;
            const email = user.email;
            sendEmailVerificationCode(userId, email, setErrorMessage, setIsLoading);
        }
    }, [isEmailVerify, user]);
    // Handle verification logic
    const handleEmailCodeVerify = async () => {
        const userId = user ? user._id : null;
        if (!userId) {
            setErrorMessage("User ID is missing. Please try again.");
            return;
        }

        const enteredCode = emailVerifyCode.join('');
        if (enteredCode.length !== 4) {
            setErrorMessage('Please enter the full 4-digit code.');
            return;
        }

        if (wrongAttempts >= 3) {
            setErrorMessage('Too many incorrect attempts. Please request a new code.');
            setTimerActive(false); // Stop the timer
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/verify-email-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({
                    userId,
                    code: enteredCode,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setResetInputSuccess((prev) => ({ ...prev, code: true }));
                setTimerActive(false); // Stop timer on successful verification
                setErrorMessage('');   // Clear error if successful
                

                const updatedUser = {
                    ...user,
                    ConfirmedEmail: true
                };
                setUser(updatedUser);
                setShowDefault(false);
                setIsEmailDone(true);

               

                // Simulate a 2-second delay before stopping the loading spinner and moving to the next step
                setTimeout(() => {
                    setIsLoading(false); // Stop loading
                    setSlideUp(true);  // Trigger the slide-up animation

                    setTimeout(() => {
                        if (onSuccess) onSuccess(); 
                    }, 500); // Delay to allow the slide-up animation to complete
                }, 2000);
            } else {
                setIsLoading(false);
                setErrorMessage('Invalid verification code.');
                setWrongAttempts((prev) => prev + 1); // Increment failed attempts on error
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error during email verification request:', error);
            setErrorMessage('Failed to verify the code. Please try again later.');
        }
    };
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
    const [slideUp, setSlideUp] = useState(false);  // To control the slide-up animation



    const handleResendCode = async () => {
        setIsLoading(true);

        const userId = user?._id;       // Get userId from context
        const email = user?.email;      // Get email from context
        const firstName = user?.firstName; // Get first name from context

        if (!userId || !email || !firstName) {
            setErrorMessage("Required information is missing. Please try again.");
            setIsLoading(false);
            return;
        }

        try {
            // Make an API call to resend the verification code with email and firstName
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/send-email-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({ userId, email, firstName }),
            });

            if (response.ok) {
                setErrorMessage("");          // Clear any previous error messages
                setSuccessMessage("We have sent you a new code"); // Set success message
                setTimeRemaining(120);        // Reset countdown to 2 minutes
                setWrongAttempts(0);          // Reset wrong attempts
                setTimerActive(true);
            } else {
                const result = await response.json();
                setErrorMessage(result.message || "Failed to resend code. Please try again.");
                setSuccessMessage("");              // Clear any success message
            }
        } catch (error) {
            console.error("Error resending the code:", error);
            setErrorMessage("An error occurred while resending the code.");
            setSuccessMessage("");              // Clear any success message
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <div className={`EmailCodeVerify ${slideUp ? 'slide-up' : 'slide-from-right'}`}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                border: openedFromButton ? 'none' : '1px solid white', 
                borderRadius: '16px',
                padding: '5px',
                position: "relative",
                alignItems: 'center',
                gap: '5px',

            }}
        >
            <div className="CloseIcon"

                style={{
                    position: "absolute", // Absolute positioning relative to the MainContainer
                    top: "10px", // Adjust from the top
                    right: "25px", // Adjust from the right
                    cursor: "pointer", // Show pointer cursor on hover
                    zIndex: 1, // Ensure it's on top of other elements
                    display : openedFromButton ? 'none' : 'flex', 
                }}
                onClick={onCloseClick} // Trigger the onCloseClick function when clicked
            >
                <CloseIcon style={{ color: "#ffffff", fontSize: "20px" }} />{" "}
                {/* Customize icon size and color */}
            </div>

            { showDefault && (
                <>
          
            <div className="EamilCodeLotties"

                style={{
                    marginBottom: '-35px',
                    marginTop: '-25px',
                }}
            >
                <Lottie animationData={EmailCode} loop={true} style={{ width: 170, height: 170 }} />
            </div>


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
            </div>

            <div className="EamilSentTypo"

                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '-5px',

                }}
            >
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
                        {user?.email}
                    </span>
                </Typography>
            </div>

            <div
                style={{

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
                    marginTop: '5px',

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
                    marginTop: '10px',
                }}
            >
                <Button
                    onClick={handleEmailCodeVerify}
                    variant="outlined"
                    disabled={wrongAttempts >= 3} // Disable button after 3 incorrect attempts
                    className="btn-grad"
                    sx={{
                        width: '315px',
                        height: '38px',
                        backgroundColor: 'transparent',
                        color: 'white',
                        borderColor: 'none',

                        opacity: wrongAttempts >= 3 || isLoading ? 0.5 : 'unset',
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    {isLoading ? (
                        <div className="lds-dual-ring" style={{ margin: 'auto' }}></div>
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
                            {t('Verify')}
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
                    {t("Didn't receive the email?")}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleResendCode();
                        }}
                        style={{
                            marginLeft: '5px',
                            color: '#4776E6',
                            marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                        }}
                    >
                        {t('Click here')}
                    </a>
                </Typography>
            </div>
            <div className="Code expire slide-from-right"

                style={{

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

            { isEmailDone && (
                <>
                <EmailVerfiyDone />
                </>
            )}



        </div>
    )
}

export default AccountEmailVerify