import { Typography, Button } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import Lottie from 'lottie-react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import PasswordSucces from '../../assets/images/small-logos/PasswordSucces.json'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMediaQuery from '@mui/material/useMediaQuery';
import SigninMobile from './SigninMobile';
import FacebookRegister from '../Signup/FacebookRegister';
import { useUser } from '../../Context/UserContext.jsx';
import PhoneCodeVefify from '../Categories/Responsivedesign/PhoneCodeVefify.jsx';
import Fauthphonelogin from '../Categories/Responsivedesign/Fauthphonelogin.jsx';
import LoginEmailAuth from '../Categories/Responsivedesign/LoginEmailAuth.jsx';








function Signin() {


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

  const { login } = useUser(); // Add UserContext hook


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();

  // Function to handle click and trigger animation
  const handleRegisterRedirect = () => {

    navigate('/auth/signup');

  };

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);



  // Function to sanitize inputs
  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>/g, ''); // Basic example to remove any HTML tags
  };
  // State to track if the user is rate-limited
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [accountLockedUntil, setAccountLockedUntil] = useState(null); // Add this to your state


  // Check rate limit status on mount
  useEffect(() => {
    checkRateLimitStatus();
    checkAccountLockStatus();
  }, []);


  // Function to check and update rate-limit status
  const checkRateLimitStatus = () => {
    const rateLimitedUntil = localStorage.getItem('rateLimitedUntil');
    if (rateLimitedUntil) {
      const lockEndTime = parseInt(rateLimitedUntil, 10);
      const timeRemaining = lockEndTime - new Date().getTime();

      if (timeRemaining > 0) {
        setIsRateLimited(true);
        setCountdown(Math.floor(timeRemaining / 1000));

        const countdownInterval = setInterval(() => {
          const updatedTimeRemaining = lockEndTime - new Date().getTime();
          const secondsLeft = Math.max(0, Math.floor(updatedTimeRemaining / 1000));
          setCountdown(secondsLeft);

          if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            setIsRateLimited(false);
            localStorage.removeItem('rateLimitedUntil');
          }
        }, 1000);

        return () => clearInterval(countdownInterval);
      } else {
        localStorage.removeItem('rateLimitedUntil');
      }
    }
  };

  // Function to check account lock status
  const checkAccountLockStatus = () => {
    const lockedUntil = localStorage.getItem('accountLockedUntil');
    if (lockedUntil) {
      const lockEndTime = parseInt(lockedUntil, 10);
      const timeRemaining = lockEndTime - new Date().getTime();

      if (timeRemaining > 0) {
        setIsRateLimited(true);
        setAccountLockedUntil(lockEndTime);
        setCountdown(Math.floor(timeRemaining / 1000));

        const countdownInterval = setInterval(() => {
          const updatedTimeRemaining = lockEndTime - new Date().getTime();
          const secondsLeft = Math.max(0, Math.floor(updatedTimeRemaining / 1000));
          setCountdown(secondsLeft);

          if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            setIsRateLimited(false);
            setAccountLockedUntil(null);
            localStorage.removeItem('accountLockedUntil');
          }
        }, 1000);

        return () => clearInterval(countdownInterval);
      } else {
        localStorage.removeItem('accountLockedUntil');
      }
    }
  };

  const [isTwoFARequired, setIsTwoFARequired] = useState(false);
const [twoFAMethod, setTwoFAMethod] = useState(null); 
const [loggedInUser, setLoggedInUser] = useState(null); // Store user data


const handleLogin = async () => {
  setError(null);
  setIsLoading(true);
  setInputError({ email: false, password: false });

  if (isRateLimited || accountLockedUntil) {
    setIsLoading(false);
    return;
  }

  // Input validation
  if (!userEmailValue || !password) {
    setError(t("Email and password are required."));
    setInputError({ email: !userEmailValue, password: !password });
    setIsLoading(false);
    return;
  }

  // Sanitize inputs
  const sanitizedEmail = sanitizeInput(userEmailValue);
  const sanitizedPassword = sanitizeInput(password);

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(sanitizedEmail)) {
    setError(t("Please enter a valid email."));
    setInputError((prev) => ({ ...prev, email: true }));
    setIsLoading(false);
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/server/auth/login`,
      { email: sanitizedEmail, password: sanitizedPassword },
      { withCredentials: true }
    );

      // Check if two-factor authentication is required
      if (response.data.twoFactorRequired) {
        // Hide login form and show 2FA verification form
        setLoginDesign(false);
        setIsTwoFARequired(true);
        setTwoFAMethod(response.data.twoFactorMethod);
       setLoggedInUser(response.data.user);
        setIsLoading(false); // Stop loading indicator
        return; // Important: Return here to prevent proceeding to login success
      }

    // Only execute this code if 2FA is not required
    console.log('Login successful:', response.data);
    login(response.data);
    setError(null);
    setIsLoading(false);
    setLoginSuccess(true);

    toast.success(t('Login successful!'), {
      style: {
        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
        fontSize: '16px',
      },
    });

    setTimeout(() => {
      navigate('/userdashboard');
    }, 2000);

  } catch (err) {
    console.error('Login failed:', err.response?.data?.message || err.message);

    // Handle network errors
    if (!err.response) {
      setError(t("Unable to connect to the server. Please check your internet connection or try again later."));
      setIsLoading(false);
      return;
    }

    // Handle rate limiting (status 429)
    if (err.response?.status === 429) {
      const rateLimitedUntil = new Date().getTime() + (60 * 1000); // 1 minute
      localStorage.setItem('rateLimitedUntil', rateLimitedUntil.toString());
      setIsRateLimited(true);
      setCountdown(60);
      setError(t("Too many login attempts. Please try again later."));
      setIsLoading(false);
      return;
    }

    // Handle account lockout (status 403)
    if (err.response?.status === 403) {
      const errorMessage = err.response?.data?.message;
      const lockUntil = err.response?.data?.lockUntil;

      if (errorMessage === "Warning: 1 more attempt before account lock. Reset password if needed.") {
        setError(t(errorMessage));
      } else if (errorMessage === "Wrong password or email!") {
        setError(t("Incorrect email or password."));
      } else if (errorMessage === "Your account is temporarily locked due to multiple failed login attempts. Please try again in 2 minutes.") {
        setError(t(errorMessage));

        if (lockUntil) {
          const accountLockedUntil = new Date(lockUntil).getTime();
          if (!isNaN(accountLockedUntil)) {
            localStorage.setItem('accountLockedUntil', accountLockedUntil.toString());
            setAccountLockedUntil(accountLockedUntil);
            setIsRateLimited(true);
            const timeRemaining = Math.max(0, Math.floor((accountLockedUntil - new Date().getTime()) / 1000));
            setCountdown(timeRemaining);
          }
        }
      }
      setIsLoading(false);
      return;
    }

    // Map error messages to translations
    const errorMessages = {
      "User not found!": t("No user found with this email."),
      "Wrong password or email!": t("Incorrect email or password."),
      "Too many login attempts. Please try again later.": t("Too many login attempts. Please try again later."),
      "Invalid email format.": t("Invalid email format."),
      "Warning: 1 more attempt before account lock. Reset password if needed.":
        t("Warning: You have 1 more attempt before your account may be locked. If you forgot your password, please reset it."),
      "Your account is temporarily locked due to multiple failed login attempts. Please try again in 2 minutes.":
        t("Your account is temporarily locked due to multiple failed login attempts. Please try again in 2 minutes."),
    };

    const errorMessage = err.response?.data?.message || 'An error occurred';
    const translatedError = errorMessages[errorMessage] || t('An error occurred.');
    setError(translatedError);
    setIsLoading(false);
  }
};






  // Handle Forgot Password Email Change
  const handleUserEmailChange1 = (e) => {
    const newValue = e.target.value;
    setUserEmailValue(newValue);

    // Clear error state when the user starts typing again
    if (resetInputError.email || emailError) {
      setEmailError(''); // Clear error message
      setResetInputError((prev) => ({ ...prev, email: false })); // Reset input error
    }
  };

  // Handle Password Change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // Clear error-related states when typing
    if (error) {
      setError(null); // Clear error message
    }
    setInputError((prev) => ({ ...prev, password: false }));
  };

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginDesign, setLoginDesign] = useState(true);
  const [passwordLinkSent, setPasswordLinkSent] = useState(false);


  const [showNewPassword, setShowNewPassword] = useState(false); // New state for password reset
  const [showSuccesPassword, setSuccesPassword] = useState(false); // New state for password reset

  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [emailError, setEmailError] = useState(""); // State for the email error message
  const [resetInputError, setResetInputError] = useState({ email: false });
  const inputRefs = useRef([]);
  const [userEmailValue, setUserEmailValue] = useState(''); // Updated email state
  const [storedEmail, setStoredEmail] = useState(''); // State to store the email for the next step
  const [confirmationMessage, setConfirmationMessage] = useState(''); // New state for confirmation message
  const [code, setCode] = useState(Array(4).fill('')); // Adjust the length as needed
  const [resetCodeError, setResetCodeError] = useState('');
  const [emailVerifyCode, setEmailVerifyCode] = useState(Array(4).fill('')); // Changed state name to emailVerifyCode

  const [resetInputSuccess, setResetInputSuccess] = useState({ code: false });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [inputErrorPassword, setInputErrorPassword] = useState({ password: false, confirmPassword: false });








  const handleForgotPasswordClick = () => {
    setLoginDesign(false); // Set to false to trigger the animation
    setShowForgotPassword(true); // Show forgot password form after animation

  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setLoginDesign(true)

  }

  const formatEmail = (email) => {
    const [localPart, domain] = email.split('@');
    if (!domain) return email; // Return as is if there's no domain

    const firstLetter = localPart.charAt(0);
    const maskedPart = localPart.slice(1).replace(/./g, '*'); // Replace remaining characters with '*'

    return `${firstLetter}${maskedPart}@${domain}`;
  };

  const maskedEmail = formatEmail(userEmailValue);

  // Handle User Email Change for Login
  const handleUserEmailChange = (e) => {
    const newValue = e.target.value;
    setUserEmailValue(newValue);

    // Clear error state when the user starts typing again
    if (inputError.email || emailError) {
      setEmailError(''); // Clear error message
      setInputError((prev) => ({ ...prev, email: false }));
    }
  };
  const handleCheckResetEmail = async () => {
    const emailResetPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email input is empty
    if (!userEmailValue) {
      setEmailError(t('Please enter your email'));
      setResetInputError((prev) => ({ ...prev, email: true }));
      return;
    }

    // Validate the email format
    if (!emailResetPattern.test(userEmailValue)) {
      setEmailError(t('Please enter a valid email address'));
      setResetInputError((prev) => ({ ...prev, email: true }));
      return;
    }

    // Clear errors if input is valid
    setEmailError('');
    setResetInputError((prev) => ({ ...prev, email: false }));
    setResetLoading(true);

    try {
      // Directly request password reset
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmailValue }),
      });

      // Log the status and response for debugging
      console.log(response.status);

      // Check if the response was successful
      if (response.ok) {
        // If the reset link is sent successfully
        setStoredEmail(userEmailValue); // Store the email
        setShowForgotPassword(false); // Hide the email input step
        setPasswordLinkSent(true); // Move to the next step
      } else {
        // Handle error when trying to send the password reset link
        const resetError = await response.json();
        console.error('Error response:', resetError); // Log the error response

        // Check for specific error messages from the backend
        if (resetError.message === 'Email not found') {
          setEmailError(t('Email not found'));
        } else {
          setEmailError(t(resetError.message) || t('Failed to send password reset link.'));
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setEmailError(t('An error occurred while processing your request.'));
    } finally {
      setResetLoading(false);
    }
  };



  const handleChange = (e, index) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, ''); // Only allow numbers (0-9)

    if (sanitizedValue) {
      const newCode = [...code];
      newCode[index] = sanitizedValue;
      setCode(newCode);

      // Clear the reset code error when user starts typing
      setResetCodeError(''); // Clear error message
      setResetInputError((prev) => ({ ...prev, code: false })); // Clear input error state

      // Move to the next input if the current one is filled and not the last
      if (index < 3) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      // Allow clearing the input
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyDown1 = (e, index) => {
    // Navigate back if Backspace is pressed and the current input is empty
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Timer and state initialization
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0); // Track number of wrong attempts



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
        setResetCodeError("Too many incorrect attempts. Please request a new code.");
      }
    }

    return () => clearInterval(interval); // Cleanup
  }, [timeRemaining, timerActive, wrongAttempts]);
  const handleVerifyResetCode = async () => {
    const resetCodeValue = code.join(''); // Join the code array to get the full code

    // Check if the reset code input is empty
    if (!resetCodeValue) {
      setResetCodeError(t('Please enter the reset code'));
      setResetInputError((prev) => ({ ...prev, code: true }));
      return;
    }

    if (wrongAttempts >= 3) {
      setResetCodeError('Too many incorrect attempts. Please request a new code.');
      setTimerActive(false); // Stop the timer
      return;
    }

    // Clear errors if input is valid
    setResetCodeError('');
    setResetInputError((prev) => ({ ...prev, code: false }));
    setIsLoading(true); // Start loading

    try {
      // Send request to verify the reset code
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: storedEmail, // Use the stored email from the previous step
          code: resetCodeValue, // Use the reset code entered by the user
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setResetInputSuccess((prev) => ({ ...prev, code: true })); // Set input border to green

        // Simulate a 2-second delay before stopping the loading spinner and moving to the next step
        setTimeout(() => {
          setIsLoading(false); // Stop loading
          setPasswordLinkSent(false); // Set to false
          setShowNewPassword(true); // Move to new password step
        }, 2000);
      } else {
        // Use translated message from server response using the error key
        setResetCodeError(t(result.error) || t('Invalid reset code. Please try again.'));
        setResetInputError((prev) => ({ ...prev, code: true })); // Set input border to red
        setIsLoading(false); // Stop loading
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setResetCodeError(t('Server error occurred while verifying the reset code')); // Show general error message
      setIsLoading(false); // Stop loading
    }
  };


  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    // Clear error states when the user starts typing
    setPasswordError('');
    setInputErrorPassword((prev) => ({ ...prev, password: false }));

    // Check password length
    if (value.length < 8 && value.length > 0) {
      setInputErrorPassword((prev) => ({ ...prev, password: true }));
    } else {
      // Reset input error if valid
      setInputErrorPassword((prev) => ({ ...prev, password: false }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Clear error states when the user starts typing
    setPasswordError('');
    setInputErrorPassword((prev) => ({ ...prev, confirmPassword: false }));
  };

  const handleUpdatePassword = async () => {
    // Clear previous errors
    setPasswordError('');
    setInputErrorPassword({ password: false, confirmPassword: false });

    // Check for empty inputs
    if (!newPassword && !confirmPassword) {
      setPasswordError(t('All fields are required'));
      setInputErrorPassword({ password: true, confirmPassword: true });
      return;
    }

    // Check for empty new password
    if (!newPassword) {
      setPasswordError(t('Please enter your new password'));
      setInputErrorPassword((prev) => ({ ...prev, password: true }));
      return;
    }

    // Check for empty confirm password
    if (!confirmPassword) {
      setPasswordError(t('Please confirm your new password'));
      setInputErrorPassword((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError(t('Passwords do not match'));
      setInputErrorPassword((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    // Check if new password is valid
    if (newPassword.length < 8) {
      setPasswordError(t('Password must be at least 8 characters long'));
      setInputErrorPassword((prev) => ({ ...prev, password: true }));
      return;
    }

    // Clear any existing error
    setPasswordError('');

    // Set loading state to true
    setIsLoading(true);

    try {
      // Wait for 2 seconds to simulate loading
      setTimeout(async () => {
        // Proceed with the password update process
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/reset-password`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmailValue, newPassword }), // Include email if needed
        });

        if (!response.ok) {
          const data = await response.json();
          setPasswordError(data.message); // Handle server errors
          setIsLoading(false);
          return;
        }

        // Handle successful response
        setIsLoading(false);
        setShowNewPassword(false);
        setSuccesPassword(true);

        // Optionally, reset the input fields
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (error) {
      setPasswordError('Failed to reset password. Please try again.');
      setIsLoading(false);
    }
  };


  const passwordBorderColor = inputErrorPassword.password ? 'red' : (newPassword.length >= 8 ? '#4caf50' : '#4776E6'); // green for success
  const confirmPasswordBorderColor = confirmPassword && confirmPassword === newPassword ? '#4caf50' : (inputErrorPassword.confirmPassword ? 'red' : '#4776E6'); // green for success

  const responseGoogle = async (response) => {
    console.log("Google response:", response);
    setIsLoading(true);

    // Destructure the fields from the Google response
    const { email, familyName, givenName, googleId, imageUrl } = response.profileObj;
    const idToken = response.tokenId; // Token received from Google

    try {
      // Post the token and other information to your backend
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/server/auth/google-login`, {
        email,
        name: `${givenName} ${familyName}`,
        googleId,
        idToken
      }, {
        withCredentials: true,
      });

      console.log('Google login successful:', res.data);

      if (res.data.success) {
        // Extract the user data from the response
        const user = res.data.user;

        // Prepare user data for local storage
        const userData = {
          _id: user._id || '',
          email: user.email || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          googleId: user.googleId || '',
          profileImg: user.profileImg || 'https://res.cloudinary.com/damicjacf/image/upload/v1728490158/default_profile_image.png', // Use default if necessary
          coverImg: user.coverImg || 'https://res.cloudinary.com/damicjacf/image/upload/v1728583460/MyCover_yngwcg.jpg', // Use default if necessary
          createdAt: user.createdAt || '',
          updatedAt: user.updatedAt || '',
        };


        // Save user data in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Update state and show success message
        setIsLoading(true)
        setLoginSuccess(true);
        toast.success(t('Google login successful!'));

        // Redirect to the user dashboard after a short delay
        setTimeout(() => {
          setIsLoading(false); // End loading state
          navigate('/userdashboard');
        }, 2000);
      } else {
        // If the user is not found, display the error and navigate to register
        setError(res.data.message); // Set the error message from the response
        toast.error(res.data.message); // Show error message as toast
        setIsLoading(false); // End loading state
        navigate('/auth/signup'); // Redirect to the register page
      }
    } catch (err) {
      // Handle error if the login process fails
      console.error('Google login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || (t('An error occurred please ckeck your connection')));
      setIsLoading(false); // End loading state on failure
    }
  };

  const onFailure = (response) => {
    console.error('Login failed:', response);
    toast.error('Google login failed. Please try again.'); // Show an error toast message
  };

  const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

  const handleBackToHome = () => {
    navigate('/')
  }


  const [zoom, setZoom] = useState(77); // 100% zoom level by default
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Center position by default
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [loginNormal, setLoginNormal] = useState(true)
  const [faceookLogin, setFacebookLogin] = useState(false)




  const [errorFacebook, setErrorFacebook] = useState(null);
  const [userData, setUserData] = useState(null); // State to hold user data
  const [signinDefault, setSignindefault] = useState(true);
  const [facebookReg, setFacebookReg] = useState(false);
  const [hasShownToast, setHasShownToast] = useState(false);

  const handleVerificationSuccess = (data) => {
    console.log("Login finalized:", data);

    // Log the user in using UserContext
    login(data);

   
    navigate('/userdashboard'); 
  };


  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID, // Your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);


  const [hasAuthenticated, setHasAuthenticated] = useState(false); // New state flag to track if auth has occurred

  const handleFacebookRedirect = () => {
    setIsLoading(true);
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;

    // Define the exact redirect URI for sign-in
    const redirectUri = window.location.pathname.includes('/auth/signup')
      ? `${import.meta.env.VITE_FRONTEND_URL}/auth/signup`
      : `${import.meta.env.VITE_FRONTEND_URL}/auth/signin`; // Your callback URL

    // URL to initiate Facebook OAuth dialog with redirect
    const facebookOAuthUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`;

    // Redirect the user to the Facebook login URL
    window.location.href = facebookOAuthUrl;
  };

  // In your useEffect for handling the response
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // Get the authorization code

    if (code && !hasAuthenticated) {
      const authenticateWithFacebook = async () => {
        setIsLoading(true);

        // Determine redirect URI based on current component

        const redirectUri = window.location.pathname.includes('/auth/signup')
          ? `${import.meta.env.VITE_FRONTEND_URL}/auth/signup`
          : `${import.meta.env.VITE_FRONTEND_URL}/auth/signin`; // Your callback URL

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/server/auth/facebook-auth`,
            { code, redirectUri },
            { withCredentials: true }
          );

          // Check for success and handle user info or 404 response
          if (response.data.success) {
            const { user } = response.data;

            // Store user data in local storage under the key 'userData'
            localStorage.setItem('userData', JSON.stringify(user));

            setIsLoading(false);
            toast.success('Facebook login successful!');
            setLoginSuccess(true);



            setTimeout(() => {
              navigate('/userdashboard'); // Redirect to user dashboard
            }, 2000);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const { userInfo } = error.response.data; // Get user info from 404 response
            console.log("User info from Facebook:", userInfo);

            // Store user data in local storage under the key 'userData'
            localStorage.setItem('userData', JSON.stringify(userInfo));
            setUserData(userInfo); // Set user data from Facebook
            setSignindefault(false); // Hide the default sign-in
            setFacebookReg(true);    // Show the registration component
          } else {
            console.error("Error during Facebook authentication:", error.response ? error.response.data : error.message);
          }
        } finally {
          setIsLoading(false);
        }
      };

      authenticateWithFacebook();
    }
  }, [hasAuthenticated]); // Runs only on mount



  return (
    <>
      {isSmallScreen ? (
        <SigninMobile />
      ) : loginNormal ? (
        <>
          <div className='Container slide-from-right'
            style={{
              width: '80%',
              height: '90vh',
              maxHeight: '650px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              display: 'flex',
              padding: '10px',
            }}
          >
            <div className="Cover"
              style={{
                width: isSmallScreen ? '100%' : '50%',
                height: '100%',
                borderRadius: '16px',
                backgroundImage: `url('https://res.cloudinary.com/damicjacf/image/upload/v1727009687/_43df115a-ba53-4cab-ba9b-5d89b4e24396_hxjdkg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                zIndex: '1',
              }}
            >
              <div className="BacktoWeb"
                style={{
                  position: 'absolute',
                  top: '2%',
                  left: currentLanguage === 'ar' ? '-5%' : '4%',
                  width: '100%',
                }}
              >
                <Button onClick={handleBackToHome}
                  sx={{
                    width: '32%',
                    maxWidth: 360,
                    color: 'white',
                    border: '1px solid white',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '16px',
                    maxHeight: '400px',
                    height: '32px',
                    display: 'flex',
                    justifyContent: currentLanguage === 'ar' ? 'space-between' : 'space-between',

                  }}
                >
                  <ArrowBackIcon sx={{
                    fontSize: '22px',
                    transform: currentLanguage === 'ar' ? 'rotate(180deg)' : 'none',
                  }} />
                  <Typography
                    sx={{
                      color: 'white',
                      flex: 1,
                      fontSize: '12px',
                      fontWeight: 'bold',
                      // Align text correctly for Arabic

                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    {t('Back to website')}
                  </Typography>

                </Button>
              </div>


            </div>

            <div className="Signin"
              style={{

                width: '50%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {signinDefault && (
                <>
                  <div className="Container slide-from-downToUp"
                    style={{
                      width: '59%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: loginDesign ? 'flex-start' : 'center',
                      justifyContent: loginDesign ? 'flex-start' : 'center',
                      flexDirection: 'column',


                    }}
                  >
                    {loginDesign ? (
                      <>
                        <div className="WelcomeTypo slide-from-left">
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: 'white',
                              fontSize: isMediumScreen ? '34px' : '38px',
                              textWrap: 'nowrap'
                            }}
                          >
                            {t('Welcome Back !')}
                          </Typography>
                        </div>
                        <div className="SigninTypo slide-from-left"
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
                            {t('Dont have an account?')} <a onClick={handleRegisterRedirect}
                              style={{ color: '#4776E6', cursor: 'pointer', borderBottom: '1px solid #4776E6' }}>{t('Sign up')}</a>
                          </Typography>
                        </div>

                        {error && (
                          <Typography
                            variant="body2"
                            color="error"
                            style={{ marginTop: '10px' }}
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              width: '100%',
                            }}
                            dangerouslySetInnerHTML={{ __html: error }}
                          />
                        )}
                        {errorFacebook && <p style={{ color: 'red' }}>{errorFacebook}</p>}

                        <div className="InputEmail slide-from-left"
                          style={{
                            display: 'flex',
                            gap: '5px',
                            marginTop: '13px',
                            width: '100%',
                          }}
                        >
                          <input
                            style={{
                              width: '100%',
                              height: '38px',
                              background: '#3B364C',
                              border: 'none',
                              outline: 'none',
                              position: 'relative',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              border: inputError.email ? '2px solid red' : '2px solid #4776E6',
                              color: 'white',
                              borderRadius: '5px',
                              padding: '15px',
                            }}
                            type="email"
                            value={userEmailValue}
                            onChange={handleUserEmailChange}
                            placeholder={t('Enter your email')}

                          />
                          {inputError.email && (
                            <ErrorOutlineIcon style={{
                              color: 'red',
                              position: 'absolute',
                              right: currentLanguage === 'ar' ? '90%' : '3%',
                              fontSize: '20px',
                              alignSelf: 'center'
                            }} />
                          )}

                          <style>
                            {`
    input::placeholder {
      color: white;
    }
  `}
                          </style>
                        </div>

                        <div className="InputPassword slide-from-left"
                          style={{
                            display: 'flex',
                            gap: '5px',
                            marginTop: '13px',
                            width: '100%',
                          }}
                        >
                          <input
                            style={{
                              width: '100%',
                              height: '38px',
                              background: '#3B364C',
                              border: 'none',
                              outline: 'none',
                              border: inputError.password ? '2px solid red' : '2px solid #4776E6',
                              color: 'white',
                              fontFamily: /[A-Za-z]/.test(password) && currentLanguage === 'ar'
                                ? '"Airbnbcereal", sans-serif'
                                : currentLanguage === 'ar'
                                  ? '"Droid Arabic Kufi", serif'
                                  : '"Airbnbcereal", sans-serif',
                              borderRadius: '5px',
                              padding: '15px',
                            }}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('Enter your password')}
                            id="card-number"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          {inputError.password ? (
                            <ErrorOutlineIcon
                              style={{
                                position: 'absolute',
                                right: currentLanguage === 'ar' ? '90%' : '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'red',
                                cursor: 'default',
                              }}
                              sx={{ fontSize: '20px' }}
                            />
                          ) : (
                            <div
                              onClick={togglePasswordVisibility}
                              style={{
                                position: 'absolute',
                                right: currentLanguage === 'ar' ? '90%' : '10px',
                                top: '60%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: 'white',
                              }}
                            >
                              {showPassword ? <VisibilityOffIcon sx={{ fontSize: '20px' }} /> : <VisibilityIcon sx={{ fontSize: '20px' }} />}
                            </div>
                          )}
                          <style>
                            {`
    input::placeholder {
      color: white;
    }
  `}
                          </style>
                        </div>

                        <div className="RememberMe slide-from-left"
                          style={{
                            display: 'flex',
                            width: '100%', // Full width to match input fields
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '5px',
                          }}>

                          {/* Left section with checkbox and "Remember me" label */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
                            <Checkbox
                              defaultChecked
                              style={{
                                color: 'white', // Default color
                                padding: '0px',
                                margin: '0px',

                              }}
                            />
                            <Typography
                              style={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '14px',
                                whiteSpace: 'nowrap', // Prevents wrapping
                              }}>
                              {t('Remember me')}
                            </Typography>
                          </div>

                          {/* Right section with "Forgot password?" link */}
                          <a
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor behavior
                              handleForgotPasswordClick(); // Call the function
                            }}
                            style={{
                              color: '#4776E6',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              fontSize: '14px',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              marginTop: '8px',
                            }}
                            href="http://">
                            {t('Forgot password?')}
                          </a>
                        </div>


                        <div className="SigninButton  slide-from-left"
                          style={{
                            width: '100%',
                            marginTop: '12px',
                          }}
                        >
                          <Button
                            variant="outlined"
                            className="btn-grad"
                            onClick={handleLogin}
                            disabled={isLoading || isRateLimited || accountLockedUntil}
                            sx={{
                              width: '100%',
                              position: 'relative',
                              cursor: (isLoading || isRateLimited || accountLockedUntil) ? 'not-allowed' : 'pointer',
                              opacity: (isLoading || isRateLimited || accountLockedUntil) ? 0.6 : 1,
                              height: '38px',
                              backgroundColor: loginSuccess ? 'green' : 'transparent',
                              color: loginSuccess ? 'white' : 'white',
                              borderColor: 'none',
                              '&:hover': {
                                borderColor: 'white',
                                backgroundColor: isLoading ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                              },
                            }}
                          >
                            {isLoading ? (
                              <div className="lds-dual-ring" style={{ margin: 'auto' }}></div>
                            ) : loginSuccess ? (
                              <img
                                src="https://res.cloudinary.com/damicjacf/image/upload/v1728656255/face-scan-success-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--id-found-successfully-ui-pack-user-interface-icons-8457285-ezgif.com-gif-maker_ctsxtv.gif"
                                alt="Success"
                                className="success-gif"
                                style={{ width: '48px', height: '48px' }}
                              />
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
                                {isRateLimited ? (
                                  `${t('Try Again in')} ${Math.ceil(countdown)}s` // Add the countdown value and 's' for seconds
                                ) : accountLockedUntil ? (
                                  `${t('Account Locked try again in')} ${Math.ceil(countdown)}s` // Add the countdown value and 's' for seconds
                                ) : (
                                  t('Sign in')
                                )}
                              </Typography>
                            )}
                          </Button>
                        </div>

                        <div className="SigninWith  slide-from-left "
                          style={{
                            width: '99%',
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div className="Line1"
                            style={{
                              height: '0.5px',
                              width: currentLanguage === 'ar' ? '20%' :
                                currentLanguage === 'fr' ? '22%' :
                                  '30%',
                              background: 'white',
                            }}
                          >

                          </div>
                          <div className="Typo">
                            <Typography
                              sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '14px',
                                textWrap: currentLanguage === 'ar' ? 'nowrap' : 'unset',
                              }}

                            >
                              {t('Or Signin with')}
                            </Typography>
                          </div>
                          <div className="Line2"
                            style={{
                              height: '0.5px',
                              width: currentLanguage === 'ar' ? '20%' :
                                currentLanguage === 'fr' ? '22%' :
                                  '30%',
                              background: 'white',
                            }}
                          >

                          </div>

                        </div>

                        <div className="SocailRegister  slide-from-left"
                          style={{
                            width: '100%',
                            marginTop: '13px',
                            display: 'flex',
                            gap: '17px',
                          }}
                        >
                          <GoogleLogin
                            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                            buttonText={
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                  src="https://res.cloudinary.com/damicjacf/image/upload/v1726935029/GoogleLogo-removebg-preview_as5ffe.png" // Transparent PNG
                                  alt="Google Logo"
                                  style={{ width: '26px', height: '26px', marginRight: '8px' }}
                                />
                                <Typography
                                  sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                  }}
                                >
                                  {t('Google')}
                                </Typography>
                              </div>
                            }
                            onSuccess={responseGoogle}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            className="google-login-button"
                          />


                          <Button onClick={handleFacebookRedirect}
                            variant="outlined"
                            sx={{
                              color: 'white',
                              width: '47%',
                              height: '40px',
                              border: '1px solid white',
                              ":hover": {
                                border: '1px solid white',
                              },
                              display: 'flex',
                              alignItems: 'center', // Center logo and text vertically
                              justifyContent: 'center', // Center logo and text horizontally
                            }}
                          >
                            <img
                              src="https://res.cloudinary.com/damicjacf/image/upload/v1726935243/facebook_logos_PNG19754_iz2nrh.png"
                              alt="Google Logo"
                              style={{ width: '30px', height: '30px', marginRight: '8px' }} // Adjust size and spacing
                            />
                            <Typography
                              sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textTransform: 'capitalize',
                              }}
                            >
                              {t('Facebook')}
                            </Typography>
                          </Button>
                        </div>

                      </>
                    ) : showForgotPassword ? (
                      <>
                        <div className="PasswordResetContainer slide-from-right"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <div className="PrintIcon"
                            style={{
                              height: '50px',
                              width: '50px',
                              border: '1px solid white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '10px',
                              borderRadius: '13px',
                            }}
                          >
                            <FingerprintIcon sx={{ color: 'white', fontSize: '35px', }} />
                          </div>
                          <div className="ForgotPassword">
                            <Typography
                              sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '38px',
                              }}
                            >
                              {t('Forgot Password?')}
                            </Typography>
                          </div>
                          <div className="ForgotPasswordTYpo">
                            <Typography
                              sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '15px',
                                textAlign: 'center',
                              }}
                            >

                              {t("No Worries, we'll send you reset instructions.")}

                            </Typography>
                          </div>
                          <div className="EmailERROR">
                            {emailError && (
                              <Typography style={{
                                color: 'red', marginTop: '5px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                              }}>
                                {emailError}
                              </Typography>
                            )}
                          </div>
                          <div className="InputEmailPassword"
                            style={{
                              display: 'flex',
                              gap: '5px',
                              marginTop: '13px',
                              position: 'relative',
                            }}
                          >
                            <input
                              style={{
                                width: '330px',
                                height: '38px',
                                background: '#3B364C',
                                border: 'none',
                                outline: 'none',
                                position: 'relative',
                                fontFamily: /[A-Za-z]/.test(userEmailValue) && currentLanguage === 'ar'
                                  ? '"Airbnbcereal", sans-serif'
                                  : currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',
                                border: resetInputError.email ? '2px solid red' : '2px solid #4776E6',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '15px',
                              }}
                              type="email"
                              value={userEmailValue}
                              onChange={handleUserEmailChange1} // Updated change handler
                              placeholder={t('Enter your email')}
                            />
                            {resetInputError.email && (
                              <ErrorOutlineIcon style={{
                                color: 'red',
                                position: 'absolute',
                                right: currentLanguage === 'ar' ? '90%' : '3%',
                                fontSize: '20px',
                                alignSelf: 'center'
                              }} />
                            )}

                            <style>
                              {`
      input::placeholder {
        font-family: ${/[A-Za-z]/.test(userEmailValue) && currentLanguage === 'ar'
                                  ? '"Airbnbcereal", sans-serif'
                                  : currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif'};
        color: white; /* Placeholder color */
        opacity: 0.5; /* Set placeholder opacity */
      }
    `}
                            </style>
                          </div>


                          <div className="ResetPasswordButton"
                            style={{
                              marginTop: '18px',

                            }}
                          >
                            <Button onClick={handleCheckResetEmail}
                              variant="outlined"
                              className='btn-grad'


                              sx={{
                                width: '332px',

                                height: '38px',
                                backgroundColor: loginSuccess ? 'green' : 'transparent', // Change background to green on success
                                color: loginSuccess ? 'white' : 'white', // Keep text color white
                                borderColor: 'none',
                                '&:hover': {
                                  borderColor: 'white',
                                  backgroundColor: loading ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                                },
                              }}
                            >
                              {resetLoading ? (
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
                                  {t('Reset password')}
                                </Typography>
                              )}
                            </Button>
                          </div>
                          <div className="BackToLogin"
                            style={{
                              marginTop: '20px',
                              display: 'flex',
                              gap: '6px',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor behavior
                              handleBackToLogin(); // Call the function
                            }}
                          >
                            {currentLanguage === 'ar' ? (
                              <>
                                <Typography
                                  sx={{
                                    fontFamily: '"Droid Arabic Kufi", serif',
                                    color: 'white',
                                    fontSize: '15px',
                                  }}
                                >
                                  {t('Back to log in')}
                                </Typography>
                                <div className="Icon">
                                  <ArrowBackIcon sx={{ color: 'white' }} />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="Icon">
                                  <ArrowBackIcon sx={{ color: 'white' }} />
                                </div>
                                <Typography
                                  sx={{
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontSize: '15px',
                                  }}
                                >
                                  {t('Back to log in')}
                                </Typography>
                              </>
                            )}
                          </div>


                        </div>
                      </>

                    ) : passwordLinkSent ? (
                      <div className="LinkSentContainer slide-from-right"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div className="EmailIcon slide-from-right "
                          style={{
                            height: '50px',
                            width: '50px',
                            border: '1px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10px',
                            borderRadius: '13px',
                          }}
                        >
                          <DraftsOutlinedIcon sx={{ color: 'white', fontSize: '35px', }} />
                        </div>
                        <div className="ResetPassword slide-from-right ">
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: 'white',
                              fontSize: '38px',
                            }}
                          >
                            {t('Code Verification')}
                          </Typography>
                        </div>
                        <div className="EmailInfo slide-from-right ">
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: 'white',
                              fontSize: '15px',
                            }}
                          >
                            {t('We sent a code to')}{' '}
                            <span style={{ color: '#4776E6', fontWeight: 'bold' }}>
                              {maskedEmail}
                            </span>
                          </Typography>

                        </div>
                        {resetCodeError &&
                          <Typography style={{
                            color: 'red', marginTop: '10px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                          }}>{resetCodeError}
                          </Typography>}

                        <div className="CodeEnter slide-from-right "
                          style={{
                            display: 'flex',
                            gap: '30px',
                            marginTop: '18px',
                          }}
                        >
                          {code.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (inputRefs.current[index] = el)}
                              type="text"
                              value={digit}
                              onChange={(e) => handleChange(e, index)}
                              onKeyDown={(e) => handleKeyDown1(e, index)}
                              maxLength="1"
                              style={{
                                height: '60px',
                                width: '55px',
                                border: resetInputError.code ? '2px solid red' : resetInputSuccess.code ? '2px solid green' : '1px solid #ccc',
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
                        <div className="ResetPasswordButton slide-from-right "
                          style={{
                            marginTop: '18px',

                          }}
                        >
                          <Button onClick={handleVerifyResetCode}
                            variant="outlined"
                            className='btn-grad'


                            sx={{
                              width: '315px',

                              height: '38px',
                              backgroundColor: loginSuccess ? 'green' : 'transparent', // Change background to green on success
                              color: loginSuccess ? 'white' : 'white', // Keep text color white
                              borderColor: 'none',
                              '&:hover': {
                                borderColor: 'white',
                                backgroundColor: loading ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
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
                        <div className="ForgotPasswordTYpo slide-from-right "
                          style={{
                            marginTop: '15px',
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
                            <a href='/auth/sigin'
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
                        <div className="ForgotPasswordTYpo slide-from-right"
                          style={{
                            marginTop: '20px',
                            display: 'flex',
                            gap: '6px',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor behavior
                            handleBackToLogin(); // Call the function
                          }}
                        >
                          {currentLanguage === 'ar' ? (
                            <>
                              <Typography
                                sx={{
                                  fontFamily: '"Droid Arabic Kufi", serif',
                                  color: 'white',
                                  fontSize: '15px',
                                }}
                              >
                                {t('Back to log in')}
                              </Typography>
                              <div className="Icon">
                                <ArrowBackIcon sx={{ color: 'white' }} />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="Icon">
                                <ArrowBackIcon sx={{ color: 'white' }} />
                              </div>
                              <Typography
                                sx={{
                                  fontFamily: '"Airbnbcereal", sans-serif',
                                  color: 'white',
                                  fontSize: '15px',
                                }}
                              >
                                {t('Back to log in')}
                              </Typography>
                            </>
                          )}
                        </div>


                      </div>
                    ) : showNewPassword ? (
                      <div className="Container "
                        style={{
                          width: '100%',
                        }}
                      >

                        <div className="NewPassword slide-from-right"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <div className="PasswordIcon slide-from-right "
                            style={{
                              height: '50px',
                              width: '50px',
                              border: '1px solid white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '10px',
                              borderRadius: '13px',
                            }}
                          >
                            <PasswordIcon sx={{ color: 'white', fontSize: '35px', }} />
                          </div>
                          <div className="NewPassword slide-from-right">
                            <Typography
                              sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '38px',
                                textAlign: 'center',
                                lineHeight: '40px',
                              }}
                            >
                              {t('Set new password')}
                            </Typography>
                          </div>
                          <div className="PasswordInfo slide-from-right">
                            <Typography
                              sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontSize: '15px',
                                marginTop: currentLanguage === 'fr' ? '10px' : 'unset',
                              }}
                            >
                              {t('Must be at least 8 characters')}

                            </Typography>

                          </div>
                          {passwordError &&
                            <Typography style={{
                              color: 'red', marginTop: '10px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}>
                              {passwordError}
                            </Typography>}

                          <div className="InputPassword slide-from-right "
                            style={{
                              display: 'flex',
                              gap: '5px',
                              marginTop: '13px',
                              position: 'relative',
                            }}
                          >
                            <input
                              style={{
                                width: '332px',
                                height: '38px',
                                background: '#3B364C',
                                border: 'none',
                                outline: 'none',
                                border: `2px solid ${passwordBorderColor}`,
                                color: 'white',
                                borderRadius: '5px',
                                fontFamily: /[A-Za-z]/.test(newPassword) && currentLanguage === 'ar'
                                  ? '"Airbnbcereal", sans-serif'
                                  : currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif', // Default font for non-Arabic
                                padding: '15px',
                              }}
                              type={showPassword ? 'text' : 'password'}
                              placeholder={t('Enter your new password')}
                              value={newPassword}
                              onChange={handleNewPasswordChange}
                            />
                            {/* Conditional rendering for icons */}
                            {inputErrorPassword.password ? (
                              <ErrorOutlineIcon
                                style={{
                                  position: 'absolute',
                                  right: currentLanguage === 'ar' ? '90%' : '10px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: 'red',
                                  cursor: 'default',
                                }}
                                sx={{ fontSize: '20px' }}
                              />
                            ) : (
                              <div
                                onClick={togglePasswordVisibility}
                                style={{
                                  position: 'absolute',
                                  right: currentLanguage === 'ar' ? '90%' : '10px',
                                  top: '60%',
                                  transform: 'translateY(-50%)',
                                  cursor: 'pointer',
                                  color: 'white',
                                }}
                              >
                                {showPassword ? <VisibilityOffIcon sx={{ fontSize: '20px' }} /> : <VisibilityIcon sx={{ fontSize: '20px' }} />}
                              </div>
                            )}
                            <style>
                              {`
      input::placeholder {
        color: white;
        opacity: 1;
      }
    `}
                            </style>
                          </div>

                          <div className="ConfirmPassword slide-from-right "
                            style={{
                              display: 'flex',
                              gap: '5px',
                              marginTop: '13px',
                              position: 'relative',
                            }}
                          >
                            <input
                              style={{
                                width: '332px',
                                height: '38px',
                                background: '#3B364C',
                                border: 'none',
                                outline: 'none',
                                border: `2px solid ${confirmPasswordBorderColor}`,
                                color: 'white',
                                borderRadius: '5px',
                                fontFamily: /[A-Za-z]/.test(confirmPassword) && currentLanguage === 'ar'
                                  ? '"Airbnbcereal", sans-serif'
                                  : currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif', // Default font for non-Arabic
                                padding: '15px',
                              }}
                              type={showPassword ? 'text' : 'password'}
                              placeholder={t('Confirm your new password')}
                              value={confirmPassword}
                              onChange={handleConfirmPasswordChange}
                            />
                            {/* Conditional rendering for icons */}
                            {inputErrorPassword.confirmPassword ? (
                              <ErrorOutlineIcon
                                style={{
                                  position: 'absolute',
                                  right: currentLanguage === 'ar' ? '90%' : '10px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: 'red',
                                  cursor: 'default',
                                }}
                                sx={{ fontSize: '20px' }}
                              />
                            ) : (
                              <div
                                onClick={togglePasswordVisibility}
                                style={{
                                  position: 'absolute',
                                  right: currentLanguage === 'ar' ? '90%' : '10px',
                                  top: '60%',
                                  transform: 'translateY(-50%)',
                                  cursor: 'pointer',
                                  color: 'white',
                                }}
                              >
                                {showPassword ? <VisibilityOffIcon sx={{ fontSize: '20px' }} /> : <VisibilityIcon sx={{ fontSize: '20px' }} />}
                              </div>
                            )}
                            <style>
                              {`
      input::placeholder {
        color: white;
        opacity: 1;
      }
    `}
                            </style>
                          </div>

                          <div className="ResetNewPasswordButton slide-from-right "
                            style={{
                              marginTop: '18px',

                            }}
                          >
                            <Button onClick={handleUpdatePassword}
                              variant="outlined"
                              className='btn-grad'


                              sx={{
                                width: '335px',

                                height: '38px',
                                backgroundColor: loginSuccess ? 'green' : 'transparent', // Change background to green on success
                                color: loginSuccess ? 'white' : 'white', // Keep text color white
                                borderColor: 'none',
                                '&:hover': {
                                  borderColor: 'white',
                                  backgroundColor: loading ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
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
                                  {t('Update Password')}
                                </Typography>
                              )}
                            </Button>
                          </div>
                          <div className="BackToLogon slide-from-right"
                            style={{
                              marginTop: '20px',
                              display: 'flex',
                              gap: '6px',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default anchor behavior
                              handleBackToLogin(); // Call the function
                            }}
                          >
                            {currentLanguage === 'ar' ? (
                              <>
                                <Typography
                                  sx={{
                                    fontFamily: '"Droid Arabic Kufi", serif', // Use Arabic font
                                    color: 'white',
                                    fontSize: '15px',
                                  }}
                                >
                                  {'العودة إلى تسجيل الدخول'} {/* Arabic text */}
                                </Typography>
                                <div className="Icon">
                                  <ArrowBackIcon sx={{ color: 'white' }} />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="Icon">
                                  <ArrowBackIcon sx={{ color: 'white' }} />
                                </div>
                                <Typography
                                  sx={{
                                    fontFamily: '"Airbnbcereal", sans-serif', // Use English font
                                    color: 'white',
                                    fontSize: '15px',
                                  }}
                                >
                                  {t('Back to log in')}
                                </Typography>
                              </>
                            )}
                          </div>


                        </div>
                      </div>
                    ) : showSuccesPassword ? (
                      <div className="NewPassword slide-from-right "
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',

                        }}
                      >
                        <div className="PasswordIcon slide-from-right "
                          style={{
                            height: '50px',
                            width: '50px',
                            border: '1px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10px',
                            borderRadius: '13px',
                          }}
                        >
                          <PasswordIcon sx={{ color: 'white', fontSize: '35px', }} />
                        </div>
                        <div className="NewPasswordUpdated slide-from-right"
                          style={{
                            width: currentLanguage === 'ar' ? '120%' : 'unset',
                            display: currentLanguage === 'ar' ? 'flex' : 'unset',
                            justifyContent: currentLanguage === 'ar' ? 'center' : 'unset',
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: 'white',
                              fontSize: '38px',

                            }}
                          >
                            {t('Password updated!')}
                          </Typography>
                        </div>
                        <div className="ReturnTypo">
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: 'white',
                              fontSize: '15px',
                              textWrap: 'nowrap',
                            }}
                          >

                            {t('Please return to the login page to sign in.')}
                          </Typography>
                        </div>
                        <div className="SuccesLottiesIcon">
                          <Lottie
                            animationData={PasswordSucces}
                            loop={false}
                            style={{ width: 200, height: 200 }}
                          />
                        </div>
                        <div className="BackToLogin"
                          style={{
                            marginTop: '20px',
                            display: 'flex',
                            gap: '6px',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor behavior
                            handleBackToLogin(); // Call the function
                          }}
                        >
                          {currentLanguage === 'ar' ? (
                            <>
                              <Typography
                                sx={{
                                  fontFamily: '"Droid Arabic Kufi", serif', // Use Arabic font
                                  color: 'white',
                                  fontSize: '15px',
                                }}
                              >
                                {t('العودة إلى تسجيل الدخول')} {/* Arabic translation for "Back to log in" */}
                              </Typography>
                              <div className="Icon">
                                <ArrowBackIcon sx={{ color: 'white' }} />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="Icon">
                                <ArrowBackIcon sx={{ color: 'white' }} />
                              </div>
                              <Typography
                                sx={{
                                  fontFamily: '"Airbnbcereal", sans-serif', // Use English font
                                  color: 'white',
                                  fontSize: '15px',
                                }}
                              >
                                {t('Back to log in')} {/* English text */}
                              </Typography>
                            </>
                          )}
                        </div>

                      </div>
                     ) : isTwoFARequired ? (
                      twoFAMethod === "email" ? (
                        <div className="div"
                        style={{
                          color : 'white'
                        }}
                        >
                          <LoginEmailAuth user={loggedInUser} onVerificationSuccess={handleVerificationSuccess}  />
                        </div>
                      ) : twoFAMethod === "phone" ? (
                        <div className="div"
                        style={{
                         
                        }}
                        >
                         <Fauthphonelogin user={loggedInUser} onVerificationSuccess={handleVerificationSuccess} /> 
                        </div>
                      ) : (
                        <div className="div">
                          {t("Unknown 2FA method. Please contact support.")}
                        </div>
                      )

                    ) :
                    
                     null}
                  </div>
                </>
              )};

              {facebookReg && (
                <>
                  <FacebookRegister userData={userData} />
                </>
              )}

            </div>

          </div>
        </>


      ) : null // Render nothing when both loginNormal and facebookLogin are false
      }
    </>
  )
}

export default Signin