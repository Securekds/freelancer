
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
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
function Navbarmobile() {
    const { t } = useTranslation();
  
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');

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
    }else if (location.pathname === '/projects/categories/programming/web-development') {
      if ( isScreenUnder768px) {
          pageTitle = t('Projects / Programming / Web-development');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Web-development');
      }
  
    }else if (location.pathname === '/projects/categories/design') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Tableau de bord / Projets / Design');
      } else {
          pageTitle = t('Dashboard / Projects / Design').replace(/\s+/g, '\u00A0');
      }
    }else if (location.pathname === '/projects/categories/programming/mobileapp-development') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / App-development');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / App-development').replace(/\s+/g, '\u00A0');
      }
  
    } else if (location.pathname === '/projects/categories/programming/database-development') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / Database-development');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Database-development').replace(/\s+/g, '\u00A0');
      }
  
    } else if (location.pathname === '/projects/categories/programming/software-engineering') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / Software-engineering');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Software-engineering').replace(/\s+/g, '\u00A0');
      }
  
    }else if (location.pathname === '/projects/categories/programming/website-design') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / Website-Design');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Website-Design').replace(/\s+/g, '\u00A0');
      }
    } else if (location.pathname === '/projects/categories/programming/css-design') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / Css-Design');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Css-Design').replace(/\s+/g, '\u00A0');
      }
    } else if (location.pathname === '/projects/categories/programming/javascript-development') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / Javascript-development');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Javascript-development').replace(/\s+/g, '\u00A0');
      }
    } else if (location.pathname === '/projects/categories/programming/php-development') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Programming / Php-development');
      } else {
          pageTitle = t('Dashboard / Projects / Programming / Php-development').replace(/\s+/g, '\u00A0');
      }
    }else if (location.pathname === '/projects/categories/design/graphic-design') {
      if (currentLanguage === 'fr' && isScreenUnder450px) {
          pageTitle = t('Projects / Design / Graphic-design');
      } else {
          if (currentLanguage === 'ar' && isScreenUnder450px) {
              pageTitle = t('Projects / Design / Graphic-design').replace('Dashboard / ', '');
          } else {
              pageTitle = t('Dashboard / Projects / Design / Graphic-design').replace(/\s+/g, '\u00A0');
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
      pageTitle = 'Dashboard / Projects / Design / Logo-design';
    } else if (location.pathname === '/projects/categories/design/video-montage') {
      pageTitle = 'Dashboard / Projects / Design / Video-montage';
    } else if (location.pathname === '/projects/categories/design/creative-design') {
      pageTitle = 'Dashboard / Projects / Design / Creative-design';
    } else if (location.pathname === '/projects/categories/design/design-idea') {
      pageTitle = 'Dashboard / Projects / Design / Design-idea';
    } else if (location.pathname === '/projects/categories/design/video-design') {
      pageTitle = 'Dashboard / Projects / Design / Video-design';
    } else if (location.pathname === '/projects/categories/marketing/e-marketing') {
      pageTitle = 'Dashboard / Projects / Marketing / E-marketing';
    } else if (location.pathname === '/projects/categories/marketing/marketing-managment') {
      pageTitle = 'Dashboard / Projects / Marketing / Marketing-managment';
    } else if (location.pathname === '/projects/categories/marketing/marketing-social') {
      pageTitle = 'Dashboard / Projects / Marketing / Marketing-social';
    } else if (location.pathname === '/projects/categories/marketing/marketing-plan') {
      pageTitle = 'Dashboard / Projects / Marketing / Marketing-plan';
    } else if (location.pathname === '/projects/categories/marketing/marketing-seo') {
      pageTitle = 'Dashboard / Projects / Marketing / Marketing-seo';
    } else if (location.pathname === '/projects/categories/marketing/marketing-internet') {
      pageTitle = 'Dashboard / Projects / Marketing / Marketing-internet';
    } else if (location.pathname === '/projects/categories/architecture') {
      pageTitle = 'Dashboard / Projects / Architecture ';
    } else if (location.pathname === '/projects/categories/architecture/architecture-engineering') {
      pageTitle = 'Dashboard / Projects / Architecture / Architecture-engineering ';
    } else if (location.pathname === '/projects/categories/architecture/architecture-interior') {
      pageTitle = 'Dashboard / Projects / Architecture / Architecture-interior ';
    } else if (location.pathname === '/projects/categories/architecture/architecture-design') {
      pageTitle = 'Dashboard / Projects / Architecture / Architecture-design ';
    } else if (location.pathname === '/projects/categories/architecture/architecture-idea') {
      pageTitle = 'Dashboard / Projects / Architecture / Architecture-idea ';
    } else if (location.pathname === '/projects/categories/architecture/architecture-3d') {
      pageTitle = 'Dashboard / Projects / Architecture / Architecture-3d ';
    } else if (location.pathname === '/projects/categories/architecture/architecture-plans') {
      pageTitle = 'Dashboard / Projects / Architecture / Architecture-plans';
    } else if (location.pathname === '/projects/categories/architecture') {
      pageTitle = 'Dashboard / Projects / Architecture';
    } else if (location.pathname === '/projects/categories/marketing') {
      pageTitle = 'Dashboard / Projects / Marketing';
    } else if (location.pathname === '/projects/categories/writing') {
      pageTitle = 'Dashboard / Projects / Writing';
    } else if (location.pathname === '/projects/categories/writing/writing-content') {
      pageTitle = 'Dashboard / Projects / Writing / Writing-content';
    } else if (location.pathname === '/projects/categories/writing/writing-articles') {
      pageTitle = 'Dashboard / Projects / Writing / Writing-articles';
    } else if (location.pathname === '/projects/categories/writing/content-editing') {
      pageTitle = 'Dashboard / Projects / Writing / Content-edit';
    } else if (location.pathname === '/projects/categories/writing/writing-reports') {
      pageTitle = 'Dashboard / Projects / Writing / Writing-reports';
    } else if (location.pathname === '/projects/categories/writing/research-scientific') {
      pageTitle = 'Dashboard / Projects / Writing / Research-scientific';
    } else if (location.pathname === '/projects/categories/writing/writing-online') {
      pageTitle = 'Dashboard / Projects / Writing / Writing-online';
    } else if (location.pathname === '/projects/categories/accounting') {
      pageTitle = 'Dashboard / Projects / Accounting ';
    } else if (location.pathname === '/projects/categories/accounting/financial-accounting') {
      pageTitle = 'Dashboard / Projects / Accounting / Financial-accounting ';
    } else if (location.pathname === '/projects/categories/accounting/financial-evaluation') {
      pageTitle = 'Dashboard / Projects / Accounting / Financial-evaluation ';
    } else if (location.pathname === '/projects/categories/accounting/financial-analysis') {
      pageTitle = 'Dashboard / Projects / Accounting / Financial-analysis ';
    }else if (location.pathname === '/projects/categories/accounting/financial-management') {
      pageTitle = 'Dashboard / Projects / Accounting / Financial-management ';
    }else if (location.pathname === '/projects/categories/accounting/tax-strategy') {
      pageTitle = 'Dashboard / Projects / Accounting / Tax-strategy ';
    }else if (location.pathname === '/projects/categories/accounting/administrative-reports') {
      pageTitle = 'Dashboard / Projects / Accounting / Administrative-reports ';
    }else if (location.pathname === '/projects/categories/support') {
      pageTitle = 'Dashboard / Projects / Support';
    }else if (location.pathname === '/projects/categories/support/customer-service') {
      pageTitle = 'Dashboard / Projects / Support / Customer-service';
    }else if (location.pathname === '/projects/categories/support/desk-support') {
      pageTitle = 'Dashboard / Projects / Support / Desk-support';
    }else if (location.pathname === '/projects/categories/support/live-chat-support') {
      pageTitle = 'Dashboard / Projects / Support / Live-chat-support';
    }else if (location.pathname === '/projects/categories/support/email-support') {
      pageTitle = 'Dashboard / Projects / Support / Email-support';
    }else if (location.pathname === '/projects/categories/support/technical-support') {
      pageTitle = 'Dashboard / Projects / Support / Technical-support';
    }else if (location.pathname === '/projects/categories/support/social-media-support') {
      pageTitle = 'Dashboard / Projects / Support / Social-media-support';
    }else if (location.pathname === '/projects/categories/consulting') {
      pageTitle = 'Dashboard / Projects / Consulting ';
    }else if (location.pathname === '/projects/categories/consulting/business-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Business-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/financial-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Financial-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/marketing-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Marketing-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/it-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / It-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/human-resources-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Human-resources-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/legal-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Legal-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/environmental-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Environmental-consulting ';
    }else if (location.pathname === '/projects/categories/consulting/health-consulting') {
      pageTitle = 'Dashboard / Projects / Consulting / Health-consulting ';
    }else if (location.pathname === '/projects') {
      pageTitle = 'Dashboard / Projects / Consulting / Health-consulting ';
      }else if (location.pathname === '/project') {
        pageTitle = 'Projects';
      }
    
  
      const handleIconClick = () => {
        onSidenavMobileToggle(); // Call the prop function to toggle SidenavMobile
      };  
  return (
    <div>
      <div className="NavRespo" style={{
       backgroundColor: 'rgba(26, 32, 53, 0.8)',
       boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
       height: isScreenUnder450px ? '140px' : '73px',
       borderRadius: '0.75rem',
       width :  '96%' ,
       marginLeft: 'auto',
       marginTop: isScreenUnder450px ? '12px' : '25px',
       marginRight: '18px',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'space-between',
       backgroundColor: 'rgba(0, 0, 0, 0.2)', 
       border: '1px solid rgba(255, 255, 255, 0.18)', 
       position: currentLanguage === 'ar' ? 'relative' : 'relative',
       left: location.pathname === '/billing' && isScreenUnder450px ? '-2px' : location.pathname === '/billing' ? '10px' : 'undefined',
    
    
    
    
    
       right: currentLanguage === 'ar' ? '270px' : 'undifined',
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
             {location.pathname === '/projects/categories/programming' ? t('Programming') :
               location.pathname === '/projects/categories/programming/web-development' ? t('Web-development') :
                 location.pathname === '/projects/categories/design' ? t('Design') :
                   location.pathname === '/projects/categories/programming/mobileapp-development' ? t('App-development') :
                     location.pathname === '/projects/categories/programming/database-development' ? t('Database-Development') :
                       location.pathname === '/projects/categories/programming/software-engineering' ? t('Software-engineering') :
                         location.pathname === '/projects/categories/programming/website-design' ? t('Website-design') :
                           location.pathname === '/projects/categories/programming/css-design' ? t('Css-design' ):
                             location.pathname === '/projects/categories/programming/javascript-development' ? t('Javascript-development') :
                               location.pathname === '/projects/categories/programming/php-development' ? t('Php-development') :
                                 location.pathname === '/projects/categories/design/graphic-design' ? t('Graphic-design') :
                                   location.pathname === '/projects/categories/design/photoshop' ? t('Photoshop') :
                                     location.pathname === '/projects/categories/design/video-production' ? t('Video-production') :
                                       location.pathname === '/projects/categories/design/logo-design' ? t('Logo-design') :
                                         location.pathname === '/projects/categories/design/video-montage' ? t('video-montage') :
                                           location.pathname === '/projects/categories/design/creative-design' ? t('Creative-design') :
                                             location.pathname === '/projects/categories/design/design-idea' ? 'Design-idea' :
                                               location.pathname === '/projects/categories/design/video-design' ? 'Video-design' :
                                                 location.pathname === '/projects/categories/marketing/e-marketing' ? 'E-marketing' :
                                                   location.pathname === '/projects/categories/marketing/marketing-managment' ? 'Marketing-managment' :
                                                     location.pathname === '/projects/categories/marketing/marketing-social' ? 'Marketing-social' :
                                                       location.pathname === '/projects/categories/marketing/marketing-plan' ? 'Marketing-plan' :
                                                         location.pathname === '/projects/categories/marketing/marketing-seo' ? 'Marketing-seo' :
                                                           location.pathname === '/projects/categories/marketing/marketing-internet' ? 'Marketing-internet' :
                                                             location.pathname === '/projects/categories/architecture' ? 'Architecture' :
                                                               location.pathname === '/projects/categories/architecture/architecture-engineering' ? 'Architecture-engineering' :
                                                                 location.pathname === '/projects/categories/architecture/architecture-interior' ? 'Architecture-interior' :
                                                                   location.pathname === '/projects/categories/architecture/architecture-design' ? 'Architecture-design' :
                                                                     location.pathname === '/projects/categories/architecture/architecture-idea' ? 'Architecture-idea' :
                                                                       location.pathname === '/projects/categories/architecture/architecture-3d' ? 'Architecture-3d' :
                                                                         location.pathname === '/projects/categories/architecture/architecture-plans' ? 'Architecture-plans' :
                                                                           location.pathname === '/projects/categories/marketing' ? 'Marketing' :
                                                                             location.pathname === '/projects/categories/architecture' ? 'Architecture' :
                                                                               location.pathname === '/projects/categories/writing' ? 'Writing' :
                                                                                 location.pathname === '/projects/categories/writing/writing-content' ? 'Writing-content' :
                                                                                   location.pathname === '/projects/categories/writing/writing-articles' ? 'Writing-articles' :
                                                                                     location.pathname === '/projects/categories/writing/content-editing' ? 'Content-edit' :
                                                                                       location.pathname === '/projects/categories/writing/writing-reports' ? 'Writing-reports' :
                                                                                         location.pathname === '/projects/categories/writing/research-scientific' ? 'Research-scientific' :
                                                                                           location.pathname === '/projects/categories/writing/writing-online' ? 'Writing-online' :
                                                                                             location.pathname === '/projects/categories/accounting' ? 'Accounting' :
                                                                                               location.pathname === '/projects/categories/accounting/financial-accounting' ? 'Financial-accounting' :
                                                                                               location.pathname === '/projects/categories/accounting/financial-evaluation' ? 'Financial-evaluation' :
                                                                                               location.pathname === '/projects/categories/accounting/financial-analysis' ? 'Financial-analysis' :
                                                                                               location.pathname === '/projects/categories/accounting/financial-management' ? 'Financial-management' :
                                                                                               location.pathname === '/projects/categories/accounting/tax-strategy' ? 'Tax-strategy' :
                                                                                               location.pathname === '/projects/categories/accounting/administrative-reports' ? 'Administrative-reports' :
                                                                                               location.pathname === '/projects/categories/support' ? 'Support' :
                                                                                               location.pathname === '/projects/categories/support/customer-service' ? 'Customer-service' :  
                                                                                               location.pathname === '/projects/categories/support/desk-support' ? 'Desk-support' :
                                                                                               location.pathname === '/projects/categories/support/live-chat-support' ? 'Live-chat-support' :  
                                                                                               location.pathname === '/projects/categories/support/email-support' ? 'Email-support' :  
                                                                                               location.pathname === '/projects/categories/support/technical-support' ? 'Technical-support' :  
                                                                                               location.pathname === '/projects/categories/support/social-media-support' ? 'Social-media-support' : 
                                                                                               location.pathname === '/projects/categories/consulting' ? 'Consulting' :  
                                                                                               location.pathname === '/projects/categories/consulting/business-consulting' ? 'Business-consulting' : 
                                                                                               location.pathname === '/projects/categories/consulting/financial-consulting' ? 'Financial-consulting' : 
                                                                                               location.pathname === '/projects/categories/consulting/marketing-consulting' ? 'Marketing-consulting' :  
                                                                                               location.pathname === '/projects/categories/consulting/it-consulting' ? 'It-consulting' :  
                                                                                               location.pathname === '/projects/categories/consulting/human-resources-consulting' ? 'Human-resources-consulting' :  
                                                                                               location.pathname === '/projects/categories/consulting/legal-consulting' ? 'Legal-consulting' :  
                                                                                               location.pathname === '/projects/categories/consulting/environmental-consulting' ? 'Environmental-consulting' :  
                                                                                               location.pathname === '/projects/categories/consulting/health-consulting' ? 'Health-consulting' :  
    
                                                                                                 t(pageTitle)}
           </Typography>
         </div>
    
      <div
      style={{
        position : 'relative',
        right : currentLanguage === 'en' && isScreenUnder450px? '1px' : 'undifined',
             }}
      
      >
         <div 
         style={{
          position : 'relative',
         
               }}
         >
          <div
          style={{
           position : 'relative',
           right :  location.pathname === '/projects/categories/programming' && isScreenUnder450px ? '249px' : 'undifined',
          
          }}
           >
            <div 
           
             >
               <div 
               style={{
                position : 'relative',
                right :  '235px',
                top :   '20px',
               

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
                
                  >
                    <div
                   
                    >
                     <div className='DESIGN'  >
                       <div className='Options' style={{
                         display: 'flex',
                         alignItems: 'center',
                         position : 'relative',
                         right : isScreenUnder768px? '20px' : 'undifined',
                         position: 'relative',
                         top: '1',
                    
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
                         <AccountCircleRoundedIcon sx={{ color: 'white', marginRight: '10px' }} />
                         <SettingsRoundedIcon sx={{ color: 'white', marginRight: '10px' }} />
                         <NotificationsRoundedIcon sx={{ color: 'white', marginRight: currentLanguage === 'ar' ? '5px' : 'undifined', }} />
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
    </div>
  )
}

export default Navbarmobile
