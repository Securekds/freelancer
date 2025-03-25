import { Typography } from "@mui/material";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Button from '@mui/material/Button';
import i18n from 'i18next';
import Rating from '@mui/material/Rating';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import React, { useEffect, useState, useRef } from 'react';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Skeleton from '@mui/material/Skeleton';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopyButton from "./CopyButton";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import UpdateIcon from '@mui/icons-material/Update';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import OfferButton from "./OfferButton";
import ReactStars from "react-rating-stars-component";





function Singleproject() {
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



    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const [openup, setOpenup] = React.useState(false);

    const handleClickOpenShare = () => {
        setOpenup(true);
    };

    const handleCloseShare = () => {
        setOpenup(false);

    };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [inputLink, setInputLink] = useState('https://localhost:5173/post/Nabil');
    const textFieldRef = useRef(null);

    const handleCopyClick = async () => {
        if (textFieldRef.current) {
            const linkToCopy = textFieldRef.current.value;

            try {
                await navigator.clipboard.writeText(linkToCopy);
                toast.success('Link copied to clipboard!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000, // Close after 1 second (1000 milliseconds)
                });
            } catch (error) {
                console.error('Error copying: ', error);
                toast.error('Failed to copy link!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000, // Close after 1 second (1000 milliseconds)
                });
            }
        }
    };


    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const generateRandomName = () => {
        // Replace this with your logic to generate a random name
        const names = ["John Doe", "Jane Doe", "Alice", "Bob", "Eve"];
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    };



    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder390px = useMediaQuery('(max-width:390px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1400px)');



    return (

        <>

            {isScreenUnder390px ? (
               <div classNama='SinglePost'
               style={{
                   position : 'relative',
                   right : currentLanguage === 'ar'? '13.5px' : '290px',
               }}
                >

                   <div className='Project'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: '93%',
                           height: '60px',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           position: 'relative',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card">
                               <Typography 
                               sx={{ color: 'white',
                                fontSize: '18px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                 }} >
                                   {t('Project Card')}
                               </Typography>
                           </div>

                       </div>
                       <CopyButton />
                   </div>
                   <div className='meteors-demo-container'
                       style={{
                           height: 'auto',
                           width: '93%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           padding: '20px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden', // Ensure child elements don't overflow the container
                       }}
                   >
                       <section className="meteors-demo-section">
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
                           <div className='ALLSTAFF'>
                               <img
                                   src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                   alt="Background SVG"
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                       opacity: 0.1,
                                       zIndex: 0,
                                   }} />

                               <div
                                   style={{
                                       width: '100px',
                                       height: '100px',
                                       backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                       borderRadius: '50%',
                                       position: 'absolute',
                                       top: '12%',
                                       border: '2px solid white',
                                       left: '50%',
                                       transform: 'translate(-50%, -50%)',
                                       overflow: 'hidden',
                                       zIndex: 1,
                                   }}
                               >
                                   <img
                                       src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
                                       alt="JavaScript Logo"
                                       style={{
                                           width: '100px',
                                           height: '100px',
                                           objectFit: 'cover',
                                       }} />
                               </div>

                               <div className="Name"
                                   style={{
                                       position: 'absolute',
                                       top: '20%',
                                       left: currentLanguage === 'ar'? '35%' : '44%',
                                       display: 'flex',
                                       zIndex: 1, // Ensures this element is above the background
                                   }}
                               >
                                   <PersonPinCircleIcon sx={{ color: 'white', fontSize: '20px' }} />
                                   <Typography sx={{ color: 'white',
                                   fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                    }}>
                                       {t('Nabil Hamici')}
                                   </Typography>
                               </div>

                               <div className="TitelDesc"
                                   style={{
                                       display: 'flex',
                                       justifyContent: 'center',
                                       marginTop: '200px',
                                       alignItems: 'center',
                                       flexDirection: 'column',
                                       zIndex: 1, // Ensures this element is above the background
                                   }}
                               >
                                   <Typography
                                       sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                           WebkitBackgroundClip: 'text',
                                           backgroundClip: 'text',
                                           color: 'transparent',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}
                                   >
                                      {t('[ Programming online store with React ]')}
                                   </Typography>
                                   <Typography
                                       sx={{
                                           color: 'white',
                                           marginTop: '15px',
                                           width: '96%',
                                           textAlign: 'center',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}
                                   >
                                       {t('Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.')}
                                   </Typography>
                               </div>

                               <div className="Status "
                                   style={{
                                       marginTop: '40px',
                                       display: 'flex',
                                       justifyContent: 'space-between',
                                       marginLeft: '57px',
                                       flexDirection: 'column',
                                       width: '110%',
                                       position: 'relative',
                                       right: currentLanguage === 'ar'? '-15px' : '50px',
                                       zIndex: 1,
                                       padding: '15px',

                                       borderRadius: '16px',
                                   }}
                               >


                                   <div className="Project"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <AccountTreeIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-40px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Project Status')}
                                       </Typography>
                                       <Typography sx={{
                                           color: 'white',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                       }}>
                                           {t('Open')}
                                       </Typography>

                                   </div>
                                   <div className="Post"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <UpdateIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-32px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Post date')}
                                       </Typography>
                                       <Typography sx={{ color: 'white', 
                                       fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                           {t('1 hour ago')}
                                       </Typography>

                                   </div>
                                   <div className="Budjet"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <AttachMoneyIcon sx={{
                                           color: 'white',

                                       }} />

                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-45px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Budget')}
                                       </Typography>
                                       <Typography sx={{ color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                           50$ - 100$
                                       </Typography>

                                   </div>
                                   <div className="Offers"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                           marginBottom: '15px',
                                       }}
                                   >
                                       <SellIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-75px' : '360px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Offers')}
                                       </Typography>
                                       <Typography sx={{ color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                        }}>
                                           {t('50')}
                                       </Typography>

                                   </div>
                               </div>
                           </div>

                       </section>
                   </div>
                   <div  >
                       <div class="astrodivider ">
                           <div class="astrodividermask"
                           style={{
                               position : 'relative',
                               right : currentLanguage === 'ar'? '385px' : 'undefined',
                           }}
                           >

                           </div>
                           <span className='border' ><i>&#9733;</i></span>
                       </div>
                   </div>

                   <div className='Skills'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '93%' : '75%',
                           height: '60px',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           position: 'relative',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card">
                               <Typography sx={{ color: 'white', fontSize: '18px', 
                               fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                               }} >
                                   {t('Required Skills')}
                               </Typography>
                           </div>
                       </div>
                       <div className="button">
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
                                   {t('Add an offer')}
                               </Typography>
                           </Button>
                       </div>


                   </div>

                   <div className='meteors-demo-container'
                       style={{
                        width: currentLanguage === 'ar'? '93%' : '75%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden',
                           display: 'flex',
                           height: 'auto',
                           flexDirection: 'column', // Ensure the container grows vertically
                           alignItems: 'flex-start', // Start align to stack buttons from the top
                           padding: '20px', // Add padding to the container
                           flexWrap: 'wrap', // Allow buttons to wrap
                       }}
                   >

                       <section className="meteors-demo-section">
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

                           <div className='ALLSTAFF'>
                               <img
                                   src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                   alt="Background SVG"
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                       opacity: 0.1,
                                       zIndex: 0,
                                   }}
                               />

                               {/* Replace with your dynamic tags/buttons */}
                               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                               </div>
                           </div>
                       </section>
                   </div>
                   <div >
                       <div class="astrodivider ">
                           <div class="astrodividermask"
                              style={{
                               position : 'relative',
                               right : currentLanguage === 'ar'? '390px' : 'undefined',
                           }}
                           >

                           </div>
                           <span className='border' ><i>&#9733;</i></span>
                       </div>
                   </div>
                   <div className='Offers'
                       style={{
                           display: 'flex',
                           justifyContent: currentLanguage === 'ar' ? 'space-between' : 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '93%' : '75%',
                           height: '60px',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                          
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           position: 'relative',
                           
                           top: '101px',
                       }}
                   >
                       
                            <div className="Card" >
                               <Typography sx={{ color: 'white', fontSize: '18px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textWrap : 'nowrap',
                                }} >
                                   {t('Offers Made')}
                               </Typography>
                           </div>
                       
                      <div className='Offers'
                      style={{
                        display : 'flex',
                     
                      }}
                      >
                             <OfferButton />
                        
                         <div className="button ">
                        
                             <Button
                                 id="fade-button"
                                 aria-controls={open ? 'fade-menu' : undefined}
                                 aria-haspopup="true"
                                 aria-expanded={open ? 'true' : undefined}
                                 onClick={handleClick1}
                                
                        
                             >
                                 <SettingsSuggestIcon sx={{ color: 'white',
                                 
                                 
                                   }} />
                             </Button>
                             <Menu
                                 id="fade-menu1"
                                 MenuListProps={{
                                     'aria-labelledby': 'fade-button1',
                                 }}
                                 anchorEl={anchorEl1}
                                 open={open1}
                                 onClose={handleClose1}
                                 TransitionComponent={Fade}
                             >
                                 <MenuItem onClick={handleClose1}> <ArrowUpwardIcon sx={{ marginRight: '5px' }} /> Newest</MenuItem>
                                 <MenuItem onClick={handleClose1}> <ArrowDownwardIcon sx={{ marginRight: '5px' }} /> Oldest</MenuItem>
                        
                             </Menu>
                         </div>
                      </div>
                   </div>
                   <div className='meteors-demo-container'
                       style={{
                           height: '200px',
                           width: currentLanguage === 'ar'? '93%' : '75%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden', // Ensure child elements don't overflow the container
                       }}
                   >
                       {loading ? (
                           <Skeleton variant="circular" width="100%" height={200} />
                       ) : (
                           <section className="meteors-demo-section">
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

                               <div className='ALLSTAFF'>
                                   <img
                                       src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                       alt="Background SVG"
                                       style={{
                                           position: 'absolute',
                                           top: 0,
                                           left: 0,
                                           width: '100%',
                                           height: '100%',
                                           objectFit: 'cover',
                                           opacity: 0.1,
                                           zIndex: 0,
                                       }} />
                               </div>
                               <div className='ProjectContainer '>
                                   <div>
                                      <div
                                      style={{
                                        position :'relative',
                                        top : currentLanguage === 'ar'? '10px' : 'undefinied',
                                        right : currentLanguage === 'ar'? '10px' : 'undefined',
                                      }}
                                      >
                                         <div style={{ display: 'flex', alignItems: 'center', padding: '0px' }}>
                                             <div className='ProfileCircle' style={{
                                                 position: 'relative',
                                                 width: '60px',
                                                 height: '60px',
                                                 borderRadius: '50%',
                                                 overflow: 'hidden',
                                                 border: '2px solid #ccc',
                                             }}>
                                                 <img src="https://res.cloudinary.com/damicjacf/image/upload/v1714236294/algeria_v1a5kp.png" alt="Profile"
                                                     style={{
                                                         width: '100%',
                                                         height: '100%',
                                                         objectFit: 'cover',
                                                         textAlign: 'center',
                                                     }}
                                                 />
                                             </div>
                                        
                                             <div className="ActiveBadge" style={{
                                                 position: 'absolute',
                                                 top: currentLanguage === 'ar'? '44px' : '55px',
                                                 left: currentLanguage === 'ar' ? '278px' : '55px',
                                                 width: '12px',
                                                 height: '12px',
                                                 borderRadius: '50%',
                                                 backgroundColor: 'green',
                                                 border: '2px solid white',
                                             }}></div>
                                        
                                             <div style={{ marginLeft: '10px', flex: '1',
                                             position : 'relative',
                                             right : currentLanguage === 'ar'? '10px':  'undefined',
                                        
                                        
                                              }}>
                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                                     <Typography sx={{
                                                         color: 'white',
                                                         fontSize : '13px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     }}>
                                                         {t('Nabil Hamici')}
                                                     </Typography>
                                        
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '5px',
                                                         fontSize: '13px',
                                                         position : 'relative',
                                                         right : currentLanguage === 'ar'? '8px' : 'undefinied',
                                                         top : currentLanguage === 'ar'? '3px' : 'undefined',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     }}>
                                                         {t('(Khadamat Partner)')}
                                                     </Typography>
                                        
                                                     <Rating name="read-only" value={5} readOnly sx={{ marginLeft: '10px', color: 'white' }} />
                                                 </div>
                                        
                                                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                     <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' , marginLeft : '5px' }} />
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '3px',
                                                         fontSize: '13px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                         whiteSpace: 'nowrap',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                     }}>
                                                         {t('13 minutes ago')}
                                                     </Typography>
                                        
                                                     <div className="Line" style={{
                                                         width: '1.4px',
                                                         height: '15px',
                                                         background: 'white',
                                                         marginLeft: '10px',
                                                        position : 'relative',
                                                        right : currentLanguage === 'ar'? '5px' : 'undefined',
                                                     }}></div>
                                        
                                                     <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '3px',
                                                         fontSize: '13px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                         whiteSpace: 'nowrap',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                         marginRight: currentLanguage === 'ar'? '-5px' : '10px',
                                                     }}>
                                                         {t('React Developer')}
                                                     </Typography>
                                                 </div>
                                             </div>
                                             <Button
                                                 id="fade-button"
                                                 aria-controls={open ? 'fade-menu' : undefined}
                                                 aria-haspopup="true"
                                                 aria-expanded={open ? 'true' : undefined}
                                                 onClick={handleClick2}
                                        
                                             >
                                                 <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                                             </Button>
                                      </div>
                                           <Menu
                                               id="fade-menu2"
                                               MenuListProps={{
                                                   'aria-labelledby': 'fade-button',
                                               }}
                                               anchorEl={anchorEl2}
                                               open={open2}
                                               onClose={handleClose2}
                                               TransitionComponent={Fade}
                                           >
                                               <MenuItem onClick={handleClose2}><ReportProblemIcon sx={{ marginRight: '5px' }} />  Report</MenuItem>


                                           </Menu>
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
                                                           ? '320px'
                                                           : 'undefined',
                                                   position: 'relative',
                                                   top: isScreenUnder450px ? '20px' : 'undefined',
                                               }}
                                           >
                                               <Typography
                                                   sx={{
                                                       color: '#64748B',
                                                       fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                       fontWeight: 'bold',
                                                       fontSize : '13px',
                                                       display: isScreenUnder450px ? '-webkit-box' : 'undefined',
                                                       WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undefined',
                                                       WebkitLineClamp: isScreenUnder450px ? '3' : 'undefined',
                                                       overflow: isScreenUnder450px ? 'hidden' : 'undefined',
                                                   }}
                                               >
                                                   {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                               </Typography>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </section>
                       )}
                   </div>
                   <div className="Stars"
                       style={{
                           position: 'relative',
                           left: currentLanguage === 'ar'? '-260px' : '610px',
                           top: '-190px',
                           fontSize : '5px',
                           display : 'none',
                       }}
                   >
                       <ReactStars
                           count={5}
                           value={5}
                           edit={false}
                           size={3}
                           activeColor="#ffd700"
                       />,

                   </div>

               </div>
        
            ) : isScreenUnder450px ? (
                <div classNama='SinglePost'
               style={{
                   position : 'relative',
                   right : currentLanguage === 'ar'? '13.5px' : 'undefined',
               }}
                >

                   <div className='Project'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: '93%',
                           height: '60px',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           position: 'relative',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card">
                               <Typography 
                               sx={{ color: 'white',
                                fontSize: '20px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                 }} >
                                   {t('Project Card')}
                               </Typography>
                           </div>

                       </div>
                       <CopyButton />
                   </div>
                   <div className='meteors-demo-container'
                       style={{
                           height: 'auto',
                           width: '93%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           padding: '20px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden', // Ensure child elements don't overflow the container
                       }}
                   >
                       <section className="meteors-demo-section">
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
                           <div className='ALLSTAFF'>
                               <img
                                   src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                   alt="Background SVG"
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                       opacity: 0.1,
                                       zIndex: 0,
                                   }} />

                               <div
                                   style={{
                                       width: '100px',
                                       height: '100px',
                                       backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                       borderRadius: '50%',
                                       position: 'absolute',
                                       top: '12%',
                                       border: '2px solid white',
                                       left: '50%',
                                       transform: 'translate(-50%, -50%)',
                                       overflow: 'hidden',
                                       zIndex: 1,
                                   }}
                               >
                                   <img
                                       src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
                                       alt="JavaScript Logo"
                                       style={{
                                           width: '100px',
                                           height: '100px',
                                           objectFit: 'cover',
                                       }} />
                               </div>

                               <div className="Name"
                                   style={{
                                       position: 'absolute',
                                       top: currentLanguage === 'ar'? '21%' : '20%',
                                       left: currentLanguage === 'ar'? '37%' : '44%',
                                       display: 'flex',
                                       zIndex: 1, // Ensures this element is above the background
                                   }}
                               >
                                   <PersonPinCircleIcon sx={{ color: 'white', fontSize: '20px' }} />
                                   <Typography sx={{ color: 'white',
                                   fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                    }}>
                                       {t('Nabil Hamici')}
                                   </Typography>
                               </div>

                               <div className="TitelDesc"
                                   style={{
                                       display: 'flex',
                                       justifyContent: 'center',
                                       marginTop: '200px',
                                       alignItems: 'center',
                                       flexDirection: 'column',
                                       zIndex: 1, // Ensures this element is above the background
                                   }}
                               >
                                   <Typography
                                       sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                           WebkitBackgroundClip: 'text',
                                           backgroundClip: 'text',
                                           color: 'transparent',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}
                                   >
                                      {t('[ Programming online store with React ]')}
                                   </Typography>
                                   <Typography
                                       sx={{
                                           color: 'white',
                                           marginTop: '15px',
                                           width: currentLanguage === 'ar'? '100%' : '96%',
                                           textAlign: 'center',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}
                                   >
                                       {t('Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.')}
                                   </Typography>
                               </div>

                               <div className="Status "
                                   style={{
                                       marginTop: '40px',
                                       display: 'flex',
                                       justifyContent: 'space-between',
                                       marginLeft: '57px',
                                       flexDirection: 'column',
                                       width: '110%',
                                       position: 'relative',
                                       right: currentLanguage === 'ar'? '-18px' : '50px',
                                       zIndex: 1,
                                       padding: '15px',

                                       borderRadius: '16px',
                                   }}
                               >


                                   <div className="Project"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <AccountTreeIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-70px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Project Status')}
                                       </Typography>
                                       <Typography sx={{
                                           color: 'white',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                       }}>
                                           {t('Open')}
                                       </Typography>

                                   </div>
                                   <div className="Post"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <UpdateIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-64px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Post date')}
                                       </Typography>
                                       <Typography sx={{ color: 'white', 
                                       fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                           {t('1 hour ago')}
                                       </Typography>

                                   </div>
                                   <div className="Budjet"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <AttachMoneyIcon sx={{
                                           color: 'white',

                                       }} />

                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-77px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Budget')}
                                       </Typography>
                                       <Typography sx={{ color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                           50$ - 100$
                                       </Typography>

                                   </div>
                                   <div className="Offers"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                           marginBottom: '15px',
                                       }}
                                   >
                                       <SellIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-110px' : '360px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Offers')}
                                       </Typography>
                                       <Typography sx={{ color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                        }}>
                                           {t('50')}
                                       </Typography>

                                   </div>
                               </div>
                           </div>

                       </section>
                   </div>
                   <div  >
                       <div class="astrodivider ">
                           <div class="astrodividermask"
                           style={{
                               position : 'relative',
                               right : currentLanguage === 'ar'? '385px' : 'undefined',
                           }}
                           >

                           </div>
                           <span className='border' ><i>&#9733;</i></span>
                       </div>
                   </div>

                   <div className='Skills'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '93%' : '75%',
                           height: '60px',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           position: 'relative',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card">
                               <Typography sx={{ color: 'white', fontSize: '20px', 
                               fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                               }} >
                                   {t('Required Skills')}
                               </Typography>
                           </div>
                       </div>
                       <div className="button">
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
                                   {t('Add an offer')}
                               </Typography>
                           </Button>
                       </div>


                   </div>

                   <div className='meteors-demo-container'
                       style={{
                        width: currentLanguage === 'ar'? '93%' : '75%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden',
                           display: 'flex',
                           height: 'auto',
                           flexDirection: 'column', // Ensure the container grows vertically
                           alignItems: 'flex-start', // Start align to stack buttons from the top
                           padding: '20px', // Add padding to the container
                           flexWrap: 'wrap', // Allow buttons to wrap
                       }}
                   >

                       <section className="meteors-demo-section">
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

                           <div className='ALLSTAFF'>
                               <img
                                   src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                   alt="Background SVG"
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                       opacity: 0.1,
                                       zIndex: 0,
                                   }}
                               />

                               {/* Replace with your dynamic tags/buttons */}
                               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                               </div>
                           </div>
                       </section>
                   </div>
                   <div >
                       <div class="astrodivider ">
                           <div class="astrodividermask"
                              style={{
                               position : 'relative',
                               right : currentLanguage === 'ar'? '390px' : 'undefined',
                           }}
                           >

                           </div>
                           <span className='border' ><i>&#9733;</i></span>
                       </div>
                   </div>
                   <div className='Offers'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '93%' : '75%',
                           height: '60px',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           position: 'relative',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card"
                               style={{
                                   width: '750px'
                               }}
                           >
                               <Typography sx={{ color: 'white', fontSize: '20px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }} >
                                   {t('Offers Made')}
                               </Typography>
                           </div>
                       </div>
                       <div
                       style={{
                        position : 'relative',
                        right :currentLanguage === 'ar' ? '-510px' : 'undifined',
                       }}
                       >
                           <OfferButton />
                       </div>

                       <div className="button ">

                           <Button
                               id="fade-button"
                               aria-controls={open ? 'fade-menu' : undefined}
                               aria-haspopup="true"
                               aria-expanded={open ? 'true' : undefined}
                               onClick={handleClick1}
                              

                           >
                               <SettingsSuggestIcon sx={{ color: 'white',
                                marginLeft: '-15px',
                                position : 'relative',
                                right : currentLanguage === 'ar'? '-520px' : 'undefinied',
                                 }} />
                           </Button>
                           <Menu
                               id="fade-menu1"
                               MenuListProps={{
                                   'aria-labelledby': 'fade-button1',
                               }}
                               anchorEl={anchorEl1}
                               open={open1}
                               onClose={handleClose1}
                               TransitionComponent={Fade}
                           >
                               <MenuItem onClick={handleClose1}> <ArrowUpwardIcon sx={{ marginRight: '5px' }} /> Newest</MenuItem>
                               <MenuItem onClick={handleClose1}> <ArrowDownwardIcon sx={{ marginRight: '5px' }} /> Oldest</MenuItem>

                           </Menu>
                       </div>
                   </div>
                   <div className='meteors-demo-container'  
                       style={{
                           height: '200px',
                           width: currentLanguage === 'ar'? '93%' : '75%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden', // Ensure child elements don't overflow the container
                       }}
                   >
                       {loading ? (
                           <Skeleton variant="circular" width="100%" height={200} />
                       ) : (
                           <section className="meteors-demo-section">
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

                               <div className='ALLSTAFF'>
                                   <img
                                       src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                       alt="Background SVG"
                                       style={{
                                           position: 'absolute',
                                           top: 0,
                                           left: 0,
                                           width: '100%',
                                           height: '100%',
                                           objectFit: 'cover',
                                           opacity: 0.1,
                                           zIndex: 0,
                                       }} />
                               </div>
                               <div className='ProjectContainer '>
                                   <div>
                                      <div
                                      style={{
                                        position :'relative',
                                        top : currentLanguage === 'ar'? '10px' : 'undefinied',
                                        right : currentLanguage === 'ar'? '10px' : 'undefined',
                                      }}
                                      >
                                         <div style={{ display: 'flex', alignItems: 'center', padding: '0px' }}>
                                             <div className='ProfileCircle' style={{
                                                 position: 'relative',
                                                 width: '60px',
                                                 height: '60px',
                                                 borderRadius: '50%',
                                                 overflow: 'hidden',
                                                 border: '2px solid #ccc',
                                             }}>
                                                 <img src="https://res.cloudinary.com/damicjacf/image/upload/v1714236294/algeria_v1a5kp.png" alt="Profile"
                                                     style={{
                                                         width: '100%',
                                                         height: '100%',
                                                         objectFit: 'cover',
                                                         textAlign: 'center',
                                                     }}
                                                 />
                                             </div>
                                        
                                             <div className="ActiveBadge" style={{
                                                 position: 'absolute',
                                                 top: currentLanguage === 'ar'? '44px' : '55px',
                                                 left: currentLanguage === 'ar' ? '340px' : '55px',
                                                 width: '12px',
                                                 height: '12px',
                                                 borderRadius: '50%',
                                                 backgroundColor: 'green',
                                                 border: '2px solid white',
                                             }}></div>
                                        
                                             <div style={{ marginLeft: '10px', flex: '1',
                                             position : 'relative',
                                             right : currentLanguage === 'ar'? '10px':  'undefined',
                                        
                                        
                                              }}>
                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                                     <Typography sx={{
                                                         color: 'white',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     }}>
                                                         {t('Nabil Hamici')}
                                                     </Typography>
                                        
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '5px',
                                                         fontSize: '14px',
                                                         position : 'relative',
                                                         right : currentLanguage === 'ar'? '8px' : 'undefinied',
                                                         top : currentLanguage === 'ar'? '3px' : 'undefined',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     }}>
                                                         {t('(Khadamat Partner)')}
                                                     </Typography>
                                        
                                                     <Rating name="read-only" value={5} readOnly sx={{ marginLeft: '10px', color: 'white' }} />
                                                 </div>
                                        
                                                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                     <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '3px',
                                                         fontSize: '14px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                         whiteSpace: 'nowrap',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                     }}>
                                                         {t('13 minutes ago')}
                                                     </Typography>
                                        
                                                     <div className="Line" style={{
                                                         width: '1.4px',
                                                         height: '15px',
                                                         background: 'white',
                                                         marginLeft: '10px',
                                                        position : 'relative',
                                                        right : currentLanguage === 'ar'? '5px' : 'undefined',
                                                     }}></div>
                                        
                                                     <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '3px',
                                                         fontSize: '14px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                         whiteSpace: 'nowrap',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                         marginRight: currentLanguage === 'ar'? '-5px' : '10px',
                                                     }}>
                                                         {t('React Developer')}
                                                     </Typography>
                                                 </div>
                                             </div>
                                             <Button
                                                 id="fade-button"
                                                 aria-controls={open ? 'fade-menu' : undefined}
                                                 aria-haspopup="true"
                                                 aria-expanded={open ? 'true' : undefined}
                                                 onClick={handleClick2}
                                        
                                             >
                                                 <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                                             </Button>
                                      </div>
                                           <Menu
                                               id="fade-menu2"
                                               MenuListProps={{
                                                   'aria-labelledby': 'fade-button',
                                               }}
                                               anchorEl={anchorEl2}
                                               open={open2}
                                               onClose={handleClose2}
                                               TransitionComponent={Fade}
                                           >
                                               <MenuItem onClick={handleClose2}><ReportProblemIcon sx={{ marginRight: '5px' }} />  Report</MenuItem>


                                           </Menu>
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
                                                           ? '365px'
                                                           : 'undefined',
                                                   position: 'relative',
                                                   top: isScreenUnder450px ? '20px' : 'undefined',
                                               }}
                                           >
                                               <Typography
                                                   sx={{
                                                       color: '#64748B',
                                                       fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                       fontWeight: 'bold',
                                                       display: isScreenUnder450px ? '-webkit-box' : 'undefined',
                                                       WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undefined',
                                                       WebkitLineClamp: isScreenUnder450px ? '3' : 'undefined',
                                                       overflow: isScreenUnder450px ? 'hidden' : 'undefined',
                                                   }}
                                               >
                                                   {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                               </Typography>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </section>
                       )}
                   </div>
                   <div className="Stars"
                       style={{
                           position: 'relative',
                           left: '610px',
                           top: '-190px'
                       }}
                   >
                       <ReactStars
                           count={5}
                           value={5}
                           edit={false}
                           size={22}
                           activeColor="#ffd700"
                       />,

                   </div>

               </div>
        
            ) : isScreenUnder768px ? (
                <div classNama='SinglePost'
               style={{
                   position : 'relative',
                   right : currentLanguage === 'ar'? '13.5px' : 'undefined',
               }}
                >

                   <div className='Project'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '97%' : '93%',
                           height: '60px',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           position: 'relative',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card">
                               <Typography 
                               sx={{ color: 'white',
                                fontSize: '20px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                 }} >
                                   {t('Project Card')}
                               </Typography>
                           </div>

                       </div>
                       <CopyButton />
                   </div>
                   <div className='meteors-demo-container'
                       style={{
                           height: 'auto',
                           width: currentLanguage === 'ar'? '97%' : '93%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           padding: '20px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden', // Ensure child elements don't overflow the container
                       }}
                   >
                       <section className="meteors-demo-section">
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
                           <div className='ALLSTAFF'>
                               <img
                                   src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                   alt="Background SVG"
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                       opacity: 0.1,
                                       zIndex: 0,
                                   }} />

                               <div
                                   style={{
                                       width: '100px',
                                       height: '100px',
                                       backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                       borderRadius: '50%',
                                       position: 'absolute',
                                       top: '12%',
                                       border: '2px solid white',
                                       left: '50%',
                                       transform: 'translate(-50%, -50%)',
                                       overflow: 'hidden',
                                       zIndex: 1,
                                   }}
                               >
                                   <img
                                       src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
                                       alt="JavaScript Logo"
                                       style={{
                                           width: '100px',
                                           height: '100px',
                                           objectFit: 'cover',
                                       }} />
                               </div>

                               <div className="Name"
                                   style={{
                                       position: 'absolute',
                                       top: currentLanguage === 'ar'? '22%' : '20%',
                                       left: currentLanguage === 'ar'? '43%' : '44%',
                                       display: 'flex',
                                       zIndex: 1, // Ensures this element is above the background
                                   }}
                               >
                                   <PersonPinCircleIcon sx={{ color: 'white', fontSize: '20px' }} />
                                   <Typography sx={{ color: 'white',
                                   fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                    }}>
                                       {t('Nabil Hamici')}
                                   </Typography>
                               </div>

                               <div className="TitelDesc"
                                   style={{
                                       display: 'flex',
                                       justifyContent: 'center',
                                       marginTop: '200px',
                                       alignItems: 'center',
                                       flexDirection: 'column',
                                       zIndex: 1, // Ensures this element is above the background
                                   }}
                               >
                                   <Typography
                                       sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                           WebkitBackgroundClip: 'text',
                                           backgroundClip: 'text',
                                           color: 'transparent',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}
                                   >
                                      {t('[ Programming online store with React ]')}
                                   </Typography>
                                   <Typography
                                       sx={{
                                           color: 'white',
                                           marginTop: '15px',
                                           width: '96%',
                                           textAlign: 'center',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}
                                   >
                                       {t('Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.')}
                                   </Typography>
                               </div>

                               <div className="Status "
                                   style={{
                                       marginTop: '40px',
                                       display: 'flex',
                                       justifyContent: 'space-between',
                                       marginLeft: '57px',
                                       flexDirection: 'column',
                                       width: currentLanguage === 'ar'? '107%' : '110%',
                                       position: 'relative',
                                       right: currentLanguage === 'ar'? '-27px' : '50px',
                                       zIndex: 1,
                                       padding: '15px',

                                       borderRadius: '16px',
                                   }}
                               >


                                   <div className="Project"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <AccountTreeIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-250px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Project Status')}
                                       </Typography>
                                       <Typography sx={{
                                           color: 'white',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                       }}>
                                           {t('Open')}
                                       </Typography>

                                   </div>
                                   <div className="Post"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <UpdateIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-244px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Post date')}
                                       </Typography>
                                       <Typography sx={{ color: 'white', 
                                       fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                           {t('1 hour ago')}
                                       </Typography>

                                   </div>
                                   <div className="Budjet"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           marginBottom: '15px',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                       }}
                                   >
                                       <AttachMoneyIcon sx={{
                                           color: 'white',

                                       }} />

                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-256px' : '330px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Budget')}
                                       </Typography>
                                       <Typography sx={{ color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                           50$ - 100$
                                       </Typography>

                                   </div>
                                   <div className="Offers"
                                       style={{
                                           display: 'flex',
                                           flexDirection: 'row',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           alignItems: 'center',
                                           border: '1px solid white',
                                           padding: '10px',
                                           borderRadius: '10px',
                                           marginBottom: '15px',
                                       }}
                                   >
                                       <SellIcon sx={{ color: 'white' }} />
                                       <Typography sx={{
                                           color: 'white',
                                           fontWeight: 'bold',
                                           position: 'relative',
                                           right: currentLanguage === 'ar'? '-285px' : '360px',
                                           fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                       }}>
                                           {t('Offers')}
                                       </Typography>
                                       <Typography sx={{ color: 'white',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                        }}>
                                           {t('50')}
                                       </Typography>

                                   </div>
                               </div>
                           </div>

                       </section>
                   </div>
                   <div  >
                       <div class="astrodivider ">
                           <div class="astrodividermask"
                           style={{
                               position : 'relative',
                               right : currentLanguage === 'ar'? '420px' : 'undefined',
                           }}
                           >

                           </div>
                           <span className='border' ><i>&#9733;</i></span>
                       </div>
                   </div>

                   <div className='Skills'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '97%' : '75%',
                           height: '60px',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           position: 'relative',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card">
                               <Typography sx={{ color: 'white', fontSize: '20px', 
                               fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                               }} >
                                   {t('Required Skills')}
                               </Typography>
                           </div>
                       </div>
                       <div className="button">
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
                                   {t('Add an offer')}
                               </Typography>
                           </Button>
                       </div>


                   </div>

                   <div className='meteors-demo-container'
                       style={{
                        width: currentLanguage === 'ar'? '97%' : '75%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden',
                           display: 'flex',
                           height: 'auto',
                           flexDirection: 'column', // Ensure the container grows vertically
                           alignItems: 'flex-start', // Start align to stack buttons from the top
                           padding: '20px', // Add padding to the container
                           flexWrap: 'wrap', // Allow buttons to wrap
                       }}
                   >

                       <section className="meteors-demo-section">
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

                           <div className='ALLSTAFF'>
                               <img
                                   src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                   alt="Background SVG"
                                   style={{
                                       position: 'absolute',
                                       top: 0,
                                       left: 0,
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                       opacity: 0.1,
                                       zIndex: 0,
                                   }}
                               />

                               {/* Replace with your dynamic tags/buttons */}
                               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                                   <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                       Small
                                   </Button>
                               </div>
                           </div>
                       </section>
                   </div>
                   <div >
                       <div class="astrodivider ">
                           <div class="astrodividermask"
                              style={{
                               position : 'relative',
                               right : currentLanguage === 'ar'? '420px' : 'undefined',
                           }}
                           >

                           </div>
                           <span className='border' ><i>&#9733;</i></span>
                       </div>
                   </div>
                   <div className='Offers'
                       style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: currentLanguage === 'ar'? '97%' : '75%',
                           height: '60px',
                           padding: '10px',
                           background: 'rgba(0, 0, 0, 0.2)',
                           marginLeft: '300px',
                           border: '1px solid rgba(255, 255, 255, 0.2)',
                           position: 'relative',
                           top: '101px',
                       }}
                   >
                       <div>
                           <div className="Card"
                               style={{
                                   width: '750px'
                               }}
                           >
                               <Typography sx={{ color: 'white', fontSize: '20px',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }} >
                                   {t('Offers Made')}
                               </Typography>
                           </div>
                       </div>
                       <div
                       style={{
                        position : 'relative',
                        right :currentLanguage === 'ar' ? '-530px' : 'undifined',
                       }}
                       >
                           <OfferButton />
                       </div>

                       <div className="button">

                           <Button
                               id="fade-button"
                               aria-controls={open ? 'fade-menu' : undefined}
                               aria-haspopup="true"
                               aria-expanded={open ? 'true' : undefined}
                               onClick={handleClick1}

                           >
                               <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                           </Button>
                           <Menu
                               id="fade-menu1"
                               MenuListProps={{
                                   'aria-labelledby': 'fade-button1',
                               }}
                               anchorEl={anchorEl1}
                               open={open1}
                               onClose={handleClose1}
                               TransitionComponent={Fade}
                           >
                               <MenuItem onClick={handleClose1}> <ArrowUpwardIcon sx={{ marginRight: '5px' }} /> Newest</MenuItem>
                               <MenuItem onClick={handleClose1}> <ArrowDownwardIcon sx={{ marginRight: '5px' }} /> Oldest</MenuItem>

                           </Menu>
                       </div>
                   </div>
                   <div className='meteors-demo-container'
                       style={{
                           height: '200px',
                           width: currentLanguage === 'ar'? '97%' : '75%',
                           background: 'white',
                           marginLeft: '300px',
                           marginTop: '100px',
                           backgroundColor: 'rgba(0, 0, 0, 0.2)',
                           border: '1px solid rgba(255, 255, 255, 0.18)',
                           position: 'relative',
                           overflow: 'hidden', // Ensure child elements don't overflow the container
                       }}
                   >
                       {loading ? (
                           <Skeleton variant="circular" width="100%" height={200} />
                       ) : (
                           <section className="meteors-demo-section">
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

                               <div className='ALLSTAFF'>
                                   <img
                                       src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                       alt="Background SVG"
                                       style={{
                                           position: 'absolute',
                                           top: 0,
                                           left: 0,
                                           width: '100%',
                                           height: '100%',
                                           objectFit: 'cover',
                                           opacity: 0.1,
                                           zIndex: 0,
                                       }} />
                               </div>
                               <div className='ProjectContainer '>
                                   <div>
                                      <div
                                      style={{
                                        position :'relative',
                                        top : currentLanguage === 'ar'? '10px' : 'undefinied',
                                        right : currentLanguage === 'ar'? '10px' : 'undefined',
                                      }}
                                      >
                                         <div style={{ display: 'flex', alignItems: 'center', padding: '0px' }}>
                                             <div className='ProfileCircle' style={{
                                                 position: 'relative',
                                                 width: '60px',
                                                 height: '60px',
                                                 borderRadius: '50%',
                                                 overflow: 'hidden',
                                                 border: '2px solid #ccc',
                                             }}>
                                                 <img src="https://res.cloudinary.com/damicjacf/image/upload/v1714236294/algeria_v1a5kp.png" alt="Profile"
                                                     style={{
                                                         width: '100%',
                                                         height: '100%',
                                                         objectFit: 'cover',
                                                         textAlign: 'center',
                                                     }}
                                                 />
                                             </div>
                                        
                                             <div className="ActiveBadge" style={{
                                                 position: 'absolute',
                                                 top: currentLanguage === 'ar'? '44px' : '55px',
                                                 left: currentLanguage === 'ar' ? '685px' : '55px',
                                                 width: '12px',
                                                 height: '12px',
                                                 borderRadius: '50%',
                                                 backgroundColor: 'green',
                                                 border: '2px solid white',
                                             }}></div>
                                        
                                             <div style={{ marginLeft: '10px', flex: '1',
                                             position : 'relative',
                                             right : currentLanguage === 'ar'? '10px':  'undefined',
                                        
                                        
                                              }}>
                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                                     <Typography sx={{
                                                         color: 'white',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     }}>
                                                         {t('Nabil Hamici')}
                                                     </Typography>
                                        
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '5px',
                                                         fontSize: '14px',
                                                         position : 'relative',
                                                         right : currentLanguage === 'ar'? '8px' : 'undefinied',
                                                         top : currentLanguage === 'ar'? '3px' : 'undefined',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     }}>
                                                         {t('(Khadamat Partner)')}
                                                     </Typography>
                                        
                                                     <Rating name="read-only" value={5} readOnly sx={{ marginLeft: '10px', color: 'white' }} />
                                                 </div>
                                        
                                                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                     <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '3px',
                                                         fontSize: '14px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                         whiteSpace: 'nowrap',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                     }}>
                                                         {t('13 minutes ago')}
                                                     </Typography>
                                        
                                                     <div className="Line" style={{
                                                         width: '1.4px',
                                                         height: '15px',
                                                         background: 'white',
                                                         marginLeft: '10px',
                                                        position : 'relative',
                                                        right : currentLanguage === 'ar'? '5px' : 'undefined',
                                                     }}></div>
                                        
                                                     <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
                                                     <Typography sx={{
                                                         color: 'white',
                                                         marginLeft: '3px',
                                                         fontSize: '14px',
                                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                         whiteSpace: 'nowrap',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                         marginRight: currentLanguage === 'ar'? '-5px' : '10px',
                                                     }}>
                                                         {t('React Developer')}
                                                     </Typography>
                                                 </div>
                                             </div>
                                             <Button
                                                 id="fade-button"
                                                 aria-controls={open ? 'fade-menu' : undefined}
                                                 aria-haspopup="true"
                                                 aria-expanded={open ? 'true' : undefined}
                                                 onClick={handleClick2}
                                        
                                             >
                                                 <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                                             </Button>
                                      </div>
                                           <Menu
                                               id="fade-menu2"
                                               MenuListProps={{
                                                   'aria-labelledby': 'fade-button',
                                               }}
                                               anchorEl={anchorEl2}
                                               open={open2}
                                               onClose={handleClose2}
                                               TransitionComponent={Fade}
                                           >
                                               <MenuItem onClick={handleClose2}><ReportProblemIcon sx={{ marginRight: '5px' }} />  Report</MenuItem>


                                           </Menu>
                                       </div>
                                       <div className="Content"
                                           style={{
                                               padding: '10px',
                                           }}
                                       >
                                           <div
                                               style={{
                                                   width: currentLanguage === 'ar'? '730px' : '300px',
                                                   position: 'relative',
                                                   top: isScreenUnder450px ? '30px' : 'undefined',
                                               }}
                                           >
                                               <Typography
                                                   sx={{
                                                       color: '#64748B',
                                                       fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                       fontWeight: 'bold',
                                                       display: isScreenUnder450px ? '-webkit-box' : 'undefined',
                                                       WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undefined',
                                                       WebkitLineClamp: isScreenUnder450px ? '3' : 'undefined',
                                                       overflow: isScreenUnder450px ? 'hidden' : 'undefined',
                                                   }}
                                               >
                                                   {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                               </Typography>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </section>
                       )}
                   </div>
                   <div className="Stars"
                       style={{
                           position: 'relative',
                           left: '610px',
                           top: '-190px'
                       }}
                   >
                       <ReactStars
                           count={5}
                           value={5}
                           edit={false}
                           size={22}
                           activeColor="#ffd700"
                       />,

                   </div>

               </div>
            ) : isScreenUnder1200px ? (
                <div classNama='SinglePost' >

                    <div className='Project'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            position: 'relative',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card">
                                <Typography sx={{ color: 'white', fontSize: '20px', }} >
                                    Project Card
                                </Typography>
                            </div>

                        </div>
                        <CopyButton />
                    </div>
                    <div className='meteors-demo-container'
                        style={{
                            height: 'auto',
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            padding: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden', // Ensure child elements don't overflow the container
                        }}
                    >
                        <section className="meteors-demo-section">
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
                            <div className='ALLSTAFF'>
                                <img
                                    src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                    alt="Background SVG"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.1,
                                        zIndex: 0,
                                    }} />

                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '12%',
                                        border: '2px solid white',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        overflow: 'hidden',
                                        zIndex: 1,
                                    }}
                                >
                                    <img
                                        src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
                                        alt="JavaScript Logo"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }} />
                                </div>

                                <div className="Name"
                                    style={{
                                        position: 'absolute',
                                        top: '26%',
                                        left: '43.8%',
                                        display: 'flex',
                                        zIndex: 1, // Ensures this element is above the background
                                    }}
                                >
                                    <PersonPinCircleIcon sx={{ color: 'white', fontSize: '20px' }} />
                                    <Typography sx={{ color: 'white' }}>
                                        Nabil Hamici
                                    </Typography>
                                </div>

                                <div className="TitelDesc"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '180px',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        zIndex: 1, // Ensures this element is above the background
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            color: 'transparent',
                                        }}
                                    >
                                        [ Programming online store with React ]
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            marginTop: '15px',
                                            width: '50%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.
                                    </Typography>
                                </div>

                                <div className="Status "
                                    style={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginLeft: '50px',
                                        width: '90%',
                                        zIndex: 1,
                                        padding: '15px',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        borderRadius: '16px',
                                    }}
                                >
                                    <div className="glass-background"></div>

                                    <div className="Project"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Project Status
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            Open
                                        </Typography>

                                    </div>
                                    <div className="Post"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Post date
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            1 hour
                                        </Typography>

                                    </div>
                                    <div className="Budjet"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Budget
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            50$ - 100$
                                        </Typography>

                                    </div>
                                    <div className="Offers"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Offers
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            50
                                        </Typography>

                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                    <div  >
                        <div class="astrodivider ">
                            <div class="astrodividermask ">

                            </div>
                            <span className='border' ><i>&#9733;</i></span>
                        </div>
                    </div>

                    <div className='Skills'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            position: 'relative',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card">
                                <Typography sx={{ color: 'white', fontSize: '20px', }} >
                                    Required Skills
                                </Typography>
                            </div>
                        </div>
                        <div className="button">
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
                                    {t('Add an offer')}
                                </Typography>
                            </Button>
                        </div>


                    </div>

                    <div className='meteors-demo-container'
                        style={{
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            height: 'auto',
                            flexDirection: 'column', // Ensure the container grows vertically
                            alignItems: 'flex-start', // Start align to stack buttons from the top
                            padding: '20px', // Add padding to the container
                            flexWrap: 'wrap', // Allow buttons to wrap
                        }}
                    >

                        <section className="meteors-demo-section">
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

                            <div className='ALLSTAFF'>
                                <img
                                    src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                    alt="Background SVG"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.1,
                                        zIndex: 0,
                                    }}
                                />

                                {/* Replace with your dynamic tags/buttons */}
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div  >
                        <div class="astrodivider ">
                            <div class="astrodividermask ">

                            </div>
                            <span className='border' ><i>&#9733;</i></span>
                        </div>
                    </div>
                    <div className='Offers'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card"
                                style={{
                                    width: '750px'
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: '20px', }} >
                                    Offers Made
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <OfferButton />
                        </div>

                        <div className="button">

                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick1}

                            >
                                <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                            </Button>
                            <Menu
                                id="fade-menu1"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button1',
                                }}
                                anchorEl={anchorEl1}
                                open={open1}
                                onClose={handleClose1}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose1}> <ArrowUpwardIcon sx={{ marginRight: '5px' }} /> Newest</MenuItem>
                                <MenuItem onClick={handleClose1}> <ArrowDownwardIcon sx={{ marginRight: '5px' }} /> Oldest</MenuItem>

                            </Menu>
                        </div>
                    </div>
                    <div className='meteors-demo-container'
                        style={{
                            height: '200px',
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden', // Ensure child elements don't overflow the container
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="circular" width="100%" height={200} />
                        ) : (
                            <section className="meteors-demo-section">
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

                                <div className='ALLSTAFF'>
                                    <img
                                        src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                        alt="Background SVG"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            opacity: 0.1,
                                            zIndex: 0,
                                        }} />
                                </div>
                                <div className='ProjectContainer '>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
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

                                            <div className="ActiveBadge" style={{
                                                position: 'absolute',
                                                top: '55px',
                                                left: currentLanguage === 'ar' ? '292px' : '55px',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: 'green',
                                                border: '2px solid white',
                                            }}></div>

                                            <div style={{ marginLeft: '10px', flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {t('Nabil Hamici')}
                                                    </Typography>

                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '5px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {t('(Khadamat Partner)')}
                                                    </Typography>

                                                    <Rating name="read-only" value={5} readOnly sx={{ marginLeft: '10px', color: 'white' }} />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                    <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {t('13 minutes ago')}
                                                    </Typography>

                                                    <div className="Line" style={{
                                                        width: '1.4px',
                                                        height: '15px',
                                                        background: 'white',
                                                        marginLeft: '10px',
                                                    }}></div>

                                                    <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        marginRight: '10px',
                                                    }}>
                                                        {t('React Developer')}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Button
                                                id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick2}

                                            >
                                                <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                                            </Button>
                                            <Menu
                                                id="fade-menu2"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl2}
                                                open={open2}
                                                onClose={handleClose2}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleClose2}><ReportProblemIcon sx={{ marginRight: '5px' }} />  Report</MenuItem>


                                            </Menu>
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
                                                    top: isScreenUnder450px ? '30px' : 'undefined',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#64748B',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        display: isScreenUnder450px ? '-webkit-box' : 'undefined',
                                                        WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undefined',
                                                        WebkitLineClamp: isScreenUnder450px ? '3' : 'undefined',
                                                        overflow: isScreenUnder450px ? 'hidden' : 'undefined',
                                                    }}
                                                >
                                                    {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="Stars"
                        style={{
                            position: 'relative',
                            left: '600px',
                            top: '-187px'
                        }}
                    >
                        <Rating
                            name="read-only"
                            value={5}
                            readOnly
                            size="small"
                            sx={{
                                marginLeft: '5px',
                                verticalAlign: 'middle',
                                color: 'gold', // Ensure stars are visible
                            }}
                        />
                    </div>

                </div>
            ) : isScreenUnder1440px ? (
                <div classNama='SinglePost'
                style={{
                    position : 'relative',
                    right : currentLanguage === 'ar'? '290px' : 'undefined',
                }}
                 >

                    <div className='Project'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            position: 'relative',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card">
                                <Typography 
                                sx={{ color: 'white',
                                 fontSize: '20px',
                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                  }} >
                                    {t('Project Card')}
                                </Typography>
                            </div>

                        </div>
                        <CopyButton />
                    </div>
                    <div className='meteors-demo-container'
                        style={{
                            height: 'auto',
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            padding: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden', // Ensure child elements don't overflow the container
                        }}
                    >
                         <img
        src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
        alt="Background SVG"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
                        <section className="meteors-demo-section">
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
                            <div className='ALLSTAFF'>
                                <img
                                    src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                    alt="Background SVG"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.1,
                                        zIndex: 0,
                                    }} />

                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '12%',
                                        border: '2px solid white',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        overflow: 'hidden',
                                        zIndex: 1,
                                    }}
                                >
                                    <img
                                        src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
                                        alt="JavaScript Logo"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }} />
                                </div>

                                <div className="Name"
                                    style={{
                                        position: 'absolute',
                                        top: '20%',
                                        left: currentLanguage === 'ar'? '45%' : '44%',
                                        display: 'flex',
                                        zIndex: 1, // Ensures this element is above the background
                                    }}
                                >
                                    <PersonPinCircleIcon sx={{ color: 'white', fontSize: '20px' }} />
                                    <Typography sx={{ color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                     }}>
                                        {t('Nabil Hamici')}
                                    </Typography>
                                </div>

                                <div className="TitelDesc"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '200px',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        zIndex: 1, // Ensures this element is above the background
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            color: 'transparent',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}
                                    >
                                       {t('[ Programming online store with React ]')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            marginTop: '15px',
                                            width: '80%',
                                            textAlign: 'center',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}
                                    >
                                        {t('Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.')}
                                    </Typography>
                                </div>

                                <div className="Status "
                                    style={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginLeft: '57px',
                                        flexDirection: 'column',
                                        width: '99%',
                                        position: 'relative',
                                        right: currentLanguage === 'ar'? '4px' : '50px',
                                        zIndex: 1,
                                        padding: '15px',

                                        borderRadius: '16px',
                                    }}
                                >


                                    <div className="Project"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            border: '1px solid white',
                                            padding: '10px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <AccountTreeIcon sx={{ color: 'white' }} />
                                        <Typography sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            right: currentLanguage === 'ar'? '-330px' : '330px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                            {t('Project Status')}
                                        </Typography>
                                        <Typography sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        }}>
                                            {t('Open')}
                                        </Typography>

                                    </div>
                                    <div className="Post"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            border: '1px solid white',
                                            padding: '10px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <UpdateIcon sx={{ color: 'white' }} />
                                        <Typography sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            right: currentLanguage === 'ar'? '-322px' : '330px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                            {t('Post date')}
                                        </Typography>
                                        <Typography sx={{ color: 'white', 
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                         }}>
                                            {t('1 hour ago')}
                                        </Typography>

                                    </div>
                                    <div className="Budjet"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            border: '1px solid white',
                                            padding: '10px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <AttachMoneyIcon sx={{
                                            color: 'white',

                                        }} />

                                        <Typography sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            right: currentLanguage === 'ar'? '-336px' : '330px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                            {t('Budget')}
                                        </Typography>
                                        <Typography sx={{ color: 'white',
                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                         }}>
                                            50$ - 100$
                                        </Typography>

                                    </div>
                                    <div className="Offers"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'center',
                                            border: '1px solid white',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            marginBottom: '15px',
                                        }}
                                    >
                                        <SellIcon sx={{ color: 'white' }} />
                                        <Typography sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            right: currentLanguage === 'ar'? '-367px' : '360px',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                        }}>
                                            {t('Offers')}
                                        </Typography>
                                        <Typography sx={{ color: 'white',
                                         fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                         }}>
                                            {t('50')}
                                        </Typography>

                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                    <div  >
                        <div class="astrodivider ">
                            <div class="astrodividermask"
                            style={{
                                position : 'relative',
                                right : currentLanguage === 'ar'? '550px' : 'undefined',
                            }}
                            >

                            </div>
                            <span className='border' ><i>&#9733;</i></span>
                        </div>
                    </div>

                    <div className='Skills'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            position: 'relative',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card">
                                <Typography sx={{ color: 'white', fontSize: '20px', 
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                }} >
                                    {t('Required Skills')}
                                </Typography>
                            </div>
                        </div>
                        <div className="button">
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
                                    {t('Add an offer')}
                                </Typography>
                            </Button>
                        </div>


                    </div>

                    <div className='meteors-demo-container'
                        style={{
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            height: 'auto',
                            flexDirection: 'column', // Ensure the container grows vertically
                            alignItems: 'flex-start', // Start align to stack buttons from the top
                            padding: '20px', // Add padding to the container
                            flexWrap: 'wrap', // Allow buttons to wrap
                        }}
                    >

                        <section className="meteors-demo-section">
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

                            <div className='ALLSTAFF'>
                                <img
                                    src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                    alt="Background SVG"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.1,
                                        zIndex: 0,
                                    }}
                                />

                                {/* Replace with your dynamic tags/buttons */}
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div >
                        <div class="astrodivider ">
                            <div class="astrodividermask"
                               style={{
                                position : 'relative',
                                right : currentLanguage === 'ar'? '550px' : 'undefined',
                            }}
                            >

                            </div>
                            <span className='border' ><i>&#9733;</i></span>
                        </div>
                    </div>
                    <div className='Offers'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            top: '101px',
                        }}
                    >
                        
                            <div className="Card"
                                style={{
                                    width: '750px'
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: '20px',
                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                 }} >
                                    {t('Offers Made')}
                                </Typography>
                            </div>
                       
                        <div
                        style={{display :'flex'}}
                        >
                            <OfferButton />
                            <div className="button">
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick1}

                            >
                                <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                            </Button>
                            <Menu
                                id="fade-menu1"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button1',
                                }}
                                anchorEl={anchorEl1}
                                open={open1}
                                onClose={handleClose1}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose1}> <ArrowUpwardIcon sx={{ marginRight: '5px' }} /> Newest</MenuItem>
                                <MenuItem onClick={handleClose1}> <ArrowDownwardIcon sx={{ marginRight: '5px' }} /> Oldest</MenuItem>

                            </Menu>
                        </div>
                        </div>

                        
                    </div>
                    <div className='meteors-demo-container'
                        style={{
                            height: '200px',
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden', // Ensure child elements don't overflow the container
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="circular" width="100%" height={200} />
                        ) : (
                            <section className="meteors-demo-section">
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

                                <div className='ALLSTAFF'>
                                    <img
                                        src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                        alt="Background SVG"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            opacity: 0.1,
                                            zIndex: 0,
                                        }} />
                                </div>
                                <div className='ProjectContainer '>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                            <div className='ProfileCircle' style={{
                                                position: 'relative',
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                border: '2px solid #ccc',
                                            }}>
                                                <img src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg" alt="Profile"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        textAlign: 'center',
                                                    }}
                                                />
                                            </div>

                                            <div className="ActiveBadge" style={{
                                                position: 'absolute',
                                                top: '55px',
                                                left: currentLanguage === 'ar' ? '890px' : '55px',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: 'green',
                                                border: '2px solid white',
                                            }}></div>

                                            <div style={{ marginLeft: '10px', flex: '1',
                                            position : 'relative',
                                            right : currentLanguage === 'ar'? '10px':  'undefined',


                                             }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {t('Nabil Hamici')}
                                                    </Typography>

                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '5px',
                                                        fontSize: '14px',
                                                        position : 'relative',
                                                        right : currentLanguage === 'ar'? '8px' : 'undefinied',
                                                        top : currentLanguage === 'ar'? '3px' : 'undefined',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {t('(Khadamat Partner)')}
                                                    </Typography>

                                                    <Rating name="read-only" value={5} readOnly sx={{ marginLeft: '10px', color: 'white' }} />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                    <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' , marginLeft : '5px'  }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {t('13 minutes ago')}
                                                    </Typography>

                                                    <div className="Line" style={{
                                                        width: '1.4px',
                                                        height: '15px',
                                                        background: 'white',
                                                        marginLeft: '10px',
                                                       position : 'relative',
                                                       right : currentLanguage === 'ar'? '5px' : 'undefined',
                                                    }}></div>

                                                    <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        marginRight: currentLanguage === 'ar'? '-5px' : '10px',
                                                    }}>
                                                        {t('React Developer')}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Button
                                                id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick2}

                                            >
                                                <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                                            </Button>
                                            <Menu
                                                id="fade-menu2"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl2}
                                                open={open2}
                                                onClose={handleClose2}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleClose2}><ReportProblemIcon sx={{ marginRight: '5px' }} />  Report</MenuItem>


                                            </Menu>
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
                                                    top: isScreenUnder450px ? '30px' : 'undefined',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#64748B',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        display: isScreenUnder450px ? '-webkit-box' : 'undefined',
                                                        WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undefined',
                                                        WebkitLineClamp: isScreenUnder450px ? '3' : 'undefined',
                                                        overflow: isScreenUnder450px ? 'hidden' : 'undefined',
                                                    }}
                                                >
                                                    {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="Stars"
                        style={{
                            position: 'relative',
                            left: currentLanguage === 'ar'? '-275px' : '610px',
                            top: '-190px'
                        }}
                    >
                        <ReactStars
                            count={5}
                            value={5}
                            edit={false}
                            size={22}
                            activeColor="#ffd700"
                        />,

                    </div>

                </div>
            ) : (
                <div classNama='SinglePost' >

                    <div className='Project'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            position: 'relative',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card">
                                <Typography sx={{ color: 'white', fontSize: '20px', }} >
                                    Project Card
                                </Typography>
                            </div>

                        </div>
                        <CopyButton />
                    </div>
                    <div className='meteors-demo-container'
                        style={{
                            height: 'auto',
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            padding: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden', // Ensure child elements don't overflow the container
                        }}
                    >
                        <section className="meteors-demo-section">
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
                            <div className='ALLSTAFF'>
                                <img
                                    src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                    alt="Background SVG"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.1,
                                        zIndex: 0,
                                    }} />

                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '12%',
                                        border: '2px solid white',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        overflow: 'hidden',
                                        zIndex: 1,
                                    }}
                                >
                                    <img
                                        src="https://res.cloudinary.com/damicjacf/image/upload/v1718814146/corporate-avatars-TN-1_p1v2hb.jpg"
                                        alt="JavaScript Logo"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }} />
                                </div>

                                <div className="Name"
                                    style={{
                                        position: 'absolute',
                                        top: '26%',
                                        left: '43.8%',
                                        display: 'flex',
                                        zIndex: 1, // Ensures this element is above the background
                                    }}
                                >
                                    <PersonPinCircleIcon sx={{ color: 'white', fontSize: '20px' }} />
                                    <Typography sx={{ color: 'white' }}>
                                        Nabil Hamici
                                    </Typography>
                                </div>

                                <div className="TitelDesc"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '180px',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        zIndex: 1, // Ensures this element is above the background
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            color: 'transparent',
                                        }}
                                    >
                                        [ Programming online store with React ]
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            marginTop: '15px',
                                            width: '50%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Programming is the process of creating instructions for computers to perform specific tasks. It involves writing code in various programming languages, such as Python, JavaScript, or C++, to develop software, applications, websites, and more. Programmers use logic and problem-solving skills to design, test, and maintain code, enabling technology to function efficiently and effectively.
                                    </Typography>
                                </div>

                                <div className="Status "
                                    style={{
                                        marginTop: '40px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginLeft: '50px',
                                        width: '90%',
                                        zIndex: 1,
                                        padding: '15px',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        borderRadius: '16px',
                                    }}
                                >
                                    <div className="glass-background"></div>

                                    <div className="Project"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Project Status
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            Open
                                        </Typography>

                                    </div>
                                    <div className="Post"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Post date
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            1 hour
                                        </Typography>

                                    </div>
                                    <div className="Budjet"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Budget
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            50$ - 100$
                                        </Typography>

                                    </div>
                                    <div className="Offers"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Offers
                                        </Typography>
                                        <Typography sx={{ color: 'white' }}>
                                            50
                                        </Typography>

                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                    <div  >
                        <div class="astrodivider ">
                            <div class="astrodividermask ">

                            </div>
                            <span className='border' ><i>&#9733;</i></span>
                        </div>
                    </div>

                    <div className='Skills'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            position: 'relative',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card">
                                <Typography sx={{ color: 'white', fontSize: '20px', }} >
                                    Required Skills
                                </Typography>
                            </div>
                        </div>
                        <div className="button">
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
                                    {t('Add an offer')}
                                </Typography>
                            </Button>
                        </div>


                    </div>

                    <div className='meteors-demo-container'
                        style={{
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            height: 'auto',
                            flexDirection: 'column', // Ensure the container grows vertically
                            alignItems: 'flex-start', // Start align to stack buttons from the top
                            padding: '20px', // Add padding to the container
                            flexWrap: 'wrap', // Allow buttons to wrap
                        }}
                    >

                        <section className="meteors-demo-section">
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

                            <div className='ALLSTAFF'>
                                <img
                                    src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                    alt="Background SVG"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.1,
                                        zIndex: 0,
                                    }}
                                />

                                {/* Replace with your dynamic tags/buttons */}
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                    <Button variant="contained" size="small" style={{ marginRight: '10px', marginBottom: '10px' }}>
                                        Small
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div  >
                        <div class="astrodivider ">
                            <div class="astrodividermask ">

                            </div>
                            <span className='border' ><i>&#9733;</i></span>
                        </div>
                    </div>
                    <div className='Offers'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '75%',
                            height: '60px',
                            padding: '10px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginLeft: '300px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            top: '101px',
                        }}
                    >
                        <div>
                            <div className="Card"
                                style={{
                                    width: '750px'
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: '20px', }} >
                                    Offers Made
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <OfferButton />
                        </div>

                        <div className="button">

                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick1}

                            >
                                <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                            </Button>
                            <Menu
                                id="fade-menu1"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button1',
                                }}
                                anchorEl={anchorEl1}
                                open={open1}
                                onClose={handleClose1}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose1}> <ArrowUpwardIcon sx={{ marginRight: '5px' }} /> Newest</MenuItem>
                                <MenuItem onClick={handleClose1}> <ArrowDownwardIcon sx={{ marginRight: '5px' }} /> Oldest</MenuItem>

                            </Menu>
                        </div>
                    </div>
                    <div className='meteors-demo-container'
                        style={{
                            height: '200px',
                            width: '75%',
                            background: 'white',
                            marginLeft: '300px',
                            marginTop: '100px',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            position: 'relative',
                            overflow: 'hidden', // Ensure child elements don't overflow the container
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="circular" width="100%" height={200} />
                        ) : (
                            <section className="meteors-demo-section">
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

                                <div className='ALLSTAFF'>
                                    <img
                                        src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                                        alt="Background SVG"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            opacity: 0.1,
                                            zIndex: 0,
                                        }} />
                                </div>
                                <div className='ProjectContainer '>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
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

                                            <div className="ActiveBadge" style={{
                                                position: 'absolute',
                                                top: '55px',
                                                left: currentLanguage === 'ar' ? '292px' : '55px',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: 'green',
                                                border: '2px solid white',
                                            }}></div>

                                            <div style={{ marginLeft: '10px', flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography sx={{
                                                        color: 'white',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {t('Nabil Hamici')}
                                                    </Typography>

                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '5px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {t('(Khadamat Partner)')}
                                                    </Typography>

                                                    <Rating name="read-only" value={5} readOnly sx={{ marginLeft: '10px', color: 'white' }} />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                    <AccessTimeIcon sx={{ color: 'white', fontSize: '16px' }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {t('13 minutes ago')}
                                                    </Typography>

                                                    <div className="Line" style={{
                                                        width: '1.4px',
                                                        height: '15px',
                                                        background: 'white',
                                                        marginLeft: '10px',
                                                    }}></div>

                                                    <LocalOfferIcon sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
                                                    <Typography sx={{
                                                        color: 'white',
                                                        marginLeft: '3px',
                                                        fontSize: '14px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        marginRight: '10px',
                                                    }}>
                                                        {t('React Developer')}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Button
                                                id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick2}

                                            >
                                                <SettingsSuggestIcon sx={{ color: 'white', marginLeft: '15px' }} />
                                            </Button>
                                            <Menu
                                                id="fade-menu2"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl2}
                                                open={open2}
                                                onClose={handleClose2}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleClose2}><ReportProblemIcon sx={{ marginRight: '5px' }} />  Report</MenuItem>


                                            </Menu>
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
                                                    top: isScreenUnder450px ? '30px' : 'undefined',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#64748B',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        fontWeight: 'bold',
                                                        display: isScreenUnder450px ? '-webkit-box' : 'undefined',
                                                        WebkitBoxOrient: isScreenUnder450px ? 'vertical' : 'undefined',
                                                        WebkitLineClamp: isScreenUnder450px ? '3' : 'undefined',
                                                        overflow: isScreenUnder450px ? 'hidden' : 'undefined',
                                                    }}
                                                >
                                                    {t('Peace be upon you. I am looking to create an online store, the same store as this https://www.lilyanncabine... with all the features it has. How much does it cost... How long does it take... What software is used.')}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="Stars"
                        style={{
                            position: 'relative',
                            left: '600px',
                            top: '-187px'
                        }}
                    >
                        <Rating
                            name="read-only"
                            value={5}
                            readOnly
                            size="small"
                            sx={{
                                marginLeft: '5px',
                                verticalAlign: 'middle',
                                color: 'gold', // Ensure stars are visible
                            }}
                        />
                    </div>

                </div>
            )}


        </>

    )
}

export default Singleproject























