import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import { useUser } from '../../../Context/UserContext.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophoneLines,
    faVolumeHigh,
    faMicrophoneLinesSlash,
    faVolumeXmark,
    faPersonCirclePlus,
    faSave,
    faCommentDots,
    faBellSlash,
    faPlay,
    faXmark,
    faPaperclip,
    faMicrophone,
    faThumbtack,
    faPeopleRoof,
    faCalendarDays,
    faEye,
    faUsers,
    faBookmark,
    faMagnifyingGlass,
    faPhone,
    faVideo,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import animationData from '../../../assets/images/small-logos/ChatAppCallWaiting.json';
import animationData2 from '../../../assets/images/small-logos/CallSliderUser.json';
import { useChat } from '../../../Context/ChatContext.jsx'; // Import the useChat hook

function ChatAppCall({ isClose, callDuration }) {
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

      const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const {
        callState,
        acceptCall,
        rejectCall,
        endCall,
        selectedUser,
    } = useChat();

    const {
        user
    } = useUser();

    const {
        isCalling,
        isCallConnected,
        isIncomingCall,
        isCallRejected,
        callerId,
        calleeId,
        localStream,
        remoteStream,
    } = callState;

    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);


    const localAudioRef = useRef(null);
    const remoteAudioRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        if (callState.localStream && localAudioRef.current) {
            localAudioRef.current.srcObject = callState.localStream;
        }

        if (callState.remoteStream && remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = callState.remoteStream;

            if (callState.isCallConnected) {
                let seconds = 0;
                timerRef.current = setInterval(() => {
                    seconds++;
                    setCallDuration(seconds);
                }, 1000);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [callState.localStream, callState.remoteStream, callState.isCallConnected]);

    const toggleMute = () => {
        if (callState.localStream) {
            const audioTracks = callState.localStream.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleSpeaker = () => {
        if (remoteAudioRef.current) {
            remoteAudioRef.current.muted = !remoteAudioRef.current.muted;
            setIsSpeakerMuted(!isSpeakerMuted);
        }
    };

    const formatCallDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    // Render nothing if there's no active call
    if (!isCalling && !isIncomingCall && !isCallConnected && !isCallRejected) {
        return null;
    }

    const displayUser = isIncomingCall ? selectedUser : selectedUser;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        return `${import.meta.env.VITE_BACKEND_URL}${cleanPath}`;
    };

    const profileImageUrl = displayUser?.profileImg ? getImageUrl(displayUser.profileImg) : null;

    const profileImageUrlMy = user?.profileImg ? getImageUrl(user.profileImg) : null;

    return (
        <div
            className="CallDailog"
            style={{
                width: isSmallScreen? '90vw' : '40vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                gap: '10px',
                position: 'relative',
            }}
        >
            <div className='Bg'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid white',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: '-1',
                }}
            />





            {/* Display user information */}

            {/* Incoming Call UI */}
            {isIncomingCall && !isCallConnected && (

                <>
                    <div className="RecieverProfileImg"

                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <div className="ProfileCircle"

                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '2px solid #ccc',
                            }}
                        >
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }} />
                        </div>
                        <div className="CallingTypo"

                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar'
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                    opacity: '0.5',
                                    fontSize: '17px',
                                }}
                            >
                                {t('In Comming Call from')}
                            </Typography>
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontFamily: displayUser?.firstName && /[\u0600-\u06FF]/.test(displayUser.firstName)
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                    marginTop: '-5px',
                                    fontSize: '18px',
                                }}
                            >
                                {displayUser.firstName} {displayUser.lastName}
                            </Typography>


                        </div>
                    </div>
                    <div className="Animation"

                        style={{
                            position: 'absolute',
                            top: 'calc(98px + 2px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '180px',
                            height: '130px',
                        }}
                    >
                        <Lottie
                            animationData={animationData}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>
                    <div className="call-actions"
                        style={{
                            marginTop: '30px',
                            zIndex: '33',
                        }}
                    >
                        <button
                            onClick={acceptCall}
                            style={{
                                background: "green",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                margin: "5px",
                            }}
                        >
                            Accept
                        </button>
                        <button
                            onClick={rejectCall}
                            style={{
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                margin: "5px",
                            }}
                        >
                            Reject
                        </button>
                    </div>
                </>

            )}

            {/* Outgoing Call UI */}
            {isCalling && !isCallConnected && (
                <>

                    <div className="RecieverProfileImg"

                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <div className="ProfileCircle"

                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '2px solid #ccc',

                            }}
                        >
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div className="CallingTypo"

                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    opacity: '0.5',
                                    fontSize: '17px',
                                }}
                            >
                                {t('Calling')}
                            </Typography>
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontFamily: displayUser?.firstName && /[\u0600-\u06FF]/.test(displayUser.firstName)
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                                    marginTop: '-5px',
                                    fontSize: '18px',
                                }}
                            >
                                {displayUser.firstName} {displayUser.lastName}
                            </Typography>


                        </div>
                    </div>
                    <div className="Animation"

                        style={{
                            position: 'absolute',
                            top: 'calc(98px + 2px)', // Adjust position relative to profile image
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '180px',
                            height: '130px',
                        }}
                    >
                        <Lottie
                            animationData={animationData}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>
                    <div className="Icons"

                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginTop: '28px',
                            cursor: 'pointer',
                        }}
                    >
                        <div className="SpeakerIcon"
                            style={{
                                width: '45px',
                                height: '45px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={toggleSpeaker} // Toggle speaker state
                        >
                            <FontAwesomeIcon
                                icon={isSpeakerMuted ? faVolumeXmark : faVolumeHigh}
                                style={{
                                    transform: 'rotate(0deg)',
                                    fontSize: '19px',
                                    color: '#fff',
                                    strokeWidth: 4,
                                }}
                            />
                        </div>
                        <div className="DeclinedCall"
                            onClick={endCall}
                            style={{
                                width: '48px',
                                height: '48Px',
                                background: 'rgb(254, 95, 85)',
                                borderRadius: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                        >
                            <FontAwesomeIcon icon={faPhone}
                                style={{ transform: 'rotate(137deg)', fontSize: '26px', color: '#fff', stroke: 4 }} // Reset any unwanted rotation
                            />

                        </div>
                        <div className="MuteVoiceIcon"
                            style={{
                                width: '45px',
                                height: '45px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer', // Add a pointer cursor for better UX
                            }}
                            onClick={toggleMute} // Toggle on click
                        >
                            <FontAwesomeIcon
                                icon={isMuted ? faMicrophoneLinesSlash : faMicrophoneLines} // Conditionally render the icon
                                style={{
                                    transform: 'rotate(0deg)', // Reset any unwanted rotation
                                    fontSize: '19px',
                                    color: '#fff',
                                    strokeWidth: 4, // Optional styling
                                }}
                            />
                        </div>

                    </div>
                </>
            )}

            {/* Active Call UI */}
            {isCallConnected && (
                <>
                    <div
                        className="UserResponseDesign"
                        style={{
                            width: '70%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Local User Profile Image */}
                        <div
                            className="ProfileCircle"
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '2px solid #ccc',
                            }}
                        >
                            <img
                                src={profileImageUrlMy} // Use local user's profile image
                                alt="Local Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>

                        {/* Animation or Separator */}
                        <div
                            className="Slider"
                            style={{
                                marginRight: '10px',
                            }}
                        >
                            <Lottie
                                animationData={animationData2}
                                style={{
                                    width: '160px',
                                    height: '70px',
                                }}
                            />
                        </div>

                        {/* Remote User Profile Image */}
                        <div
                            className="ProfileCircle"
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '2px solid #ccc',
                            }}
                        >
                            <img
                                src={profileImageUrl} // Use remote user's profile image
                                alt="Remote Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>

                    {/* Call Typography and Duration */}
                    <div
                        className="CallTypoAndTime"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: '14px',
                        }}
                    >
                        <div
                            className="CallingTypo"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#2df873',
                                    fontFamily:
                                        currentLanguage === 'ar'
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    fontSize: '15px',
                                }}
                            >
                                {t('In Call With')}
                            </Typography>
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontFamily:
                                        displayUser?.firstName && /[\u0600-\u06FF]/.test(displayUser.firstName)
                                            ? '"Droid Arabic Kufi", serif'
                                            : '"Airbnbcereal", sans-serif',
                                    marginTop: '-5px',
                                }}
                            >
                                {displayUser.firstName} {displayUser.lastName}
                            </Typography>
                        </div>
                        <div className="CallTime">
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    fontFamily: '"Airbnbcereal", sans-serif',
                                    opacity: '0.5',
                                    fontSize: '15px',
                                }}
                            >
                                Call Duration: {callDuration}
                            </Typography>
                        </div>
                    </div>

                    {/* Audio Streams */}
                    <div>
                        {/* Local Audio Stream */}
                        {localStream && (
                            <audio
                                ref={(audio) => {
                                    if (audio) audio.srcObject = localStream;
                                }}
                                autoPlay
                                muted // Mute yourself to avoid echo
                            />
                        )}

                        {/* Remote Audio Stream */}
                        {remoteStream && (
                            <audio
                                ref={(audio) => {
                                    if (audio) audio.srcObject = remoteStream;
                                }}
                                autoPlay
                            />
                        )}
                    </div>

                    {/* End Call Button */}
                    <button
                        onClick={endCall}
                        style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            margin: '5px',
                        }}
                    >
                        End Call
                    </button>
                </>
            )}


        



        </div>
    );
}

export default ChatAppCall;