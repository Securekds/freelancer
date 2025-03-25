import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import WifiIcon from '@mui/icons-material/Wifi';
import { Button, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';







function Billingcontent() {

    // State to track the selected button in the sidenav
    const [selectedButton, setSelectedButton] = useState('');

    // Hook to access the current location
    const location = useLocation();

    // Effect to update the selected button based on the current route
    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;

        // Get the previously selected button from local storage
        const storedSelectedButton = localStorage.getItem('selectedButton');

        // If there is a previously selected button in local storage and the current route matches, set the selected button
        if (storedSelectedButton && pathname === `/${storedSelectedButton}`) {
            setSelectedButton(storedSelectedButton);
        } else {
            // Set the selected button based on the pathname
            if (pathname === '/billing') {
                setSelectedButton('Billing');
            } else {
                // Handle other routes if needed
            }
        }
    }, [location]);

    // Effect to save the selected button to local storage
    useEffect(() => {
        localStorage.setItem('selectedButton', selectedButton);
    }, [selectedButton]);

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

    const isScreenUnder450px = useMediaQuery('(max-width:450px)');

   



    return (
        <div>
           
            {!isScreenUnder450px ? (
                <div style={{ display: 'flex', flexDirection: 'row', minHeight: '200vh' }}>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                        position: 'relative',
                        left: '267px',
                    }}>
                        <div className='CardsMobile'
                            style={{
                                position: isScreenUnder450px ? 'relative' : 'undifined',
                                right: isScreenUnder450px ? '255px' : 'undifined',
                            }}
                        >
                            <div className="MasterCard"
                                style={{
                                    width: '95%',
                                    minHeight: '230px',
                                    background: 'linear-gradient(195deg, #323a54, #111827)',
                                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                    position: 'relative',
                                    marginTop: '20px',
                                    backgroundImage: 'url(public/images/MasterCard.jpg)',
                                    backgroundSize: 'cover',
                                    borderRadius: '0.75rem',
                                    border: '0 solid rgba(0, 0, 0, 0.125)',
                                    
                                }}
                            >
                                <div className="CardContainer"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <div className="Wifi"
                                        style={{
                                            marginTop: '25px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <WifiIcon sx={{ color: 'white' }} />
                                    </div>
                                    <div className="CardNumber"
                                        style={{
                                            marginTop: '20px',
                                        }}
                                    >
                                        <Typography sx={{
                                            color: 'white',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            letterSpacing: '1.5px',
                                            wordSpacing: '8px',
                                        }} >
                                            4562 1122 4594 7852
                                        </Typography>
                                        <div className="CardNameEXP"
                                            style={{
                                                marginTop: '40px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '280px'
                                            }}
                                        >
                                            <div className='Cardname'>
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        letterSpacing: '0.02857em',
                                                        opacity: '0.8',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Card Holder
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        letterSpacing: '0.02857em',
                                                        fontWeight: 'bold',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Nabil Hamici
                                                </Typography>
                                            </div>
                                            <div className='CardEXP'>
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        letterSpacing: '0.02857em',
                                                        opacity: '0.8',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    Expires
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        letterSpacing: '0.02857em',
                                                        fontWeight: 'bold',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    11/27
                                                </Typography>
                                            </div>
                                            <div className="Logo">
                                                <img style={{ marginTop: '15px' }} width={30} src="http://localhost:3000/static/media/mastercard.27fca3e7637a9458fb64.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="DahabiyaCard"
                                style={{
                                    width: '95%',
                                    minHeight: '243px',
                                    background: 'linear-gradient(195deg, #323a54, #111827)',
                                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                    position: 'relative',
                                    marginTop: '10px',
                                    backgroundImage: 'url(public/images/Carddahabiya.jpg)',
                                    backgroundSize: 'cover',
                                    borderRadius: '0.75rem',
                                    border: '0 solid rgba(0, 0, 0, 0.125)',
                                }}
                            >
                                <div className="CardContainer"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <div className="DahabiyaNumber"
                                        style={{
                                            marginTop: '120px',
                                            marginLeft: '30px',
                                        }}
                                    >
                                        <Typography sx={{
                                            color: '#CDB975',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            letterSpacing: '1.5px',
                                            wordSpacing: '18px',
                                        }} >
                                            4562 1122 4594 7852
                                        </Typography>
                                        <div className="EXP"
                                            style={{
                                                marginTop: '5px'
                                            }}
                                        >
                                            <Typography sx={{
                                                color: '#CDB975',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                                letterSpacing: '1.5px',
                                            }} >
                                                06/28 <span style={{ fontSize: '16px' }}>Expires</span>
                                            </Typography>
                                            <div style={{
                                                marginTop: '5px'
                                            }} >
                                                <Typography sx={{
                                                    color: '#CDB975',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                    letterSpacing: '1.5px',
                                                }} >
                                                    Hamici Nabil
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="PaymentMethod"
                            style={{
                                width: '730px',
                                minHeight: '140px',
                                background: '#202940',
                                boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                position: 'relative',
                                marginTop: '15px',
                                position: 'relative',
                                left: '130px',
                                borderRadius: '0.75rem',
                                border: '0 solid rgba(0, 0, 0, 0.125)',
                                padding: '20px',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                border: '1px solid rgba(255, 255, 255, 0.18)', 
                            }}
                        >
                            <div className='Payment'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                    }}
                                >
                                    Payment Method
                                </Typography>
                                <Button
                                    sx={{
                                        background: 'rgb(255 255 255 / 15%)',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        width: '160px',
                                        height: '40px',
                                        boxShadow: '0rem 0.1875rem 0.1875rem 0rem rgba(52, 71, 103, 0.15),0rem 0.1875rem 0.0625rem -0.125rem rgba(52, 71, 103, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(52, 71, 103, 0.15)',

                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        +  Add New Card
                                    </Typography>
                                </Button>
                            </div>
                            <div className="Cards"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '20px',

                                }}
                            >
                                <div className="Master"
                                    style={{
                                        width: '320px',
                                        height: '70px',
                                        border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <div className='Container'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '15px',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                        }}
                                    >
                                        <div className="Img" style={{ flexShrink: 0 }}>
                                            <img width={25} src="http://localhost:3000/static/media/mastercard.27fca3e7637a9458fb64.png" alt="" />
                                        </div>
                                        <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '15px',
                                                    letterSpacing: '1.5px',
                                                    wordSpacing: '8px',

                                                }}
                                            >
                                                ****  ****  ****  7852
                                            </Typography>
                                        </div>
                                        <div className="modify" style={{ flexShrink: 0, cursor: 'pointer' }}>
                                            <EditIcon style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="Dahabiya"
                                    style={{
                                        width: '320px',
                                        height: '70px',
                                        border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <div className='Container'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '15px',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                        }}
                                    >
                                        <div className="Img" style={{ flexShrink: 0 }}>
                                            <img width={25} src="https://pay.chargily.dz/test/images/edahabia-card.svg" alt="" />
                                        </div>
                                        <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '15px',
                                                    letterSpacing: '1.5px',
                                                    wordSpacing: '8px',

                                                }}
                                            >
                                                ****  ****  ****  7852
                                            </Typography>
                                        </div>
                                        <div className="modify" style={{ flexShrink: 0, cursor: 'pointer', }}>
                                            <EditIcon style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='ContentContainer' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '980px',
                            height: '400px',
                        }} >
                            <div className="BillingInformation"
                                style={{
                                    width: '560px',
                                    minHeight: '240px',
                                    background: '#202940',
                                    marginTop: '15px',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                    border: '0 solid rgba(0, 0, 0, 0.125)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                    border: '1px solid rgba(255, 255, 255, 0.18)', 

                                }}
                            >
                                <div style={{
                                    marginTop: '20px',
                                    marginLeft: '20px',
                                }} >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Billing Information
                                    </Typography>
                                    <div className="typo "
                                        style={{
                                            marginTop: '40px',
                                            marginLeft: '20px',
                                            width: '440px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',

                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                width: '200px',


                                            }}
                                        >
                                            Nabil hamici
                                        </Typography>
                                        <div style={{ display: 'flex', alignItems: 'center' }} >
                                            <DeleteIcon sx={{ color: '#F65F53', fontSize: '17px' }} />
                                            <Typography
                                                sx={{
                                                    color: '#F65F53',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                DELETE
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} >
                                            <EditIcon sx={{ color: '#fff', fontSize: '17px' }} />
                                            <Typography
                                                sx={{
                                                    color: '#fff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                EDIT
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="information"
                                        style={{
                                            marginTop: '20px',
                                            marginLeft: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '5px',

                                        }}
                                    >
                                        <div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: '',
                                                    fontSize: '12px',
                                                    width: '200px',


                                                }}
                                            >
                                                Company Name :
                                                <span
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'white',
                                                        fontWeight: 'bold'

                                                    }}
                                                >
                                                    Viking Burrito
                                                </span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: '',
                                                    fontSize: '12px',
                                                    width: '250px',


                                                }}
                                            >
                                                Email Address :
                                                <span
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'white',
                                                        fontWeight: 'bold'

                                                    }}
                                                >
                                                    oliver@burrito.com
                                                </span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: '',
                                                    fontSize: '12px',
                                                    width: '200px',


                                                }}
                                            >
                                                VAT Number :
                                                <span
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'white',
                                                        fontWeight: 'bold'

                                                    }}
                                                >
                                                    FRB1235476

                                                </span>
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="typo "
                                        style={{
                                            marginTop: '40px',
                                            marginLeft: '20px',
                                            width: '440px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',

                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                width: '200px',


                                            }}
                                        >
                                            Nabil hamici
                                        </Typography>
                                        <div style={{ display: 'flex', alignItems: 'center' }} >
                                            <DeleteIcon sx={{ color: '#F65F53', fontSize: '17px' }} />
                                            <Typography
                                                sx={{
                                                    color: '#F65F53',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                DELETE
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} >
                                            <EditIcon sx={{ color: '#fff', fontSize: '17px' }} />
                                            <Typography
                                                sx={{
                                                    color: '#fff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                EDIT
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="information"
                                        style={{
                                            marginTop: '20px',
                                            marginLeft: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '5px',

                                        }}
                                    >
                                        <div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: '',
                                                    fontSize: '12px',
                                                    width: '200px',


                                                }}
                                            >
                                                Company Name :
                                                <span
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'white',
                                                        fontWeight: 'bold'

                                                    }}
                                                >
                                                    Viking Burrito
                                                </span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: '',
                                                    fontSize: '12px',
                                                    width: '250px',


                                                }}
                                            >
                                                Email Address :
                                                <span
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'white',
                                                        fontWeight: 'bold'

                                                    }}
                                                >
                                                    oliver@burrito.com
                                                </span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffffcc',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: '',
                                                    fontSize: '12px',
                                                    width: '200px',


                                                }}
                                            >
                                                VAT Number :
                                                <span
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'white',
                                                        fontWeight: 'bold'

                                                    }}
                                                >
                                                    FRB1235476

                                                </span>
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Transaction's"
                                style={{
                                    width: '400px',
                                    minHeight: '140px',
                                    background: '#202940',
                                    marginTop: '15px',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                    border: '0 solid rgba(0, 0, 0, 0.125)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                    border: '1px solid rgba(255, 255, 255, 0.18)', 
                                }}
                            >
                                <div className='Header' style={{
                                    marginTop: '20px',
                                    marginLeft: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '360px',

                                }} >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Your Transaction's
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px' }} >
                                        <DateRangeIcon sx={{ fontSize: '20px', color: '#ffffffcc' }} />
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '400',
                                                fontSize: '15px',
                                            }}
                                        >
                                            23 - 30 March 2024
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content"
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        NEWEST
                                    </Typography>
                                </div>
                                <div className="Content1"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '360px',

                                    }}
                                >
                                    <div className="div"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#202940',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                            border: '2px solid #F44335', 
                                        }}
                                    >
                                        <ArrowDropDownIcon sx={{ color: '#F44335' }} />
                                    </div>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Netflix
                                        <span
                                            style={{
                                                display: 'block',
                                                color: '#ffffffcc',
                                                fontWeight: '400',


                                            }}
                                        >
                                            27 March 2020, at 12:30 PM

                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#F44335',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            opacity: '1',
                                            fontSize: '14px',
                                            marginLeft: '40px',
                                        }}
                                    >
                                        - 12000 DZA

                                    </Typography>
                                </div>
                                <div className="Content2"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '360px',

                                    }}
                                >
                                    <div className="div"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#202940',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            border: '1px solid #4CAF50',
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                            border: '2px solid #4CAF50', 
                                        }}
                                    >
                                        <ArrowDropUpIcon sx={{ color: '#4CAF50' }} />
                                    </div>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            marginRight: '8px'
                                        }}
                                    >
                                        Appel
                                        <span
                                            style={{
                                                display: 'block',
                                                color: '#ffffffcc',
                                                fontWeight: '400',


                                            }}
                                        >
                                            21 May 2020, at 15:30 PM

                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#4CAF50',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            opacity: '1',
                                            fontSize: '14px',
                                            marginLeft: '40px',
                                        }}
                                    >
                                        + 9000 DZA

                                    </Typography>
                                </div>
                                <div className="Content"
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        YESTERDAY
                                    </Typography>
                                </div>
                                <div className="Content1"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '360px',

                                    }}
                                >
                                    <div className="div"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#202940',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            border: '1px solid #F44335',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                            border: '2px solid #F44335', 
                                            
                                        }}
                                    >
                                        <ArrowDropDownIcon sx={{ color: '#F44335' }} />
                                    </div>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Stripe
                                        <span
                                            style={{
                                                display: 'block',
                                                color: '#ffffffcc',
                                                fontWeight: '400',


                                            }}
                                        >
                                            27 March 2020, at 12:30 PM

                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#F44335',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            opacity: '1',
                                            fontSize: '14px',
                                            marginLeft: '40px',
                                        }}
                                    >
                                        - 1000 DZA

                                    </Typography>
                                </div>



                            </div>
                        </div>
                    </div>

                    <div className='Balance' style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridGap: '10px',
                        marginLeft: '260px',
                        marginTop: '20px',
                       height : '110px'
                    }}>
                        <div
                         style={{ width: '130px',
                           padding: '20px',
                            borderRadius: '8px', 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                            border: '1px solid rgba(255, 255, 255, 0.18)', 
                            display: 'flex', 
                            flexDirection: 'column',
                             textAlign: 'center',
                              alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'rgb(255 255 255 / 15%)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                    border: '1px solid rgba(255, 255, 255, 0.18)', 
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <AccountBalanceIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Total balance

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',
                                        width : '140px',

                                    }}
                                >
                                    The entire balance in your account now

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    position : 'relative',
                                    top : '5px',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                        <div
                         style={{ width: '130px',
                          background: '#202940',
                           padding: '20px',
                            borderRadius: '8px', 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                            border: '1px solid rgba(255, 255, 255, 0.18)', 
                            display: 'flex', 
                            flexDirection: 'column',
                             textAlign: 'center',
                              alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'rgb(255 255 255 / 15%)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                    border: '1px solid rgba(255, 255, 255, 0.18)', 
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <HourglassBottomIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Suspended balance

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                 your projects under implementation

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    position : 'relative',
                                    top : '5px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                        <div 
                        style={{ width: '130px',
                        height : '243px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                        border: '1px solid rgba(255, 255, 255, 0.18)', 
                          padding: '20px',
                           borderRadius: '8px',
                            display: 'flex',
                             flexDirection: 'column',
                              textAlign: 'center',
                               alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'rgb(255 255 255 / 15%)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                    border: '1px solid rgba(255, 255, 255, 0.18)', 
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <EventAvailableIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Available balance

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    The balance that you can use to open new projects

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    position : 'relative',
                                    top : '5px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                        <div 
                        style={{ width: '130px', 
                        height : '243px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                        border: '1px solid rgba(255, 255, 255, 0.18)', 
                         padding: '20px',
                          borderRadius: '8px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          textAlign: 'center',
                           alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'rgb(255 255 255 / 15%)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                    border: '1px solid rgba(255, 255, 255, 0.18)', 
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <PublishedWithChangesIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Withdrawal balance


                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    The remaining amount of profits you made in Independent 

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    position : 'relative',
                                    top : '5px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                    </div>
                    <div className="Invoice"
                        style={{
                            width: '310px',
                            height: '480px',
                            background: '#202940',
                            marginTop: '20px',
                            borderRadius: '0.75rem',
                            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                            marginLeft: '13px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                            border: '1px solid rgba(255, 255, 255, 0.18)', 

                        }}
                    >
                        <div className="Header"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '15px',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Invoices
                            </Typography>
                            <Button
                                sx={{

                                    
                                    background: 'rgb(255 255 255 / 15%)',
                                    color: 'white',
                                    borderRadius: '10px',
                                    width: '90px',
                                   

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textTransform: 'uppercase',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    View All
                                </Typography>

                            </Button>
                        </div>
                        <div className="Content"
                            style={{
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                March, 01, 2024
                                <span style={{
                                    display: 'block',
                                    letterSpacing: '0.03333em',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',

                                }} >
                                    #MS-415646
                                </span>
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: '0.03333em',
                                    fontSize: '13px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',
                                }}
                            >
                                180DZA
                            </Typography>
                            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PDF
                                </Typography>
                            </div>
                        </div>
                        <div className="Content1"
                            style={{
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                March, 01, 2024
                                <span style={{
                                    display: 'block',
                                    letterSpacing: '0.03333em',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',

                                }} >
                                    #MS-415646
                                </span>
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: '0.03333em',
                                    fontSize: '13px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',
                                }}
                            >
                                180DZA
                            </Typography>
                            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PDF
                                </Typography>
                            </div>
                        </div>
                        <div className="Content2"
                            style={{
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                March, 01, 2024
                                <span style={{
                                    display: 'block',
                                    letterSpacing: '0.03333em',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',

                                }} >
                                    #MS-415646
                                </span>
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: '0.03333em',
                                    fontSize: '13px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',
                                }}
                            >
                                180DZA
                            </Typography>
                            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PDF
                                </Typography>
                            </div>
                        </div>
                        <div className="Content3"
                            style={{
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                March, 01, 2024
                                <span style={{
                                    display: 'block',
                                    letterSpacing: '0.03333em',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',

                                }} >
                                    #MS-415646
                                </span>
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: '0.03333em',
                                    fontSize: '13px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',
                                }}
                            >
                                180DZA
                            </Typography>
                            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PDF
                                </Typography>
                            </div>
                        </div>
                        <div className="Content4"
                            style={{
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                March, 01, 2024
                                <span style={{
                                    display: 'block',
                                    letterSpacing: '0.03333em',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',

                                }} >
                                    #MS-415646
                                </span>
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: '0.03333em',
                                    fontSize: '13px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',
                                }}
                            >
                                180DZA
                            </Typography>
                            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PDF
                                </Typography>
                            </div>
                        </div>
                        <div className="Content5"
                            style={{
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                March, 01, 2024
                                <span style={{
                                    display: 'block',
                                    letterSpacing: '0.03333em',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',

                                }} >
                                    #MS-415646
                                </span>
                            </Typography>
                            <Typography
                                sx={{
                                    letterSpacing: '0.03333em',
                                    fontSize: '13px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: '#ffffffcc',
                                    opacity: '1',
                                    fontWeight: '300',
                                }}
                            >
                                180DZA
                            </Typography>
                            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                <Typography
                                    sx={{
                                        letterSpacing: '0.03333em',
                                        fontSize: '13px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    PDF
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='MobileStracture' >
                    <div className="MobileCards"
                        style={{
                            position: 'relative',
                            left: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px'
                        }}
                    >
                        <div className="MasterCard"
                            style={{
                                width: '94%',
                                minHeight: '230px',
                                background: 'linear-gradient(195deg, #323a54, #111827)',
                                boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                position: 'relative',
                                marginTop: '20px',
                                backgroundImage: 'url(public/images/MasterCard.jpg)',
                                backgroundSize: 'cover',
                                borderRadius: '0.75rem',
                                border: '0 solid rgba(0, 0, 0, 0.125)',
                            }}
                        >
                            <div className="CardContainer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '20px',
                                }}
                            >
                                <div className="Wifi"
                                    style={{
                                        marginTop: '25px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <WifiIcon sx={{ color: 'white' }} />
                                </div>
                                <div className="CardNumber"
                                    style={{
                                        marginTop: '20px',
                                    }}
                                >
                                    <Typography sx={{
                                        color: 'white',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        letterSpacing: '1.5px',
                                        wordSpacing: '8px',
                                    }} >
                                        4562 1122 4594 7852
                                    </Typography>
                                    <div className="CardNameEXP"
                                        style={{
                                            marginTop: '40px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '280px'
                                        }}
                                    >
                                        <div className='Cardname'>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '0.8',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Card Holder
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Nabil Hamici
                                            </Typography>
                                        </div>
                                        <div className='CardEXP'>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    opacity: '0.8',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Expires
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    letterSpacing: '0.02857em',
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                11/27
                                            </Typography>
                                        </div>
                                        <div className="Logo">
                                            <img style={{ marginTop: '15px' }} width={30} src="http://localhost:3000/static/media/mastercard.27fca3e7637a9458fb64.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="DahabiyaCard"
                            style={{
                                width: '94%',
                                minHeight: '243px',
                                background: 'linear-gradient(195deg, #323a54, #111827)',
                                boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                position: 'relative',
                                marginTop: '10px',
                                backgroundImage: 'url(public/images/Carddahabiya.jpg)',
                                backgroundSize: 'cover',
                                borderRadius: '0.75rem',
                                border: '0 solid rgba(0, 0, 0, 0.125)',
                            }}
                        >
                            <div className="CardContainer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '20px',
                                }}
                            >
                                <div className="DahabiyaNumber"
                                    style={{
                                        marginTop: '120px',
                                        marginLeft: '30px',
                                    }}
                                >
                                    <Typography sx={{
                                        color: '#CDB975',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        letterSpacing: '1.5px',
                                        wordSpacing: '18px',
                                    }} >
                                        4562 1122 4594 7852
                                    </Typography>
                                    <div className="EXP"
                                        style={{
                                            marginTop: '5px'
                                        }}
                                    >
                                        <Typography sx={{
                                            color: '#CDB975',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            letterSpacing: '1.5px',
                                        }} >
                                            06/28 <span style={{ fontSize: '16px' }}>Expires</span>
                                        </Typography>
                                        <div style={{
                                            marginTop: '5px'
                                        }} >
                                            <Typography sx={{
                                                color: '#CDB975',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                                letterSpacing: '1.5px',
                                            }} >
                                                Hamici Nabil
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="MobileBalance"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            marginTop: '13px',
                            marginLeft: '11px'

                        }}
                    >
                        <div style={{ width: '333px', background: '#202940', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <AccountBalanceIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Total balance
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    The entire balance in your account now

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>
                        </div>
                        <div style={{ width: '333px', background: '#202940', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <HourglassBottomIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Suspended balance

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    The entire balance in your account now

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                        <div style={{ width: '333px', background: '#202940', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <EventAvailableIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Available balance

                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    Includes the budget for your projects in progress

                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                        <div style={{ width: '333px', background: '#202940', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                            <div className="icon1"
                                style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',

                                }}

                            >
                                <PublishedWithChangesIcon sx={{ color: 'white' }} />

                            </div>
                            <div className="Total"
                                style={{
                                    marginTop: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',

                                    }}
                                >
                                    Retractable


                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#ffffffcc',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: '300',
                                        letterSpacing: '0.03333em',
                                        fontSize: '0.75rem',
                                        marginTop: '5px',
                                        opacity: '1',

                                    }}
                                >
                                    The profits you have made can be withdrawn



                                </Typography>
                            </div>
                            <div className="Divid "
                                style={{
                                    height: '1px',
                                    width: '103%',
                                    opacity: '0.5',
                                    marginTop: '10px',
                                    background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))'
                                }}></div>
                            <div className="Price">
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        marginTop: '18px',
                                    }}
                                >
                                    0.00DZA
                                </Typography>
                            </div>

                        </div>
                    </div>
                    <div className="MethodMobile">
                        <div className="PaymentMethod"
                            style={{
                                width: '333px',
                                minHeight: '140px',
                                background: '#202940',
                                boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                position: 'relative',
                                marginTop: '15px',
                                marginLeft: '11px',
                                position: 'relative',
                                borderRadius: '0.75rem',
                                border: '0 solid rgba(0, 0, 0, 0.125)',
                                padding: '20px',
                                color: 'white'
                            }}
                        >
                            <div className='Payment'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                    }}
                                >
                                    Payment Method
                                </Typography>
                                <Button
                                    sx={{
                                        background: 'linear-gradient(195deg, #323a54, #111827)',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        width: '160px',
                                        height: '40px',
                                        boxShadow: '0rem 0.1875rem 0.1875rem 0rem rgba(52, 71, 103, 0.15),0rem 0.1875rem 0.0625rem -0.125rem rgba(52, 71, 103, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(52, 71, 103, 0.15)',

                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        +  Add New Card
                                    </Typography>
                                </Button>
                            </div>
                            <div className="Cards"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: '20px',
                                    marginTop: '20px',

                                }}
                            >
                                <div className="Master"
                                    style={{
                                        width: '320px',
                                        height: '70px',
                                        border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <div className='Container'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '15px',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                        }}
                                    >
                                        <div className="Img" style={{ flexShrink: 0 }}>
                                            <img width={25} src="http://localhost:3000/static/media/mastercard.27fca3e7637a9458fb64.png" alt="" />
                                        </div>
                                        <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '15px',
                                                    letterSpacing: '1.5px',
                                                    wordSpacing: '8px',

                                                }}
                                            >
                                                ****  ****  ****  7852
                                            </Typography>
                                        </div>
                                        <div className="modify" style={{ flexShrink: 0, cursor: 'pointer' }}>
                                            <EditIcon style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="Dahabiya"
                                    style={{
                                        width: '320px',
                                        height: '70px',
                                        border: '0.0625rem solid rgba(255, 255, 255, 0.4)',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <div className='Container'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '15px',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                        }}
                                    >
                                        <div className="Img" style={{ flexShrink: 0 }}>
                                            <img width={25} src="https://pay.chargily.dz/test/images/edahabia-card.svg" alt="" />
                                        </div>
                                        <div className="Number" style={{ flexGrow: 1, textAlign: 'center' }}>
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    fontWeight: 'bold',
                                                    fontSize: '15px',
                                                    letterSpacing: '1.5px',
                                                    wordSpacing: '8px',

                                                }}
                                            >
                                                ****  ****  ****  7852
                                            </Typography>
                                        </div>
                                        <div className="modify" style={{ flexShrink: 0, cursor: 'pointer', }}>
                                            <EditIcon style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="InvoiceMobile"
                            style={{
                                marginLeft: '6px',

                            }}
                        >
                            <div className="Invoice"
                                style={{
                                    width: '369px',
                                    height: '483px',
                                    background: '#202940',
                                    marginTop: '15px',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                                    marginLeft: '8px',

                                }}
                            >
                                <div className="Header"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '15px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Invoices
                                    </Typography>
                                    <Button
                                        sx={{

                                            borderColor: '#1A73E8',
                                            background: 'transparent',
                                            color: '#1A73E8',
                                            borderRadius: '10px',
                                            width: '90px',
                                            border: '1px #1A73E8 solid'

                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textTransform: 'uppercase',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            View All
                                        </Typography>

                                    </Button>
                                </div>
                                <div className="Content"
                                    style={{
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        March, 01, 2024
                                        <span style={{
                                            display: 'block',
                                            letterSpacing: '0.03333em',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',

                                        }} >
                                            #MS-415646
                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',
                                        }}
                                    >
                                        180DZA
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                        <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                        <Typography
                                            sx={{
                                                letterSpacing: '0.03333em',
                                                fontSize: '13px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PDF
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content1"
                                    style={{
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        March, 01, 2024
                                        <span style={{
                                            display: 'block',
                                            letterSpacing: '0.03333em',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',

                                        }} >
                                            #MS-415646
                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',
                                        }}
                                    >
                                        180DZA
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                        <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                        <Typography
                                            sx={{
                                                letterSpacing: '0.03333em',
                                                fontSize: '13px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PDF
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content2"
                                    style={{
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        March, 01, 2024
                                        <span style={{
                                            display: 'block',
                                            letterSpacing: '0.03333em',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',

                                        }} >
                                            #MS-415646
                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',
                                        }}
                                    >
                                        180DZA
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                        <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                        <Typography
                                            sx={{
                                                letterSpacing: '0.03333em',
                                                fontSize: '13px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PDF
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content3"
                                    style={{
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        March, 01, 2024
                                        <span style={{
                                            display: 'block',
                                            letterSpacing: '0.03333em',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',

                                        }} >
                                            #MS-415646
                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',
                                        }}
                                    >
                                        180DZA
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                        <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                        <Typography
                                            sx={{
                                                letterSpacing: '0.03333em',
                                                fontSize: '13px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PDF
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content4"
                                    style={{
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        March, 01, 2024
                                        <span style={{
                                            display: 'block',
                                            letterSpacing: '0.03333em',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',

                                        }} >
                                            #MS-415646
                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',
                                        }}
                                    >
                                        180DZA
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                        <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                        <Typography
                                            sx={{
                                                letterSpacing: '0.03333em',
                                                fontSize: '13px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PDF
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content5"
                                    style={{
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textTransform: 'capitalize',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        March, 01, 2024
                                        <span style={{
                                            display: 'block',
                                            letterSpacing: '0.03333em',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',

                                        }} >
                                            #MS-415646
                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '0.03333em',
                                            fontSize: '13px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            color: '#ffffffcc',
                                            opacity: '1',
                                            fontWeight: '300',
                                        }}
                                    >
                                        180DZA
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} >
                                        <PictureAsPdfIcon sx={{ fontSize: '20px', color: '#344767' }} />
                                        <Typography
                                            sx={{
                                                letterSpacing: '0.03333em',
                                                fontSize: '13px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            PDF
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="BillingMobile"
                            style={{ height: '360px', display: 'flex' }}
                        >
                            <div className="BillingInformation"
                                style={{
                                    width: '375px',
                                    minHeight: '250px',
                                    marginLeft: '11px',
                                    background: '#202940',
                                    marginTop: '15px',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                    border: '0 solid rgba(0, 0, 0, 0.125)',

                                }}
                            >

                                <div style={{
                                    position: 'relative',
                                    top: '15px',
                                    left: '20px',

                                }} >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '16px',



                                        }}
                                    >
                                        Billing Information
                                    </Typography>
                                </div>
                                <div className="typo "
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                        width: '440px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            width: '200px',


                                        }}
                                    >
                                        Nabil hamici
                                    </Typography>
                                    <div style={{ display: 'flex', alignItems: 'center' }} >
                                        <DeleteIcon sx={{ color: '#F65F53', fontSize: '17px' }} />
                                        <Typography
                                            sx={{
                                                color: '#F65F53',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                            }}
                                        >
                                            DELETE
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} >
                                        <EditIcon sx={{ color: '#fff', fontSize: '17px' }} />
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                            }}
                                        >
                                            EDIT
                                        </Typography>
                                    </div>
                                </div>
                                <div className="information"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',

                                    }}
                                >
                                    <div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '',
                                                fontSize: '12px',
                                                width: '200px',


                                            }}
                                        >
                                            Company Name :
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'

                                                }}
                                            >
                                                Viking Burrito
                                            </span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '',
                                                fontSize: '12px',
                                                width: '250px',


                                            }}
                                        >
                                            Email Address :
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'

                                                }}
                                            >
                                                oliver@burrito.com
                                            </span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '',
                                                fontSize: '12px',
                                                width: '200px',


                                            }}
                                        >
                                            VAT Number :
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'

                                                }}
                                            >
                                                FRB1235476

                                            </span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="typo "
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                        width: '440px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            width: '200px',


                                        }}
                                    >
                                        Nabil hamici
                                    </Typography>
                                    <div style={{ display: 'flex', alignItems: 'center' }} >
                                        <DeleteIcon sx={{ color: '#F65F53', fontSize: '17px' }} />
                                        <Typography
                                            sx={{
                                                color: '#F65F53',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                            }}
                                        >
                                            DELETE
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} >
                                        <EditIcon sx={{ color: '#fff', fontSize: '17px' }} />
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                            }}
                                        >
                                            EDIT
                                        </Typography>
                                    </div>
                                </div>
                                <div className="information"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',

                                    }}
                                >
                                    <div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '',
                                                fontSize: '12px',
                                                width: '200px',


                                            }}
                                        >
                                            Company Name :
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'

                                                }}
                                            >
                                                Viking Burrito
                                            </span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '',
                                                fontSize: '12px',
                                                width: '250px',


                                            }}
                                        >
                                            Email Address :
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'

                                                }}
                                            >
                                                oliver@burrito.com
                                            </span>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '',
                                                fontSize: '12px',
                                                width: '200px',


                                            }}
                                        >
                                            VAT Number :
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'white',
                                                    fontWeight: 'bold'

                                                }}
                                            >
                                                FRB1235476

                                            </span>
                                        </Typography>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="TransactionMobile">
                            <div className="Transaction's"
                                style={{
                                    width: '375px',
                                    minHeight: '170px',
                                    background: '#202940',
                                    marginTop: '15px',
                                    marginLeft: '11px',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0rem 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),0rem 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)',
                                    border: '0 solid rgba(0, 0, 0, 0.125)',
                                }}
                            >
                                <div className='Header' style={{
                                    position: 'relative',
                                    top: '15px',
                                    marginLeft: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '340px',

                                }} >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Your Transaction's
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '5px' }} >
                                        <DateRangeIcon sx={{ fontSize: '20px', color: '#ffffffcc' }} />
                                        <Typography
                                            sx={{
                                                color: '#ffffffcc',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: '400',
                                                fontSize: '15px',
                                            }}
                                        >
                                            23 - 30 March 2024
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Content"
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        NEWEST
                                    </Typography>
                                </div>
                                <div className="Content1"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '340px',

                                    }}
                                >
                                    <div className="div"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#202940',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            border: '1px solid #F44335',
                                        }}
                                    >
                                        <ArrowDropDownIcon sx={{ color: '#F44335' }} />
                                    </div>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Netflix
                                        <span
                                            style={{
                                                display: 'block',
                                                color: '#ffffffcc',
                                                fontWeight: '400',
                                                fontSize: '12px'


                                            }}
                                        >
                                            27 March 2020, at 12:30 PM

                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#F44335',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            opacity: '1',
                                            fontSize: '14px',
                                            marginLeft: '40px',
                                        }}
                                    >
                                        - 12000 DZA

                                    </Typography>
                                </div>
                                <div className="Content2"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '340px',

                                    }}
                                >
                                    <div className="div"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#202940',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            border: '1px solid #4CAF50',
                                        }}
                                    >
                                        <ArrowDropUpIcon sx={{ color: '#4CAF50' }} />
                                    </div>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            marginRight: '8px'
                                        }}
                                    >
                                        Appel
                                        <span
                                            style={{
                                                display: 'block',
                                                color: '#ffffffcc',
                                                fontWeight: '400',
                                                fontSize: '12px'


                                            }}
                                        >
                                            21 May 2020, at 15:30 PM

                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#4CAF50',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            opacity: '1',
                                            fontSize: '14px',
                                            marginLeft: '40px',
                                        }}
                                    >
                                        + 9000 DZA

                                    </Typography>
                                </div>
                                <div className="Content"
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#ffffffcc',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        YESTERDAY
                                    </Typography>
                                </div>
                                <div className="Content1"
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '340px',

                                    }}
                                >
                                    <div className="div"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#202940',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            border: '1px solid #F44335',
                                        }}
                                    >
                                        <ArrowDropDownIcon sx={{ color: '#F44335' }} />
                                    </div>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Stripe
                                        <span
                                            style={{
                                                display: 'block',
                                                color: '#ffffffcc',
                                                fontWeight: '400',
                                                fontSize: '12px',


                                            }}
                                        >
                                            27 March 2020, at 12:30 PM

                                        </span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#F44335',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            opacity: '1',
                                            fontSize: '14px',
                                            marginLeft: '40px',
                                        }}
                                    >
                                        - 1000 DZA

                                    </Typography>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Billingcontent
