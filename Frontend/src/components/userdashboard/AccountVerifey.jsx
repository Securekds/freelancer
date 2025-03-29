import React, { useEffect, useState, useRef } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast, ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import EditOffIcon from '@mui/icons-material/EditOff';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Player } from '@lottiefiles/react-lottie-player';
import AccountVerifeyIcon from '../../assets/images/small-logos/AccountVerifeyIcon.json';


function AccountVerifey() {
    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);



    return (
        <div
            style={{
                width: '80%',
                height: '100px',
                maxWidth: '1200px',



            }}
        >

            <>
                <div className="CssGlass"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '15px',
                    }}
                >
                    <div className="ProfileIcon"
                        style={{
                            marginTop: '-10px',
                            zIndex: '111111111111111111111'
                        }}
                    >
                        <Player
                            src={AccountVerifeyIcon}
                            autoplay
                            style={{
                                width: 90,
                                height: 90,
                                zIndex: '111111111111111111111'
                            }}
                        />
                    </div>
                    <div className="Message"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'white',
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                            }}
                        >
                            Hello Nabil!
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                whiteSpace: 'normal', // Allow text to wrap
                                wordWrap: 'break-word', // Break long words if necessary
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            Congratulations and welcome to  Khadamat platform! To start enjoying our services, please complete your
                            <span style={{ display: 'block' }}>
                                profile verification.
                            </span>
                        </Typography>
                    </div>
                    <div className="Button" style={{ cursor: 'pointer' }}>
                        <Button
                            variant='outlined'
                            sx={{
                                backgroundImage: 'linear-gradient(310deg, #141727 0%, #3A416F 100%)',
                                border: 'none',
                                color: '#fff',
                                zIndex: '111111111111111111111',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                            }}
                        >
                            Verify
                        </Button>
                    </div>
                    <div className="ClosingIcon" style={{ cursor: 'pointer', zIndex: '111111111111111111111' }}> {/* Add cursor style here */}
                        <CloseIcon sx={{
                            fontSize: '20px',
                            color: 'white',
                            marginTop: '10px',
                            stroke: 'white', // Set the stroke color
                            strokeWidth: 1, // Add stroke thickness
                        }} />
                    </div>
                </div>
            </>





        </div>
    )
}

export default AccountVerifey