import { Typography, tabClasses } from '@mui/material'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MeteorsDemo from './MeteorsDemo';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import First4 from '../Categories/Responsivedesign/First4';
import Typetext from '../Categories/Responsivedesign/Typetext';









function Projectscontent() {
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  const navigate = useNavigate();


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
    <div className='' style={{ height: '300vh' }} >
      <div className="div"
      style={{
        display : 'flex',
        justifyContent : 'center', 
        marginLeft : isScreenUnder1200px? 'auto' : '210px',
      }}
      >
        <Typetext/>
      </div>
      <div 
      style={{
        
   
      }}
       >
   
      <First4/>
     
    
      </div>
     <div 
     style={{
      position : 'relative',
        left : currentLanguage === 'ar' && isScreenUnder450px && location.pathname === '/project' ? '508px' : 'undifined',  
        top : currentLanguage === 'ar' && isScreenUnder450px && location.pathname === '/project' ? '-808px' : 'undifined',
     }}
      >
       <div className='AR'
         style={{
           position: 'relative',
           right: currentLanguage === 'ar' ? '580px' : 'undifined',
           top : currentLanguage === 'ar'? '800px' : 'undifined',
         }}
       >
         <div className='ALL '
           style={{
             position: 'relative',
             left: '290px',
             top: currentLanguage === 'ar'? '-750px' :
              '50px',
           }}
         >
           <div
             style={{
               position: 'relative',
               right: isScreenUnder450px ? '260px' : 'undifined',
               top :  currentLanguage === 'ar' && isScreenUnder450px? '810px' : 'undifined',
       
             }}
           >
             <Typography
               sx={{
                 color: 'white',
                 fontSize: '20px',
                 fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
               }}
             >
               {t('All Categories')}
             </Typography>

             <div
           style={{
            width : currentLanguage === 'ar' && isScreenUnder450px? '110px' : 'unidifined',
           }}
            >
            <div className="Underline"
              style={{
                width: currentLanguage === 'en' ? '125px' :
                currentLanguage === 'fr' ? '165px' :
                currentLanguage === 'ar' ? '107px' :
                 'undifined',
                height: '3px',
                marginTop: '3px',
                background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                position: 'relative',
        
            
              }}
            >
            
            </div>
           </div>
           </div>
           
         </div>
       </div>
     </div>
      <div className='StarsAR'
        style={{
          
        }}
      >
        <div className="Stars"
          style={{
            position: 'relative',
           


          }}
        >

         

        </div>
      </div>
    </div>
  )
}

export default Projectscontent
