import { Typography, Button } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { useNavigate } from 'react-router-dom';





function InvoiceOne() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const navigate = useNavigate();

  const goToUserInvoices = () => {
    navigate('/userdashboard/billing/userinvoices');
  };

  const handlePrintInvoice = () => {
    window.print();
  };


  return (
    <>
      <div className='ContainerInvoice'

        style={{
          background: '#fff',
          width: '80%',
          height: '100vh',
          position: 'relative', // Ensure the shape stays within the container
          overflow: 'hidden', // Hide overflow if needed
        }}
      >
        <div className="Typo"
          style={{
            position: 'absolute',
            right: '8%',
            top: '6.7%',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontWeight: 'bold',
              fontSize: '4rem',
            }}
          >
            INVOICE
          </Typography>
        </div>
        <div className="Khadamat"
          style={{
            position: 'absolute',
            left: '15%',
            top: '10%',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontWeight: '700',
              fontSize: '1.5rem',
            }}
          >
            KHADAMAT PLATFORM
            <span
              style={{
                display: 'block',
                fontWeight: '300',
                textAlign: 'center',
                marginTop: '-10px',
                fontSize: '1.2rem',
              }}
            >
              Make Dreams Real
            </span>
          </Typography>
        </div>
        <div className="Reciever"
          style={{
            position: 'absolute',
            top: '40%',
            left: '10%',
            display: 'flex',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'space-between',
            direction : currentLanguage === 'ar'? 'ltr' : 'unset',
          }}
        >
          <div>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
              }}
            >
              Invoice to :
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Nabil Hamici
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',

              }}
            >
              0976 Adrresse , Canada
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',

              }}
            >
              WoodBridge , VA 2297
            </Typography>
          </div>
          <div className="Div">
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
              }}
            >
              Date : 05/12/2024
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
              }}
            >
              INVOICE : #1XD43/13d.
            </Typography>
          </div>
        </div>
        <div className="Header"
          style={{
            width: '80%',
            height: '30px',
            background: 'rgba(45, 50, 70, 255)',
            position: 'absolute',
            top: '62%',
            left: '10%',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            direction : currentLanguage === 'ar'? 'ltr' : 'unset',
            padding: '3px 35px',


          }}
        >

          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Qty.
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Project Name
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Price
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Total
          </Typography>
        </div>
        <div className="Main1"
          style={{
            width: '80%',
            height: '30px',
            position: 'absolute',
            top: '68%',
            left: '11%',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3px 35px',
            direction : currentLanguage === 'ar'? 'ltr' : 'unset',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',

            }}
          >
            1
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '22%',
              maxWidth: '280px',
              overflow: 'hidden',

            }}
          >
            Review Modern React Server
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '62%',

            }}
          >
            3000DZA
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '88%',
            }}
          >
            2400DZA
          </Typography>


        </div>
        <div className="Main2"
          style={{
            width: '80%',
            height: '30px',

            position: 'absolute',
            top: '73%',
            left: '11%',
            direction : currentLanguage === 'ar'? 'ltr' : 'unset',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3px 35px',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',

            }}
          >
            1
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '22%',
              maxWidth: '280px',
              overflow: 'hidden',

            }}
          >
            Develop API for E-commerce
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '62%',

            }}
          >
            7000DZA
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '88%',
            }}
          >
            8400DZA
          </Typography>


        </div>
        <div className="Main3"
          style={{
            width: '80%',
            height: '30px',
            direction : currentLanguage === 'ar'? 'ltr' : 'unset',
            position: 'absolute',
            top: '78%',
            left: '11%',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3px 35px',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',

            }}
          >
            1
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '22%',
              maxWidth: '280px',
              overflow: 'hidden',

            }}
          >
            Design Mobile App Interface
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '62%',

            }}
          >
            14000DZA
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '88%',
            }}
          >
            5400DZA
          </Typography>


        </div>
        <div className="Main4"
          style={{
            width: '80%',
            height: '30px',
            direction : currentLanguage === 'ar'? 'ltr' : 'unset',
            position: 'absolute',
            top: '83%',
            left: '11%',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3px 35px',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',

            }}
          >
            1
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '22%',
              maxWidth: '280px',
              overflow: 'hidden',

            }}
          >
            Optimize Website Performance
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '62%',

            }}
          >
            23000DZA
          </Typography>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              position: 'absolute',
              left: '88%',
            }}
          >
            2140DZA
          </Typography>


        </div>
        <div className='CLIP1'
          style={{
            background: 'rgba(45, 50, 70, 255)',
            width: '55%',
            position: "absolute",
            right: '0%',
            top: '-6.5%',
            height: '250px', // Adjust height as needed
            clipPath: 'polygon(0 100%, 100% 60%, 100% 100%, 0 100%)',
          }}
        >
        </div>
        <div className='CLIP2'
          style={{
            background: 'rgba(45, 50, 70, 255)',
            width: '470px', // Adjust width as needed
            height: '240px', // Adjust height as needed
            position: 'absolute',
            left: '40%', // Adjust positioning as needed
            top: '-5%', // Adjust positioning as needed
            clipPath: 'polygon(18% 0, 19% 0, 42% 58%, 12% 0)',
          }}
        ></div>
        <div className='CLIP3'
          style={{
            background: 'rgba(45, 50, 70, 255)',
            width: '790px', // Adjust width as needed
            height: '240px', // Adjust height as needed
            position: 'absolute',
            left: '0%', // Adjust positioning as needed
            top: '-5%', // Adjust positioning as needed
            clipPath: 'polygon(24% 87%, 0 34%, 0 100%, 53% 100%, 60% 87%)',
          }}
        ></div>

      </div>
      <div className="payment"
        style={{
          background: '#fff',
          width: '80%',
          height: '550px',
          position: 'relative',
          direction : currentLanguage === 'ar'? 'ltr' : 'unset',

        }}
      >
        <div className="PaymentInfo"
          style={{
            position: 'absolute',
            top: '-3%',
            left: '10%',
            display: 'flex',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Payment Info :
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',

              }}
            >
              MasterCard
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',

              }}
            >
              0976 Adrresse , Canada
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',

              }}
            >
              WoodBridge , VA 2297
            </Typography>
          </div>
          <div className="Div "
            style={{
              position: 'absolute',
              right: '-0.1%',
              width: '35%',
              display: 'flex',
              flexDirection: 'column',
              top: '-3%',

            }}
          >
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
              }}
            >
              Sub Total :
              <span
                style={{
                  position: 'absolute',
                  right: '6%',
                }}
              >
                123560DZA
              </span>
            </Typography>
            <Typography
              sx={{
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                fontSize: '1rem',
                color: 'red',
              }}
            >
              TAX :
              <span
                style={{
                  position: 'absolute',
                  right: '6%',

                }}
              >
                0.00DZA
              </span>
            </Typography>
          </div>
        </div>
        <div className="LINE"
          style={{
            width: '32%',
            height: '1px',
            background: 'rgba(45, 50, 70, 255)',
            position: 'absolute',
            right: '10%',
            top: '5.7%',
          }}
        >

        </div>
        <div className="Total"
          style={{
            position: 'absolute',
            right: '2.7%',
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            top: '6.5%',
          }}
        >
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              color: 'red',
            }}
          >
            Total :
            <span
              style={{
                position: 'absolute',
                right: '25.4%',
              }}
            >
              3333445DZA
            </span>

          </Typography>

        </div>
      </div>
      <div className="Terms"
        style={{
          width: '80%',
          position: 'absolute',
          top: '130%',
          left: '19.4%',
          direction : currentLanguage === 'ar'? 'ltr' : 'unset',

        }}
      >
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          Terms & Conditions
        </Typography>
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            fontSize: '1rem',
            width: '50%',

          }}
        >
          By paying this invoice, you agree to the terms and conditions outlined here and in any associated agreements.
        </Typography>
      </div>
      <div className="SignaTure"
        style={{
          position: 'absolute',
          top: '150%',
          left: '19.4%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction : currentLanguage === 'ar'? 'ltr' : 'unset',
          width: '61%',
        }}
      >
        <div className="Director"
          style={{
            marginTop: '12%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center items horizontally
            textAlign: 'center', // Center text
          }}
        >
          <div className="IMG"
            style={{
              position: 'absolute',
              top: '52%',
            }}
          >
            <img width={70} src="https://res.cloudinary.com/damicjacf/image/upload/v1724440797/signature_ldpwbh.png" alt="Signature" />
          </div>
          <div className="Line"
            style={{
              width: '110%',
              height: '1px',
              background: 'grey',
              margin: '10px 0', // Adds space around the line
            }}
          >
          </div>
          <Typography
            sx={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginTop: '-10px',
            }}
          >
            Nabil Hamici
            <span
              style={{
                display: 'block',
                textAlign: 'center',
                fontWeight: '300',
                marginTop: '-7px',
              }}
            >
              Director
            </span>
          </Typography>
        </div>

        <div className="SocialInfo"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div className="Position"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <div className="Icon"
              style={{
                width: '25px',
                height: '25px',
                background: 'rgba(45, 50, 70, 255)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocationOnIcon sx={{ color: 'white', fontSize: '18px', }} />
            </div>
            <Typography>
              Rue Amir AEK 2433
            </Typography>
          </div>
          <div className="PhoneNumber"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <div className="Icon"
              style={{
                width: '25px',
                height: '25px',
                background: 'rgba(45, 50, 70, 255)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneIcon sx={{ color: 'white', fontSize: '18px', }} />
            </div>
            <Typography>
              +213 0655854120
            </Typography>
          </div>
          <div className="Email"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <div className="Icon"
              style={{
                width: '25px',
                height: '25px',
                background: 'rgba(45, 50, 70, 255)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MailIcon sx={{ color: 'white', fontSize: '18px', }} />
            </div>
            <Typography>
              infokhadmatplt@khadamat.com
            </Typography>
          </div>
          <div className="Website"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <div className="Icon"
              style={{
                width: '25px',
                height: '25px',
                background: 'rgba(45, 50, 70, 255)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LanguageIcon sx={{ color: 'white', fontSize: '18px', }} />
            </div>
            <Typography>
              khadamatplatfrom.com
            </Typography>
          </div>
        </div>
      </div>
      <div className='CLIP4'
        style={{
          background: 'rgba(45, 50, 70, 255)',
          width: '19%',
          position: "absolute",
          left: '11.9%',
          top: '162.3%',
          height: '210px',
          clipPath: 'polygon(16% 67%, 31% 81%, 51% 100%, 0 100%, 0 85%)',
        }}
      >
      </div>
      <div className='CLIP5'
        style={{
          background: 'rgba(45, 50, 70, 255)',
          width: '19%',
          position: "absolute",
          left: '11.9%',
          top: '161%',
          height: '210px',
          clipPath: 'polygon(0 31%, 0 45%, 44% 100%)',
        }}
      >
      </div>
      <div className="ThankYou"
        style={{
          position: 'absolute',
          top: '189%',
          left: '28%',
          width: '39.4%',
          display: 'flex',
          justifyContent: 'space-between',

        }}
      >
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            fontSize: '1rem',
            marginLeft: '10px',
          }}
        >
          Follow our socail media
          <span
            style={{
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            @khadamatfreelance
          </span>
        </Typography>
        <div className="Icons"
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <div className="Instagram"
            style={{
              width: '25px',
              height: '25px',
              background: 'rgba(45, 50, 70, 255)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '30px',
              justifyContent: 'center',
            }}
          >
            <InstagramIcon sx={{ color: 'white', fontSize: '18px', }} />
          </div>
          <div className="Facebook"
            style={{
              width: '25px',
              height: '25px',
              background: 'rgba(45, 50, 70, 255)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '30px',
              justifyContent: 'center',
            }}
          >
            <FacebookIcon sx={{ color: 'white', fontSize: '18px', }} />
          </div>
          <div className="X"
            style={{
              width: '25px',
              height: '25px',
              background: 'rgba(45, 50, 70, 255)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '30px',
              justifyContent: 'center',
            }}
          >
            <XIcon sx={{ color: 'white', fontSize: '18px', }} />
          </div>
        </div>
      </div>
      <div className="Bottons">
        <div className="button"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginTop: '20px',
          }}
        >
          <Button onClick={handlePrintInvoice}
            variant="outlined"
            sx={{
              width: '500px',
              height: '38px',
              borderColor: 'transparent', // Make the border transparent
              backgroundColor: 'rgba(45, 50, 70, 255)', // Add background color
              '&:hover': {
                borderColor: 'white', // Change border color on hover
                backgroundColor: 'rgba(45, 50, 70, 200)', // Slightly change background color on hover
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
              Print
            </Typography>
          </Button>

          <Button onClick={goToUserInvoices}
            variant="outlined"
            sx={{
              width: '500px',
              height: '38px',
              borderColor: 'transparent', // Make the border transparent
              backgroundColor: 'rgba(45, 50, 70, 255)', // Add background color
              '&:hover': {
                borderColor: 'white', // Change border color on hover
                backgroundColor: 'rgba(45, 50, 70, 200)', // Slightly change background color on hover
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
              Exit
            </Typography>
          </Button>

        </div>
      </div>

    </>
  )
}

export default InvoiceOne