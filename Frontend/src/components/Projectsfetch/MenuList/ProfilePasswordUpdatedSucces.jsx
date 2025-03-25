import { Typography, Button } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PasswordIcon from '@mui/icons-material/Password';
import Lottie from 'lottie-react';
import PasswordSucces from '../../../assets/images/small-logos/PasswordSucces.json'


function ProfilePasswordUpdatedSucces({ handleCloseVerify }) {

    
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



    return (
        <div className='MainContainer '
            style={{
                width: '100%',
                height: 'auto',
                padding : '10px',
            }}
        >

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid white',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: '-1',

            }} />


            <div className="NewPassword slide-from-right "
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                     padding : '10px',

                }}
            >
                <div className="PasswordIcon slide-from-right "
                    style={{
                        height: '50px',
                        width: '50px',
                        border: '1px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        borderRadius: '13px',
                    }}
                >
                    <PasswordIcon sx={{ color: 'white', fontSize: '35px', }} />
                </div>
                <div className="NewPasswordUpdated slide-from-right"
                    style={{
                        width: currentLanguage === 'ar' ? '120%' : 'unset',
                        display: currentLanguage === 'ar' ? 'flex' : 'unset',
                        justifyContent: currentLanguage === 'ar' ? 'center' : 'unset',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            color: 'white',
                            fontSize: '38px',

                        }}
                    >
                        {t('Password updated!')}
                    </Typography>
                </div>
                <div className="ReturnTypo">
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            color: 'white',
                            fontSize: '16px',
                            textWrap: 'nowrap',
                        }}
                    >

                        {t('Your password has been successfully updated.')}
                    </Typography>
                </div>
                <div className="SuccesLottiesIcon">
                    <Lottie
                        animationData={PasswordSucces}
                        loop={false}
                        style={{ width: 200, height: 200 }}
                    />
                </div>
                <div className="BackToLogin"
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        gap: '6px',
                        cursor: 'pointer',
                    }}
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor behavior
                        handleBackToLogin(); // Call the function
                    }}
                >
                    {currentLanguage === 'ar' ? (
                        <>
                            <Typography
                                sx={{
                                    fontFamily: '"Droid Arabic Kufi", serif', // Use Arabic font
                                    color: 'white',
                                    fontSize: '15px',
                                }}
                            >
                                {t('إغلاق')} {/* Arabic translation for "Back to log in" */}
                            </Typography>
                            <div className="Icon">
                                <ArrowBackIcon sx={{ color: 'white' }} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="Icon" onClick={handleCloseVerify} >
                                <ArrowBackIcon sx={{ color: 'white' }} />
                            </div>
                            <Typography onClick={handleCloseVerify}
                                sx={{
                                    fontFamily: '"Airbnbcereal", sans-serif', // Use English font
                                    color: 'white',
                                    fontSize: '15px',
                                }}
                            >
                                {t('Close')} 
                            </Typography>
                        </>
                    )}
                </div>

            </div>

        </div>
    )
}

export default ProfilePasswordUpdatedSucces