import React, { useState, useEffect, useRef } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useUser } from '../../../Context/UserContext.jsx'
import i18n from 'i18next';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CountrySelect from '../../Projectsfetch/MenuList/CountrySelect.jsx'
import DangerousIcon from '@mui/icons-material/Dangerous';
import CircularProfile from './CircularProfile.jsx'
import GradientChart from './GradientChart.jsx'
import GradientChart2 from './GradientChart2.jsx'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Flag from 'react-world-flags';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import ProfileChangePassword from "../../userdashboard/ProfileChangePassword.jsx";
import AchievmentsChart from "./AchievmentsChart.jsx";
import Notifications from "./Notifications.jsx";
import { ToastContainer, toast } from "react-toastify";
import DOMPurify from 'dompurify';
import validator from 'validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import "react-toastify/dist/ReactToastify.css";
import Security from "./Security.jsx";


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





// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});




function AccountSettings({ handleOpenNewEmail, handleOpenPhoneCode, handleOpenEmailUpdated, ocClickOpen, onClickOpen, ocClickAchievement, setIsProfileUpdatedOpen, VerifyId, setIsPasswordUpdatedOpen, handleOpenProfileUpdated }) {

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
    const { user, isLoaded, updateUserProfile, isProfileUpdated, error, verificationStatus } = useUser();





    const isEmailConfirmed = user?.ConfirmedEmail;

    const progress = 0
    const [selectedSection, setSelectedSection] = useState("Account");

    const totalSectors = 12; // Total number of sectors


    const [rangeValue, setRangeValue] = useState(0);
    const [chart1Color, setChart1Color] = useState('#5BC1FD');
    const [chart2Color, setChart2Color] = useState('#8b5cf6');
    const [chart3Color, setChart3Color] = useState('#c22884');



    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
    const shouldUseColumn = useMediaQuery('(max-width:1490px)');
    const shouldUseColumn1100 = useMediaQuery('(max-width:1100px)');

    const [activeTab, setActiveTab] = useState('account'); // Default active tab
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);






    const [openGender, setOpenGender] = useState(false);
    const [anchorElGender, setAnchorElGender] = useState(null);

    // State for Email Input

    const [openBirthMonth, setOpenBirthMonth] = useState(false);
    const [anchorElBirthMonth, setAnchorElBirthMonth] = useState(null);
    const [birthMonth, setBirthMonth] = useState(user?.birthMonth || '');
    const [birthDay, setBirthDay] = useState(user?.birthDay || '');
    const [birthYear, setBirthYear] = useState(user?.birthYear || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [anchorElBirthDay, setAnchorElBirthDay] = useState(null);
    const [openBirthDay, setOpenBirthDay] = useState(false);
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

    // Add this useEffect to handle initial validation states
    useEffect(() => {
        if (user) {

            setErrors(prev => ({
                ...prev,
                countryError: !user.country,
                phoneNumberError: !user.phoneNumber
            }));

            // Set initial values
            setCountry(user.country || '');
            setPhoneNumber(user.phoneNumber || '');
            setSelectedCountryCode(user.countryCode || '+213');
        }
    }, [user]);



    const [countryError, setCountryError] = useState(true);
    const [isError, setIsError] = useState(true);

    const [selectedCountryCode, setSelectedCountryCode] = useState(user?.countryCode || '+213');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

    // Format phone number (Add dashes after every two digits)
    const formatPhoneNumber = (value) => {
        let phone = value.replace(/\D/g, ''); // Remove non-digits
        if (phone.length > 10) phone = phone.slice(0, 10); // Limit to 10 digits

        // Add dashes after every 2 digits
        return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
    };


    const handleInputChange = (event) => {
        const value = event.target.value;
        const formattedPhone = formatPhoneNumber(value);
        const digitsOnly = formattedPhone.replace(/\D/g, '');

        setPhoneNumber(formattedPhone);

        setFormData(prev => ({
            ...prev,
            phoneNumber: formattedPhone
        }));

        // Update error states
        setIsError(digitsOnly.length !== 10);
        setErrors(prev => ({
            ...prev,
            phoneNumberError: digitsOnly.length !== 10
        }));

        // Only show error message if there's input and it's invalid
        if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
            setErrorMessage('Phone Format: xx-xx-xx-xx-xx');
        } else {
            setErrorMessage('');
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


    const [country, setCountry] = useState(user?.country || '');
    const [openCountry, setOpenCountry] = useState(false);
    const [anchorElCountry, setAnchorElCountry] = useState(null);
    const inputRefs = useRef([]);
    const [emailVerifyCode, setEmailVerifyCode] = useState(Array(4).fill('')); // Changed state name to emailVerifyCode






    const countries = [
        { name: 'Algeria', code: 'DZ' },
        { name: 'Bahrain', code: 'BH' },
        { name: 'Comoros', code: 'KM' },
        { name: 'Djibouti', code: 'DJ' },
        { name: 'Egypt', code: 'EG' },
        { name: 'Iraq', code: 'IQ' },
        { name: 'Jordan', code: 'JO' },
        { name: 'Kuwait', code: 'KW' },
        { name: 'Lebanon', code: 'LB' },
        { name: 'Libya', code: 'LY' },
        { name: 'Mauritania', code: 'MR' },
        { name: 'Morocco', code: 'MA' },
        { name: 'Oman', code: 'OM' },
        { name: 'Palestine', code: 'PS' },
        { name: 'Qatar', code: 'QA' },
        { name: 'Saudi Arabia', code: 'SA' },
        { name: 'Somalia', code: 'SO' },
        { name: 'Sudan', code: 'SD' },
        { name: 'Syria', code: 'SY' },
        { name: 'Tunisia', code: 'TN' },
        { name: 'United Arab Emirates', code: 'AE' },
        { name: 'Yemen', code: 'YE' },
        { name: 'United States', code: 'US' },
        { name: 'Canada', code: 'CA' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'Australia', code: 'AU' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'China', code: 'CN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Brazil', code: 'BR' },
        { name: 'South Africa', code: 'ZA' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Italy', code: 'IT' },
        { name: 'Russia', code: 'RU' },
        { name: 'Turkey', code: 'TR' },
        { name: 'Netherlands', code: 'NL' },
        { name: 'Sweden', code: 'SE' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'Norway', code: 'NO' },
        { name: 'Denmark', code: 'DK' },
        { name: 'Belgium', code: 'BE' },
        { name: 'Ireland', code: 'IE' },
        { name: 'Singapore', code: 'SG' },
        { name: 'Malaysia', code: 'MY' },
        { name: 'Indonesia', code: 'ID' },
        { name: 'Philippines', code: 'PH' },
        { name: 'Thailand', code: 'TH' },
        { name: 'Vietnam', code: 'VN' },
        { name: 'Pakistan', code: 'PK' },
        { name: 'Bangladesh', code: 'BD' },
        { name: 'Greece', code: 'GR' },
        { name: 'Portugal', code: 'PT' },
        { name: 'Finland', code: 'FI' },
        { name: 'Poland', code: 'PL' },
        { name: 'Czech Republic', code: 'CZ' },
        { name: 'Hungary', code: 'HU' },
        { name: 'Romania', code: 'RO' },
        { name: 'Ukraine', code: 'UA' },
        { name: 'Chile', code: 'CL' },
        { name: 'Colombia', code: 'CO' },
        { name: 'Peru', code: 'PE' },
        { name: 'Venezuela', code: 'VE' },
        { name: 'Ecuador', code: 'EC' }
    ];



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phoneNumber: '',
        countryCode: '+213',
        country: '',
        birthMonth: '',
        birthDay: '',
        birthYear: '',

    });
    useEffect(() => {
        if (isLoaded && user) {
            // Update form data
            setFormData(prev => ({
                ...prev,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                confirmEmail: user.email || '',
                phoneNumber: user.phoneNumber || '',
                country: user.country || '',
                gender: user.gender || '',
                birthMonth: user.birthMonth || '',
                birthDay: user.birthDay || '',
                birthYear: user.birthYear || '',
            }));

            // Update error states based on field presence
            setErrors(prev => ({
                ...prev,
                phoneNumberError: !user.phoneNumber,
                countryError: !user.country,
                genderError: !user.gender,
                birthMonthError: !user.birthMonth,
                birthDayError: !user.birthDay,
                birthYearError: !user.birthYear
            }));

            // Update individual state values
            if (user.gender) setGender(user.gender);
            if (user.birthMonth) setBirthMonth(user.birthMonth);
            if (user.birthDay) setBirthDay(user.birthDay);
            if (user.birthYear) setBirthYear(user.birthYear);
            if (user.country) setCountry(user.country);
            if (user.phoneNumber) setPhoneNumber(user.phoneNumber);
        }
    }, [isLoaded, user]);

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
        countryError: true,
        phoneNumberError: false,
    });


    const [errorMessage, setErrorMessage] = useState('');


    const handleFirstNameInputChange = (e) => {
        const value = e.target.value;

        // Show error message if max length is reached
        if (value.length >= 20) {
            setErrorMessage('The first name cannot exceed 20 characters. If you have problems, please contact support.');
        } else {
            setErrorMessage(''); // Clear error message
        }

        setFormData((prev) => ({ ...prev, firstName: value }));

        // Immediately update icon and border styles
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
    };

    const handleLastNameInputChange = (e) => {
        const value = e.target.value;

        // Show error message if max length is reached
        if (value.length >= 20) {
            setErrorMessage('The last name cannot exceed 20 characters. If you have problems, please contact support.');
        } else {
            setErrorMessage(''); // Clear error message
        }

        setFormData((prev) => ({ ...prev, lastName: value }));

        // Immediately update icon and border styles
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
    };





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

      // Email format validation using validator.js
      if (newEmail && !validator.isEmail(newEmail)) {
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
            // Check if confirmation email matches the original email
    if (confirmEmailValue !== formData.email) {
        setErrorMessage('Emails do not match.');
        setErrors((prevErrors) => ({ ...prevErrors, confirmEmailError: true }));
    }
};
    




    // Handle country selection
    const handleClickCountry = (event) => {
        setAnchorElCountry(event.currentTarget); // Set the anchor element for the dropdown
        setOpenCountry(!openCountry); // Toggle dropdown visibility
    };

    // Updated country selection handler
    const handleCloseCountry = (selectedCountry) => {
        if (selectedCountry) {
            setCountry(selectedCountry);
            setFormData(prevFormData => ({
                ...prevFormData,
                country: selectedCountry
            }));

            // Clear country error
            setErrors(prev => ({
                ...prev,
                countryError: false
            }));

            setOpenCountry(false);
            setAnchorElCountry(null);
            setErrorMessage('');
        } else {
            setOpenCountry(false);
            setAnchorElCountry(null);
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

    
    // Sanitize inputs using DOMPurify
    const sanitizedFirstName = DOMPurify.sanitize(formData.firstName.trim());
    const sanitizedLastName = DOMPurify.sanitize(formData.lastName.trim());
    const sanitizedEmail = DOMPurify.sanitize(formData.email.trim().toLowerCase());
    const sanitizedPhoneNumber = formData.phoneNumber.trim().replace(/\D/g, ''); // Remove non-digit characters
    const sanitizedCountry = DOMPurify.sanitize(formData.country.trim());

    // Compare current form data with user's current data
    if (
        sanitizedFirstName === user.firstName &&
        sanitizedLastName === user.lastName &&
        sanitizedEmail === user.email &&
        sanitizedPhoneNumber === user.phoneNumber &&
        sanitizedCountry === user.country &&
        gender === user.gender &&
        birthMonth === user.birthMonth &&
        birthDay === user.birthDay &&
        birthYear === user.birthYear
    ) {
        setErrorMessage("Your profile is already up-to-date. No changes detected.");
        return; // Prevent making the request if no changes
    }

    // Validation checks for first name
    if (!sanitizedFirstName) {
        setErrorMessage('First name is required.');
        newErrors.firstNameError = true;
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(sanitizedFirstName)) {
        setErrorMessage('First name can only contain letters and spaces.');
        newErrors.firstNameError = true;
        isValid = false;
    } else {
        newErrors.firstNameError = false;
    }

    // Validation checks for last name
    if (!sanitizedLastName) {
        setErrorMessage('Last name is required.');
        newErrors.lastNameError = true;
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(sanitizedLastName)) {
        setErrorMessage('Last name can only contain letters and spaces.');
        newErrors.lastNameError = true;
        isValid = false;
    } else {
        newErrors.lastNameError = false;
    }

    // Validation checks for gender, birthMonth, birthDay, etc.
    if (!gender) {
        setErrorMessage('Gender is required.');
        newErrors.genderError = true;
        isValid = false;
    } else {
        newErrors.genderError = false;
    }

    if (!birthYear) {
        setErrorMessage('Birth year is required.');
        newErrors.birthYearError = true;
        isValid = false;
    } else {
        newErrors.birthYearError = false;
    }

    if (!birthMonth) {
        setErrorMessage('Birth month is required.');
        newErrors.birthMonthError = true;
        isValid = false;
    } else {
        newErrors.birthMonthError = false;
    }

    if (!formData.birthDay) {
        setErrorMessage('Birth day is required.');
        newErrors.birthDayError = true;
        isValid = false;
    } else {
        newErrors.birthDayError = false;
    }

    // Validate email
    if (!sanitizedEmail || !formData.confirmEmail) {
        setErrorMessage('Both email and confirmation email must be filled.');
        newErrors.emailError = true;
        newErrors.confirmEmailError = true;
        isValid = false;
    } else if (sanitizedEmail !== DOMPurify.sanitize(formData.confirmEmail.trim().toLowerCase())) {
        setErrorMessage('Emails do not match.');
        newErrors.confirmEmailError = true;
        isValid = false;
    } else if (!validator.isEmail(sanitizedEmail)) {
        setErrorMessage('Please enter a valid email.');
        newErrors.emailError = true;
        isValid = false;
    } else {
        newErrors.emailError = false;
        newErrors.confirmEmailError = false;
    }

    // Country validation
    if (!sanitizedCountry) {
        setErrorMessage('Country is required.');
        newErrors.countryError = true;
        isValid = false;
    } else {
        newErrors.countryError = false;
    }

    // Phone validation (original logic)
    const phoneWithoutCode = sanitizedPhoneNumber;
    if (!phoneWithoutCode) {
        setErrorMessage('Phone number is required.');
        newErrors.phoneError = true;
        isValid = false;
    } else if (!/^\d+$/.test(phoneWithoutCode)) {
        setErrorMessage('Phone number can only contain digits.');
        newErrors.phoneError = true;
        isValid = false;
    } else {
        newErrors.phoneError = false;
    }

        // Return if not valid
        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);
            const { success, data, error } = await updateUserProfile({
                firstName: sanitizedFirstName,
                lastName: sanitizedLastName,
                email: sanitizedEmail,
                phoneNumber: sanitizedPhoneNumber,
                country: sanitizedCountry,
                gender,
                birthMonth,
                birthDay: formData.birthDay,
                birthYear: formData.birthYear,
            });

            if (success) {
                setIsProfileUpdatedOpen(true);
                setErrors({});
                setErrorMessage('');
            } else {
                setErrorMessage(error);
            }
        } catch (error) {
            setErrorMessage('Failed to update profile. Please try again later.');
        } finally {
            setIsLoading(false);
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



    const basicInfoRef = useRef(null);

    const handleScrollToBasicInfo = () => {
        if (basicInfoRef.current) {
            // Scroll to the BasicInfo div
            basicInfoRef.current.scrollIntoView({ behavior: "smooth" });

            // Add scale animation class
            basicInfoRef.current.classList.add("scale-animation");

            // Remove the animation class after animation ends to reset
            setTimeout(() => {
                basicInfoRef.current.classList.remove("scale-animation");
            }, 1000); // Match this duration with your CSS animation time
        }
    };




    const calculateCompletion = () => {
        let completion = 25; // Base completion
        if (isProfileUpdated) completion += 25;
        if (isEmailConfirmed) completion += 25;
        if (requests.length > 0) completion += 25; // A request is submitted, so complete 100%
        return completion;
    };







    const location = useLocation();
    useEffect(() => {
        if (location.state?.fromSystem) {
            setSelectedSection("Notification");
        }
    }, [location]);


    const handleVerifyId = () => {


        if (!user?.isProfileUpdated) {

            toast.warning(t('Please Update your profile first'), {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

                className: 'toast-warning',
            });

            return;
        }

        VerifyId();
    };



    const requests = user?.requests || []; // Ensure requests exist


    useEffect(() => {
        console.log('User data in AccountSettings:', user); // Log the user data to see if it's updated
    }, [user]);





    useEffect(() => {
        const checkConnection = () => {
            if (!navigator.onLine) {
                setHasError(true);
            }
        };

        window.addEventListener("offline", checkConnection);
        return () => window.removeEventListener("offline", checkConnection);
    }, []);

    const handleRetry = () => {
        window.location.reload();
    };







    return (
        <div className="MainContainer"

            style={{
                width: "96%",
                height: "auto",
                marginTop: "50px",
                borderRadius: "0.75rem",
                backgroundClip: "border-box",
                border: "0 solid rgba(0, 0, 0, 0.125)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* Header */}
            <div className="Header"

                style={{
                    width: "100%",
                    height: "60px",
                    display: "flex",
                    gap: "40px",
                    alignItems: "center",
                    padding: "10px",

                }}
            >
                {/* Skelton for Account Header Settings */}
                <style>
                    {loadingKeyframes}
                </style>
                {!isLoaded && (
                    <div className="SkeltonContainer"
                        style={{
                            width: "100%",
                            height: "60px",
                            display: "flex",
                            gap: "40px",
                            alignItems: "center",
                            padding: "10px",
                            position: 'relative',
                        }}>

                        <div className='Account'
                            style={{
                                width: '10%',
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
                        <div className='Notification'
                            style={{
                                width: '10%',
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
                        <div className='Security'
                            style={{
                                width: '10%',
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
                )}
                {isLoaded && (
                    <>


                        <div className="Account"

                            onClick={() => setSelectedSection("Account")}
                            style={{
                                display: "flex",
                                gap: "5px",
                                cursor: "pointer",
                                opacity: selectedSection === "Account" ? "1" : "0.5",
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        >
                            <AccountCircleOutlinedIcon sx={{ color: "white" }} />
                            <Typography
                                sx={{
                                    color: "white",
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                }}>
                                {t('Account')}
                            </Typography>
                        </div>

                        {/* Notification Section */}
                        <div className="Notification"

                            onClick={() => setSelectedSection("Notification")}
                            style={{
                                display: "flex",
                                gap: "5px",
                                cursor: "pointer",
                                opacity: selectedSection === "Notification" ? "1" : "0.5",
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        >
                            <NotificationsActiveOutlinedIcon sx={{ color: "white" }} />
                            <Typography sx={{
                                color: "white",
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',



                            }}>
                                {t('Notification')}

                            </Typography>
                        </div>

                        {/* Security Section */}
                        <div className="Security"

                            onClick={() => setSelectedSection("Security")}
                            style={{
                                display: "flex",
                                gap: "5px",
                                cursor: "pointer",
                                opacity: selectedSection === "Security" ? "1" : "0.5",
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        >
                            <HttpsOutlinedIcon sx={{ color: "white" }} />
                            <Typography sx={{
                                color: "white",
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                            }}>
                                {t('Security')}
                            </Typography>
                        </div>
                    </>
                )}
            </div>
            {/* Underline */}
            <div className="Underline"

                style={{
                    width: "100%",
                    height: "1px",
                    background: "white",
                    position: "relative",
                    display: "flex",
                }}
            >
                {/* Account Underline */}
                <div className="AccountUnderLine"

                    style={{
                        width: "10%",
                        height: "1px",
                        background:
                            selectedSection === "Account" ? "rgba(0, 116, 255, 0.8)" : "transparent",
                        transition: "background 0.3s ease-in-out",
                    }}
                ></div>

                {/* Notification Underline */}
                <div className="NotificationUnderLine"

                    style={{
                        width: "12%",
                        height: "1px",
                        position: "absolute",
                        left: "14%",
                        background:
                            selectedSection === "Notification" ? "rgba(0, 116, 255, 0.8)" : "transparent",
                        transition: "background 0.3s ease-in-out",
                    }}
                ></div>

                {/* Security Underline */}
                <div className="SecurityUnderLine"

                    style={{
                        width: "12%",
                        height: "1px",
                        position: "absolute",
                        left: "29%",
                        background:
                            selectedSection === "Security" ? "rgba(0, 116, 255, 0.8)" : "transparent",
                        transition: "background 0.3s ease-in-out",
                    }}
                ></div>
            </div>

            {selectedSection === "Account" && (
                <div className="StatusAndInfo"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div className="AccountDesignSection"
                        style={{
                            width: '100%',
                            height: 'auto',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: shouldUseColumn ? 'column' : 'unset',
                            flexWrap: 1,
                            gap: '20px',
                        }}
                    >
                        <div className="AccountStatus slide-from-left"

                            style={{
                                width: shouldUseColumn ? '100%' : '50%',
                                height: 'auto',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                backgroundClip: 'border-box',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                justifyContent: 'center', // Centers content vertically
                                alignItems: 'center', // Centers content horizontally
                            }}
                        >
                            {/* Skelton for Account Header Settings */}
                            <style>
                                {loadingKeyframes}
                            </style>
                            {/* Skeleton Loader */}
                            {!isLoaded && (
                                <div className="AccountStatusSkeltonContain"
                                    style={{
                                        width: shouldUseColumn ? '100%' : '110%',
                                        height: 'auto',
                                        borderRadius: '0.75rem',
                                        backgroundClip: 'border-box',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '30px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Header Section with Title and Status Button */}
                                    <div className="SkeltonTypo"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            marginTop: '-30px',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* Title Skeleton */}
                                        <div className="TYpo"
                                            style={{
                                                width: '23%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                overflow: 'hidden',
                                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'loading 2.5s infinite'
                                            }}
                                        />
                                        {/* Status Button Skeleton */}
                                        <div className="TYpo"
                                            style={{
                                                width: '20%',
                                                height: '32px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                overflow: 'hidden',
                                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'loading 2.5s infinite'
                                            }}
                                        />
                                    </div>

                                    {/* Profile Circle Skeleton */}
                                    <div className="ProfileCircleSkeleton"
                                        style={{
                                            width: '110px',
                                            height: '110px',
                                            borderRadius: '50%',
                                            backgroundColor: '#111827',
                                            overflow: 'hidden',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite'
                                        }}
                                    />

                                    {/* Name Skeleton */}
                                    <div className="NameSkeleton"
                                        style={{
                                            width: '30%',
                                            height: '20px',
                                            marginTop: '-13px',
                                            borderRadius: '16px',
                                            backgroundColor: '#111827',
                                            overflow: 'hidden',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite'
                                        }}
                                    />

                                    {/* Title Skeleton */}
                                    <div className="TitleSkeleton"
                                        style={{
                                            width: '25%',
                                            height: '15px',
                                            marginTop: '-23px',
                                            borderRadius: '16px',
                                            backgroundColor: '#111827',
                                            overflow: 'hidden',
                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'loading 2.5s infinite'
                                        }}
                                    />

                                    {/* Stats Container */}
                                    <div className="Data"
                                        style={{
                                            width: isSmallScreen ? '100%' :




                                                isTabletScreen ? '100%' :
                                                    shouldUseColumn ? '70%' :
                                                        shouldUseColumn1100 ? '90%' : '100%',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            flexDirection: isSmallScreen ? 'column' : 'unset',
                                            gap: isSmallScreen ? '15px' : 'unset',
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* Rank Card Skeleton */}
                                        <div className="CssGlass Rank"
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '95%' : '48%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '16px',
                                            }}
                                        >
                                            {/* Icon Circle Skeleton */}
                                            <div className="IconSkeleton"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            {/* Rank Text Skeleton */}
                                            <div className="TextSkeleton"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            {/* Chart Skeleton */}
                                            <div className="ChartSkeleton"
                                                style={{
                                                    width: '50px',
                                                    height: '30px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            {/* Percentage Skeleton */}
                                            <div className="PercentageSkeleton"
                                                style={{
                                                    width: '45px',
                                                    height: '20px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                        </div>

                                        {/* Reviews Card Skeleton - Same structure as Rank */}
                                        <div className="CssGlass Review"
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '95%' : '48%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '16px',
                                            }}
                                        >
                                            <div className="IconSkeleton"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            <div className="TextSkeleton"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            <div className="ChartSkeleton"
                                                style={{
                                                    width: '50px',
                                                    height: '30px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            <div className="PercentageSkeleton"
                                                style={{
                                                    width: '45px',
                                                    height: '20px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                        </div>

                                        {/* Achievements Card Skeleton */}
                                        <div className="CssGlass Achivement"
                                            style={{
                                                display: 'flex',
                                                width: currentLanguage === 'ar' ? '52%' :
                                                    isSmallScreen ? '95%' : '60%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                margin: isSmallScreen ? 'unset' : '20px auto 0',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '16px',
                                            }}
                                        >
                                            <div className="IconSkeleton"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            <div className="TextSkeleton"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            <div className="ChartSkeleton"
                                                style={{
                                                    width: '50px',
                                                    height: '30px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                            <div className="PercentageSkeleton"
                                                style={{
                                                    width: '45px',
                                                    height: '20px',
                                                    backgroundColor: '#111827',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: 'loading 2.5s infinite'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {isLoaded && (
                                <>


                                    <div className="typo"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center', // Ensure text is centered
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap', // Prevent wrapping
                                            }}
                                        >
                                            {t('Account Status')}
                                        </Typography>
                                        {requests.length === 0 && (
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '30%' : '20%',
                                                    maxWidth: isSmallScreen ? '60%' : '25%',
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
                                                    {t('Pending')}
                                                </Typography>
                                            </Button>
                                        )}

                                        {user?.requests?.length > 0 && user.requests[0].idVerificationStatus === 'progress' && (
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '30%' : '20%',
                                                    maxWidth: isSmallScreen ? '60%' : '25%',
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


                                        {verificationStatus?.idVerificationStatus === 'accepted' && (
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '30%' : '20%',
                                                    maxWidth: isSmallScreen ? '60%' : '25%',
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
                                                    {t('Active')}
                                                </Typography>
                                            </Button>
                                        )}
                                        {verificationStatus?.idVerificationStatus === 'rejected' && (
                                            <Button
                                                sx={{
                                                    width: isSmallScreen ? '30%' : '20%',
                                                    maxWidth: isSmallScreen ? '60%' : '25%',
                                                    color: 'white',
                                                    backgroundColor: '#4e1919',  // Dark red for rejected
                                                    boxShadow: '0px 4px 6px rgba(167, 40, 40, 0.2), 0px 1px 3px rgba(167, 40, 40, 0.2)',
                                                    borderRadius: '16px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(167, 40, 40, 0.2)',
                                                        boxShadow: '0px 4px 6px rgba(167, 40, 40, 0.2), 0px 1px 3px rgba(167, 40, 40, 0.2)',
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#f82d2d', // Red text
                                                        flex: 1,
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {t('Rejected')}
                                                </Typography>
                                            </Button>
                                        )}




                                    </div>
                                    <div className="ProfileCircle">
                                        <CircularProfile />
                                    </div>
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            textAlign: 'center',
                                            display: 'flex',
                                            fontFamily: /[\u0600-\u06FF]/.test(user?.firstName + user?.lastName) && currentLanguage === 'ar'
                                                ? '"Droid Arabic Kufi", serif' // Arabic font for Arabic names
                                                : currentLanguage === 'ar'
                                                    ? '"Airbnbcereal", sans-serif' // English font for Arabic mode with Latin names
                                                    : '"Airbnbcereal", sans-serif', // Default font for non-Arabic languages
                                            alignItems: 'center',
                                            marginTop: '-13px',
                                            fontSize: '17px',
                                            fontWeight: 'bold',
                                            textWrap: 'nowrap',
                                        }}
                                    >

                                        {user?.firstName} {user?.lastName}

                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '-23px',
                                            fontSize: '15px',
                                            textWrap: 'nowrap',
                                            opacity: '0.8',

                                        }}
                                    >


                                        {t('Website Developer')}
                                    </Typography>
                                    <div className="Data"
                                        style={{
                                            width: isSmallScreen ? '100%' :
                                                isTabletScreen ? '100%' :
                                                    shouldUseColumn ? '70%' :
                                                        shouldUseColumn1100 ? '90%' :

                                                            '100%',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            flexDirection: isSmallScreen ? 'column' : 'unset',
                                            gap: isSmallScreen ? '15px' : 'unset',
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                        }}
                                    >


                                        <div className="CssGlass Rank "
                                            onClick={ocClickOpen}
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '95%' : '48%',
                                                gap: '10px',
                                                padding: '10px',
                                                cursor: 'pointer',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',

                                            }}
                                        >


                                            <div className="Rank"
                                                style={{
                                                    backgroundColor: "#ede5fe",
                                                    width: "40px", // Adjust size as needed
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    boxShadow: "0 0 10px 4px #5BC1FD", // Glow effect with the same color as the icon

                                                }}
                                            >

                                                <FontAwesomeIcon
                                                    icon={faSeedling}
                                                    style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#5BC1FD', stroke: 4 }} // Reset any unwanted rotation
                                                />

                                            </div>
                                            <div className="TYpo"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        lineHeight: '20px',
                                                        textAlign: 'center',
                                                        fontFamily: '"Airbnbcereal", sans-serif',

                                                    }}
                                                >
                                                    #1
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                        }}
                                                    >
                                                        {t('Rank')}
                                                    </span>
                                                </Typography>


                                            </div>
                                            <div className="LineChart">
                                                <GradientChart width={50} color={chart1Color} />

                                            </div>
                                            <div className="Percentage">
                                                <Typography
                                                    sx={{
                                                        color: '#2df873',
                                                        fontFamily: '"Airbnbcereal", sans-serif',
                                                        textWrap: 'nowrap',

                                                    }}
                                                >
                                                    + 1.8%
                                                </Typography>
                                            </div>

                                        </div>

                                        <div className="CssGlass Review"
                                            onClick={onClickOpen}
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '95%' : '48%',
                                                cursor: 'pointer',
                                                gap: '10px',
                                                padding: '10px',

                                                alignItems: 'center',
                                                justifyContent: 'space-between',

                                            }}
                                        >

                                            <div className="Rank"
                                                style={{
                                                    backgroundColor: "#ede5fe",
                                                    width: "40px", // Adjust size as needed
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    boxShadow: "0 0 10px 4px #8b5cf6", // Glow effect with #8b5cf6

                                                }}
                                            >

                                                <img width={28} src="https://res.cloudinary.com/damicjacf/image/upload/v1735070623/customer-review_ui1njd.png" alt="" srcset="" />

                                            </div>
                                            <div className="TYpo"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',

                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        lineHeight: '20px',
                                                        textAlign: 'center',
                                                        fontFamily: '"Airbnbcereal", sans-serif',

                                                    }}
                                                >
                                                    2/5
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Reviews')}
                                                    </span>
                                                </Typography>


                                            </div>
                                            <div className="LineChart">
                                                <GradientChart2 width={50} color={chart2Color} />

                                            </div>
                                            <div className="Percentage">
                                                <Typography
                                                    sx={{
                                                        color: '#2df873',
                                                        textWrap: 'nowrap',
                                                        fontFamily: '"Airbnbcereal", sans-serif',

                                                    }}
                                                >
                                                    + 0.6%
                                                </Typography>
                                            </div>



                                        </div>
                                        <div className="CssGlass Achivement"
                                            onClick={ocClickAchievement}
                                            style={{
                                                display: 'flex',
                                                width: currentLanguage === 'ar' && isSmallScreen? '95%' :
                                                currentLanguage === 'ar' ? '52%' :
                                                    isSmallScreen ? '95%' :
                                                        '60%',
                                                gap: '10px',
                                                padding: '10px',
                                                cursor: 'pointer',
                                                alignItems: 'center',
                                                margin: isSmallScreen ? 'unset' : '20px auto 0',
                                                justifyContent: 'space-between',

                                            }}
                                        >


                                            <div className="Rank"
                                                style={{
                                                    backgroundColor: "#ede5fe",
                                                    width: "40px", // Adjust size as needed
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    boxShadow: "0 0 10px 4px #c22884", // Glow effect with the same color as the icon

                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrophy}
                                                    style={{ transform: 'rotate(0deg)', fontSize: '20px', color: '#c22884' }} // Reset any unwanted rotation
                                                />


                                            </div>
                                            <div className="TYpo"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',

                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        lineHeight: '20px',
                                                        textAlign: 'center',
                                                        fontFamily: '"Airbnbcereal", sans-serif',

                                                    }}
                                                >
                                                    2/5
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Achieve')}
                                                    </span>
                                                </Typography>


                                            </div>
                                            <div className="LineChart">
                                                <AchievmentsChart width="50" color={chart3Color} />

                                            </div>
                                            <div className="Percentage">
                                                <Typography
                                                    sx={{
                                                        color: '#2df873',
                                                        textWrap: 'nowrap',
                                                        fontFamily: '"Airbnbcereal", sans-serif',

                                                    }}
                                                >
                                                    + 0.6%
                                                </Typography>
                                            </div>



                                        </div>

                                    </div>
                                </>
                            )}
                        </div>

                        <div className="AccountInfo slide-from-right"
                            style={{
                                width: shouldUseColumn ? '100%' : '50%',
                                height: 'auto',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: "0.75rem",
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                backgroundClip: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '20px',
                                gap: '20px',
                            }}
                        >
                            {/* Skelton for Account Info  */}
                            <style>
                                {loadingKeyframes}
                            </style>
                            {!isLoaded && (
                                <div className="AccountInfoSkeleton"
                                    style={{
                                        width: shouldUseColumn ? '100%' : '110%',
                                        height: 'auto',
                                        borderRadius: "0.75rem",
                                        backgroundClip: 'border-box',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '20px',
                                        gap: '20px',
                                        marginTop: '-25px',
                                    }}
                                >
                                    {/* Header Section */}
                                    <div className="typo"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* Title Skeleton */}
                                        <div className="TitleSkeleton"
                                            style={{
                                                width: '40%',
                                                height: '20px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                overflow: 'hidden',
                                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'loading 2.5s infinite'
                                            }}
                                        />

                                        {/* Completion Button Skeleton */}
                                        <div className="ButtonSkeleton"
                                            style={{
                                                width: isSmallScreen ? '42%' : isMediumScreen ? '20%' : '32%',
                                                maxWidth: isSmallScreen ? '50%' : isMediumScreen ? '20%' : '30%',
                                                height: '32px',
                                                borderRadius: '16px',
                                                backgroundColor: '#111827',
                                                overflow: 'hidden',
                                                backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'loading 2.5s infinite'
                                            }}
                                        />
                                    </div>

                                    {/* To Complete Section */}
                                    <div className="ToComplete"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '25px',
                                            marginTop: '30px',
                                        }}
                                    >
                                        {/* Repeated Item Structure - Account Creation */}
                                        {[1, 2, 3, 4].map((index) => (
                                            <div key={index} className="CssGlass"
                                                style={{
                                                    display: 'flex',
                                                    width: isSmallScreen ? '100%' : '70%',
                                                    gap: '10px',
                                                    padding: '10px',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    margin: '0 auto',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                    borderRadius: '16px',
                                                }}
                                            >
                                                {/* Icon and Text Container */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    {/* Icon Circle Skeleton */}
                                                    <div className="IconSkeleton"
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#111827',
                                                            overflow: 'hidden',
                                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                            backgroundSize: '200% 100%',
                                                            animation: 'loading 2.5s infinite'
                                                        }}
                                                    />

                                                    {/* Text Skeleton */}
                                                    <div className="TextSkeleton"
                                                        style={{
                                                            width: '120px',
                                                            height: '20px',
                                                            borderRadius: '16px',
                                                            backgroundColor: '#111827',
                                                            overflow: 'hidden',
                                                            backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                            backgroundSize: '200% 100%',
                                                            animation: 'loading 2.5s infinite'
                                                        }}
                                                    />
                                                </div>

                                                {/* Action Button Skeleton */}
                                                <div className="ButtonSkeleton"
                                                    style={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        height: '32px',
                                                        borderRadius: '16px',
                                                        backgroundColor: '#111827',
                                                        overflow: 'hidden',
                                                        backgroundImage: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                        backgroundSize: '200% 100%',
                                                        animation: 'loading 2.5s infinite'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isLoaded && (
                                <>
                                    <div className="typo"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center', // Ensure text is centered
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '17px',
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap', // Prevent wrapping
                                            }}
                                        >
                                            {t('Account Completion')}
                                        </Typography>
                                        <Button
                                            sx={{
                                                width: isSmallScreen ? '42%' :
                                                    isMediumScreen ? '20%' :
                                                        '32%',
                                                maxWidth: isSmallScreen ? '50%' :
                                                    isMediumScreen ? '20%' :

                                                        '30%',
                                                color: 'white',
                                                border: '1px solid white',
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                borderRadius: '16px',
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center', // Center the content
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    flex: 1,
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'capitalize',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Trans
                                                    i18nKey="{{completion}}% Complete"
                                                    values={{ completion: calculateCompletion() }}
                                                    components={[<span style={{ fontFamily: '"Airbnbcereal", sans-serif', fontWeight: 'bold' }} />]}
                                                />
                                            </Typography>
                                        </Button>
                                    </div>
                                    <div className="ToComplete"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                            marginTop: '30px',

                                        }}
                                    >
                                        <div className="CssGlass"
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '100%' : '70%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between', // Ensure button goes to the end
                                                margin: '0 auto', // Center the div horizontally
                                            }}
                                        >
                                            {/* Rank and Typography Container */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px' // 5px gap between Rank and Typography 
                                            }}>
                                                <div className="Rank"
                                                    style={{
                                                        backgroundColor: "#BBDEFB",
                                                        width: "40px", // Adjust size as needed
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faLayerGroup}
                                                        style={{ transform: 'rotate(0deg)', fontSize: '18px' }} // Reset any unwanted rotation
                                                    />
                                                </div>

                                                <div className="TYpo">
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            lineHeight: '20px',
                                                            fontSize: '15px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Account Creation')}
                                                    </Typography>
                                                </div>
                                            </div>

                                            {/* Button at the End */}
                                            <Button
                                                sx={{
                                                    width: '25%',
                                                    maxWidth: '25%',
                                                    color: 'white',
                                                    border: '1px solid white',
                                                    background: '#194e3d',
                                                    borderRadius: '16px',
                                                    maxHeight: '400px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    alignItems: 'center', // Center content vertically
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#2df873',
                                                        fontSize: '13px',
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}
                                                >
                                                    <CheckCircleOutlineIcon sx={{ color: '#2df873', fontSize: '19px', }} />
                                                    {t('Done')}
                                                </Typography>
                                            </Button>
                                        </div>
                                        <div className="CssGlass"
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '100%' : '70%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between', // Ensure button goes to the end
                                                margin: '0 auto', // Center the div horizontally
                                            }}
                                        >
                                            {/* Rank and Typography Container */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px' // 5px gap between Rank and Typography 
                                            }}>
                                                <div className="Rank"
                                                    style={{
                                                        backgroundColor: "#BBDEFB",
                                                        width: "40px", // Adjust size as needed
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPersonChalkboard}
                                                        style={{ transform: 'rotate(0deg)', fontSize: '23px' }} // Reset any unwanted rotation

                                                    />
                                                </div>


                                                <div className="TYpo">
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            lineHeight: '20px',
                                                            fontSize: '15px',
                                                            textWrap: 'nowrap',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Provide personal Info')}
                                                    </Typography>
                                                </div>

                                            </div>

                                            {isProfileUpdated ? (
                                                <Button
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        background: '#194e3d',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center', // Center content vertically
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: '#2df873',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        <CheckCircleOutlineIcon sx={{ color: '#2df873', fontSize: '19px', }} />
                                                        {t('Done')}
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                <Button onClick={handleScrollToBasicInfo}
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center', // Center content vertically
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >

                                                        {t('Start')}
                                                    </Typography>
                                                </Button>
                                            )}
                                        </div>
                                        <div className="CssGlass"
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '100%' : '70%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between', // Ensure button goes to the end
                                                margin: '0 auto', // Center the div horizontally
                                            }}
                                        >
                                            {/* Rank and Typography Container */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px' // 5px gap between Rank and Typography 
                                            }}>
                                                <div className="Rank"
                                                    style={{
                                                        backgroundColor: "#BBDEFB",
                                                        width: "40px", // Adjust size as needed
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faEnvelope}
                                                        style={{ transform: 'rotate(0deg)', fontSize: '18px' }} // Reset any unwanted rotation
                                                    />
                                                </div>

                                                <div className="TYpo">
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            lineHeight: '20px',
                                                            fontSize: '15px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Email validation')}
                                                    </Typography>
                                                </div>
                                            </div>

                                            {/* Button at the End */}
                                            {isEmailConfirmed ? (
                                                <Button
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        background: '#194e3d',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center', // Center content vertically
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: '#2df873',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        <CheckCircleOutlineIcon sx={{ color: '#2df873', fontSize: '19px', }} />
                                                        {t('Done')}
                                                    </Typography>
                                                </Button>


                                            ) : (
                                                <Button
                                                    onClick={handleOpenEmailUpdated}
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center', // Center content vertically
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >

                                                        {t('Start')}
                                                    </Typography>
                                                </Button>
                                            )}


                                        </div>
                                        <div className="CssGlass"
                                            style={{
                                                display: 'flex',
                                                width: isSmallScreen ? '100%' : '70%',
                                                gap: '10px',
                                                padding: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between', // Ensure button goes to the end
                                                margin: '0 auto', // Center the div horizontally
                                            }}
                                        >
                                            {/* Rank and Typography Container */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px' // 5px gap between Rank and Typography 
                                            }}>
                                                <div className="Rank"
                                                    style={{
                                                        backgroundColor: "#BBDEFB",
                                                        width: "40px", // Adjust size as needed
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faAddressCard}
                                                        style={{ transform: 'rotate(0deg)', fontSize: '18px' }} // Reset any unwanted rotation
                                                    />
                                                </div>

                                                <div className="TYpo">
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            lineHeight: '20px',
                                                            fontSize: '15px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Identity verification')}
                                                    </Typography>
                                                </div>
                                            </div>

                                            {Array.isArray(verificationStatus) && verificationStatus.length === 0 ? (
                                                // ✅ Start Button (No request found)
                                                <Button onClick={handleVerifyId}
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Start')}
                                                    </Typography>
                                                </Button>
                                            ) : verificationStatus?.idVerificationStatus === 'rejected' ? (
                                                // ✅ Resend Button (When request is rejected)
                                                <Button onClick={handleVerifyId}
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        {t('Resend')}
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                // ✅ Done Button (When request exists and is not rejected)
                                                <Button
                                                    sx={{
                                                        width: '25%',
                                                        maxWidth: '25%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        background: '#194e3d',
                                                        borderRadius: '16px',
                                                        maxHeight: '400px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: '#2df873',
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textTransform: 'capitalize',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        }}
                                                    >
                                                        <CheckCircleOutlineIcon sx={{ color: '#2df873', fontSize: '19px' }} />
                                                        {t('Done')}
                                                    </Typography>
                                                </Button>
                                            )}





                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div ref={basicInfoRef} className="basic-info slide-from-downToUp"
                        style={{
                            width: '100%',
                            height: 'auto',
                            padding: '10px',
                            display: 'flex',
                            flexWrap: 1,
                            gap: '2px',
                        }}
                    >
                        <div className="MainContainer"

                            style={{
                                width: '100%',
                                height: 'auto',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                backgroundClip: 'border-box',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center', // Centers content vertically

                            }}
                        >
                            {/* Skelton for Account Basic Info Inputs  */}
                            <style>
                                {loadingKeyframes}
                            </style>
                            {!isLoaded && (
                                <>
                                    <div className="MainSkeltonInputs"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '0.75rem',
                                            backgroundClip: 'border-box',
                                            gap: '10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center', // Centers content vertically

                                        }}
                                    >
                                        <div className="TYpo"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div className="BasicInfo"
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
                                            <div className="Dot"
                                                style={{
                                                    width: '2%',
                                                    height: '10px',
                                                    borderRadius: '50px',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>

                                        </div>
                                        <div className="FirstAndLastNameInputs"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '16px',
                                            }}
                                        >
                                            <div className="BasicInfo"
                                                style={{
                                                    width: '50%',
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
                                            <div className="Dot"
                                                style={{
                                                    width: '50%',
                                                    height: '36px',
                                                    borderRadius: '50px',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>

                                        </div>
                                        <div className="GenderMonth"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '16px',
                                            }}
                                        >
                                            <div className="Gender"
                                                style={{
                                                    width: '49.4%',
                                                    height: '36px',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    gap: '20px',

                                                }}
                                            >
                                                <div className="GengerInput"
                                                    style={{
                                                        width: '50%',
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
                                                <div className="GengerInput"
                                                    style={{
                                                        width: '50%',
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
                                            <div className="Year"
                                                style={{
                                                    width: '49.4%',
                                                    height: '36px',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    gap: '20px',

                                                }}
                                            >
                                                <div className="GengerInput"
                                                    style={{
                                                        width: '50%',
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
                                                <div className="GengerInput"
                                                    style={{
                                                        width: '50%',
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


                                        </div>
                                        <div className="EmailConfirmEmail"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '16px',
                                            }}
                                        >
                                            <div className="BasicInfo"
                                                style={{
                                                    width: '50%',
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
                                            <div className="Dot"
                                                style={{
                                                    width: '50%',
                                                    height: '36px',
                                                    borderRadius: '50px',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>

                                        </div>
                                        <div className="CountryPhone"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '16px',
                                            }}
                                        >
                                            <div className="BasicInfo"
                                                style={{
                                                    width: '50%',
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
                                            <div className="Dot"
                                                style={{
                                                    width: '50%',
                                                    height: '36px',
                                                    borderRadius: '50px',
                                                    backgroundColor: '#111827',
                                                    overflow: 'hidden',
                                                    backgroundImage: isLoaded ? 'none' : 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
                                                    backgroundSize: '200% 100%',
                                                    animation: isLoaded ? 'none' : 'loading 2.5s infinite'
                                                }}
                                            >

                                            </div>

                                        </div>
                                        <div className="UpdateProfileSkeltonButton"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '16px',
                                            }}
                                        >
                                            <div className="BasicInfo"
                                                style={{
                                                    width: '100%',
                                                    height: '36px',

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
                                    <div className="Typo"
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',

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
                                            {t('Basic Info :')}
                                            {isProfileUpdated ? (
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontSize: '15px',
                                                        marginLeft: '8px',

                                                        opacity: '0.5',
                                                        marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                                                    }}
                                                >
                                                    {t('Great job! Your profile is now complete and up-to-date')}
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontSize: '15px',
                                                        color: 'red',
                                                        marginLeft: '8px',
                                                        opacity: '1',
                                                    }}
                                                >
                                                    {t('Please complete your account – fill in all required fields!')}
                                                </span>
                                            )}
                                        </Typography>
                                        {isProfileUpdated ? (
                                            <div class="icon">
                                                <i className="pulse green"></i>
                                            </div>
                                        ) : (
                                            <div class="icon">
                                                <i className="pulse red"></i>
                                            </div>
                                        )}
                                    </div>
                                    {errorMessage && (
                                        <Typography
                                            sx={{
                                                marginTop: '5px',
                                                marginBottom: '-3px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                color: errorMessage === "Your profile is already up-to-date. No changes detected." ? '#2df873' : '#ff4d4d',
                                            }}
                                        >
                                            {t(errorMessage)}
                                        </Typography>
                                    )}

                                    {currentLanguage === 'ar' ? (
                                        <>

                                            <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={rtlTheme}>
                                                    <div className="InputsContainer"
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '5px',
                                                        }}

                                                    >
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
                                                                label={t('First name')}
                                                                variant="outlined"
                                                                value={formData.firstName}
                                                                size="small"
                                                                inputProps={{
                                                                    maxLength: 20  // Add this line
                                                                }}
                                                                onChange={(e) => {

                                                                    handleFirstNameInputChange(e);

                                                                    const input = e.target;
                                                                    const arabicRegex = /[\u0600-\u06FF]/;
                                                                    input.style.fontFamily = arabicRegex.test(input.value)
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif';
                                                                    input.style.fontWeight = '600';

                                                                }}

                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    shrink: !!user?.firstName,
                                                                    sx: {
                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                    }
                                                                }}
                                                                InputProps={{
                                                                    maxLength: 20,
                                                                    style: {
                                                                        color: '#FFFFFF',
                                                                        maxLength: 20,

                                                                        // Set initial font family based on fetched value
                                                                        fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif',
                                                                        fontWeight: '600',
                                                                    },
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
                                                                    flex: 1,
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
                                                                className={errors.firstNameError ? 'shake' : ''}
                                                            />
                                                            <TextField
                                                                label={t('Last name')}
                                                                variant="outlined"
                                                                value={formData.lastName}
                                                                inputProps={{
                                                                    maxLength: 20  // Add this line
                                                                }}

                                                                onChange={(e) => {
                                                                    handleLastNameInputChange(e);

                                                                    const input = e.target;
                                                                    const arabicRegex = /[\u0600-\u06FF]/;
                                                                    input.style.fontFamily = arabicRegex.test(input.value)
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif';
                                                                    input.style.fontWeight = '600';
                                                                }}
                                                                size="small"
                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    shrink: !!formData.lastName,
                                                                    sx: {

                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally
                                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                    }
                                                                }}
                                                                InputProps={{
                                                                    maxLength: 20,
                                                                    style: {
                                                                        color: '#FFFFFF',
                                                                        maxLength: 20,

                                                                        // Set initial font family based on fetched value
                                                                        fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif',
                                                                        fontWeight: '600'
                                                                    },
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
                                                                className={errors.lastNameError ? 'shake' : ''}
                                                            />
                                                        </div>
                                                        <div className="Gender-Birth "

                                                            style={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                marginTop: '20px',
                                                                flexDirection: isSmallScreen ? 'column' : 'unset',
                                                                gap: '16px',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <div className="Gender"
                                                                style={{
                                                                    width: isSmallScreen ? '100%' : '50%',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    gap: isSmallScreen ? '16px' : '28px',

                                                                }}
                                                            >



                                                                <TextField
                                                                    variant="outlined"
                                                                    label={t('Your Gender')}
                                                                    value={gender}
                                                                    onClick={handleClickGender}
                                                                    onChange={(e) => {
                                                                        const input = e.target;
                                                                        const arabicRegex = /[\u0600-\u06FF]/;
                                                                        input.style.fontFamily = arabicRegex.test(input.value)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif';
                                                                        input.style.fontWeight = '600';
                                                                    }}
                                                                    size="small"
                                                                    className={errors.genderError ? 'shake' : ''}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            color: '#FFFFFF',
                                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                            padding: '0 4px',
                                                                        },
                                                                        shrink: !!gender,
                                                                        sx: {
                                                                            fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                                padding: '0 4px',
                                                                                transform: 'translate(14px, -6px) scale(0.75)', // Ensure label shrinks correctly
                                                                            },
                                                                        },
                                                                    }}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                        style: {
                                                                            color: '#FFFFFF',
                                                                            fontFamily: user?.gender && /[\u0600-\u06FF]/.test(user.gender)
                                                                                ? '"Droid Arabic Kufi", serif'
                                                                                : '"Airbnbcereal", sans-serif',
                                                                            fontWeight: '600',
                                                                        },
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
                                                                    sx={{
                                                                        width: '100%', // Match the width of the Birth Month input
                                                                        flex: 1,
                                                                        '& .MuiOutlinedInput-root': {
                                                                            borderRadius: '8px',
                                                                            color: 'white',
                                                                            backgroundColor: 'transparent',
                                                                            '& fieldset': {
                                                                                borderColor: gender ? '#fff' : '#ff4d4d',
                                                                                borderWidth: gender ? '1px' : '2px',
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: gender ? '#fff' : '#ff4d4d',
                                                                                borderWidth: '2px',
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: gender ? '#fff' : '#ff4d4d',
                                                                                borderWidth: '2px',
                                                                            },
                                                                        },
                                                                        '& .MuiInputLabel-root': {
                                                                            color: '#fff',
                                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                                padding: '0 4px',
                                                                                transform: 'translate(14px, -6px) scale(0.75)', // Ensure label shrinks correctly
                                                                            },
                                                                        },
                                                                        '& .MuiInputLabel-shrink': {
                                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                            padding: '0 4px',
                                                                            zIndex: 1,
                                                                        },
                                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                                            zIndex: 0,
                                                                        },
                                                                        '& .MuiInputAdornment-root': {
                                                                            color: '#fff',
                                                                        },
                                                                    }}
                                                                />


                                                                <Menu
                                                                    anchorEl={anchorElGender}
                                                                    open={openGender}
                                                                    onClose={() => handleCloseGender('')}
                                                                    PaperProps={{
                                                                        style: {
                                                                            background: 'rgba(0, 0, 0, 0.8)',
                                                                            width: isSmallScreen ? '39%' : '18.6%',
                                                                            color: 'white',
                                                                            borderRadius: '8px',
                                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                        },
                                                                    }}
                                                                >
                                                                    <MenuItem onClick={() => handleCloseGender('Male')}  // Update this to use translated value

                                                                        style={{
                                                                            color: '#fff',
                                                                            width: '100%',  // Add this
                                                                            justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                            padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                                        }}>
                                                                        {t('Male')}
                                                                    </MenuItem>
                                                                    <MenuItem onClick={() => handleCloseGender('Female')}
                                                                        style={{
                                                                            color: '#fff',
                                                                            width: '100%',  // Add this
                                                                            justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                            padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',



                                                                        }}>
                                                                        {t('Female')}
                                                                    </MenuItem>
                                                                </Menu>


                                                                {/* Birth Month Input with Menu */}
                                                                <TextField
                                                                    variant="outlined"
                                                                    label={t('Birth Month')}
                                                                    value={birthMonth}
                                                                    onClick={handleClickBirthMonth}
                                                                    onChange={(e) => {
                                                                        const input = e.target;
                                                                        const arabicRegex = /[\u0600-\u06FF]/;
                                                                        input.style.fontFamily = arabicRegex.test(input.value)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif';
                                                                        input.style.fontWeight = '600';

                                                                    }}
                                                                    size="small"
                                                                    className={errors.birthMonthError ? 'shake' : ''}  // Apply shake class based on error
                                                                    InputLabelProps={{
                                                                        style: { color: '#FFFFFF' },
                                                                        shrink: !!birthMonth, // Shrink the label when a value is selected
                                                                        sx: {

                                                                            fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                        }
                                                                    }}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                        style: {
                                                                            color: '#FFFFFF',
                                                                            // Set initial font family based on fetched value
                                                                            fontFamily: user?.birthMonth && /[\u0600-\u06FF]/.test(user.birthMonth)
                                                                                ? '"Droid Arabic Kufi", serif'
                                                                                : '"Airbnbcereal", sans-serif',
                                                                            fontWeight: '600'
                                                                        },
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
                                                                    sx={{
                                                                        width: '110%', // Adjust width to match
                                                                        flex: 1, // Ensures equal space distribution if used with other inputs
                                                                        '& .MuiOutlinedInput-root': {
                                                                            borderRadius: '8px',
                                                                            color: 'white',
                                                                            backgroundColor: 'transparent', // Transparent background
                                                                            '& fieldset': {
                                                                                borderColor: birthMonth ? '#fff' : '#ff4d4d', // Red border when no birth month is selected, white when selected
                                                                                borderWidth: birthMonth ? '1px' : '2px', // Border width adjustment
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: birthMonth ? '#fff' : '#ff4d4d', // Keep red border on hover if birth month not selected
                                                                                borderWidth: '2px', // Set border width to 2px on hover
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: birthMonth ? '#fff' : '#ff4d4d', // Keep red border when focused if birth month not selected
                                                                                borderWidth: '2px', // Set border width to 2px when focused
                                                                            },
                                                                        },
                                                                        '& .MuiInputLabel-root': {
                                                                            color: '#fff',
                                                                            // Add this for better label positioning
                                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                                padding: '0 4px',
                                                                            }
                                                                        },
                                                                        '& .MuiInputAdornment-root': {
                                                                            color: '#fff', // White arrow icon color
                                                                        },
                                                                        '& .MuiInputLabel-shrink': {
                                                                            color: '#fff', // Keep label white when it is shrunk (up)
                                                                        },
                                                                    }}
                                                                />


                                                                <Menu
                                                                    anchorEl={anchorElBirthMonth}
                                                                    open={openBirthMonth}
                                                                    onClose={() => handleCloseBirthMonth('')}
                                                                    PaperProps={{
                                                                        style: {
                                                                            background: 'rgba(0, 0, 0, 0.8)',
                                                                            width: isSmallScreen ? '38%' : '17%',
                                                                            borderRadius: '8px',
                                                                            marginTop: '15px',
                                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                            height: '190px',
                                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                        },
                                                                    }}
                                                                >
                                                                    {/* Menu items for months */}


                                                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                                                        <MenuItem
                                                                            key={month}
                                                                            onClick={() => handleCloseBirthMonth(month)}
                                                                            style={{
                                                                                color: '#fff',
                                                                                width: '100%',  // Add this
                                                                                justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                                padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                                            }}
                                                                        >
                                                                            {t(month)}  {/* Use translation for each month */}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Menu>



                                                            </div>

                                                            <div className="DayYear"
                                                                style={{
                                                                    width: isSmallScreen ? '100%' : '50%',

                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    gap: isSmallScreen ? '16px' : '28px',

                                                                }}
                                                            >
                                                                {/* Borth Day Input with Menu */}
                                                                <TextField
                                                                    variant="outlined"
                                                                    label={t('Birth Day')}
                                                                    value={birthDay}
                                                                    onClick={handleClickBirthDay}
                                                                    onChange={(e) => {



                                                                        const input = e.target;
                                                                        const arabicRegex = /[\u0600-\u06FF]/;
                                                                        input.style.fontFamily = arabicRegex.test(input.value)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif';
                                                                        input.style.fontWeight = '600';

                                                                    }}
                                                                    InputLabelProps={{
                                                                        sx: {

                                                                            fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                        }
                                                                    }}
                                                                    size="small"
                                                                    className={errors.birthDayError ? 'shake' : ''} // Apply shake class based on error
                                                                    sx={{
                                                                        width: '50%', // Adjust width to suit your layout
                                                                        '& .MuiOutlinedInput-root': {
                                                                            borderRadius: '8px',
                                                                            color: 'white',
                                                                            backgroundColor: 'transparent', // Transparent background
                                                                            '& fieldset': {
                                                                                borderColor: errors.birthDayError ? '#ff4d4d' : birthDay ? '#fff' : '#ff4d4d', // Red border if error, white when selected
                                                                                borderWidth: errors.birthDayError ? '2px' : '1px', // Error border width, otherwise 1px
                                                                                borderStyle: 'solid', // Solid border style
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: errors.birthDayError ? '#ff4d4d' : birthDay ? '#fff' : '#ff4d4d', // Border color on hover
                                                                                borderWidth: '2px', // Border width on hover
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: errors.birthDayError ? '#ff4d4d' : birthDay ? '#fff' : '#ff4d4d', // Border color on focus
                                                                                borderWidth: '2px', // Border width when focused
                                                                            },
                                                                        },
                                                                        '& .MuiOutlinedInput-input': {
                                                                            width: '100%', // Ensures the input fills the width
                                                                        },
                                                                        '& .MuiInputLabel-root': {
                                                                            color: '#FFFFFF', // White label color
                                                                            // Add this for better label positioning
                                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                                padding: '0 4px',
                                                                            }
                                                                        },
                                                                    }}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                        style: {
                                                                            color: '#FFFFFF',
                                                                            // Set initial font family based on fetched value
                                                                            fontFamily: user?.birthDay && /[\u0600-\u06FF]/.test(user.birthDay)
                                                                                ? '"Droid Arabic Kufi", serif'
                                                                                : '"Airbnbcereal", sans-serif',
                                                                            fontWeight: '600'
                                                                        },
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
                                                                            width: isSmallScreen ? '38%' : '17.5%',
                                                                            borderRadius: '8px',
                                                                            height: '100px',
                                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                        },
                                                                    }}
                                                                >
                                                                    {Array.from({ length: 31 }, (_, index) => (
                                                                        <MenuItem
                                                                            key={index + 1}
                                                                            onClick={() => handleCloseBirthDay((index + 1).toString())}
                                                                            style={{
                                                                                color: '#fff',
                                                                                width: '100%',  // Add this
                                                                                fontWeight: 'bold',
                                                                                justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                                padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                                fontFamily: '"Airbnbcereal", sans-serif',

                                                                            }}
                                                                        >
                                                                            {index + 1}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Menu>

                                                                {/* Birth Year Input with Menu */}
                                                                <TextField
                                                                    variant="outlined"
                                                                    label={t('Birth Year')}
                                                                    value={birthYear}
                                                                    onClick={handleClickBirthYear}
                                                                    size="small"
                                                                    InputLabelProps={{
                                                                        sx: {

                                                                            fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                            "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                        }
                                                                    }}
                                                                    className={errors.birthYearError ? 'shake' : ''} // Apply shake class based on error state
                                                                    sx={{
                                                                        width: '50%', // Adjust width to suit your layout
                                                                        '& .MuiOutlinedInput-root': {
                                                                            borderRadius: '8px',
                                                                            color: 'white',
                                                                            backgroundColor: 'transparent', // Transparent background
                                                                            '& fieldset': {
                                                                                borderColor: errors.birthYearError ? '#ff4d4d' : birthYear ? '#fff' : '#ff4d4d', // Red border if error, white when selected
                                                                                borderWidth: errors.birthYearError ? '2px' : '1px', // Error border width, otherwise 1px
                                                                                borderStyle: 'solid', // Solid border style
                                                                            },
                                                                            '&:hover fieldset': {
                                                                                borderColor: errors.birthYearError ? '#ff4d4d' : birthYear ? '#fff' : '#ff4d4d', // Border color on hover
                                                                                borderWidth: '2px', // Border width on hover
                                                                            },
                                                                            '&.Mui-focused fieldset': {
                                                                                borderColor: errors.birthYearError ? '#ff4d4d' : birthYear ? '#fff' : '#ff4d4d', // Border color on focus
                                                                                borderWidth: '2px', // Border width when focused
                                                                            },
                                                                        },
                                                                        '& .MuiOutlinedInput-input': {
                                                                            width: '100%', // Ensures the input fills the width
                                                                        },
                                                                        '& .MuiInputLabel-root': {
                                                                            color: '#FFFFFF', // White label color
                                                                            // Add this for better label positioning
                                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                                padding: '0 4px',
                                                                            }
                                                                        },
                                                                    }}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                        style: {
                                                                            color: '#FFFFFF',
                                                                            // Set initial font family based on fetched value
                                                                            fontFamily: user?.birthYear && /[\u0600-\u06FF]/.test(user.birthYear)
                                                                                ? '"Droid Arabic Kufi", serif'
                                                                                : '"Airbnbcereal", sans-serif',
                                                                            fontWeight: '600'
                                                                        },
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
                                                                            width: isSmallScreen ? '38%' : '17.5%',
                                                                            height: '100px',
                                                                            borderRadius: '8px',
                                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

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
                                                                                style={{
                                                                                    color: '#fff',
                                                                                    width: '100%',  // Add this
                                                                                    fontWeight: 'bold',
                                                                                    justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                                    padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                                    fontFamily: '"Airbnbcereal", sans-serif',

                                                                                }}
                                                                            >
                                                                                {year}
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                                </Menu>

                                                            </div>



                                                        </div>
                                                        <div className="Email-Confirm"
                                                            style={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                marginTop: '20px',
                                                                gap: '16px', // Adds spacing between inputs

                                                            }}
                                                        >
                                                            <TextField
                                                                id="outlined-basic"
                                                                label={t('Email')}
                                                                variant="outlined"
                                                                value={formData.email}
                                                                error={errors.emailError}
                                                                onChange={(e) => {

                                                                    handleEmailChange(e);

                                                                    const input = e.target;
                                                                    const arabicRegex = /[\u0600-\u06FF]/;
                                                                    input.style.fontFamily = arabicRegex.test(input.value)
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif';
                                                                    input.style.fontWeight = '600';

                                                                }}
                                                                className={errors.emailError ? 'shake' : ''}
                                                                size="small"
                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    shrink: !!formData.email,
                                                                    sx: {

                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                    }
                                                                }}
                                                                InputProps={{

                                                                    style: {
                                                                        color: '#FFFFFF',
                                                                        // Set initial font family based on fetched value
                                                                        fontFamily: user?.email && /[\u0600-\u06FF]/.test(user.email)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif',
                                                                        fontWeight: '600'
                                                                    },
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
                                                                            borderColor: errors.emailError ? 'red' : '#FFFFFF', // Initial border color
                                                                            borderWidth: '1px', // Default border width
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.emailError ? 'red' : '#fff', // Hover state border color
                                                                            borderWidth: '2px', // Hover border width
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.emailError ? 'red' : '#FFFFFF', // Focused state border color
                                                                        },
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
                                                            />

                                                            <TextField
                                                                id="outlined-basic"
                                                                label={t('Confirmation Email')}
                                                                variant="outlined"
                                                                value={formData.confirmEmail}
                                                                onChange={(e) => {

                                                                    handleConfirmEmailChange(e);

                                                                    const input = e.target;
                                                                    const arabicRegex = /[\u0600-\u06FF]/;
                                                                    input.style.fontFamily = arabicRegex.test(input.value)
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif';
                                                                    input.style.fontWeight = '600';

                                                                }}
                                                                size="small"
                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    shrink: !!formData.confirmEmail,
                                                                    sx: {

                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                    }
                                                                }}
                                                                InputProps={{

                                                                    style: {
                                                                        color: '#FFFFFF',
                                                                        // Set initial font family based on fetched value
                                                                        fontFamily: user?.confirmEmail && /[\u0600-\u06FF]/.test(user.confirmEmail)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif',
                                                                        fontWeight: '600'
                                                                    },
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
                                                                            borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF', // Initial border color
                                                                            borderWidth: '1px', // Default border width
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.confirmEmailError ? 'red' : '#fff', // Hover state border color
                                                                            borderWidth: '2px', // Hover border width
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF', // Focused state border color
                                                                        },
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
                                                            />
                                                        </div>
                                                        <div className="Country-Phone" style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            flexDirection: isSmallScreen ? 'column' : 'unset',
                                                            justifyContent: 'space-between',
                                                            gap: '16px',
                                                            marginTop: '20px',
                                                        }}>
                                                            <TextField
                                                                variant="outlined"
                                                                label={t('Your Country')}
                                                                value={country}
                                                                onClick={handleClickCountry}
                                                                size="small"
                                                                InputLabelProps={{

                                                                    sx: {

                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                    }
                                                                }}
                                                                className={errors.countryError ? 'shake' : ''} // Apply shake class based on error state
                                                                sx={{
                                                                    flex: 1, // Ensures the same width as First Name and Last Name
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: '8px',
                                                                        color: 'white',
                                                                        backgroundColor: 'transparent', // Transparent background
                                                                        '& fieldset': {
                                                                            borderColor: errors.countryError ? '#ff4d4d' : country ? '#fff' : '#ff4d4d', // Red border if error, white when selected
                                                                            borderWidth: country ? '1px' : '2px', // 1px border when selected, 2px when not selected
                                                                            borderStyle: 'solid', // Solid border style
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.countryError ? '#ff4d4d' : country ? '#fff' : '#ff4d4d', // Border color on hover
                                                                            borderWidth: '2px', // Set border width to 2px on hover
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.countryError ? '#ff4d4d' : country ? '#fff' : '#ff4d4d', // Border color on focus
                                                                            borderWidth: '2px', // Set border width to 2px when focused
                                                                        },
                                                                    },
                                                                    '& .MuiInputLabel-root': {
                                                                        color: '#fff', // White label color
                                                                        // Add this for better label positioning
                                                                        '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                            padding: '0 4px',
                                                                        }
                                                                    },
                                                                    '& .MuiInputAdornment-root': {
                                                                        color: '#fff', // White color for the adornment
                                                                    },
                                                                    '& .MuiOutlinedInput-input': {
                                                                        width: '100%', // Ensure full width input field
                                                                    },
                                                                    '& .MuiInputLabel-shrink': {
                                                                        color: '#fff', // White color for the shrinked label
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                    style: {
                                                                        color: '#FFFFFF',
                                                                        // Set initial font family based on fetched value
                                                                        fontFamily: user?.birthDay && /[\u0600-\u06FF]/.test(user.birthDay)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif',
                                                                        fontWeight: '600'
                                                                    },
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
                                                                        width: isSmallScreen ? '78%' : '24.5%',
                                                                        color: 'white',
                                                                        height: '150px',
                                                                        borderRadius: '8px',
                                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                    },
                                                                }}
                                                            >
                                                                {countries.map((country) => (
                                                                    <MenuItem
                                                                        key={country.name}
                                                                        onClick={() => handleCloseCountry(country.name)}
                                                                        style={{
                                                                            color: '#fff',
                                                                            transition: 'transform 0.2s ease-in-out',
                                                                            width: '100%',
                                                                            justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Same as before
                                                                            padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                            display: 'flex', // Use flexbox to align the flag and country name
                                                                            alignItems: 'center', // Center them vertically
                                                                        }}
                                                                        sx={{
                                                                            '&:hover': {
                                                                                transform: 'scale(1.05)',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <div className="div"
                                                                            style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '5px',
                                                                            }}
                                                                        >
                                                                            <Flag
                                                                                code={country.code} // Using the country code from the updated format
                                                                                style={{ width: '20px', height: '15px' }} // No margin here
                                                                            />
                                                                            {/* Country Name */}
                                                                            <span >
                                                                                {t(country.name)} {/* Translated country name */}
                                                                            </span>

                                                                        </div>
                                                                    </MenuItem>
                                                                ))}

                                                            </Menu>

                                                            <TextField
                                                                id="outlined-phone"
                                                                label={t('Phone Number')}
                                                                variant="outlined"
                                                                value={phoneNumber}
                                                                onChange={handleInputChange}
                                                                size="small"
                                                                error={errors.phoneNumberError}
                                                                className={errors.phoneNumberError ? 'shake' : ''}
                                                                InputLabelProps={{
                                                                    style: { color: '#FFFFFF' },
                                                                    sx: {

                                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                                    }
                                                                }}
                                                                InputProps={{

                                                                    style: {
                                                                        color: '#FFFFFF',
                                                                        // Set initial font family based on fetched value
                                                                        fontFamily: user?.birthDay && /[\u0600-\u06FF]/.test(user.birthDay)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif',
                                                                        fontWeight: '600'
                                                                    },
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <span style={{ color: '#fff', marginRight: '8px' }}>{selectedCountryCode}</span>
                                                                        </InputAdornment>
                                                                    ),
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <CountrySelect
                                                                                className="border"
                                                                                value={selectedCountryCode}
                                                                                onChange={handleCountryChange}
                                                                                sx={{
                                                                                    transform: isSmallScreen ? 'translateY(8px)' : 'none',
                                                                                    height: isSmallScreen ? '48px' : 'auto',
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
                                                                    flex: 1, // Ensures the same width as First Name and Last Name
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: '8px',
                                                                        '& fieldset': {
                                                                            borderColor: errors.phoneNumberError ? '#ff4d4d' : phoneNumber ? '#fff' : '#ff4d4d', // Red border if error or not selected
                                                                            borderWidth: phoneNumber ? '1px' : '2px', // 1px border when selected, 2px when not selected
                                                                            borderStyle: 'solid',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: errors.phoneNumberError ? '#ff4d4d' : phoneNumber ? '#fff' : '#ff4d4d', // Border color on hover
                                                                            borderWidth: '2px', // Set border width to 2px on hover
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: errors.phoneNumberError ? '#ff4d4d' : phoneNumber ? '#fff' : '#ff4d4d', // Border color on focus
                                                                            borderWidth: '2px', // Set border width to 2px when focused
                                                                        },
                                                                    },
                                                                    '& .MuiOutlinedInput-input': {
                                                                        width: '100%', // Ensure full width input field
                                                                    },
                                                                    '& .MuiInputLabel-root': {
                                                                        color: '#FFFFFF', // White label color
                                                                        // Add this for better label positioning
                                                                        '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                            padding: '0 4px',
                                                                        }
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </ThemeProvider>
                                            </CacheProvider>
                                        </>


                                    ) : (
                                        <>
                                            <div className="InpitsContainer"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
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
                                                        label={t('First name')}

                                                        variant="outlined"
                                                        defaultValue={user?.firstName || ''}
                                                        size="small"
                                                        inputProps={{
                                                            maxLength: 20  // Add this line
                                                        }}
                                                        onChange={(e) => {

                                                            handleFirstNameInputChange(e);

                                                            const input = e.target;
                                                            const arabicRegex = /[\u0600-\u06FF]/;
                                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif';
                                                            input.style.fontWeight = '600';

                                                        }}
                                                        InputLabelProps={{
                                                            style: { color: '#FFFFFF' },
                                                            shrink: !!user?.firstName,
                                                            sx: {

                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                fontWeight: currentLanguage === 'ar' ? 'bold' : 'normal', // Apply fontWeight conditionally
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                            }
                                                        }}
                                                        InputProps={{
                                                            maxLength: 20,
                                                            style: {
                                                                color: '#FFFFFF',
                                                                maxLength: 20,

                                                                // Set initial font family based on fetched value
                                                                fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '600'
                                                            },
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
                                                                // Add this for input text styling
                                                                '& input': {
                                                                    fontFamily: (theme) => {
                                                                        // Regular expression to detect Arabic characters
                                                                        const arabicRegex = /[\u0600-\u06FF]/;
                                                                        const inputValue = user?.firstName || '';
                                                                        return arabicRegex.test(inputValue)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif';
                                                                    },
                                                                }
                                                            },


                                                            '& .MuiOutlinedInput-input': {
                                                                width: '100%',
                                                                fontSize: '15px',
                                                            },


                                                            '& .MuiInputLabel-root': {
                                                                color: '#FFFFFF',
                                                                transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation


                                                            },
                                                        }}
                                                        className={errors.firstNameError ? 'shake' : ''}
                                                    />
                                                    <TextField
                                                        id="outlined-basic"
                                                        label={t('Last Name')}

                                                        variant="outlined"
                                                        defaultValue={user?.lastName || ''}
                                                        size="small"
                                                        inputProps={{
                                                            maxLength: 20  // Add this line
                                                        }}
                                                        onChange={(e) => {

                                                            handleLastNameInputChange(e);

                                                            const input = e.target;
                                                            const arabicRegex = /[\u0600-\u06FF]/;
                                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif';
                                                            input.style.fontWeight = '600';

                                                        }}
                                                        InputLabelProps={{
                                                            style: { color: '#FFFFFF' },
                                                            shrink: !!user?.firstName,
                                                            sx: {

                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                fontWeight: currentLanguage === 'ar' ? 'bold' : 'normal', // Apply fontWeight conditionally
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                            }
                                                        }}
                                                        InputProps={{
                                                            maxLength: 20,
                                                            style: {
                                                                color: '#FFFFFF',
                                                                maxLength: 20,

                                                                // Set initial font family based on fetched value
                                                                fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '600'
                                                            },
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
                                                                // Add this for input text styling
                                                                '& input': {
                                                                    fontFamily: (theme) => {
                                                                        // Regular expression to detect Arabic characters
                                                                        const arabicRegex = /[\u0600-\u06FF]/;
                                                                        const inputValue = user?.firstName || '';
                                                                        return arabicRegex.test(inputValue)
                                                                            ? '"Droid Arabic Kufi", serif'
                                                                            : '"Airbnbcereal", sans-serif';
                                                                    },
                                                                }
                                                            },


                                                            '& .MuiOutlinedInput-input': {
                                                                width: '100%',
                                                                fontSize: '15px',
                                                            },


                                                            '& .MuiInputLabel-root': {
                                                                color: '#FFFFFF',
                                                                transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation


                                                            },
                                                        }}
                                                        className={errors.firstNameError ? 'shake' : ''}
                                                    />
                                                </div>
                                                <div className="Gender-Birth "

                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        marginTop: '20px',
                                                        flexDirection: isSmallScreen ? 'column' : 'unset',
                                                        gap: '16px',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div className="GenderMonth"
                                                        style={{
                                                            width: isSmallScreen ? '100%' : '50%',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            gap: isSmallScreen ? '16px' : '28px',
                                                        }}
                                                    >


                                                        <TextField
                                                            variant="outlined"
                                                            label={t('Your Gender')}
                                                            value={gender}
                                                            onClick={handleClickGender}
                                                            onChange={(e) => {
                                                                const input = e.target;
                                                                const arabicRegex = /[\u0600-\u06FF]/;
                                                                input.style.fontFamily = arabicRegex.test(input.value)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif';
                                                                input.style.fontWeight = '600';
                                                            }}
                                                            size="small"
                                                            className={errors.genderError ? 'shake' : ''}
                                                            InputLabelProps={{
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                    padding: '2px 6px', // Add padding to separate from the border
                                                                    borderRadius: '4px', // Slightly curve the background
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                                },
                                                                shrink: !!gender,
                                                                sx: {
                                                                    fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    zIndex: 2, // Ensure label stays above the input field
                                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                        padding: '2px 6px',
                                                                    }
                                                                }
                                                            }}

                                                            InputProps={{
                                                                readOnly: true,
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    fontFamily: user?.gender && /[\u0600-\u06FF]/.test(user.gender)
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                    fontWeight: '600'
                                                                },
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
                                                            sx={{
                                                                width: '110%',
                                                                flex: 1,
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    color: 'white',
                                                                    backgroundColor: 'transparent',
                                                                    '& fieldset': {
                                                                        borderColor: gender ? '#fff' : '#ff4d4d',
                                                                        borderWidth: gender ? '1px' : '2px',
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: gender ? '#fff' : '#ff4d4d',
                                                                        borderWidth: '2px',
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: gender ? '#fff' : '#ff4d4d',
                                                                        borderWidth: '2px',
                                                                    },
                                                                },
                                                                '& .MuiInputLabel-root': {
                                                                    color: '#fff',
                                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                        padding: '0 4px',
                                                                        transform: 'translate(14px, -6px) scale(0.75)',
                                                                    }
                                                                },
                                                                '& .MuiInputLabel-shrink': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                    padding: '0 4px',
                                                                    zIndex: 1,
                                                                },
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    zIndex: 0,
                                                                },
                                                                '& .MuiInputAdornment-root': {
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                        />



                                                        <Menu
                                                            anchorEl={anchorElGender}
                                                            open={openGender}
                                                            onClose={() => handleCloseGender('')}
                                                            PaperProps={{
                                                                style: {
                                                                    background: 'rgba(0, 0, 0, 0.9)',
                                                                    width: isSmallScreen ? '39%' : '18.6%',
                                                                    color: 'white',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                },
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => handleCloseGender('Male')}  // Update this to use translated value

                                                                style={{
                                                                    color: '#fff',
                                                                    width: '100%',  // Add this
                                                                    justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                    padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                                    fontWeight: 'bold',


                                                                }}>
                                                                {t('Male')}
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleCloseGender('Female')}
                                                                style={{
                                                                    color: '#fff',
                                                                    width: '100%',  // Add this
                                                                    fontWeight: 'bold',
                                                                    justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                    padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                    fontFamily: '"Airbnbcereal", sans-serif',



                                                                }}>
                                                                {t('Female')}
                                                            </MenuItem>
                                                        </Menu>


                                                        {/* Birth Month Input with Menu */}
                                                        <TextField
                                                            variant="outlined"
                                                            label={t('Birth Month')}
                                                            value={birthMonth}
                                                            onClick={handleClickBirthMonth}
                                                            onChange={(e) => {


                                                                const input = e.target;
                                                                const arabicRegex = /[\u0600-\u06FF]/;
                                                                input.style.fontFamily = arabicRegex.test(input.value)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif';
                                                                input.style.fontWeight = '600';
                                                            }}
                                                            size="small"
                                                            className={errors.birthMonthError ? 'shake' : ''}  // Apply shake class based on error
                                                            InputLabelProps={{
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                    padding: '2px 6px', // Add padding to separate from the border
                                                                    borderRadius: '4px', // Slightly curve the background
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                                },
                                                                shrink: !!birthMonth,
                                                                sx: {
                                                                    fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    zIndex: 2, // Ensure label stays above the input field
                                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                        padding: '2px 6px',
                                                                    }
                                                                }
                                                            }}
                                                            InputProps={{
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    readOnly: true,
                                                                    // Set initial font family based on fetched value
                                                                    fontFamily: user?.birthMonth && /[\u0600-\u06FF]/.test(user.birthMonth)
                                                                        ? '"Droid Arabic Kufi", serif'
                                                                        : '"Airbnbcereal", sans-serif',
                                                                    fontWeight: '600'
                                                                },
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
                                                            sx={{
                                                                width: '110%', // Adjust width to match
                                                                flex: 1, // Ensures equal space distribution if used with other inputs
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    color: 'white',
                                                                    backgroundColor: 'transparent', // Transparent background
                                                                    '& fieldset': {
                                                                        borderColor: birthMonth ? '#fff' : '#ff4d4d', // Red border when no birth month is selected, white when selected
                                                                        borderWidth: birthMonth ? '1px' : '2px', // Border width adjustment
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: birthMonth ? '#fff' : '#ff4d4d', // Keep red border on hover if birth month not selected
                                                                        borderWidth: '2px', // Set border width to 2px on hover
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: birthMonth ? '#fff' : '#ff4d4d', // Keep red border when focused if birth month not selected
                                                                        borderWidth: '2px', // Set border width to 2px when focused
                                                                    },
                                                                },
                                                                '& .MuiInputLabel-root': {
                                                                    color: '#fff',
                                                                    transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                                },
                                                                '& .MuiInputAdornment-root': {
                                                                    color: '#fff', // White arrow icon color
                                                                },
                                                                '& .MuiInputLabel-shrink': {
                                                                    color: '#fff', // Keep label white when it is shrunk (up)
                                                                },
                                                            }}
                                                        />


                                                        <Menu
                                                            anchorEl={anchorElBirthMonth}
                                                            open={openBirthMonth}
                                                            onClose={() => handleCloseBirthMonth('')}
                                                            PaperProps={{
                                                                style: {
                                                                    background: 'rgba(0, 0, 0, 0.9)',
                                                                    width: isSmallScreen ? '39%' : '17%',
                                                                    borderRadius: '8px',
                                                                    marginTop: '15px',
                                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                    height: '190px',
                                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                },
                                                            }}
                                                        >
                                                            {/* Menu items for months */}


                                                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                                                <MenuItem
                                                                    key={month}
                                                                    onClick={() => handleCloseBirthMonth(month)}
                                                                    style={{
                                                                        color: '#fff',
                                                                        width: '100%',  // Add this
                                                                        fontWeight: 'bold',
                                                                        justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                        padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                                    }}
                                                                >
                                                                    {t(month)}  {/* Use translation for each month */}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>



                                                    </div>

                                                    <div className="DayYear"
                                                        style={{
                                                            width: isSmallScreen ? '100%' : '50%',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            gap: isSmallScreen ? '16px' : '28px',
                                                        }}
                                                    >
                                                        {/* Borth Day Input with Menu */}
                                                        <TextField
                                                            variant="outlined"
                                                            label={t('Birth Day')}
                                                            value={birthDay}
                                                            onClick={handleClickBirthDay}
                                                            InputLabelProps={{
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                    padding: '2px 6px', // Add padding to separate from the border
                                                                    borderRadius: '4px', // Slightly curve the background
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                                },
                                                                shrink: !!birthDay,
                                                                sx: {
                                                                    fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    zIndex: 2, // Ensure label stays above the input field
                                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                        padding: '2px 6px',
                                                                    }
                                                                }
                                                            }}
                                                            size="small"
                                                            className={errors.birthDayError ? 'shake' : ''} // Apply shake class based on error
                                                            sx={{
                                                                width: '50%', // Adjust width to suit your layout
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    color: 'white',
                                                                    backgroundColor: 'transparent', // Transparent background
                                                                    '& fieldset': {
                                                                        borderColor: errors.birthDayError ? '#ff4d4d' : birthDay ? '#fff' : '#ff4d4d', // Red border if error, white when selected
                                                                        borderWidth: errors.birthDayError ? '2px' : '1px', // Error border width, otherwise 1px
                                                                        borderStyle: 'solid', // Solid border style
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: errors.birthDayError ? '#ff4d4d' : birthDay ? '#fff' : '#ff4d4d', // Border color on hover
                                                                        borderWidth: '2px', // Border width on hover
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: errors.birthDayError ? '#ff4d4d' : birthDay ? '#fff' : '#ff4d4d', // Border color on focus
                                                                        borderWidth: '2px', // Border width when focused
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-input': {
                                                                    width: '100%', // Ensures the input fills the width
                                                                },
                                                                '& .MuiInputLabel-root': {
                                                                    color: '#FFFFFF', // White label color
                                                                    transform: currentLanguage === 'ar' ? 'translate(8px, -15px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                                },
                                                            }}
                                                            InputProps={{
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    // Set initial font family based on fetched value
                                                                    fontFamily:

                                                                        '"Airbnbcereal", sans-serif',
                                                                    fontWeight: '600'
                                                                },
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton onClick={handleClickBirthDay} edge="end">
                                                                            {openBirthDay ? (
                                                                                <   KeyboardArrowUpIcon sx={{ color: '#fff' }} />
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
                                                                    background: 'rgba(0, 0, 0, 0.9)',
                                                                    width: isSmallScreen ? '38%' : '17.5%',
                                                                    borderRadius: '8px',
                                                                    height: '100px',
                                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

                                                                },
                                                            }}
                                                        >
                                                            {Array.from({ length: 31 }, (_, index) => (
                                                                <MenuItem
                                                                    key={index + 1}
                                                                    onClick={() => handleCloseBirthDay((index + 1).toString())}
                                                                    style={{
                                                                        color: '#fff',
                                                                        width: '100%',  // Add this
                                                                        fontWeight: 'bold',
                                                                        justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                        padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                        fontFamily: '"Airbnbcereal", sans-serif',

                                                                    }}
                                                                >
                                                                    {index + 1}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>

                                                        {/* Birth Year Input with Menu */}
                                                        <TextField
                                                            variant="outlined"
                                                            label={t('Birth Year')}
                                                            value={birthYear}
                                                            onClick={handleClickBirthYear}
                                                            size="small"
                                                            InputLabelProps={{
                                                                style: {
                                                                    color: '#FFFFFF',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                    padding: '2px 6px', // Add padding to separate from the border
                                                                    borderRadius: '4px', // Slightly curve the background
                                                                    transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                                },
                                                                shrink: !!birthYear,
                                                                sx: {
                                                                    fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    zIndex: 2, // Ensure label stays above the input field
                                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                        padding: '2px 6px',
                                                                    }
                                                                }
                                                            }}
                                                            className={errors.birthYearError ? 'shake' : ''} // Apply shake class based on error state
                                                            sx={{
                                                                width: '50%', // Adjust width to suit your layout
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    color: 'white',
                                                                    backgroundColor: 'transparent', // Transparent background
                                                                    '& fieldset': {
                                                                        borderColor: errors.birthYearError ? '#ff4d4d' : birthYear ? '#fff' : '#ff4d4d', // Red border if error, white when selected
                                                                        borderWidth: errors.birthYearError ? '2px' : '1px', // Error border width, otherwise 1px
                                                                        borderStyle: 'solid', // Solid border style
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: errors.birthYearError ? '#ff4d4d' : birthYear ? '#fff' : '#ff4d4d', // Border color on hover
                                                                        borderWidth: '2px', // Border width on hover
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: errors.birthYearError ? '#ff4d4d' : birthYear ? '#fff' : '#ff4d4d', // Border color on focus
                                                                        borderWidth: '2px', // Border width when focused
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-input': {
                                                                    width: '100%', // Ensures the input fills the width
                                                                },
                                                                '& .MuiInputLabel-root': {
                                                                    color: '#FFFFFF', // White label color
                                                                    transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                                },
                                                            }}
                                                            InputProps={{
                                                                style: {
                                                                    readOnly: true,
                                                                    // Set initial font family based on fetched value
                                                                    fontFamily:

                                                                        '"Airbnbcereal", sans-serif',
                                                                    fontWeight: '600'
                                                                },
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
                                                                    background: 'rgba(0, 0, 0, 0.9)',
                                                                    width: isSmallScreen ? '38%' : '17.5%',
                                                                    height: '100px',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line

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
                                                                        style={{
                                                                            color: '#fff',
                                                                            width: '100%',  // Add this
                                                                            fontWeight: 'bold',
                                                                            justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Add this
                                                                            padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                            fontFamily: '"Airbnbcereal", sans-serif',

                                                                        }}
                                                                    >
                                                                        {year}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </Menu>


                                                    </div>



                                                </div>
                                                <div className="Email-Confirm"
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginTop: '20px',
                                                        gap: '16px', // Adds spacing between inputs

                                                    }}
                                                >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label={t('Email')}
                                                        variant="outlined"
                                                        value={formData.email}
                                                        error={errors.emailError}
                                                        onChange={(e) => {
                                                            handleEmailChange(e);

                                                            const input = e.target;
                                                            const arabicRegex = /[\u0600-\u06FF]/;
                                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif';
                                                            input.style.fontWeight = '600';
                                                        }}
                                                        className={errors.emailError ? 'shake' : ''}
                                                        size="small"
                                                        InputLabelProps={{
                                                            style: {
                                                                color: '#FFFFFF',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                padding: '2px 6px', // Add padding to separate from the border
                                                                borderRadius: '4px', // Slightly curve the background
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                            },
                                                            shrink: !!formData.email,
                                                            sx: {
                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                zIndex: 2, // Ensure label stays above the input field
                                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                    padding: '2px 6px',
                                                                }
                                                            }
                                                        }}
                                                        InputProps={{
                                                            className: errors.emailError ? 'shake' : '',
                                                            style: {
                                                                color: '#FFFFFF',
                                                                // Set initial font family based on fetched value
                                                                fontFamily: user?.email && /[\u0600-\u06FF]/.test(user.email)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '600'
                                                            },
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
                                                                    borderColor: errors.emailError ? 'red' : '#FFFFFF', // Initial border color
                                                                    borderWidth: formData.email ? '2px' : '1px', // Default border width
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.emailError ? 'red' : '#fff', // Hover state border color
                                                                    borderWidth: '2px', // Hover border width
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.emailError ? 'red' : '#FFFFFF', // Focused state border color
                                                                },
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: '#FFFFFF',
                                                                transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                            },
                                                        }}
                                                    />

                                                    <TextField
                                                        id="outlined-basic"
                                                        label={t('Confirmation Email')}
                                                        variant="outlined"
                                                        value={formData.confirmEmail}
                                                        onChange={(e) => {
                                                            handleConfirmEmailChange(e);

                                                            const input = e.target;
                                                            const arabicRegex = /[\u0600-\u06FF]/;
                                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif';
                                                            input.style.fontWeight = '600';
                                                        }}
                                                        size="small"
                                                        InputLabelProps={{
                                                            style: {
                                                                color: '#FFFFFF',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                padding: '2px 6px', // Add padding to separate from the border
                                                                borderRadius: '4px', // Slightly curve the background
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                            },
                                                            shrink: !!formData.confirmEmail,
                                                            sx: {
                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                zIndex: 2, // Ensure label stays above the input field
                                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                    padding: '2px 6px',
                                                                }
                                                            }
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                color: '#FFFFFF',
                                                                // Set initial font family based on fetched value
                                                                fontFamily: user?.confirmEmail && /[\u0600-\u06FF]/.test(user.confirmEmail)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '600'
                                                            },
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
                                                                    borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF', // Initial border color
                                                                    borderWidth: formData.confirmEmail ? '2px' : '1px', // Default border width
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.confirmEmailError ? 'red' : '#fff', // Hover state border color
                                                                    borderWidth: '2px', // Hover border width
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.confirmEmailError ? 'red' : '#FFFFFF', // Focused state border color
                                                                },
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: '#FFFFFF',
                                                                transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                            },
                                                        }}
                                                    />
                                                </div>

                                                <div className="Country-Phone" style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: isSmallScreen ? 'column' : 'unset',
                                                    justifyContent: 'space-between',
                                                    gap: '16px',
                                                    marginTop: '20px',
                                                }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label={t('Your Country')}
                                                        value={country}
                                                        onClick={handleClickCountry}
                                                        onChange={(e) => {

                                                            const input = e.target;
                                                            const arabicRegex = /[\u0600-\u06FF]/;
                                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif';
                                                            input.style.fontWeight = '600';
                                                        }}
                                                        size="small"
                                                        InputLabelProps={{
                                                            style: {
                                                                color: '#FFFFFF',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ensure label has a solid background
                                                                padding: '2px 6px', // Add padding to separate from the border
                                                                borderRadius: '4px', // Slightly curve the background
                                                                transform: 'translate(14px, -6px) scale(0.75)', // Adjust position
                                                            },
                                                            shrink: !!country,
                                                            sx: {
                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                zIndex: 2, // Ensure label stays above the input field
                                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                    padding: '2px 6px',
                                                                }
                                                            }
                                                        }}
                                                        className={errors.countryError ? 'shake' : ''} // Apply shake class based on error state
                                                        sx={{
                                                            flex: 1, // Ensures the same width as First Name and Last Name
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                color: 'white',
                                                                backgroundColor: 'transparent', // Transparent background
                                                                '& fieldset': {
                                                                    borderColor: errors.countryError ? '#ff4d4d' : country ? '#fff' : '#ff4d4d', // Red border if error, white when selected
                                                                    borderWidth: country ? '1px' : '2px', // 1px border when selected, 2px when not selected
                                                                    borderStyle: 'solid', // Solid border style
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.countryError ? '#ff4d4d' : country ? '#fff' : '#ff4d4d', // Border color on hover
                                                                    borderWidth: '2px', // Set border width to 2px on hover
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.countryError ? '#ff4d4d' : country ? '#fff' : '#ff4d4d', // Border color on focus
                                                                    borderWidth: '2px', // Set border width to 2px when focused
                                                                },
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: '#fff', // White label color
                                                                transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                            },
                                                            '& .MuiInputAdornment-root': {
                                                                color: '#fff', // White color for the adornment
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                width: '100%', // Ensure full width input field
                                                            },
                                                            '& .MuiInputLabel-shrink': {
                                                                color: '#fff', // White color for the shrinked label
                                                            },
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                readOnly: true,
                                                                // Set initial font family based on fetched value
                                                                fontFamily: user?.country && /[\u0600-\u06FF]/.test(user.country)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '600'
                                                            },
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
                                                                background: 'rgba(0, 0, 0, 0.9)',
                                                                width: isSmallScreen ? '80%' : '24.5%',
                                                                color: 'white',
                                                                height: '150px',
                                                                borderRadius: '8px',
                                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                            },
                                                        }}
                                                    >
                                                        {countries.map((country) => (
                                                            <MenuItem
                                                                key={country.name}
                                                                onClick={() => handleCloseCountry(country.name)}
                                                                style={{
                                                                    color: '#fff',
                                                                    transition: 'transform 0.2s ease-in-out',
                                                                    width: '100%',
                                                                    justifyContent: currentLanguage === 'ar' ? 'flex-start' : 'flex-start', // Same as before
                                                                    padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                                    display: 'flex', // Use flexbox to align the flag and country name
                                                                    alignItems: 'center', // Center them vertically
                                                                }}
                                                                sx={{
                                                                    '&:hover': {
                                                                        transform: 'scale(1.05)',
                                                                    },
                                                                }}
                                                            >
                                                                <div className="div"
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '5px',
                                                                    }}
                                                                >
                                                                    <Flag
                                                                        code={country.code} // Using the country code from the updated format
                                                                        style={{ width: '20px', height: '15px' }} // No margin here
                                                                    />
                                                                    {/* Country Name */}
                                                                    <span style={{
                                                                        fontFamily: '"Airbnbcereal", sans-serif',
                                                                        fontWeight: 'bold',

                                                                    }} >
                                                                        {t(country.name)} {/* Translated country name */}
                                                                    </span>

                                                                </div>
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>

                                                    <TextField
                                                        id="outlined-phone"
                                                        label={t('Phone Number')}
                                                        variant="outlined"
                                                        value={phoneNumber}
                                                        onChange={(e) => {
                                                            handleInputChange(e);

                                                            const input = e.target;
                                                            const arabicRegex = /[\u0600-\u06FF]/;
                                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif';
                                                            input.style.fontWeight = '600';
                                                        }}
                                                        size="small"
                                                        error={errors.phoneNumberError}
                                                        className={errors.phoneNumberError ? 'shake' : ''}
                                                        InputLabelProps={{
                                                            style: { color: '#FFFFFF' },
                                                            sx: {

                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px', // Apply fontSize conditionally
                                                                fontWeight: currentLanguage === 'ar' ? 'bold' : 'normal', // Apply fontWeight conditionally
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', // Apply fontFamily conditionally

                                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                            }
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                color: '#FFFFFF',
                                                                // Set initial font family based on fetched value
                                                                fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                                fontWeight: '600'
                                                            },
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <span style={{ color: '#fff', marginRight: '8px' }}>{selectedCountryCode}</span>
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <CountrySelect
                                                                        className="border"
                                                                        value={selectedCountryCode}
                                                                        onChange={handleCountryChange}
                                                                        sx={{
                                                                            transform: isSmallScreen ? 'translateY(8px)' : 'none',
                                                                            height: isSmallScreen ? '48px' : 'auto',
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
                                                            flex: 1, // Ensures the same width as First Name and Last Name
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '& fieldset': {
                                                                    borderColor: errors.phoneNumberError ? '#ff4d4d' : phoneNumber ? '#fff' : '#ff4d4d', // Red border if error or not selected
                                                                    borderWidth: phoneNumber ? '1px' : '2px', // 1px border when selected, 2px when not selected
                                                                    borderStyle: 'solid',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.phoneNumberError ? '#ff4d4d' : phoneNumber ? '#fff' : '#ff4d4d', // Border color on hover
                                                                    borderWidth: '2px', // Set border width to 2px on hover
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.phoneNumberError ? '#ff4d4d' : phoneNumber ? '#fff' : '#ff4d4d', // Border color on focus
                                                                    borderWidth: '2px', // Set border width to 2px when focused
                                                                },
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                width: '100%', // Ensure full width input field
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: '#FFFFFF', // White label color
                                                                transform: currentLanguage === 'ar' ? 'translate(10px, -14px) scale(0.75)' : 'translate(14px, -9px) scale(0.75)', // Apply the transformation

                                                            },
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </>

                                    )}
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
                                                opacity: isLoading ? '0.5' : 'unset',
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
                                                    {t('Update Account info')}
                                                </Typography>
                                            )}
                                        </Button>

                                    </div>
                                </>
                            )}

                            {
                                error && (
                                    // Error message if no connection or data fetch fails
                                    <div className="error-message border">
                                        <h2>Oops!</h2>
                                        <p>{error}</p>
                                        <button>Try Again</button>
                                    </div>
                                )
                            }


                        </div>





                    </div>
                    <div className="Change-Password"
                        style={{
                            width: '100%',
                            height: 'auto',
                            padding: '10px',
                            display: 'flex',
                            flexWrap: 1,
                            gap: '2px',
                        }}
                    >
                        <div className="MainContainer"

                            style={{
                                width: '100%',
                                height: 'auto',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                backgroundClip: 'border-box',


                            }}
                        >
                            <ProfileChangePassword setIsPasswordUpdatedOpen={setIsPasswordUpdatedOpen} />

                        </div>





                    </div>

                </div>
            )}

            {selectedSection === "Notification" && (

                <div className="NotificationsContainer"
                    style={{
                        width: '100%',
                        height: 'auto',
                        padding: '10px',

                    }}
                >

                    <Notifications setSelectedSection={setSelectedSection} />
                </div>
            )}

            {selectedSection === "Security" && (

                <div className="SecurityContainer"
                    style={{
                        width: '100%',
                        height: 'auto',
                        padding: '10px',

                    }}
                >

                    <Security
                        handleOpenPhoneCode={handleOpenPhoneCode}
                        handleOpenNewEmail={handleOpenNewEmail}

                    />
                </div>
            )}




        </div>
    )
}

export default AccountSettings