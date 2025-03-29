import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Player } from '@lottiefiles/react-lottie-player';
import Deposit from '../../../assets/images/small-logos/Deposit.json';
import useMediaQuery from '@mui/material/useMediaQuery';
import PaymentFailed from '../../../assets/images/small-logos/PaymentFailed.json';
import PaymentDone from '../../../assets/images/small-logos/PaymentDone.json';
import { useUser } from '../../../Context/UserContext.jsx';
import CloseIcon from '@mui/icons-material/Close';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import axios from 'axios';

// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});


function PayMemberShipMenu({ isClose, selectedPlan }) {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    const { user } = useUser();
    const [amount, setAmount] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const [showPaypalForm, setShowPaypalForm] = useState(false);
    const [showChargilyForm, setShowChargilyForm] = useState(false);
    const [showDefaultForm, setShowDefaultForm] = useState(true);
    const [showPaymentMethod, setShowPaymentMethod] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [selected, setSelected] = useState(null);

    const handleSelect = (method) => {
        setSelected(method);
    };

    const handleNext = () => {
        if (selected === "Paypal" || selected === "Cards") {
            setShowPaymentMethod(false);
            setShowPaypalForm(true);
        }
    };




    const handlePayMemberShip = async () => {
        setIsLoading(true);


        localStorage.setItem('tempUserId', user?._id);
        localStorage.setItem('selectedPlan', selectedPlan);
        localStorage.setItem('shouldOpenMemberShipMenu', 'true');




        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/server/payment/create-membership-payment`,
                {

                    userId: user?._id,
                    membershipType: selectedPlan
                },
                { withCredentials: true }
            );

            window.location.href = response.data.approvalUrl;
        } catch (error) {
            console.error('Payment failed:', error);
            setShowDefaultForm(false);
            setPaymentFailed(true);
            setIsLoading(false);
        }
    };
    // Step 2: Execute payment after PayPal redirect
    // Retrieve userId from localStorage after redirect
    // Updated useEffect for handling PayPal redirect
    useEffect(() => {

        const executePayment = async () => {

            setIsLoading(true); // Set loading state when processing  
            const urlParams = new URLSearchParams(window.location.search);
            const paymentId = urlParams.get('paymentId');
            const payerId = urlParams.get('PayerID');

            if (paymentId && payerId) {
                const storedUserId = localStorage.getItem('tempUserId');
                const storedMemberShip = localStorage.getItem('selectedPlan');

                if (!storedUserId) {
                    console.error("User ID not found in localStorage");
                    setIsLoading(false);
                    return;
                }

                try {
                    await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/server/payment/execute-membership-payment`,
                        {
                            paymentId,
                            payerId,
                            userId: storedUserId,
                            membershipType: storedMemberShip

                        },
                        { withCredentials: true }
                    );

                    localStorage.removeItem('tempUserId');
                    localStorage.removeItem('selectedPlan');
                    setShowDefaultForm(false);
                    setPaymentSuccess(true);
                } catch (error) {
                    console.error("Payment execution error:", error.response?.data || error);
                    setShowDefaultForm(false);
                    setPaymentFailed(true);
                } finally {
                    setIsLoading(false); // Stop loading regardless of success or failure
                }
            }
        };

        if (window.location.search.includes('paymentId') ||
            window.location.search.includes('PayerID')) {
            executePayment();
        }
    }, []);








    const HandleTryAgain = () => {
        setPaymentFailed(false);
        setShowDefaultForm(true);
    }


    return (
        <div
            className="CallDailog"
            style={{
                width: isSmallScreen ? '90vw' : '55vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                gap: '10px',
                position: 'relative',
            }}
        >
            <div className='Bg'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid white',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: '-1',
                }}
            />
            <div className='ClosingIcon'
                onClick={isClose}
                style={{
                    position: 'absolute',
                    right: currentLanguage === 'ar' ? '91%' : '2%',
                    top: '5%',
                    zIndex: '22222',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                <CloseIcon sx={{ fontSize: '20px' }} />
            </div>
            {showDefaultForm && (
                <>

                    <div className="Lottie"
                        style={{
                            width: '35%',
                        }}
                    >
                        <Player
                            src={Deposit}
                            autoplay
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>
                    <div className="Depoti"
                        style={{
                            display: showPaypalForm ? 'none' : 'unset',
                        }}
                    >
                        <Typography
                            style={{
                                color: 'white',
                                fontFamily:
                                    currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            {t('Please Select Your Payment Method')}
                        </Typography>
                    </div>
                    {showPaymentMethod && (
                        <>
                            <div className="PaymentMethod"

                                style={{
                                    width: isSmallScreen ? '100%' : "80%",
                                    display: "flex",
                                    gap: '5px',
                                }}
                            >
                                <div
                                    className="Paypal"
                                    onClick={() => handleSelect("Paypal")}
                                    style={{
                                        width: "33%",
                                        border: selected === "Paypal" ? "3px solid blue" : "1px solid white",
                                        height: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "border 0.3s",
                                    }}
                                >
                                    <img
                                        src="/src/assets/images/small-logos/Paypal.png"
                                        alt="Paypal"
                                        style={{ width: "120px", height: "120px" }}
                                    />
                                </div>

                                <div
                                    className="Cards"
                                    onClick={() => handleSelect("Cards")}
                                    style={{
                                        width: "33%",
                                        border: selected === "Cards" ? "3px solid blue" : "1px solid white",
                                        height: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "border 0.3s",
                                    }}
                                >
                                    <img
                                        src="/src/assets/images/small-logos/Pap.png"
                                        alt="Cards"
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>

                                <div
                                    className="Algeria"
                                    onClick={() => handleSelect("Algeria")}
                                    style={{
                                        width: "33%",
                                        border: selected === "Algeria" ? "3px solid blue" : "1px solid white",
                                        height: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "border 0.3s",
                                    }}
                                >
                                    <img
                                        src="/src/assets/images/small-logos/carte_CIB-removebg-preview.png"
                                        alt="Algeria"
                                        style={{ width: "80px", height: "60px" }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    width: isSmallScreen ? '100%' : "80%",
                                }}
                            >
                                <Button
                                    onClick={handlePayMemberShip}

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
                                            {t('Pay The MemberShip')}
                                        </Typography>
                                    )}


                                </Button>
                            </div>
                        </>
                    )}


                </>
            )}

            {paymentFailed && (
                <>
                    <div className="Cont slide-from-right"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div className="Lottie"
                            style={{
                                marginTop: '-40px',
                            }}
                        >
                            <Player
                                src={PaymentFailed}
                                autoplay
                                loop={false}
                                style={{
                                    width: '200px',
                                    height: '200px'
                                }}
                            />
                        </div>
                        <div className="Div"
                            style={{
                                marginTop: '-50px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: 'white',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Payment failed. Please try again or use a different method.')}
                            </Typography>
                            <Button
                                onClick={HandleTryAgain}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    marginTop: '5px',
                                    color: 'white',
                                    borderColor: 'none',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >


                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        fontSize: '13px',
                                    }}
                                >
                                    {t('Try Again')}
                                </Typography>


                            </Button>
                        </div>
                    </div>
                </>
            )}
            {paymentSuccess && (
                <>
                    <div className="Cont slide-from-right"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div className="Lottie"
                            style={{
                                marginTop: '-80px',
                            }}
                        >
                            <Player
                                src={PaymentDone}
                                autoplay
                                loop={false}
                                style={{
                                    width: '260px',
                                    height: '260px'
                                }}
                            />
                        </div>
                        <div className="Div"
                            style={{
                                marginTop: '-80px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: 'white',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',

                                }}
                            >
                                {t('Payment successful!')}
                            </Typography>
                            <Typography
                                style={{
                                    color: 'white',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',

                                }}
                            >
                                {t('Your funds have been credited to your account. You can now use them to purchase projects.')}
                            </Typography>
                            <Button
                                onClick={isClose}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    marginTop: '5px',
                                    color: 'white',
                                    borderColor: 'none',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >


                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        fontSize: '13px',
                                    }}
                                >
                                    {t('Close')}
                                </Typography>


                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PayMemberShipMenu;