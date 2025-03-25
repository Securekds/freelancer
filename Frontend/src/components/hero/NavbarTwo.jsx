import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useTheme } from 'react';
import i18n from 'i18next';
import Button from '@mui/material/Button';
import { Drawer, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import newRequest from '../../utils/newRequest';












function NavbarTwo({isLoggedIn}) {
    const navigate = useNavigate();

    const handleButtonClick = (page) => {
      navigate('/auth/signin/')
    };


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
            window.location.reload(); // Reload the page on the first reload
        } else if (reloadCount === 2) {
            setReloadCount(0); // Reset reload counter after the second reload
        }
    }, [reloadCount]); // Trigger effect when reloadCount changes
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');

    // Drawer
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // @ts-ignore
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    const currentUser = JSON.parse(localStorage.getItem("currentUser"));



 

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser" , null);
            navigate("/");

        } catch (err) {
            console.log(err)
        }

    }



    const handleNavigation = () => {
        navigate('/auth/signup/');
    };




    return (





        <div className='NavbarContainer ' style={{ overflow: 'hidden', direction: currentLanguage === 'ar' ? 'rtl' : 'ltr', height: "100vh", width: '100%', backgroundColor: "#0d0d0d", position: 'relative' }}>

            <div style={{
                display: 'flex',
                justifyContent: isScreenUnder450px ? 'center' : 'space-between',
                flexDirection: isScreenUnder450px ? 'column' : 'row',
                padding: '15px'
            }}>
                <Box className='ShareText  '>
                    <Typography variant="h4" sx={{
                        color: 'white',
                         fontSize: currentLanguage === 'ar' ? '19px' : '16px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        fontWeight: '500',
                        lineHeight: '28px',
                        display: 'flex',
                        position: 'relative',
                        top: isScreenUnder450px ? '-13px' : 'undifined',
                        margin: '0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: isScreenUnder450px ? '12px' : '15px',
                        textAlign: 'center',
                    }}>
                        {t('Share your work and get paid easily with our services')}
                    </Typography>
                </Box>
                {!isScreenUnder450px && (
                    <div className='Lang '

                        style={{
                            cursor: 'pointer',
                            display: 'flex',

                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            top: '-10px',
                            left: currentLanguage === 'ar' ? '-10px' : '5px',
                        }}>

                        <Box className="language-box " sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '5px' : '19px',
                        }}>
                            <img onClick={() => toggleLanguage('ar')} style={{ width: '30px', marginRight: '3px' }} src="public/images/algeria.png" alt="logo" />
                            <Typography onClick={() => toggleLanguage('ar')} sx={{
                                color: "white", fontWeight: '500',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}>{t('Arabic')}</Typography>
                            <div style={{
                                position: 'relative',
                                left: currentLanguage === 'ar' ? '-6px' : '6px',
                                fontWeight: '600'
                            }}


                                className='LINE '>

                            </div>
                        </Box>
                        <Box className="language-box  " sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            right: '10px'
                        }}>
                            <img onClick={() => toggleLanguage('fr')} style={{ width: '30px', marginRight: '3px' }} src="public/images/french.png" alt="logo" />
                            <Typography onClick={() => toggleLanguage('en')} sx={{
                                color: "white", fontWeight: '500',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}>{t('French')}</Typography>
                            <Typography onClick={() => toggleLanguage('fr')} sx={{ color: "white", }}></Typography>
                            <div style={{
                                position: 'relative',
                                left: currentLanguage === 'ar' ? '-4px' : '5px',
                            }}


                                className='LINE'>

                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', right: currentLanguage === 'en' ? '10px' : 'undifined' }}>
                            <img onClick={() => toggleLanguage('en')} style={{
                                width: '45px',
                                position: 'relative',
                                top: '6px',
                                left: '-5px',
                                right: currentLanguage === 'ar' ? '13px' : 'undifined',
                            }} src="public/images/usa.png" alt="logo" />
                            <Typography onClick={() => toggleLanguage('en')} sx={{
                                color: "white",
                                position: 'relative',
                                right: currentLanguage === 'ar' ? '2px' : '5px',
                                fontWeight: '500',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            }}>
                                {t('English')}
                            </Typography>
                        </Box>
                    </div>
                   
                )}
                <Box className='PhoneAndCreate ' sx={{
                    display: 'flex',
                    flexDirection: currentLanguage === 'ar' ? 'row-reverse' : 'row',
                    position: 'relative',
                    top: isScreenUnder450px ? '-15px' : 'undifined',
                    right: isScreenUnder450px ? '20px' : 'undifined',
                    margin: isScreenUnder450px ? '3px' : 'undifined',
                    justifyContent: isScreenUnder450px ? 'center' : 'normal',
                    alignItems: isScreenUnder450px ? 'center' : 'normal',
                }}>nm
                    <PhoneIcon sx={{ color: 'white', marginRight: '5px' }} />


                    <Typography sx={{
                        color: 'white',
                        fontSize: isScreenUnder450px ? '12px' : '15px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}>{t('Call us at')} +21306-554-120</Typography>

                    <SupervisorAccountIcon sx={{
                        color: 'white',
                        marginLeft: '8px',
                        display: isScreenUnder450px ? 'none' : 'normal',
                    }} />

                    {!isScreenUnder450px && (
                      
                         <button style={{
                             color: 'white',
                             background: 'linear-gradient(180deg, #9C4FFF 0%, #674FFF 100%)',
                             border: 'none',
                             borderRadius: '14px 14px 14px 14px',
                             position: 'relative',
                             top: '-5px',
                             width: '155px',
                             fontSize: '15px',
                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                             fontWeight: '500',
                             height: "30px",
                             marginLeft: '5px',
                             cursor: 'pointer',
                         }}
                        
                         onClick={handleNavigation}
                         >
                        
                             {t('Create an account')}
                         </button>
                      
                    )}
                </Box>
                {isScreenUnder450px && (
                    <Box className='LangMobile border' sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Typography sx={{
                            color: 'white',
                            position: 'relative',
                            right: currentLanguage === 'ar' ? '-10px' : '10px',
                            top: '-20px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }} >{t('Language')}</Typography>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            top: '-23px',
                        }}>
                            <img onClick={() => toggleLanguage('ar')} style={{ width: '43px' }} src="public/images/algeria.png" alt="" />
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            top: '-15px',
                            right: currentLanguage === 'ar' ? '1px' : '10px',
                        }}>
                            <img onClick={() => toggleLanguage('en')} style={{ width: '59px' }} src="public/images/usa.png" alt="" />
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            top: '-20px',
                            right: currentLanguage === 'ar' ? '-10px' : '8px',
                        }}>
                            <img onClick={() => toggleLanguage('fr')} style={{ width: '40px' }} src="public/images/french.png" alt="" />
                        </div>
                        <Button onClick={handleNavigation} >
                        Creataccount
                        </Button>
                    </Box>
                  
                )}



            </div>
            <div className='Line  ' style={{
                height: "0.2px", width: '98%', backgroundColor: '#6d6d6d',
                position: 'absolute',
                top: isScreenUnder450px ? '110px' : '45px',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>

            </div>

            {!isScreenUnder450px && (
                <div className='Nav' style={{ display: 'flex', justifyContent: "space-between", margin: '10px' }}>

                    <div style={{
                        position: 'relative', top: '-25px',
                        left: '20px',
                        right: currentLanguage === 'ar' ? '35px' : 'undifined',
                    }}>
                        <img width={"136px"} src="public/images/free.png" alt="" srcset="" />
                    </div>




                    <div class="header " style={{
                        position: 'relative',
                        top: '-16px',


                    }}>

                        <nav style={{ direction: currentLanguage === 'ar' ? 'rtl' : 'ltr' }} class="navbar">
                            <ul class="navbar__menu">
                                <li class="navbar__item  ">
                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link gradient-text "><i data-feather="home"></i><span> {t('Home')}</span> </a>
                                </li>
                                <li class="navbar__item">
                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link  gradient-text  "><i data-feather="message-square"></i><span>{t('Messages')}</span></a>
                                </li>
                                <li class="navbar__item">
                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link  gradient-text  "><i data-feather="users"></i><span>{t('Customers')}</span></a>
                                </li>
                                <li class="navbar__item">
                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link  gradient-text  "><i data-feather="folder"></i><span>{t('Projects')}</span></a>
                                </li>

                            </ul>
                        </nav>

                    </div>
                    {currentUser ? (

                    <Stack  direction="row" spacing={1}
                        sx={{
                            position :'relative',
                            left : '70px',
                           top : '-32px',
                            alignItems: 'center',
                    }}
                        >
                            <Typography
                            sx={{
                                color : 'white',    
                                fontFamily:  '"Airbnbcereal", sans-serif',
                                position :'relative',
                                left : '15px',
                                

                            }}
                            >
                                {currentUser?.username}
                                </Typography>
                                <button onClick={handleLogout} >Logout</button>
                        <Avatar alt="N" src="/static/images/avatar/1.jpg" />
                        
                        
                      </Stack>
                        ) : (
                    <Box>
                        <Button className='Signin'
                            sx={{
                                color: 'white',
                                margin: '25px',
                                position: 'relative',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                top: '-29px',
                                borderRadius: '22px 22px 22px 22px',
                                textTransform: 'none',
                                fontSize: '18px',
                                width: '140px',
                                fontWeight: '500',
                                background: 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)',
                                '&:hover': {
                                    boxShadow: '0px 4px 15px 0px rgba(148, 79, 255, 0.35)',
                                },
                                '&:disabled': {
                                    opacity: '0.5',
                                    background: 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)',
                                },
                            }}
                            onClick={() => handleButtonClick('login')}
                        >
                            {t('Login')}
                        </Button>
                    </Box>
                     )}
                     
                      
                </div>
            )}

            {isScreenUnder450px && (
                <div style={{ display: 'flex', justifyContent: "space-between", margin: '10px' }}>
                    <div style={{
                        position: 'relative', top: '-25px',
                        left: '20px',
                        right: currentLanguage === 'ar' ? '35px' : 'undifined',
                    }}>
                        <div style={{
                            position: 'relative', top: '4px',
                            left: '-15px',
                            zIndex: '10',
                            right: currentLanguage === 'ar' ? '220px' : 'undifined',
                        }}>
                            <img width={"115px"} src="public/images/free.png" alt="" srcset="" />
                        </div>
                    </div>
                    <div class="header" style={{
                        position: 'relative',
                        top: '-30px',
                        left: '122px',


                    }}>
                        <MenuIcon  onClick={toggleDrawer("top", true)}
                            sx={{
                                fontSize: '30px',
                                cursor: 'pointer',
                                position: 'relative',
                                left: currentLanguage === 'ar'? '200px' :  'undifined',
                                zIndex :'20',

                            }} />
                        <div className='Drawer' >
                            <Drawer

                                anchor={"top"}
                                open={state["top"]}
                                onClose={toggleDrawer("top", false)}

                                PaperProps={{
                                    sx: {
                                        top: '0%',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: '#0d0d0d',


                                    },
                                }}

                            >
                                <div className='line' style={{
                                    height: '1px',
                                    width: '100%',
                                    background: 'linear-gradient(144deg,  #5B42F3 50%, #00DDEB)',
                                }}   >

                                </div>
                                <div className='DrawerContent'
                                    style={{
                                        minHeight: '300px',
                                        width: '100%',
                                        display: 'flex',

                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }} >

                                    <div
                                        style={{
                                            position: 'relative',
                                            left: '170px',
                                            top: '20px',
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },

                                            }}
                                            onClick={toggleDrawer("top", false)} >
                                            <Close sx={{ color: 'white' }} />
                                        </IconButton>
                                    </div>

                                    <div className='ProfileImg' style={{ marginTop: '20px' }} >
                                        <img style={{ width: '70px' }} src="public/images/Profile.png" alt="" srcset="" />
                                    </div>
                                    <div className="Separator" style={{
                                        width: '50%',
                                        borderBottom: '1px solid #6d6d6d',
                                        position: 'relative',
                                        top: '10px',


                                    }}></div>
                                    <div className='SigninBTN ' >
                                        <Button
                                        
                                         className='Signin  '
                                            sx={{
                                                color: 'white',
                                                margin: '25px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                borderRadius: '22px', // Adjust border radius as needed
                                                textTransform: 'none',
                                                fontSize: '18px',
                                                width: '230px',
                                                fontWeight: '600',
                                                position: 'relative', // Set position to relative
                                                overflow: 'hidden', // Hide overflow to contain pseudo-elements
                                                height: '45px',
                                                border: 'none', // Remove default border
                                            }}
                                            
                                        >
                                            {t('Login')}
                                            <span className="border-gradient"></span> {/* Add gradient border */}
                                        </Button>
                                    </div>

                                    <div className='CreateBTN' >
                                        <button style={{
                                            color: 'white',
                                            position: 'relative',
                                            background: 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)',
                                            top: '-12px',
                                            border: '2px solid white',
                                            borderRadius: '22px 22px 22px 22px',
                                            width: '230px',
                                            fontSize: '18px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '600',
                                            height: "49px",

                                            cursor: 'pointer',
                                        }}

                                        >

                                            {t('Create an account')}
                                            <span className="border-gradient"></span> {/* Add gradient border */}
                                        </button>
                                    </div>

                                    <div className="Separator" style={{
                                        width: '90%',
                                        borderBottom: '1px solid #6d6d6d',
                                        position: 'relative',
                                        top: '10px',


                                    }}></div>



                                    <div class="header " style={{
                                        position: 'relative',
                                        top: '25px',
                                        left: '10px',
                                        display: 'block',

                                        width: isScreenUnder450px ? '90%' : '100%',

                                    }}>
                                        <nav style={{ direction: currentLanguage === 'ar' ? 'rtl' : 'ltr' }} class="navbar">
                                            <ul class="navbar__menu">
                                                <li class="navbar__item ">

                                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link gradient-text "><i data-feather="home"></i><span> {t('Home')}</span> </a>
                                                </li>
                                                <li class="navbar__item">
                                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link  gradient-text  "><i data-feather="message-square"></i><span>{t('Projects')}</span></a>
                                                </li>
                                                <li class="navbar__item">
                                                    <a style={{ fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif', }} href="#" class="navbar__link  gradient-text  "><i data-feather="users"></i><span>{t('Support')}</span></a>
                                                </li>


                                            </ul>
                                        </nav>
                                    </div>

                                    <div style={{
                                        position: 'relative',
                                        top: '35px',
                                    }} >
                                        <img style={{ width: '290px' }} src="public/images/freelancer.png" alt="" srcset="" />
                                    </div >


                                    <div className='' >
                                        <Typography sx={{
                                            color: 'white', marginTop: '11px',
                                            fontSize: '20px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: '500',
                                            textAlign: 'center', 
                                            whiteSpace: 'discard-after',
                                        }} >{t('Create An Account To acces our Services!')}</Typography>
                                    </div>



                                </div>



                            </Drawer>

                        </div>



                    </div>
                    <Box>

                    </Box>
                </div>
            )}


            <div className='Adevtising' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: isScreenUnder450px ? '49px' : '40px',
                widows: '100%',
                background: 'linear-gradient(144deg,  #5B42F3 50%, #00DDEB)',
                position: 'relative',
                top: isScreenUnder450px ? '-50px' : '-45px',
                padding: isScreenUnder450px ? '10px' : 'undifined',

            }}>

                <Typography sx={{
                    textAlign: 'center',
                    color: "white",
                    margin: isScreenUnder450px ? '10px' : 'undifined',
                    padding: isScreenUnder450px ? '10px' : 'undifined',
                    fontSize: isScreenUnder450px ? '14px' : '17px',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    fontWeight: 'bold'
                }}>

                    {t('We have build a system for advertising your work to reach more client . Create a Account for accessing our services')}
                </Typography>
                
            </div>
            
        </div>
        
           
        





    )
}

export default NavbarTwo
