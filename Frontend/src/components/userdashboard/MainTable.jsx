import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Typography, Avatar, AvatarGroup, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUser } from '../../Context/UserContext.jsx';

function MainTable({projects}) {
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


  const projectsData = [
    {
      name: t('Projectnnnnnn'),
      members: [
        "http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg",
        "http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg",
        "http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg",
        "http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg"
      ],
      budget: t('2000$'),
      completion: 60
    },
    {
      name: t('Projectnnnnnn'),
      members: [
        "http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg",
        "http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg",
        "http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg",
        "http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg"
      ],
      budget: t('2000$'),
      completion: 60
    },

  ];





  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto', // Enable horizontal scrolling
      }}
    >
      <div
        className="Table"
        style={{
          minWidth: '800px',
          width: '100%',
          background: '#202940',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          height:  '520px',
          padding: '10px',
          boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
          border: '0 solid rgba(0, 0, 0, 0.125)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >

        <div className="GeneralHeader"

          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <Typography
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              lineHeight: '20px',
              fontSize: '15px',
              marginLeft: '25px',
              marginRight: currentLanguage === 'ar' ? '25px' : 'unset',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}
          >
            {t('Projects')}
            <span
              style={{
                display: 'block',
                alignItems: 'center',
                color: '#ffffffcc',
                fontSize: '13px',
                fontWeight: '300',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              <CheckIcon
                style={{
                  marginRight: currentLanguage === 'ar' ? '-3px' : '5px',
                  position: 'relative',
                  top: '5px',
                  color: '#1A73E8',
                }}
              />
              {t('30 done this month')}
            </span>
          </Typography>
          <MoreVertIcon
            sx={{
              color: 'white',
              marginRight: '25px',
            }}
          />
        </div>

        {/* Table Header */}
        <div className="TableHeader"

          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px',
            gap: '20px', // Add gap to ensure spacing
          }}
        >
          <div
            className="ProjectName"
            style={{
              width: '250px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                color: '#ffffffcc',
                lineHeight: '20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                marginRight: currentLanguage === 'ar' ? '25px' : 'unset',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Project Name')}
            </Typography>
          </div>
          <div
            className="Members"
            style={{
              width: '150px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                color: '#ffffffcc',
                lineHeight: '20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                marginRight: currentLanguage === 'ar' ? '25px' : 'unset',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Members')}
            </Typography>
          </div>
          <div
            className="Budget"
            style={{
              width: '120px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                color: '#ffffffcc',
                lineHeight: '20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                marginRight: currentLanguage === 'ar' ? '25px' : 'unset',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Budget')}
            </Typography>
          </div>
          <div
            className="Completion"
            style={{
              width: '200px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                color: '#ffffffcc',
                lineHeight: '20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                marginRight: currentLanguage === 'ar' ? '25px' : 'unset',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Completion')}
            </Typography>
          </div>
        </div>


        <div
          className="Line"
          style={{
            width: '100%',
            height: '1px',
            background: 'white',
            marginTop: '-50px',
          }}
        />


        {projects.map((project, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className="TableContent"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '22px',
                marginTop: '-35px',
              }}
            >
              {/* Project Name Column */}
              <div
                className="ProjectName"
                style={{
                  width: '250px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    marginRight: currentLanguage === 'ar' ? '25px' : 'unset',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                  }}
                >
                  {project.title}
                </Typography>
              </div>

              {/* Members Column */}
              <div
      className="Members"
      style={{
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AvatarGroup total={project.members.length} sx={{ cursor: 'pointer' }}>
        {/* Map over the members array and fetch the profile images */}
        {project.members.map((memberId, idx) => {
          let memberImg = ''; // Initialize member image

          // Check if the member is the buyer or seller based on their ID
          if (memberId === project.buyerId._id) {
            memberImg = project.buyerId.profileImg; // Buyer profile image
          } else if (memberId === project.sellerId._id) {
            memberImg = project.sellerId.profileImg; // Seller profile image
          }

          // Construct the full URL if the profileImg is stored locally (uploads folder)
          const profileImageUrl = memberImg && memberImg.startsWith('uploads')
            ? `${import.meta.env.VITE_BACKEND_URL}/${memberImg}` // Constructing full URL from the backend
            : memberImg;

          return (
            <Avatar
              key={idx}
              sx={{
                width: '20px',
                height: '20px',
                zIndex: idx + 1,
                '&:hover': {
                  zIndex: 5,
                },
              }}
              alt={`Team Member ${idx + 1}`}
              src={profileImageUrl || 'default-avatar-url.jpg'} // Fallback in case the image is missing
            />
          );
        })}
      </AvatarGroup>
    </div>
              {/* Budget Column */}
              <div
                className="Budget"
                style={{
                  width: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    fontFamily: '"Airbnbcereal", sans-serif',
                  }}
                >
                  {project.budget} $
                </Typography>
              </div>

              {/* Completion Column */}
              <div
                className="Completion"
                style={{
                  width: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="Empty"
                  style={{
                    width: '160px',
                    height: '6px',
                    background: 'grey',
                    borderRadius: '16px',
                    position: 'relative',
                  }}
                >
                  <div
                    className="Progress"
                    style={{
                      width: `${project.progress}%`,
                      height: '6px',
                      background: 'blue',
                      borderRadius: '16px',
                      position: 'relative',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Separator Line */}
            {index < projectsData.length - 1 && (
              <div
                className="Separator"
                style={{
                  width: '100%',
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  margin: '5px 0', // Adds spacing without affecting alignment
                }}
              />
            )}
          </div>
        ))}

      </div>
    </Box>
  );
}

export default MainTable;