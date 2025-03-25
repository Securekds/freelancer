import React, { useEffect, useState } from 'react';
import './MeteorsDemo.css';
import { Typography } from '@mui/material';
import i18n from 'i18next';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';



function MeteorsDemo() {

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
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');
  const isScreenUnder1440px = useMediaQuery('(max-width:1400px)');
  const navigate = useNavigate();


  const [scrollToTop, setScrollToTop] = useState(false);
  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0);
      setScrollToTop(false); // Reset flag after initial scroll
    }
  }, [scrollToTop]);

  // Handle navigation using usenavigate or your library's method
  const handleClick = () => {
    // Trigger navigation
    navigate('/project/singlepost');
    setScrollToTop(true); // Set flag to scroll to top
  };

  return (





    <div>
      {isScreenUnder400px ? (
        <div className="meteors-demo-container"
          style={{
            height: '260px',
            width : '90%',
            marginLeft : '19px',
            marginTop : '90px',
          }}
        >
          <section className="meteors-demo-section" >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className='ProjectContainer '
            >
              <div>
                <div className="User"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                   
                  }}
                >

                  <div className='ProfileCircle ' style={{
                    position: 'relative',
                    width:  '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #ccc',
                  }}>
                    <img src="http://localhost:3000/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg" alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        textAlign: 'center',
                      }}
                    />
                  </div>

                  <div className="ActiveBadge">
                    <div style={{
                      position: 'absolute',
                      top: '55px',
                      left: currentLanguage === 'ar'? '292px' : '55px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'green', // Active status color
                      border: '2px solid white', // Border to separate status circle from profile picture
                    }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex',
                     alignItems: 'center',
                     marginRight : currentLanguage === 'ar'? '10px' : 'undifined',
                      }} >

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '10px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('Nabil Hamici')}

                      </Typography>

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '5px',
                          fontSize: '14px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('(Khadamat Partner)')}

                      </Typography>


                      <div
                      >
                        <div className='TitelEN '
                        
                        >
                          <div
                            style={{

                            }}
                          >
                            <div className='TitelAR '
                             
                            >
                              <Typography className=''
                                sx={{
                                  color: 'white',
                                  position: 'absolute',
                                  right: currentLanguage === 'en'? '52px' : 'undifined',
                                  top: currentLanguage === 'ar'? '80px' : '85px',
                                  textWrap: 'nowrap',
                                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                              >
                                {t('[Programming an integrated online store]')}
                              </Typography>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >
                      <AccessTimeIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '8px' : 'undifined',
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '13px' : 'undifined',


                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',

                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('13 munite ago')}
                        </Typography>
                      </div>
                      <div className="Line"
                        style={{
                          width: '1.4px',
                          height: '15px',
                          background: 'white',
                          marginLeft: '5px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '16px' : 'undifined',
                        }}
                      >

                      </div>
                      <LocalOfferIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                          marginLeft: '5px'
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('8 offers')}
                        </Typography>
                      </div>
                    </div>


                  </div>

                </div>
                <div className="Content"
                  style={{
                    padding: '10px',

                  }}
                >
                  <div
                    style={{
                      width: isScreenUnder450px && location.pathname === '/project'
                        ? '340px'
                        : isScreenUnder450px
                          ? '300px'
                          : 'undefined',
                      position: 'relative',
                      top: isScreenUnder450px ? '30px' : 'undifined',

                    }}
                  >
                    <Typography
                      sx={{
                        color: '#64748B',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: 'bold',
                        display: isScreenUnder450px ? '-webkit-box' : 'undifined',
                        WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undifined',
                        WebkitLineClamp: isScreenUnder450px ? '3' : 'undifined',
                        overflow: isScreenUnder450px ? 'hidden' : 'undifined',

                      }}
                    >
                      {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}

                    </Typography>
                  </div>
                </div>
                <div className=''

                >
                  <div
                    style={{
                      position: 'relative',
                      top: isScreenUnder450px ? '18px' : 'undifined',
                      right: isScreenUnder450px ? '110px' : 'undifined',

                    }}
                  >
                    <div className="button"
                      style={{
                        position: 'relative',
                        left: isScreenUnder450px ? '230px' : '870px',
                        top: currentLanguage === 'ar' && isScreenUnder450px ? '20px' : '20px',
                        right: currentLanguage === 'ar' && isScreenUnder450px ? '25px' :
                          currentLanguage === 'ar' ? '875px' :
                            'undifined',

                      }}
                    >
                      <Button variant="outlined"
                        sx={{
                          borderColor: 'white', '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                          {t('Make an offer')}
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </section>
        </div>
      ) : isScreenUnder450px ? (
        <div className="meteors-demo-container"
          style={{
            height: '260px',
            width : '90%',
            marginLeft : '19px',
            marginTop : '90px',
          }}
        >
          <section className="meteors-demo-section" >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className='ProjectContainer '
            >
              <div>
                <div className="User"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                   
                  }}
                >

                  <div className='ProfileCircle ' style={{
                    position: 'relative',
                    width:  '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #ccc',
                  }}>
                    <img src="http://localhost:3000/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg" alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        textAlign: 'center',
                      }}
                    />
                  </div>

                  <div className="ActiveBadge">
                    <div style={{
                      position: 'absolute',
                      top: '55px',
                      left: currentLanguage === 'ar'? '292px' : '55px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'green', // Active status color
                      border: '2px solid white', // Border to separate status circle from profile picture
                    }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex',
                     alignItems: 'center',
                     marginRight : currentLanguage === 'ar'? '10px' : 'undifined',
                      }} >

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '10px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('Nabil Hamici')}

                      </Typography>

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '5px',
                          fontSize: '14px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('(Khadamat Partner)')}

                      </Typography>


                      <div
                      >
                        <div className='TitelEN '
                        
                        >
                          <div
                            style={{

                            }}
                          >
                            <div className='TitelAR '
                             
                            >
                              <Typography className=''
                                sx={{
                                  color: 'white',
                                  position: 'absolute',
                                  right: currentLanguage === 'en'? '52px' : 'undifined',
                                  top: currentLanguage === 'ar'? '80px' : '85px',
                                  textWrap: 'nowrap',
                                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                              >
                                {t('[Programming an integrated online store]')}
                              </Typography>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >
                      <AccessTimeIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '8px' : 'undifined',
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '13px' : 'undifined',


                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',

                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('13 munite ago')}
                        </Typography>
                      </div>
                      <div className="Line"
                        style={{
                          width: '1.4px',
                          height: '15px',
                          background: 'white',
                          marginLeft: '5px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '16px' : 'undifined',
                        }}
                      >

                      </div>
                      <LocalOfferIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                          marginLeft: '5px'
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('8 offers')}
                        </Typography>
                      </div>
                    </div>


                  </div>

                </div>
                <div className="Content"
                  style={{
                    padding: '10px',

                  }}
                >
                  <div
                    style={{
                      width: isScreenUnder450px && location.pathname === '/project'
                        ? '340px'
                        : isScreenUnder450px
                          ? '300px'
                          : 'undefined',
                      position: 'relative',
                      top: isScreenUnder450px ? '30px' : 'undifined',

                    }}
                  >
                    <Typography
                      sx={{
                        color: '#64748B',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: 'bold',
                        display: isScreenUnder450px ? '-webkit-box' : 'undifined',
                        WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undifined',
                        WebkitLineClamp: isScreenUnder450px ? '3' : 'undifined',
                        overflow: isScreenUnder450px ? 'hidden' : 'undifined',

                      }}
                    >
                      {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}

                    </Typography>
                  </div>
                </div>
                <div className=''

                >
                  <div
                    style={{
                      position: 'relative',
                      top: isScreenUnder450px ? '18px' : 'undifined',
                      right: isScreenUnder450px ? '110px' : 'undifined',

                    }}
                  >
                    <div className="button"
                      style={{
                        position: 'relative',
                        left: isScreenUnder450px ? '230px' : '870px',
                        top: currentLanguage === 'ar' && isScreenUnder450px ? '20px' : '20px',
                        right: currentLanguage === 'ar' && isScreenUnder450px ? '25px' :
                          currentLanguage === 'ar' ? '875px' :
                            'undifined',

                      }}
                    >
                      <Button variant="outlined"
                        sx={{
                          borderColor: 'white', '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                          {t('Make an offer')}
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </section>
        </div>
      ) : isScreenUnder768px ? (
        <div className="meteors-demo-container "
          style={{
            height: '240px',
            width : '93%',
            position : 'relative',
            top : '90px',
            left : currentLanguage === 'ar'? '-26px' : '25px',
          }}
        >
          <section className="meteors-demo-section" >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className='ProjectContainer '
            >
              <div>
                <div className="User"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',

                  }}
                >

                  <div className='ProfileCircle' style={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #ccc',
                  }}>
                    <img src="http://localhost:3000/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg" alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        textAlign: 'center',
                      }}
                    />
                  </div>

                  <div className="ActiveBadge">
                    <div style={{
                      position: 'absolute',
                      top: '55px',
                      left: currentLanguage === 'ar'? '644px' : '55px',

                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'green', // Active status color
                      border: '2px solid white', // Border to separate status circle from profile picture
                    }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex',
                     alignItems: 'center',
                     marginRight : currentLanguage === 'ar'? '11px' : 'undifined',
                      }} >

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '10px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('Nabil Hamici')}

                      </Typography>

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '5px',
                          fontSize: '14px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('(Khadamat Partner)')}

                      </Typography>


                      <div
                      >
                        <div className='TitelEN '
                          style={{
                            position: 'relative',
                            left: isScreenUnder450px ? '20px' : '670px',
                            top: isScreenUnder450px ? '30px' : '-26px',
                          }}
                        >
                          <div
                            style={{

                            }}
                          >
                            <div className='TitelAR '
                              style={{
                                position: 'relative',
                                right: currentLanguage === 'ar' && isScreenUnder450px && location.pathname === '/project'
                                  ? '-245px'
                                  : currentLanguage === 'ar'
                                    ? '590px'
                                    : 'undefined',
                                top: currentLanguage === 'ar' ? '-5px' : 'undifined',
                                width: currentLanguage === 'ar' ? '400px' : 'undifined',
                              }}
                            >
                              <Typography className=''
                                sx={{
                                  color: 'white',
                                  position: 'absolute',
                                  right: '280px',
                                  top: '28px',
                                  textWrap: 'nowrap',
                                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                              >
                                {t('[Programming an integrated online store]')}
                              </Typography>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >
                      <AccessTimeIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '8px' : 'undifined',
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '13px' : 'undifined',


                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',

                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('13 munite ago')}
                        </Typography>
                      </div>
                      <div className="Line"
                        style={{
                          width: '1.4px',
                          height: '15px',
                          background: 'white',
                          marginLeft: '5px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '16px' : 'undifined',
                        }}
                      >

                      </div>
                      <LocalOfferIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                          marginLeft: '5px'
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('8 offers')}
                        </Typography>
                      </div>
                    </div>


                  </div>

                </div>
                <div className="Content"
                  style={{
                    padding: '10px',

                  }}
                >
                  <div
                   
                  >
                    <Typography
                      sx={{
                        color: '#64748B',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: 'bold',
                        display: isScreenUnder450px ? '-webkit-box' : 'undifined',
                       marginTop : '20px',

                      }}
                    >
                      {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}

                    </Typography>
                  </div>
                </div>
                <div className=''

                >
                  <div
                   style={{
                    marginLeft : '570px',
                    marginTop : '5px',
                    marginRight : currentLanguage === 'ar'? '600px' : 'undifined',
                    width : currentLanguage === 'ar'? '200px' : 'undifined',
                   }}
                  >
                    <div className="button"
                     
                    >
                      <Button variant="outlined"
                        sx={{
                          borderColor: 'white', '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                          {t('Make an offer')}
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </section>
        </div>
      ) : isScreenUnder1200px ? (
        <div className="meteors-demo-container "
          style={{
            height: '260px',
            width : '97%',
            marginTop : '85px',
            marginLeft : '15px',
          }}
        >
          <section className="meteors-demo-section" >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className='ProjectContainer '
            >
              <div>
                <div className="User"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',

                  }}
                >

                  <div className='ProfileCircle' style={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #ccc',
                  }}>
                    <img src="http://localhost:3000/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg" alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        textAlign: 'center',
                      }}
                    />
                  </div>

                  <div className="ActiveBadge">
                    <div style={{
                      position: 'absolute',
                      top: '55px',
                      left: '55px',

                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'green', // Active status color
                      border: '2px solid white', // Border to separate status circle from profile picture
                    }}></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }} >

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '10px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('Nabil Hamici')}

                      </Typography>

                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '5px',
                          fontSize: '14px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}
                      >
                        {t('(Khadamat Partner)')}

                      </Typography>


                      <div
                      >
                        <div className='TitelEN '
                        
                         
                        >
                          <div
                            style={{

                            }}
                          >
                            <div className='TitelAR '
                           
                            >
                              <Typography className=''
                                sx={{
                                  color: 'white',
                                  position: 'absolute',
                                  right: '14px',
                                  top: '28px',
                                  marginRight : '20px',
                                  textWrap: 'nowrap',
                                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                }}
                              >
                                {t('[Programming an integrated online store]')}
                              </Typography>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >
                      <AccessTimeIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '8px' : 'undifined',
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '13px' : 'undifined',


                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',

                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('13 munite ago')}
                        </Typography>
                      </div>
                      <div className="Line"
                        style={{
                          width: '1.4px',
                          height: '15px',
                          background: 'white',
                          marginLeft: '5px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '16px' : 'undifined',
                        }}
                      >

                      </div>
                      <LocalOfferIcon
                        sx={{
                          color: 'white',
                          fontSize: '16px',
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                          marginLeft: '5px'
                        }} />
                      <div
                        style={{
                          position: 'relative',
                          right: currentLanguage === 'ar' ? '15px' : 'undifined',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '3px',
                            fontSize: '14px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          }}
                        >
                          {t('8 offers')}
                        </Typography>
                      </div>
                    </div>


                  </div>

                </div>
                <div className="Content"
                  style={{
                    padding: '10px',

                  }}
                >
                  <div
                   
                  >
                    <Typography
                      sx={{
                        color: '#64748B',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: 'bold',
                       textWrap : 'wrap',
                       marginTop : '10px',

                      }}
                    >
                      {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}

                    </Typography>
                  </div>
                </div>
                <div className=''

                >
                  <div
                
                  >
                    <div className="button"
                       style={{
                        marginLeft : '640px',
                        marginTop : '10px',
                       }}
                    >
                      <Button variant="outlined"
                        sx={{
                          borderColor: 'white', '&:hover': {
                            borderColor: 'white',
                            
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                          {t('Make an offer')}
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </section>
        </div>
         ) : isScreenUnder1440px ? (
            <div className="meteors-demo-container "
            style={{
              height: '230px',
              marginTop : '90px',
              marginLeft : currentLanguage === 'ar'? '15px' : '282px',
             
            }}
          >
            <section className="meteors-demo-section " >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className='ProjectContainer '
              >
                <div>
                  <div className="User"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
  
                    }}
                  >
  
                    <div className='ProfileCircle' style={{
                      position: 'relative',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #ccc',
                    }}>
                      <img src="http://localhost:3000/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg" alt="Profile"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          textAlign: 'center',
                        }}
                      />
                    </div>
  
                    <div className="ActiveBadge">
                      <div style={{
                        position: 'absolute',
                        top: '55px',
                        left: currentLanguage === 'ar'? '915px' : '55px',
  
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'green', // Active status color
                        border: '2px solid white', // Border to separate status circle from profile picture
                      }}></div>
                    </div>
                    <div>
                      <div style={{ display: 'flex',
                       alignItems: 'center',
                       marginRight : currentLanguage === 'ar'? '10px' : 'undifined',
                     
                        }} >
  
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '10px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('Nabil Hamici')}
  
                        </Typography>
  
                        <Typography
                          sx={{
                            color: 'white',
                            marginLeft: '5px',
                            fontSize: '14px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          }}
                        >
                          {t('(Khadamat Partner)')}
  
                        </Typography>
  
  
                        <div
                        >
                          <div className='TitelEN '
                            style={{
                              position: 'relative',
                              left: isScreenUnder450px ? '20px' : '670px',
                              top: isScreenUnder450px ? '30px' : '-26px',
                            }}
                          >
                            <div
                              style={{
  
                              }}
                            >
                              <div className='TitelAR '
                                style={{
                                  position: 'relative',
                                  right: currentLanguage === 'ar' && isScreenUnder450px && location.pathname === '/project'
                                    ? '-245px'
                                    : currentLanguage === 'ar'
                                      ? '1130px'
                                      : 'undefined',
                                  top: currentLanguage === 'ar' ? '-5px' : 'undifined',
                                  width: currentLanguage === 'ar' ? '400px' : 'undifined',
                                }}
                              >
                            
                           
                                   <a href='/project/singlepost'>
                                     <Typography className=''
                                       sx={{
                                         color: 'white',
                                         position: 'absolute',
                                         right: '14px',
                                         top: '28px',
                                         textWrap: 'nowrap',
                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                     
                                       }}
                                      
                                     >
                                       {t('[Programming an integrated online store]')}
                                     </Typography>
                                   </a>
                                 
                          
  
                              </div>
                            </div>
  
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >
                        <AccessTimeIcon
                          sx={{
                            color: 'white',
                            fontSize: '16px',
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '8px' : 'undifined',
                          }} />
                        <div
                          style={{
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '13px' : 'undifined',
  
  
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'white',
                              marginLeft: '3px',
                              fontSize: '14px',
  
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
  
                            }}
                          >
                            {t('13 munite ago')}
                          </Typography>
                        </div>
                        <div className="Line"
                          style={{
                            width: '1.4px',
                            height: '15px',
                            background: 'white',
                            marginLeft: '5px',
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '16px' : 'undifined',
                          }}
                        >
  
                        </div>
                        <LocalOfferIcon
                          sx={{
                            color: 'white',
                            fontSize: '16px',
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '15px' : 'undifined',
                            marginLeft: '5px'
                          }} />
                        <div
                          style={{
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '15px' : 'undifined',
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'white',
                              marginLeft: '3px',
                              fontSize: '14px',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
  
                            }}
                          >
                            {t('8 offers')}
                          </Typography>
                        </div>
                      </div>
  
  
                    </div>
  
                  </div>
                  <div className="Content"
                    style={{
                      padding: '10px',
  
                    }}
                  >
                    <div
                      style={{
                        width: isScreenUnder450px && location.pathname === '/project'
                          ? '340px'
                          : isScreenUnder450px
                            ? '300px'
                            : 'undefined',
                        position: 'relative',
                        top: isScreenUnder450px ? '30px' : 'undifined',
  
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#64748B',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          fontWeight: 'bold',
                          display: isScreenUnder450px ? '-webkit-box' : 'undifined',
                          WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undifined',
                          WebkitLineClamp: isScreenUnder450px ? '3' : 'undifined',
                          overflow: isScreenUnder450px ? 'hidden' : 'undifined',
  
                        }}
                      >
                        {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
  
                      </Typography>
                    </div>
                  </div>
                  <div className=''
  
                  >
                    <div
                      style={{
                        position: 'relative',
                        top: isScreenUnder450px ? '18px' : 'undifined',
                        right: isScreenUnder450px ? '110px' : 'undifined',
  
                      }}
                    >
                      <div className="button"
                        style={{
                          position: 'relative',
                          left: isScreenUnder450px ? '230px' : '835px',
                          top: currentLanguage === 'ar' && isScreenUnder450px ? '20px' : '20px',
                          right: currentLanguage === 'ar' && isScreenUnder450px ? '25px' :
                            currentLanguage === 'ar' ? '875px' :
                              'undifined',
  
                        }}
                      >
                        <Button variant="outlined"
                          sx={{
                            borderColor: 'white', '&:hover': {
                              borderColor: 'white',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                            {t('Make an offer')}
                          </Typography>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
  
              </div>
  
            </section>
          </div>
       ) : (
        <div className="meteors-demo-container "
        style={{
          height: '230px',
          marginTop : '90px',
          marginLeft : currentLanguage === 'ar'? '15px' : '282px',
         
        }}
      >
        <section className="meteors-demo-section " >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className='ProjectContainer '
          >
            <div>
              <div className="User"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',

                }}
              >

                <div className='ProfileCircle' style={{
                  position: 'relative',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #ccc',
                }}>
                  <img src="http://localhost:3000/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg" alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      textAlign: 'center',
                    }}
                  />
                </div>

                <div className="ActiveBadge">
                  <div style={{
                    position: 'absolute',
                    top: '55px',
                    left: currentLanguage === 'ar'? '915px' : '55px',

                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'green', // Active status color
                    border: '2px solid white', // Border to separate status circle from profile picture
                  }}></div>
                </div>
                <div>
                  <div style={{ display: 'flex',
                   alignItems: 'center',
                   marginRight : currentLanguage === 'ar'? '10px' : 'undifined',
                 
                    }} >

                    <Typography
                      sx={{
                        color: 'white',
                        marginLeft: '10px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t('Nabil Hamici')}

                    </Typography>

                    <Typography
                      sx={{
                        color: 'white',
                        marginLeft: '5px',
                        fontSize: '14px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {t('(Khadamat Partner)')}

                    </Typography>


                    <div
                    >
                      <div className='TitelEN '
                        style={{
                          position: 'relative',
                          left: isScreenUnder450px ? '20px' : '670px',
                          top: isScreenUnder450px ? '30px' : '-26px',
                        }}
                      >
                        <div
                          style={{

                          }}
                        >
                          <div className='TitelAR '
                            style={{
                              position: 'relative',
                              right: currentLanguage === 'ar' && isScreenUnder450px && location.pathname === '/project'
                                ? '-245px'
                                : currentLanguage === 'ar'
                                  ? '1130px'
                                  : 'undefined',
                              top: currentLanguage === 'ar' ? '-5px' : 'undifined',
                              width: currentLanguage === 'ar' ? '400px' : 'undifined',
                            }}
                          >
                            <Typography className=''
                              sx={{
                                color: 'white',
                                position: 'absolute',
                                right: '14px',
                                top: '28px',
                                textWrap: 'nowrap',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                              }}
                            >
                              {t('[Programming an integrated online store]')}
                            </Typography>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }} >
                    <AccessTimeIcon
                      sx={{
                        color: 'white',
                        fontSize: '16px',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '8px' : 'undifined',
                      }} />
                    <div
                      style={{
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '13px' : 'undifined',


                      }}
                    >
                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '3px',
                          fontSize: '14px',

                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                      >
                        {t('13 munite ago')}
                      </Typography>
                    </div>
                    <div className="Line"
                      style={{
                        width: '1.4px',
                        height: '15px',
                        background: 'white',
                        marginLeft: '5px',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '16px' : 'undifined',
                      }}
                    >

                    </div>
                    <LocalOfferIcon
                      sx={{
                        color: 'white',
                        fontSize: '16px',
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '15px' : 'undifined',
                        marginLeft: '5px'
                      }} />
                    <div
                      style={{
                        position: 'relative',
                        right: currentLanguage === 'ar' ? '15px' : 'undifined',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'white',
                          marginLeft: '3px',
                          fontSize: '14px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                        }}
                      >
                        {t('8 offers')}
                      </Typography>
                    </div>
                  </div>


                </div>

              </div>
              <div className="Content"
                style={{
                  padding: '10px',

                }}
              >
                <div
                  style={{
                    width: isScreenUnder450px && location.pathname === '/project'
                      ? '340px'
                      : isScreenUnder450px
                        ? '300px'
                        : 'undefined',
                    position: 'relative',
                    top: isScreenUnder450px ? '30px' : 'undifined',

                  }}
                >
                  <Typography
                    sx={{
                      color: '#64748B',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      fontWeight: 'bold',
                      display: isScreenUnder450px ? '-webkit-box' : 'undifined',
                      WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undifined',
                      WebkitLineClamp: isScreenUnder450px ? '3' : 'undifined',
                      overflow: isScreenUnder450px ? 'hidden' : 'undifined',

                    }}
                  >
                    {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}

                  </Typography>
                </div>
              </div>
              <div className=''

              >
                <div
                  style={{
                    position: 'relative',
                    top: isScreenUnder450px ? '18px' : 'undifined',
                    right: isScreenUnder450px ? '110px' : 'undifined',

                  }}
                >
                  <div className="button"
                    style={{
                      position: 'relative',
                      left: isScreenUnder450px ? '230px' : '835px',
                      top: currentLanguage === 'ar' && isScreenUnder450px ? '20px' : '20px',
                      right: currentLanguage === 'ar' && isScreenUnder450px ? '25px' :
                        currentLanguage === 'ar' ? '875px' :
                          'undifined',

                    }}
                  >
                    <Button variant="outlined"
                      sx={{
                        borderColor: 'white', '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: change background color on hover
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
                        {t('Make an offer')}
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </div>
       )}
           </div>







  );
}


export default MeteorsDemo;
