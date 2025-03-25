import React, { useEffect, useState, useRef } from 'react';
import { Typography, Fade, Box, Input, InputAdornment, Button } from '@mui/material';
import i18n from 'i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import DangerousIcon from '@mui/icons-material/Dangerous';
import DOMPurify from 'dompurify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
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


const loadingKeyframes = `
    @keyframes loading {
                        0% {
                            background-position: -200% 0;
                        }
                        100% {
                            background-position: 200% 0;
                        }
                    }
                `;



function ProfileChangePassword({ setIsPasswordUpdatedOpen }) {
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


    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });


    const [errors, setErrors] = useState({
        currentPasswordError: false,
        newPasswordError: false,
        confirmNewPasswordError: false,
    });

    const [statusIcons, setStatusIcons] = useState({
        currentPassword: null, // No icon initially
        newPassword: null,
        confirmNewPassword: null,
    });

    // Handle currentPassword input change
    const handleCurrentPasswordInputChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, currentPassword: value }));

        // Update icon and error styles based on input value length
        if (value.trim().length === 0) {
            setStatusIcons((prev) => ({ ...prev, currentPassword: null })); // No icon
            setErrors((prev) => ({ ...prev, currentPasswordError: false })); // No error
            setErrorMessage(''); // Clear error message if input is empty
        } else if (value.trim().length >= 8) {
            setStatusIcons((prev) => ({ ...prev, currentPassword: true })); // Success icon
            setErrors((prev) => ({ ...prev, currentPasswordError: false })); // No error
            setErrorMessage(''); // Clear error message when length is 8 or more
        } else {
            setStatusIcons((prev) => ({ ...prev, currentPassword: false })); // Fail icon
            setErrors((prev) => ({ ...prev, currentPasswordError: true })); // Error
            setErrorMessage('Password must be at least 8 characters long.'); // Show error message
        }
    };



    const { user } = useUser(); // Make sure you're getting both user and setUser

    // Handle newPassword input change
    const handleNewPasswordInputChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, newPassword: value }));

        // Validate password
        let errorMessage = '';

        // Check if the password is empty
        if (value.trim().length === 0) {
            setStatusIcons((prev) => ({ ...prev, newPassword: null })); // No icon
            setErrors((prev) => ({ ...prev, newPasswordError: false })); // No error
            setErrorMessage(''); // Clear error message if input is empty
        }
        // Check length of password (minimum 8 characters)
        else if (value.trim().length < 8) {
            setStatusIcons((prev) => ({ ...prev, newPassword: false })); // Fail icon
            setErrors((prev) => ({ ...prev, newPasswordError: true })); // Error
            errorMessage = 'Password must be at least 8 characters long.'; // Set error message
        }
        // Check if password contains at least one special character
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setStatusIcons((prev) => ({ ...prev, newPassword: false })); // Fail icon
            setErrors((prev) => ({ ...prev, newPasswordError: true })); // Error
            errorMessage = 'Password must contain at least one special character.'; // Set error message
        }
        // Check if password contains at least one number
        else if (!/\d/.test(value)) {
            setStatusIcons((prev) => ({ ...prev, newPassword: false })); // Fail icon
            setErrors((prev) => ({ ...prev, newPasswordError: true })); // Error
            errorMessage = 'Password must contain at least one number.'; // Set error message
        }
        // If all conditions are met (8+ characters, special character, and number)
        else {
            setStatusIcons((prev) => ({ ...prev, newPassword: true })); // Success icon
            setErrors((prev) => ({ ...prev, newPasswordError: false })); // No error
            setErrorMessage(''); // Clear error message if all conditions are met
        }

        // Set the error message if any condition is not met
        setErrorMessage(errorMessage);
    };


    // Handle confirmNewPassword input change
    const handleConfirmNewPasswordInputChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, confirmNewPassword: value }));

        // Check password match immediately when confirmNewPassword is typed
        if (value === formData.newPassword) {
            setStatusIcons((prev) => ({ ...prev, confirmNewPassword: true })); // Success icon
            setErrors((prev) => ({ ...prev, confirmNewPasswordError: false })); // No error
            setErrorMessage(''); // Clear error message when passwords match
        } else {
            setStatusIcons((prev) => ({ ...prev, confirmNewPassword: false })); // Fail icon
            setErrors((prev) => ({ ...prev, confirmNewPasswordError: true })); // Error
            setErrorMessage('Passwords do not match. Please confirm your new password.'); // Show mismatch error message
        }
    };



    const userId = user?._id; // Extract the user ID using optional chaining

    const handlePasswordUpdate = async () => {
        let isValid = true;
        let newErrors = { ...errors };

        // Reset individual field errors and message
        setErrorMessage(''); // Clear any previous error message

        // Sanitize input fields to prevent any harmful scripts
        const sanitizedCurrentPassword = DOMPurify.sanitize(formData.currentPassword);
        const sanitizedNewPassword = DOMPurify.sanitize(formData.newPassword);
        const sanitizedConfirmNewPassword = DOMPurify.sanitize(formData.confirmNewPassword);

        // Check if any field is empty
        if (!sanitizedCurrentPassword || !sanitizedNewPassword || !sanitizedConfirmNewPassword) {
            newErrors.currentPasswordError = !sanitizedCurrentPassword;
            newErrors.newPasswordError = !sanitizedNewPassword;
            newErrors.confirmNewPasswordError = !sanitizedConfirmNewPassword;

            // Set the global error message
            setErrorMessage('All fields are required.');
            isValid = false;
        } else {
            // If fields are valid, reset the error states
            newErrors.currentPasswordError = false;
            newErrors.newPasswordError = false;
            newErrors.confirmNewPasswordError = false;
        }

        // Password validation for new password (length, special character, and number)
        const passwordLengthValid = sanitizedNewPassword.length >= 8;
        const passwordHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(sanitizedNewPassword);
        const passwordHasNumber = /\d/.test(sanitizedNewPassword);

        if (!passwordLengthValid || !passwordHasSpecialChar || !passwordHasNumber) {
            newErrors.newPasswordError = true;
            setErrorMessage('Password must be at least 8 characters long, include a special character, and contain a number.');
            isValid = false;
        }

        // Check if passwords match
        if (sanitizedNewPassword !== sanitizedConfirmNewPassword) {
            newErrors.confirmNewPasswordError = true;
            setErrorMessage('Passwords do not match. Please confirm your new password.');
            isValid = false;
        }

        setErrors(newErrors);

        // Proceed with the request only if all fields are valid
        if (isValid && userId) {
            setIsLoading(true); // Set loading only after validation passes
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/new-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        currentPassword: sanitizedCurrentPassword,
                        newPassword: sanitizedNewPassword,
                        confirmNewPassword: sanitizedConfirmNewPassword,
                        userId: userId, // Pass the userId from localStorage
                    }),
                    credentials: 'include', // Automatically includes cookies, such as the JWT token
                });

                const data = await response.json();

                if (response.ok) {
                    setTimeout(() => {
                        setIsPasswordUpdatedOpen(true); // Trigger the profile updated modal
                        setIsLoading(false); // Optional: Hide loading indicator
                    }, 2000);
                } else {
                    setErrorMessage(data.message || 'An error occurred');
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error updating password:', error);
                setErrorMessage('Failed to update password. Please try again.');
                setIsLoading(false);
            }
        } else {
            setErrorMessage('Please fill all fields and ensure they meet the requirements.');
        }
    };

    const [isLoaded, setIsLoaded] = useState(false);
          useEffect(() => {
                // Simulate loading time
                const timer = setTimeout(() => {
                    setIsLoaded(true);
                }, 2000); // Adjust the delay as needed
        
                return () => clearTimeout(timer);
            }, []);
        
    







    return (
        <div
            className='slide-from-upToDown'
            style={{
                width: '100%',

                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start', // Align items to the left
                gap: '20px',
                padding: '20px', // Add padding to avoid content sticking to the edges
            }}
        >
            {/* Skelton for Account Password Changing   */}
            <style>
                {loadingKeyframes}
            </style>

            {!isLoaded && (
                <>
                    <div className="PasswordSkeltonContainer"
                        style={{
                            width: '100%',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',

                        }}
                    >
                        <div className="ChanePasswordTYpo"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '40%',
                                    height: '20px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="CurrentPassword"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <div className="CurrentPassword"
                                style={{
                                    width: '100%',
                                    height: '36px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="NewPassword"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <div className="NewPassword"
                                style={{
                                    width: '100%',
                                    height: '36px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="ConfirmNewPassword"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <div className="ConfirmNewPassword"
                                style={{
                                    width: '100%',
                                    height: '36px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="Conditions"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '25%',
                                    height: '17px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="Conditions1"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '20%',
                                    height: '17px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="Conditions2"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '16%',
                                    height: '17px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="Conditions3"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '13%',
                                    height: '17px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div> 
                        <div className="Conditions4"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '14%',
                                    height: '17px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div>
                        <div className="Conditions5"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="PassInfo"
                                style={{
                                    width: '11%',
                                    height: '17px',
                                    borderRadius: '16px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div> 
                        <div className="UpdateButton"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div className="UpdateButton"
                                style={{
                                    width: '100%',
                                    height: '38px',
                                    backgroundColor: '#111827',
                                    overflow: 'hidden',
                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                }}
                            >

                            </div>


                        </div> 

                    </div>
                </>
            )}

            {isLoaded && (
                <>


                    <div className="ChangeTypo">
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '17px',
                                fontWeight: 'bold',
                            }}
                        >
                            {t('Change Password :')}
                            <span
                                style={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    marginLeft: '8px',
                                    marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                    opacity: '0.5',

                                }}
                            >
                                {t('Example of a strong password : (YourPass1!).')}
                            </span>
                        </Typography>
                    </div>
                    {errorMessage && (
                        <Typography color="error"
                            sx={{
                                marginTop: '-17px',
                                marginBottom: '-5px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                            }}>
                            {t(errorMessage)}
                        </Typography>
                    )}

                    {currentLanguage === 'ar' ? (
                        <>

                            <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={rtlTheme}>
                                    <div className="CurrentPasswordInput"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            label={t('Current password')}
                                            variant="outlined"
                                            value={formData.currentPassword}
                                            onChange={handleCurrentPasswordInputChange}
                                            size="small"
                                            type={showPassword ? 'text' : 'password'}
                                            InputLabelProps={{
                                                style: { color: '#FFFFFF' },

                                                sx: {

                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                }

                                            }}
                                            InputProps={{
                                                style: { color: '#FFFFFF' },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {statusIcons.currentPassword === null ? (
                                                            <></>
                                                        ) : statusIcons.currentPassword ? (
                                                            <CheckCircleIcon style={{ color: '#2df873' }} />
                                                        ) : (
                                                            <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                        )}
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                            style={{ color: '#FFFFFF' }}
                                                        >
                                                            {showPassword ? <VisibilityIcon sx={{ fontSize: '22px' }} /> :
                                                                <VisibilityOffIcon sx={{ fontSize: '22px' }} />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: errors.currentPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: errors.currentPasswordError ? '2px' : '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: errors.currentPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: errors.currentPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    width: '100%',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#FFFFFF',
                                                    fontSize: '15px',
                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                        padding: '0 4px',
                                                    }
                                                },
                                            }}
                                            className={errors.currentPasswordError ? 'shake' : ''}
                                        />
                                    </div>
                                </ThemeProvider>
                            </CacheProvider>

                            <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={rtlTheme}>
                                    <div className="NewPassword"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            label={t('New password')}
                                            variant="outlined"
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={formData.newPassword}
                                            onChange={handleNewPasswordInputChange}
                                            size="small"
                                            InputLabelProps={{
                                                style: { color: '#FFFFFF' },
                                                sx: {
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                }
                                            }}
                                            InputProps={{
                                                style: { color: '#FFFFFF' },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {statusIcons.newPassword === null ? (
                                                            <></>
                                                        ) : statusIcons.newPassword ? (
                                                            <CheckCircleIcon style={{ color: '#2df873' }} />
                                                        ) : (
                                                            <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                        )}
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showNewPassword)}
                                                            edge="end"
                                                            style={{ color: '#FFFFFF' }}
                                                        >
                                                            {showNewPassword ? <VisibilityIcon sx={{ fontSize: '22px' }} /> :
                                                                <VisibilityOffIcon sx={{ fontSize: '22px' }} />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: errors.newPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: errors.newPasswordError ? '2px' : '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: errors.newPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: errors.newPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    width: '100%',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#FFFFFF',
                                                    fontSize: '15px',
                                                    // Add this for better label positioning
                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                        padding: '0 4px',
                                                    }
                                                },
                                            }}
                                            className={errors.newPasswordError ? 'shake' : ''}
                                        />
                                    </div>
                                </ThemeProvider>
                            </CacheProvider>
                            <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={rtlTheme}>
                                    <div className="ConfirmNewPassword"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            label={t('Confirm new password')}
                                            variant="outlined"
                                            value={formData.confirmNewPassword}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            onChange={handleConfirmNewPasswordInputChange}
                                            size="small"
                                            InputLabelProps={{
                                                style: { color: '#FFFFFF' },
                                                sx: {
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                }
                                            }}
                                            InputProps={{
                                                style: { color: '#FFFFFF' },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {statusIcons.confirmNewPassword === null ? (
                                                            <></>
                                                        ) : statusIcons.confirmNewPassword ? (
                                                            <CheckCircleIcon style={{ color: '#2df873' }} />
                                                        ) : (
                                                            <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                        )}
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showConfirmPassword)}
                                                            edge="end"
                                                            style={{ color: '#FFFFFF' }}
                                                        >
                                                            {showConfirmPassword ? <VisibilityIcon sx={{ fontSize: '22px' }} /> :
                                                                <VisibilityOffIcon sx={{ fontSize: '22px' }} />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: errors.confirmNewPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: errors.confirmNewPasswordError ? '2px' : '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: errors.confirmNewPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: errors.confirmNewPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    width: '100%',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#FFFFFF',
                                                    // Add this for better label positioning
                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                        padding: '0 4px',
                                                    }
                                                },
                                            }}
                                            className={errors.confirmNewPasswordError ? 'shake' : ''}
                                        />
                                    </div>
                                </ThemeProvider>
                            </CacheProvider>
                        </>

                    ) : (
                        <>


                            <div className="CurrentPasswordInput"

                                style={{
                                    width: '100%',
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label={t('Current password')}
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.currentPassword}
                                    onChange={handleCurrentPasswordInputChange}
                                    size="small"
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                        sx: {
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        },
                                    }}
                                    InputProps={{
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {statusIcons.currentPassword === null ? (
                                                    <></>
                                                ) : statusIcons.currentPassword ? (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                ) : (
                                                    <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                )}
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    style={{ color: '#FFFFFF' }}
                                                >
                                                    {showPassword ? <VisibilityIcon sx={{ fontSize: '22px' }} /> :
                                                        <VisibilityOffIcon sx={{ fontSize: '22px' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.currentPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: errors.currentPasswordError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.currentPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.currentPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            width: '100%',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#FFFFFF',
                                        },
                                    }}
                                    className={errors.currentPasswordError ? 'shake' : ''}
                                />
                            </div>



                            {/* New Password */}
                            <div className="NewPassword" style={{ width: '100%' }}>
                                <TextField
                                    id="new-password"
                                    label="New password"
                                    variant="outlined"
                                    value={formData.newPassword}
                                    onChange={handleNewPasswordInputChange}
                                    size="small"
                                    type={showNewPassword ? 'text' : 'password'}
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                    }}
                                    InputProps={{
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {statusIcons.newPassword === null ? (
                                                    <></>
                                                ) : statusIcons.newPassword ? (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                ) : (
                                                    <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                )}
                                                <IconButton
                                                    onClick={() => setShowPassword(!showNewPassword)}
                                                    edge="end"
                                                    style={{ color: '#FFFFFF' }}
                                                >
                                                    {showNewPassword ? <VisibilityIcon sx={{ fontSize: '22px' }} /> :
                                                        <VisibilityOffIcon sx={{ fontSize: '22px' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.newPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: errors.newPasswordError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.newPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.newPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            width: '100%',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#FFFFFF',
                                        },
                                    }}
                                    className={errors.newPasswordError ? 'shake' : ''}
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div className="ConfirmNewPassword" style={{ width: '100%' }}>
                                <TextField
                                    id="confirm-new-password"
                                    label="Confirm new password"
                                    variant="outlined"
                                    value={formData.confirmNewPassword}
                                    onChange={handleConfirmNewPasswordInputChange}
                                    size="small"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                    }}
                                    InputProps={{
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {statusIcons.confirmNewPassword === null ? (
                                                    <></>
                                                ) : statusIcons.confirmNewPassword ? (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                ) : (
                                                    <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                )}
                                                <IconButton
                                                    onClick={() => setShowPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    style={{ color: '#FFFFFF' }}
                                                >
                                                    {showConfirmPassword ? <VisibilityIcon sx={{ fontSize: '22px' }} /> :
                                                        <VisibilityOffIcon sx={{ fontSize: '22px' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.confirmNewPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: errors.confirmNewPasswordError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.confirmNewPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.confirmNewPasswordError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            width: '100%',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#FFFFFF',
                                        },
                                    }}
                                    className={errors.confirmNewPasswordError ? 'shake' : ''}
                                />
                            </div>


                        </>
                    )}
                    <div className="ChangeTypo"
                        style={{
                            marginTop: '3px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '17px',
                                fontWeight: 'bold',
                            }}
                        >
                            {t('Password requirements :')}


                        </Typography>
                    </div>
                    <div className="StrongPasswordTypo"
                        style={{
                            marginTop: '-15px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                                color: 'white',
                                opacity: '0.8',
                            }}
                        >
                            {t('Please follow this guide for a strong password:')}




                        </Typography>
                    </div>
                    <div className="Conditions"

                        style={{
                            marginTop: '-15px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            direction: currentLanguage === 'ar' ? 'rtl' : 'ltr', // Set text direction
                        }}
                    >
                        {[
                            t('One special character (! @ # $ % .....)'),
                            t('Min 8 characters'),
                            t('One number (2 are recommended)'),
                            t('Change it often (optionally)')
                        ].map((text, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: currentLanguage === 'ar' ? '14px' : '15px',
                                    color: 'white',
                                    opacity: '0.8',
                                    display: 'flex',
                                    alignItems: 'center', // Ensures alignment of bullet and text
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        marginRight: currentLanguage === 'ar' ? '0' : '8px',
                                        marginLeft: currentLanguage === 'ar' ? '8px' : '0' // Adjust margin based on language
                                    }}
                                >
                                    •
                                </span>
                                {text}
                            </Typography>
                        ))}
                    </div>

                    <div className="UpdatePasswordButton  slide-from-left"
                        style={{
                            width: '100%',
                            marginBottom: '-10px',
                        }}
                    >
                        <Button onClick={handlePasswordUpdate}

                            variant="outlined"
                            className="btn-grad"
                            sx={{
                                width: '100.5%',
                                position: 'relative',
                                cursor: 'pointer',
                                height: '38px',
                                opacity: isLoading ? '0.5' : 'unset',
                                color: 'white',
                                borderColor: 'none',
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
                                    {t('Update Password')}
                                </Typography>
                            )}

                        </Button>

                    </div>
                </>
            )}
        </div>

    )
}

export default ProfileChangePassword