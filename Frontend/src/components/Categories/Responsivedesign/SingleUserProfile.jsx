import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../Context/UserContext';
import { useParams } from "react-router-dom"; // ✅ Import useParams to get slug from URL
import ProfileStarRating from './ProfileStarRating';

// Helper function to calculate the overall average rating
export const calculateOverallAverageRating = (averageRatings) => {
  if (!averageRatings) return 0; // Default to 0 if no ratings exist

  const { interactionBrilliance, engagement, craftedExcellence, domainExpertise } = averageRatings;

  // Convert ratings to numbers and handle NaN issues
  const ratingsArray = [
      parseFloat(interactionBrilliance) || 0,
      parseFloat(engagement) || 0,
      parseFloat(craftedExcellence) || 0,
      parseFloat(domainExpertise) || 0,
  ];

  const total = ratingsArray.reduce((sum, rating) => sum + rating, 0);
  const average = total / ratingsArray.length;

  return parseFloat(average.toFixed(1)); // Return formatted average rating as a number
};

const SingleUserProfile = () => {


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

  const { slug } = useParams(); // ✅ Extract slug from URL

  const { user , fetchUserBySlug } = useUser();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (!slug) return; // ✅ Prevent fetching if slug is missing

      const fetchUser = async () => {
          try {
              const user = await fetchUserBySlug(slug); // ✅ Fetch user by slug from URL
              setUserData(user);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchUser();
  }, [slug]); // ✅ Fetch again if slug changes

  const formattedDate = new Date(userData?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const overallRating = calculateOverallAverageRating(userData?.averageRatings);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const achievements = [
    { id: 1, title: "Fast Responder", icon: "⚡", date: "March 2025", color: "#FFD700" },
    { id: 2, title: "Top Rated Web Dev", icon: "🌟", date: "February 2025", color: "#FF5722" },
    { id: 3, title: "100 Orders Completed", icon: "🏁", date: "January 2025", color: "#2196F3" }
  ];

  // Sample skills data with proficiency levels
  const skills = [
    { name: "React", proficiency: 95 },
    { name: "JavaScript", proficiency: 90 },
    { name: "Node.js", proficiency: 85 },
    { name: "HTML/CSS", proficiency: 90 },
    { name: "TypeScript", proficiency: 80 },
    { name: "UI/UX Design", proficiency: 75 }
  ];

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Developed a full-stack e-commerce solution with React, Node.js, and MongoDB",
      image: "/api/placeholder/150/100",
      technologies: ["React", "Node.js", "MongoDB"],
      year: "2024"
    },
    {
      id: 2,
      title: "Travel Booking App",
      description: "Designed and built a responsive travel booking application with real-time updates",
      image: "/api/placeholder/150/100",
      technologies: ["React Native", "Firebase", "Maps API"],
      year: "2023"
    },
    {
      id: 3,
      title: "Corporate Dashboard",
      description: "Created a data visualization dashboard for enterprise-level analytics",
      image: "/api/placeholder/150/100",
      technologies: ["TypeScript", "D3.js", "Material UI"],
      year: "2023"
    }
  ];




  return (
    <div className='MainDiv'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '12px',

        padding: '5px',
        width: '96%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        marginTop: '50px',

      }}>
      <div className='CoverMobile'
        style={{
          width: '100%',
          margin: '0 auto',
          padding: '0',
        }}
      >

        <div className="CoverPhoto slide-from-left"

          style={{
            minHeight: '18.75rem',
            width: '100%',
            background: '#fff',
            marginTop: '18px',
            position: 'relative',
            color: '#344767',
            borderRadius: '0.75rem',
            backgroundImage: userData?.coverImg
            ? `url(${userData.coverImg})`
            : "url(/src/assets/images/small-logos/ProfileImg.jpg)", // 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',

          }}
        >


        </div>

      </div>
      <div className="ProfileContainer"
        style={{
          borderRadius: '0.75rem',
          height: 'auto',
          width: '99%',
          backgroundClip: 'border-box',
          border: '0 solid rgba(0, 0, 0, 0.125)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
          transition: 'transform 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          gap: '10px',
        }}
      >
        <div className="ProfileImg"
          style={{

            width: '100%',
            marginTop: '-30px',

          }}
        >

          <div className='Header'
            style={{
              display: 'flex',
              margin: 'auto',
              marginTop: '-30px',
              width: '99%',
              justifyContent: 'space-evenly', // Ensures equal spacing
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
              padding: '5px',
              borderRadius: '16px',
              alignItems: 'center', // Keeps everything aligned properly
            }}>

            {/* Role & Join Date */}
            <div className="RoleJoin"
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-evenly'
              }}>
              <div style={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Role</Typography>
                <Typography sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{userData?.selectedRole}</Typography>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Join</Typography>
                <Typography sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{formattedDate || 'Unknown'}</Typography>
              </div>
            </div>

            {/* Profile Image + User Name */}
            <div className="ProfileContainer"
              style={{
                display: 'flex',
                flexDirection: 'column', // Stack image & name
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <div className="ProfileImage"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  border: '2px solid #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}>
                <img
                  src={userData?.profileImg}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <Typography sx={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: '5px', // Add slight spacing
                whiteSpace: 'nowrap',
              }}>
                {userData?.firstName} {userData?.lastName}
              </Typography>
            </div>

            {/* Location & Social Links */}
            <div className="LocationSocial"
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-evenly'
              }}>
              <div style={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Location</Typography>
                <Typography sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{userData?.country || 'Not specified'}</Typography>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#5865F2',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '16px' }}>F</span>
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#1DA1F2',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '16px' }}>T</span>
                </div>
              </div>
            </div>

          </div>


        </div>
        <div className="ContentSection"
          style={{

            display: 'flex',
            width: '100%',
            padding: '10px',
            gap: '15px',
            justifyContent: 'space-between',
          }}
        >
          <div className="About"
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '20px',
              height: 'auto',
              position: 'relative',
              border: '1px solid white',
              borderRadius: '16px',
              width: '30%',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="Header"
              style={{
                display: 'flex',
                gap: '5px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div className='aboutIcon'
                style={{
                  width: '27px',
                  height: '27px',
                  backgroundColor: '#fa6565',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <span style={{ fontSize: '12px' }}>👤</span>
              </div>
              <div className="AboutTypo">
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  About
                </Typography>
              </div>
            </div>

            {/* Bio Section */}
            <div className="Desc" style={{ marginBottom: '20px' }}>
              <Typography
                sx={{
                  color: '#ffffffcc',
                  opacity: '1',
                  fontWeight: '300',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                {userData?.description}
              </Typography>
            </div>

         {/* Specialization */}
<div style={{ marginBottom: '15px' }}>
  <Typography
    sx={{
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px',
    }}
  >
    Specialization
  </Typography>
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  }}>
    {userData?.selectedSpecialization?.length > 0 ? (
      userData.selectedSpecialization.map((specialization, index) => (
        <span key={index} style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '50px',
          padding: '5px 12px',
          fontSize: '12px',
          color: 'white',
        }}>
          {specialization}
        </span>
      ))
    ) : (
      <span style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '12px',
      }}>
        No specializations listed
      </span>
    )}
  </div>
</div>


      {/* Languages */}
<div style={{ marginBottom: '15px' }}>
  <Typography
    sx={{
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px',
    }}
  >
    Languages
  </Typography>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
    {userData?.selectedLanguages?.length > 0 ? (
      userData.selectedLanguages.map((language, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '13px', color: 'white' }}>{language}</Typography>

        </div>
      ))
    ) : (
      <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
        No languages listed
      </Typography>
    )}
  </div>
</div>


      

            {/* Availability */}
            <div style={{
              marginTop: 'auto',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              padding: '10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#4CAF50',
                borderRadius: '50%'
              }}></div>
              <Typography sx={{ color: 'white', fontSize: '14px' }}>
                Available for work • {userData?.workAvailability}
              </Typography>
            </div>
          </div>
          <div className="Rank"
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '20px',
              height: 'auto',
              position: 'relative',
              border: '1px solid white',
              borderRadius: '16px',
              width: '30%',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="Header"
              style={{
                display: 'flex',
                gap: '5px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div className='rankIcon'
                style={{
                  width: '27px',
                  height: '27px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <span style={{ fontSize: '12px' }}>🏆</span>
              </div>
              <div className="RankTypo">
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  Current Rank
                </Typography>
              </div>
            </div>

            {/* Rank Level */}
            <div className="RankLevel" style={{ marginBottom: '20px', textAlign: 'center' }}>
              <Typography sx={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                Novice Level 1
              </Typography>
            </div>

            {/* Progress to Next Level */}
            <div style={{ marginBottom: '20px' }}>
              <Typography sx={{ color: 'white', fontSize: '14px', marginBottom: '5px' }}>
                Progress to Level 3
              </Typography>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '75%',
                  height: '100%',
                  backgroundColor: '#4CAF50',
                  borderRadius: '4px'
                }}></div>
              </div>
              <Typography sx={{ color: 'white', fontSize: '12px', marginTop: '5px', textAlign: 'right' }}>
                75%
              </Typography>
            </div>

            {/* Stats List */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Rating</Typography>
               <ProfileStarRating rating={overallRating} />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Completed Orders</Typography>
                <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>127</Typography>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}>
                <Typography sx={{ color: 'white', fontSize: '14px' }}>On-time Delivery</Typography>
                <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>98%</Typography>
              </div>
            </div>
          </div>
          <div className="Achievements"
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '20px',
              height: 'auto',
              position: 'relative',
              border: '1px solid white',
              borderRadius: '16px',
              width: '30%',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="Header"
              style={{
                display: 'flex',
                gap: '5px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div className='achievementIcon'
                style={{
                  width: '27px',
                  height: '27px',
                  backgroundColor: '#9C27B0',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <span style={{ fontSize: '12px' }}>🎯</span>
              </div>
              <div className="AchievementsTypo">
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  Achievements
                </Typography>
              </div>
            </div>

            {/* Achievements List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {achievements.map((achievement) => (
                <div key={achievement.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  borderLeft: `4px solid ${achievement.color}`
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '12px',
                    fontSize: '20px'
                  }}>
                    {achievement.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
                      {achievement.title}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                      Earned in {achievement.date}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
        <div className="Skills"
          style={{
            flex: 1,
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '20px',
            position: 'relative',
            border: '1px solid white',
            borderRadius: '16px',
            width: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '15px',
          }}
        >
          <div className="Header"
            style={{
              display: 'flex',
              gap: '5px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div className='skillsIcon'
              style={{
                width: '27px',
                height: '27px',
                backgroundColor: '#2196F3',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <span style={{ fontSize: '12px' }}>💻</span>
            </div>
            <div className="SkillsTypo">
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}
              >
                 Skills
              </Typography>
            </div>
          </div>

     {/* Skills List with Progress Bars */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
  {userData?.selectedSkills?.length > 0 ? (
    userData.selectedSkills.map((skill, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <Typography sx={{ color: 'white', fontSize: '14px' }}>{skill.skill}</Typography>
          <Typography sx={{ color: 'white', fontSize: '14px' }}>{skill.percentage}%</Typography>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${skill.percentage}%`,
            height: '100%',
            backgroundColor: '#2196F3',
            borderRadius: '4px'
          }}></div>
        </div>
      </div>
    ))
  ) : (
    <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
      No skills listed
    </Typography>
  )}
</div>


 
        </div>
        <div className="Projects"
      style={{
        flex: 1,
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '20px',
        position: 'relative',
        border: '1px solid white',
        borderRadius: '16px',
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="Header"
        style={{
          display: 'flex',
          gap: '5px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div className='projectsIcon'
          style={{
            width: '27px',
            height: '27px',
            backgroundColor: '#FF9800',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <span style={{ fontSize: '12px' }}>🚀</span>
        </div>
        <div className="ProjectsTypo">
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '15px',
            }}
          >
            Recent Projects
          </Typography>
        </div>
      </div>
      
      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {projects.map((project) => (
          <div key={project.id} style={{ 
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', height: '100px' }}>
              {/* Project Image */}
              <div style={{ width: '150px', height: '100px', position: 'relative' }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              {/* Project Details */}
              <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>
                    {project.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                    {project.year}
                  </Typography>
                </div>
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '8px' }}>
                  {project.description}
                </Typography>
                <div style={{ 
                  display: 'flex', 
                  gap: '5px',
                  marginTop: 'auto'
                }}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      color: 'white',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

      </div>




    </div>
  );
};

export default SingleUserProfile;