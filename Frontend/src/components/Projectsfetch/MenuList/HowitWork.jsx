import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button } from '@mui/material';
import { useUser } from '../../../Context/UserContext.jsx';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';




function HowitWork({ handleHowItsWorkClose }) {
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
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');
    const { user, isSeller } = useUser();

    return (
        <div className="HowitsWork"

            style={{
                width: isSmallScreen? '90vw' : '70vw',
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
            {isSeller && (
                <>
                    <div className="Steps1"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div">
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('1️⃣ Communicate & Finalize the Details')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Engage with the buyer to discuss and finalize the project requirements, pricing, and delivery timeline before proceeding.')}
                            </Typography>
                        </div>


                    </div>
                    <div className="Steps2"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div"

                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('2️⃣ Submit Your Offer')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Once an agreement is reached, enter the negotiated price and the estimated delivery time to formalize the deal.')}
                            </Typography>
                        </div>


                    </div>

                    <div className="Steps3"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div">
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('3️⃣ Request Buyer Validation')}

                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Click the “Send Validation Request” button and wait for the buyer confirmation. Once approved, the project will officially start, allowing you to begin your work.')}
                            </Typography>
                        </div>

                    </div>
                    <div className="Steps3"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div">
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('4️⃣ Receive Holding Funds')}

                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Once the buyer accepts the project, the agreed payment will be securely held in escrow. These funds will be released to you upon successful project delivery and buyer approval.')}
                            </Typography>
                        </div>

                    </div>
                </>
            )}

            {!isSeller && (
                <>
                    <div className="Steps1"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div">
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('1️⃣ Discuss & Finalize Project Details')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Engage with the seller to discuss your project requirements, pricing, and expected delivery timeline. Ensure all aspects of the project are clear before proceeding.')}
                            </Typography>
                        </div>


                    </div>
                    <div className="Steps2"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div"

                        >
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('2️⃣ Review & Approve the Offer')}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Once the seller submits their final offer, including the agreed price and delivery time, you will receive a request to start the project. You can either accept to proceed or decline if changes are needed. Upon acceptance, the agreed amount will be securely held in escrow.')}
                            </Typography>
                        </div>


                    </div>

                    <div className="Steps3"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div">
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('3️⃣ Secure Project Delivery')}

                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('When the delivery time ends, the seller will submit the completed project in a secure environment (e.g., with watermarks or restricted access). You will have the option to:')}
                            </Typography>
                        </div>

                    </div>
                    <div className="Steps3"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <span
                                style={{
                                    color: 'blue',
                                    marginTop: '-2px',

                                }}
                            >
                                ⦿
                            </span>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Release payment to the seller if the project meets your expectations.')}
                            </Typography>

                        </div>
                        <div className="Div"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <span
                                style={{
                                    color: 'blue',
                                    marginTop: '-2px',

                                }}
                            >
                                ⦿
                            </span>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Request revisions (up to 3 times) if changes are needed.')}
                            </Typography>

                        </div>
                        <div className="Div"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <span
                                style={{
                                    color: 'blue',
                                    marginTop: '-2px',

                                }}
                            >
                                ⦿
                            </span>
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',

                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    opacity: '0.5',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('If a resolution is not reached after three revisions, an admin will intervene to review the dispute and provide a fair resolution.')}
                            </Typography>

                        </div>


                    </div>
                    <div className="Steps3"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className="Div">
                            <Typography
                                sx={{
                                    color: '#2df873',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: 'bold',

                                }}
                            >
                                {t('Your funds remain protected until you are satisfied with the final delivery.')}



                            </Typography>

                        </div>

                    </div>
                </>
            )}

            <div className="Div"
                style={{
                    width: '100%',
                }}
            >
                <Button
                    variant="outlined"
                    className="btn-grad"
                    onClick={handleHowItsWorkClose}
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
                        {t('Close')}
                    </Typography>


                </Button>

            </div>











        </div>
    );
}

export default HowitWork;