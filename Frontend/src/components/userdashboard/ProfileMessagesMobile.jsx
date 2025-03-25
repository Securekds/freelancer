import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Paper, List, Typography, ListItem, ListItemIcon, Button, MenuItem } from "@mui/material";

import { faArrowLeft, faStop, faComments, faFolder, faArrowRight, faCircleInfo, faFlag, faPaperPlane, faFolderOpen, faCircleCheck, faDeleteLeft, faTrashCan, faTrash, faBellSlash, faPlay, faXmark, faPaperclip, faMicrophone, faThumbtack, faPeopleRoof, faCalendarDays, faEye, faUsers, faBookmark, faMagnifyingGlass, faPhone, faVideo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import i18n from 'i18next';
import AudioPlayer from './AudioPlayer.jsx';
import { useUser } from '../../Context/UserContext.jsx'
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Slide, } from '@mui/material';
import { useChat } from "../../Context/ChatContext.jsx";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ProjectManagment from "./ProjectManagment.jsx";

function ProfileMessagesMobile({handleHowItWorkOpen}) {
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

    const { user, setUser } = useUser(); // Make sure you're getting both user and setUser
    const userProfileImages = new Array(5).fill(user?.profileImg || 'https://via.placeholder.com/55'); // Array of 8 items

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

    } = useChat();


    const iconsData = [

        {
            key: 'work',
            icon: faFolder,
            label: t('Works'),
            onClick: () => setSelectedSection("Work"),
        },
        {
            key: 'allChats',
            icon: faComments,
            label: t('Chats'),
            onClick: () => setSelectedSection("AllList")
        },
        {
            key: 'meet',
            icon: faPeopleRoof,
            label: t('Meet'),
        },
    ];


    const icons = [
        { icon: faPhone, key: 'phone' },
        { icon: faVideo, key: 'video' },
        { icon: faEllipsisVertical, key: 'menu' },
    ];

    const [isUsersList, setIsUsersList] = useState(true);
    const [isUserConversation, setIsUserConversation] = useState(false);

    const [menuActive, setMenuActive] = useState(false);

    const menuRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);


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

    const BackToUsersList = () => {
        setIsUsersList(true)
        setIsUserConversation(false)
    }


    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const containerRef = useRef(null);


    const handleToggleDropdown = () => {
        setOpen(!open);
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


    const handleCallClick = () => {

        initiateCall(selectedUser?._id);
    };



    const [selectedSection, setSelectedSection] = useState("AllList");



    return (
        <div className='ChatAppMobile slide-from-right'
            style={{
                width: '96%',
                height: 'auto',
                marginTop: '30px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '20px',
                zIndex: '1111111',
                marginBottom: '40px',
                backgroundClip: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '10px',
                gap: '10px',

            }}
        >
            {selectedSection === "AllList" && (
                <div className="Div slide-from-right">
                    {isUsersList && (
                        <>
                            <div className="Header"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}

                            >
                                <div className="ArrowBac"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft}
                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '21px',
                                            color: '#fff',

                                        }}
                                    />

                                </div>
                                <div className="MessagesTypo"
                                    style={{
                                        marginLeft: '40px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                        }}>
                                        {t('Messages')}
                                    </Typography>
                                </div>
                                <div className="FakeSpace">
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            opacity: 0,
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                        }}>
                                        {t('Chat Details')}
                                    </Typography>
                                </div>
                            </div>
                            <div className="InputSearchDiv"

                                style={{

                                    height: '50px',
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    gap: '10px', // Adds spacing between the icon and the input
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
                                        onChange={(e) => {
                                            const input = e.target;
                                            const arabicRegex = /[\u0600-\u06FF]/;
                                            input.style.fontFamily = arabicRegex.test(input.value)
                                                ? '"Droid Arabic Kufi", serif'
                                                : '"Airbnbcereal", sans-serif';
                                            input.style.fontWeight = '400';

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
                                </div>

                            </div>

                            <div className="ChatListContainer"
                                style={{ position: 'relative', height: '610px' }}
                            >
                                <div className="UserListConversations"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: 'calc(100% - 70px)', // Adjust height to leave space for the header
                                        overflow: 'auto', // Enable scrolling
                                        padding: '10px',
                                        cursor: 'pointer',
                                        gap: '10px',
                                    }}
                                >
                                    {/* Header */}
                                    <div className="Typo">
                                        <Typography
                                            sx={{
                                                color: "white",
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            {t('Conversations')}
                                        </Typography>
                                    </div>

                                    {/* Loading State */}
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
                                                        width: '53px',
                                                        height: '53px',
                                                        background: 'rgba(255,255,255,0.2)',
                                                        borderRadius: '50px',
                                                    }}
                                                />

                                                {/* Skeleton Text */}
                                                <div style={{ width: '100%' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
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
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontSize: '13px',
                                                opacity: '0.5',
                                                padding: '20px',
                                            }}
                                        >
                                            {t('Failed to load conversations')}
                                        </Typography>
                                    ) : conversations.length > 0 ? (
                                        // Conversations List
                                        conversations.map((conversation, index) => {
                                            const otherUser = getOtherUser(conversation); // Get the other user's details
                                            const isOnline = isUserOnline(otherUser?._id);

                                            return (
                                                <div
                                                    key={conversation._id}
                                                    className="ConverSation1"
                                                    onClick={() => {
                                                        handleSelectConversation(conversation, index); // Fetch messages and update state
                                                        setIsUsersList(false);
                                                        setIsUserConversation(true);
                                                    }}
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
                                                    {/* Profile Image */}
                                                    <div
                                                        className="UserProfileImg"
                                                        style={{
                                                            position: 'relative',
                                                            width: '53px',
                                                            height: '53px',
                                                            background: 'white',
                                                            borderRadius: '50px',
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

                                                    {/* User Info */}
                                                    <div
                                                        className="UserInfo"
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
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {conversation.lastMessage || t('No messages yet')}
                                                                </span>
                                                            </Typography>
                                                            {conversation.unreadCount > 0 && (
                                                                <div
                                                                    className="Iconsz"
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
                                        // No Conversations Found
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontSize: '13px',
                                                opacity: '0.5',
                                            }}
                                        >
                                            {t('No conversations found.')}
                                        </Typography>
                                    )}
                                </div>
                                <div className="ButtomBarIcons"

                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '65px',
                                        width: '100%',
                                        zIndex: '1111111111111',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '0px 0px 20px 20px',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                    }}
                                >
                                    {iconsData.map((iconData) => (
                                        <div
                                            key={iconData.key}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                width: '95%',
                                            }}
                                            onClick={iconData.onClick} // Use iconData.onClick here
                                        >
                                            <FontAwesomeIcon
                                                icon={iconData.icon}
                                                style={{
                                                    transform: 'rotate(0deg)',
                                                    fontSize: '20px',
                                                    color: '#fff',
                                                    cursor: 'pointer',

                                                }}
                                            />
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#fff',
                                                    fontFamily:
                                                        currentLanguage === 'ar'
                                                            ? '"Droid Arabic Kufi", serif'
                                                            : '"Airbnbcereal", sans-serif',
                                                    marginTop: '5px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {iconData.label}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>


                            </div>
                        </>
                    )}
                    {isUserConversation && (
                        <>
                            <div className="Header"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}

                            >
                                <div className="ArrowBac"
                                    onClick={BackToUsersList}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={currentLanguage === 'ar' ? faArrowRight : faArrowLeft}

                                        style={{
                                            transform: 'rotate(0deg)',
                                            fontSize: '21px',
                                            color: '#fff',

                                        }}
                                    />

                                </div>
                                <div className="UserInfo"
                                    style={{
                                        display: 'flex',
                                        gap: '8px',
                                    }}
                                >
                                    {/* Other User's Profile Image */}
                                    <div className="UserProfileImg"
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            background: 'white',
                                            borderRadius: '50px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid grey',
                                        }}
                                    >
                                        <img
                                            src={selectedUser?.profileImg || 'https://via.placeholder.com/55'} // Fallback to placeholder if no image
                                            alt="Other User Profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>

                                    {/* Other User's Name and Online Status */}
                                    <div className="MessagesTypo">
                                        <Typography
                                            sx={{
                                                color: "white",
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                                fontFamily: selectedUser?.firstName && /[\u0600-\u06FF]/.test(selectedUser.firstName)
                                                    ? '"Droid Arabic Kufi", serif'
                                                    : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            {selectedUser?.firstName} {selectedUser?.lastName}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "white",
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                                opacity: '0.5',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            {isUserOnline(selectedUser?._id) ? t('Online') : t('Offline')}
                                        </Typography>
                                    </div>
                                </div>
                                {icons.map((iconItem) => (
                                    <div className="Icons"
                                        key={iconItem.key}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            position: 'relative',
                                        }}
                                    >
                                        {iconItem.key === 'menu' ? (
                                            // Menu Logic
                                            <div className="menu-wrapper" ref={menuRef}>
                                                <FontAwesomeIcon
                                                    icon={iconItem.icon}
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
                                                        color: "white",
                                                        cursor: "pointer",
                                                        opacity: menuActive ? 0.5 : 1,
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
                                                            {/* Chat Details Option */}
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
                                                                        }}
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
                                                                        {t('See more information')}
                                                                    </Typography>
                                                                </div>
                                                            </div>

                                                            {/* Delete Chat Option */}
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
                                                                onClick={handleDeleteConversation}
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
                                                                        }}
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

                                                            {/* Clear Chat Option */}
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
                                                                        }}
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

                                                            {/* Report Chat Option */}
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
                                                                        }}
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
                                            // Other Icons (Phone, Video)
                                            <FontAwesomeIcon
                                                icon={iconItem.icon}
                                                onClick={iconItem.key === 'phone' ? handleCallClick : undefined}
                                                style={{
                                                    transform: 'rotate(0deg)',
                                                    fontSize: '20px',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}

                            </div>
                            <div className="MessageSecoContainer "
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '70vh', // Full viewport height
                                    position: 'relative', // Ensure relative positioning for absolute children
                                }}
                            >

                                <div className="MessagesSec "
                                    style={{
                                        width: currentLanguage === 'ar' ? '110%' :

                                            '105%',

                                        overflowY: 'auto',
                                        height: '63vh',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                        paddingRight: '20px',
                                        paddingRight: currentLanguage === 'ar' ? '0' : '20px',
                                        paddingLeft: currentLanguage === 'ar' ? '20px' : '0',
                                        marginRight: currentLanguage === 'ar' ? '-10px' : '0',


                                    }}
                                >
                                    <div className="Time"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "white",
                                                fontSize: '13px',
                                                opacity: '0.5',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                            }}>
                                            {t('Today')}
                                        </Typography>
                                    </div>
                                    <div className="SenderAndRecieverContainer"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: '20px',
                                            direction: currentLanguage === 'ar' ? 'rtl' : 'ltr', // Handle RTL for Arabic
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
                                                const isAudioMessage = message.audioUrl !== undefined;

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
                                                                direction: currentLanguage === 'ar' ? 'rtl' : 'ltr', // Handle RTL for Arabic
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
                                    <div className="SendAMessage"
                                        style={{
                                            position: 'fixed',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '62px',
                                            width: currentLanguage === 'ar' ? '105%' : '100%',
                                            zIndex: '1111111111111',
                                            background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginRight: currentLanguage === 'ar' ? '-10px' : '0',
                                            padding: '10px',
                                        }}
                                    >
                                        <div className="AttachmentIcon"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px',
                                                flex: 1,
                                            }}
                                        >
                                            {/* File Upload Dropdown */}
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

                                                {/* Dropdown Menu for File Uploads */}
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
                                                                    onClick={() => imageInputRef.current.click()}
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

                                            {/* Selected Image Preview */}
                                            {selectedImage && (
                                                <div style={{ position: "relative", width: "40px", height: "40px" }}>
                                                    <img
                                                        src={selectedImage.preview}
                                                        alt="Selected"
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

                                            {/* Send Button for Selected Image */}
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

                                            {/* Text Input */}
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
                                        </div>

                                        {/* Voice and Send Icons */}
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
                                                // Microphone Icon for Starting Recording
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
                                                    {/* Pulsing Recording Indicator */}
                                                    <div style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#ff5757',
                                                        animation: 'pulse 1.5s infinite',
                                                    }} />

                                                    {/* Recording Timer */}
                                                    <span style={{
                                                        color: '#ffffff',
                                                        fontSize: '13px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}>
                                                        {formatAudioTime(recordingTime)}
                                                    </span>

                                                    {/* Send Button */}
                                                    <Button
                                                        onClick={async () => {
                                                            if (!isUploading) {
                                                                const recordedBlob = await stopRecording();
                                                                await sendAudioMessage(recordedBlob);
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

                                                    {/* Cancel Button */}
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

                                            {/* Send Message Button */}
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

                                        {/* Pulse Animation for Recording Indicator */}
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

                        </>
                    )}
                </div>
            )}

            {selectedSection === "Work" && (
                <>
                <div className="Main slide-from-left"
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    gap : '20px',
                }}
                >
                <div className="Div">
                    <ProjectManagment handleHowItWorkOpen={handleHowItWorkOpen} selectedConversation={selectedConversation} />
                </div>
                <div className="ButtomBarIcons"

                    style={{
                      
                        height: '65px',
                        width: '100%',
                        zIndex: '1111111111111',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '0px 0px 20px 20px',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}
                >
                        {iconsData.map((iconData) => (
                            <div
                                key={iconData.key}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '95%',
                                }}
                                onClick={iconData.onClick} // Use iconData.onClick here
                            >
                                <FontAwesomeIcon
                                    icon={iconData.icon}
                                    style={{
                                        transform: 'rotate(0deg)',
                                        fontSize: '20px',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }} />
                                <Typography
                                    style={{
                                        fontSize: '14px',
                                        color: '#fff',
                                        fontFamily: currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                        marginTop: '5px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {iconData.label}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
                    </>
            )}

        </div>
    )
}

export default ProfileMessagesMobile
