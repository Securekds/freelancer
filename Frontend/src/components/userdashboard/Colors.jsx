import React, { useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useUser } from "../../Context/UserContext";

function Colors({ onBackgroundChange }) {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        // Retrieve language from localStorage on component mount
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en'; // Default language is 'en' if no language is stored
    });
    const [reloadCount, setReloadCount] = useState(0);

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language); // Store selected language in localStorage
        setCurrentLanguage(language);
        setReloadCount(prevCount => prevCount + 1); // Increment reload counter
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch(error => console.error('Error changing language:', error));
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (!storedLanguage) {
            setCurrentLanguage('ar');
            localStorage.setItem('language', 'ar');
        } else {
            setCurrentLanguage(storedLanguage);
        }

        if (reloadCount === 1) {
            window.location.reload();
        } else if (reloadCount === 2) {
            setReloadCount(0);
        }
    }, [reloadCount]);

    const [open, setOpen] = useState(false);

    const handleOpenDrawer = () => {
        setOpen(true);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const { user } = useUser();

    // Data for Free Plan
    const freePlanUsageData = [
        { name: 'Offers', value: user?.remainingOffersFree, total: 15 },
        { name: 'Messages', value: user?.remainingMessagesFree, total: 50 },
    ];

    const freePlanFinancialData = [
        { name: 'Commission', value: 12 },
        { name: 'Min Withdrawal', value: 50 }
    ];

    // Data for Freelancer Pro Plan
    const freelancerProUsageData = [
        { name: 'Offers', value: user?.remainingOffersFreelancerPro, total: 40 },
        { name: 'Messages', value: 'Unlimited', total: 'Unlimited' },
    ];

    const freelancerProFinancialData = [
        { name: 'Commission', value: 7 },
        { name: 'Min Withdrawal', value: 25 }
    ];

    // Data for Pro Plus Plan
    const proPlusUsageData = [
        { name: 'Offers', value: 'Unlimited', total: 'Unlimited' },
        { name: 'Messages', value: 'Unlimited', total: 'Unlimited' },
    ];

    const proPlusFinancialData = [
        { name: 'Commission', value: 4 },
        { name: 'Min Withdrawal', value: 'Any Amount' },
    ];

    // Determine which data to use based on the user's plan
    const getPlanData = (plan) => {
        switch (plan) {
            case 'freelancerPro':
                return { usageData: freelancerProUsageData, financialData: freelancerProFinancialData };
            case 'proPlus':
                return { usageData: proPlusUsageData, financialData: proPlusFinancialData };
            default:
                return { usageData: freePlanUsageData, financialData: freePlanFinancialData };
        }
    };

    const { usageData, financialData } = getPlanData(user?.plan);

    const revenueDistribution = {
        free: {
            userShare: 88,
            commission: 12,
        },
        freelancerPro: {
            userShare: 93,
            commission: 7,
        },
        proPlus: {
            userShare: 96,
            commission: 4,
        },
    };

    const { userShare, commission } = revenueDistribution[user?.plan || 'free'];


    return (
        <div>
            <Button onClick={handleOpenDrawer}>
                <SettingsRoundedIcon sx={{ color: ' white', fontSize: '23px' }} />
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleCloseDrawer}
                BackdropProps={{
                    invisible: true, // Ensures backdrop doesn't cover the entire page
                }}
            >
                <div style={{
                    width: 300,
                    height: 'auto',
                    background: '#111314',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                }}>
                    {/* Header Section */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '15px 5px',
                        width: '100%',
                        borderBottom: '1px solid #2d2d2d'
                    }}>
                        <div className="Div"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '95%',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <SettingsRoundedIcon style={{ color: '#60a5fa', fontSize: '20px' }} />
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                    }}
                                    variant="subtitle1">
                                    General information
                                </Typography>
                            </div>
                            <IconButton onClick={handleCloseDrawer}>
                                <CloseIcon sx={{ color: 'rgb(255 255 255 / 70%)' }} />
                            </IconButton>
                        </div>
                    </div>

                    {/* Language Section */}
                    <div className="LANG"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '15px',
                            flexDirection: 'column',
                            gap: '10px',
                            borderBottom: '1px solid #2d2d2d',
                            width: '95%',
                        }}>
                        <div className="LangTypo" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                }}
                                variant="subtitle1">
                                {t('Change Language')}
                            </Typography>
                        </div>
                        <div className="LangTypo"
                            style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                marginTop: '10px'
                            }}
                        >
                            <div className="AR"
                                onClick={() => toggleLanguage('ar')}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    border: currentLanguage === 'ar' ? '1px solid #3b82f6' : '1px solid #4b5563',
                                    backgroundColor: currentLanguage === 'ar' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <div className="Div"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '24px',
                                        marginBottom: '4px',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                    }}>🇩🇿</div>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                        }}
                                    >
                                        AR
                                    </Typography>
                                </div>
                            </div>
                            <div className="EN"
                                onClick={() => toggleLanguage('en')}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    border: currentLanguage === 'en' ? '1px solid #3b82f6' : '1px solid #4b5563',
                                    backgroundColor: currentLanguage === 'en' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <div className="Div"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '24px',
                                        marginBottom: '4px',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}>🇺🇸</div>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                        }}
                                    >
                                        EN
                                    </Typography>
                                </div>
                            </div>
                            <div className="FR"
                                onClick={() => toggleLanguage('fr')}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    border: currentLanguage === 'fr' ? '1px solid #3b82f6' : '1px solid #4b5563',
                                    backgroundColor: currentLanguage === 'fr' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <div className="Div"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '24px', marginBottom: '4px',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                    }}>
                                        🇫🇷
                                    </div>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                        }}
                                    >
                                        FR
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Plan Section */}
                    <div className="Plan"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '15px',
                            flexDirection: 'column',
                            gap: '15px',
                            borderBottom: '1px solid #2d2d2d',
                            width: '95%',
                        }}>
                        <div className="CurrentPlan">
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    textAlign: 'center'
                                }}
                                variant="subtitle1">
                                {t('Current Plan')}
                            </Typography>
                        </div>

                        {/* Free Plan Box */}
                        <div>
                            {/* Free Plan Box */}
                            {user?.plan === 'free' && (
                                <div
                                    className="Free"
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(to right, #1e3a8a, #312e81)',
                                        borderRadius: '8px',
                                        padding: '12px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Free Plan
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '12px',
                                                color: '#93c5fd',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            Upgrade to Freelancer Pro
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ marginLeft: '4px' }}
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Freelancer Pro Plan Box */}
                            {user?.plan === 'freelancerPro' && (
                                <div
                                    className="FreelancerPro"
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                                        borderRadius: '8px',
                                        padding: '12px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Freelancer Pro Plan
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '12px',
                                                color: '#93c5fd',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            Upgrade to Pro Plus
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ marginLeft: '4px' }}
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pro Plus Plan Box */}
                            {user?.plan === 'proPlus' && (
                                <div
                                    className="ProPlus"
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(to right, #1e3a8a, #312e81)',

                                        borderRadius: '8px',
                                        padding: '12px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Pro Plus Plan
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '12px',
                                                color: '#93c5fd',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            You have the best plan
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ marginLeft: '4px' }}
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Usage Metrics */}
                        {usageData.map((item, index) => (
                            <div key={index} style={{
                                width: '90%',
                                marginBottom: '8px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '6px',
                                    fontSize: '14px',
                                }}>
                                    <span style={{
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}>
                                        {item.name} Left

                                    </span>
                                    <span style={{
                                        color: '#60a5fa',
                                        fontWeight: 'bold',

                                        fontFamily: '"Airbnbcereal", sans-serif',
                                    }}>{item.value}/{item.total}</span>
                                </div>
                                <div style={{
                                    height: '8px',
                                    backgroundColor: '#374151',
                                    borderRadius: '9999px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(item.value / item.total) * 100}%`,
                                        background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                                        borderRadius: '9999px'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Financial Information Section */}
                    <div style={{
                        padding: '15px',
                        width: '95%',
                        flex: '1'
                    }}>
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                marginBottom: '16px'
                            }}
                        >
                            Financial Information
                        </Typography>

                        {/* Financial Data Boxes */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginBottom: '20px'
                        }}>
                            {financialData.map((item, index) => (
                                <div key={index} style={{
                                    backgroundColor: '#1f2937',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        color: '#9ca3af',
                                        fontSize: '14px',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                    }}>{item.name}</span>
                                    <span
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: item.value === 'Any Amount' ? '14px' : '18px', // Adjust font size for "Any Amount"
                                            marginTop: '4px',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                        }}
                                    >
                                        {item.name === 'Commission'
                                            ? `${item.value}%`
                                            : item.name === 'Min Withdrawal' && item.value === 'Any Amount'
                                                ? item.value // Display "Any Amount" without a dollar sign
                                                : `$${item.value}`}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Revenue Distribution */}
                        <div style={{ marginTop: '24px' }}>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'medium',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    marginBottom: '12px',
                                }}
                            >
                                Revenue Distribution
                            </Typography>

                            {/* Pie Chart Placeholder */}
                            <div
                                style={{
                                    height: '160px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                {/* Pie Chart */}
                                <div
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        background: `conic-gradient(#f43f5e 0% ${commission}%, #3b82f6 ${commission}% 100%)`,
                                        position: 'relative',
                                    }}
                                >
                                    {/* Inner Circle */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            backgroundColor: '#111314',
                                        }}
                                    ></div>
                                </div>

                                {/* Labels */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '-10%',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        width: '100%',
                                        color: 'white',
                                        fontSize: '12px',
                                    }}
                                >
                                    {/* Your Share */}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                                backgroundColor: '#3b82f6',
                                                marginRight: '4px',
                                                borderRadius: '2px',
                                            }}
                                        ></div>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            Your Share:
                                        </Typography>
                                        <span
                                            style={{
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                marginLeft: '5px',
                                            }}
                                        >
                                            {userShare}%
                                        </span>
                                    </div>

                                    {/* Commission */}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                                backgroundColor: '#f43f5e',
                                                marginRight: '4px',
                                                borderRadius: '2px',
                                            }}
                                        ></div>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            Commission:
                                        </Typography>
                                        <span
                                            style={{
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                marginLeft: '5px',
                                            }}
                                        >
                                            {commission}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '12px',
                        borderTop: '1px solid #2d2d2d',
                        width: '100%',
                        textAlign: 'center',
                        color: '#6b7280',
                        fontSize: '12px'
                    }}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            Contact support for more information
                        </Typography>

                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default Colors;