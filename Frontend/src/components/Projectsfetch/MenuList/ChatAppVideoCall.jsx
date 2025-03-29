import React, { useEffect, useState , useRef } from 'react';
import { Typography } from '@mui/material'
import { useUser } from '../../../Context/UserContext.jsx'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash ,faExpand, faVolumeHigh, faMicrophoneLinesSlash, faVolumeXmark, faMicrophoneLines, faCircle, faCommentDots, faBellSlash, faPlay, faXmark, faPaperclip, faMicrophone, faThumbtack, faPeopleRoof, faCalendarDays, faEye, faUsers, faBookmark, faMagnifyingGlass, faPhone, faVideo, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useChat } from '../../../Context/ChatContext.jsx'; // Import the useChat hook



function ChatAppVideoCall({ isClose ,  callDuration }) {
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


    const { user } = useUser(); // Access user data from UserContext
    const [isMuted, setIsMuted] = useState(false); // State to track mute status
    const toggleMute = () => {
        setIsMuted((prev) => !prev); // Toggle the state
    };
    const [isSpeakerMuted, setIsSpeakerMuted] = useState(false); // State for speaker
    const [volume, setVolume] = useState(50); // Default volume level at 50%
    const [showVolumeControl, setShowVolumeControl] = useState(false); // Toggle volume slider visibility

    const toggleSpeaker = () => {
        setIsSpeakerMuted(!isSpeakerMuted);
        if (!isSpeakerMuted) {
            setVolume(0); // Mute sets volume to 0
        } else {
            setVolume(50); // Unmute sets volume back to 50%
        }
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        if (e.target.value > 0) {
            setIsSpeakerMuted(false); // Unmute if volume is adjusted above 0
        } else {
            setIsSpeakerMuted(true); // Mute if volume is set to 0
        }
    };

    

    const [isCallWaiting, setIsCallWaiting] = useState(false);
    const [isUserResponse, setIsUserResponse] = useState(true);


      const {
            callState,
            acceptCall,
            rejectCall,
            endCall,
            selectedUser,
        } = useChat();

        const {
            isCalling,
            isCallConnected,
            isIncomingCall,
            isCallRejected,
            callerId,
            calleeId,
            
            localStream,
            remoteStream,
            isVideoCall,
        } = callState;


          // Refs for video elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

    // Update video streams when they change
    useEffect(() => {
        if (localVideoRef.current && localStream) {
          localVideoRef.current.srcObject = localStream;
        }
        if (remoteVideoRef.current && remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      }, [localStream, remoteStream]);


      const toggleVideo = () => {
        // Implement video toggle logic
      };

      const toggleFullScreen = () => {
      
      };
      
    return (
        
        <div    className="CallDailog"
    
      style={{
        width:  '60vw',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px',
        gap: '10px',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Background overlay */}
      <div
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

      {/* Call header information */}
      <div className="CallInfo"
        style={{
          display: 'flex',
          gap: '5px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="CallWith"
          style={{
            display: 'flex',
            gap: '5px',
          }}
        >
          <Typography
            style={{
              color: '#2df873',
              fontFamily: currentLanguage === 'ar' 
                ? '"Droid Arabic Kufi", serif' 
                : '"Airbnbcereal", sans-serif',
              fontSize: '15px',
            }}
          >
            {isCallConnected 
              ? t('In A Video Call With :') 
              : isIncomingCall 
                ? t('Incoming Video Call') 
                : t('Video Calling')}
          </Typography>
          <Typography
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontFamily: user?.firstName && /[\u0600-\u06FF]/.test(user.firstName)
                ? '"Droid Arabic Kufi", serif'
                : '"Airbnbcereal", sans-serif',
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </div>

        {/* Fullscreen toggle */}
        <div 
          className="FullscreenToggle"
          style={{
            cursor: 'pointer',
            padding: '5px',
          }}
          onClick={toggleFullScreen}
        >
          <FontAwesomeIcon 
            icon={faExpand} 
            style={{ color: '#fff', fontSize: '16px' }}
          />
        </div>
      </div>

      <div className="Divider"
        style={{
          width: '100%',
          height: '1px',
          background: 'white',
        }}
      />

      {/* Call status indicator */}
      <div className="RECTimer pulse"
        style={{
          width: '17px',
          height: '17px',
          borderRadius: '50px',
          background: 'rgb(254, 95, 85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesomeIcon icon={faCircle}
          style={{
            transform: 'rotate(0deg)',
            fontSize: '5px',
            color: '#fff',
          }}
        />
      </div>

      {/* Call duration */}
      {isCallConnected && (
        <div className="CallTime"
          style={{
            marginTop: '-10px',
          }}
        >
          <Typography
            style={{
              color: '#ffffff',
              fontFamily: '"Airbnbcereal", sans-serif',
              opacity: '0.5',
              fontSize: '15px',
            }}
          >
            {callDuration}
          </Typography>
        </div>
      )}

      {/* Video containers */}
      <div className="VideoContainers"
        style={{
          width: '100%',
          height:  '360px',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* Remote video (main) */}
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: `url('/src/assets/images/small-logos/VideoChatImage.jpg') no-repeat center center`,
              backgroundSize: 'cover',
            }}
          >
            <Typography
              style={{
                color: '#fff',
                fontFamily: '"Airbnbcereal", sans-serif',
              }}
            >
              {isIncomingCall ? 'Incoming video call...' : 'Connecting...'}
            </Typography>
          </div>
        )}

        {/* Local video (picture-in-picture) */}
        {localStream && (
          <div
            style={{
              width: '27%',
              height: '130px',
              position: 'absolute',
              right: '2%',
              top: '2%',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid #fff',
            }}
          >
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="Icons"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginTop: '20px',
          cursor: 'pointer',
        }}
      >
        {/* Incoming call buttons */}
        {isIncomingCall && !isCallConnected && (
          <>
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
          </>
        )}

        {/* Outgoing call buttons */}
        {isCalling && !isCallConnected && (
          <>
            <div
              style={{
                position: 'relative',
                display: 'inline-block'
              }}
              onMouseEnter={() => setShowVolumeControl(true)}
              onMouseLeave={() => setShowVolumeControl(false)}
            >
              {/* Volume control */}
              {showVolumeControl && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '10px',
                    background: 'rgba(255,255,255,0.7)',
                    padding: '10px',
                    borderRadius: '5px',
                    zIndex: 10,
                    width: '150px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{
                      width: '130px',
                      height: '5px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '5px',
                      appearance: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              )}

              {/* Speaker button */}
              <div
                className="SpeakerIcon"
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
                onClick={toggleSpeaker}
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
            </div>

            {/* End call button */}
            <div 
              className="DeclinedCall"
              onClick={endCall}
              style={{
                width: '48px',
                height: '48px',
                background: 'rgb(254, 95, 85)',
                borderRadius: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon 
                icon={faPhone}
                style={{ 
                  transform: 'rotate(137deg)', 
                  fontSize: '26px', 
                  color: '#fff', 
                  stroke: 4 
                }}
              />
            </div>

            {/* Mute button */}
            <div 
              className="MuteVoiceIcon"
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
              onClick={toggleMute}
            >
              <FontAwesomeIcon
                icon={isMuted ? faMicrophoneLinesSlash : faMicrophoneLines}
                style={{
                  transform: 'rotate(0deg)',
                  fontSize: '19px',
                  color: '#fff',
                  strokeWidth: 4,
                }}
              />
            </div>
          </>
        )}

        {/* Active call buttons */}
        {isCallConnected && (
          <>
            {/* Speaker button */}
            <div
              style={{
                position: 'relative',
                display: 'inline-block'
              }}
              onMouseEnter={() => setShowVolumeControl(true)}
              onMouseLeave={() => setShowVolumeControl(false)}
            >
              {/* Volume control */}
              {showVolumeControl && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '10px',
                    background: 'rgba(255,255,255,0.7)',
                    padding: '10px',
                    borderRadius: '5px',
                    zIndex: 10,
                    width: '150px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{
                      width: '130px',
                      height: '5px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '5px',
                      appearance: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              )}

              <div
                className="SpeakerIcon"
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
                onClick={toggleSpeaker}
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
            </div>

            {/* Video toggle button */}
            <div 
              className="VideoToggle"
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
              onClick={toggleVideo}
            >
              <FontAwesomeIcon
                icon={faVideoSlash}
                style={{
                  fontSize: '19px',
                  color: '#fff',
                }}
              />
            </div>

            {/* End call button */}
            <div 
              className="DeclinedCall"
              onClick={endCall}
              style={{
                width: '48px',
                height: '48px',
                background: 'rgb(254, 95, 85)',
                borderRadius: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon 
                icon={faPhone}
                style={{ 
                  transform: 'rotate(137deg)', 
                  fontSize: '26px', 
                  color: '#fff', 
                  stroke: 4 
                }}
              />
            </div>

            {/* Mute button */}
            <div 
              className="MuteVoiceIcon"
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
              onClick={toggleMute}
            >
              <FontAwesomeIcon
                icon={isMuted ? faMicrophoneLinesSlash : faMicrophoneLines}
                style={{
                  transform: 'rotate(0deg)',
                  fontSize: '19px',
                  color: '#fff',
                  strokeWidth: 4,
                }}
              />
            </div>
          </>
        )}

   
      </div>
    </div>


    )
}

export default ChatAppVideoCall
