import { Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Created from '../../assets/images/small-logos/Created.json';
import Lottie from 'lottie-react';
import DOMPurify from 'dompurify';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import GoogleRegister from './GoogleRegister';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import SignupMobile from './SignupMobile';
import FacebookRegister from '../Signup/FacebookRegister';
import AccountCreation from './AccountCreation';
import { width } from '@mui/system';









function Signup() {


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


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const navigate = useNavigate();

  // Function to handle click and trigger animation
  const handleLoginRedirect = () => {

    navigate('/auth/signin');

  };

  // State to track input values and errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isBuyerSelected: false,
    selectedOptions: {},
  });


  const [showNewDesign, setShowNewDesign] = useState(false);

  const [isBuyerSelected, setIsBuyerSelected] = useState(true);
  const [selectionError, setSelectionError] = useState(''); // Error message state










  const toggleSelection = () => {
    setIsBuyerSelected((prev) => !prev);
  };


  const totalSteps = 3; // Define total number of steps

  const handlePreviousStep = () => {
    if (currentStep > 1) { // Allow going back from step 2 onwards
      setCurrentStep((prevStep) => prevStep - 1); // Decrease step number
      if (currentStep === 2) {
        setShowStep2Inputs(false); // Hide step 2 inputs if going back
        setShowStep1Inputs(true);
      }
    }
  };
  const handleThirdPreviousStep = () => {
    if (currentStep > 1) { // Allow going back from step 2 onwards
      setCurrentStep((prevStep) => prevStep - 1); // Decrease step number
      if (currentStep === 3) {
        setShowStep3Inputs(false); // Hide step 2 inputs if going back
        setAnimationDirectionSecond('slide-from-leftSecond ');
        setShowStep2Inputs(true);
      }
    }
  };
  const [serverError, setServerError] = useState(''); // State to store server error message
  const [serverError2, setServerError2] = useState(''); // State to store server error message

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Start from Step 1

  // Function to handle buyer/seller selection
  const handleSelectionChange = (isBuyer) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isBuyerSelected: isBuyer, // Update selection
    }));
  };








  const [showStep1Inputs, setShowStep1Inputs] = useState(true);
  const [showStep2Inputs, setShowStep2Inputs] = useState(false);
  const [showStep3Inputs, setShowStep3Inputs] = useState(false);
  const [showLastStepDesign, setShowLastStepDesign] = useState(false);
  const [showThirdStepDesign, setShowThirdStepDesign] = useState(false);


  const handleBackToSecondStep = () => {
    if (currentStep === 3) {
      setCurrentStep((prevStep) => prevStep - 1); // Go back to the second step
      setShowThirdStepDesign(false); // Hide the third step design
      setAnimationDirectionSecond('slide-from-leftSecond ');
      setShowNewDesign(true); // Show the second step design
    }
  };


  const [animationDirectionSecond, setAnimationDirectionSecond] = useState('slide-from-right');

  const [isSelected, setIsSelected] = useState(false);


  // User Intereset

  const [selectedDivs, setSelectedDivs] = useState({
    group1: [], // Empty array means no divs selected initially
    group2: [],
    group3: [],
    group4: [],
    group5: [],
  });







  const handleDivClick = (group, label) => {
    // Sanitize the label to ensure no malicious content is included
    const sanitizedLabel = DOMPurify.sanitize(label);

    const isSelected = selectedDivs[group].includes(sanitizedLabel);

    const newSelection = isSelected
      ? selectedDivs[group].filter(item => item !== sanitizedLabel) // Remove if already selected
      : [...selectedDivs[group], sanitizedLabel]; // Add if not selected

    const totalSelections = Object.values({ ...selectedDivs, [group]: newSelection }).flat().length;

    // Check if the total selections exceed the limit
    if (totalSelections > 4 && !isSelected) {
      setServerError2(t('You can select a maximum of 4 options.'));
      return;
    }

    // Clear error if at least one div is selected
    if (totalSelections > 0) {
      setServerError(t('')); // Clear the "at least 1 div" error message
    }

    setServerError2(''); // Clear the maximum selection error message

    setSelectedDivs((prev) => ({
      ...prev,
      [group]: newSelection,
    }));
  };





  const renderDiv = (group, index, imgSrc, label) => {
    const sanitizedLabel = DOMPurify.sanitize(label); // Optional: If you want to ensure label is sanitized before rendering

    const isSelected = selectedDivs[group].includes(sanitizedLabel); // Now using `sanitizedLabel`
    const totalSelections = Object.values(selectedDivs).flat().length;

    return (
      <div
        onClick={() => handleDivClick(group, sanitizedLabel)} // Use sanitized label here
        style={{
          width: '32%',
          height: '110px',
          border: isSelected ? '2px solid green' : '2px solid #0072ff',
          borderRadius: '16px',
          padding: '8px',
          boxSizing: 'border-box',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.3s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isSelected && (
          <CheckCircleIcon
            style={{
              position: 'absolute',
              top: '-12%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '24px',
            }}
          />
        )}
        <div
          style={{
            height: '100%',
            background: '#111827',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <img width={40} src={imgSrc} alt={sanitizedLabel} />
          <Typography style={{
            color: 'white',
            fontSize: '13px',
            textAlign: 'center',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
          }}>
            {sanitizedLabel} {/* Use sanitized label to display name */}
          </Typography>
        </div>
      </div>
    );
  };


  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleNextStep = async () => {
    setServerError(''); // Clear previous server errors
    setServerError2(''); // Clear other error messages (if applicable)
    setIsLoading(true); // Start loading state

    const namePattern = /^[A-Za-z\s]+$/; // Only allow letters and spaces for names
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password: Min 8 chars, 1 number, 1 special char

    const sanitizedFormData = {
      firstName: DOMPurify.sanitize(formData.firstName),
      lastName: DOMPurify.sanitize(formData.lastName),
      email: DOMPurify.sanitize(formData.email),
      password: DOMPurify.sanitize(formData.password),
      isBuyerSelected: formData.isBuyerSelected,
      selectedOptions: Object.values(selectedDivs).flat(),
    };

    const errors = {
      firstName: sanitizedFormData.firstName === '',
      lastName: sanitizedFormData.lastName === '',
      email: sanitizedFormData.email === '',
      password: sanitizedFormData.password === '',
    };

    setInputErrors(errors);

    // Validate inputs
    if (Object.values(errors).some((error) => error)) {
      setServerError(t('All fields are required.'));
      setIsLoading(false);
      return;
    }

    if (!namePattern.test(sanitizedFormData.firstName)) {
      setInputErrors((prevErrors) => ({ ...prevErrors, firstName: true }));
      setServerError(t('First name can only contain letters and spaces.'));
      setIsLoading(false);
      return;
    }

    if (!namePattern.test(sanitizedFormData.lastName)) {
      setInputErrors((prevErrors) => ({ ...prevErrors, lastName: true }));
      setServerError(t('Last name can only contain letters and spaces.'));
      setIsLoading(false);
      return;
    }

    if (!emailPattern.test(sanitizedFormData.email)) {
      setInputErrors((prevErrors) => ({ ...prevErrors, email: true }));
      setServerError(t('Please enter a valid email address.'));
      setIsLoading(false);
      return;
    }

    if (!passwordPattern.test(sanitizedFormData.password)) {
      setInputErrors((prevErrors) => ({ ...prevErrors, password: true }));
      setServerError(
        <Typography
          className="password-error"
          style={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'red',
            fontSize: '15px',
            marginTop: '1px',
            marginBottom: showStep3Inputs ? '-10px' : '5px',
            zIndex: '1',
          }}
        >
          {t('Password must be at least 8 characters long.')}
          <span style={{ display: 'block' }}>{t('Contain at least one number.')}</span>
          <span style={{ display: 'block' }}>{t('Contain at least one special character.')}</span>
        </Typography>
      );
      setIsLoading(false);
      return;
    }

    if (!isCheckboxChecked) {
      setServerError('You must agree to the terms to proceed.');
      setIsLoading(false);
      return; // Prevent moving to the next step
    }

    if (typeof sanitizedFormData.isBuyerSelected !== 'boolean') {
      setServerError(t('Please select whether you are a Buyer or Seller.'));
      setIsLoading(false);
      return;
    }

    const totalSelections = Object.values(selectedDivs).flat().length;
    if (currentStep === 3 && totalSelections < 1) {
      setServerError2(t('Select at least 1 option to proceed.'));
      setIsLoading(false);
      return;
    }

    try {
      // Only check email in step 1
      if (currentStep === 1) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/server/auth/check-email`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: sanitizedFormData.email }),
            credentials: 'include' 
          }
        );

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 400) {
            setInputErrors((prevErrors) => ({ ...prevErrors, email: true }));
            setServerError(data.message);
          } else {
            setServerError(t('An error occurred while checking the email.'));
          }
          setIsLoading(false);
          return; // Exit if there's an error
        }
      }

      // Register user only at the final step
      if (currentStep === 3) {
        const registerResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/server/auth/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sanitizedFormData),
          }
        );

        const registerData = await registerResponse.json();

        if (registerResponse.status === 201) {
          navigate('/auth/AccountCreation')
          console.log('Registration successful:', registerData);

          // Store token and user data in localStorage or sessionStorage
          if (registerData.accessToken) {
            localStorage.setItem('user', JSON.stringify(registerData.user));
            localStorage.setItem('accessToken', registerData.accessToken);
          } else {
            console.error('Token not found in response');
          }

          // Redirect to dashboard
          setShowStep3Inputs(false);

          setCurrentStep(currentStep + 1);
        } else if (registerResponse.status === 429) {
          setServerError(t('You have reached the registration limit. Please try again later.'));
          setIsLoading(false);
          return; // Exit after error
        } else {
          setServerError(registerData.message || 'An error occurred during registration.');
          setIsLoading(false);
          return; // Exit after error
        }
      }

      // Move between steps when the user is not on the last step
      if (currentStep < 3) {
        switch (currentStep) {
          case 1:
            setShowStep1Inputs(false);
            setAnimationDirectionSecond('slide-from-right');
            setShowStep2Inputs(true);
            break;
          case 2:
            setShowStep2Inputs(false);
            setShowStep3Inputs(true);
            break;
          default:
            console.log('Maximum step reached.');
        }
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setServerError(t('An unexpected error occurred. Please check your connection.'));
    } finally {
      setIsLoading(false); // Ensure loading state is reset after all operations
    }
  };




  const [showNormalForm, setShowNormalForm] = useState(true); // State to control the normal form visibility
  const [showGoogleForm, setShowGoogleForm] = useState(false); // State to control the Google form visibility
  const [showSignupMobile, setShowSignupMobile] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data from Google

  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

  useEffect(() => {
    setShowSignupMobile(isSmallScreen);
  }, [isSmallScreen]);

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleFacebookResponse = (profile) => {
    setUserData({
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      email: profile.email || '',
      facebookId: profile.id
    });
  };





  const [hasAuthenticated, setHasAuthenticated] = useState(false);
  const [facebookReg, setFacebookReg] = useState(false);


  // Initialize FB SDK
  useEffect(() => {
    const initFB = () => {
      if (window.FB) return;

      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };
      document.body.appendChild(script);
    };

    initFB();
  }, []);

  const handleRegister = () => {
    setIsLoading(true);

    window.FB.login(response => {
      if (response.authResponse) {
        window.FB.api('/me',
          { fields: 'first_name,last_name,email' },
          (profile) => {
            handleFacebookResponse(profile);
            setShowNormalForm(false);
            setFacebookReg(true);




            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
        console.log('User cancelled registration');
      }
    }, { scope: 'email,public_profile' });
  };


  const handleGoogleRegisterClick = () => {
    /* Google OAuth2 Client ID */
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
    /* Open Google's Authentication Popup */
    google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (response) => {
        if (response.access_token) {
          fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((user) => {
              // Update state with user data
              setUserData({
                googleId: user.sub,
                firstName: user.given_name,
                lastName: user.family_name,
                email: user.email,
              });
  
              // Hide normal form & show Google form
              setShowNormalForm(false);
              setShowGoogleForm(true);
            })
            .catch((err) => console.error("Error fetching Google user data:", err));
        }
      },
    }).requestAccessToken();
  };

  return (

    <>
      {showSignupMobile ? (
        <SignupMobile />
      ) : (
        <div className='Container'
          style={{
            width: isSmallScreen ? '100%' : '80%',
            height: isSmallScreen ? '100vh' : '90vh',
            maxHeight: '800px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
            display: 'flex',
            padding: '10px',

          }}
        >
          <div className="Cover slide-from-right"
            style={{
              width: isSmallScreen ? '100%' : '50%',
              height: '100%',
              borderRadius: '16px',
              backgroundImage: `url('/images/signup.png')`,
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

          <div className="SignUp slide-from-right"
            style={{

              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >

            {showNormalForm && (
              <div className="Container slide-from-downToUp"
                style={{
                  width: isMediumScreen ? '70%' : '60%',  // Full width of the parent
                  maxWidth: '600px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start', // Keep items aligned to the start (left)
                  justifyContent: 'center', // Center content vertically if necessary
                  marginLeft: 'auto',  // Auto margins for centering horizontally
                  marginRight: 'auto', // Auto margins for centering horizontally
                  position: 'relative',
                  overflow: 'hidden',
                  height: 'auto', // Allow the container to adjust based on content height
                }}
              >
                <div className="StepBackNormal"
                  style={{
                    display: showStep2Inputs ? 'flex' : 'none',
                    width: '100%',
                  }}
                >
                  <Button
                    variant="outlined"
                    className="btn-grad"
                    sx={{
                      width: '100%',
                      height: '38px',
                      position: 'relative',
                      marginRight: currentLanguage === 'ar' ? 'unset' : '10px',
                      borderColor: 'none',
                      display: 'flex', // Use flexbox to align children
                      justifyContent: 'center', // Center horizontally
                      alignItems: 'center', // Center vertically
                      padding: '0 10px', // Add horizontal padding if needed
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    onClick={handlePreviousStep}
                  >
                    {currentLanguage === 'ar' ? (
                      <>
                        <Typography
                          sx={{
                            color: 'white',
                            fontFamily: '"Droid Arabic Kufi", serif',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            textAlign: 'center',
                            fontSize: '13px',
                            marginLeft: '8px', // Add space between text and icon
                          }}
                        >
                          {t('Previous Step')}
                        </Typography>
                        <ArrowBackIcon sx={{ color: 'white' }} />
                      </>
                    ) : (
                      <>
                        <ArrowBackIcon sx={{ color: 'white', marginRight: '8px' }} />
                        <Typography
                          sx={{
                            color: 'white',
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: '13px',
                          }}
                        >
                          {t('Previous Step')}
                        </Typography>
                      </>
                    )}
                  </Button>


                </div>
                <div className="StepBack2"
                  style={{
                    display: showThirdStepDesign ? 'flex' : 'none',
                  }}
                >
                  <Button
                    variant="outlined"
                    className="btn-grad"
                    sx={{
                      width: '332px',
                      position: 'relative',
                      height: '38px',
                      marginRight: '10px',
                      borderColor: 'none',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    onClick={handleBackToSecondStep}

                  >
                    <ArrowBackIcon sx={{ color: 'white', marginRight: '8px' }} />
                    <Typography
                      sx={{
                        color: 'white',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        fontSize: '13px',
                      }}
                    >
                      {t('Previous Step')}
                    </Typography>
                  </Button>
                </div>
                <div
                  className="StepBack3"
                  style={{
                    display: showStep3Inputs ? 'flex' : 'none',
                  }}
                >
                  <Button
                    variant="outlined"
                    className="btn-grad"
                    sx={{
                      width: '332px',
                      position: 'relative',
                      height: '38px',
                      gap: '10px',
                      borderColor: 'none',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    onClick={handleThirdPreviousStep}
                  >
                    {currentLanguage === 'ar' ? (
                      <>
                        <Typography
                          sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: '13px',
                          }}
                        >
                          {t('Previous Step')}
                        </Typography>
                        <ArrowBackIcon sx={{ color: 'white', marginLeft: '8px' }} />
                      </>
                    ) : (
                      <>
                        <ArrowBackIcon sx={{ color: 'white', marginRight: '8px' }} />
                        <Typography
                          sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: '13px',
                          }}
                        >
                          {t('Previous Step')}
                        </Typography>
                      </>
                    )}
                  </Button>
                </div>

                <div className="CreateTypo">
                  <Typography
                    sx={{
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      color: 'white',
                      fontSize: isMediumScreen ? '32px' : '38px',
                      textwrap: 'nowrap',

                    }}
                  >
                    {t('Create an account')}
                  </Typography>
                </div>
                {showStep1Inputs && (
                  <>
                    <div className="Step1"
                      style={{
                        marginTop: '0px',
                        marginBottom: '-10px',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          color: 'white',
                          fontSize: '15px',

                        }}
                      >
                        {t('Already have an account ?')}
                        <a onClick={handleLoginRedirect}
                          style={{

                            cursor: 'pointer',
                            color: '#4776E6 ',
                            borderBottom: '1px solid #4776E6',
                            marginLeft: '5px',
                            marginRight: currentLanguage === 'ar' ? '5px' : 'unset',
                          }} >
                          {t('Log in')}
                        </a>
                      </Typography>
                    </div>
                  </>
                )}
                {showStep2Inputs && (
                  <>
                    <div className="Step2 "
                      style={{
                        marginTop: '5px',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          color: 'white',
                          fontSize: isMediumScreen ? '14px' : '15px',

                        }}
                      >
                        {t('Choose your account type (Buyer / Seller)')}
                      </Typography>
                    </div>
                  </>
                )}
                {showStep3Inputs && (
                  <div className="Step3"
                    style={{
                      marginTop: '5px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        color: 'white',
                        fontSize: isMediumScreen ? '14px' : '15px',
                        textWrap: 'wrap',

                      }}
                    >
                      {t('What type of projects you are up to?  Select 2')}

                      {currentLanguage === 'fr' ? (
                        <>
                          <span
                            style={{
                              display: 'block',
                              textWrap: 'wrap',
                            }}
                          >
                            {t('This will help us to provide you the proper')}
                            <span
                              style={{
                                display: 'block'
                              }}
                            >
                              {t('ads.')}
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            style={{
                              display: 'block',
                              textWrap: 'wrap',
                            }}
                          >
                            {t('This will help us to provide you the proper ads.')}
                          </span>
                        </>
                      )}
                    </Typography>
                  </div>
                )}
                {serverError && (
                  <Typography className=' '
                    style={{
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      color: 'red',
                      fontSize: '15px',
                      marginTop: '12px',
                      marginBottom: showStep3Inputs ? '-10px' : '-20px',
                      zIndex: '1',

                    }}>
                    {serverError}
                  </Typography>
                )}

                {serverError2 && (
                  <Typography className=' '
                    style={{
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      color: 'red',
                      fontSize: '15px', marginTop: '5px', marginBottom: '-5px',
                      zIndex: '1',

                    }}>
                    {serverError2}
                  </Typography>
                )}

                {showStep1Inputs && (
                  <>
                    <div className={`InputsNames ${showNewDesign ? 'slide-from-right' : 'slide-from-left'}`}
                      style={{
                        display: 'flex',
                        width: '100%', // Ensure the container takes the full width
                        gap: '15px',
                        marginTop: '28px',
                        position: 'relative',
                      }}
                    >
                      {/* First Name Input */}
                      <div style={{
                        position: 'relative',
                        width: '50%', // Ensure both inputs take 50% of the container width
                        flexGrow: 1,  // Allow the input to grow and fill the available space
                      }}>
                        <input
                          style={{
                            width: '100%',
                            height: '38px',
                            background: '#3B364C',
                            border: inputErrors.firstName ? '2px solid red' : '2px solid #4776E6',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '15px',
                            outline: 'none',
                            fontFamily: /[A-Za-z]/.test(formData.firstName) && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                          }}
                          type="text"
                          name="firstName"
                          placeholder={t('First name')}
                          value={formData.firstName}
                          maxLength={50} // Set max length
                          onFocus={() => {
                            setInputErrors((prevErrors) => ({
                              ...prevErrors,
                              firstName: false,
                            }));
                          }}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            const isEnglish = /[A-Za-z]/.test(value);

                            setFormData((prevData) => ({
                              ...prevData,
                              [name]: value,
                            }));

                            if (value.trim()) {
                              setInputErrors((prevErrors) => ({
                                ...prevErrors,
                                firstName: false,
                              }));
                            }

                            const fontFamily = isEnglish && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif';

                            e.target.style.fontFamily = fontFamily;
                          }}
                        />
                        <style>
                          {`
        input::placeholder {
          color: white;
        }
      `}
                        </style>
                        {inputErrors.firstName && (
                          <ErrorOutlineIcon
                            sx={{
                              color: 'red',
                              fontSize: '20px',
                              position: 'absolute',
                              right: currentLanguage === 'ar' ? '80%' : '10px',
                              top: '24%',
                              transform: 'translateY(-50%)',
                              cursor: 'default',
                            }} />
                        )}
                      </div>

                      {/* Last Name Input */}
                      <div style={{
                        position: 'relative',
                        width: '50%', // Ensure both inputs take 50% of the container width
                        flexGrow: 1,  // Allow the input to grow and fill the available space
                      }}>
                        <input
                          style={{
                            width: '100%',
                            height: '38px',
                            background: '#3B364C',
                            border: inputErrors.lastName ? '2px solid red' : '2px solid #4776E6',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '15px',
                            outline: 'none',
                            fontFamily: /[A-Za-z]/.test(formData.lastName) && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                          }}
                          type="text"
                          name="lastName"
                          placeholder={t('Last name')}
                          value={formData.lastName}
                          maxLength={50} // Set max length
                          onFocus={() => {
                            setInputErrors((prevErrors) => ({
                              ...prevErrors,
                              lastName: false,
                            }));
                          }}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            const isEnglish = /[A-Za-z]/.test(value);

                            setFormData((prevData) => ({
                              ...prevData,
                              [name]: value,
                            }));

                            if (value.trim()) {
                              setInputErrors((prevErrors) => ({
                                ...prevErrors,
                                lastName: false,
                              }));
                            }

                            const fontFamily = isEnglish && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif';

                            e.target.style.fontFamily = fontFamily;
                          }}
                        />
                        {inputErrors.lastName && (
                          <ErrorOutlineIcon
                            sx={{
                              color: 'red',
                              fontSize: '20px',
                              position: 'absolute',
                              right: currentLanguage === 'ar' ? '80%' : '10px',
                              top: '24%',
                              transform: 'translateY(-50%)',
                              cursor: 'default',
                            }} />
                        )}
                      </div>
                    </div>

                    <div className={`InputEmail ${showNewDesign ? 'slide-from-right' : 'slide-from-left'}`}
                      style={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: '13px',
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%' }}>
                        <input
                          style={{
                            width: '100%',
                            height: '38px',
                            background: '#3B364C',
                            border: inputErrors.email ? '2px solid red' : '2px solid #4776E6',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '15px',
                            outline: 'none',
                            // Dynamically adjust the font based on the user's input
                            fontFamily: /[A-Za-z]/.test(formData.email) && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                          }}
                          type="email"
                          placeholder={t('Email')}
                          maxLength={254} // Prevent overly long emails
                          value={formData.email}
                          onChange={(e) => {
                            const value = e.target.value;

                            // Check if the input is in English or Arabic
                            const isEnglish = /[A-Za-z]/.test(value);

                            // Update formData
                            setFormData({ ...formData, email: value });

                            // Clear server error message on change
                            setServerError('');

                            // Dynamically set the font-family based on input language
                            const fontFamily = isEnglish && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif';

                            // Update inline styles for the font
                            e.target.style.fontFamily = fontFamily;
                          }}
                          onFocus={() => {
                            setInputErrors((prev) => ({ ...prev, email: false }));
                          }}
                        />



                        {inputErrors.email && (
                          <ErrorOutlineIcon
                            sx={{
                              color: 'red',
                              fontSize: '20px',
                              position: 'absolute',
                              right: currentLanguage === 'ar' ? '90%' : '10px',
                              top: '24%',
                              transform: 'translateY(-50%)',
                              cursor: 'default',
                            }} />
                        )}
                      </div>
                    </div>
                    <div className={`InputPassword ${showNewDesign ? 'slide-from-right' : 'slide-from-left'}`}
                      style={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: '13px',
                        position: 'relative',
                        width: '100%'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%' }}>
                        <input
                          style={{
                            width: '100%',
                            height: '38px',
                            background: '#3B364C',
                            border: inputErrors.password ? '2px solid red' : '2px solid #4776E6',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '15px',
                            outline: 'none',
                            // Dynamically adjust the font based on the user's input
                            fontFamily: /[A-Za-z]/.test(formData.password) && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                          }}
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('Enter your password')}
                          value={formData.password} // Access from formData
                          onChange={(e) => {
                            const value = e.target.value;

                            // Check if the input is in English or Arabic
                            const isEnglish = /[A-Za-z]/.test(value);

                            // Update formData with password
                            setFormData((prevData) => ({
                              ...prevData,
                              password: value,
                            }));

                            if (value.trim()) {
                              setInputErrors((prevErrors) => ({
                                ...prevErrors,
                                password: false, // Reset error when input changes
                              }));
                              // Clear the serverError message
                              setServerError(null);
                            }

                            // Dynamically set the font-family based on input language
                            const fontFamily = isEnglish && currentLanguage === 'ar'
                              ? '"Airbnbcereal", sans-serif'
                              : currentLanguage === 'ar'
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif';

                            // Update inline styles for the font
                            e.target.style.fontFamily = fontFamily;
                          }}
                          onFocus={() => {
                            setInputErrors((prev) => ({ ...prev, password: false })); // Hide error on focus
                          }}
                        />




                        {/* Show error icon when there's a password error */}
                        {inputErrors.password && (
                          <ErrorOutlineIcon
                            sx={{
                              color: 'red',
                              fontSize: '20px',
                              position: 'absolute',
                              right: currentLanguage === 'ar' ? '90%' : '10px',
                              top: '24%',
                              transform: 'translateY(-50%)',
                              cursor: 'default',
                            }} />
                        )}

                        {/* Conditionally render visibility icon when there is no password error */}
                        {!inputErrors.password && (
                          <div
                            onClick={togglePasswordVisibility}
                            style={{
                              position: 'absolute',
                              right: currentLanguage === 'ar' ? '90%' : '10px',
                              top: '62%',
                              transform: 'translateY(-50%)',
                              cursor: 'pointer',
                              color: 'white',

                            }}
                          >
                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: '20px' }} /> : <VisibilityIcon sx={{ fontSize: '20px' }} />}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`Terms&Conditions ${showNewDesign ? 'slide-from-right' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%', // Set width to 100%
                        marginTop: currentLanguage === 'ar' ? '10px' : '5px',
                        justifyContent: 'space-between', // Space out the elements
                      }}
                    >

                      <div style={{ display: 'flex', alignItems: 'center', }}>
                        <FormControlLabel
                          control={<Checkbox
                            checked={isCheckboxChecked}  // Controlled checkbox state
                            onChange={handleCheckboxChange}  // Handle change event
                            style={{
                              color: 'white',


                            }}
                          />}
                        />
                        <Typography
                          style={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            color: 'white',
                            fontSize: '14px',
                            marginLeft: '-15px',



                          }}
                        >
                          {t('I agree to the')}
                        </Typography>
                      </div>

                      <Typography
                        style={{
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          color: 'white',
                          fontSize: '14px',

                        }}
                      >
                        <a style={{ color: '#4776E6' }} href="http://">{t('Terms & Conditions')}</a>
                      </Typography>

                    </div>



                  </>
                )}
                {/* Step 2: New Design */}
                {showStep2Inputs && (
                  <>
                    <div className={`NewDesign ${showStep2Inputs ? animationDirectionSecond : ''}`}
                      style={{
                        transition: 'opacity 0.3s',
                        opacity: 1,
                        width: '100%',
                        color: 'white',
                        background: '#3B364C',
                        height: isMediumScreen ? '50px' : '60px',
                        marginTop: '10px',
                        borderRadius: '16px',
                        display: 'flex',
                        gap: '15px',
                        padding: '5px',
                      }}>
                      <div className="Buyer"
                        onClick={() => handleSelectionChange(true)}
                        style={{
                          width: '48%',
                          height: '100%',
                          backgroundColor: formData.isBuyerSelected ? '#FFFFFF' : '#3B364C',
                          borderRadius: '16px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <div className="Buyer" style={{ marginTop: '5px' }}>
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: formData.isBuyerSelected ? '#000000' : '#FFFFFF',
                              fontSize: isMediumScreen ? '14px' : '15px',
                              fontWeight: 'bold',
                            }}>
                            {t('Khadamat Buyer')}
                          </Typography>
                        </div>
                      </div>

                      <div className="Seller"
                        onClick={() => handleSelectionChange(false)}
                        style={{
                          width: '48%',
                          height: '100%',
                          backgroundColor: !formData.isBuyerSelected ? '#FFFFFF' : '#3B364C',
                          borderRadius: '16px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <div className="Seller" style={{ marginTop: '5px' }}>
                          <Typography
                            sx={{
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              color: !formData.isBuyerSelected ? '#000000' : '#FFFFFF',
                              fontSize: isMediumScreen ? '14px' : '15px',
                              fontWeight: 'bold',
                            }}>
                            {t('Khadamat Seller')}
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {formData.isBuyerSelected ? (
                      <div className={`BuyerSelection ${showStep2Inputs ? animationDirectionSecond : ''}`}
                        style={{
                          marginTop: '10px',
                          background: '#3B364C',
                          width: '100%',
                          height: '70px',
                          position: 'relative',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          padding: '5px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <div className="BuyerIcon"
                          style={{
                            width: '22%',
                            height: '50px',
                            background: 'white',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <img width={40} src="https://res.cloudinary.com/damicjacf/image/upload/v1727020210/Buyer-removebg-preview_nv5hdt.png" alt="" />
                        </div>
                        <div className="Line "
                          style={{
                            width: '2px',
                            height: '30px',
                            background: 'grey',
                            position: 'absolute',
                            left: currentLanguage === 'ar' ? '75%' : '26%',
                          }}></div>
                        <div className="BuyerTypos"
                          style={{
                            position: 'absolute',
                            left: currentLanguage === 'ar' ? '2%' : '30%',
                          }}>
                          <Typography
                            sx={{
                              color: 'white',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}>
                            {t('Buyer Account')}
                          </Typography>
                          <Typography
                            sx={{
                              color: 'white',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              fontWeight: 'bold',


                              fontSize: isMediumScreen ? '10px' : '12px',
                            }}>
                            {t('The one who needs someone to build their project.')}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div className={`SellerSelection ${showStep2Inputs ? animationDirectionSecond : ''}`}
                        style={{
                          marginTop: '10px',
                          background: '#3B364C',
                          width: '100%',
                          height: '70px',
                          position: 'relative',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          padding: '5px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <div className="SellerIcon"
                          style={{
                            width: '22%',
                            height: '50px',
                            background: 'white',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <img width={40} src="https://res.cloudinary.com/damicjacf/image/upload/v1727021919/Seller-removebg-preview_jgceti.png" alt="" />
                        </div>
                        <div className="Line"
                          style={{
                            width: '2px',
                            height: '30px',
                            background: 'grey',
                            position: 'absolute',
                            left: currentLanguage === 'ar' ? '74%' : '26%',
                          }}></div>
                        <div className="SellerTypos "
                          style={{
                            position: 'absolute',
                            left: currentLanguage === 'ar' ? '2%' : '30%',
                            width: '60%'
                          }}>
                          <Typography
                            sx={{
                              color: 'white',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}>
                            {t('Seller Account')}
                          </Typography>
                          <Typography
                            sx={{
                              color: 'white',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              fontWeight: 'bold',

                              fontSize: isMediumScreen ? '10px' : '12px',
                            }}>
                            {t('The one who will build the project for the client.')}
                          </Typography>
                        </div>
                      </div>
                    )}

                  </>
                )}

                {/* Step 3: Third Step Design */}
                {showStep3Inputs && (
                  <>
                    {/* Your third step design components */}
                    <div className={`ThirdStepDesign  ${showStep3Inputs ? 'slide-from-rightSecond' : ''}`}
                      style={{
                        width: '100%',
                        height: '200px',
                        marginTop: '10px',
                        marginLeft: '-5px',
                        marginRight: currentLanguage === 'ar' ? '-8px' : 'unset',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        overflowX: 'hidden',
                        scrollBehavior: 'smooth',
                        gap: '15px',

                      }}
                    >
                      <div className="First1"
                        style={{
                          width: '100%',
                          display: 'flex',
                          gap: '10px',

                        }}
                      >
                        {renderDiv('group1', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727102241/website-codes_rg69kw.png', t('Web Development'))}
                        {renderDiv('group1', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727103692/application_tyehnu.png', t('Graphic Design'))}
                        {renderDiv('group1', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727103692/application_tyehnu.png', t('App Development'))}


                      </div>
                      <div className="Second2"
                        style={{
                          width: '100%',
                          display: 'flex',
                          gap: '10px',
                        }}
                      >

                        {renderDiv('group2', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727108985/ux_xnexww.png', t('Ui/Ux Designer'))}
                        {renderDiv('group2', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727109226/movie-player_ajllyh.png', t('Video montage'))}
                        {renderDiv('group2', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727109604/content-marketing_yqzb70.png', t('Digital Marketing'))}


                      </div>
                      <div className="Third3"
                        style={{
                          width: '100%',
                          display: 'flex',
                          gap: '10px',
                        }}
                      >

                        {renderDiv('group3', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727109955/blog_alyug6.png', t('Content Writing'))}
                        {renderDiv('group3', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727110035/data-engineer_heutwo.png', t('Data Science'))}
                        {renderDiv('group3', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727110167/engineering_nspbwi.png', t('Software Engineering'))}


                      </div>
                      <div className="Firth4"
                        style={{
                          width: '100%',
                          display: 'flex',
                          gap: '10px',
                        }}
                      >

                        {renderDiv('group4', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727115899/illustration_ftpnov.png', t('Illustration'))}
                        {renderDiv('group4', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116243/technical-support_wimost.png', t('Customer Support'))}
                        {renderDiv('group4', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727185669/web-optimization_pwnq8w.png', t('SEO management'))}





                      </div>
                      <div className="Fifth5"
                        style={{
                          width: '100%',
                          display: 'flex',
                          gap: '10px',
                        }}
                      >


                        {renderDiv('group5', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116480/cyber-security_crzlyh.png', t('Cybersecurity'))}
                        {renderDiv('group5', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116597/attorney_vdkfwu.png', t('Legal Consulting'))}
                        {renderDiv('group5', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116752/machine-repair_qz6hwx.png', t('IT & Networking'))}






                      </div>

                    </div>
                  </>
                )}




                <div className="CreatButton" style={{ width: '100%', marginTop: '5px' }}>
                  <Button
                    variant="outlined"
                    className="btn-grad"
                    sx={{
                      width: '100%',
                      position: 'relative',
                      height: '38px',
                      border: 'none',
                      color: 'white',
                      opacity: isLoading ? '0.5' : 'unset',
                      display: 'flex', // Use flexbox for centering
                      justifyContent: 'center', // Center horizontally
                      alignItems: 'center', // Center vertically
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    onClick={handleNextStep}
                    disabled={isLoading}
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
                        {currentStep === totalSteps
                          ? t('Create account (3/3)') // Translation for the final step
                          : t('Next Step ({{currentStep}}/{{totalSteps}})', {
                            currentStep,
                            totalSteps,
                          }) // Dynamic translation for steps
                        }
                      </Typography>
                    )}
                  </Button>
                </div>



                <div className="RegisterWith"
                  style={{
                    width: '100%',
                    display: 'flex',
                    marginTop: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div className="Line1"
                    style={{
                      height: '0.5px',
                      width: currentLanguage === 'fr' ? '23%' :
                        currentLanguage === 'ar' ? '20%' :
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
                        textWrap: 'nowrap',
                      }}

                    >
                      {t('Or register with')}
                    </Typography>
                  </div>
                  <div className="Line2"
                    style={{
                      height: '0.5px',
                      width: currentLanguage === 'fr' ? '23%' :
                        currentLanguage === 'ar' ? '20%' :
                          '30%',
                      background: 'white',
                    }}
                  >

                  </div>

                </div>
                <div className="SocialRegister" style={{
                  width: '100%',
                  marginTop: '13px',

                  display: 'flex',
                  gap: '15px',
                }}>
                  {/* Google Button */}
                  <Button
                    onClick={handleGoogleRegisterClick}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      width: '100%',
                      height: '40px',
                      border: '1px solid white',
                      ":hover": {
                        border: '1px solid white',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)'
                      },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/damicjacf/image/upload/v1726935029/GoogleLogo-removebg-preview_as5ffe.png" // Make sure this is a transparent PNG
                      alt="Google Logo"
                      style={{ width: '26px', height: '26px', marginRight: currentLanguage === 'ar' ? '-5px' : '8px' }}
                    />
                    <Typography
                      sx={{
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('Google')}
                    </Typography>
                  </Button>

                  {/* Existing Facebook Button */}
                  <Button onClick={handleRegister}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      width: '100%',
                      height: '40px',
                      border: '1px solid white',
                      ":hover": { border: '1px solid white' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/damicjacf/image/upload/v1726935243/facebook_logos_PNG19754_iz2nrh.png"
                      alt="Facebook Logo"
                      style={{ width: '30px', height: '30px', marginRight: '8px' }}
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



              </div>
            )}


            {showGoogleForm && (
              <GoogleRegister
                userData={userData}
                setShowNormalForm={setShowNormalForm}
                setShowGoogleForm={setShowGoogleForm}
              />
            )}

            {facebookReg && (
              <>
                <FacebookRegister userData={userData}
                  setFacebookReg={setFacebookReg}
                  setShowNormalForm={setShowNormalForm}
                />
              </>
            )}


          </div>


        </div>


      )}
    </>




  )
}

export default Signup