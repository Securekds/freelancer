import { useState, useEffect, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear , faBell , faHouseChimneyUser} from '@fortawesome/free-solid-svg-icons';



function AdminNavBar() {

    
    const { t } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
      const updateDate = () => {
        const now = new Date();
        const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        const formatted = now.toLocaleDateString("en-US", options);
        setFormattedDate(formatted);
      };
  
      updateDate(); // Set initial date
    }, []);



  return (
    <div className='MainAdminNav'
    style={{
        boxShadow: 'inset 0rem 0rem 0.0625rem 0.0625rem rgba(52, 71, 103, 0.9),0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)',
        height: '90px',
        borderRadius: '0.75rem',
        width: '96%',
        position: 'relative', // Ensure it participates in the normal flow
        padding: '10px',
        display: 'flex',
        marginTop: '10px',
        alignItems : 'center',
        zIndex: '44',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
    }}
    >
        <div className="FirstTypo">
        <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight : '600',
                            fontSize: '15px',
                            textWrap: 'nowrap',
                        }}
                    >
                       Welcome Back Nabil !
                    </Typography>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight : 'bold',
                            fontSize: '15px',
                            textWrap: 'nowrap',
                        }}
                    >
                     It's {formattedDate}
                    </Typography>
        </div>
        <div className="Options"
        style={{
            display : 'flex',
            gap : '20px',
            marginRight : '10px',
        }}
        >
              <FontAwesomeIcon icon={faGear}
                            style={{
                             fontSize: '19px',
                              transform: 'rotate(0deg)',
                              color :'white',   
                              verticalAlign: 'middle', // Aligns with text
            
                            }} />
                               <FontAwesomeIcon icon={faBell}
                            style={{
                            fontSize: '19px',
                              transform: 'rotate(0deg)',
                              color :'white',   
                              verticalAlign: 'middle', // Aligns with text
            
                            }} />
                                <FontAwesomeIcon icon={faHouseChimneyUser}
                            style={{
                            fontSize: '19px',
                              transform: 'rotate(0deg)',
                              color :'white',   
                              verticalAlign: 'middle', // Aligns with text
            
                            }} />
        </div>
      
    </div>
  )
}

export default AdminNavBar
