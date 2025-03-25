import { Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Lottie from 'lottie-react';
import Created from '../../assets/images/small-logos/Created.json'
import DOMPurify from 'dompurify';




function FacebookRegMobile({userData}) {
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


    const generatePassword = (length = 12) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    };


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // Add the password field
        facebookId: '',
        accessToken: '',
        isBuyerSelected: true,
        selectedOptions: [],
    });
    useEffect(() => {
        // Log the userData to confirm it is received correctly
        console.log('Received userData in FacebookRegMobile:', userData);

        // Populate the form data if userData is available
        if (userData) {
            setFormData({
                email: userData.email || '',
                firstName: userData.first_name || '',
                lastName: userData.last_name || '',
                facebookId: userData.facebookId || '',
                accessToken: userData.accessToken || '',
                password: generatePassword() // Generate a password
            });
        }
    }, [userData]);
    


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

    const [sanitizedFormData, setSanitizedFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        accessToken: '',
    });


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

    // Update loading message while progress is below 100%
    useEffect(() => {
        if (progress < 100) {
            setMessage(t('We are setting up your account. This step takes a few seconds...'));
        }
    }, [progress]);





    const handleDivClick = (group, label) => {
        const isSelected = selectedDivs[group].includes(label);
        const newSelection = isSelected
            ? selectedDivs[group].filter(item => item !== label) // Remove if already selected
            : [...selectedDivs[group], label]; // Add if not selected

        const totalSelections = Object.values({ ...selectedDivs, [group]: newSelection }).flat().length;

        // Check if the total selections exceed the limit
        if (totalSelections > 4 && !isSelected) {
            setServerError2(t('You can select a maximum of 4 options.'));
            return; // Exit if limit exceeded
        }

        // Clear error if at least one div is selected
        if (totalSelections > 0) {
            setServerError2(t('')); // Clear the "at least 1 div" error message
        }

        // Update selected divs state
        setSelectedDivs((prev) => ({
            ...prev,
            [group]: newSelection,
        }));

        // Update form data with selected options directly
        const allSelectedOptions = Object.values({ ...selectedDivs, [group]: newSelection }).flat();
        setFormData((prevData) => ({
            ...prevData,
            selectedOptions: allSelectedOptions, // Update selected options
        }));

        // Log updated form data for debugging
        console.log('Updated Form Data after Selection Change:', {
            ...formData,
            selectedOptions: allSelectedOptions,
        });
    };



    const renderDiv = (group, index, imgSrc, label) => {
        const isSelected = selectedDivs[group].includes(label); // Check if the div is selected

        return (
            <div
                key={`${group}-${index}`} // Ensure a unique key for each div
                onClick={() => handleDivClick(group, label)} // Use `label` for identifying the selection
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
                        {label}
                    </Typography>
                </div>
            </div>
        );
    };

    const handleAccountTypeChange = (isBuyer) => {
        setFormData((prevState) => {
            const updatedFormData = {
                ...prevState,
                isBuyerSelected: isBuyer, // Update the isBuyerSelected state
            };

            console.log('Updated Form Data after Account Type Change:', updatedFormData); // Log the updated form data
            return updatedFormData;
        });

        console.log('Account Type Changed:', isBuyer ? 'Buyer' : 'Seller');
    };


    const handleNextStep = () => {
        // Move to the next step
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





    // Registration handler
    const handleRegistration = async () => {
        setIsLoading(true); // Start loading
        setServerError2(''); // Reset any previous error messages

        // Check if at least one div is selected
        const totalSelections = Object.values(selectedDivs).flat().length;
        if (totalSelections < 1) {
            setServerError2(t('Select at least 1 option to proceed.'));
            setIsLoading(false);
            return;
        }

        // Construct the sanitized form data
        const sanitizedFormData = {
            firstName: DOMPurify.sanitize(formData.firstName),
            lastName: DOMPurify.sanitize(formData.lastName),
            email: DOMPurify.sanitize(formData.email),
            password: DOMPurify.sanitize(formData.password),
            isBuyerSelected: formData.isBuyerSelected,
            selectedOptions: Object.values(selectedDivs).flat(),
            byFacebook: true,
        };

        console.log("Sanitized Data to be Sent:", sanitizedFormData);

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
                // Start the account creation animation
                setShowUserinterest(false);
                setShowAccountCreation(true); // Show progress animation
            } else {
                setServerError2(registerData.message || 'An error occurred during registration.');
                setIsLoading(false);
            }
        } catch (error) {
            setServerError2('An unexpected error occurred. Please try again later.');
            setIsLoading(false);
        }
    };


    const handleBackToRegister = () => {
        setShowBuyerSeller(false)
        setShowGoogleForm(false)
        setShowNormalForm(true)

    }

    const handleBackToSignin = () => {
        navigate('/auth/signin')
    }


    const handleBackToPevStep = () => {
        setShowBuyerSeller(true);
        setShowUserinterest(false);
    }

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <div className="Container slide-from-right"
                style={{
                    width: currentLanguage === 'fr'? '115%' : '110%',
                    padding: '10px',
                    display: 'flex',
                    marginTop: 
                     currentLanguage === 'ar' ? '60px' :
                     'unset',
                    alignItems: 'center',
                    justifyContent :  'center',
                    marginTop: '80px',
                
                    marginLeft: currentLanguage === 'ar' ? '70px' : '0px',
                    position: 'relative',
                    marginRight: currentLanguage === 'ar' ? '70px' : 'unset',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {showBuyerSeller && (
                    <>
                        <div className="FacebookAuth">
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    textWrap: currentLanguage === 'fr'? 'wrap' : 'nowrap',
                                    textAlign: 'center',
                                    fontSize: '38px',
                                    lineHeight: '45px',
                                }}
                            >
                                {t('Processing with Facebook')}
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
                           
                                <Button
                                    onClick={() => {
                                        handleNextStep();
                                    
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
                            
                        </div>

                        <div className="BackToRegister slide-from-right"

                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                fontWeight : 'bold',
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
                                        {t('Back to Login')}
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
                                            fontWeight : 'bold',
                                        }}
                                    >
                                        {t('Back to Login')}
                                    </Typography>
                                </>
                            )}
                        </div>

                    </>
                )}

                {showUserinterest && (
                    <>
                        <div className="FacebookAith">
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontSize: '38px',
                                    lineHeight: '45px',
                                    textWrap : currentLanguage === 'fr'? 'wrap' : 'nowrap',
                                    textAlign : 'center',
                                }}
                            >
                                {t('Processing with Facebook')}
                            </Typography>
                        </div>
                        <div className="SelectInterestTypo"
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
                                    textAlign : 'center',

                                }}
                            >
                                {t('What type of projects you are up to?  Select')}
                                <span
                                    style={{

                                    }}
                                >
                                    {t('2 at least')}
                                </span>
                                <span
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
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
                        <div className="UserIntereset slide-from-right"
                            style={{
                                width: currentLanguage === 'ar' ? '102%' : '100%',
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
                                gap: '20px',

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
                        <div className="CreateAccountButton"
                           style={{
                            width: '100%', // Full width of the parent container
                            marginTop: '18px',
                            display: 'flex', // Use flexbox for alignment
                            justifyContent: 'center', // Center horizontally
                        }}
                         >
                            <Button onClick={handleRegistration}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '340px',
                                    position: 'relative',
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
                                        {t('Create an account')}
                                    </Typography>
                                )}

                            </Button>
                        </div>
                        <div className="BackToPevStep slide-from-right"
                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                gap: '6px',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent the default anchor behavior
                                handleBackToPevStep(); // Call the function
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
                                            fontWeight : 'bold',
                                        }}
                                    >
                                        {t('Back to previous step')}
                                    </Typography>
                                </>
                            )}
                        </div>

                    </>
                )}





            </div>
            {showAccountCreation && (
                <div className="LastStep"

                    style={{
                        height: '110vh',
                        width: '100%',
                        background: '#0E0E10',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
                    <img
                        src='https://res.cloudinary.com/damicjacf/image/upload/v1724631771/Capture_qf8psv.png'
                        alt="Logo"
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            zIndex: 100000000,
                        }}
                    />
                    {showSuccessAnimation && (
                        <Lottie
                            animationData={Created}
                            loop={false}
                            style={{ width: 100, height: 100, marginBottom: '-20px' }} // Adjust size as needed
                        />
                    )}


                    {/* Progress Bar */}
                    <div
                        style={{
                            width: '90%',
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
                    <span style={{
                        color: 'white', 
                        marginTop: '20px',
                         fontSize: '16px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                    }}>
                        {progress}%
                    </span>
                    {/* Progress Message */}
                    <p style={{
                        color: 'white',
                        marginTop: '20px',
                        fontSize: '18px', // Adjusted for small screens
                        fontWeight: 'bold',
                        lineHeight: '30px',
                        textAlign: 'center',
                        maxWidth: '90%',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                    }}>
                        {message}

                    </p>
                    {showBackToLogin && (
                        <div
                            className="BackToLogon slide-from-right"
                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                gap: '6px',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent the default anchor behavior
                                handleBackToSignin();
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
                                        {t('Signin Directly With Facebook')}
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
                                        {t('Signin using Facebook button')}
                                    </Typography>
                                </>
                            )}
                        </div>

                    )}

                </div>
            )}
        </>
    );
}

export default FacebookRegMobile;
