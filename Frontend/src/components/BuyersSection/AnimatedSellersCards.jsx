import React, { useState, useEffect } from "react";
import i18n from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import PinDropIcon from '@mui/icons-material/PinDrop';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Typography } from '@mui/material';
import { useUser } from '../../Context/UserContext';
import { useTranslation } from 'react-i18next';
import AnalyticsCard from "./AnalyticsCard";
import {
  faSeedling,
  faMedal,
  faStar,
  faStarHalfAlt,
  faCrown,
  faAward,
  faCoins,
  faScrewdriver,
  faKey,
  faSpa,
  faDove,
  faFireFlameCurved,
  faBolt,
  faBacon
} from '@fortawesome/free-solid-svg-icons';
import ReviewRankChart from "../Categories/Responsivedesign/ReviewRankChart";
import { display } from "@mui/system";

const styles = {
  container: {
    width: '100%',
    height: 'auto',
    marginTop: '20px',
    display : 'flex',
    flexDirection : 'column',
    gap : '15px',
    padding: '10px',
  },
  card: {
    position: 'relative',
    width: '100%',
    minHeight: '750px',
    borderRadius: '30px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255    , 255, 0.1)',
    overflow: 'hidden',
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    clipPath: 'polygon(100% 1%, 100% 100%, 50% 92%, 0 99%, 0 0)',
    zIndex: 0,
  },
  profileContainer: {
    position: 'absolute',
    top: '150px',
    left: '20px',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '3px solid rgb(91, 193, 253)',
    overflow: 'hidden',
    zIndex: 2,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoContainer: {
    position: 'absolute',
    top: '270px',
    left: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  userInfoSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignItems: 'center',
    width: '99%',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '39%',
    border: '1px solid #2f374d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'transparent',
    boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 0 15px rgba(33, 150, 243, 0.7)',
    },
  },
  hireButton: {
    width: '170px',
    height: '40px',
    borderRadius: '20px',
    border: '1px solid #2f374d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'transparent',
    boxShadow: '0 0 10px rgba(33, 150, 243, 0.9)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 0 15px rgba(33, 150, 243, 1)',
    },
  },
  locationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'white',
    opacity: 0.7,
  },
};

const stars = 3; // Number of filled stars
const starcolorfiled = "#FFDF00"; // Color for filled stars
const starcolorempty = "#E2E8F0"; // Color for empty stars
const AchievmentIcon = 'https://res.cloudinary.com/damicjacf/image/upload/v1735407247/reward5-removebg-preview_LE_upscale_magic_x4_strength_75_similarity_50_tone_enhance_50_color_enhance_70-removebg-preview_sn95cs.png'


function AnimatedSellersCards() {
  const { user } = useUser();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div
          style={{
            ...styles.coverImage,
            backgroundImage: `url(${user?.coverImg})`,
          }}
        />

        <div style={styles.profileContainer}>
          <img
            src={user?.profileImg}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.userInfoSection}>
            <div style={styles.userDetails}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                }}>
                {user?.firstName} {user?.lastName}
              </Typography>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: '13px',
                    fontWeight: 'bold',
                    opacity: '0.7',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }}>
                  WebSite Developer
                </Typography>
                <FontAwesomeIcon
                  icon={faRedditAlien}
                  style={{
                    fontSize: '18px',
                    color: '#fff',
                  }}
                />
                <Typography
                  sx={{
                    color: "white",
                    fontSize: '13px',
                    fontWeight: 'bold',
                    opacity: '0.7',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }}>
                  @Nabil.hmc (MaxLevel)
                </Typography>
              </div>

              <div style={styles.locationInfo}>
                <PinDropIcon sx={{ fontSize: '18px' }} />
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }}>
                  Algeria, Boumedfaa, Ain-Defla
                </Typography>
              </div>
            </div>
            <div style={styles.socialIcons}>
              {[FacebookOutlinedIcon, GitHubIcon, LinkedInIcon].map((Icon, index) => (
                <div key={index} style={styles.socialIcon}>
                  <Icon sx={{ color: 'rgb(33, 150, 243)', fontSize: '25px' }} />
                </div>
              ))}
            </div>
            <div style={styles.hireButton}>
              <Typography
                sx={{
                  color: 'rgb(33, 150, 243)',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  fontWeight: 'bold',
                }}>
                Hire Me
              </Typography>
            </div>
          </div>

          <div className="Boxse"
            style={{
              display: 'flex',
              width : '99%',
              justifyContent: 'space-between',
              marginTop : '15px',

            }}
          >
            <div className="Boxe1"
              style={{
                width: '20%',
                height: 'auto',
                background: 'rgba(0, 0, 0, 0.3)',
                border  : '1px solid white',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div className="RankSection"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '19px',

                }}
              >
                <div className="RankTYpo">
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t('Current Rank')}
                  </Typography>
                </div>
                <div className="RankIcon"
                  style={{
                    background: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.9)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faStarHalfAlt}
                    style={{
                      transform: 'rotate(0deg)',
                      fontSize: '19px',
                      color: '#fff',
                    }}
                  />

                </div>
                <div className="RankNameProgress"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '150%',
                    alignItems: 'center',
                  }}
                >
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t(' #5 Elite')}
                  </Typography>
                  <div className="Progressoi"
                    style={{
                      background: '#194e3d',
                      padding: '3px',
                      borderRadius: '16px',

                    }}
                  >
                    <Typography

                      sx={{
                        color: '#2df873',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}


                    >
                      {t('+ 5.6% ')}
                    </Typography>

                  </div>

                </div>


              </div>

            </div>
            <div className="Boxe2"
              style={{
                width: '20%',
                height: 'auto',
                background: 'rgba(0, 0, 0, 0.3)',
                border  : '1px solid white',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div className="ReviewsSection"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',

                }}
              >
                <div className="ReviewTYpo">
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t('Current Reviews')}
                  </Typography>
                </div>
                <div className="ReviewChart"
                  style={{
                    background: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.9)",
                    transition: "all 0.3s ease",
                    transform: "scale(0.4)", // This will make the chart 40% of its original size
                    marginTop: '15px',
                  }}
                >
                  <ReviewRankChart />

                </div>
                <div
                  className="ReviewProgress"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "140%",
                    alignItems: "center",
                    padding: '5px',
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1px",
                    }}
                  >
                    {/* Render Stars */}
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        style={{
                          color: index < stars ? starcolorfiled : starcolorempty,
                          fontSize: "10px",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className="Progressoi"
                    style={{
                      background: "#194e3d",
                      padding: "3px",
                      borderRadius: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#2df873",
                        fontFamily:
                          currentLanguage === "ar"
                            ? '"Droid Arabic Kufi", serif'
                            : '"Airbnbcereal", sans-serif',
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {"+ 5.6%"}
                    </Typography>
                  </div>
                </div>


              </div>

            </div>
            <div className="Boxe3"
              style={{
                width: '20%',
                height: 'auto',
                background: 'rgba(0, 0, 0, 0.3)',
                border  : '1px solid white',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div className="AchievemntsSection"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '19px',

                }}
              >
                <div className="RankTYpo">
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t('Current Achievments')}
                  </Typography>
                </div>

                <style>
                  {`
  @keyframes glowIcon {
    from {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 5px #614ad3);
    }
    to {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 20px #614ad3);
    }
  }

  .glowing-icon {
    animation: glowIcon 1.5s infinite alternate;
    transition: all 0.3s ease-in-out;
  }
`}
                </style>

                <img
                style={{
                  marginTop : '-9px',
                }}
                  className="glowing-icon"
                  width={80}
                  src={AchievmentIcon}
                  alt="Achievement Icon"
                />




                <div className="AchievmentsProgress"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t(' #5 Legend')}
                  </Typography>
                  <div className="Progressoi"
                    style={{
                      background: '#194e3d',
                      padding: '3px',
                      borderRadius: '16px',

                    }}
                  >
                    <Typography

                      sx={{
                        color: '#2df873',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}


                    >
                      {t('+ 5.6% ')}
                    </Typography>

                  </div>

                </div>


              </div>

            </div>
           

          </div>

          <AnalyticsCard />
        </div>

      </div>
      <div className="Divider"
      style={{
        width : '100%',
        height : "1px",
        background : 'white',
        opacity : '0.7'
      }}
      >

      </div>
      <div style={styles.card}>
        <div
          style={{
            ...styles.coverImage,
            backgroundImage: `url(${user?.coverImg})`,
          }}
        />

        <div style={styles.profileContainer}>
          <img
            src={user?.profileImg}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.userInfoSection}>
            <div style={styles.userDetails}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                }}>
                {user?.firstName} {user?.lastName}
              </Typography>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: '13px',
                    fontWeight: 'bold',
                    opacity: '0.7',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }}>
                  WebSite Developer
                </Typography>
                <FontAwesomeIcon
                  icon={faRedditAlien}
                  style={{
                    fontSize: '18px',
                    color: '#fff',
                  }}
                />
                <Typography
                  sx={{
                    color: "white",
                    fontSize: '13px',
                    fontWeight: 'bold',
                    opacity: '0.7',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }}>
                  @Nabil.hmc (MaxLevel)
                </Typography>
              </div>

              <div style={styles.locationInfo}>
                <PinDropIcon sx={{ fontSize: '18px' }} />
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }}>
                  Algeria, Boumedfaa, Ain-Defla
                </Typography>
              </div>
            </div>
            <div style={styles.socialIcons}>
              {[FacebookOutlinedIcon, GitHubIcon, LinkedInIcon].map((Icon, index) => (
                <div key={index} style={styles.socialIcon}>
                  <Icon sx={{ color: 'rgb(33, 150, 243)', fontSize: '25px' }} />
                </div>
              ))}
            </div>
            <div style={styles.hireButton}>
              <Typography
                sx={{
                  color: 'rgb(33, 150, 243)',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  fontWeight: 'bold',
                }}>
                Hire Me
              </Typography>
            </div>
          </div>

          <div className="Boxse"
            style={{
              display: 'flex',
              width : '99%',
              justifyContent: 'space-between',
              marginTop : '15px',

            }}
          >
            <div className="Boxe1"
              style={{
                width: '20%',
                height: 'auto',
                background: 'rgba(0, 0, 0, 0.3)',
                border  : '1px solid white',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div className="RankSection"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '19px',

                }}
              >
                <div className="RankTYpo">
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t('Current Rank')}
                  </Typography>
                </div>
                <div className="RankIcon"
                  style={{
                    background: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.9)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faStarHalfAlt}
                    style={{
                      transform: 'rotate(0deg)',
                      fontSize: '19px',
                      color: '#fff',
                    }}
                  />

                </div>
                <div className="RankNameProgress"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '150%',
                    alignItems: 'center',
                  }}
                >
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t(' #5 Elite')}
                  </Typography>
                  <div className="Progressoi"
                    style={{
                      background: '#194e3d',
                      padding: '3px',
                      borderRadius: '16px',

                    }}
                  >
                    <Typography

                      sx={{
                        color: '#2df873',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}


                    >
                      {t('+ 5.6% ')}
                    </Typography>

                  </div>

                </div>


              </div>

            </div>
            <div className="Boxe2"
              style={{
                width: '20%',
                height: 'auto',
                background: 'rgba(0, 0, 0, 0.3)',
                border  : '1px solid white',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div className="ReviewsSection"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',

                }}
              >
                <div className="ReviewTYpo">
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t('Current Reviews')}
                  </Typography>
                </div>
                <div className="ReviewChart"
                  style={{
                    background: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.9)",
                    transition: "all 0.3s ease",
                    transform: "scale(0.4)", // This will make the chart 40% of its original size
                    marginTop: '15px',
                  }}
                >
                  <ReviewRankChart />

                </div>
                <div
                  className="ReviewProgress"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "150%",
                    alignItems: "center",
                    padding: '5px',
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1px",
                    }}
                  >
                    {/* Render Stars */}
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        style={{
                          color: index < stars ? starcolorfiled : starcolorempty,
                          fontSize: "10px",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className="Progressoi"
                    style={{
                      background: "#194e3d",
                      padding: "3px",
                      borderRadius: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#2df873",
                        fontFamily:
                          currentLanguage === "ar"
                            ? '"Droid Arabic Kufi", serif'
                            : '"Airbnbcereal", sans-serif',
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {"+ 5.6%"}
                    </Typography>
                  </div>
                </div>


              </div>

            </div>
            <div className="Boxe3"
              style={{
                width: '20%',
                height: 'auto',
                background: 'rgba(0, 0, 0, 0.3)',
                border  : '1px solid white',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div className="AchievemntsSection"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '19px',

                }}
              >
                <div className="RankTYpo">
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t('Current Achievments')}
                  </Typography>
                </div>

                <style>
                  {`
  @keyframes glowIcon {
    from {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 5px #614ad3);
    }
    to {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 20px #614ad3);
    }
  }

  .glowing-icon {
    animation: glowIcon 1.5s infinite alternate;
    transition: all 0.3s ease-in-out;
  }
`}
                </style>

                <img
                style={{
                  marginTop : '-9px',
                }}
                  className="glowing-icon"
                  width={80}
                  src={AchievmentIcon}
                  alt="Achievement Icon"
                />




                <div className="AchievmentsProgress"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Typography

                    sx={{
                      color: '#ffffff',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}


                  >
                    {t(' #5 Legend')}
                  </Typography>
                  <div className="Progressoi"
                    style={{
                      background: '#194e3d',
                      padding: '3px',
                      borderRadius: '16px',

                    }}
                  >
                    <Typography

                      sx={{
                        color: '#2df873',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}


                    >
                      {t('+ 5.6% ')}
                    </Typography>

                  </div>

                </div>


              </div>

            </div>
           

          </div>

          <AnalyticsCard />
        </div>

      </div>
    </div>
  );
}

export default AnimatedSellersCards;