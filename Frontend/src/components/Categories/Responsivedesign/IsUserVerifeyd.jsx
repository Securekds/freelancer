import { Tooltip, Typography, Button } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '../../../Context/UserContext.jsx'
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import PhoneCode from '../../../assets/images/small-logos/PhoneCode.json';
import UserNotVerifeyd from '../../../assets/images/small-logos/UserNotVerifeyd.json';
import { motion } from "framer-motion";
import axios from 'axios';












function IsUserVerifeyd({ onCloseClick }) {

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


    const { user } = useUser();



    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');



  const navigate = useNavigate();

  // Function to handle click and trigger animation
  const handleProfileRedirect = () => {

    navigate('/userdashboard/profile/settings');

  };






    return (
        <div
            className="MainContainer"
            style={{
                width: "100%",
                height: "auto",
                display: "flex",
                padding: '17px',
                flexDirection: "column",

                justifyContent: 'center',
                alignItems: 'center',
                gap: "10px",
                position: "relative",

            }}
        >
            <div className="BlurBG"

                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    bottom: 0,
                    borderRadius: "16px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: "-1",
                }}
            />

            <div className="CloseIcon"

                style={{
                    position: "absolute", // Absolute positioning relative to the MainContainer
                    top: "10px", // Adjust from the top
                    right: "25px", // Adjust from the right
                    cursor: "pointer", // Show pointer cursor on hover
                    zIndex: 1, // Ensure it's on top of other elements
                }}
                onClick={onCloseClick} // Trigger the onCloseClick function when clicked
            >
                <CloseIcon style={{ color: "#ffffff", fontSize: "20px" }} />{" "}
                {/* Customize icon size and color */}
            </div>
            <div className="lotti">
                <Lottie animationData={UserNotVerifeyd} loop={true} style={{ width: 170, height: 170 }} />

            </div>
            <div className="div"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '90%',

                }}
            >
                <Typography
                    sx={{
                        color: 'red',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '17px',
                        textAlign : 'center',
                    }}
                >
                    {t('Account Verification Required')}
                </Typography>
                <Typography
                    sx={{
                        color: 'white',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        textAlign : 'center',


                    }}
                >
                    {t('You cant post a new project until you complete your account verification steps.')}
                </Typography>
                <Button

                    variant="outlined"
                    onClick={handleProfileRedirect}
                    className="btn-grad"
                    sx={{
                        width: '96%',
                        height: "38px",
                        backgroundColor: "transparent",
                        color: "white",
                        marginTop : '10px',

                        borderColor: "none",

                        "&:hover": {
                            borderColor: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                    }}
                >

                    <Typography
                        sx={{
                            color: "white",
                            fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            fontSize: "13px",
                        }}
                    >
                        {t("Start Verification from here")}
                    </Typography>

                </Button>
            </div>





        </div>

    )
}

export default IsUserVerifeyd