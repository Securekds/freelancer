
import HomeIcon from '@mui/icons-material/Home';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useState, useEffect } from 'react';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import TextField from '@mui/material/TextField';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Button, Typography } from '@mui/material';
import * as React from 'react';
import Colors from './Colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';







const NavRespo = ({ onSidenavMobileToggle ,  onDrawerOpen , onBackgroundChange }) => {
  const { t } = useTranslation();

  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');


  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });



  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);


  let pageTitle = 'Dashboard'; // Default title
  if (location.pathname === '/profile') {
    pageTitle = 'Profile';
  } else if (location.pathname === '/projects') {
    pageTitle = 'Projects';
  } else if (location.pathname === '/billing') {
    pageTitle = 'Billing';
  } else if (location.pathname === '/projects/categories/programming') {
    pageTitle = t('Dashboard / Projects / Programming').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/programming/web-development') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Web-development');
    } else {
      pageTitle = t('Projects / Programming / Web-development').replace(/\s+/g, '\u00A0');
    }

  } else if (location.pathname === '/projects/categories/design') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Tableau de bord / Projets / Design');
    } else {
      pageTitle = t('Dashboard / Projects / Design').replace(/\s+/g, '\u00A0');
    }
  } else if (location.pathname === '/projects/categories/programming/mobileapp-development') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / App-development');
    } else {
      pageTitle = t('Projects / Programming / App-development');
    }

  } else if (location.pathname === '/projects/categories/programming/database-development') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Database-development');
    } else {
      pageTitle = t(' Projects / Programming / Database-development').replace(/\s+/g, '\u00A0');
    }

  } else if (location.pathname === '/projects/categories/programming/software-engineering') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Software-engineering');
    } else {
      pageTitle = t('Projects / Programming / Software-engineering').replace(/\s+/g, '\u00A0');
    }

  } else if (location.pathname === '/projects/categories/programming/website-design') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Website-Design');
    } else {
      pageTitle = t('Projects / Programming / Website-Design').replace(/\s+/g, '\u00A0');
    }
  } else if (location.pathname === '/projects/categories/programming/css-design') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Css-Design');
    } else {
      pageTitle = t('Projects / Programming / Css-Design').replace(/\s+/g, '\u00A0');
    }
  } else if (location.pathname === '/projects/categories/programming/javascript-development') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Javascript-development');
    } else {
      pageTitle = t('Projects / Programming / Javascript-development').replace(/\s+/g, '\u00A0');
    }
  } else if (location.pathname === '/projects/categories/programming/php-development') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Programming / Php-development');
    } else {
      pageTitle = t('Projects / Programming / Php-development').replace(/\s+/g, '\u00A0');
    }
  } else if (location.pathname === '/projects/categories/design/graphic-design') {
    if (currentLanguage === 'fr' && isScreenUnder450px) {
      pageTitle = t('Projects / Design / Graphic-design');
    } else {
      if (currentLanguage === 'ar' && isScreenUnder450px) {
        pageTitle = t('Projects / Design / Graphic-design').replace('Dashboard / ', '');
      } else {
        pageTitle = t('Projects / Design / Graphic-design').replace(/\s+/g, '\u00A0');
      }
    }
  } else if (location.pathname === '/projects/categories/design/photoshop') {
    pageTitle = t('Dashboard / Projects / Design / Photoshop').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/design/video-production') {
    if (currentLanguage === 'ar' && isScreenUnder450px) {
      pageTitle = t('Projects / Design / Video-production').replace('Dashboard / ', '');
    } else {
      pageTitle = t('Dashboard / Projects / Design / Video-production').replace(/\s+/g, '\u00A0');
    }
  } else if (location.pathname === '/projects/categories/design/logo-design') {
    pageTitle = t('Projects / Design / Logo-design').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/design/video-montage') {
    pageTitle = t('Projects / Design / Video-montage').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/design/creative-design') {
    pageTitle = t('Projects / Design / Creative-design').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/design/design-idea') {
    pageTitle = t('Projects / Design / Design-idea').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/design/video-design') {
    pageTitle = t('Projects / Design / Video-design').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing/e-marketing') {
    pageTitle = t('Projects / Marketing / E-marketing').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing/marketing-managment') {
    pageTitle = t('Projects / Marketing / Marketing-managment').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing/marketing-social') {
    pageTitle = t('Projects / Marketing / Marketing-social').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing/marketing-plan') {
    pageTitle = t('Projects / Marketing / Marketing-plan').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing/marketing-seo') {
    pageTitle = t('Projects / Marketing / Marketing-seo').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing/marketing-internet') {
    pageTitle = t('Projects / Marketing / Marketing-internet').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture') {
    pageTitle = t('Projects / Architecture').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture/architecture-engineering') {
    pageTitle = t('Projects / Architecture / Architecture-engineering').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture/architecture-interior') {
    pageTitle = t('Projects / Architecture / Architecture-interior').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture/architecture-design') {
    pageTitle = t('Projects / Architecture / Architecture-design').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture/architecture-idea') {
    pageTitle = t('Projects / Architecture / Architecture-idea').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture/architecture-3d') {
    pageTitle = t('Projects / Architecture / Architecture-3d').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/architecture/architecture-plans') {
    pageTitle = t('Projects / Architecture / Architecture-plans').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/marketing') {
    pageTitle = t('Projects / Marketing').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing') {
    pageTitle = t('Projects / Writing').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing/writing-content') {
    pageTitle = t('Projects / Writing / Writing-content').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing/writing-articles') {
    pageTitle = t('Projects / Writing / Writing-articles').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing/content-editing') {
    pageTitle = t('Projects / Writing / Content-edit').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing/writing-reports') {
    pageTitle = t('Projects / Writing / Writing-reports').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing/research-scientific') {
    pageTitle = t('Projects / Writing / Research-scientific').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/writing/writing-online') {
    pageTitle = t('Projects / Writing / Writing-online').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting') {
    pageTitle = t('Projects / Accounting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting/financial-accounting') {
    pageTitle = t('Projects / Accounting / Financial-accounting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting/financial-evaluation') {
    pageTitle = t('Projects / Accounting / Financial-evaluation').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting/financial-analysis') {
    pageTitle = t('Projects / Accounting / Financial-analysis').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting/financial-management') {
    pageTitle = t('Projects / Accounting / Financial-management').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting/tax-strategy') {
    pageTitle = t('Projects / Accounting / Tax-strategy').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/accounting/administrative-reports') {
    pageTitle = t('Projects / Accounting / Administrative-reports').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support') {
    pageTitle = t('Projects / Support').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support/customer-service') {
    pageTitle = t('Projects / Support / Customer-service').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support/desk-support') {
    pageTitle = t('Projects / Support / Desk-support').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support/live-chat-support') {
    pageTitle = t('Projects / Support / Live-chat-support').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support/email-support') {
    pageTitle = t('Projects / Support / Email-support').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support/technical-support') {
    pageTitle = t('Projects / Support / Technical-support').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/support/social-media-support') {
    pageTitle = t('Projects / Support / Social-media-support').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting') {
    pageTitle = t('Projects / Consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/business-consulting') {
    pageTitle = t('Projects / Consulting / Business-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/financial-consulting') {
    pageTitle = t('Projects / Consulting / Financial-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/marketing-consulting') {
    pageTitle = t('Projects / Consulting / Marketing-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/it-consulting') {
    pageTitle = t('Projects / Consulting / It-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/human-resources-consulting') {
    pageTitle = t('Projects / Consulting / Human-resources-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/legal-consulting') {
    pageTitle = t('Projects / Consulting / Legal-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/environmental-consulting') {
    pageTitle = t('Projects / Consulting / Environmental-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/projects/categories/consulting/health-consulting') {
    pageTitle = t('Projects / Consulting / Health-consulting').replace(/\s+/g, '\u00A0');
  } else if (location.pathname === '/project') {
    pageTitle = t('Projects').replace(/\s+/g, '\u00A0');
  }




  const handleIconClick = () => {
    onSidenavMobileToggle(); // Call the prop function to toggle SidenavMobile
  };



  return (
    <div className="div ">
      {isScreenUnder400px ? (
        <div className="NavRespo " style={{
          boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
          height: isScreenUnder450px ? '140px' : '73px',
          borderRadius: '0.75rem',
          width: '93%',
          marginLeft: 'auto',
          marginTop: isScreenUnder450px ? '12px' : '25px',
          marginRight: '13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          position : 'sticky',
          zIndex : '10'

        }}>
          <div className="First " style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            top: isScreenUnder450px ? '-35px' : '-5px',
            left: currentLanguage === 'ar' ? '-1px' : '11px',
          }}>
            <div>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap' ,
                }}
              >
                <HomeIcon sx={{ marginRight: '8px', fontSize: '17px', color: 'grey' }} />
                <span style={{ color: 'grey' }} >/</span>
                <span className=''
                  style={{
                    marginRight: '8px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: '1px',
                    marginRight: '9px',

                  }}>
                </span>{t(pageTitle)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  color: 'white',
                  fontWeight: 'bold',
                  marginRight : '5px',
                  

                }}
              >
                {
  location.pathname === '/projects/categories/programming' ? t('Programming') :
  location.pathname === '/projects/categories/programming/web-development' ? t('Web-development') :
  location.pathname === '/projects/categories/design' ? t('Design') :
  location.pathname === '/projects/categories/programming/mobileapp-development' ? t('App-development') :
  location.pathname === '/projects/categories/programming/database-development' ? t('Database-Development') :
  location.pathname === '/projects/categories/programming/software-engineering' ? t('Software-engineering') :
  location.pathname === '/projects/categories/programming/website-design' ? t('Website-design') :
  location.pathname === '/projects/categories/programming/css-design' ? t('Css-design') :
  location.pathname === '/projects/categories/programming/javascript-development' ? t('Javascript-development') :
  location.pathname === '/projects/categories/programming/php-development' ? t('Php-development') :
  location.pathname === '/projects/categories/design/graphic-design' ? t('Graphic-design') :
  location.pathname === '/projects/categories/design/photoshop' ? t('Photoshop') :
  location.pathname === '/projects/categories/design/video-production' ? t('Video-production') :
  location.pathname === '/projects/categories/design/logo-design' ? t('Logo-design') :
  location.pathname === '/projects/categories/design/video-montage' ? t('Video-montage') :
  location.pathname === '/projects/categories/design/creative-design' ? t('Creative-design') :
  location.pathname === '/projects/categories/design/design-idea' ? t('Design-idea') :
  location.pathname === '/projects/categories/design/video-design' ? t('Video-design') :
  location.pathname === '/projects/categories/marketing/e-marketing' ? t('E-marketing') :
  location.pathname === '/projects/categories/marketing/marketing-managment' ? t('Marketing-managment') :
  location.pathname === '/projects/categories/marketing/marketing-social' ? t('Marketing-social') :
  location.pathname === '/projects/categories/marketing/marketing-plan' ? t('Marketing-plan') :
  location.pathname === '/projects/categories/marketing/marketing-seo' ? t('Marketing-seo') :
  location.pathname === '/projects/categories/marketing/marketing-internet' ? t('Marketing-internet') :
  location.pathname === '/projects/categories/architecture' ? t('Architecture') :
  location.pathname === '/projects/categories/architecture/architecture-engineering' ? t('Architecture-engineering') :
  location.pathname === '/projects/categories/architecture/architecture-interior' ? t('Architecture-interior') :
  location.pathname === '/projects/categories/architecture/architecture-design' ? t('Architecture-design') :
  location.pathname === '/projects/categories/architecture/architecture-idea' ? t('Architecture-idea') :
  location.pathname === '/projects/categories/architecture/architecture-3d' ? t('Architecture-3d') :
  location.pathname === '/projects/categories/architecture/architecture-plans' ? t('Architecture-plans') :
  location.pathname === '/projects/categories/marketing' ? t('Marketing') :
  location.pathname === '/projects/categories/writing' ? t('Writing') :
  location.pathname === '/projects/categories/writing/writing-content' ? t('Writing-content') :
  location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing-articles') :
  location.pathname === '/projects/categories/writing/content-editing' ? t('Content-edit') :
  location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing-reports') :
  location.pathname === '/projects/categories/writing/research-scientific' ? t('Research-scientific') :
  location.pathname === '/projects/categories/writing/writing-online' ? t('Writing-online') :
  location.pathname === '/projects/categories/accounting' ? t('Accounting') :
  location.pathname === '/projects/categories/accounting/financial-accounting' ? t('Financial-accounting') :
  location.pathname === '/projects/categories/accounting/financial-evaluation' ? t('Financial-evaluation') :
  location.pathname === '/projects/categories/accounting/financial-analysis' ? t('Financial-analysis') :
  location.pathname === '/projects/categories/accounting/financial-management' ? t('Financial-management') :
  location.pathname === '/projects/categories/accounting/tax-strategy' ? t('Tax-strategy') :
  location.pathname === '/projects/categories/accounting/administrative-reports' ? t('Administrative-reports') :
  location.pathname === '/projects/categories/support' ? t('Support') :
  location.pathname === '/projects/categories/support/customer-service' ? t('Customer-service') :
  location.pathname === '/projects/categories/support/desk-support' ? t('Desk-support') :
  location.pathname === '/projects/categories/support/live-chat-support' ? t('Live-chat-support') :
  location.pathname === '/projects/categories/support/email-support' ? t('Email-support') :
  location.pathname === '/projects/categories/support/technical-support' ? t('Technical-support') :
  location.pathname === '/projects/categories/support/social-media-support' ? t('Social-media-support') :
  location.pathname === '/projects/categories/consulting' ? t('Consulting') :
  location.pathname === '/projects/categories/consulting/business-consulting' ? t('Business-consulting') :
  location.pathname === '/projects/categories/consulting/financial-consulting' ? t('Financial-consulting') :
  location.pathname === '/projects/categories/consulting/marketing-consulting' ? t('Marketing-consulting') :
  location.pathname === '/projects/categories/consulting/it-consulting' ? t('It-consulting') :
  location.pathname === '/projects/categories/consulting/human-resources-consulting' ? t('Human-resources-consulting') :
  location.pathname === '/projects/categories/consulting/legal-consulting' ? t('Legal-consulting') :
  location.pathname === '/projects/categories/consulting/environmental-consulting' ? t('Environmental-consulting') :
  location.pathname === '/projects/categories/consulting/health-consulting' ? t('Health-consulting') :
  t(pageTitle)
}

              </Typography>
            </div>









          </div>

          <div

          >
            <div

            >
              <div

              >
                <div

                >
                  <div  >
                    <div style={{

                    }} >
                      <div

                      >
                        <div

                        >
                          <div className='DESIGN'  >
                            <div className="Menu"
                            style={{
                              display : 'flex',
                              marginTop : '130px',
                              position : 'absolute',
                              right : currentLanguage === 'ar'? '32px' :  '28px',
                              top : '-55px',
                            }}
                            >
                              <div className="Search">
                                  <TextField
                                    id="outlined-search"
                                    label={t('Search field')}
                                    InputLabelProps={{
                                      style: { fontSize: '14px', color: 'white', borderRadius: '70px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif' }
                                    }}
                                    sx={{
                                      width: currentLanguage === 'ar'? '90%' : '80%',
                                      maxWidth : '400px',
                                      height: '55px',
                                      color: 'white',
                                      position: 'relative',
                                      right: '-20px',
                                      top: '8px',
                                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } },

                                    }}
                                    variant="outlined" size="small"
                                  />
  
                              </div>
                              <div className="icons"
                              style={{
                                display : 'flex',
                                alignItems : 'center',
                                
                                justifyContent : currentLanguage ==='ar'?  'center' : 'space-between',
                                marginRight : currentLanguage === 'ar'? '-113px' : '20px',
                              }}
                              >
                                <Button>
                                  <AccountCircleRoundedIcon
                                   sx={{color :' white' ,
                                    fontSize : '26px',
                                    position : 'relative',
                                    right : currentLanguage === 'ar'? '85px' : 'undefinied',
                                    }} />
                                </Button>
                                <Button>
                                  <NotificationsRoundedIcon
                                   sx={{color :' white' , 
                                   fontSize : '26px',
                                   position : 'relative',
                                   right : currentLanguage ==='ar'? '60px' :'undefinied',
                                   }} />
                                </Button>
                                <Button>
                                  <SettingsRoundedIcon 
                                  sx={{position : 'relative',
                                  right : currentLanguage === 'ar'? '30px' : 'undefinied',
                                   color :' white' ,
                                    fontSize : '26px'}} />
                                </Button>
                                <Button onClick={handleIconClick}  >
                                  <MenuOpenIcon sx={{  color :' white' ,
                                   fontSize : '28px',
                                   position : 'relative',
                                   right : currentLanguage === 'ar'? '5px' : 'unddefinied',
                                   }} />
                                </Button>

                              </div>
                            </div>
                          </div>
                        </div >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isScreenUnder450px ? (
        <div className="NavRespo " style={{  
          boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
          height: isScreenUnder450px ? '140px' : '73px',
          borderRadius: '0.75rem',
          width: '93%',
          marginLeft: 'auto',
          marginTop: isScreenUnder450px ? '12px' : '25px',
          marginRight: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          position : 'sticky',
          zIndex : '10'







        }}>
          <div className="First " style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            top: isScreenUnder450px ? '-35px' : '-5px',
            left: currentLanguage === 'ar' ? '-1px' : '11px',
          }}>
            <div>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap' ,
                }}
              >
                <HomeIcon sx={{ marginRight: '8px', fontSize: '17px', color: 'grey' }} />
                <span style={{ color: 'grey' }} >/</span>
                <span className=''
                  style={{
                    marginRight: '8px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: '1px',
                    marginRight: '9px',

                  }}>
                </span>{t(pageTitle)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  color: 'white',
                  fontWeight: 'bold',
                  

                }}
              >
                {
  location.pathname === '/projects/categories/programming' ? t('Programming') :
  location.pathname === '/projects/categories/programming/web-development' ? t('Web-development') :
  location.pathname === '/projects/categories/design' ? t('Design') :
  location.pathname === '/projects/categories/programming/mobileapp-development' ? t('App-development') :
  location.pathname === '/projects/categories/programming/database-development' ? t('Database-Development') :
  location.pathname === '/projects/categories/programming/software-engineering' ? t('Software-engineering') :
  location.pathname === '/projects/categories/programming/website-design' ? t('Website-design') :
  location.pathname === '/projects/categories/programming/css-design' ? t('Css-design') :
  location.pathname === '/projects/categories/programming/javascript-development' ? t('Javascript-development') :
  location.pathname === '/projects/categories/programming/php-development' ? t('Php-development') :
  location.pathname === '/projects/categories/design/graphic-design' ? t('Graphic-design') :
  location.pathname === '/projects/categories/design/photoshop' ? t('Photoshop') :
  location.pathname === '/projects/categories/design/video-production' ? t('Video-production') :
  location.pathname === '/projects/categories/design/logo-design' ? t('Logo-design') :
  location.pathname === '/projects/categories/design/video-montage' ? t('Video-montage') :
  location.pathname === '/projects/categories/design/creative-design' ? t('Creative-design') :
  location.pathname === '/projects/categories/design/design-idea' ? t('Design-idea') :
  location.pathname === '/projects/categories/design/video-design' ? t('Video-design') :
  location.pathname === '/projects/categories/marketing/e-marketing' ? t('E-marketing') :
  location.pathname === '/projects/categories/marketing/marketing-managment' ? t('Marketing-managment') :
  location.pathname === '/projects/categories/marketing/marketing-social' ? t('Marketing-social') :
  location.pathname === '/projects/categories/marketing/marketing-plan' ? t('Marketing-plan') :
  location.pathname === '/projects/categories/marketing/marketing-seo' ? t('Marketing-seo') :
  location.pathname === '/projects/categories/marketing/marketing-internet' ? t('Marketing-internet') :
  location.pathname === '/projects/categories/architecture' ? t('Architecture') :
  location.pathname === '/projects/categories/architecture/architecture-engineering' ? t('Architecture-engineering') :
  location.pathname === '/projects/categories/architecture/architecture-interior' ? t('Architecture-interior') :
  location.pathname === '/projects/categories/architecture/architecture-design' ? t('Architecture-design') :
  location.pathname === '/projects/categories/architecture/architecture-idea' ? t('Architecture-idea') :
  location.pathname === '/projects/categories/architecture/architecture-3d' ? t('Architecture-3d') :
  location.pathname === '/projects/categories/architecture/architecture-plans' ? t('Architecture-plans') :
  location.pathname === '/projects/categories/marketing' ? t('Marketing') :
  location.pathname === '/projects/categories/writing' ? t('Writing') :
  location.pathname === '/projects/categories/writing/writing-content' ? t('Writing-content') :
  location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing-articles') :
  location.pathname === '/projects/categories/writing/content-editing' ? t('Content-edit') :
  location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing-reports') :
  location.pathname === '/projects/categories/writing/research-scientific' ? t('Research-scientific') :
  location.pathname === '/projects/categories/writing/writing-online' ? t('Writing-online') :
  location.pathname === '/projects/categories/accounting' ? t('Accounting') :
  location.pathname === '/projects/categories/accounting/financial-accounting' ? t('Financial-accounting') :
  location.pathname === '/projects/categories/accounting/financial-evaluation' ? t('Financial-evaluation') :
  location.pathname === '/projects/categories/accounting/financial-analysis' ? t('Financial-analysis') :
  location.pathname === '/projects/categories/accounting/financial-management' ? t('Financial-management') :
  location.pathname === '/projects/categories/accounting/tax-strategy' ? t('Tax-strategy') :
  location.pathname === '/projects/categories/accounting/administrative-reports' ? t('Administrative-reports') :
  location.pathname === '/projects/categories/support' ? t('Support') :
  location.pathname === '/projects/categories/support/customer-service' ? t('Customer-service') :
  location.pathname === '/projects/categories/support/desk-support' ? t('Desk-support') :
  location.pathname === '/projects/categories/support/live-chat-support' ? t('Live-chat-support') :
  location.pathname === '/projects/categories/support/email-support' ? t('Email-support') :
  location.pathname === '/projects/categories/support/technical-support' ? t('Technical-support') :
  location.pathname === '/projects/categories/support/social-media-support' ? t('Social-media-support') :
  location.pathname === '/projects/categories/consulting' ? t('Consulting') :
  location.pathname === '/projects/categories/consulting/business-consulting' ? t('Business-consulting') :
  location.pathname === '/projects/categories/consulting/financial-consulting' ? t('Financial-consulting') :
  location.pathname === '/projects/categories/consulting/marketing-consulting' ? t('Marketing-consulting') :
  location.pathname === '/projects/categories/consulting/it-consulting' ? t('It-consulting') :
  location.pathname === '/projects/categories/consulting/human-resources-consulting' ? t('Human-resources-consulting') :
  location.pathname === '/projects/categories/consulting/legal-consulting' ? t('Legal-consulting') :
  location.pathname === '/projects/categories/consulting/environmental-consulting' ? t('Environmental-consulting') :
  location.pathname === '/projects/categories/consulting/health-consulting' ? t('Health-consulting') :
  t(pageTitle)
}

              </Typography>
            </div>









          </div>

          <div

          >
            <div

            >
              <div

              >
                <div

                >
                  <div  >
                    <div style={{

                    }} >
                      <div

                      >
                        <div

                        >
                          <div className='DESIGN'  >
                            <div className="Menu"
                            style={{
                              display : 'flex',
                              marginTop : '130px',
                              position : 'absolute',
                              right : currentLanguage === 'ar'? '-12px' : '28px',
                              top : '-55px',
                            }}
                            >
                              <div className="Search">
                                  <TextField
                                    id="outlined-search"
                                    label={t('Search field')}
                                    InputLabelProps={{
                                      style: { fontSize: '14 px', color: 'white', borderRadius: '70px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif' }
                                    }}
                                    sx={{
                                      width: '180px',
                                      height: '55px',
                                      color: 'white',
                                      position: 'relative',
                                      right: '20px',
                                      top: '8px',
                                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } },

                                    }}
                                    variant="outlined" size="small"
                                  />
  
                              </div>
                              <div className="icons"
                              style={{
                                display : 'flex',
                                alignItems : 'center',
                                width : '136px',
                                justifyContent : 'space-between',
                                marginRight : currentLanguage === 'ar'? '35px' : 'undifined',
                              }}
                              >
                                <AccountCircleRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <NotificationsRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <SettingsRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <MenuOpenIcon sx={{color :' white' , fontSize : '28px'}} />

                              </div>
                            </div>
                          </div>
                        </div >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isScreenUnder768px ? (
        <div className="NavRespo" style={{
          backgroundColor: 'rgba(26, 32, 53, 0.8)',
          boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
          height: isScreenUnder450px ? '140px' : '73px',
          borderRadius: '0.75rem',
          width: '98%',
          marginLeft: 'auto',
          marginTop: isScreenUnder450px ? '12px' : '25px',
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        
        }}>
          <div className="First " style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            top: isScreenUnder450px ? '-35px' : '-5px',
            left: currentLanguage === 'ar' ? '-1px' : '11px',
          }}>
            <div>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  whiteSpace: (currentLanguage === 'ar' || (currentLanguage === 'fr' && isScreenUnder450px)) ? 'nowrap' : 'normal'
                }}
              >
                <HomeIcon sx={{ marginRight: '8px', fontSize: '17px', color: 'grey' }} />
                <span style={{ color: 'grey' }} >/</span>
                <span className=''
                  style={{
                    marginRight: '8px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: '1px',
                    marginRight: '9px',

                  }}>
                </span>{t(pageTitle)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '1px',
                  marginRight: '15px',

                }}
              >
                           {
  location.pathname === '/projects/categories/programming' ? t('Programming') :
  location.pathname === '/projects/categories/programming/web-development' ? t('Web-development') :
  location.pathname === '/projects/categories/design' ? t('Design') :
  location.pathname === '/projects/categories/programming/mobileapp-development' ? t('App-development') :
  location.pathname === '/projects/categories/programming/database-development' ? t('Database-Development') :
  location.pathname === '/projects/categories/programming/software-engineering' ? t('Software-engineering') :
  location.pathname === '/projects/categories/programming/website-design' ? t('Website-design') :
  location.pathname === '/projects/categories/programming/css-design' ? t('Css-design') :
  location.pathname === '/projects/categories/programming/javascript-development' ? t('Javascript-development') :
  location.pathname === '/projects/categories/programming/php-development' ? t('Php-development') :
  location.pathname === '/projects/categories/design/graphic-design' ? t('Graphic-design') :
  location.pathname === '/projects/categories/design/photoshop' ? t('Photoshop') :
  location.pathname === '/projects/categories/design/video-production' ? t('Video-production') :
  location.pathname === '/projects/categories/design/logo-design' ? t('Logo-design') :
  location.pathname === '/projects/categories/design/video-montage' ? t('Video-montage') :
  location.pathname === '/projects/categories/design/creative-design' ? t('Creative-design') :
  location.pathname === '/projects/categories/design/design-idea' ? t('Design-idea') :
  location.pathname === '/projects/categories/design/video-design' ? t('Video-design') :
  location.pathname === '/projects/categories/marketing/e-marketing' ? t('E-marketing') :
  location.pathname === '/projects/categories/marketing/marketing-managment' ? t('Marketing-managment') :
  location.pathname === '/projects/categories/marketing/marketing-social' ? t('Marketing-social') :
  location.pathname === '/projects/categories/marketing/marketing-plan' ? t('Marketing-plan') :
  location.pathname === '/projects/categories/marketing/marketing-seo' ? t('Marketing-seo') :
  location.pathname === '/projects/categories/marketing/marketing-internet' ? t('Marketing-internet') :
  location.pathname === '/projects/categories/architecture' ? t('Architecture') :
  location.pathname === '/projects/categories/architecture/architecture-engineering' ? t('Architecture-engineering') :
  location.pathname === '/projects/categories/architecture/architecture-interior' ? t('Architecture-interior') :
  location.pathname === '/projects/categories/architecture/architecture-design' ? t('Architecture-design') :
  location.pathname === '/projects/categories/architecture/architecture-idea' ? t('Architecture-idea') :
  location.pathname === '/projects/categories/architecture/architecture-3d' ? t('Architecture-3d') :
  location.pathname === '/projects/categories/architecture/architecture-plans' ? t('Architecture-plans') :
  location.pathname === '/projects/categories/marketing' ? t('Marketing') :
  location.pathname === '/projects/categories/writing' ? t('Writing') :
  location.pathname === '/projects/categories/writing/writing-content' ? t('Writing-content') :
  location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing-articles') :
  location.pathname === '/projects/categories/writing/content-editing' ? t('Content-edit') :
  location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing-reports') :
  location.pathname === '/projects/categories/writing/research-scientific' ? t('Research-scientific') :
  location.pathname === '/projects/categories/writing/writing-online' ? t('Writing-online') :
  location.pathname === '/projects/categories/accounting' ? t('Accounting') :
  location.pathname === '/projects/categories/accounting/financial-accounting' ? t('Financial-accounting') :
  location.pathname === '/projects/categories/accounting/financial-evaluation' ? t('Financial-evaluation') :
  location.pathname === '/projects/categories/accounting/financial-analysis' ? t('Financial-analysis') :
  location.pathname === '/projects/categories/accounting/financial-management' ? t('Financial-management') :
  location.pathname === '/projects/categories/accounting/tax-strategy' ? t('Tax-strategy') :
  location.pathname === '/projects/categories/accounting/administrative-reports' ? t('Administrative-reports') :
  location.pathname === '/projects/categories/support' ? t('Support') :
  location.pathname === '/projects/categories/support/customer-service' ? t('Customer-service') :
  location.pathname === '/projects/categories/support/desk-support' ? t('Desk-support') :
  location.pathname === '/projects/categories/support/live-chat-support' ? t('Live-chat-support') :
  location.pathname === '/projects/categories/support/email-support' ? t('Email-support') :
  location.pathname === '/projects/categories/support/technical-support' ? t('Technical-support') :
  location.pathname === '/projects/categories/support/social-media-support' ? t('Social-media-support') :
  location.pathname === '/projects/categories/consulting' ? t('Consulting') :
  location.pathname === '/projects/categories/consulting/business-consulting' ? t('Business-consulting') :
  location.pathname === '/projects/categories/consulting/financial-consulting' ? t('Financial-consulting') :
  location.pathname === '/projects/categories/consulting/marketing-consulting' ? t('Marketing-consulting') :
  location.pathname === '/projects/categories/consulting/it-consulting' ? t('It-consulting') :
  location.pathname === '/projects/categories/consulting/human-resources-consulting' ? t('Human-resources-consulting') :
  location.pathname === '/projects/categories/consulting/legal-consulting' ? t('Legal-consulting') :
  location.pathname === '/projects/categories/consulting/environmental-consulting' ? t('Environmental-consulting') :
  location.pathname === '/projects/categories/consulting/health-consulting' ? t('Health-consulting') :
                       


               t(pageTitle)}
              </Typography>
            </div>








          </div>

          <div

          >
            <div

            >
              <div

              >
                <div

                >
                  <div  >
                    <div style={{

                    }} >
                      <div
                        style={{

                        }}
                      >
                        <div

                        >
                          <div className='DESIGN '  >
                            <div className='Options ' style={{
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                              top: '-2px',
                              right:  currentLanguage === 'ar'? '-20px' : '20px',

                            }}>
                              <div

                              >
                                <div dir="rtl"

                                >
                                  <TextField
                                    id="outlined-search"
                                    label={t('Search field')}
                                    InputLabelProps={{
                                      style: { fontSize: '14 px', color: 'white', borderRadius: '70px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif' }
                                    }}
                                    sx={{
                                      width: '200px',
                                      height: '55px',

                                      color: 'white',
                                      position: 'relative',
                                      right: '20px',
                                      top: '8px',
                                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } },

                                    }}
                                    variant="outlined" size="small"

                                  />
                                </div>
                              </div>
                              <div className="icons"
                              style={{
                                display : 'flex',
                                alignItems : 'center',
                                width : currentLanguage === 'ar'? '120px' : '136px',
                                justifyContent : 'space-between',
                                marginRight : currentLanguage === 'ar'? '35px' : 'undifined',
                              }}
                              >
                                <AccountCircleRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <NotificationsRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <SettingsRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <Button  onClick={handleIconClick} >
                                  <MenuOpenIcon sx={{color :' white' , fontSize : '28px'}} />
                                </Button>

                              </div>

                             
                            </div>
                          </div>
                        </div >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isScreenUnder1200px ? (
        <div className="NavRespo " style={{
          backgroundColor: 'rgba(26, 32, 53, 0.8)',
          boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
          height: isScreenUnder450px ? '140px' : '73px',
          borderRadius: '0.75rem',
          width: '97%',
          marginLeft: 'auto',
          marginTop: isScreenUnder450px ? '12px' : '25px',
          marginRight: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}>
          <div className="First " style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            top: isScreenUnder450px ? '-35px' : '-5px',
            left: currentLanguage === 'ar' ? '-1px' : '11px',
          }}>
            <div>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  whiteSpace: (currentLanguage === 'ar' || (currentLanguage === 'fr' && isScreenUnder450px)) ? 'nowrap' : 'normal'
                }}
              >
                <HomeIcon sx={{ marginRight: '8px', fontSize: '17px', color: 'grey' }} />
                <span style={{ color: 'grey' }} >/</span>
                <span className=''
                  style={{
                    marginRight: '8px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: '1px',
                    marginRight: '9px',

                  }}>
                </span>{t(pageTitle)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '1px',
                  marginRight: '15px',

                }}
              >
                                   {
  location.pathname === '/projects/categories/programming' ? t('Programming') :
  location.pathname === '/projects/categories/programming/web-development' ? t('Web-development') :
  location.pathname === '/projects/categories/design' ? t('Design') :
  location.pathname === '/projects/categories/programming/mobileapp-development' ? t('App-development') :
  location.pathname === '/projects/categories/programming/database-development' ? t('Database-Development') :
  location.pathname === '/projects/categories/programming/software-engineering' ? t('Software-engineering') :
  location.pathname === '/projects/categories/programming/website-design' ? t('Website-design') :
  location.pathname === '/projects/categories/programming/css-design' ? t('Css-design') :
  location.pathname === '/projects/categories/programming/javascript-development' ? t('Javascript-development') :
  location.pathname === '/projects/categories/programming/php-development' ? t('Php-development') :
  location.pathname === '/projects/categories/design/graphic-design' ? t('Graphic-design') :
  location.pathname === '/projects/categories/design/photoshop' ? t('Photoshop') :
  location.pathname === '/projects/categories/design/video-production' ? t('Video-production') :
  location.pathname === '/projects/categories/design/logo-design' ? t('Logo-design') :
  location.pathname === '/projects/categories/design/video-montage' ? t('Video-montage') :
  location.pathname === '/projects/categories/design/creative-design' ? t('Creative-design') :
  location.pathname === '/projects/categories/design/design-idea' ? t('Design-idea') :
  location.pathname === '/projects/categories/design/video-design' ? t('Video-design') :
  location.pathname === '/projects/categories/marketing/e-marketing' ? t('E-marketing') :
  location.pathname === '/projects/categories/marketing/marketing-managment' ? t('Marketing-managment') :
  location.pathname === '/projects/categories/marketing/marketing-social' ? t('Marketing-social') :
  location.pathname === '/projects/categories/marketing/marketing-plan' ? t('Marketing-plan') :
  location.pathname === '/projects/categories/marketing/marketing-seo' ? t('Marketing-seo') :
  location.pathname === '/projects/categories/marketing/marketing-internet' ? t('Marketing-internet') :
  location.pathname === '/projects/categories/architecture' ? t('Architecture') :
  location.pathname === '/projects/categories/architecture/architecture-engineering' ? t('Architecture-engineering') :
  location.pathname === '/projects/categories/architecture/architecture-interior' ? t('Architecture-interior') :
  location.pathname === '/projects/categories/architecture/architecture-design' ? t('Architecture-design') :
  location.pathname === '/projects/categories/architecture/architecture-idea' ? t('Architecture-idea') :
  location.pathname === '/projects/categories/architecture/architecture-3d' ? t('Architecture-3d') :
  location.pathname === '/projects/categories/architecture/architecture-plans' ? t('Architecture-plans') :
  location.pathname === '/projects/categories/marketing' ? t('Marketing') :
  location.pathname === '/projects/categories/writing' ? t('Writing') :
  location.pathname === '/projects/categories/writing/writing-content' ? t('Writing-content') :
  location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing-articles') :
  location.pathname === '/projects/categories/writing/content-editing' ? t('Content-edit') :
  location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing-reports') :
  location.pathname === '/projects/categories/writing/research-scientific' ? t('Research-scientific') :
  location.pathname === '/projects/categories/writing/writing-online' ? t('Writing-online') :
  location.pathname === '/projects/categories/accounting' ? t('Accounting') :
  location.pathname === '/projects/categories/accounting/financial-accounting' ? t('Financial-accounting') :
  location.pathname === '/projects/categories/accounting/financial-evaluation' ? t('Financial-evaluation') :
  location.pathname === '/projects/categories/accounting/financial-analysis' ? t('Financial-analysis') :
  location.pathname === '/projects/categories/accounting/financial-management' ? t('Financial-management') :
  location.pathname === '/projects/categories/accounting/tax-strategy' ? t('Tax-strategy') :
  location.pathname === '/projects/categories/accounting/administrative-reports' ? t('Administrative-reports') :
  location.pathname === '/projects/categories/support' ? t('Support') :
  location.pathname === '/projects/categories/support/customer-service' ? t('Customer-service') :
  location.pathname === '/projects/categories/support/desk-support' ? t('Desk-support') :
  location.pathname === '/projects/categories/support/live-chat-support' ? t('Live-chat-support') :
  location.pathname === '/projects/categories/support/email-support' ? t('Email-support') :
  location.pathname === '/projects/categories/support/technical-support' ? t('Technical-support') :
  location.pathname === '/projects/categories/support/social-media-support' ? t('Social-media-support') :
  location.pathname === '/projects/categories/consulting' ? t('Consulting') :
  location.pathname === '/projects/categories/consulting/business-consulting' ? t('Business-consulting') :
  location.pathname === '/projects/categories/consulting/financial-consulting' ? t('Financial-consulting') :
  location.pathname === '/projects/categories/consulting/marketing-consulting' ? t('Marketing-consulting') :
  location.pathname === '/projects/categories/consulting/it-consulting' ? t('It-consulting') :
  location.pathname === '/projects/categories/consulting/human-resources-consulting' ? t('Human-resources-consulting') :
  location.pathname === '/projects/categories/consulting/legal-consulting' ? t('Legal-consulting') :
  location.pathname === '/projects/categories/consulting/environmental-consulting' ? t('Environmental-consulting') :
  location.pathname === '/projects/categories/consulting/health-consulting' ? t('Health-consulting') :

               t(pageTitle)}
              </Typography>
            </div>

            <div
              style={{
                position: 'relative',
                right: currentLanguage === 'en' && isScreenUnder450px ? '1px' : 'undifined',
              }}

            >
              <div
                style={{
                  position: 'relative',

                }}
              >
                <div
                  style={{
                    position: 'relative',
                    right: location.pathname === '/projects/categories/programming' && isScreenUnder450px ? '249px' : 'undifined',

                  }}
                >
                  <div

                  >
                    <div
                      style={{
                        position: 'relative',
                        right: '635px',
                        top: '20px',


                      }}
                    >
                      <div>
                        < Button onClick={handleIconClick}  >

                          <MenuOpenIcon
                            sx={{
                              color: 'white',
                              display: isScreenUnder450px ? 'flex' : 'none',
                              position: 'relative',
                              left: '208px',
                              fontSize: '25px',
                            }}
                          />
                        </  Button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div

          >
            <div

            >
              <div

              >
                <div

                >
                  <div  >
                    <div style={{

                    }} >
                      <div
                        style={{
                          position: 'relative',
                          left: location.pathname === '/profile' ? '0px' : 'undifined',
                        }}
                      >
                        <div

                        >
                          <div className='DESIGN'  >
                          <div className="Menu "
                            style={{
                              display : 'flex',
                              marginTop : '130px',
                              position : 'absolute',
                              right : currentLanguage === 'ar'? '-380px' : '16px',
                              top : '-160px',
                            }}
                            >
                              <div className="Search">
                                  <TextField
                                    id="outlined-search"
                                    label={t('Search field')}
                                    InputLabelProps={{
                                      style: { fontSize: '14 px', color: 'white', borderRadius: '70px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif' }
                                    }}
                                    sx={{
                                      width: '200px',
                                      height: '55px',
                                      color: 'white',
                                      position: 'relative',
                                      right: '20px',
                                      top: '8px',
                                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } },

                                    }}
                                    variant="outlined" size="small"
                                  />
  
                              </div>
                              <div className="icons"
                              style={{
                                display : 'flex',
                                alignItems : 'center',
                                width : '136px',
                                justifyContent : 'space-between',
                                marginRight : currentLanguage === 'ar'? '30px' : 'undefined',
                              }}
                              >
                                <AccountCircleRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <NotificationsRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <SettingsRoundedIcon sx={{color :' white' , fontSize : '26px'}} />
                                <MenuOpenIcon sx={{color :' white' , fontSize : '28px'}} />

                              </div>
                            </div>
                          </div>
                        </div >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="NavRespo " style={{
          backgroundColor: 'rgba(26, 32, 53, 0.8)',
          boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
          height: isScreenUnder450px ? '140px' : '73px',
          borderRadius: '0.75rem',
          width: '76%',
          marginLeft: 'auto',
          marginTop: isScreenUnder450px ? '12px' : '25px',
          marginRight: currentLanguage === 'ar'? '288px' : '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
         
      
        }}>
          <div className="First" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            top: isScreenUnder450px ? '-35px' : '-5px',
            left: currentLanguage === 'ar' ? '-1px' : '11px',
          }}>
            <div>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  whiteSpace: (currentLanguage === 'ar' || (currentLanguage === 'fr' && isScreenUnder450px)) ? 'nowrap' : 'normal'
                }}
              >
                <HomeIcon sx={{ marginRight: '8px', fontSize: '17px', color: 'grey' }} />
                <span style={{ color: 'grey' }} >/</span>
                <span className=''
                  style={{
                    marginRight: '8px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: '1px',
                    marginRight: '9px',

                  }}>
                </span>{t(pageTitle)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '1px',
                  marginRight: '15px',

                }}
              >
                             {
  location.pathname === '/projects/categories/programming' ? t('Programming') :
  location.pathname === '/projects/categories/programming/web-development' ? t('Web-development') :
  location.pathname === '/projects/categories/design' ? t('Design') :
  location.pathname === '/projects/categories/programming/mobileapp-development' ? t('App-development') :
  location.pathname === '/projects/categories/programming/database-development' ? t('Database-Development') :
  location.pathname === '/projects/categories/programming/software-engineering' ? t('Software-engineering') :
  location.pathname === '/projects/categories/programming/website-design' ? t('Website-design') :
  location.pathname === '/projects/categories/programming/css-design' ? t('Css-design') :
  location.pathname === '/projects/categories/programming/javascript-development' ? t('Javascript-development') :
  location.pathname === '/projects/categories/programming/php-development' ? t('Php-development') :
  location.pathname === '/projects/categories/design/graphic-design' ? t('Graphic-design') :
  location.pathname === '/projects/categories/design/photoshop' ? t('Photoshop') :
  location.pathname === '/projects/categories/design/video-production' ? t('Video-production') :
  location.pathname === '/projects/categories/design/logo-design' ? t('Logo-design') :
  location.pathname === '/projects/categories/design/video-montage' ? t('Video-montage') :
  location.pathname === '/projects/categories/design/creative-design' ? t('Creative-design') :
  location.pathname === '/projects/categories/design/design-idea' ? t('Design-idea') :
  location.pathname === '/projects/categories/design/video-design' ? t('Video-design') :
  location.pathname === '/projects/categories/marketing/e-marketing' ? t('E-marketing') :
  location.pathname === '/projects/categories/marketing/marketing-managment' ? t('Marketing-managment') :
  location.pathname === '/projects/categories/marketing/marketing-social' ? t('Marketing-social') :
  location.pathname === '/projects/categories/marketing/marketing-plan' ? t('Marketing-plan') :
  location.pathname === '/projects/categories/marketing/marketing-seo' ? t('Marketing-seo') :
  location.pathname === '/projects/categories/marketing/marketing-internet' ? t('Marketing-internet') :
  location.pathname === '/projects/categories/architecture' ? t('Architecture') :
  location.pathname === '/projects/categories/architecture/architecture-engineering' ? t('Architecture-engineering') :
  location.pathname === '/projects/categories/architecture/architecture-interior' ? t('Architecture-interior') :
  location.pathname === '/projects/categories/architecture/architecture-design' ? t('Architecture-design') :
  location.pathname === '/projects/categories/architecture/architecture-idea' ? t('Architecture-idea') :
  location.pathname === '/projects/categories/architecture/architecture-3d' ? t('Architecture-3d') :
  location.pathname === '/projects/categories/architecture/architecture-plans' ? t('Architecture-plans') :
  location.pathname === '/projects/categories/marketing' ? t('Marketing') :
  location.pathname === '/projects/categories/writing' ? t('Writing') :
  location.pathname === '/projects/categories/writing/writing-content' ? t('Writing-content') :
  location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing-articles') :
  location.pathname === '/projects/categories/writing/content-editing' ? t('Content-edit') :
  location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing-reports') :
  location.pathname === '/projects/categories/writing/research-scientific' ? t('Research-scientific') :
  location.pathname === '/projects/categories/writing/writing-online' ? t('Writing-online') :
  location.pathname === '/projects/categories/accounting' ? t('Accounting') :
  location.pathname === '/projects/categories/accounting/financial-accounting' ? t('Financial-accounting') :
  location.pathname === '/projects/categories/accounting/financial-evaluation' ? t('Financial-evaluation') :
  location.pathname === '/projects/categories/accounting/financial-analysis' ? t('Financial-analysis') :
  location.pathname === '/projects/categories/accounting/financial-management' ? t('Financial-management') :
  location.pathname === '/projects/categories/accounting/tax-strategy' ? t('Tax-strategy') :
  location.pathname === '/projects/categories/accounting/administrative-reports' ? t('Administrative-reports') :
  location.pathname === '/projects/categories/support' ? t('Support') :
  location.pathname === '/projects/categories/support/customer-service' ? t('Customer-service') :
  location.pathname === '/projects/categories/support/desk-support' ? t('Desk-support') :
  location.pathname === '/projects/categories/support/live-chat-support' ? t('Live-chat-support') :
  location.pathname === '/projects/categories/support/email-support' ? t('Email-support') :
  location.pathname === '/projects/categories/support/technical-support' ? t('Technical-support') :
  location.pathname === '/projects/categories/support/social-media-support' ? t('Social-media-support') :
  location.pathname === '/projects/categories/consulting' ? t('Consulting') :
  location.pathname === '/projects/categories/consulting/business-consulting' ? t('Business-consulting') :
  location.pathname === '/projects/categories/consulting/financial-consulting' ? t('Financial-consulting') :
  location.pathname === '/projects/categories/consulting/marketing-consulting' ? t('Marketing-consulting') :
  location.pathname === '/projects/categories/consulting/it-consulting' ? t('It-consulting') :
  location.pathname === '/projects/categories/consulting/human-resources-consulting' ? t('Human-resources-consulting') :
  location.pathname === '/projects/categories/consulting/legal-consulting' ? t('Legal-consulting') :
  location.pathname === '/projects/categories/consulting/environmental-consulting' ? t('Environmental-consulting') :
  location.pathname === '/projects/categories/consulting/health-consulting' ? t('Health-consulting') :

               t(pageTitle)}
              </Typography>
            </div>

            <div
              style={{
                position: 'relative',
                right: currentLanguage === 'en' && isScreenUnder450px ? '1px' : 'undifined',
              }}

            >
              <div
                style={{
                  position: 'relative',

                }}
              >
                <div
                  style={{
                    position: 'relative',
                    right: location.pathname === '/projects/categories/programming' && isScreenUnder450px ? '249px' : 'undifined',

                  }}
                >
                  <div

                  >
                    <div
                      style={{
                        position: 'relative',
                        right: '235px',
                        top: '20px',


                      }}
                    >
                      <div>
                        < Button onClick={handleIconClick}  >

                          <MenuOpenIcon
                            sx={{
                              color: 'white',
                              display: isScreenUnder450px ? 'flex' : 'none',
                              position: 'relative',
                              left: '208px',
                              fontSize: '25px',
                            }}
                          />
                        </  Button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div

          >
            <div

            >
              <div

              >
                <div

                >
                  <div  >
                    <div style={{

                    }} >
                      <div
                        style={{
                          position: 'relative',
                          left: location.pathname === '/profile' ? '0px' : 'undifined',
                        }}
                      >
                        <div

                        >
                          <div className='DESIGN'  >
                          <div className="Menu"
                            style={{
                              display : 'flex',
                              marginTop : '130px',
                              position : 'absolute',
                              right : currentLanguage === 'ar'? '-390px' : '-40px',
                              top : '-157px',
                             
                            }}
                            >
                              <div className="Search">
                                  <TextField
                                    id="outlined-search"
                                    label={t('Search field')}
                                    InputLabelProps={{
                                      style: { fontSize: '14 px', color: 'white', borderRadius: '70px', fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif' }
                                    }}
                                    sx={{
                                      width: '200px',
                                      height: '55px',
                                      color: 'white',
                                      position: 'relative',
                                      right: '20px',
                                      top: '8px',
                                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } },

                                    }}
                                    variant="outlined" size="small"
                                  />
  
                              </div>
                              <div className="icons"
                              style={{
                                display : 'flex',
                                alignItems : 'center',
                                width : '10%',
                                justifyContent : '',
                                marginRight : currentLanguage === 'ar'?  '65px' : 'undifined',
                              }}
                              >
                                <Button>
                                  <AccountCircleRoundedIcon sx={{   color :' white' , fontSize : '23px'}} />
                                </Button>
                                <Button>
                                  <NotificationsRoundedIcon sx={{ position : 'relative' , right : '20px'  , color :' white' , fontSize : '23px'}} />
                                </Button>
                                    <Button  sx={{ position : 'relative' , right : '40px'  }}  >
                                      <Colors onBackgroundChange={onBackgroundChange}  />
                                    </Button>
                        
                              
                             

                              </div>
                            </div>
                          </div>
                        </div >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default NavRespo
