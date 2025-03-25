import { Typography, tabClasses } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import useMediaQuery from '@mui/material/useMediaQuery';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import PolicyIcon from '@mui/icons-material/Policy';


function First4() {
    const isScreenUnder450px = useMediaQuery('(max-width:450px)');
    const isScreenUnder768px = useMediaQuery('(max-width:768px)');
    const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
    const isScreenUnder400px = useMediaQuery('(max-width:400px)');
    const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');
    const navigate = useNavigate();
    const { t } = useTranslation();


    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });



    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);


    const [selectedButton, setSelectedButton] = useState('');

    // Hook to access the current location
    const location = useLocation();

    // Effect to update the selected button based on the current route
    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;

        // Get the previously selected button from local storage
        const storedSelectedButton = localStorage.getItem('selectedButton');

        // If there is a previously selected button in local storage and the current route matches, set the selected button
        if (storedSelectedButton && pathname === `/${storedSelectedButton}`) {
            setSelectedButton(storedSelectedButton);
        } else {
            // Set the selected button based on the pathname
            if (pathname === '/projects') {
                setSelectedButton('Projects');
            } else {
                // Handle other routes if needed
            }
        }
    }, [location]);

    // Effect to save the selected button to local storage
    useEffect(() => {
        localStorage.setItem('selectedButton', selectedButton);
    }, [selectedButton]);



    return (

        <div>
            {isScreenUnder400px ? (
                 <div className='' style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <div
                     className="First4 "
                     style={{
                         
                         gap: '10px',
                         position: 'relative',
                         top: '20px',
                         cursor: 'pointer',
                     }}
                 >
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                         <a onClick={() => navigate('/projects/categories/programming')}>
                             <div
                                 className="Coding light"
                                 style={{
                                     width: '330px',
                                     height: '190px',
                                     position: 'relative',

                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)', // Apply the blur filter
                                     WebkitBackdropFilter: 'blur(10px)', // For Safari
                                     display: 'flex',
                                     flexDirection: 'column',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                     border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                     background: 'rgb(255 255 255 / 15%)',
                                 }}
                             >
                                 <div
                                     className="IconAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <CodeIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                                             }}
                                         />
                                     </div>
                                 </div>
                                 <div
                                     className="HeaderAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                             }}
                                         >
                                             {t('Programming')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div
                                     className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                                     }}
                                 ></div>
                                 <div
                                     className="AR"
                                     style={{
                                         position: currentLanguage === 'ar' ? 'relative' : undefined,
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px',
                                             }}
                                         >
                                             {t('Web, App, and Game Development')}
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>


                         <a onClick={() => navigate('/projects/categories/design')}>
                             <div
                                 className="Enginiring light"
                                 style={{
                                     width: '330px',
                                     height: '190px',
                                     position: 'relative',

                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)', // Apply the blur filter
                                     WebkitBackdropFilter: 'blur(10px)', // For Safari
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                     border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                 }}
                             >
                                 <div
                                     className="IconAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <DesignServicesIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                                             }}
                                         />
                                     </div>
                                 </div>
                                 <div
                                     className="HeaderAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                             }}
                                         >
                                             {t('Design')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div
                                     className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                                     }}
                                 ></div>
                                 <div
                                     className="AR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                             width: currentLanguage === 'ar' ? '220px' : undefined,
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px',
                                             }}
                                         >
                                             {t('Graphic, UI/UX, and Product Design, Video design')}
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                         <a onClick={() => navigate('/projects/categories/marketing')}>
                             <div
                                 className="Design light "
                                 style={{
                                     width: '330px',
                                     height: '190px',
                                     position: 'relative',
                                     top : '12Px',

                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     overflow: 'hidden',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                     border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                     backdropFilter: 'blur(10px)', // Blur effect
                                     WebkitBackdropFilter: 'blur(10px)',
                                     background: 'rgb(255 255 255 / 15%)',
                                 }}
                             >
                                 <div
                                     className="IconAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <CampaignIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                                             }}
                                         />
                                     </div>
                                 </div>
                                 <div
                                     className="HeaderAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                             }}
                                         >
                                             {t('Marketing')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div
                                     className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                                     }}
                                 ></div>
                                 <div
                                     className="AR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                         width: currentLanguage === 'ar' ? '240px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px',
                                             }}
                                         >
                                             {t('Digital Marketing, SEO, and Social Media')}
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>

                         <a onClick={() => navigate('/projects/categories/architecture')}>
                             <div
                                 className="Video light"
                                 style={{
                                     width: '330px',
                                     height: '190px',
                                     position: 'relative',
                                     top : '12Px',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)', // Apply the blur filter
                                     WebkitBackdropFilter: 'blur(10px)', // For Safari
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                     border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                 }}
                             >
                                 <div
                                     className="IconAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <ArchitectureIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                                             }}
                                         />
                                     </div>
                                 </div>
                                 <div
                                     className="HeaderAR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                         width: currentLanguage === 'ar' ? '240px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                             }}
                                         >
                                             {t('Architecture')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div
                                     className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                                     }}
                                 ></div>
                                 <div
                                     className="AR"
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                     }}
                                 >
                                     <div
                                         className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px',
                                             }}
                                         >
                                             {t('Engineering, architecture and interior design')}
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>
                     </div>
                 </div>
                 <div
                 style={{
                     display : 'flex',
                     justifyContent : 'center',
                     flexDirection : 'column',

                 }}
                  >
                     <div className="Second4  "
                         style={{
                             display: 'flex',
                             flexDirection:  'column',
                             gap: '10px',
                             position: 'relative',
                             marginTop: '32px',
                             cursor: 'pointer',
                         }}
                     >
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                         <a onClick={() => {
                             navigate('/projects/categories/writing ');
                         }}  >
                             <div className="Coding light" style={{
                                 width: '330px',
                                 height: '190px',
                                 position: 'relative',
                            
                                 background: '#111827',
                                 border: '1px #5B42F3 solid',
                                 borderRadius: '15px',
                                 backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                 WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                 display: 'flex',
                                 flexDirection: 'column',
                                 backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                 border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                 backdropFilter: 'blur(10px)', /* Blur effect */
                                 WebkitBackdropFilter: 'blur(10px)',
                     
                     
                             }}>
                                 <div className='IconAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                     
                                     }}
                                 >
                                     <div className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <GTranslateIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                     
                     
                                             }} />
                                     </div>
                                 </div>
                                 <div className='HeaderAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                                 textWrap: 'nowrap',
                                                 position: 'relative',
                                                 right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                             }}
                                         >
                                             {t('Writing & Translation')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                     
                                     }}></div>
                                 <div className='AR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         width: currentLanguage === 'ar' ? '250px' : 'undifined',
                     
                                     }}
                                 >
                                     <div className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px'
                                             }}
                                         >
                                             {t('Content writing, copywriting, translation')}
                     
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>
                         <a onClick={() => {
                             navigate('/projects/categories/accounting');
                         }} >
                             <div className="Enginiring light " style={{
                                 width:'330px',
                                 height: '190px',
                                 position: 'relative',
                                 background: '#111827',
                                 border: '1px #5B42F3 solid',
                                 borderRadius: '15px',
                                 backdropFilter: 'blur(10px)',
                                 WebkitBackdropFilter: 'blur(10px)',
                                 backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                 border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                 backdropFilter: 'blur(10px)', /* Blur effect */
                                 WebkitBackdropFilter: 'blur(10px)',
                     
                             }}>
                                 <div className='IconAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <AccountBalanceIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                     
                     
                                             }} />
                                     </div>
                                 </div>
                                 <div className='HeaderAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                                 textWrap: 'nowrap',
                                                 position: 'relative',
                                                 right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                             }}
                                         >
                                             {t('Finance & Accounting')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                     
                                     }}></div>
                                 <div className='AR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px'
                                             }}
                                         >
                                             {t('Bookkeeping, financial analysis, tax')}
                     
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                         <a onClick={() => {
                             navigate('/projects/categories/support');
                         }}>
                             <div className="Design light" style={{
                                 width: '330px',
                                 height: '190px',
                                 position: 'relative',
             
                                 background: '#111827',
                                 border: '1px #5B42F3 solid',
                                 borderRadius: '15px',
                                 overflow: 'hidden',
                                 backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                 border: '1px solid rgba(255, 255, 255, 0.18)',
                                 backdropFilter: 'blur(10px)',
                                 WebkitBackdropFilter: 'blur(10px)',
                     
                     
                     
                             }}>
                                 <div className='IconAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <SupportAgentIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                     
                     
                                             }} />
                                     </div>
                                 </div>
                                 <div className='HeaderAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px'
                                             }}
                                         >
                                             {t('Customer Support')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                     
                                     }}></div>
                                 <div className='AR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px'
                                             }}
                                         >
                                             {t('Customer service, tech support')}
                     
                                         </Typography>
                                     </div>
                                 </div>
                     
                             </div>
                         </a>
                         <a onClick={() => {
                             navigate('/projects/categories/consulting');
                         }} >
                             <div className="Video light" style={{
                                 width: '330px',
                                 height: '190px',
                                 position: 'relative',
                      
                                 background: '#111827',
                                 border: '1px #5B42F3 solid',
                                 borderRadius: '15px',
                                 backdropFilter: 'blur(10px)',
                                 WebkitBackdropFilter: 'blur(10px)',
                                 backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                 rder: '1px solid rgba(255, 255, 255, 0.18)',
                                 ckdropFilter: 'blur(10px)', /* Blur effect */
                                 bkitBackdropFilter: 'blur(10px)',
                     
                             }}>
                                 <div className='IconAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="icon"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '20px',
                                         }}
                                     >
                                         <PolicyIcon
                                             sx={{
                                                 color: '#5B42F3',
                                                 fontSize: '35px',
                     
                     
                                             }} />
                                     </div>
                                 </div>
                                 <div className='HeaderAR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Header"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '0px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: 'bold',
                                                 fontSize: '20px',
                                                 position: 'relative',
                                                 right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                 textWrap: 'nowrap'
                                             }}
                                         >
                                             {t('Consulting & Advice')}
                                         </Typography>
                                     </div>
                                 </div>
                                 <div className="Divider"
                                     style={{
                                         height: '1px',
                                         width: '100%',
                                         background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                         marginTop: '13px',
                     
                                     }}></div>
                                 <div className='AR'
                                     style={{
                                         marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     }}
                                 >
                                     <div className="Expression"
                                         style={{
                                             marginLeft: '20px',
                                             marginTop: '15px',
                                         }}
                                     >
                                         <Typography
                                             sx={{
                                                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                 color: 'white',
                                                 fontWeight: '300',
                                                 fontSize: '15px'
                                             }}
                                         >
                     
                                             {t('Business strategy, legal consulting')}
                     
                                         </Typography>
                                     </div>
                                 </div>
                             </div>
                         </a>
                         </div>
                     </div>
                 </div>
             </div>
             ) : isScreenUnder450px ? (
                <div className='' style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <div
                    className="First4"
                    style={{
                        
                        gap: '10px',
                        position: 'relative',
                        top: '20px',
                        cursor: 'pointer',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a onClick={() => navigate('/projects/categories/programming')}>
                            <div
                                className="Coding light"
                                style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',

                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    backdropFilter: 'blur(10px)', // Apply the blur filter
                                    WebkitBackdropFilter: 'blur(10px)', // For Safari
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                    border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                    background: 'rgb(255 255 255 / 15%)',
                                }}
                            >
                                <div
                                    className="IconAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <CodeIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="HeaderAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                            }}
                                        >
                                            {t('Programming')}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}
                                ></div>
                                <div
                                    className="AR"
                                    style={{
                                        position: currentLanguage === 'ar' ? 'relative' : undefined,
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px',
                                            }}
                                        >
                                            {t('Web, App, and Game Development')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>


                        <a onClick={() => navigate('/projects/categories/design')}>
                            <div
                                className="Enginiring light"
                                style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',

                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    backdropFilter: 'blur(10px)', // Apply the blur filter
                                    WebkitBackdropFilter: 'blur(10px)', // For Safari
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                    border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                }}
                            >
                                <div
                                    className="IconAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <DesignServicesIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="HeaderAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                            }}
                                        >
                                            {t('Design')}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}
                                ></div>
                                <div
                                    className="AR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                            width: currentLanguage === 'ar' ? '220px' : undefined,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px',
                                            }}
                                        >
                                            {t('Graphic, UI/UX, and Product Design, Video design')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a onClick={() => navigate('/projects/categories/marketing')}>
                            <div
                                className="Design light "
                                style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',
                                    top : '12Px',

                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                    border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                    backdropFilter: 'blur(10px)', // Blur effect
                                    WebkitBackdropFilter: 'blur(10px)',
                                    background: 'rgb(255 255 255 / 15%)',
                                }}
                            >
                                <div
                                    className="IconAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <CampaignIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="HeaderAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                            }}
                                        >
                                            {t('Marketing')}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}
                                ></div>
                                <div
                                    className="AR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        width: currentLanguage === 'ar' ? '240px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px',
                                            }}
                                        >
                                            {t('Digital Marketing, SEO, and Social Media')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a onClick={() => navigate('/projects/categories/architecture')}>
                            <div
                                className="Video light"
                                style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',
                                    top : '12Px',
                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    backdropFilter: 'blur(10px)', // Apply the blur filter
                                    WebkitBackdropFilter: 'blur(10px)', // For Safari
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                    border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                }}
                            >
                                <div
                                    className="IconAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <ArchitectureIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="HeaderAR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        width: currentLanguage === 'ar' ? '240px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                            }}
                                        >
                                            {t('Architecture')}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                                    }}
                                ></div>
                                <div
                                    className="AR"
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                    }}
                                >
                                    <div
                                        className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px',
                                            }}
                                        >
                                            {t('Engineering, architecture and interior design')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div
                style={{
                    display : 'flex',
                    justifyContent : 'center',
                    flexDirection : 'column',

                }}
                 >
                    <div className="Second4  "
                        style={{
                            display: 'flex',
                            flexDirection:  'column',
                            gap: '10px',
                            position: 'relative',
                           
                            marginTop: '73px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a onClick={() => {
                            navigate('/projects/categories/writing ');
                        }}  >
                            <div className="Coding light" style={{
                                width: '330px',
                                height: '190px',
                                position: 'relative',
                           
                                background: '#111827',
                                border: '1px #5B42F3 solid',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                    
                    
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                    
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <GTranslateIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                    
                    
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                                textWrap: 'nowrap',
                                                position: 'relative',
                                                right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                            }}
                                        >
                                            {t('Writing & Translation')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                    
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        width: currentLanguage === 'ar' ? '250px' : 'undifined',
                    
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Content writing, copywriting, translation')}
                    
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a onClick={() => {
                            navigate('/projects/categories/accounting');
                        }} >
                            <div className="Enginiring light " style={{
                                width:'330px',
                                height: '190px',
                                position: 'relative',
                                background: '#111827',
                                border: '1px #5B42F3 solid',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                backdropFilter: 'blur(10px)', /* Blur effect */
                                WebkitBackdropFilter: 'blur(10px)',
                    
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <AccountBalanceIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                    
                    
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                                textWrap: 'nowrap',
                                                position: 'relative',
                                                right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                            }}
                                        >
                                            {t('Finance & Accounting')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                    
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Bookkeeping, financial analysis, tax')}
                    
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a onClick={() => {
                            navigate('/projects/categories/support');
                        }}>
                            <div className="Design light" style={{
                                width: '330px',
                                height: '190px',
                                position: 'relative',
            
                                background: '#111827',
                                border: '1px #5B42F3 solid',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                    
                    
                    
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <SupportAgentIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                    
                    
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px'
                                            }}
                                        >
                                            {t('Customer Support')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                    
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                                            {t('Customer service, tech support')}
                    
                                        </Typography>
                                    </div>
                                </div>
                    
                            </div>
                        </a>
                        <a onClick={() => {
                            navigate('/projects/categories/consulting');
                        }} >
                            <div className="Video light" style={{
                                width: '330px',
                                height: '190px',
                                position: 'relative',
                     
                                background: '#111827',
                                border: '1px #5B42F3 solid',
                                borderRadius: '15px',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                rder: '1px solid rgba(255, 255, 255, 0.18)',
                                ckdropFilter: 'blur(10px)', /* Blur effect */
                                bkitBackdropFilter: 'blur(10px)',
                    
                            }}>
                                <div className='IconAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="icon"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <PolicyIcon
                                            sx={{
                                                color: '#5B42F3',
                                                fontSize: '35px',
                    
                    
                                            }} />
                                    </div>
                                </div>
                                <div className='HeaderAR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Header"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                                position: 'relative',
                                                right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                textWrap: 'nowrap'
                                            }}
                                        >
                                            {t('Consulting & Advice')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="Divider"
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                        marginTop: '13px',
                    
                                    }}></div>
                                <div className='AR'
                                    style={{
                                        marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                    }}
                                >
                                    <div className="Expression"
                                        style={{
                                            marginLeft: '20px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                color: 'white',
                                                fontWeight: '300',
                                                fontSize: '15px'
                                            }}
                                        >
                    
                                            {t('Business strategy, legal consulting')}
                    
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            ) : isScreenUnder768px ? (
                <div className=''
                 style={{ display: 'flex', 
                 flexDirection: 'column',
                  gap: '10px',
                   alignItems: 'center',

                   marginRight : currentLanguage === 'ar'? '3px' : 'undifined',
                    }}>
                    <div
                        className="First4 "
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            position: 'relative',
                            top: '60px',
                    
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <a onClick={() => navigate('/projects/categories/programming')}>
                                <div
                                    className="Coding light"
                                    style={{
                                        width: '330px',
                                        height: '190px',
                                        position: 'relative',

                                        background: '#111827',
                                        border: '1px #5B42F3 solid',
                                        borderRadius: '15px',
                                        backdropFilter: 'blur(10px)', // Apply the blur filter
                                        WebkitBackdropFilter: 'blur(10px)', // For Safari
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                        border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                        background: 'rgb(255 255 255 / 15%)',
                                    }}
                                >
                                    <div
                                        className="IconAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <CodeIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="HeaderAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {t('Programming')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                                        }}
                                    ></div>
                                    <div
                                        className="AR"
                                        style={{
                                            position: currentLanguage === 'ar' ? 'relative' : undefined,
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px',
                                                }}
                                            >
                                                {t('Web, App, and Game Development')}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>


                            <a onClick={() => navigate('/projects/categories/design')}>
                                <div
                                    className="Enginiring light"
                                    style={{
                                        width: '330px',
                                        height: '190px',
                                        position: 'relative',

                                        background: '#111827',
                                        border: '1px #5B42F3 solid',
                                        borderRadius: '15px',
                                        backdropFilter: 'blur(10px)', // Apply the blur filter
                                        WebkitBackdropFilter: 'blur(10px)', // For Safari
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                        border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                    }}
                                >
                                    <div
                                        className="IconAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <DesignServicesIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="HeaderAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {t('Design')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                                        }}
                                    ></div>
                                    <div
                                        className="AR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                                width: currentLanguage === 'ar' ? '220px' : undefined,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px',
                                                }}
                                            >
                                                {t('Graphic, UI/UX, and Product Design, Video design')}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <a onClick={() => navigate('/projects/categories/marketing')}>
                                <div
                                    className="Design light"
                                    style={{
                                        width: '330px',
                                        height: '190px',
                                        position: 'relative',

                                        background: '#111827',
                                        border: '1px #5B42F3 solid',
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                        border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                        backdropFilter: 'blur(10px)', // Blur effect
                                        WebkitBackdropFilter: 'blur(10px)',
                                        background: 'rgb(255 255 255 / 15%)',
                                    }}
                                >
                                    <div
                                        className="IconAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <CampaignIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="HeaderAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {t('Marketing')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                                        }}
                                    ></div>
                                    <div
                                        className="AR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                            width: currentLanguage === 'ar' ? '240px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px',
                                                }}
                                            >
                                                {t('Digital Marketing, SEO, and Social Media')}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a onClick={() => navigate('/projects/categories/architecture')}>
                                <div
                                    className="Video light"
                                    style={{
                                        width: '330px',
                                        height: '190px',
                                        position: 'relative',

                                        background: '#111827',
                                        border: '1px #5B42F3 solid',
                                        borderRadius: '15px',
                                        backdropFilter: 'blur(10px)', // Apply the blur filter
                                        WebkitBackdropFilter: 'blur(10px)', // For Safari
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
                                        border: '1px solid rgba(255, 255, 255, 0.18)', // Light border
                                    }}
                                >
                                    <div
                                        className="IconAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <ArchitectureIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="HeaderAR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                            width: currentLanguage === 'ar' ? '240px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {t('Architecture')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                                        }}
                                    ></div>
                                    <div
                                        className="AR"
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : undefined,
                                        }}
                                    >
                                        <div
                                            className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px',
                                                }}
                                            >
                                                {t('Engineering, architecture and interior design')}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div
                    style={{
                        display : 'flex',
                        justifyContent : 'center',
                   

                    }}
                     >
                        <div className="Second4  "
                            style={{
                                display: 'flex',
                                flexDirection:  'column',
                                gap: '10px',
                                position: 'relative',
                               
                                marginTop: '60px',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <a onClick={() => {
                                navigate('/projects/categories/writing ');
                            }}  >
                                <div className="Coding light" style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',
                               
                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                    WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                    border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                    backdropFilter: 'blur(10px)', /* Blur effect */
                                    WebkitBackdropFilter: 'blur(10px)',
                        
                        
                                }}>
                                    <div className='IconAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                        
                                        }}
                                    >
                                        <div className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <GTranslateIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                        
                        
                                                }} />
                                        </div>
                                    </div>
                                    <div className='HeaderAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                    textWrap: 'nowrap',
                                                    position: 'relative',
                                                    right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                                }}
                                            >
                                                {t('Writing & Translation')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                        
                                        }}></div>
                                    <div className='AR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                            width: currentLanguage === 'ar' ? '250px' : 'undifined',
                        
                                        }}
                                    >
                                        <div className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px'
                                                }}
                                            >
                                                {t('Content writing, copywriting, translation')}
                        
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a onClick={() => {
                                navigate('/projects/categories/accounting');
                            }} >
                                <div className="Enginiring light" style={{
                                    width:'330px',
                                    height: '190px',
                                    position: 'relative',
                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                    border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                    backdropFilter: 'blur(10px)', /* Blur effect */
                                    WebkitBackdropFilter: 'blur(10px)',
                        
                                }}>
                                    <div className='IconAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <AccountBalanceIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                        
                        
                                                }} />
                                        </div>
                                    </div>
                                    <div className='HeaderAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                    textWrap: 'nowrap',
                                                    position: 'relative',
                                                    right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                }}
                                            >
                                                {t('Finance & Accounting')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                        
                                        }}></div>
                                    <div className='AR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px'
                                                }}
                                            >
                                                {t('Bookkeeping, financial analysis, tax')}
                        
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <a onClick={() => {
                                navigate('/projects/categories/support');
                            }}>
                                <div className="Design light" style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',
                
                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                        
                        
                        
                                }}>
                                    <div className='IconAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <SupportAgentIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                        
                        
                                                }} />
                                        </div>
                                    </div>
                                    <div className='HeaderAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px'
                                                }}
                                            >
                                                {t('Customer Support')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                        
                                        }}></div>
                                    <div className='AR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px'
                                                }}
                                            >
                                                {t('Customer service, tech support')}
                        
                                            </Typography>
                                        </div>
                                    </div>
                        
                                </div>
                            </a>
                            <a onClick={() => {
                                navigate('/projects/categories/consulting');
                            }} >
                                <div className="Video light" style={{
                                    width: '330px',
                                    height: '190px',
                                    position: 'relative',
                         
                                    background: '#111827',
                                    border: '1px #5B42F3 solid',
                                    borderRadius: '15px',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    rder: '1px solid rgba(255, 255, 255, 0.18)',
                                    ckdropFilter: 'blur(10px)', /* Blur effect */
                                    bkitBackdropFilter: 'blur(10px)',
                        
                                }}>
                                    <div className='IconAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="icon"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <PolicyIcon
                                                sx={{
                                                    color: '#5B42F3',
                                                    fontSize: '35px',
                        
                        
                                                }} />
                                        </div>
                                    </div>
                                    <div className='HeaderAR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Header"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '0px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                    position: 'relative',
                                                    right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                    textWrap: 'nowrap'
                                                }}
                                            >
                                                {t('Consulting & Advice')}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="Divider"
                                        style={{
                                            height: '1px',
                                            width: '100%',
                                            background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                            marginTop: '13px',
                        
                                        }}></div>
                                    <div className='AR'
                                        style={{
                                            marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                        }}
                                    >
                                        <div className="Expression"
                                            style={{
                                                marginLeft: '20px',
                                                marginTop: '15px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    color: 'white',
                                                    fontWeight: '300',
                                                    fontSize: '15px'
                                                }}
                                            >
                        
                                                {t('Business strategy, legal consulting')}
                        
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
              ) : isScreenUnder1200px ? (   
               <div className=''
               style={{
                marginTop : '10px',
             display : 'flex',
             flexDirection : 'row',
             justifyContent : 'center',
             gap : '25px',
              
               }}
               >
                 <div className="First4  "
                     style={{
                         display: 'flex',
                         flexDirection: 'column',
                         gap: '10px',
                         position: 'relative',
                         justifyContent : 'center',
                         right : currentLanguage === 'ar'? '263px' : 'undifined',
                         cursor: 'pointer',
                     }}
                 >
                     <a onClick={() => {
                         navigate('/projects/categories/programming');
                     } }
                     >
                         <div className="Coding light" style={{
                             width:  '360px',
                             height: '190px',
                             position: 'relative',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             display: 'flex',
                             flexDirection: 'column',
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                             background: 'rgb(255 255 255 / 15%)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <CodeIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Programming ')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Web, App, and Game Development')}
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/design');
                     } }
                     >
                         <div className="Enginiring light " style={{
                             width: '350px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <DesignServicesIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Design')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                         width: currentLanguage === 'ar' ? '220px' : 'undifined',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Graphic, UI/UX, and Product Design, Video design')}
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/marketing');
                     } }>
                         <div className="Design light" style={{
                             width: '360px',
                             height: '190px',
                             position: 'relative',
                       
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             overflow: 'hidden',
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                             background: 'rgb(255 255 255 / 15%)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <CampaignIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Marketing')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Digital Marketing, SEO, and Social Media')}
                
                                     </Typography>
                                 </div>
                             </div>
                
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/architecture ');
                     } }>
                         <div className="Video light" style={{
                             width: '360px',
                             height: '190px',
                             position: 'relative',
       
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <ArchitectureIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Architecture')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Engineering, architecture and interior design')}
                
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                
                 </div >
                 <div className='Sedond4AR'
                     style={{
                      
                     }}
                 >
                         <div className="Second4  "
                             style={{
                                 display: 'flex',
                                 flexDirection:  'column', 
                                 gap: '10px',
                                 position: 'relative',
                                 justifyContent : 'center',
                          
                                 cursor: 'pointer',
                             }}
                         >
                             <a onClick={() => {
                                 navigate('/projects/categories/writing ');
                             } }>
                                 <div className="Coding light" style={{
                                     width:  '360px',
                                     height: '190px',
                                     position: 'relative',
                               
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                     WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                     display: 'flex',
                                     flexDirection: 'column',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                     border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                     backdropFilter: 'blur(10px)', /* Blur effect */
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <GTranslateIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     textWrap: 'nowrap',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                                 }}
                                             >
                                                 {t('Writing & Translation')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                             width: currentLanguage === 'ar' ? '250px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Content writing, copywriting, translation')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/accounting');
                             } }>
                                 <div className="Enginiring light" style={{
                                     width:  '360px',
                                     height: '190px',
                                     position: 'relative',
                                    
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                     border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                     backdropFilter: 'blur(10px)', /* Blur effect */
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <AccountBalanceIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     textWrap: 'nowrap',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                 }}
                                             >
                                                 {t('Finance & Accounting')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Bookkeeping, financial analysis, tax')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/support');
                             } }>
                                 <div className="Design light" style={{
                                     width: '360px',
                                     height: '190px',
                                     position: 'relative',
                                
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     overflow: 'hidden',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                     border: '1px solid rgba(255, 255, 255, 0.18)',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <SupportAgentIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px'
                                                 }}
                                             >
                                                 {t('Customer Support')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Customer service, tech support')}
                
                                             </Typography>
                                         </div>
                                     </div>
                
                                 </div>
                             </a>
                             <a onClick={() => {    
                                 navigate('/projects/categories/consulting');
                             } }>
                                 <div className="Video light" style={{
                                     width:  '360px',
                                     height: '190px',
                                     position: 'relative',
                          
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                     rder: '1px solid rgba(255, 255, 255, 0.18)',
                                     ckdropFilter: 'blur(10px)', /* Blur effect */
                                     bkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <PolicyIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                     textWrap: 'nowrap'
                                                 }}
                                             >
                                                 {t('Consulting & Advice')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                
                                                 {t('Business strategy, legal consulting')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                
                         </div>
                     </div>
               </div>
            ) : isScreenUnder1440px ? (
                <div >
                  <div className=''
               style={{
                marginTop : '10px',
                marginLeft : '270px',
             
              
               }}
               >
                 <div className="First4  "
                     style={{
                         display: 'flex',
                         flexDirection: isScreenUnder450px ? 'column' : 'undifined',
                         gap: '10px',
                         position: 'relative',
                         justifyContent : 'center',
                         right : currentLanguage === 'ar'? '263px' : 'undifined',
                         cursor: 'pointer',
                     }}
                 >
                     <a onClick={() => {
                         navigate('/projects/categories/programming');
                     } }
                     >
                         <div className="Coding light" style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             display: 'flex',
                             flexDirection: 'column',
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                             background: 'rgb(255 255 255 / 15%)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <CodeIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Programming')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Web, App, and Game Development')}
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/design');
                     } }
                     >
                         <div className="Enginiring light " style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <DesignServicesIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Design')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                         width: currentLanguage === 'ar' ? '220px' : 'undifined',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Graphic, UI/UX, and Product Design, Video design')}
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/marketing');
                     } }>
                         <div className="Design light" style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             overflow: 'hidden',
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                             background: 'rgb(255 255 255 / 15%)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <CampaignIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Marketing')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Digital Marketing, SEO, and Social Media')}
                
                                     </Typography>
                                 </div>
                             </div>
                
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/architecture ');
                     } }>
                         <div className="Video light" style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <ArchitectureIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Architecture')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Engineering, architecture and interior design')}
                
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                
                 </div >
                 <div className='Sedond4AR'
                     style={{
                      
                     }}
                 >
                         <div className="Second4  "
                             style={{
                                 display: 'flex',
                                 flexDirection: isScreenUnder450px ? 'column' : 'undifined',
                                 gap: '10px',
                                 position: 'relative',
                                 justifyContent : 'center',
                                 marginTop: '15px',
                                 marginRight : currentLanguage === 'ar'? '520px' : 'undifined',
                                 cursor: 'pointer',
                             }}
                         >
                             <a onClick={() => {
                                 navigate('/projects/categories/writing ');
                             } }>
                                 <div className="Coding light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                     WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                     display: 'flex',
                                     flexDirection: 'column',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                     border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                     backdropFilter: 'blur(10px)', /* Blur effect */
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <GTranslateIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     textWrap: 'nowrap',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                                 }}
                                             >
                                                 {t('Writing & Translation')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                             width: currentLanguage === 'ar' ? '250px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Content writing, copywriting, translation')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/accounting');
                             } }>
                                 <div className="Enginiring light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                     border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                     backdropFilter: 'blur(10px)', /* Blur effect */
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <AccountBalanceIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     textWrap: 'nowrap',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                 }}
                                             >
                                                 {t('Finance & Accounting')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Bookkeeping, financial analysis, tax')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/support');
                             } }>
                                 <div className="Design light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     overflow: 'hidden',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                     border: '1px solid rgba(255, 255, 255, 0.18)',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <SupportAgentIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px'
                                                 }}
                                             >
                                                 {t('Customer Support')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Customer service, tech support')}
                
                                             </Typography>
                                         </div>
                                     </div>
                
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/consulting');
                             } }>
                                 <div className="Video light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                     rder: '1px solid rgba(255, 255, 255, 0.18)',
                                     ckdropFilter: 'blur(10px)', /* Blur effect */
                                     bkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <PolicyIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                     textWrap: 'nowrap'
                                                 }}
                                             >
                                                 {t('Consulting & Advice')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                
                                                 {t('Business strategy, legal consulting')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                
                         </div>
                     </div>
               </div>
                </div>
             ) : (
<div >
                  <div className=''
               style={{
                marginTop : '10px',
                marginLeft : '270px',
             
              
               }}
               >
                 <div className="First4  "
                     style={{
                         display: 'flex',
                         flexDirection: isScreenUnder450px ? 'column' : 'undifined',
                         gap: '10px',
                         position: 'relative',
                         justifyContent : 'center',
                         right : currentLanguage === 'ar'? '263px' : 'undifined',
                         cursor: 'pointer',
                     }}
                 >
                     <a onClick={() => {
                         navigate('/projects/categories/programming');
                     } }
                     >
                         <div className="Coding light" style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             display: 'flex',
                             flexDirection: 'column',
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                             background: 'rgb(255 255 255 / 15%)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <CodeIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Programming')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Web, App, and Game Development')}
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/design');
                     } }
                     >
                         <div className="Enginiring light " style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <DesignServicesIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Design')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                         width: currentLanguage === 'ar' ? '220px' : 'undifined',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Graphic, UI/UX, and Product Design, Video design')}
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/marketing');
                     } }>
                         <div className="Design light" style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             overflow: 'hidden',
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                             background: 'rgb(255 255 255 / 15%)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <CampaignIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Marketing')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Digital Marketing, SEO, and Social Media')}
                
                                     </Typography>
                                 </div>
                             </div>
                
                         </div>
                     </a>
                     <a onClick={() => {
                         navigate('/projects/categories/architecture ');
                     } }>
                         <div className="Video light" style={{
                             width: isScreenUnder450px ? '355px' : '240px',
                             height: '190px',
                             position: 'relative',
                             right: isScreenUnder450px ? '18px' : 'undifined',
                             background: '#111827',
                             border: '1px #5B42F3 solid',
                             borderRadius: '15px',
                             backdropFilter: 'blur(10px)', /* Apply the blur filter */
                             WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                             backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                             border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                             backdropFilter: 'blur(10px)', /* Blur effect */
                             WebkitBackdropFilter: 'blur(10px)',
                         }}>
                             <div className='IconAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="icon"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '20px',
                                     }}
                                 >
                                     <ArchitectureIcon
                                         sx={{
                                             color: '#5B42F3',
                                             fontSize: '35px',
                                         }} />
                                 </div>
                             </div>
                             <div className='HeaderAR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                     width: currentLanguage === 'ar' ? '240px' : 'undifined',
                                 }}
                             >
                                 <div className="Header"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '0px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             fontSize: '20px'
                                         }}
                                     >
                                         {t('Architecture')}
                                     </Typography>
                                 </div>
                             </div>
                             <div className="Divider"
                                 style={{
                                     height: '1px',
                                     width: '100%',
                                     background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                     marginTop: '13px',
                                 }}></div>
                             <div className='AR'
                                 style={{
                                     marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                 }}
                             >
                                 <div className="Expression"
                                     style={{
                                         marginLeft: '20px',
                                         marginTop: '15px',
                                     }}
                                 >
                                     <Typography
                                         sx={{
                                             fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                             color: 'white',
                                             fontWeight: '300',
                                             fontSize: '15px'
                                         }}
                                     >
                                         {t('Engineering, architecture and interior design')}
                
                
                                     </Typography>
                                 </div>
                             </div>
                         </div>
                     </a>
                
                 </div >
                 <div className='Sedond4AR'
                     style={{
                      
                     }}
                 >
                         <div className="Second4  "
                             style={{
                                 display: 'flex',
                                 flexDirection: isScreenUnder450px ? 'column' : 'undifined',
                                 gap: '10px',
                                 position: 'relative',
                                 justifyContent : 'center',
                                 marginTop: '15px',
                                 marginRight : currentLanguage === 'ar'? '520px' : 'undifined',
                                 cursor: 'pointer',
                             }}
                         >
                             <a onClick={() => {
                                 navigate('/projects/categories/writing ');
                             } }>
                                 <div className="Coding light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)', /* Apply the blur filter */
                                     WebkitBackdropFilter: 'blur(10px)', /* For Safari */
                                     display: 'flex',
                                     flexDirection: 'column',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                     border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                     backdropFilter: 'blur(10px)', /* Blur effect */
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <GTranslateIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     textWrap: 'nowrap',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '12px' : 'undifined',
                                                 }}
                                             >
                                                 {t('Writing & Translation')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                             width: currentLanguage === 'ar' ? '250px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Content writing, copywriting, translation')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/accounting');
                             } }>
                                 <div className="Enginiring light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                                     border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                                     backdropFilter: 'blur(10px)', /* Blur effect */
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <AccountBalanceIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     textWrap: 'nowrap',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                 }}
                                             >
                                                 {t('Finance & Accounting')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Bookkeeping, financial analysis, tax')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/support');
                             } }>
                                 <div className="Design light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     overflow: 'hidden',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                     border: '1px solid rgba(255, 255, 255, 0.18)',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <SupportAgentIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px'
                                                 }}
                                             >
                                                 {t('Customer Support')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                                                 {t('Customer service, tech support')}
                
                                             </Typography>
                                         </div>
                                     </div>
                
                                 </div>
                             </a>
                             <a onClick={() => {
                                 navigate('/projects/categories/consulting');
                             } }>
                                 <div className="Video light" style={{
                                     width: isScreenUnder450px ? '355px' : '240px',
                                     height: '190px',
                                     position: 'relative',
                                     right: isScreenUnder450px ? '18px' : 'undifined',
                                     background: '#111827',
                                     border: '1px #5B42F3 solid',
                                     borderRadius: '15px',
                                     backdropFilter: 'blur(10px)',
                                     WebkitBackdropFilter: 'blur(10px)',
                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                     rder: '1px solid rgba(255, 255, 255, 0.18)',
                                     ckdropFilter: 'blur(10px)', /* Blur effect */
                                     bkitBackdropFilter: 'blur(10px)',
                                 }}>
                                     <div className='IconAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="icon"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '20px',
                                             }}
                                         >
                                             <PolicyIcon
                                                 sx={{
                                                     color: '#5B42F3',
                                                     fontSize: '35px',
                                                 }} />
                                         </div>
                                     </div>
                                     <div className='HeaderAR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Header"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '0px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: 'bold',
                                                     fontSize: '20px',
                                                     position: 'relative',
                                                     right: currentLanguage === 'fr' ? '10px' : 'undifined',
                                                     textWrap: 'nowrap'
                                                 }}
                                             >
                                                 {t('Consulting & Advice')}
                                             </Typography>
                                         </div>
                                     </div>
                                     <div className="Divider"
                                         style={{
                                             height: '1px',
                                             width: '100%',
                                             background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #7C72FF, rgba(52, 71, 103, 0))',
                                             marginTop: '13px',
                                         }}></div>
                                     <div className='AR'
                                         style={{
                                             marginRight: currentLanguage === 'ar' ? '20px' : 'undifined',
                                         }}
                                     >
                                         <div className="Expression"
                                             style={{
                                                 marginLeft: '20px',
                                                 marginTop: '15px',
                                             }}
                                         >
                                             <Typography
                                                 sx={{
                                                     fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                     color: 'white',
                                                     fontWeight: '300',
                                                     fontSize: '15px'
                                                 }}
                                             >
                
                                                 {t('Business strategy, legal consulting')}
                
                                             </Typography>
                                         </div>
                                     </div>
                                 </div>
                             </a>
                
                         </div>
                     </div>
               </div>
                </div>
             )}
                   
        

        </div>
    )
}

export default First4
