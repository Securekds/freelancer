import React, { useEffect, useState, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { faHandHoldingDollar, faUserTie, faCircleCheck, faSatelliteDish, faHandshake, faGlobe, faFolderOpen, faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from '../../Context/UserContext.jsx'





function OfferDetails({ handleCloseOfferDetails, selectedOffer }) {
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




    const { user, } = useUser();

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;

        if (imagePath.startsWith('http')) {
            return imagePath;
        }

        const cleanPath = imagePath.startsWith('/')
            ? imagePath
            : `/${imagePath}`;

        const fullUrl = `${import.meta.env.VITE_BACKEND_URL}${cleanPath}`;
        console.log('Generated image URL:', fullUrl);
        return fullUrl;
    };
    const profileImageUrl = selectedOffer?.seller?.profileImg ? getImageUrl(selectedOffer?.seller?.profileImg) : null;

    const containsArabic = (text) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    };


    return (
        <div className='DailogContainer'
            style={{
                width: '100%',
                minHeight: 'auto',
                minWidth: 'min-content',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',



            }}
        >
            <div style={{
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
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >

                        {t('Seller Basic information')}
                    </Typography>
                </div>

                <div className="CloseIcon"
                    onClick={handleCloseOfferDetails}
                    style={{
                        cursor: 'pointer',
                        marginTop: '8px',

                    }}
                >
                    <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
                </div>

            </div>
            <div className="UserInfo"
                style={{
                    borderRadius: '0.75rem',
                    width: '100%',
                    border: '1px solid white',
                    height: 'auto',
                    padding: '10px',
                    display: 'flex',
                    flexDirection : isSmallScreen? 'column' : 'unset',
                    gap : isSmallScreen? '5px' : 'unset',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div className="UserPhotoandName"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: currentLanguage === 'ar' ? '6px' : 'unset',

                    }}>
                        {/* Profile Picture with Badge */}
                        <Box sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '2px solid #ccc',
                            position: 'relative',
                            overflow: 'visible',
                        }}>
                            <img

                                alt="Profile"
                                src={profileImageUrl}

                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />

                        </Box>

                        <div className="UserInfo"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '3px',
                            }}
                        >

                            <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {/* User Name */}
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: (selectedOffer?.seller?.firstName && containsArabic(selectedOffer?.seller?.firstName)) ||
                                            (selectedOffer?.seller?.lastName && containsArabic(selectedOffer?.seller?.lastName))
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                        fontSize: '14px',
                                        maxWidth: '200px', // Set max width for the name
                                        whiteSpace: 'nowrap', // Prevent wrapping
                                        overflow: 'hidden', // Hide overflowed content
                                        textOverflow: 'ellipsis', // Add ellipsis if text overflows
                                    }}
                                >
                                    {selectedOffer?.seller?.firstName} {selectedOffer?.seller?.lastName}


                                </Typography>




                            </Box>
                            <Box sx={{ marginLeft: '5px', display: 'flex', alignItems: 'center', gap: '7px', }}>
                                <div className="Time"
                                    style={{
                                        display: 'flex',
                                        gap: currentLanguage === 'ar' ? '5px' : 'unset',
                                        alignItems: 'center',
                                    }}
                                >
                                    <LocationOnIcon sx={{ color: 'white', fontSize: '16px', opacity: '0.9', }} />
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            marginLeft: '3px',
                                            fontSize: '13px',
                                            fontFamily: selectedOffer?.seller?.country && containsArabic(selectedOffer?.seller?.country)
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {selectedOffer?.seller?.country}
                                    </Typography>



                                </div>



                            </Box>
                        </div>
                    </Box>


                </div>
                <div className="PhoneNumber"
                    style={{
                        display: 'flex',
                        gap: '5px',

                    }}
                >
                    <PhoneForwardedIcon sx={{ color: 'white' }} />
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: '14px',
                            maxWidth: '200px', // Set max width for the name
                            whiteSpace: 'nowrap', // Prevent wrapping
                            overflow: 'hidden', // Hide overflowed content
                            textOverflow: 'ellipsis', // Add ellipsis if text overflows
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px' // Adds space between country code and phone number
                        }}
                    >
                        {selectedOffer?.seller?.countryCode}
                        {selectedOffer?.seller?.phoneNumber}
                    </Typography>


                </div>
                <div className="Role"
                    style={{
                        display: 'flex',
                        gap: '5px',

                    }}
                >
                    <FontAwesomeIcon icon={faUserTie}
                        style={{
                            transform: 'rotate(0deg)',
                            fontSize: '16px',
                            color: 'white',
                        }} // Reset any unwanted rotation
                    />
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontSize: '14px',
                            maxWidth: '200px', // Set max width for the name
                            whiteSpace: 'nowrap', // Prevent wrapping
                            overflow: 'hidden', // Hide overflowed content
                            textOverflow: 'ellipsis', // Add ellipsis if text overflows
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        Website-Developer
                    </Typography>


                </div>
                <div className="Button">
                    <Button variant="outlined"

                        sx={{

                            borderColor: 'white', '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                            {t('View Profile')}
                        </Typography>
                    </Button>
                </div>

            </div>
            <div className="OfferInfo"
                style={{
                    display: 'flex',
                    alignItems: 'center',


                }}
            >
                <div className="Typo">
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >

                        {t('Seller Offer information')}
                    </Typography>
                </div>



            </div>
            <div className="UserInfo"
                style={{

                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',

                }}
            >
                <div className="CssGlass OfferPrice"
                    style={{
                        display: 'flex',
                        width: '100%',
                        gap: '10px',
                        padding: '10px',
                        alignItems: 'center',
                        justifyContent: 'space-between', // Ensure button goes to the end
                        margin: '0 auto', // Center the div horizontally
                    }}
                >

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px' // 5px gap between Rank and Typography 
                    }}>
                        <div className="IconBudget"
                            style={{
                                backgroundColor: "#3d2d6f",
                                width: "40px", // Adjust size as needed
                                height: "40px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesomeIcon icon={faHandHoldingDollar}
                                style={{
                                    transform: 'rotate(0deg)',
                                    fontSize: '23px',
                                    color: '#8b5cf6',
                                }} // Reset any unwanted rotation
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
                                {t('Offer Price')}
                            </Typography>
                        </div>
                    </div>


                    <Button
                        sx={{
                            width: '23%',
                            maxWidth: '23%',
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
                                textWrap: 'nowrap',
                                gap: '5px',
                                fontFamily: '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {selectedOffer?.price}$
                        </Typography>

                    </Button>
                </div>
                <div className="CssGlass ProjectOffer"
                    style={{
                        display: 'flex',
                        width: '100%',
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
                                backgroundColor: "#1ba198",
                                width: "40px", // Adjust size as needed
                                height: "40px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesomeIcon icon={faGlobe}
                                style={{
                                    transform: 'rotate(0deg)',
                                    fontSize: '23px',
                                    color: '#26eec3'
                                }} // Reset any unwanted rotation
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
                                {t('Estimated Delivery')}
                            </Typography>
                        </div>

                    </div>


                    <Button
                        sx={{
                            width: '23%',
                            maxWidth: '23%',
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
                                textWrap: 'nowrap',
                                gap: '5px',
                                fontFamily: '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {selectedOffer?.timeline}
                        </Typography>

                    </Button>

                </div>



            </div>
            <div className="SellerNote"
                style={{
                    display: 'flex',
                    justifyContent: 'center',



                }}
            >
                <div className="Typo">
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                    >

                        {t('Seller Note')}

                    </Typography>
                </div>




            </div>
            <div className="SellerNote"
                style={{
                    display: 'flex',
                    justifyContent: 'center',




                }}
            >
                <div className="Typo"
                    style={{
                        marginTop: '-15px',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '16px',
                            textAlign: 'center',
                            fontFamily: selectedOffer?.comment && containsArabic(selectedOffer?.comment)
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                            marginTop: '8px',
                        }}
                    >
                        {selectedOffer?.comment}
                    </Typography>

                </div>




            </div>




        </div>
    )
}

export default OfferDetails
