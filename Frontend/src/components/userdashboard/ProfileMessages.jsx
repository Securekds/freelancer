import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Paper, List, Typography, ListItem, ListItemIcon, Button } from "@mui/material";
import { faStop, faFileImport, faComments, faFolder, faCircleInfo, faFlag, faPaperPlane, faFolderOpen, faCircleCheck, faDeleteLeft, faTrashCan, faTrash, faBellSlash, faPlay, faXmark, faPaperclip, faMicrophone, faThumbtack, faPeopleRoof, faCalendarDays, faEye, faUsers, faBookmark, faMagnifyingGlass, faPhone, faVideo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import i18n from 'i18next';
import { faGithub, faPaypal, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useUser } from '../../Context/UserContext.jsx'
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import AudioPlayer from './AudioPlayer.jsx';
import ProfileMessagesMobile from "./ProfileMessagesMobile.jsx";
import { useChat } from "../../Context/ChatContext.jsx";
import Menu from '@mui/material/Menu';
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { Slide, } from '@mui/material';
import ProjectManagment from "./ProjectManagment.jsx";







// Add this CSS to your stylesheet
const styles = `
.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-items li {
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  opacity: 0;
  list-style: none;
  cursor: pointer;
}

.menu-items li:hover {
  background: rgba(255,255,255,0.1);
}

@keyframes translateX {
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  
  80% {
    transform: translateX(-5px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.menu-item-1 {
  animation: translateX 300ms 60ms ease-in-out forwards;
}

.menu-item-2 {
  animation: translateX 300ms 120ms ease-in-out forwards;
}
`;




function ProfileMessages({ handleHowItWorkOpen, OpenChatVideoCall }) {


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

  const { user, setUser } = useUser();

  const userId = user?._id;

  const {
    messages,
    conversations,
    selectedConversation,
    selectedUser,
    selectedIndex,
    text,
    setText,
    isRecording,
    recordingTime,
    isUploading,
    messagesEndRef,
    formatLastMessageTime,
    handleSelectConversation,
    getOtherUser,
    getProfileImage,
    isUserOnline,
    getUserLastActive,
    formatMessageTime,
    formatAudioTime,
    sendMessage,
    callState,
    startRecording,
    stopRecording,
    cancelRecording,
    sendAudioMessage,
    initiateCall,
    searchQuery,
    initiateVideoCall,
    searchResults,
    setSearchQuery,
    handleSearch,
    onUserSelect,
    selectedImage,
    uploadProgress,
    loading,
    handleImageUpload,
    sendImageMessage,
    projectStatuses,
    selectedConversationId,
    setSelectedConversationId,
    resetImageSelection,
    handleDeleteConversation,
    open,
    setOpen,
    loadingStates: {
      conversations: { isLoading: conversationsLoading, error: conversationsError },
      messages: { isLoading: messagesLoading, error: messagesError },
      search: { isLoading: searchLoading, error: searchError },
    },
    gigs,
    projects,
  } = useChat();


  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
  const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
  const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');


  const iconsData = [
    {
      key: 'allChats',
      icon: faComments,
      label: t('Chats'),
      onClick: () => setSelectedSection("AllList"),
    },
    {
      key: 'work',
      icon: faFolder,
      label: t('Works'),
      onClick: () => setSelectedSection("Work"),
    },
    {
      key: 'meet',
      icon: faPeopleRoof,
      label: t('Meet'),
    },
  ];

  const iconsData2 = [
    {
      key: 'calendar',
      icon: faCalendarDays,
      label: t('Celender'),
    },
    {
      key: 'groups',
      icon: faUsers,
      label: t('Groups'),
    },
    {
      key: 'saved',
      icon: faBookmark,
      label: t('Saved'),
    },
  ];

  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuActive, setMenuActive] = useState(false);

  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    if (menuActive) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setMenuActive(false);
        setIsClosing(false);
      }, 300); // Match this to your CSS transition duration
    } else {
      // Open menu
      setMenuActive(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      if (menuActive) handleToggleMenu();
    }
  };

  useEffect(() => {
    if (menuActive) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuActive]);
  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);
    if (searchActive) setSearchValue(""); // Reset search value when closing
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };


  const icons = [
    { icon: faMagnifyingGlass, key: 'search' },
    { icon: faPhone, key: 'phone' },
    { icon: faVideo, key: 'video' },
    { icon: faEllipsisVertical, key: 'menu' },
  ];






  const [isClosing, setIsClosing] = useState(false);




  const [showChatDetails, setShowChatDetails] = useState(false);



  const [isVisible, setIsVisible] = useState(showChatDetails);




  const handleCallClick = () => {

    initiateCall(selectedUser?._id);
  };


  const handleVideoCallClick = () => {
    initiateVideoCall(selectedUser?._id);  
  };


  const handleToggleDropdown = () => {
    setOpen(!open);
  };


  const handleCloseDropdown = () => {
    setOpen(false);
  };




  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const containerRef = useRef(null);

  // Validate and handle image upload


  const simulateUpload = () => {
    if (!selectedImage) return;
    setLoading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          onImageUpload(selectedImage.file);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setUploadProgress(0);
    setLoading(false);
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const validDocumentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file && validDocumentTypes.includes(file.type)) {
      console.log('Uploaded document:', file);
      // Add your document upload logic here
      setOpen(false);
    } else {
      alert('Please upload a valid document (PDF, DOC, DOCX, TXT, XLS, XLSX)');
    }
  };


  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const validVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];

    if (file && validVideoTypes.includes(file.type)) {
      console.log('Uploaded video:', file);
      // Add your video upload logic here
      setOpen(false);
    } else {
      alert('Please upload a valid video (MP4, MPEG, MOV, AVI)');
    }
  };


  const [selectedSection, setSelectedSection] = useState("AllList");


  // Log the extracted projects and gigs
  useEffect(() => {
    console.log("📌 All Conversations:", conversations);
    console.log("📌 Extracted Projects:", projects);
    console.log("📌 Extracted Gigs:", gigs);
  }, [projects, gigs, conversations]);


  return (

    <>
      {isSmallScreen ? (
        <>
          <ProfileMessagesMobile handleHowItWorkOpen={handleHowItWorkOpen} />
        </>
      ) : (
        <>

          <div className='MainContainer slide-from-left'
            style={{
              width: '96%',
              height: '700px',
              marginTop: isTabletScreen ? '90px' : '30px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              zIndex: '11',
              marginBottom: '40px',
              backgroundClip: 'border-box',
              display: 'flex',
              position: 'relative',
              alignItems : 'center',
              overflow: 'hidden'

            }}

          >
            <div className="SideBar"
              style={{
                width: isLargeScreen ? '10%' :
                  isTabletScreen ? '100%' :

                    '7%',
                height: 'auto',
                display: 'flex',
                background: isTabletScreen ? 'rgba(0, 0, 0, 0.3)' : 'unset',
                flexDirection: isTabletScreen ? 'row' : 'column',
                position: isTabletScreen ? 'absolute' : 'unset',
                borderRadius: isTabletScreen ? '20px' : 'unset',
                top: '-10%',
                alignItems: 'center',
                padding: '15px',
                gap: isLargeScreen ? '60px' : '45px',
                



              }}

            >
              <div className="ChatLogo">
                <img width={50} src="https://res.cloudinary.com/damicjacf/image/upload/v1736864300/wechat_dk28vw.png" alt="" />
              </div>
              <div className="IconContainer"
                style={{
                  display: 'flex',
                  flexDirection: isTabletScreen ? 'row' : 'column',
                  alignItems: 'center',
                  gap: isLargeScreen ? '50px' : '27px',
                }}
              >
                {iconsData.map(({ key, icon, label, onClick }) => (
                  <div
                    key={key}
                    className={key}
                    style={{
                      display: 'flex',
                      flexDirection: isLargeScreen ? 'row' : 'column',
                      alignItems: 'center',
                      gap: '9px',
                      cursor: 'pointer',
                      position: 'relative', // ✅ Ensure badge is positioned correctly
                    }}
                    onClick={onClick} // ✅ Attach the click event
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      style={{
                        transform: 'rotate(0deg)',
                        fontSize: '21px',
                        color: '#fff',
                        stroke: 4,
                      }}
                    />

                    {/* ✅ Show badge only if there is an inactive project */}
                    {key === "work" && projectStatuses === "Inactive" && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          width: '15px',
                          height: '15px',
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        !
                      </span>
                    )}

                    <Typography
                      sx={{
                        color: '#ffffff',
                        fontFamily:
                          currentLanguage === 'ar'
                            ? '"Droid Arabic Kufi", serif'
                            : '"Airbnbcereal", sans-serif',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </Typography>
                  </div>
                ))}

              </div>

              <div className="Divider"
                style={{
                  width: isTabletScreen ? '60%' : '80%',
                  height: '2px',
                  background: 'grey',

                }}
              >

              </div>
              <div className="IconContainerUnderDivider"
                style={{
                  display: 'flex',
                  flexDirection: isTabletScreen ? 'row' : 'column',
                  alignItems: 'center',
                  gap: isLargeScreen ? '50px' : '27px',
                }}
              >
                {iconsData2.map(({ key, icon, label }) => (
                  <div
                    key={key}
                    className={key}
                    style={{
                      display: 'flex',
                      flexDirection: isLargeScreen ? 'row' : 'column',
                      alignItems: 'center',
                      gap: '9px',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      style={{
                        transform: 'rotate(0deg)',
                        fontSize: '21px',
                        color: '#fff',
                        stroke: 4,
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#ffffff',
                        fontFamily:
                          currentLanguage === 'ar'
                            ? '"Droid Arabic Kufi", serif'
                            : '"Airbnbcereal", sans-serif',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </Typography>
                  </div>
                ))}
              </div>

            </div>
            {selectedSection === "AllList" && (
              <div className="ChatAppContainer"
                style={{
                  width: showChatDetails ? '62%' :
                    isMediumScreen ? '100%' :
                      isTabletScreen ? '100%' :

                        '90%',
                  height: '700px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '20px',
                  borderRadius: '20px',

                  gap: '20px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  backgroundClip: 'border-box',
                }}
              >
                <div className="ChatAppHeader"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    gap: '25px',

                  }}
                >
                  {!showChatDetails && (
                    <>
                      <div className="InputSearchDiv"
                        style={{
                          height: '50px',
                          width: '34%',

                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '15px',
                          borderBottomRightRadius: showChatDetails ? 'none' : 'unset',
                          borderBottomLeftRadius: showChatDetails ? 'none' : 'unset',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'relative',
                          padding: '10px',
                          gap: '10px',
                        }}
                      >
                        <div
                          className="SearchIcon"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '13px',
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{
                              transform: 'rotate(0deg)',
                              fontSize: '21px',
                              color: '#fff',
                              opacity: 0.3,
                            }}
                          />
                          <TextField
                            variant="standard"
                            placeholder={t('Search')}
                            value={searchQuery}
                            onChange={(e) => {
                              const input = e.target;
                              const arabicRegex = /[\u0600-\u06FF]/;
                              input.style.fontFamily = arabicRegex.test(input.value)
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif';
                              input.style.fontWeight = '400';

                              setSearchQuery(input.value); // Update state
                              handleSearch(input.value); // Call search function
                            }}
                            InputProps={{
                              disableUnderline: true, // Remove underline
                            }}
                            sx={{
                              input: {
                                color: '#fff', // Text color
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontSize: '14px',
                              },
                              '& .MuiInputBase-input::placeholder': {
                                color: '#fff', // Placeholder color
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              },
                            }}
                            fullWidth
                          />
                          {searchQuery.trim() && searchResults.length > 0 && (
                            <div className=""
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                width: "100%",
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(5px)',
                                height: 'auto',
                                maxHeight: '400px',
                                zIndex: 10,
                                borderRadius: "5px",
                                overflow: "auto",
                                overflowX: 'hidden',
                              }}
                            >

                              <List>
                                {searchResults.map((user, index) => (
                                  <ListItem
                                    key={user._id}
                                    onClick={() => onUserSelect(user)}
                                    style={{
                                      height: '66px',
                                      width: '100%',
                                      background: 'transparent',
                                      borderRadius: '15px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: '7px',
                                      gap: '10px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {/* Profile Image */}
                                    <div
                                      style={{
                                        width: '63px',
                                        height: '51px',
                                        background: 'white',
                                        borderRadius: '14px',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <img
                                        src={getProfileImage(user?.profileImg)}
                                        alt="User Profile"
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                        }}
                                      />
                                    </div>

                                    {/* User Info */}
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '90%',
                                        gap: '2px',
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          width: '98%',
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            color: '#ffffff',
                                            fontFamily: user.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                                              ? '"Droid Arabic Kufi", serif'
                                              : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            textTransform: 'capitalize',
                                          }}
                                        >
                                          {user.firstName} {user.lastName}
                                        </Typography>
                                      </div>
                                    </div>
                                  </ListItem>
                                ))}
                              </List>
                            </div>
                          )}




                        </div>

                      </div>
                    </>
                  )}
                  <div className="Divider"
                    style={{
                      width: '1px',
                      height: 'auto',
                      background: 'grey',
                    }}
                  >

                  </div>

                  <div className="Div"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >

                    <div className="ChatInfo "

                      style={{


                        display: "flex",
                        flexDirection: 'column',
                        gap: "3px",
                      }}
                    >
                      {selectedUser && (
                        <>
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              fontFamily: currentLanguage === "ar"
                                ? '"Droid Arabic Kufi", serif'
                                : '"Airbnbcereal", sans-serif',
                            }}
                          >
                            {selectedUser?.firstName} {selectedUser?.lastName}

                          </Typography>


                        </>
                      )}

                      <div className="Div"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >

                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "13px",
                            opacity: "0.5",
                            fontFamily: currentLanguage === "ar"
                              ? '"Droid Arabic Kufi", serif'
                              : '"Airbnbcereal", sans-serif',
                          }}
                        >
                        {isUserOnline(selectedUser?._id) ? t('Online') : t('Offline')}
                        </Typography>
                        {/* Online Status Badge */}
                        {isUserOnline(selectedUser?._id) && (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "#4CAF50", // Green for active
                              border: "2px solid white",
                            }}

                          />

                        )}
                      </div>
                    </div>
                    {projectStatuses === "In Progress" && (

                      <div className="div"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                          gap: '1px',

                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: '14px',
                            textWrap: 'nowrap',
                            fontFamily: currentLanguage === "ar"
                              ? '"Droid Arabic Kufi", serif'
                              : '"Airbnbcereal", sans-serif',
                          }}

                        >
                          Project Status:

                        </Typography>
                        <Button
                          sx={{


                            color: "white",
                            backgroundColor: "rgba(255, 153, 0, 0.2)", // Orange
                            boxShadow:
                              "0px 4px 6px rgba(255, 153, 0, 0.2), 0px 1px 3px rgba(255, 153, 0, 0.3)",
                            borderRadius: "16px",
                            height: "25px",
                            display: "flex",
                            justifyContent: "center",
                            "&:hover": {
                              backgroundColor: "rgba(255, 153, 0, 0.2)",
                              boxShadow:
                                "0px 4px 6px rgba(255, 153, 0, 0.2), 0px 1px 3px rgba(255, 153, 0, 0.3)",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "rgb(255, 153, 0)", // Orange text
                              flex: 1,
                              fontSize: "12px",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              fontFamily:
                                t("currentLanguage") === "ar"
                                  ? '"Droid Arabic Kufi", serif'
                                  : '"Airbnbcereal", sans-serif',
                              textAlign: "center",
                              textWrap: 'nowrap',
                            }}
                          >
                            {t("In Progress")}
                          </Typography>
                        </Button>
                      </div>
                    )}
                    {projectStatuses === "Inactive" && (

                      <div className="div"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                          gap: '5px',
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: '15px',
                            textWrap: 'nowrap',
                            fontFamily: currentLanguage === "ar"
                              ? '"Droid Arabic Kufi", serif'
                              : '"Airbnbcereal", sans-serif',
                          }}

                        >
                          Project Status:

                        </Typography>
                        <Button
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(220, 38, 38, 0.15)", // Light red background with transparency
                            boxShadow:
                              "0px 4px 6px rgba(220, 38, 38, 0.15), 0px 1px 3px rgba(220, 38, 38, 0.2)",
                            borderRadius: "16px",
                            height: "32px",
                            display: "flex",
                            justifyContent: "center",
                            "&:hover": {
                              backgroundColor: "rgba(220, 38, 38, 0.2)", // Slightly darker on hover
                              boxShadow:
                                "0px 4px 6px rgba(220, 38, 38, 0.15), 0px 1px 3px rgba(220, 38, 38, 0.2)",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "rgb(220, 38, 38)", // Modern red text that matches the background
                              flex: 1,
                              fontSize: "14px",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              fontFamily:
                                t("currentLanguage") === "ar"
                                  ? '"Droid Arabic Kufi", serif'
                                  : '"Airbnbcereal", sans-serif',
                              textAlign: "center",
                              textWrap: 'nowrap',
                            }}
                          >
                            {t("Inactive")}
                          </Typography>
                        </Button>
                      </div>
                    )}
                    <>
                      <style>{styles}</style>
                      <div className="ChatInfoIcons"

                        style={{

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '35px',
                        }}
                      >
                        {icons.map(({ icon, key }, index) => (
                          <div
                            key={key}
                            style={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            {index === 0 ? (
                              <div className={`search-wrapper ${searchActive ? "active" : ""}`}

                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "50px",
                                  width: searchActive
                                    ? isMediumScreen
                                      ? "230px"
                                      : "210px"
                                    : "50px",
                                  overflow: "hidden",
                                  marginRight: "-20px",
                                  background: searchActive ? "rgba(255,255,255,0.1)" : "transparent",
                                  borderRadius: searchActive ? "15px" : "none",
                                  transition: searchActive
                                    ? "all 0.5s cubic-bezier(0.000, 0.105, 0.035, 1.570)"
                                    : "all 0.3s ease-in-out",
                                }}
                              >
                                <input
                                  type="text"
                                  value={searchValue}
                                  onChange={(e) => {
                                    handleSearchInputChange(e);
                                    const input = e.target;
                                    const arabicRegex = /[\u0600-\u06FF]/;
                                    input.style.fontFamily = arabicRegex.test(input.value)
                                      ? '"Droid Arabic Kufi", serif'
                                      : '"Airbnbcereal", sans-serif';
                                    input.style.fontWeight = '400';
                                  }}
                                  className="search-input"
                                  placeholder={t('Search')}
                                  style={{
                                    width: "100%",
                                    height: "50px",
                                    padding: "0 70px 0 20px",
                                    opacity: searchActive ? "1" : "0",
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: "16px",
                                    color: "#FFF",
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    transform: searchActive ? "translateY(0)" : "translateY(60px)",
                                    transition: searchActive
                                      ? "all 0.3s cubic-bezier(0.000, 0.105, 0.035, 1.570) 0.3s"
                                      : "all 0.3s ease-in-out",
                                  }}
                                />
                                <button
                                  onClick={handleSearchToggle}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "50px",
                                    height: "50px",
                                    background: "transparent",
                                    borderRadius: "50%",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease-in-out",
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={searchActive ? faXmark : faMagnifyingGlass}
                                    style={{
                                      fontSize: "20px",
                                      color: searchActive ? "rgb(254, 95, 85)" : "#fff",
                                      transform: "rotate(0)",
                                      transition: "all 0.4s cubic-bezier(0.650, -0.600, 0.240, 1.650)",
                                      opacity: searchActive ? "1" : "0.3",
                                      position: searchActive ? "absolute" : "unset",
                                      right: searchActive ? "10px" : "unset",
                                    }}
                                  />
                                </button>
                              </div>
                            ) : index === icons.length - 1 ? (
                              <div className="menu-wrapper" ref={menuRef}>
                                <FontAwesomeIcon className=""
                                  icon={icon}
                                  onClick={() => {
                                    if (menuActive) {
                                      setIsClosing(true); // Trigger closing animation
                                      setTimeout(() => {
                                        setMenuActive(false); // Hide the menu after the animation
                                        setIsClosing(false); // Reset the closing state
                                      }, 300); // Match this timeout with the CSS transition duration
                                    } else {
                                      setMenuActive(true); // Open the menu
                                    }
                                  }}
                                  style={{
                                    transform: "rotate(0deg)",
                                    fontSize: "20px",
                                    color: "#fff",
                                    cursor: "pointer",
                                    opacity: menuActive ? 1 : 0.3,
                                  }}
                                />
                                {menuActive && (
                                  <div className={`menu-items ${isClosing ? "closing" : ""}`}

                                    style={{
                                      position: "absolute",
                                      top: "100%",
                                      right: currentLanguage === 'ar' ? '-5350%' : "40%",
                                      background: "rgba(0, 0, 0, 0.9)",
                                      border: "1px solid white",
                                      borderRadius: currentLanguage === 'ar' ? "00px 20px 20px 20px" : "20px 0px 20px 20px",
                                      marginTop: "10px",
                                      minWidth: "270px",
                                      zIndex: 1000,
                                      padding: 0,
                                      transition: menuActive
                                        ? "all 0.5s cubic-bezier(0.000, 0.105, 0.035, 1.570)"
                                        : "all 0.3s ease-in-out",
                                    }}
                                  >
                                    <div className="ListContainer"
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                        padding: '15px',
                                        transition: "all 0.3s ease-in-out",
                                      }}
                                    >
                                      <div className="Option1"
                                        style={{
                                          width: '100%',
                                          height: '50px',
                                          background: 'rgba(255,255,255,0.1)',
                                          borderRadius: '16px',
                                          display: 'flex',
                                          padding: '5px',
                                          cursor: 'pointer',
                                          gap: '8px',
                                          transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        onClick={() => setShowChatDetails(true)} // Show ChatDetails on click
                                      >
                                        <div className="OpetionIcon"
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgb(42, 84, 113)',
                                            borderRadius: '16px',

                                          }}
                                        >
                                          <FontAwesomeIcon icon={faCircleInfo}
                                            style={{
                                              transform: 'rotate(0deg)',
                                              fontSize: '24px',
                                              color: '#5BC1FD',
                                            }} // Reset any unwanted rotation
                                          />

                                        </div>
                                        <div className="DetailsTypo">
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '14px',
                                              fontWeight: 'bold',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Chat Details')}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '13px',
                                              opacity: '0.5',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('See more infomation')}
                                          </Typography>
                                        </div>

                                      </div>
                                      <div className="Option2"
                                        style={{
                                          width: '100%',
                                          height: '50px',
                                          background: 'rgba(255,255,255,0.1)',
                                          borderRadius: '16px',
                                          display: 'flex',
                                          padding: '5px',
                                          gap: '8px',
                                          cursor: 'pointer',
                                          transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                      >
                                        <div className="OpetionIcon"
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgb(79, 25, 65)',
                                            borderRadius: '16px',

                                          }}
                                        >
                                          <FontAwesomeIcon icon={faTrash}
                                            style={{
                                              transform: 'rotate(0deg)',
                                              fontSize: '18px',
                                              color: 'rgb(194, 40, 132)',
                                            }} // Reset any unwanted rotation
                                          />

                                        </div>
                                        <div className="DetailsTypo"
                                          onClick={handleDeleteConversation}
                                        >
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '14px',
                                              fontWeight: 'bold',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Delete Chat')}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '13px',
                                              opacity: '0.5',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Remove from chat list')}
                                          </Typography>
                                        </div>

                                      </div>
                                      <div className="Option3"
                                        style={{
                                          width: '100%',
                                          height: '50px',
                                          background: 'rgba(255,255,255,0.1)',
                                          borderRadius: '16px',
                                          display: 'flex',
                                          padding: '5px',
                                          gap: '8px',
                                          cursor: 'pointer',
                                          transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                      >
                                        <div className="OpetionIcon"
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgb(61, 45, 111)',
                                            borderRadius: '16px',

                                          }}
                                        >
                                          <FontAwesomeIcon icon={faDeleteLeft}
                                            style={{
                                              transform: 'rotate(0deg)',
                                              fontSize: '20px',
                                              color: 'rgb(139, 92, 246)',
                                            }} // Reset any unwanted rotation
                                          />

                                        </div>
                                        <div className="DetailsTypo">
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '14px',
                                              fontWeight: 'bold',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Clear Chat')}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '13px',
                                              opacity: '0.5',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Delete all messages')}
                                          </Typography>
                                        </div>

                                      </div>
                                      <div className="Option4"
                                        style={{
                                          width: '100%',
                                          height: '50px',
                                          background: 'rgba(255,255,255,0.1)',
                                          borderRadius: '16px',
                                          display: 'flex',
                                          padding: '5px',
                                          gap: '8px',
                                          cursor: 'pointer',
                                          transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                      >
                                        <div className="OpetionIcon"
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgb(27, 161, 152)',
                                            borderRadius: '16px',

                                          }}
                                        >
                                          <FontAwesomeIcon icon={faFlag}
                                            style={{
                                              transform: 'rotate(0deg)',
                                              fontSize: '18px',
                                              color: 'rgb(38, 238, 195)',
                                            }} // Reset any unwanted rotation
                                          />

                                        </div>
                                        <div className="DetailsTypo">
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '14px',
                                              fontWeight: 'bold',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Report Chat')}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: "white",
                                              fontSize: '13px',
                                              opacity: '0.5',
                                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Report this chat')}
                                          </Typography>
                                        </div>

                                      </div>

                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <FontAwesomeIcon
                                icon={icon}
                                onClick={
                                  index === 1
                                    ? handleCallClick
                                    : index === 2
                                      ? handleVideoCallClick
                                      : undefined
                                }
                                style={{
                                  transform: "rotate(0deg)",
                                  fontSize: "20px",
                                  color: "#fff",
                                  cursor: "pointer",
                                  opacity: 0.3,
                                }}
                              />

                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  </div>










                </div>
                <div className="UsersConverstationList"
                  style={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    gap: '25px',
                  }}
                >
                  {!showChatDetails && (
                    <>
                      <div className="UserListConversations "
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '34%',
                          minWidth: '34%', // Add this to maintain width even when empty
                          cursor: 'pointer',
                          gap: '10px',
                        }}
                      >
                        {conversationsLoading ? (
                          // Skeleton Loading State
                          [...Array(5)].map((_, index) => (
                            <div
                              key={index}
                              style={{
                                height: '66px',
                                width: '100%',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '7px',
                                gap: '10px',
                              }}
                            >
                              {/* Skeleton Profile Image */}
                              <div
                                style={{
                                  width: '63px',
                                  height: '51px',
                                  background: 'rgba(255,255,255,0.2)',
                                  borderRadius: '14px',
                                }}
                              />

                              {/* Skeleton Text */}
                              <div style={{ width: '100%' }}>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  marginBottom: '5px'
                                }}>
                                  <div
                                    style={{
                                      width: '40%',
                                      height: '15px',
                                      background: 'rgba(255,255,255,0.2)',
                                    }}
                                  />
                                  <div
                                    style={{
                                      width: '20%',
                                      height: '15px',
                                      background: 'rgba(255,255,255,0.2)',
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    width: '70%',
                                    height: '15px',
                                    background: 'rgba(255,255,255,0.2)',
                                  }}
                                />
                              </div>
                            </div>
                          ))
                        ) : conversationsError ? (
                          // Error State
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              textAlign: 'center',
                              fontSize: '13px',
                              opacity: '0.5',
                              padding: '20px',
                            }}
                          >
                            {"Failed to load conversations"}
                          </Typography>

                        ) : conversations.length > 0 ? (
                          conversations.map((conversation, index) => {
                            console.log("🔹 Conversation Object:", conversation); // Debugging

                            const otherUser = getOtherUser(conversation); // Get the other user's details
                            const isOnline = isUserOnline(otherUser?._id);

                            return (
                              <div
                                key={conversation._id}
                                className="ConverSation1"
                                onClick={() => handleSelectConversation(conversation, index)}
                                style={{
                                  height: '66px',
                                  width: '100%',
                                  background: index === selectedIndex ? 'rgba(255,255,255,0.1)' : 'transparent',
                                  borderRadius: '15px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '7px',
                                  gap: '10px',
                                }}
                              >
                                <div className="UserProfileImg"

                                  style={{
                                    position: 'relative', // Add this for badge positioning
                                    width: '63px',
                                    height: '51px',
                                    background: 'white',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <img
                                    src={getProfileImage(otherUser?.profileImg)}
                                    alt="User Profile"
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                  {/* Online Status Badge */}
                                  {isOnline && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '2px',
                                        right: '1px',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#4CAF50',
                                        border: '2px solid white',
                                      }}
                                    />
                                  )}
                                </div>

                                <div className="UserInfo"

                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '90%',
                                    gap: '2px',
                                  }}
                                >
                                  <div
                                    className="TYpos"
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      width: '98%',
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        color: '#ffffff',
                                        fontFamily: otherUser?.firstName && /[\u0600-\u06FF]/.test(otherUser.firstName)
                                          ? '"Droid Arabic Kufi", serif'
                                          : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                        textTransform: 'capitalize',
                                      }}
                                    >
                                      {otherUser?.firstName} {otherUser?.lastName}
                                    </Typography>
                                    <Typography
                                      style={{
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: '#ffffff',
                                        opacity: '0.5',
                                      }}
                                    >
                                      {formatLastMessageTime(conversation.updatedAt)}
                                    </Typography>
                                  </div>

                                  <div
                                    className="Time"
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      width: '97%',
                                      gap: '2px',
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        color: '#ffffff',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '13px',
                                        opacity: '0.5',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '180px',
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: 'inline-block',
                                          maxWidth: '160px',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          fontFamily : currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif'

                                        }}
                                      >
                                      {conversation.lastMessage || t('No messages yet')}

                                      </span>
                                    </Typography>
                                    {conversation.unreadCount > 0 && (
                                      <div className="Iconsz"

                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                        }}
                                      >
                                        <span
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50px',
                                            background: '#76c1fb',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            opacity: '2',
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: '#ffffff',
                                              fontFamily: '"Airbnbcereal", sans-serif',
                                              fontSize: '12px',
                                            }}
                                          >
                                            {conversation.unreadCount || '0'}
                                          </span>
                                        </span>
                                        <FontAwesomeIcon
                                          icon={faThumbtack}
                                          style={{
                                            transform: 'rotate(50deg)',
                                            fontSize: '14px',
                                            color: '#fff',
                                            opacity: '0.5',
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <Typography
                            sx={{
                              color: '#ffffff',
                             fontFamily : currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              textAlign: 'center',
                              fontSize: '13px',
                              opacity: '0.5',
                            }}
                          >
                            {t('No conversations found.')}
                          </Typography>
                        )}

                      </div>
                    </>
                  )}
                  <div className="Divider"
                    style={{
                      width: '1px',
                      height: 'auto',
                      background: 'grey',
                    }}
                  >

                  </div>
                  <div className="MessageSecoContainer"

                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '600px'
                    }}>


                    <div className="MessagesSec"

                      style={{
                        width: '100%',
                        height: 'calc(100% - 70px)',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        paddingRight: currentLanguage === 'ar' ? '0px' : '20px',
                        paddingLeft: currentLanguage === 'ar' ? '0px' : '0',
                        marginRight: currentLanguage === 'ar' ? '-10px' : '0',
                        marginLeft: showChatDetails ? '0' : currentLanguage === 'ar' ? '0' : '-10px',
                      }}
                    >
                      <div className="SenderAndRecieverContainer"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          gap: '20px',
                          direction : currentLanguage === 'ar'? 'ltr' : 'unset',
                          padding: '5px',
                        }}
                      >
                        {messagesLoading ? (
                          // Skeleton Loading State for Messages
                          [...Array(5)].map((_, index) => (
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                                gap: '6px',
                              }}
                            >
                              {/* Skeleton Profile Image */}
                              {index % 2 !== 0 && (
                                <div
                                  style={{
                                    width: '58px',
                                    height: '54px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '14px',
                                  }}
                                />
                              )}

                              {/* Skeleton Message */}
                              <div
                                style={{
                                  backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.1)' : '#6c7bff',
                                  borderRadius: index % 2 === 0
                                    ? (currentLanguage === 'ar' ? '20px 20px 20px 0px' : '20px 20px 0px 20px')
                                    : (currentLanguage === 'ar' ? '20px 20px 0px 20px' : '20px 20px 20px 0px'),
                                  padding: '5px 12px',
                                  maxWidth: '80%',
                                  minWidth: '120px',
                                  width: 'fit-content',
                                  height: '60px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '80%',
                                    height: '15px',
                                    background: 'rgba(255,255,255,0.2)',
                                  }}
                                />
                                <div
                                  style={{
                                    width: '60%',
                                    height: '15px',
                                    background: 'rgba(255,255,255,0.2)',
                                  }}
                                />
                              </div>

                              {/* Skeleton Profile Image */}
                              {index % 2 === 0 && (
                                <div
                                  style={{
                                    width: '58px',
                                    height: '54px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '14px',
                                  }}
                                />
                              )}
                            </div>
                          ))
                        ) : messagesError ? (
                          // Error State for Messages
                          <Typography
                            sx={{
                              color: 'white',
                              fontSize: '14px',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              textAlign: 'center',
                              opacity: 0.7,
                              marginTop: '20px',
                            }}
                          >
                            {messagesError}
                          </Typography>
                        ) : messages.length === 0 ? (
                          // Empty State for Messages
                          <Typography
                            sx={{
                              color: 'white',
                              fontSize: '14px',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              textAlign: 'center',
                              opacity: 0.7,
                              marginTop: '20px',
                            }}
                          >
                            {currentLanguage === 'ar' ? 'ابدأ رسالتك الأولى' : 'Start your first message'}
                          </Typography>
                        ) : (
                          // Render Messages
                          messages.map((message) => {
                            const isCurrentUser = message.senderId._id === user?._id;
                            const formattedTime = formatMessageTime(message.createdAt);
                            const hasContent = message.text || message.imageUrl || message.audioUrl;


                            return (
                              <div
                                key={message._id}
                                className={isCurrentUser ? "ChatContentContainerSenderMe" : "ChatContentContainerReceiver"}
                                style={{
                                  display: 'flex',
                                  width: '100%',
                                  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                  gap: '6px',
                                }}
                              >
                                {/* Profile Image - Show on left for receiver */}
                                {!isCurrentUser && (
                                  <div 
                                    className="UserProfileImg"
                                    style={{
                                      width: '58px',
                                      height: '54px',
                                      background: 'white',
                                      borderRadius: '14px',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <img
                                      src={getProfileImage(message.senderId?.profileImg)}
                                      alt="User Profile"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  </div>
                                )}

                                {/* Message Info */}
                                <div
                                  style={{
                                    backgroundColor: isCurrentUser ? 'rgba(255,255,255,0.1)' : '#6c7bff',
                                    borderRadius: isCurrentUser
                                      ? (currentLanguage === 'ar' ? '20px 20px 0px 20px' : '20px 20px 0px 20px')
                                      : (currentLanguage === 'ar' ? '20px 20px 20px 0px' : '20px 20px 20px 0px'),
                                    padding: '5px 12px',
                                    maxWidth: '80%',
                                    minWidth: '120px',
                                    width: 'fit-content',
                                    height: 'auto',
                                    direction : currentLanguage === 'ar'? 'rtl' : 'unset',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: 'white',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                                  }}
                                >
                                  <div className="UserName">
                                    <Typography
                                      sx={{
                                        color: '#ffffff',
                                        fontFamily: message.senderId.firstName && /[\u0600-\u06FF]/.test(message.senderId.firstName)
                                          ? '"Droid Arabic Kufi", serif'
                                          : '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap',
                                        textTransform: 'capitalize',
                                      }}
                                    >
                                      {message.senderId.firstName} {message.senderId.lastName}
                                    </Typography>
                                  </div>
                                  <div className="Message">
                                    {message.messageType === 'audio' && message.audioUrl ? (
                                      // Audio message UI
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '5px 0',
                                        minWidth: '180px',
                                      }}>
                                        <AudioPlayer
                                          audioUrl={message.audioUrl}
                                          duration={message.duration}
                                        />
                                      </div>
                                    ) : message.messageType === 'image' && message.imageUrl ? (
                                      // Image message UI
                                      <div
                                        style={{
                                          maxWidth: '250px',
                                          maxHeight: '200px',
                                          borderRadius: '10px',
                                          overflow: 'hidden',
                                        }}
                                      >
                                        <img
                                          src={message.imageUrl}
                                          alt="Sent message"
                                          style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                          }}
                                          onClick={() => window.open(message.imageUrl, '_blank')}
                                        />
                                      </div>
                                    ) : (
                                      // Regular text message
                                      <Typography
                                        sx={{
                                          color: '#ffffff',
                                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                          fontSize: '14px',
                                          whiteSpace: 'pre-wrap',
                                          wordBreak: 'break-word',
                                          overflowWrap: 'break-word',
                                          display: 'block',
                                        }}
                                      >
                                        {message.text}
                                      </Typography>
                                    )}
                                  </div>
                                  <div className="Time"
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      alignItems: 'center',
                                      gap: '5px',
                                    }}
                                  >
                                    {isCurrentUser && message.readBy && message.readBy.length > 0 && (
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        style={{
                                          transform: 'rotate(0deg)',
                                          fontSize: '12px',
                                          marginLeft: '2px',
                                          color: 'rgb(91, 193, 253)',
                                        }}
                                      />
                                    )}
                                    <Typography
                                      style={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: '#ffffff',
                                        opacity: '0.5',
                                      }}
                                    >
                                      {currentLanguage === 'ar' ? (
                                        <>
                                          منذ{' '}
                                          <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>
                                            {formattedTime.split(' ')[0]}
                                          </span>
                                          {' '}{formattedTime.includes('m') ? 'دقيقة' :
                                            formattedTime.includes('h') ? 'ساعة' : 'يوم'}
                                        </>
                                      ) : (
                                        formattedTime
                                      )}
                                    </Typography>
                                  </div>
                                </div>

                                {/* Profile Image - Show on right for sender */}
                                {isCurrentUser && (
                                  <div
                                    className="UserProfileImg"
                                    style={{
                                      width: '58px',
                                      height: '54px',
                                      background: 'white',
                                      borderRadius: '14px',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <img
                                      src={getProfileImage(message.senderId?.profileImg)}
                                      alt="User Profile"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                        {/* Scroll to the bottom of messages */}
                        <div ref={messagesEndRef} />
                      </div>




                      <div className="InputSec"

                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: showChatDetails ? '-1%' : isLargeScreen ? '-2%' : -10,
                          right: 0,
                          height: '50px',
                          width: currentLanguage === 'ar' ? '105%' : '100%',
                          zIndex: '1111111111111',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: currentLanguage === 'ar' ? '-15px' : '0',
                          padding: '10px',
                        }}
                      >
                        <div className="AttachmentIcon "

                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            flex: 1,

                          }}
                        >

                          <div style={{ position: 'relative' }} ref={containerRef}>
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              onClick={handleToggleDropdown}
                              style={{
                                transform: 'rotate(0deg)',
                                fontSize: '17px',
                                color: '#5BC1FD',
                                cursor: 'pointer',
                                stroke: 4,
                                flexShrink: 0,
                              }}
                            />

                            <Slide direction="up" in={open} container={containerRef.current} mountOnEnter unmountOnExit>
                              <div>
                                <input
                                  type="file"
                                  ref={imageInputRef}
                                  style={{ display: 'none' }}
                                  accept="image/jpeg,image/png,image/gif,image/webp"
                                  onChange={handleImageUpload}
                                />
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  style={{ display: 'none' }}
                                  accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                                  onChange={handleFileUpload}
                                />
                                <input
                                  type="file"
                                  ref={videoInputRef}
                                  style={{ display: 'none' }}
                                  accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo"
                                  onChange={handleVideoUpload}
                                />

                                <Paper
                                  style={{
                                    position: "absolute",
                                    bottom: "50px",
                                    left: 0,
                                    width: "220px",
                                    borderRadius: "12px",
                                    zIndex: 1000,
                                    overflow: "hidden",
                                    backgroundColor: "rgba(20, 20, 20, 0.95)",
                                    backdropFilter: "blur(10px)",
                                    WebkitBackdropFilter: "blur(10px)",
                                    border: "1px solid #555",
                                    padding: "8px 0",
                                  }}
                                >
                                  <div style={{ display: "flex", flexDirection: "column" }}>
                                    {/* Upload Image */}
                                    <MenuItem
                                      onClick={() => {
                                        imageInputRef.current.click();

                                      }}
                                      style={{
                                        color: "#ffffff",
                                        fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        padding: "10px 16px",
                                      }}
                                    >
                                      <ListItemIcon>
                                        <ImageIcon style={{ color: "#5BC1FD" }} />
                                      </ListItemIcon>
                                      <Typography
                                        sx={{
                                          color: "white",
                                          fontWeight: 500,
                                          fontSize: "15px",
                                          fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {t("Share Image")}
                                      </Typography>
                                    </MenuItem>

                                    {/* Send a File */}
                                    <MenuItem
                                      onClick={() => fileInputRef.current.click()}
                                      style={{
                                        color: "#ffffff",
                                        fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        padding: "10px 16px",
                                      }}
                                    >
                                      <ListItemIcon>
                                        <AttachFileIcon style={{ color: "#5BC1FD" }} />
                                      </ListItemIcon>
                                      <Typography
                                        sx={{
                                          color: "white",
                                          fontWeight: 500,
                                          fontSize: "15px",
                                          fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {t("Share Document")}
                                      </Typography>
                                    </MenuItem>

                                    {/* Send a Video */}
                                    <MenuItem
                                      onClick={() => videoInputRef.current.click()}
                                      style={{
                                        color: "#ffffff",
                                        fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        padding: "10px 16px",
                                      }}
                                    >
                                      <ListItemIcon>
                                        <VideocamIcon style={{ color: "#5BC1FD" }} />
                                      </ListItemIcon>
                                      <Typography
                                        sx={{
                                          color: "white",
                                          fontWeight: 500,
                                          fontSize: "15px",
                                          fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {t("Share Video")}
                                      </Typography>
                                    </MenuItem>
                                  </div>
                                </Paper>
                              </div>
                            </Slide>
                          </div>
                          {selectedImage && (
                            <div style={{ position: "relative", width: "40px", height: "40px" }}>
                              <img
                                src={selectedImage.preview}
                                alt="Selected"
                                onLoad={() => {
                                  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: "cover" }}
                              />
                              {loading ? (
                                <div style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  background: "rgba(0, 0, 0, 0.5)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "8px"
                                }}>
                                  <CircularProgress
                                    size={20}
                                    value={uploadProgress}
                                    style={{ color: "#5BC1FD" }}
                                  />
                                </div>
                              ) : (
                                <div
                                  onClick={resetImageSelection}
                                  style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    padding: '2px'
                                  }}
                                >
                                  <CloseIcon style={{ fontSize: '15px', color: 'white' }} />
                                </div>
                              )}
                            </div>
                          )}
                          {/* When image is selected and not uploading, show send button */}
                          {selectedImage && !isUploading && (
                            <Button onClick={sendImageMessage}>
                              <FontAwesomeIcon
                                icon={faFileImport}
                                style={{
                                  transform: 'rotate(0deg)',
                                  fontSize: '20px',
                                  color: '#5BC1FD',
                                  stroke: 4,
                                }}
                              />
                            </Button>
                          )}
                          {selectedConversation && (
                            <>

                              <TextField
                                variant="standard"
                                placeholder={t('Your message')}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                sx={{

                                  flex: 1,
                                  input: {
                                    color: '#fff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontSize: '14px',
                                  },
                                  '& .MuiInputBase-input::placeholder': {
                                    color: '#fff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                  },
                                }}
                                fullWidth
                              />

                            </>
                          )}
                        </div>

                        <div className="VoiceIconShare"

                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            marginLeft: '20px',
                            alignItems: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {!isRecording ? (
                            // Normal microphone icon
                            <div
                              onClick={startRecording}
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faMicrophone}
                                style={{
                                  transform: 'rotate(0deg)',
                                  fontSize: '17px',
                                  color: '#5BC1FD',
                                  cursor: 'pointer',
                                  stroke: 4,
                                }}
                              />
                            </div>
                          ) : (
                            // Recording UI
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              backgroundColor: 'rgba(255,87,87,0.2)',
                              borderRadius: '20px',
                              padding: '5px 10px',
                            }}>
                              {/* Pulsing recording indicator */}
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#ff5757',
                                animation: 'pulse 1.5s infinite',
                              }} />

                              {/* Recording timer */}
                              <span style={{
                                color: '#ffffff',
                                fontSize: '13px',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              }}>
                                {formatAudioTime(recordingTime)}
                              </span>

                              {/* Send button */}
                              <Button
                                className="border"
                                onClick={async () => {
                                  if (!isUploading) {
                                    const recordedBlob = await stopRecording(); // Get the blob from stopRecording
                                    await sendAudioMessage(recordedBlob); // Pass it to sendAudioMessage
                                  }
                                }}
                                disabled={isUploading}
                                style={{
                                  cursor: isUploading ? "default" : "pointer",
                                  opacity: isUploading ? 0.7 : 1,
                                  background: "transparent",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPaperPlane}
                                  style={{
                                    fontSize: "15px",
                                    color: "#5BC1FD",
                                    transform: "rotate(0deg)",
                                  }}
                                />
                              </Button>

                              {/* Cancel button */}
                              <div
                                onClick={!isUploading ? cancelRecording : undefined}
                                style={{
                                  cursor: isUploading ? 'default' : 'pointer',
                                  opacity: isUploading ? 0.7 : 1,
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faStop}
                                  style={{
                                    fontSize: '15px',
                                    color: '#ff5757',
                                  }}
                                />
                              </div>
                            </div>
                          )}


                          {!isRecording && (
                            <Button
                              onClick={sendMessage}
                              disabled={isUploading}
                            >
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                style={{
                                  transform: 'rotate(0deg)',
                                  fontSize: '17px',
                                  color: '#5BC1FD',
                                  cursor: 'pointer',
                                  stroke: 4,
                                  opacity: isUploading ? 0.7 : 1,
                                }}
                              />
                            </Button>
                          )}
                        </div>

                        <style jsx>{`
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 87, 87, 0.7);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(255, 87, 87, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 87, 87, 0);
    }
  }
`}</style>
                      </div>
                    </div>
                  </div>
                </div>



              </div>
            )}

            {selectedSection === "Work" && (

              <div className="Div slide-from-downToUp"
                style={{
                  width: '100%',
                  height: '700px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  backgroundClip: 'border-box',
                  padding: '20px',
                  borderRadius: '23px',
                }}
              >

                <ProjectManagment handleHowItWorkOpen={handleHowItWorkOpen} selectedConversation={selectedConversation} />
              </div>

            )}

            {showChatDetails && (
              <>
                <style jsx>{`
  @keyframes bubbleExpand {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bubbleCollapse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.5;
    }
    100% {
      transform: scale(0.3);
      opacity: 0;
    }
  }
`}
                </style>
                <div className="ChatDetails"
                  style={{
                    width: showChatDetails ? '30%' : '25%',
                    display: showChatDetails ? 'flex' : 'flex',
                    flexDirection: 'column',
                    padding: '25px',
                    height: '700px',

                    gap: '20px',
                    animation: showChatDetails
                      ? 'bubbleExpand 0.4s ease-out forwards'
                      : 'bubbleCollapse 0.4s ease-out forwards',
                    transformOrigin: 'center center',
                    transition: 'width 0.3s ease-out',




                  }}
                >
                  <div className="TYpo"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 'bold',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                      }}>
                      {t('Chat Details')}
                    </Typography>

                  </div>
                  <div className="ChatInfoIcons "
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="InfoIcon"
                      style={{
                        width: '50px',
                        height: '50Px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <FontAwesomeIcon icon={faCircleInfo}
                        style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#fff', stroke: 4 }} // Reset any unwanted rotation
                      />


                    </div>
                    <div className="DeleteIcon"
                      style={{
                        width: '50px',
                        height: '50Px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan}
                        style={{ transform: 'rotate(0deg)', fontSize: '16px', color: '#fff', stroke: 4 }} // Reset any unwanted rotation
                      />

                    </div>
                    <div className="MuteIcon"
                      style={{
                        width: '50px',
                        height: '50Px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                      }}
                    >
                      <FontAwesomeIcon icon={faBellSlash}
                        style={{ transform: 'rotate(0deg)', fontSize: '17px', color: '#fff', stroke: 4 }} // Reset any unwanted rotation
                      />

                    </div>
                    <div className="Close"
                      onClick={() => setShowChatDetails(false)}
                      style={{
                        width: '50px',
                        height: '50Px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                      }}
                    >
                      <FontAwesomeIcon icon={faXmark}
                        style={{
                          transform: 'rotate(0deg)',
                          fontSize: '17px',
                          color: '#fff',
                          cursor: 'pointer',
                        }} // Reset any unwanted rotation

                      />

                    </div>
                  </div>
                  <div className="PhotoAndVideos"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <div className="TYpoPhoto"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",

                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                        }}>
                        {t('Photos and Vidoes')}
                        <span
                          style={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: '13px',
                            marginLeft: '5px',
                            opacity: '0.5',
                            marginRight: currentLanguage === 'ar' ? '4px' : 'unset',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '4px',
                          }}
                        >
                          104
                        </span>
                      </Typography>
                      <span
                        style={{
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                          fontSize: '13px',
                          marginLeft: '5px',
                          color: 'white',
                          opacity: ' 0.5',
                          textDecoration: 'underline',  // Added underline here
                          borderRadius: '16px',
                          padding: '4px',
                        }}
                      >
                        {t('See all')}
                      </span>
                    </div>
                    <div className="Images"
                      style={{
                        display: 'flex',
                        gap: '15px',
                      }}
                    >
                      <div className='IMG'
                        style={{
                          width: '50%',
                          height: '95px',
                          background: 'white',
                          borderRadius: '0.75rem',
                          backgroundImage: 'url(/src/assets/images/small-logos/images.jpg)',
                          backgroundSize: 'cover',
                          transition: 'transform 0.3s ease',
                        }}

                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                      </div>
                      <div className='IMG'
                        style={{
                          width: '50%',
                          height: '95px',
                          background: 'white',
                          borderRadius: '0.75rem',
                          backgroundImage: 'url(/src/assets/images/small-logos/4kImage.jpg)',
                          backgroundSize: 'cover',
                          transition: 'transform 0.3s ease',
                        }}

                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                      </div>
                    </div>
                  </div>
                  <div className="SharedFiles"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <div className="TYpoPhoto"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",

                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                        }}>
                        {t('Shared Files')}
                        <span
                          style={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: '13px',
                            marginLeft: '5px',
                            opacity: '0.5',
                            marginRight: currentLanguage === 'ar' ? '4px' : 'unset',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '4px',
                          }}
                        >
                          465
                        </span>
                      </Typography>
                      <span
                        style={{
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          fontSize: '13px',
                          marginLeft: '5px',
                          color: 'white',
                          opacity: ' 0.5',
                          textDecoration: 'underline',  // Added underline here
                          borderRadius: '16px',
                          padding: '4px',
                        }}
                      >
                        {t('See all')}
                      </span>
                    </div>
                    <div className="Folders"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                      }}
                    >
                      <div className="IconAndTYpo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div className="FolderIcon"
                          style={{
                            width: '50px',
                            height: '50px',  // Fixed typo from '50Px' to '50px'
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon icon={faFolderOpen}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#fff', stroke: 4 }}
                          />
                        </div>
                        <div className="TYpo">
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            {t('I need more info about your work. Could you please show me more?')}
                          </Typography>
                        </div>
                      </div>

                      <div className="IconAndTYpo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div className="FolderIcon"
                          style={{
                            width: '50px',
                            height: '50px',  // Fixed typo from '50Px' to '50px'
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon icon={faFolderOpen}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#fff', stroke: 4 }}
                          />
                        </div>
                        <div className="TYpo">
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            {t('I need more info about your work. Could you please show me more?')}
                          </Typography>
                        </div>
                      </div>
                      <div className="IconAndTYpo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div className="FolderIcon"
                          style={{
                            width: '50px',
                            height: '50px',  // Fixed typo from '50Px' to '50px'
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon icon={faFolderOpen}
                            style={{ transform: 'rotate(0deg)', fontSize: '19px', color: '#fff', stroke: 4 }}
                          />
                        </div>
                        <div className="TYpo">
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            {t('I need more info about your work. Could you please show me more?')}
                          </Typography>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="SharedLinks"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <div className="TYpoPhoto"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }}>
                        {t('Shared Links')}
                        <span
                          style={{
                            fontFamily: '"Airbnbcereal", sans-serif',
                            fontSize: '13px',
                            marginLeft: '5px',
                            opacity: '0.5',
                            marginRight: currentLanguage === 'ar' ? '4px' : 'unset',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '4px',
                          }}
                        >
                          46
                        </span>
                      </Typography>
                      <span
                        style={{
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                          fontSize: '13px',
                          marginLeft: '5px',
                          color: 'white',
                          opacity: ' 0.5',
                          textDecoration: 'underline',  // Added underline here
                          borderRadius: '16px',
                          padding: '4px',
                        }}
                      >
                        {t('See all')}
                      </span>
                    </div>
                    <div className="Folders"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                      }}
                    >
                      <div className="IconAndTYpo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div className="FolderIcon"
                          style={{
                            width: '50px',
                            height: '50px',  // Fixed typo from '50Px' to '50px'
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon icon={faGithub}
                            style={{ transform: 'rotate(0deg)', fontSize: '30px', color: '#5BC1FD', stroke: 4 }}
                          />
                        </div>
                        <div className="TYpo">
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            Github Platform
                          </Typography>
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              textDecoration: 'underline',  // Added underline here
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            https://github.com/
                          </Typography>
                        </div>
                      </div>

                      <div className="IconAndTYpo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div className="FolderIcon"
                          style={{
                            width: '50px',
                            height: '50px',  // Fixed typo from '50Px' to '50px'
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon icon={faPaypal}
                            style={{ transform: 'rotate(0deg)', fontSize: '28px', color: '#5BC1FD', stroke: 4 }}
                          />
                        </div>
                        <div className="TYpo">
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            Paypal Bank
                          </Typography>
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              textDecoration: 'underline',  // Added underline here
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            https://www.paypal.com/dz/home
                          </Typography>
                        </div>
                      </div>
                      <div className="IconAndTYpo"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div className="FolderIcon"
                          style={{
                            width: '50px',
                            height: '50px',  // Fixed typo from '50Px' to '50px'
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon icon={faLinkedin}
                            style={{ transform: 'rotate(0deg)', fontSize: '27px', color: '#5BC1FD', stroke: 4 }}
                          />
                        </div>
                        <div className="TYpo">
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            linkedin business
                          </Typography>
                          <Typography
                            sx={{
                              color: '#ffffff',
                              fontFamily: '"Airbnbcereal", sans-serif',
                              display: 'flex',
                              fontSize: '13px',
                              maxWidth: '168px',
                              whiteSpace: 'normal', // Allow text to wrap to the next line
                              textTransform: 'capitalize',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 2, // Limit to 2 lines
                              WebkitBoxOrient: 'vertical',
                              textDecoration: 'underline',  // Added underline here
                              display: '-webkit-box', // Enable multi-line truncation
                            }}
                          >
                            https://business.linkedin.com/
                          </Typography>
                        </div>
                      </div>

                    </div>

                  </div>


                </div>
              </>
            )}





          </div>
        </>
      )}
    </>
  )
}

export default ProfileMessages