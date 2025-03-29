import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../../assets/images/small-logos/NoGigFound.json';

import { useBilling } from "../../../Context/BillingContext.jsx";

function BillingInvoices({ SetOpenInvoice }) {

  const { user, isSeller } = useUser();
  const { invoices, loadingInvoices, errorInvoices } = useBilling();
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
    if (loadingInvoices) {
      return renderSkeletonRows();
    }

    if (errorInvoices) {
      return (
        <Typography sx={{ color: "red", textAlign: "center", padding: "16px" }}>
          {errorInvoices}
        </Typography>
      );
    }

    if (invoices.length === 0) {
      return (
        <div className="Div"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="Lottie"
            style={{

            }}
          >
            <Player
              src={animationData}
              autoplay
              style={{ width: 190, height: 150 }}
            />                    </div>
          <Typography sx={{
            color: "white", textAlign: "center",
            padding: "16px",
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

          }}>
            {t('No invoices found.')}
          </Typography>



        </div>
      );
    }

    return invoices.map((invoice) => (
      <div
        key={invoice._id}
        className="UsersInforamtion1"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "0 0 10px 10px", // Top corners 0, bottom-left & bottom-right rounded

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
        <div className="Id" style={{ display: "flex", gap: "10px", display: isSmallScreen ? "none" : "unset" }}>
          <Checkbox
            checked={false} // Add logic for checkbox state
            onChange={() => { }} // Add logic for checkbox change
            sx={{ color: "white", verticalAlign: "middle", padding: 0 }}
            size="small"
          />
          <Typography sx={{ fontFamily: '"Airbnbcereal", sans-serif', fontSize: "14px", display: isSmallScreen ? "none" : "unset" }}>
            #{invoice.invoiceNumber}
          </Typography>
        </div>
        <div className="Name"

          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            position: "absolute",
            left: isSmallScreen ? '37%' : "25%",
            right: "unset",
          }}
        >
          <div
            className="ProfileCircle"
            style={{
              width: "35px",
              display: isSmallScreen ? 'none' : 'unset',
              height: "35px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #ccc",
            }}
          >
            <img
              src={
                isSeller
                  ? invoice.buyer.profileImg // Seller sees buyer's profile
                  : invoice.seller.profileImg // Buyer sees seller's profile
              }
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Typography
            sx={{
              fontFamily: '"Airbnbcereal", sans-serif',
              fontSize: "14px",
            }}
          >
            {isSeller
              ? `${invoice.buyer.firstName} ${invoice.buyer.lastName}`
              : `${invoice.seller.firstName} ${invoice.seller.lastName}`}
          </Typography>
        </div>
        <div className="Email"

          style={{
            position: "absolute",
            left: "43%",
            alignItems: "center",
            gap: "5px",
            display: isSmallScreen ? "none" : "flex",
            right: "unset",
          }}
        >
          <EmailIcon sx={{ fontSize: "20px", color: "rgba(0, 116, 255)" }} />
          <Typography
            sx={{
              fontFamily: '"Airbnbcereal", sans-serif',
              fontSize: "14px",
            }}
          >
            {isSeller ? invoice.buyer.email : invoice.seller.email}
          </Typography>
        </div>
        <div className="Date"

          style={{
            position: "absolute",
            left: isSmallScreen ? "3%" :

              "66%",
            right: "unset",
            textWrap: "nowrap",
            display: "flex",
            gap: "5px",
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: "20px", color: "rgba(0, 116, 255)" }} />
          <Typography
            sx={{
              fontFamily: '"Airbnbcereal", sans-serif',
              fontSize: "14px",
            }}
          >
            {new Date(invoice.createdAt).toLocaleDateString()}
          </Typography>
        </div>
        <div className="Status"

          style={{
            position: "absolute",
            left: isSmallScreen ? "75%" :
              currentLanguage === 'ar' ? '3%' :
                "85%",
            width: isSmallScreen ? "24%" :
              "11%",
            right: "unset",
          }}
        >
          <Button
            variant="outlined"
            style={{
              backgroundColor: "rgba(194, 251, 215, 1)",
              color: "green",
              borderRadius: "18px",
              width: "100%",
              textTransform: "capitalize",
              fontFamily: '"Airbnbcereal", sans-serif',
              fontWeight: "bold",
              border: "1px solid rgba(44, 187, 99, 0.5)",
              boxShadow:
                "rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset, rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px, rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px, rgba(44, 187, 99, 0.15) 0 16px 32px",
            }}
          >
            {t("Paid")}
          </Button>
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


        <div className="Table"
          style={{
            width: "100%", minHeight: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "10px", boxShadow: "0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px"
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
              {t('Invoice List')}
            </Typography>
            <Button


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
                {t('+  Add New')}
              </Typography>
            </Button>
          </div>
          <div className="Tablecontent">
            <div className="Header" style={{ width: "99.9%", minHeight: "45px", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", borderRadius: "10px", color: "white", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.18)", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", display: "flex", position: "relative", justifyContent: "space-between", padding: "10px" }}>
              <div className="Id"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  display: isSmallScreen ? "none" : "unset"

                }}>
                <Checkbox checked={checkedItems.selectAll} onChange={handleSelectAll} sx={{ color: "white", verticalAlign: "middle", padding: 0 }} size="small" />
                <Typography sx={{
                  color: "white",
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  fontWeight: "bold",
                  fontSize: "14px",
                  display: isSmallScreen ? "none" : "unset"
                }}>
                  {t("Invoice Id")}
                </Typography>
              </div>
              <div className="Client" style={{
                position: "absolute",
                left: currentLanguage === 'ar' ? '31%' :
                  isSmallScreen ? '37%' :
                    "25%",
                right: "unset", top: "33%",
              }}>
                <Typography sx={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                  {isSeller ? t("Client") : t("Freelancer")}
                </Typography>
              </div>
              <div className="Email"
                style={{
                  position: "absolute",
                  left: currentLanguage === 'ar' ? '45.5%' : "43%",
                  top: "33%",
                  right: "unset",
                  display: isSmallScreen ? "none" : "unset"
                }}>
                <Typography sx={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                  {t("Email")}
                </Typography>
              </div>
              <div className="Date"
                style={{
                  position: "absolute",
                  left: isSmallScreen ? "4%" :
                    currentLanguage === 'ar' ? '70%' :
                      "66%",
                  top: "33%", right: "unset"
                }}>
                <Typography sx={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', fontWeight: "bold", fontSize: "14px" }}>
                  {t("Date")}
                </Typography>
              </div>
              <div className="Status"
                style={{
                  position: "absolute",
                  left: isSmallScreen ? "80%" :
                    currentLanguage === 'ar' ? '7.5%' :
                      "88%",
                  top: "33%", right: "unset"
                }}>
                <Typography sx={{
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                  fontWeight: "bold",
                  fontSize: "14px"
                }}>
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

export default BillingInvoices;