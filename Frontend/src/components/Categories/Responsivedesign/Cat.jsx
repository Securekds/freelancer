import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import ShiftingDropDown from '../ShiftingDropDown';
import CodeIcon from '@mui/icons-material/Code';
import i18n from 'i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

function Cat() {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');
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
            {isScreenUnder400px ? (
            <div className=''
            style={{
                display : 'flex',
                justifyItems : 'center',
                flexDirection : 'column',
                alignItems : 'center',
                 width : '300px',
                position : 'relative',
                right : currentLanguage === 'ar'? '1px' : '230px',
            
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
                            maxWidth : '150px',
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
                        {t('Programming')}
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
                <ShiftingDropDown/>
                </div>
            </div>
             ) : isScreenUnder450px ? (
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
                            {t('Programming')}
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
                    <ShiftingDropDown/>
                    </div>
                </div>
             ) : isScreenUnder768px ? (
                <div 
            style={{
                display : 'flex',
                justifyItems : 'center',
                justifyContent : 'space-between',
                width : '155%',
                position : 'relative',
                right : currentLanguage === 'ar'? '-5px' : '250px',
               
            
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
                        {t('Programming')}
                        </span>
                    </Button>
                    <div className="Underline"
                    style={{
                      width: '70px',
                      marginLeft : '13px',
                      height: '3px',
                      marginTop: '3px',
                      marginRight : currentLanguage === 'ar'? '40px' : 'undifined',
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
               
                    <ShiftingDropDown/>
                </div>
            </div>
              ) : isScreenUnder1200px ? (
                <div className=''
                style={{
                    display : 'flex',
                    justifyItems : 'center',
                    justifyContent : 'space-between',
                    width : '135%',
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
                          <CodeIcon sx={{color : 'white'}} />
                            <span className=''
                                style={{
                                    fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >
                            {t('Programming')}
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
           ) : isScreenUnder1440px ? (
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
                              <CodeIcon sx={{color : 'white'}} />
                                <span className=''
                                    style={{
                                        fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                {t('Programming')}
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
                              <CodeIcon sx={{color : 'white'}} />
                                <span className=''
                                    style={{
                                        fontSize: currentLanguage === 'ar' ? '18px' : '14px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                {t('Programming')}
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
                        <ShiftingDropDown/>
                        </div>
                    </div>
           )}
        </div>
    )
}

export default Cat
