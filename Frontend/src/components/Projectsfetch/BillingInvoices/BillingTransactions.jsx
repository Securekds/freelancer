import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import animationData from '../../../assets/images/small-logos/NoGigFound.json';
import Lottie from 'lottie-react';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


import i18n from 'i18next';
import {
    Typography,
    Button,
    Box,
    Checkbox,
    Tooltip,
    Menu,
    MenuItem,
    Fade,
    Skeleton,
} from "@mui/material";
import {
    Email as EmailIcon,
    CalendarMonth as CalendarMonthIcon,
    LinearScale as LinearScaleIcon,
    Visibility as VisibilityIcon,
    DeleteSweep as DeleteSweepIcon,
    AddOutlined as AddOutlinedIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUser } from "../../../Context/UserContext.jsx";
import { useBilling } from "../../../Context/BillingContext.jsx";

function BillingTransactions({ handleOpenDepositMenu }) {

    const { user, isSeller } = useUser();
    const { transactions, loadingTransactions, errorTransaction } = useBilling();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width:600px)");
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

    // State for checkboxes
    const [checkedItems, setCheckedItems] = useState({
        selectAll: false,
        item1: false,
        item2: false,
        item3: false,
    });

    // State for menu
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);

    // Handle menu open/close
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    // Handle checkbox changes
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setCheckedItems({
            selectAll: isChecked,
            item1: isChecked,
            item2: isChecked,
            item3: isChecked,
        });
    };

    const handleItemChange = (event, itemName) => {
        const isChecked = event.target.checked;
        setCheckedItems((prevState) => ({
            ...prevState,
            [itemName]: isChecked,
            selectAll: isChecked && prevState.item1 && prevState.item2 && prevState.item3,
        }));
    };

    const isAnyCheckboxSelected = checkedItems.item1 || checkedItems.item2 || checkedItems.item3;

    // Navigate to user invoices
    const goToUserInvoices = () => {
        navigate("/userdashboard/billing/userinvoices/id");
    };

    // Render skeleton loading for rows
    const renderSkeletonRows = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <div
                key={index}
                className="UsersInforamtion1"
                style={{
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    height: "60px",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    padding: "10px",
                    cursor: "pointer",
                }}
            >
                <Skeleton variant="rectangular" width="100%" height={40} />
            </div>
        ));
    };

    // Render invoices based on user role
    const renderInvoices = () => {
        if (loadingTransactions) {
            return renderSkeletonRows();
        }

        if (errorTransaction) {
            return (
                <Typography sx={{ color: "red", textAlign: "center", padding: "16px" }}>
                    {errorTransaction}
                </Typography>
            );
        }

        if (transactions.length === 0) {
            return (
                <div className="Div"
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center',
                }}
                >
                    <div className="Lottie"
                        style={{
                        
                        }}
                    >
                        <Lottie animationData={animationData} style={{ width: 190, height: 150 }} />
                    </div>
                    <Typography sx={{ color: "white",
                         textAlign: "center"
                         , padding: "16px",
                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}>
                        {t('No Transaction found.')}
                    </Typography>



                </div>
            );
        }

        return transactions.map((transaction) => (
            <div
                key={transaction._id}
                className="UsersInforamtion1"
                style={{
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    height: "60px",
                    color: "white",
                    borderRadius: "0 0 10px 10px", // Top corners 0, bottom-left & bottom-right rounded

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    padding: "10px",
                    cursor: "pointer",

                }}
            >
                <div className="Id" style={{ display: "flex", gap: "10px" }}>
                    <Checkbox
                        checked={false} // Add logic for checkbox state
                        onChange={() => { }} // Add logic for checkbox change
                        sx={{ color: "white", verticalAlign: "middle", padding: 0 }}
                        size="small"
                    />
                    <Typography sx={{ fontFamily: '"Airbnbcereal", sans-serif', fontSize: "14px" }}>
                        {transaction?.createdAt ? new Date(transaction.createdAt).toLocaleDateString("en-GB") : ""}
                    </Typography>
                </div>
                <div className="Type"

                    style={{
                        display: isSmallScreen ? "none" : "flex",
                        alignItems: "center",
                        gap: "10px",
                        position: "absolute",
                        left: "22%",
                        right: "unset",
                    }}
                >

                    <Typography
                        sx={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: "14px",
                        }}
                    >
                        {transaction?.type}
                    </Typography>
                </div>
                <div className="Amount"

                    style={{
                        position: "absolute",
                        left: currentLanguage === 'ar'? '40%' : "42%",
                        alignItems: "center",
                        gap: "5px",
                        display : 'flex',
                        right: "unset",
                    }}
                >
                    <AutoGraphIcon sx={{ fontSize: "20px", color: "rgba(0, 116, 255)" }} />
                    <Typography
                        sx={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: "14px",
                        }}
                    >
                        {transaction?.amount.toFixed(2)}
                    </Typography>
                </div>
                <div className="Currerncy"

                    style={{
                        position: "absolute",
                        left: isSmallScreen ? "35%" :
                        currentLanguage === 'ar'? '59%' :
                         "60%",
                        right: "unset",
                        textWrap: "nowrap",
                        display: "flex",
                        gap: "5px",
                        display: isSmallScreen ? "none" : "flex" 
                    }}
                >
                    <AssuredWorkloadIcon sx={{ fontSize: "20px", color: "rgba(0, 116, 255)" }} />
                    <Typography
                        sx={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: "14px",
                        }}
                    >
                        {transaction?.currency}
                    </Typography>
                </div>
                <div className="Method"

                    style={{
                        position: "absolute",
                        left: isSmallScreen ? "75%" :
                        currentLanguage === 'ar'? '72%' :
                         "78%",
                        width: isSmallScreen ? "24%" : "11%",
                        right: "unset",
                        display: isSmallScreen ? "none" : "unset" 
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: "14px",
                        }}
                    >
                        {transaction?.method}
                    </Typography>

                </div>

                <div className="Status"

                    style={{
                        position: "absolute",
                        left: currentLanguage === 'ar'? '5%' :
                        isSmallScreen ? "75%" :
                         "91%",
                        padding: '5px',
                        borderRadius: '16px',
                        right: "unset",
                        backgroundColor: '#194e3d',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontSize: "14px",
                            color: '#2df873'
                        }}
                    >
                        {t(transaction?.status)}
                    </Typography>

                </div>
            </div>
        ));
    };

    return (
        <>
            <div className="Div"
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >


                <div className="Table "
                    style={{
                        width: "100%", minHeight: "auto",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                        boxShadow: "0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)",

                    }}>
                    <div className="InvoiceHead"
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: '15px',
                        }}>
                        <Typography
                            sx={{
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                fontSize: '16px',
                            }}
                        >
                            {t('Transactions')}
                        </Typography>
                        <Button

                            onClick={handleOpenDepositMenu}
                            sx={{
                                background: 'linear-gradient(to right, #4776E6 0%, #8E54E9 51%, #4776E6 100%)',
                                color: '#fff',
                                borderRadius: '10px',
                                width: currentLanguage === 'fr' ? '225px' : '160px',
                                height: '40px',
                                boxShadow: '0rem 0.1875rem 0.1875rem 0rem rgba(52, 71, 103, 0.15),0rem 0.1875rem 0.0625rem -0.125rem rgba(52, 71, 103, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(52, 71, 103, 0.15)',

                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {t('+  Deposit')}
                            </Typography>
                        </Button>
                    </div>
                    <div className="Tablecontent">
                        <div className="Header"
                            style={{
                                width: "99.9%",
                                minHeight: "45px",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "10px", color: "white",
                                WebkitBackdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.18)",

                                display: "flex", position: "relative", justifyContent: "space-between", padding: "10px"
                            }}>
                            <div className="Id" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Checkbox checked={checkedItems.selectAll} onChange={handleSelectAll} sx={{ color: "white", verticalAlign: "middle", padding: 0 }} size="small" />
                                <Typography
                                 sx={{ color: "white",
                                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                   fontWeight: "bold", fontSize: "14px" }}>
                                    {t("Date")}
                                </Typography>
                            </div>
                            <div className="Type" style={{ position: "absolute", left: currentLanguage === 'ar'? '24%' : "22%", right: "unset", top: "33%", display: isSmallScreen ? "none" : "unset" }}>
                                <Typography
                                 sx={{fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                                    {t("Type")}
                                </Typography>
                            </div>
                            <div className="Amount"
                             style={{ position: "absolute",
                              left: "42%",
                               top: "33%",
                                right: "unset",
                                }}>
                                <Typography
                                 sx={{ fontFamily : currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                                    {t("Amount")}
                                </Typography>
                            </div>
                            <div className="Currency"
                             style={{ position: "absolute",
                              left: isSmallScreen ? "48%" : "60%", 
                              top: "33%", right: "unset",
                              display: isSmallScreen ? "none" : "unset" 
                               }}>
                                <Typography sx={{  fontFamily : currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                                    {t("Currency")}
                                </Typography>
                            </div>
                            <div className="Method"
                             style={{ position: "absolute",
                              left: isSmallScreen ? "80%" : "78%",
                               top: "33%", right: "unset",
                               display: isSmallScreen ? "none" : "unset" 
                                }}>
                                <Typography sx={{ fontFamily : currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                                    {t("Method")}
                                </Typography>
                            </div>
                            <div className="Status"
                             style={{ position: "absolute",
                              left: currentLanguage === 'ar' && isSmallScreen? '8%' :
                               isSmallScreen ? "80%" :
                              currentLanguage === 'ar'? '6%' :
                               "93%",
                               top: "33%", right: "unset" }}>
                                <Typography sx={{ fontFamily : currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                                    {t("Status")}
                                </Typography>
                            </div>
                        </div>
                        {renderInvoices()}
                    </div>
                </div>

            </div>
        </>
    );
}

export default BillingTransactions;