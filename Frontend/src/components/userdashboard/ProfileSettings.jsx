import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Fade, Box, Input, InputAdornment } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleButton from '@mui/material/ToggleButton';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { Player } from '@lottiefiles/react-lottie-player';
import Verifey from '../../assets/images/small-logos/Verifey.json';
import EmailCode from '../../assets/images/small-logos/EmailCode.json';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import ProfileSucces from '../../assets/images/small-logos/ProfileSucces.json'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useUser } from '../../Context/UserContext.jsx';
import { useFont } from '../../Context/FontContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CountrySelect from '../Projectsfetch/MenuList/CountrySelect.jsx'
import DangerousIcon from '@mui/icons-material/Dangerous';
import DOMPurify from 'dompurify';
import ProfileChangePassword from './ProfileChangePassword.jsx';

function ProfileSettings({ setProfileSettings, setProfile, handleOpenVerify }) {

    const [selectedButton, setSelectedButton] = useState('');
    const [selectedOption, setSelectedOption] = useState('Settings'); // Track selected option
    const { user } = useUser();

    // Hook to access the current location
    const location = useLocation();

    // Effect to update the selected button based on the current route
    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;

        // Get the previously selected button from local storage
        const storedSelectedButton = localStorage.getItem('selectedButton');

        // If there is a previously selected button in local storage and the current route matches, set the selected button
        if (storedSelectedButton && pathname === `/${storedSelectedButton}`) {
            setSelectedButton(storedSelectedButton);
        } else {
            // Set the selected button based on the pathname
            if (pathname === '/Profile') {
                setSelectedButton('Profile');
            } else {
                // Handle other routes if needed
            }
        }
    }, [location]);

    // Effect to save the selected button to local storage
    useEffect(() => {
        localStorage.setItem('selectedButton', selectedButton);
    }, [selectedButton]);

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
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const handleOptionClick = (optionName) => {
        if (optionName !== selectedOption) {
            setRotate(true); // Start rotation animation

            // Set a timeout for navigating after the rotation
            setTimeout(() => {
                setSelectedOption(optionName); // Update selected option
                setRotate(false); // Stop the rotation

                // Navigate based on the option selected
                if (optionName === 'Messages') {
                    navigate('/userdashboard/profile/messages');
                } else if (optionName === 'App') {
                    navigate('/userdashboard/profile/app'); // Example for App navigation
                } else if (optionName === 'Settings') {
                    navigate('/userdashboard/profile/settings'); // Example for Settings navigation
                }
            }, 500); // Duration matching the rotation animation
        }
    };

    const handleProfileSettings = () => {
        setProfile(false)
        setProfileSettings(true)
    }

    const handleProfileApp = () => {
        setProfileSettings(false)
        setProfile(true)
    }

    const [activeTab, setActiveTab] = useState('account'); // Default active tab
    const [hoveredTab, setHoveredTab] = useState(null); // State for hover effect
    const [verify1, setVerify1] = useState(true);
    const [verify2, setVerify2] = useState(false);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Triggers the hidden input
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
            setImageName(file.name);
            setImageSize((file.size / (1024 * 1024)).toFixed(2));
            uploadImage(file); // Upload the image to Cloudinary
        }
    };
    const handleFileSelect = async (event) => {
        const file = event.target.files[0] || event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file)); // Set image preview
            setImageName(file.name); // Set the image name
            setImageSize((file.size / (1024 * 1024)).toFixed(2)); // Set the image size in MB

            // Upload the image to Cloudinary
            await uploadImage(file);
        }
    };




    // State for First Name Input
    const [firstName, setFirstName] = useState('');
    const [openFirstName, setOpenFirstName] = useState(false);
    const [anchorElFirstName, setAnchorElFirstName] = useState(null);

    // State for Last Name Input
    const [lastName, setLastName] = useState('');
    const [openLastName, setOpenLastName] = useState(false);
    const [anchorElLastName, setAnchorElLastName] = useState(null);

    // State for Gender Input
    const [gender, setGender] = useState('');
    const [openGender, setOpenGender] = useState(false);
    const [anchorElGender, setAnchorElGender] = useState(null);

    // State for Email Input

    const [openBirthMonth, setOpenBirthMonth] = useState(false);
    const [anchorElBirthMonth, setAnchorElBirthMonth] = useState(null);
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [anchorElBirthDay, setAnchorElBirthDay] = useState(null);
    const [openBirthDay, setOpenBirthDay] = useState(false);
    const [birthYear, setBirthYear] = useState('');
    const [openBirthYear, setOpenBirthYear] = useState(false);
    const [anchorElBirthYear, setAnchorElBirthYear] = useState(null);
    const [showAccountInfo, setShowAccountInfo] = useState(true);
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [emailVerifedSucces, setEmailVerifedSucces] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessMessage2, setShowSuccessMessage2] = useState(false);
    const [showSuccessMessage3, setShowSuccessMessage3] = useState(false);
    const [step, setStep] = useState(1);



    // Handle open/close for Birth Month Menu
    const handleClickBirthMonth = (event) => {
        setAnchorElBirthMonth(event.currentTarget);
        setOpenBirthMonth(true);
    };

    // Handle close and capture Birth Month selected value
    const handleCloseBirthMonth = (value) => {
        setBirthMonth(value);

        // Update the formData when birth month is selected
        setFormData((prev) => ({
            ...prev,
            birthMonth: value,
        }));

        // Close the menu and reset anchor element
        setOpenBirthMonth(false);
        setAnchorElBirthMonth(null);

        // Update error state for Birth Month
        setErrors((prev) => ({
            ...prev,
            birthMonthError: !value, // Show error if no value is selected
        }));

        // If month is selected, clear the error message
        if (value) {
            setErrorMessage('');
        } else {
            setErrorMessage('All fields are required.');
        }
    };


    // Handle open/close for Birth Day Menu
    const handleClickBirthDay = (event) => {
        setAnchorElBirthDay(event.currentTarget);
        setOpenBirthDay(true);
    };

    const handleCloseBirthDay = (value) => {
        setBirthDay(value);
        setOpenBirthDay(false);
        setAnchorElBirthDay(null);

        // Update formData with the selected birthDay and log the updated formData
        setFormData((prev) => {
            const updatedFormData = { ...prev, birthDay: value };
            return updatedFormData;
        });

        // Clear error if birthDay is selected, otherwise set error
        setErrors((prev) => ({
            ...prev,
            birthDayError: !value, // Clear error if a value is selected
        }));
        // If month is selected, clear the error message
        if (value) {
            setErrorMessage('');
        } else {
            setErrorMessage('All fields are required.');
        }
    };






    // Handle open/close for Birth Year Menu
    const handleClickBirthYear = (event) => {
        setAnchorElBirthYear(event.currentTarget);
        setOpenBirthYear(true);
    };

    const handleCloseBirthYear = (value) => {
        setBirthYear(value);
        setOpenBirthYear(false);
        setAnchorElBirthYear(null);

        // Update formData with the selected birthYear and log the updated formData
        setFormData((prev) => {
            const updatedFormData = { ...prev, birthYear: value };
            return updatedFormData;
        });

        // Clear error if birthYear is selected, otherwise set error
        setErrors((prev) => ({
            ...prev,
            birthYearError: !value, // Clear error if a value is selected
        }));
        // If Year is selected, clear the error message
        if (value) {
            setErrorMessage('');
        } else {
            setErrorMessage('All fields are required.');
        }
    };





    const [countryError, setCountryError] = useState(true);
    const [isError, setIsError] = useState(true);

    const [selectedCountryCode, setSelectedCountryCode] = useState('+213'); // Default to Algeria
    const [phoneNumber, setPhoneNumber] = useState('');

    // Format phone number (Add dashes after every two digits)
    const formatPhoneNumber = (value) => {
        let phone = value.replace(/\D/g, ''); // Remove non-digits
        if (phone.length > 10) phone = phone.slice(0, 10); // Limit to 10 digits

        // Add dashes after every 2 digits
        return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
    };

    // Handle input change for phone number
    const handleInputChange = (event) => {
        const value = event.target.value;
        const formattedPhone = formatPhoneNumber(value);

        setPhoneNumber(formattedPhone); // Update the formatted phone number in local state

        const digitsOnly = formattedPhone.replace(/\D/g, ''); // Remove non-digit characters for validation

        // Update the formData with the new phone number
        setFormData((prev) => ({
            ...prev,
            phoneNumber: formattedPhone,
        }));

        // Check if the phone number is correctly formatted (10 digits)
        if (digitsOnly.length === 10) {
            setIsError(false); // Clear error
            setErrorMessage(''); // Clear error message
        } else {
            setIsError(true); // Invalid phone number
            setErrorMessage('Phone Format: xx-xx-xx-xx-xx'); // Error message
        }
    };

    // Handle country change (update phone number with new country code)
    const handleCountryChange = (newCountryCode) => {
        setSelectedCountryCode(newCountryCode); // Update the selected country code in local state

        setIsError(false); // Clear error state when country code changes

        // Update the formData with the new country code and reset phone number
        setFormData((prev) => ({
            ...prev,
            countryCode: newCountryCode,

        }));
    };


    const [country, setCountry] = useState('');
    const [openCountry, setOpenCountry] = useState(false);
    const [anchorElCountry, setAnchorElCountry] = useState(null);
    const inputRefs = useRef([]);
    const [emailVerifyCode, setEmailVerifyCode] = useState(Array(4).fill('')); // Changed state name to emailVerifyCode






    const countries = [
        // Arab countries
        'Algeria', 'Bahrain', 'Comoros', 'Djibouti', 'Egypt', 'Iraq', 'Jordan', 'Kuwait', 'Lebanon',
        'Libya', 'Mauritania', 'Morocco', 'Oman', 'Palestine', 'Qatar', 'Saudi Arabia', 'Somalia',
        'Sudan', 'Syria', 'Tunisia', 'United Arab Emirates', 'Yemen',
        'United States', 'Canada', 'United Kingdom', 'Australia', 'France', 'Germany', 'India', 'China',
        'Japan', 'Brazil', 'South Africa', 'Mexico', 'Italy', 'Russia', 'Turkey', 'Netherlands', 'Sweden',
        'Switzerland', 'Norway', 'Denmark', 'Belgium', 'Ireland', 'Israel', 'Singapore', 'Malaysia',
        'Indonesia', 'Philippines', 'Thailand', 'Vietnam', 'Egypt', 'Pakistan', 'Bangladesh', 'Greece',
        'Portugal', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Ukraine', 'Chile',
        'Colombia', 'Peru', 'Venezuela', 'Ecuador',


    ];


    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        confirmEmail: user?.email || '',
        phoneNumber: user?.phoneNumber || '',  // Default to an empty string or user.phoneNumber if available
        countryCode: '+213',
        country: '',
        birthMonth: user?.birthMonth || '',  // Example if you have birthMonth field
        birthDay: user?.birthDay || '',      // Example for birthDay field
        birthYear: user?.birthYear || '',    // Example for birthYear field
        // Add other form fields as necessary...
    });

    // Set default country code on component mount
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            countryCode: selectedCountryCode, // Initialize with default country code
        }));
    }, []);

    const [statusIcons, setStatusIcons] = useState({
        firstName: !!user?.firstName,
        lastName: !!user?.lastName,
    });

    const [errors, setErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        birthMonthError: false,
        birthDayError: false,
        birthYearError: false,
        emailError: false,
        confirmEmailError: false,
        countryError: false, // New field for country selection error
        phoneNumberError: false, // New field for phone number input error
    });


    const [errorMessage, setErrorMessage] = useState('');

    // Input change handlers
    const handleFirstNameInputChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, firstName: value }));

        // Immediately update icon and border styles when typing or clearing the input
        if (value.trim().length === 0) {
            setStatusIcons((prev) => ({ ...prev, firstName: false })); // Icon off
            setErrors((prev) => ({ ...prev, firstNameError: true }));  // Mark error
        } else if (value.trim().length >= 3) {
            setStatusIcons((prev) => ({ ...prev, firstName: true }));  // Icon on
            setErrors((prev) => ({ ...prev, firstNameError: false })); // No error
        } else {
            setStatusIcons((prev) => ({ ...prev, firstName: false })); // Icon off
            setErrors((prev) => ({ ...prev, firstNameError: true }));  // Mark error
        }

        // Clear error message when the user starts typing again
        if (errorMessage) {
            setErrorMessage(''); // Clear the error message when typing starts again
        }
    };


    const handleLastNameInputChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, lastName: value }));

        // Immediately update icon and border styles when typing or clearing the input
        if (value.trim().length === 0) {
            setStatusIcons((prev) => ({ ...prev, lastName: false })); // Icon off
            setErrors((prev) => ({ ...prev, lastNameError: true }));  // Mark error
        } else if (value.trim().length >= 3) {
            setStatusIcons((prev) => ({ ...prev, lastName: true }));  // Icon on
            setErrors((prev) => ({ ...prev, lastNameError: false })); // No error
        } else {
            setStatusIcons((prev) => ({ ...prev, lastName: false })); // Icon off
            setErrors((prev) => ({ ...prev, lastNameError: true }));  // Mark error
        }

        // Clear error message when the user starts typing again
        if (errorMessage) {
            setErrorMessage(''); // Clear the error message when typing starts again
        }
    };


    // Handle open/close for Gender Menu
    const handleClickGender = (event) => {
        setAnchorElGender(event.currentTarget);
        setOpenGender(true);
    };

    const handleCloseGender = (value) => {
        // Update gender state
        setGender(value);

        // Update the formData with the selected gender
        setFormData((prev) => ({
            ...prev,
            gender: value,
        }));

        // Close the menu and clear anchor element
        setOpenGender(false);
        setAnchorElGender(null);

        // Set or clear the error based on gender selection
        setErrors((prev) => ({
            ...prev,
            genderError: !value, // If no gender is selected, show error
        }));

        // Clear error message if gender is selected
        if (value) {
            setErrorMessage('');
        } else {
            setErrorMessage('All fields are required.');
        }
    };



    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setFormData((prev) => ({
            ...prev,
            email: newEmail,
        }));

        // Clear error messages when typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            emailError: false,
            confirmEmailError: false,
        }));
        setErrorMessage('');

        // Email format validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (newEmail && !emailPattern.test(newEmail)) {
            setErrorMessage('Please enter a valid email.');
            setErrors((prevErrors) => ({ ...prevErrors, emailError: true }));
        }
    };

    const handleConfirmEmailChange = (e) => {
        const confirmEmailValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            confirmEmail: confirmEmailValue,
        }));

        // Clear error message while typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmEmailError: false,
        }));
        setErrorMessage('');
    };





    const handleClickCountry = (event) => {
        setAnchorElCountry(event.currentTarget); // Set the anchor element for the dropdown
        setOpenCountry(!openCountry); // Toggle dropdown visibility
    };

    // Close country dropdown
    const handleCloseCountry = (selectedCountry) => {
        if (selectedCountry) {
            setCountry(selectedCountry);
            setFormData((prevFormData) => {
                const updatedFormData = { ...prevFormData, country: selectedCountry };
                return updatedFormData;
            });
            setCountryError(false); // Set border to white (no error)
        } else {
            setCountry(''); // Clear country
            setFormData((prevFormData) => {
                const updatedFormData = { ...prevFormData, country: '' };
                return updatedFormData;
            });
            setCountryError(true); // Set border to red (error)
        }
        setOpenCountry(false);
        setAnchorElCountry(null);
        // Clear error message when typing
        if (selectedCountry) {
            setErrorMessage('');
        } else {
            setErrorMessage('All fields are required.');
        }
    };
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





    const handleProfileUpdate = async () => {
        let isValid = true;
        let newErrors = { ...errors };

        // Retrieve userId from user context

        const userId = user ? user._id : null;

        if (!userId) {
            setErrorMessage("User ID is missing. Please try again.");
            return;
        }

        // Validation checks for first name
        if (!formData.firstName) {
            setErrorMessage('All fields are required.');
            newErrors.firstNameError = true;
            isValid = false;
        }

        if (formData.firstName && !/^[A-Za-z\s]+$/.test(formData.firstName)) {
            setErrorMessage('First name can only contain letters and spaces.');
            newErrors.firstNameError = true;
            isValid = false;
        } else if (formData.firstName) {
            newErrors.firstNameError = false;
        }

        // Validation checks for last name
        if (!formData.lastName) {
            setErrorMessage('All fields are required.');
            newErrors.lastNameError = true;
            isValid = false;
        }

        if (formData.lastName && !/^[A-Za-z\s]+$/.test(formData.lastName)) {
            setErrorMessage('Last name can only contain letters and spaces.');
            newErrors.lastNameError = true;
            isValid = false;
        } else if (formData.lastName) {
            newErrors.lastNameError = false;
        }

        // Validation checks for other fields
        if (!gender) {
            setErrorMessage('All fields are required.');
            newErrors.genderError = true;
            isValid = false;
        } else {
            newErrors.genderError = false;
        }

        if (!birthMonth) {
            setErrorMessage('All fields are required.');
            newErrors.birthMonthError = true;
            isValid = false;
        } else {
            newErrors.birthMonthError = false;
        }

        if (!formData.birthDay) {
            setErrorMessage('All fields are required.');
            newErrors.birthDayError = true;
            isValid = false;
        } else {
            newErrors.birthDayError = false;
        }

        if (!formData.email || !formData.confirmEmail) {
            setErrorMessage('Both email and confirmation email must be filled.');
            newErrors.emailError = true;
            newErrors.confirmEmailError = true;
            isValid = false;
        } else if (formData.email !== formData.confirmEmail) {
            setErrorMessage('Emails do not match.');
            newErrors.confirmEmailError = true;
            isValid = false;
        } else {
            newErrors.emailError = false;
            newErrors.confirmEmailError = false;
        }

        if (!formData.country) {
            setErrorMessage('All fields are required.');
            newErrors.countryError = true;
            isValid = false;
        } else {
            newErrors.countryError = false;
        }

        const phoneWithoutCode = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
        if (!phoneWithoutCode) {
            setErrorMessage('All fields are required.');
            newErrors.phoneError = true;
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        // Send email verification code request to backend
        try {
            setIsLoading(true);

            const email = formData.email;
            const firstName = formData.firstName;

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/send-email-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, email, firstName }),
            });

            const result = await response.json();

            if (response.ok) {
                setIsLoading(false);
                setActiveSection('verifyEmail'); // Set to a new section name to deactivate 'basicInfo'
                console.log('Email Sent');
            } else {
                setIsLoading(false);
                setErrorMessage(result.message || "Failed to send verification code.");
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error during email verification request:', error);
            setErrorMessage('Failed to send verification code. Please try again later.');
        }

        // Proceed with successful validation if needed...
        try {
            console.log('Updating profile with data:', formData);
            // Placeholder for actual API call to update profile
        } catch (error) {
            console.error('Profile update failed:', error);
            setErrorMessage('Failed to update profile. Please try again later.');
        }
    };

    // Timer and state initialization
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [timerActive, setTimerActive] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0); // Track number of wrong attempts
    const [codeSentBack, setCodeSentBack] = useState('');

    const [activeSection, setActiveSection] = useState('accountInfo'); // Default section
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

                // Simulate a 2-second delay before stopping the loading spinner and moving to the next step
                setTimeout(() => {
                    setIsLoading(false); // Stop loading
                    setActiveSection('EmailVerificationSucces'); // Move to the new password section

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

    // Format the time remaining as MM:SS only if attempts are within limit
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedTime = wrongAttempts < 3 ? `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : '';

    const [successMessage, setSuccessMessage] = useState("");

    const handleResendCode = async () => {
        setIsLoading(true);
        const userId = user ? user._id : null;
        const email = formData.email;       // Get email from formData
        const firstName = formData.firstName; // Get first name from formData

        if (!userId || !email || !firstName) {
            setErrorMessage("Required information is missing. Please try again.");
            return;
        }

        try {
            // Make an API call to resend the verification code with email and firstName
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/server/auth/send-email-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, email, firstName }),
            });

            if (response.ok) {
                setErrorMessage("");          // Clear any previous error messages
                setSuccessMessage("We have sent you a new code"); // Set success message
                setTimeRemaining(120);        // Reset countdown to 2 minutes
                setWrongAttempts(0);          // Reset wrong attempts
                setTimerActive(true);
                setIsLoading(false);
            } else {
                const result = await response.json();
                setErrorMessage(result.message || 'Failed to resend code. Please try again.');
                setSuccessMessage("");              // Clear any success message
            }
        } catch (error) {
            console.error('Error resending the code:', error);
            setErrorMessage('An error occurred while resending the code.');
            setSuccessMessage("");              // Clear any success message
        }
    };


    const handleBackToProfileUpdate = () => {
        setVerifyEmail(false);
        setShowProfileInfo(true);
    }


    const handleSwitchUpdateProfile = () => {
        setActiveTab('Basic info');
        setShowAccountInfo(false);
        setShowProfileInfo(true);

    }

    const handlePasswordChange = () => {
        setShowAccountInfo(false);
        setShowProfileInfo(false)
        setChangePassword(true);
    }



    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage(true), 400); // Adjust timing if needed
        }
    }, [isAnimationComplete]);
    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage2(true), 400); // Adjust timing if needed
        }
    }, [isAnimationComplete]);

    useEffect(() => {
        // Once the Lottie animation is complete, wait for a short delay and then show the success message
        if (isAnimationComplete) {
            setTimeout(() => setShowSuccessMessage3(true), 400); // Adjust timing if needed
        }
    }, [isAnimationComplete]);


    const [resetInputSuccess, setResetInputSuccess] = useState({ code: false });




    const handleProfileInfo = () => {
        setActiveSection('profileInfo');
    };

    const handleAccountInfo = () => {
        setActiveSection('accountInfo');
    };

    const handleChangePassword = () => {
        setActiveSection('changePassword');
    };




    return (
        <div className='MainContainer'
            style={{
                width: '96%',
                height: 'auto',

                padding: '10px',

            }}
        >

            <div className="Accountsettings slide-from-left"

                style={{
                    width: isLargeScreen ? '28%' : '25%',
                    height: '400px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '0.75rem',
                    boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',
                    borderRadius: '20px',
                    position: 'relative',
                    padding: '20px',
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
                        fontWeight: 'bold',
                    }}
                >
                    Settings
                </Typography>

                <div>
                    <div className="Account"

                        onClick={() => {
                            setActiveTab('account');
                            setActiveSection('accountInfo'); // Switch to Account Info

                        }}
                        onMouseEnter={() => setHoveredTab('account')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === 'account' || hoveredTab === 'account' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === 'account' || hoveredTab === 'account' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                        }}
                    >
                        <img width={22} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651311/user-skill-gear_rqvso3.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            Account
                        </Typography>
                    </div>
                    <div className="BasicInfo"

                        onClick={() => {
                            setActiveTab('Basic info');
                            setActiveSection('basicInfo'); // Switch to Basic Info section

                        }}




                        onMouseEnter={() => setHoveredTab('Basic info')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === 'Basic info' || hoveredTab === 'Basic info' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === 'Basic info' || hoveredTab === 'Basic info' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                            transition: 'background 0.3s ease, border-right 0.3s ease',
                        }}
                    >
                        <img width={20} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651149/document-signed_gfp4os.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            Bacic info
                        </Typography>
                    </div>
                    <div className="Password"

                        onClick={() => {
                            setActiveTab('Change Password'); // Set active tab to 'Change Password'
                            setActiveSection('changePassword'); // Switch to Change Password section

                        }}

                        onMouseEnter={() => setHoveredTab('Change Password')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === 'Change Password' || hoveredTab === 'Change Password' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === 'Change Password' || hoveredTab === 'Change Password' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                            transition: 'background 0.3s ease, border-right 0.3s ease',
                        }}
                    >
                        <img width={20} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651234/fingerprint_ygqjtu.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            Change Password
                        </Typography>
                    </div>

                    <div className="Two-factor authentication"

                        onClick={() => setActiveTab('2F-Authentication')}
                        onMouseEnter={() => setHoveredTab('2F-Authentication')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === '2F-Authentication' || hoveredTab === '2F-Authentication' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === '2F-Authentication' || hoveredTab === '2F-Authentication' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                            transition: 'background 0.3s ease, border-right 0.3s ease', // Transition for background and border

                        }}
                    >
                        <img width={20} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651969/key-skeleton-left-right_cuuqna.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            2F-Authentication
                        </Typography>
                    </div>
                    <div className="Notifications"

                        onClick={() => setActiveTab('Notifications')} // Set active tab to 'account' on click
                        onMouseEnter={() => setHoveredTab('Notifications')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === 'Notifications' || hoveredTab === 'Notifications' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === 'Notifications' || hoveredTab === 'Notifications' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                            transition: 'background 0.3s ease, border-right 0.3s ease', // Transition for background and border

                        }}
                    >
                        <img width={20} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651646/bell-notification-social-media_hx4qq8.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            Notifications
                        </Typography>
                    </div>
                    <div className="Subscription"

                        onClick={() => setActiveTab('Subscription')} // Set active tab to 'account' on click
                        onMouseEnter={() => setHoveredTab('Subscription')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === 'Subscription' || hoveredTab === 'Subscription' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === 'Subscription' || hoveredTab === 'Subscription' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                            transition: 'background 0.3s ease, border-right 0.3s ease', // Transition for background and border

                        }}
                    >
                        <img width={20} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651759/freemium_xmzhup.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            Subscription
                        </Typography>
                    </div>
                    <div className="Sessions"

                        onClick={() => setActiveTab('Sessions')} // Set active tab to 'account' on click
                        onMouseEnter={() => setHoveredTab('Sessions')} // Set hovered tab
                        onMouseLeave={() => setHoveredTab(null)} // Clear hovered tab
                        style={{
                            width: 'calc(100% + 40px)', // 20px padding on each side
                            height: '40px',
                            marginLeft: '-20px', // Negate left padding
                            marginRight: '-20px', // Negate right padding
                            display: 'flex',
                            gap: '9px',
                            alignItems: 'center',
                            padding: '10px',
                            background: activeTab === 'Sessions' || hoveredTab === 'Sessions' ? 'rgba(0, 116, 255, 0.4)' : 'transparent', // Change background
                            borderRight: activeTab === 'Sessions' || hoveredTab === 'Sessions' ? '3px solid blue' : 'none', // Change border
                            cursor: 'pointer', // Add pointer cursor on hover
                            transition: 'background 0.3s ease, border-right 0.3s ease', // Transition for background and border

                        }}
                    >
                        <img width={20} src="https://res.cloudinary.com/damicjacf/image/upload/v1730651881/duration-alt_b9dgcs.png" alt="" srcset="" />
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            Sessions
                        </Typography>
                    </div>
                </div>



            </div>
            <div className="UserStatus slide-from-right"
                style={{
                    width: isLargeScreen ? '74%' : '72%',
                    height: '100px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '20px',
                    position: 'absolute',

                    top: '2.5%',
                    left: isLargeScreen ? '30%' : '27%',
                }}
            >
                <div className="Container "
                    style={{
                        position: 'absolute',
                        top: '13%'
                    }}
                >
                    <div className='ProfileCircleMobile' style={{
                        position: 'absolute',
                        left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '10px') : (currentLanguage === 'ar' ? 'auto' : '20px'),
                        right: isSmallScreen ? (currentLanguage === 'ar' ? '20px' : 'auto') : (currentLanguage === 'ar' ? '20px' : 'auto'),
                    }}>
                        <div className='ProfileCircle' style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid #ccc',
                        }}>
                            <img src={user.profileImg} alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>

                    {/* Active Badge */}
                    <div className="ActiveBadge" style={{
                        position: 'absolute',
                        top: '52px',
                        left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '56px') : (currentLanguage === 'ar' ? 'auto' : '75px'),
                        right: currentLanguage === 'ar' ? '7.8%' :
                            isSmallScreen
                                ? (currentLanguage === 'ar' ? '70px' : 'auto')
                                : isMediumScreen
                                    ? (currentLanguage === 'ar' ? '55px' : 'auto')
                                    : (currentLanguage === 'ar' ? '40px' : 'auto'),
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'green',
                        border: '2px solid white',
                    }}></div>

                    {/* Profile Name */}
                    <div>

                        <div className="ProfileName" style={{
                            position: 'absolute',
                            top: isSmallScreen && currentLanguage === 'ar' ? '15px' : '14px',
                            left: isSmallScreen ? (currentLanguage === 'ar' ? 'auto' : '100px') : (currentLanguage === 'ar' ? 'auto' : '100px'),
                            right: isSmallScreen ? (currentLanguage === 'ar' ? '100px' : 'auto') : (currentLanguage === 'ar' ? '100px' : 'auto'),
                        }}>
                            <Typography sx={{
                                color: 'white',
                                fontFamily: /[\u0600-\u06FF]/.test(user.firstName + user.lastName) && currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif' // Arabic font for Arabic names
                                    : currentLanguage === 'ar'
                                        ? '"Airbnbcereal", sans-serif' // English font for Arabic mode with Latin names
                                        : '"Airbnbcereal", sans-serif', // Default font for non-Arabic languages
                                fontWeight: 'bold',
                                fontSize: currentLanguage === 'ar' ? '16px' : '16px',
                                lineHeight: currentLanguage === 'ar' ? '29px' : 'unset',
                                whiteSpace: 'nowrap',
                            }}>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography sx={{
                                color: '#ffffffcc',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                letterSpacing: '0.02857em',
                                opacity: '1',
                                fontWeight: '400',
                                fontSize: '14px',
                            }}>
                                {t('CEO / Founder')} {/* Make sure 't' is defined in your component */}
                            </Typography>
                        </div>

                    </div>
                </div>
                <div className="verifeyd"
                    style={{
                        position: 'absolute',
                        right: '5%',
                        top: '32%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',



                    }}
                >
                    <div className="AccountSTS"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white'
                            }}
                        >
                            Account Status :
                        </Typography>
                        <div className="Status"
                            style={{

                            }}
                        >
                            <Button
                                variant="outlined"
                                style={{
                                    backgroundColor: 'rgba(0, 116, 255, 0.2)', // Light blue background with 20% opacity
                                    color: 'rgba(0, 116, 255)', // Use the primary color for the text
                                    borderRadius: '18px',
                                    width: isSmallScreen ? '90%' : '100%',
                                    textTransform: 'capitalize',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    height: '30px',
                                    boxShadow: '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)', // Add box shadow matching the background color


                                }}
                            >
                                {t('Pending')}
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
            {activeSection === 'accountInfo' && (
                <>
                    <div className="RequestVerify slide-from-downToUp"
                        style={{
                            width: isLargeScreen ? '74%' : '72%',
                            height: '320px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            borderRadius: '20px',
                            position: 'absolute',
                            top: '25%',
                            left: isLargeScreen ? '30%' : '27%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        {verify1 && (
                            <>

                                <div className="IdentityTypo"
                                    style={{
                                        width: '75%',


                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontSize: '15px',
                                            fontWeight: 'bold',

                                        }}
                                    >
                                        To keep our freelancing platform safe and secure for everyone, we verify each user's identity. This helps ensure trust and reliability across our community, Make sure your profile information matches your identity ID.
                                    </Typography>
                                </div>
                                <div className="Lotties"
                                    style={{

                                    }}
                                >
                                    <Player
                                        src={Verifey}
                                        autoplay
                                        loop
                                        style={{ width: 120, height: 120 }}
                                    />

                                </div>
                                <div className="SwitchToProfile slide-from-left"
                                    style={{
                                        width: '100%', // Ensure the wrapper spans the parent's width
                                        display: 'flex', // Add flexbox to center content
                                        justifyContent: 'center', // Center the button
                                    }}
                                >
                                    <Button onClick={() => {
                                        setActiveSection('basicInfo'); // Switch to Basic Info section
                                        setActiveTab('Basic info'); // Set active tab to Basic info
                                    }}

                                        variant="outlined"
                                        className='btn-grad'
                                        sx={{
                                            width: '332px',
                                            height: '38px',
                                            backgroundColor: 'transparent',
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
                                                {t('Start By Profile Update')}
                                            </Typography>
                                        )}
                                    </Button>
                                </div>

                            </>
                        )}



                    </div>
                </>
            )}

            {activeSection === 'basicInfo' && (
                <>
                    <div className="ProfileInfo slide-from-right"
                        style={{
                            width: '74%',
                            height: 'auto',
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            borderRadius: '20px',
                            position: 'absolute',
                            top: '25%',
                            padding: '26px',
                            left: isLargeScreen ? '30%' : '27%',
                        }}
                    >
                        <div className="BacisInfo">
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Basic Info :
                                <span
                                    style={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: '15px',
                                        marginLeft: '8px',
                                        opacity: '0.8',
                                    }}
                                >
                                    Please complete your profile – fill in all required fields!
                                </span>
                            </Typography>
                            {errorMessage && (
                                <Typography color="error" sx={{ marginTop: '5px', marginBottom: '-3px' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <div className="FirstName-Lastname"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '16px', // Add consistent spacing between inputs
                                    marginTop: '20px',
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="First name"
                                    variant="outlined"
                                    defaultValue={user?.firstName || ''}
                                    size="small"
                                    onChange={handleFirstNameInputChange}
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                        shrink: !!user?.firstName,
                                    }}
                                    InputProps={{
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {errors.firstNameError ? (
                                                    <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                ) : (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        flex: 1, // Makes it take equal space with the other input
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.firstNameError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: errors.firstNameError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.firstNameError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.firstNameError ? '#ff4d4d' : '#FFFFFF',
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
                                    className={errors.firstNameError ? 'shake' : ''}
                                />
                                <TextField
                                    label="Last name"
                                    variant="outlined"
                                    value={formData.lastName}
                                    onChange={handleLastNameInputChange}
                                    size="small"
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                        shrink: !!formData.lastName,
                                    }}
                                    InputProps={{
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {errors.lastNameError ? (
                                                    <DangerousIcon style={{ color: '#ff4d4d' }} />
                                                ) : (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        flex: 1, // Makes it take equal space with the other input
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.lastNameError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: errors.lastNameError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.lastNameError ? '#ff4d4d' : '#FFFFFF',
                                                borderWidth: '2px',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.lastNameError ? '#ff4d4d' : '#FFFFFF',
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
                                    className={errors.lastNameError ? 'shake' : ''}
                                />
                            </div>


                            <div className="Gender-Birth"

                                style={{
                                    width: '90%',
                                    display: 'flex',
                                    gap: '16px',
                                    marginTop: '20px',
                                    justifyContent: 'space-between', // Space between inputs
                                }}
                            >
                                {/* Gender Input with Menu */}
                                <TextField
                                    variant="outlined"
                                    label="Your Gender"
                                    value={gender}
                                    onClick={handleClickGender}
                                    size="small"
                                    className={errors.genderError ? 'shake' : ''}  // Apply shake class based on error
                                    sx={{
                                        width: '23%', // 23% width for each input
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            color: 'white',
                                            backgroundColor: 'transparent', // Transparent background
                                            '& fieldset': {
                                                borderColor: gender ? '#fff' : 'red', // Red border when no gender is selected, white when selected
                                                borderWidth: '2px', // Set border width to 2px
                                                borderStyle: 'solid', // Solid border style
                                            },
                                            '&:hover fieldset': {
                                                borderColor: gender ? '#fff' : 'red', // Keep red border on hover if gender not selected
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: gender ? '#fff' : 'red', // Keep red border when focused if gender not selected
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#fff',
                                        },
                                        '& .MuiInputAdornment-root': {
                                            color: '#fff', // White arrow icon color
                                        },
                                        '& .MuiInputLabel-shrink': {
                                            color: '#fff', // Keep label white when it is shrunk (up)
                                        },
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickGender} edge="end">
                                                    {openGender ? (
                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                    ) : (
                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Menu
                                    anchorEl={anchorElGender}
                                    open={openGender}
                                    onClose={() => handleCloseGender('')}
                                    PaperProps={{
                                        style: {
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            width: '12%',
                                            color: 'white',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <MenuItem onClick={() => handleCloseGender('Male')} style={{ color: '#fff' }}>
                                        Male
                                    </MenuItem>
                                    <MenuItem onClick={() => handleCloseGender('Female')} style={{ color: '#fff' }}>
                                        Female
                                    </MenuItem>
                                </Menu>


                                {/* Birth Month Input with Menu */}
                                <TextField
                                    variant="outlined"
                                    label="Birth Month"
                                    value={birthMonth}
                                    onClick={handleClickBirthMonth}
                                    size="small"
                                    className={errors.birthMonthError ? 'shake' : ''}  // Apply shake class based on error state
                                    sx={{
                                        width: '23%', // Adjust to your desired width
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            '& fieldset': {
                                                borderColor: birthMonth ? '#fff' : 'red', // Red border if no month selected, white when selected
                                                borderWidth: '2px',
                                                borderStyle: 'solid',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: birthMonth ? '#fff' : 'red',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: birthMonth ? '#fff' : 'red',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#fff',
                                        },
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickBirthMonth} edge="end">
                                                    {openBirthMonth ? (
                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                    ) : (
                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Menu
                                    anchorEl={anchorElBirthMonth}
                                    open={openBirthMonth}
                                    onClose={() => handleCloseBirthMonth('')}
                                    PaperProps={{
                                        style: {
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            width: '10%',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                            height: '190px',
                                        },
                                    }}
                                >
                                    {/* Menu items for months */}
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                        <MenuItem
                                            key={month}
                                            onClick={() => handleCloseBirthMonth(month)}
                                            style={{ color: '#fff' }}
                                        >
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Menu>


                                {/* Borth Day Input with Menu */}
                                <TextField
                                    variant="outlined"
                                    label="Birth Day"
                                    value={birthDay}
                                    onClick={handleClickBirthDay}
                                    size="small"
                                    sx={{
                                        width: '23%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            animation: errors.birthDayError ? 'shake 0.3s ease-in-out' : 'none',
                                            '& fieldset': {
                                                borderColor: birthDay ? '#fff' : 'red',
                                                borderWidth: '2px',
                                                borderStyle: 'solid',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: birthDay ? '#fff' : 'red',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: birthDay ? '#fff' : 'red',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#fff',
                                        },
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickBirthDay} edge="end">
                                                    {openBirthDay ? (
                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                    ) : (
                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Menu
                                    anchorEl={anchorElBirthDay}
                                    open={openBirthDay}
                                    onClose={() => handleCloseBirthDay('')}
                                    PaperProps={{
                                        style: {
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            width: '12%',
                                            borderRadius: '8px',
                                            height: '100px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    {Array.from({ length: 31 }, (_, index) => (
                                        <MenuItem
                                            key={index + 1}
                                            onClick={() => handleCloseBirthDay((index + 1).toString())}
                                            style={{ color: '#fff' }}
                                        >
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </Menu>



                                {/* Birth Year Input with Menu */}
                                <TextField
                                    variant="outlined"
                                    label="Birth Year"
                                    value={birthYear}
                                    onClick={handleClickBirthYear}
                                    size="small"
                                    sx={{
                                        width: '23%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            animation: errors.birthYearError ? 'shake 0.3s ease-in-out' : 'none',
                                            '& fieldset': {
                                                borderColor: birthYear ? '#fff' : 'red', // Red border when no birth year is selected, white when selected
                                                borderWidth: '2px',
                                                borderStyle: 'solid',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: birthYear ? '#fff' : 'red',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: birthYear ? '#fff' : 'red',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#fff',
                                        },
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickBirthYear} edge="end">
                                                    {openBirthYear ? (
                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                    ) : (
                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Menu
                                    anchorEl={anchorElBirthYear}
                                    open={openBirthYear}
                                    onClose={() => handleCloseBirthYear('')}
                                    PaperProps={{
                                        style: {
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            width: '12%',
                                            height: '100px',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    {/* Year options */}
                                    {Array.from({ length: 2024 - 1960 + 1 }, (_, index) => {
                                        const year = 2024 - index; // Generate years starting from 2024 going down
                                        return (
                                            <MenuItem
                                                key={year}
                                                onClick={() => handleCloseBirthYear(year.toString())}
                                                style={{ color: '#fff' }}
                                            >
                                                {year}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>


                            </div>
                            <div className="Email-Confirm"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '20px',
                                    gap: '20px', // Adds spacing between inputs
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    value={formData.email}
                                    error={errors.emailError}
                                    onChange={handleEmailChange}
                                    className={errors.emailError ? 'shake' : ''}
                                    size="small"
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                        shrink: !!formData.email,
                                    }}
                                    InputProps={{
                                        className: errors.emailError ? 'shake' : '',
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {errors.emailError ? (
                                                    <DangerousIcon style={{ color: 'red' }} />
                                                ) : (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        flex: 1, // Makes this input take equal width
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.emailError ? 'red' : '#FFFFFF',
                                                borderWidth: errors.emailError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.emailError ? 'red' : '#FFFFFF',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.emailError ? 'red' : '#FFFFFF',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#FFFFFF',
                                        },
                                    }}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label="Confirmation Email"
                                    variant="outlined"
                                    value={formData.confirmEmail}
                                    onChange={handleConfirmEmailChange}
                                    size="small"
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' },
                                        shrink: !!formData.confirmEmail,
                                    }}
                                    InputProps={{
                                        style: { color: '#FFFFFF' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {errors.confirmEmailError ? (
                                                    <DangerousIcon style={{ color: 'red' }} />
                                                ) : (
                                                    <CheckCircleIcon style={{ color: '#2df873' }} />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        flex: 1, // Makes this input take equal width
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF',
                                                borderWidth: errors.confirmEmailError ? '2px' : '1px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#FFFFFF',
                                        },
                                    }}
                                />
                            </div>

                            <div className="Country-Phone"

                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '16px', // Space between the inputs
                                    marginTop: '20px',
                                }}
                            >
                                <TextField
                                    variant="outlined"
                                    label="Your Country"
                                    value={country}
                                    onClick={handleClickCountry}
                                    size="small"
                                    className={countryError ? 'shake' : ''} // Apply shake animation on error
                                    sx={{
                                        width: '49%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            '& fieldset': {
                                                borderColor: countryError ? 'red' : '#fff', // Red border on error, white if valid
                                                borderWidth: '2px',
                                                borderStyle: 'solid',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: countryError ? 'red' : '#fff',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: countryError ? 'red' : '#fff',
                                            },
                                        },
                                        '& .MuiInputLabel-root': { color: '#fff' },
                                        '& .MuiInputAdornment-root': { color: '#fff' },
                                        '& .MuiInputLabel-shrink': { color: '#fff' },
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickCountry} edge="end">
                                                    {openCountry ? (
                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                    ) : (
                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Menu
                                    anchorEl={anchorElCountry}
                                    open={openCountry}
                                    onClose={() => handleCloseCountry('')}
                                    PaperProps={{
                                        style: {
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            width: '24.5%',
                                            color: 'white',
                                            height: '150px',
                                            borderRadius: '8px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    {countries.map((countryName) => (
                                        <MenuItem
                                            key={countryName}
                                            onClick={() => handleCloseCountry(countryName)}
                                            style={{ color: '#fff', transition: 'transform 0.2s ease-in-out' }}
                                            sx={{
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        >
                                            {countryName}
                                        </MenuItem>
                                    ))}
                                </Menu>

                                <TextField
                                    id="outlined-phone"
                                    label="Phone Number"
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={handleInputChange}
                                    size="small"
                                    error={isError} // Show error if the format is incorrect
                                    className={isError ? 'shake' : ''} // Apply shake animation on error
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' }, // Label color to white
                                    }}
                                    InputProps={{
                                        style: {
                                            color: '#FFFFFF', // Text color to white
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <span style={{ color: '#fff', marginRight: '8px' }}>{selectedCountryCode}</span> {/* Display country code */}
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CountrySelect
                                                    className="border"
                                                    value={selectedCountryCode}
                                                    onChange={handleCountryChange}
                                                    sx={{
                                                        transform: isSmallScreen ? 'translateY(8px)' : 'none', // Move down on small screens
                                                        height: isSmallScreen ? '48px' : 'auto', // Adjust height
                                                        '& .MuiPaper-root': {
                                                            borderBottomLeftRadius: '0px',
                                                            borderBottomRightRadius: '0px',
                                                        },
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        flex: 1, // Take equal width
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: isError ? 'red' : '#fff', // Red border when no gender is selected, white when selected
                                                borderWidth: '2px', // Set border width to 2px
                                                borderStyle: 'solid', // Solid border style
                                            },
                                            '&:hover fieldset': {
                                                borderColor: isError ? 'red' : '#fff', // Keep red border on hover if gender not selected
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: isError ? 'red' : '#fff', // Keep red border when focused if gender not selected
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            width: '100%', // Ensure input takes full width of TextField
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#FFFFFF', // Label color to white
                                        },
                                    }}
                                />





                            </div>
                            <div className="UpdateProfileButton  slide-from-left"
                                style={{
                                    width: '100%',
                                    marginTop: '15px',
                                    marginBottom: '-10px',
                                }}
                            >
                                <Button
                                    onClick={handleProfileUpdate}
                                    variant="outlined"
                                    className="btn-grad"
                                    sx={{
                                        width: '100.5%',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        height: '38px',
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
                                            {step === 1 ? `${t('Update Profile')} (1/2)` : `${t('Verify')} (2/2)`}
                                        </Typography>
                                    )}
                                </Button>

                            </div>



                        </div>

                    </div>
                </>
            )}

            {activeSection === 'verifyEmail' && (
                <>
                    <div className="EmailCodeVerify slide-from-right"

                        style={{
                            width: '74%',
                            height: '373px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            borderRadius: '20px',
                            position: 'absolute',
                            top: '25%',
                            padding: '26px',
                            left: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1px', // Optional: Adds spacing within the container
                        }}
                    >
                        <div className="EamilCodeLotties"

                            style={{
                                position: 'absolute',
                                top: '-5%',
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
                                position: 'absolute',
                                top: errorMessage || successMessage ? '35%' : '36%', // Adjust top when there's an error
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
                                Enter verification code
                            </Typography>
                        </div>

                        <div className="EamilSentTypo"

                            style={{
                                width: '100%',
                                textAlign: 'center',
                                position: 'absolute',
                                top: errorMessage || successMessage ? '42%' : '44%', // Adjust top when there's an error
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
                                We've sent a code to
                                <span style={{ color: '#4776E6', fontWeight: 'bold', marginLeft: '5px' }}>
                                    {formData.email}
                                </span>
                            </Typography>
                        </div>

                        <div
                            style={{
                                marginTop: '12px',
                            }}
                        >
                            {errorMessage && (
                                <Typography sx={{ color: 'red', fontSize: '15px', }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            {successMessage && (
                                <Typography sx={{ color: '#2df873', fontSize: '15px', fontWeight: 'bold' }}>
                                    {successMessage}
                                </Typography>
                            )}
                        </div>


                        <div className="CodeEnter slide-from-right"
                            style={{
                                display: 'flex',
                                gap: '10px',
                                position: 'absolute',
                                top: errorMessage || successMessage ? '57%' : '55%', // Adjust top when there's an error
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
                                position: 'absolute',
                                top: '74%',
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
                                    opacity: wrongAttempts >= 3 ? '0.5' : 'unset',
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
                                position: 'absolute',
                                top: '86.5%',
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
                                position: 'absolute',
                                top: '93%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontSize: '15px',
                                }}
                            >
                                {formattedTime} (Code Expire)
                            </Typography>
                        </div>


                        <div
                            className="Goback slide-from-right"
                            onClick={handleBackToProfileUpdate}
                            style={{
                                display: 'flex',
                                gap: '6px',
                                cursor: 'pointer',
                                position: 'absolute',
                                left: '2%',
                                top: '5%',
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
                                        {t('Back to PrevStep')}
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
                                        {t('Back to PrevStep')}
                                    </Typography>
                                </>
                            )}
                        </div>
                    </div>


                </>
            )}

            {activeSection === 'EmailVerificationSucces' && (
                <>
                    <div className="EmailVerifySuccess slide-from-right"
                        style={{
                            width: '74%',
                            height: '320px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            borderRadius: '20px',
                            position: 'absolute',
                            top: '25%',
                            left: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',


                        }}
                    >
                        <div className="ProfileVerifiedLottie"
                            style={{
                                width: isAnimationComplete ? 160 : 280,
                                height: isAnimationComplete ? 160 : 280,
                                transition: 'width 0.8s ease, height 0.8s ease, top 0.8s ease',
                                position: 'absolute',
                                top: isAnimationComplete ? '21%' : '50%',
                                transform: 'translateY(-50%)',
                            }}
                        >
                            <Player
                                src={ProfileSucces}
                                autoplay
                                loop={false}
                                style={{ width: '100%', height: '100%' }}
                                onEvent={(event) => {
                                    if (event === 'complete') {
                                        setIsAnimationComplete(true);
                                    }
                                }}
                            />
                        </div>

                        {showSuccessMessage && (
                            <div className="VerificationTypo"

                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    position: 'absolute',
                                    top: '47%', // Below the Lottie at its final position
                                    animation: 'scaleIn 0.5s ease forwards',
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
                                    Profile Updated Successfully
                                </Typography>
                            </div>
                        )}
                        {showSuccessMessage2 && (
                            <>
                                <div className="VerificationTypo2"

                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        position: 'absolute',
                                        top: '55%', // Below the Lottie at its final position
                                        animation: 'scaleIn 0.5s ease forwards',
                                        padding: '5px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            opacity: '0.8',
                                        }}
                                    >
                                        Hey Nabil, congratulations! Your profile has been successfully updated. Now, as a next step, you can proceed with ID verification to further secure your account. Please make sure that the information on your ID matches the details you've provided in your profile.
                                    </Typography>
                                </div>
                            </>
                        )}
                        {showSuccessMessage3 && (
                            <>
                                <div className="VerificationTypo2"

                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        position: 'absolute',
                                        top: '55%', // Below the Lottie at its final position
                                        animation: 'scaleIn 0.5s ease forwards',
                                        padding: '5px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            opacity: '0.5',
                                        }}
                                    >
                                        Hey Nabil, congratulations! Your profile has been successfully updated. Now, as a next step, you can proceed with ID verification to further secure your account. Please make sure that the information on your ID matches the details you've provided in your profile.
                                    </Typography>
                                </div>
                                <div className="SigninButton"
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        position: 'absolute',
                                        top: '80%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        animation: 'scaleIn 0.5s ease forwards',
                                        padding: '5px',
                                    }}
                                >
                                    <Button onClick={handleOpenVerify}
                                        variant="outlined"
                                        className='btn-grad'

                                        sx={{
                                            width: '332px',


                                            height: '38px',
                                            backgroundColor: 'transparent', // Change background to green on success
                                            color: 'white', // Keep text color white
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
                                                {t('Start Verification')}
                                            </Typography>
                                        )}

                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}


            {activeSection === 'changePassword' && (
                <>
                    <div className='ChangePasswordComponent' >
                        <ProfileChangePassword />
                    </div>
                </>
            )}



        </div>
    )
}

export default ProfileSettings