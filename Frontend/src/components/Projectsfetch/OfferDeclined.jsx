import React, { useEffect, useState, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../assets/images/small-logos/BillingInfo.json';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useUser } from '../../Context/UserContext.jsx'
import { toast } from 'react-toastify';
import { useGig } from '../../Context/GigContext.jsx';






function OfferDeclined({ handleCloseOfferDeclined, selectedOffer }) {

    console.log("Selected Offer:", selectedOffer);
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);


    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)')
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)')
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const { user } = useUser();

    const userId = user ? user._id : null;

    const { gigId } = useParams(); // Extract gigId from the URL
    const [isLoading, setIsLoading] = useState(false);


    const updateOfferStatus = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/offers/${selectedOffer._id}`,
                {
                    status: "rejected",
                    userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImg: user.profileImg || "",
                    gigId,
                },
                { withCredentials: true }
            );

            console.log("Offer Status Response:", response.data);

            // Optional: Show success feedback
            toast("Offer Declined", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleCloseOfferDeclined();

            return response.data;

        } catch (error) {
            console.error("Error updating offer status:", error.response?.data || error.message);
        }
    };





    return (
        <div className='DailogContainer'
            style={{
                width: '100%',
                minHeight: 'auto',
                minWidth: 'min-content',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '5px',



            }}
        >
            <div className='BgBackground'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid white',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: '-1',

                }} />

            <div className="HeaderBasicInfo"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',

                }}
            >
                <div className="Typo">
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            display: 'none',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >

                        {t('Confirm Offer Acceptance')}
                    </Typography>
                </div>

                <div className="CloseIcon"
                    onClick={handleCloseOfferDeclined}
                    style={{
                        cursor: 'pointer',
                        marginTop: '8px',

                    }}
                >
                    <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
                </div>

            </div>
            <div className="Lottie"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    margin: 0,
                    overflow: 'hidden',
                    height: '90px',
                    marginTop: '-20px',
                }}
            >
                <Player
                    src={animationData}
                    autoplay
                    style={{
                        display: 'block',
                        width: '200px',
                        height: '200px'
                    }}
                />
            </div>

            <div className="Confirm"
                style={{

                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <Typography
                    style={{
                        color: 'white',
                        fontSize: '20px',
                        textAlign: 'center',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                    }}
                >
                    {t('Confirm')}
                </Typography>
                <Typography
                    style={{
                        fontSize: '18px',
                        color: 'white',
                        marginTop: '-1px',
                        textAlign: 'center',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                    }}
                >
                    {t('Are you sure you want to decline this offer?')}
                </Typography>
            </div>
            <div className="Decline"
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',

                    marginBottom: '-20px',
                }}
            >
                <Button onClick={updateOfferStatus}
                    variant="outlined"
                    className="btn-grad"
                    disabled={isLoading}
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
                            {t('Confirm Decline')}
                        </Typography>
                    )}

                </Button>
                <Button onClick={handleCloseOfferDeclined}
                    variant="outlined"
                    className="btn-grad"
                    sx={{
                        width: '100%',
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

                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: '13px',
                        }}
                    >
                        {t('Cancel')}
                    </Typography>

                </Button>
            </div>







        </div>
    )
}

export default OfferDeclined
