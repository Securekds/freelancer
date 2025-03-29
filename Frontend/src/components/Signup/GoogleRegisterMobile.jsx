import { Typography, Button } from '@mui/material';
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
import { Player } from '@lottiefiles/react-lottie-player';
import DOMPurify from 'dompurify';
import useMediaQuery from '@mui/material/useMediaQuery';



function GoogleRegisterMobile({ userData, setShowNormalForm, setShowGoogleMobileForm }) {

    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // Add the password field
        isBuyerSelected: true,
        selectedOptions: [],
        googleId :''
    });

 // New state for generated password
const [generatedPassword, setGeneratedPassword] = useState('');

useEffect(() => {
    if (userData) {
        const newPassword = generatePassword(); // Generate password
        setGeneratedPassword(newPassword); // Store it in state
        console.log("Generated Password:", newPassword); // Log generated password

        setFormData((prevData) => {
            const updatedFormData = {
                ...prevData,
                firstName: userData.firstName || prevData.firstName,
                lastName: userData.lastName || prevData.lastName,
                email: userData.email || prevData.email,
                googleId: userData.googleId || prevData.googleId,
                password: newPassword // Store password in formData
            };

            console.log("Updated Form Data:", updatedFormData); // Log after updating
            return updatedFormData;
        });
    }
}, [userData]); // Runs when userData changes


      const generatePassword = (length = 12) => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '@$!%*?&'; // Only allowed special characters
        const allChars = letters + numbers + specialChars;
    
        let password = '';
        
        // Ensure at least one character from each required set
        password += letters[Math.floor(Math.random() * letters.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
        // Fill the rest of the password with random characters
        for (let i = 3; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
    
        // Shuffle the password to avoid predictable patterns
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    };


    const navigate = useNavigate();
    const [showBuyerSeller, setShowBuyerSeller] = useState(true);
    const [showUserinterest, setShowUserinterest] = useState(false);
    const [showAccountCreation, setShowAccountCreation] = useState(false);
    const [serverError2, setServerError2] = useState(''); // State to store server error message
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showBackToLogin, setShowBackToLogin] = useState(false)
    const [showGoogleRegisterMobile, setShowGoogleRegisterMobile] = useState(false)

    const [progress, setProgress] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [message, setMessage] = useState(t('We are setting up your account. This step takes a few seconds...'));


    useEffect(() => {
        if (showAccountCreation) {
            // Start progress simulation
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setShowSuccessAnimation(true); // Show success animation when progress reaches 100%
                        setShowBackToLogin(true)

                        // Start the countdown after progress reaches 100%
                        const countdownInterval = setInterval(() => {
                            setCountdown((prevCountdown) => {
                                if (prevCountdown <= 0) {
                                    clearInterval(countdownInterval);
                                    setShowSuccessAnimation(false); // Hide animation after countdown completes
                                    // Redirect to /userdashboard or perform other actions here
                                    return 0; // Ensure countdown reaches 0
                                }

                                // Update the success message
                                setMessage(t('Your account has been created successfully! We have sent the password to your email'));

                                return prevCountdown - 1;
                            });
                        }, 1000); // Update countdown every second

                        return 100; // Ensure progress is set to 100%
                    }
                    return prev + 10; // Increment progress by 10%
                });
            }, 500); // Update progress every 500ms

            // Cleanup intervals on component unmount or when conditions change
            return () => {
                clearInterval(interval);
                setMessage(''); // Clear message when unmounting
            };
        }
    }, [showAccountCreation, navigate]); // Add navigate to the dependency array

    useEffect(() => {
        if (progress < 100) {
            // Show setup message while progress is below 100%
            setMessage(t('We are setting up your account. This step takes a few seconds...'));
        }
    }, [progress]);

    const handleAccountTypeChange = (isBuyer) => {
        setFormData((prevState) => ({
            ...prevState,
            isBuyerSelected: isBuyer,
        }));
    };


    // Function to update form data with selected options
    const updateSelectedOptions = () => {
        const allSelectedOptions = Object.values(selectedDivs).flat();
        setFormData((prevData) => ({
            ...prevData,
            selectedOptions: allSelectedOptions,
        }));
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNextStep = () => {

        setShowBuyerSeller(false);
        setShowUserinterest(true);
    };

    const [selectedDivs, setSelectedDivs] = useState({
        group1: [], // Empty array means no divs selected initially
        group2: [],
        group3: [],
        group4: [],
        group5: [],
    });


    const handleDivClick = (group, label) => {
        const isSelected = selectedDivs[group].includes(label);

        const newSelection = isSelected
            ? selectedDivs[group].filter(item => item !== label)
            : [...selectedDivs[group], label];

        const totalSelections = Object.values({ ...selectedDivs, [group]: newSelection }).flat().length;

        if (totalSelections > 4 && !isSelected) {
            setServerError2(t('You can select a maximum of 4 options.'));
            return;
        }

        if (totalSelections > 0) {
            setServerError2(t(''));
        }

        setServerError2('');

        setSelectedDivs((prev) => {
            const updatedState = {
                ...prev,
                [group]: newSelection,
            };

            // Update formData's selectedOptions based on updatedState
            const allSelectedOptions = Object.values(updatedState).flat();
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedOptions: allSelectedOptions,
            }));

            console.log('Updated selected options:', allSelectedOptions);
            console.log('Updated state:', JSON.stringify(updatedState, null, 2));
            return updatedState;
        });
    };




    const renderDiv = (group, index, imgSrc, label) => {
        const isSelected = selectedDivs[group].includes(label); // Now using `label`
        const totalSelections = Object.values(selectedDivs).flat().length;

        return (
            <div
                onClick={() => handleDivClick(group, label)} // Use `label` instead of index
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
                    <img width={40} src={imgSrc} alt={label} />
                    <Typography style={{
                        color: 'white',
                        fontSize: '13px',
                        textAlign: 'center',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                    }}>
                        {label} {/* Use label to display name */}
                    </Typography>
                </div>
            </div>
        );
    };



    const handleRegistration = async () => {
        setIsLoading(true);
        setServerError2('');
    
        const totalSelections = Object.values(selectedDivs).flat().length;
        if (totalSelections < 1) {
            setServerError2(t('Select at least 1 option to proceed.'));
            setIsLoading(false);
            return;
        }
    
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        const sanitizedFormData = {
            firstName: DOMPurify.sanitize(formData.firstName), 
            lastName: DOMPurify.sanitize(formData.lastName),   
            email: DOMPurify.sanitize(formData.email),         
            password: DOMPurify.sanitize(generatedPassword), // Use `generatedPassword`
            isBuyerSelected: formData.isBuyerSelected,
            selectedOptions: Object.values(selectedDivs).flat(),
            googleId: formData.googleId, // ✅ Include googleId
            byGoogle: true, // ✅ Flag to indicate Google registration
        };
    
        console.log("Final Registration Data:", sanitizedFormData); // Log before sending request
    
        try {
            const registerResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/server/auth/register`, 
                { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sanitizedFormData),
                });
    
            const registerData = await registerResponse.json();
    
            if (registerResponse.status === 201) {
                navigate('/auth/AccountCreation');
            } else {
                const translatedMessage = t(registerData.message || 'An error occurred during registration.');
                setServerError2(translatedMessage);

                setIsLoading(false);
            }
        } catch (error) {
            setServerError2('An unexpected error occurred. Please try again later.');
            setIsLoading(false);
        }
    };
    

    const handleBackToPrevStep = () => {
        setShowUserinterest(false)
        setShowBuyerSeller(true)
      
      

    }

    const handleBackToSignin = () => {
        navigate('/auth/signin')
    }
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const [currentStep, setCurrentStep] = useState(1);


    const handleBackToRegister = ()=> {
        setShowGoogleMobileForm(false);
        setShowNormalForm(true);

    }

    return (
        <div className='Container'
            style={{
                width: '100%',
                height: '100vh', // Full viewport height
                position: 'relative', // Relative positioning for the parent container
                overflow: 'hidden',
            }}
        >
        
            <div className="SignUpGoogleForm"
                style={{
                    width: '100%', // Responsive width for mobile
                   
                    padding: '20px',
                    height : '100%',
                    borderRadius: '8px',
                    position: 'absolute', // Absolute positioning relative to the parent container
                    top: '45%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust positioning to fully center
                    zIndex: 2, // Ensure the form is above the cover
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {showBuyerSeller && (
                    <>
                        <div className="GoogleAith">
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontSize: '38px',
                                    lineHeight: '45px',
                                }}
                            >
                                {t('Processing with Google')}
                            </Typography>
                        </div>
                        <div className="BuyerOrSeller"
                            style={{
                                marginTop: '5px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontSize: '18px',
                                    textAlign: 'center',

                                }}
                            >
                                {t('Choose your account type (Buyer / Seller)')}
                            </Typography>
                        </div>
                        <div className={`SellerorBuyer`}
                            style={{
                                transition: 'opacity 0.3s',
                                opacity: 1,
                                width: currentLanguage === 'ar' ? '100%' : '100%',
                                color: 'white',
                                background: '#3B364C',
                                height: '60px',
                                marginTop: '10px',
                                borderRadius: '16px',
                                display: 'flex',
                                gap: '15px',
                                padding: '5px',
                            }}>
                            <div className="Buyer"
                                onClick={() => handleAccountTypeChange(true)}
                                style={{
                                    width: '48%',
                                    height: '100%',
                                    backgroundColor: formData.isBuyerSelected ? '#FFFFFF' : '#3B364C',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: formData.isBuyerSelected ? '#000000' : '#FFFFFF',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                    }}>
                                    {t('Khadamat Buyer')}
                                </Typography>
                            </div>

                            <div className="Seller"
                                onClick={() => handleAccountTypeChange(false)}
                                style={{
                                    width: '48%',
                                    height: '100%',
                                    backgroundColor: !formData.isBuyerSelected ? '#FFFFFF' : '#3B364C',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: !formData.isBuyerSelected ? '#000000' : '#FFFFFF',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                    }}>
                                    {t('Khadamat Seller')}
                                </Typography>
                            </div>
                        </div>

                        {formData.isBuyerSelected ? (
                            <div className={`BuyerSelection`}
                                style={{
                                    marginTop: '10px',
                                    background: '#3B364C',
                                    width: currentLanguage === 'ar' ? '100%' : '100%',
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
                                        width: '70px',
                                        height: '50px',
                                        background: 'white',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <img width={40} src="https://res.cloudinary.com/damicjacf/image/upload/v1727020210/Buyer-removebg-preview_nv5hdt.png" alt="" />
                                </div>
                                <div className="Line"
                                    style={{
                                        width: '2px',
                                        height: '30px',
                                        background: 'grey',
                                        position: 'absolute',
                                        left: currentLanguage === 'ar' ? '72%' : '29%',
                                    }}></div>
                                <div className="BuyerTypos"
                                    style={{
                                        position: 'absolute',
                                        left: currentLanguage === 'ar' ? '8%' : '30%',
                                    }}>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '12px',
                                        }}>
                                        {t('Buyer Account')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '12px',
                                            textAlign: currentLanguage === 'ar' ? 'center' : 'center', // Center text for Arabic
                                            lineHeight: '1.5', // Adjusts the spacing between lines
                                        }}
                                    >
                                        {currentLanguage === 'ar' ? (
                                            <>
                                                {t('The one who needs someone to build their')}
                                                <br /> {/* This creates a line break */}
                                                {t('project.')}
                                            </>
                                        ) : (
                                            t('The one who needs someone to build their project.') // Default text for other languages
                                        )}
                                    </Typography>
                                </div>
                            </div>
                        ) : (
                            <div className={`SellerSelection`}
                                style={{
                                    marginTop: '10px',
                                    background: '#3B364C',
                                    width: currentLanguage === 'ar' ? '100%' : '100%',
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
                                        width: '70px',
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
                                        left: currentLanguage === 'ar' ? '72%' : '28%',
                                    }}></div>
                                <div className="SellerTypos"
                                    style={{
                                        position: 'absolute',
                                        left: currentLanguage === 'ar' ? '8%' : '30%',
                                    }}>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '12px',
                                        }}>
                                        {t('Seller Account')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {currentLanguage === 'ar' ? (
                                            <>
                                                {t('The one who will build the')}{' '}
                                                <br /> {/* This creates a line break before "project" */}
                                                {t('client.')}
                                            </>
                                        ) : (
                                            t('The one who will build the project for the client.')
                                        )}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        <div className="BuyerAndSellerButton"

                            style={{
                                width: '100%', // Full width of the parent container
                                marginTop: '18px',
                                display: 'flex', // Use flexbox for alignment
                                justifyContent: 'center', // Center horizontally
                            }}
                        >
                            {currentStep === 1 && showBuyerSeller && (
                                <Button
                                    onClick={() => {
                                        handleNextStep();
                                        setCurrentStep(2); // Move to the next step
                                    }}
                                    variant="outlined"
                                    className="btn-grad"
                                    sx={{
                                        width: '100%',
                                        maxWidth: '340px',
                                        height: '38px',
                                        border: 'none',
                                        color: 'white',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                > {isLoading ? (
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
                                        {t('Next Step (2/3)')}
                                    </Typography>
                                )}
                                </Button>
                            )}
                        </div>

                        <div className="BackToRegister slide-from-right"

                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                gap: '6px',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent the default anchor behavior
                                handleBackToRegister(); // Call the function
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
                                        {t('Back to Register')}
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
                                        {t('Back to Register')}
                                    </Typography>
                                </>
                            )}
                        </div>

                    </>
                )}

                {showUserinterest && (
                    <>
                        <div className="UserIntereser ">

                            <div className="GoogleAith slide-from-right ">
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontSize: '38px',
                                        
                                        lineHeight: '45px',
                                    }}
                                >
                                    {t('Processing with Google')}
                                </Typography>
                            </div>
                            <div className="UserIntereset slide-from-right"
                                style={{
                                    marginTop: '5px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontSize: '16px',
                                        textWrap: 'wrap',

                                    }}
                                >
                                    {t('What type of projects you are up to?  Select')}
                                    <span
                                        style={{
                                            display: 'block',
                                        }}
                                    >
                                        {t('2 at least')}
                                    </span>
                                    <span
                                        style={{
                                            display: 'block',
                                        }}
                                    >
                                        {t('This will help us to provide you the proper ads.')}
                                    </span>
                                </Typography>
                            </div>
                            {serverError2 && (
                                <Typography className=' '
                                    style={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'red',
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        zIndex: '1',

                                    }}>
                                    {serverError2}
                                </Typography>
                            )}
                            <div className={`ThirdStepDesign ${showUserinterest ? 'slide-from-' : ''}`}
                                style={{
                                    width: currentLanguage === 'ar' ? '102%' : '100%',
                                    height: '220px',
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    marginRight: currentLanguage === 'ar' ? '-8px' : 'unset',
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    scrollBehavior: 'smooth',
                                    gap: '20px',

                                }}
                            >
                                <div className="First1" style={{ width: '100%', display: 'flex', gap: '12px', }}>
                                    {renderDiv('group1', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727102241/website-codes_rg69kw.png', t('Web Development'))}
                                    {renderDiv('group1', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727103692/application_tyehnu.png', t('Graphic Design'))}
                                    {renderDiv('group1', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727103692/application_tyehnu.png', t('App Development'))}
                                </div>
                                <div className="Second2" style={{ width: '100%', display: 'flex', gap: '12px' }}>
                                    {renderDiv('group2', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727108985/ux_xnexww.png', t('Ui/Ux Designer'))}
                                    {renderDiv('group2', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727109226/movie-player_ajllyh.png', t('Video montage'))}
                                    {renderDiv('group2', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727109604/content-marketing_yqzb70.png', t('Digital Marketing'))}
                                </div>
                                <div className="Third3" style={{ width: '100%', display: 'flex', gap: '12px' }}>
                                    {renderDiv('group3', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727109955/blog_alyug6.png', t('Content Writing'))}
                                    {renderDiv('group3', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727110035/data-engineer_heutwo.png', t('Data Science'))}
                                    {renderDiv('group3', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727110167/engineering_nspbwi.png', t('Software Engineering'))}
                                </div>
                                <div className="Fourth4" style={{ width: '100%', display: 'flex', gap: '12px' }}>
                                    {renderDiv('group4', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727115899/illustration_ftpnov.png', t('Illustration'))}
                                    {renderDiv('group4', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116243/technical-support_wimost.png', t('Customer Support'))}
                                    {renderDiv('group4', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727185669/web-optimization_pwnq8w.png', t('SEO management'))}
                                </div>
                                <div className="Fifth5" style={{ width: '100%', display: 'flex', gap: '12px' }}>
                                    {renderDiv('group5', 0, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116480/cyber-security_crzlyh.png', t('Cybersecurity'))}
                                    {renderDiv('group5', 1, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116597/attorney_vdkfwu.png', t('Legal Consulting'))}
                                    {renderDiv('group5', 2, 'https://res.cloudinary.com/damicjacf/image/upload/v1727116752/machine-repair_qz6hwx.png', t('IT & Networking'))}
                                </div>
                            </div>
                            <div className="LastStepButton slide-from-right  "

                                style={{
                                    width: '100%', // Full width of the parent container
                                    marginTop: '18px',
                                    display: 'flex', // Use flexbox for alignment
                                    justifyContent: 'center', // Center horizontally
                                }}
                            >
                                <Button onClick={handleRegistration}
                                    disabled={isLoading}
                                    variant="outlined"
                                    className="btn-grad"
                                    sx={{
                                        width: '100%', // Responsive width to take up 90% of the container
                                        maxWidth: '340px', // Limit max width for larger screens
                                        height: '38px',
                                        border: 'none',
                                        color: 'white',
                                        display: 'flex', // Use flexbox for centering
                                        justifyContent: 'center', // Center horizontally
                                        alignItems: 'center', // Center vertically
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                > {isLoading ? (
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
                                        {t('Create an account (3/3)')}
                                    </Typography>
                                )}
                                </Button>
                            </div>

                            <div className="BackToRegister slide-from-right"

                                style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    gap: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the default anchor behavior
                                    handleBackToPrevStep(); // Call the function
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
                                            {t('Back to previous step')}
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
                                            {t('Back to previous step')}
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </div>


                    </>

                )}

                {showAccountCreation && (

                    <>
                        <div className="LastStep"

                            style={{
                                height: '100vh',
                                width: '100%',
                                background: '#0E0E10',
                                position: 'fixed',
                                top: currentLanguage === 'fr'? '30px' : '-310',
                                left: 0,
                                zIndex: 9999,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: '20px', // Add padding for mobile screens
                            }}
                        >
                            <img
                                src="https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png"
                                alt="Logo"
                                style={{
                                    maxWidth: '150px', // Smaller width for responsiveness
                                    width: '100%', // Makes it responsive based on container width
                                    height: 'auto', // Maintains aspect ratio
                                    zIndex: 100000000,
                                }}
                            />
                            {countdown > 0 && progress === 100 && (
                             <Player
                             src={Created}
                             autoplay
                             loop={false}
                             style={{
                               width: '80px',
                               height: '80px',
                               marginBottom: '-15px'
                             }}
                           />
                            )}

                            {/* Progress Bar */}
                            <div
                                style={{
                                    width: '80%', // Flexible width for all screen sizes
                                    maxWidth: '400px', // Restricts maximum size on larger screens
                                    height: '10px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: '10px',
                                    marginTop: '20px',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        height: '100%',
                                        width: `${progress}%`,
                                        backgroundColor: 'cyan',
                                        borderRadius: '10px',
                                        transition: 'width 0.5s ease',
                                    }}
                                />
                            </div>
                            <span
                                style={{
                                    color: 'white',
                                    marginTop: '20px',
                                    fontSize: '16px', // Adjusted for small screens
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                                {progress}%
                            </span>
                            {/* Progress Message */}
                            <p
                                style={{
                                    color: 'white',
                                    marginTop: '20px',
                                    fontSize: '18px', // Adjusted for small screens
                                    fontWeight: 'bold',
                                    lineHeight: '30px',
                                    textAlign: 'center', // Ensures proper alignment on all screens
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    
                                }}
                            >
                                {message}
                            </p>
                            {showBackToLogin && (
                                <>
                                    <div className="BackToLogin"
                                        style={{
                                            marginTop: '20px',
                                            display: 'flex',
                                            gap: '6px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent the default anchor behavior
                                            handleBackToSignin(); // Call the function
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
                                                    {t('Login with google')}
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
                                                    {t('Login with google')}
                                                </Typography>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </>

                )}



            </div>


        </div>
    )
}

export default GoogleRegisterMobile