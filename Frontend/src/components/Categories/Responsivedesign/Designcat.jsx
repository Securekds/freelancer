import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import ShiftingDropDown from '../ShiftingDropDown';
import CodeIcon from '@mui/icons-material/Code';
import i18n from 'i18next';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import useMediaQuery from '@mui/material/useMediaQuery';
import Designmenu from '../Designmenu'

function Designcat() {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);
    return (


        <div>
            {isScreenUnder450px ? (
            <div className=''
            style={{
                display : 'flex',
                justifyItems : 'center',
                justifyContent : 'space-between',
               width : '400px',
                position : 'relative',
                right : currentLanguage === 'ar'? '1px' : '260px',
            
            }}
             >
                <div className="div">
                    <Button className=''
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            width: '150px',
                            padding: '0.5rem 0',
                            color: '#9ca3af',
                            background: 'transparent',
                            transition: 'color 0.2s',
                            cursor: 'pointer',
                            border: 'none',
                            height: '50px',
                            borderRadius: '25px',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                border: 'none',
                                backgroundColor: 'none',
                            },
                        }}
                        onClick={() => console.log('Button clicked')}
                    >
                      <CodeIcon sx={{color : 'white'}} />
                        <span className=''
                            style={{
                                fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                        {t('Design')}
                        </span>
                    </Button>
                    <div className="Underline"
                    style={{
                      width: currentLanguage === 'ar'? '90px' : '120px',
                      marginLeft : '13px',
                      height: '3px',
                      marginRight : currentLanguage === 'ar'? '30px' : 'undifined',
                      marginTop: '3px',
                      background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
            
            
                    }}
                  >
            
                  </div>
                </div>
                <div className="div"
                style={{
                    marginTop : '-15px'
                }}
                >
                <Designmenu/>
                </div>
            </div>
             ) : isScreenUnder768px ? (
                <div 
            style={{
                display : 'flex',
                justifyItems : 'center',
                justifyContent : 'space-between',
                width : currentLanguage === 'ar'? '155%' : '150%',
                position : 'relative',
                right : currentLanguage === 'ar'? '-10px' : '250px',
               
            
            }}
             >
                <div className="div">
                    <Button className=''
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            width: '140px',
                            padding: '0.5rem 0',
                            color: '#9ca3af',
                            background: 'transparent',
                            transition: 'color 0.2s',
                            cursor: 'pointer',
                            border: 'none',
                            height: '50px',
                            borderRadius: '25px',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                border: 'none',
                                backgroundColor: 'none',
                            },
                        }}
                        onClick={() => console.log('Button clicked')}
                    >
                      <DesignServicesIcon sx={{color : 'white'}} />
                        <span className=''
                            style={{
                                fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}
                        >
                        {t('Design')}
                        </span>
                    </Button>
                    <div className="Underline"
                    style={{
                      width: currentLanguage === 'ar'? '70px' : '110px',
                      marginLeft :  '13px',
                      height: '3px',
                      position : 'relative',
                      right : currentLanguage === 'ar'? '38px' : 'undifined',
                      marginTop: '3px',
                      background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
            
            
                    }}
                  >
            
                  </div>
                </div>
                <div className="div"
                style={{
                    marginTop : '-15px',
                    cursor : 'pointer',
                }}
                >
               
                    <Designmenu/>
                </div>
            </div>
              ) : isScreenUnder1200px ? (
                <div className=''
                style={{
                    display : 'flex',
                    justifyItems : 'center',
                    justifyContent : 'space-between',
                    width : '150%',
                    position : 'relative',
                    right : '259px',
                 
                
                }}
                 >
                    <div className="div">
                        <Button className=''
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                width: '150px',
                                padding: '0.5rem 0',
                                color: '#9ca3af',
                                background: 'transparent',
                                transition: 'color 0.2s',
                                cursor: 'pointer',
                                border: 'none',
                                height: '50px',
                                borderRadius: '25px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    border: 'none',
                                    backgroundColor: 'none',
                                },
                            }}
                            onClick={() => console.log('Button clicked')}
                        >
                          <DesignServicesIcon sx={{color : 'white'}} />
                            <span className=''
                                style={{
                                    fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                            {t('Design')}
                            </span>
                        </Button>
                        <div className="Underline"
                        style={{
                          width: '120px',
                          marginLeft : '13px',
                          height: '3px',
                          marginTop: '3px',
                          background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                
                
                        }}
                      >
                
                      </div>
                    </div>
                    <div className="div"
                    style={{
                        marginTop : '-15px'
                    }}
                    >
                    <ShiftingDropDown/>
                    </div>
                </div>
                 ) : (
                    <div 
                    style={{
                        display : 'flex',
                        justifyItems : 'center',
                        justifyContent : 'space-between',
                        width : currentLanguage === 'ar'? '103%' : '100%',
                        marginRight : currentLanguage === 'ar'? '247px' : 'undifined',
                    
                    }}
                     >
                        <div className="div">
                            <Button className=''
                                variant="outlined"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none',
                                    width: '150px',
                                    padding: '0.5rem 0',
                                    color: '#9ca3af',
                                    background: 'transparent',
                                    transition: 'color 0.2s',
                                    cursor: 'pointer',
                                    border: 'none',
                                    height: '50px',
                                    borderRadius: '25px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        border: 'none',
                                        backgroundColor: 'none',
                                    },
                                }}
                                onClick={() => console.log('Button clicked')}
                            >
                              <DesignServicesIcon sx={{color : 'white'}} />
                                <span className=''
                                    style={{
                                        fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                {t('Design')}
                                </span>
                            </Button>
                            <div className="Underline"
                            style={{
                              width: currentLanguage === 'ar'? '80px' : '120px',
                              marginLeft : '13px',
                              height: '3px',
                              marginTop: '3px',
                              position : 'relative',
                              right : currentLanguage === 'ar'? '33px' : 'undifined',
                              background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                    
                    
                            }}
                          >
                    
                          </div>
                        </div>
                        <div className="div"
                        style={{
                            marginTop : '-15px'
                        }}
                        >
                        <Designmenu/>
                        </div>
                    </div>
                 )}
        </div>
    )
}

export default Designcat
