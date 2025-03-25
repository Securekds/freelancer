// src/components/CallControls.jsx
import React, { useEffect, useRef } from 'react';
import { useChat } from "../../Context/ChatContext.jsx";

const CallControls = () => {
  const { 
    callState, 
    endCall,
    acceptCall,
    rejectCall,
    selectedUser,
    getProfileImage
  } = useChat();
  
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  
  // Connect audio streams to audio elements
  useEffect(() => {
    if (callState.localStream && localAudioRef.current) {
      localAudioRef.current.srcObject = callState.localStream;
    }
    
    if (callState.remoteStream && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = callState.remoteStream;
    }
  }, [callState.localStream, callState.remoteStream]);
  
  // Hide if not in a call or receiving a call
  if (!callState.isCalling && !callState.isIncomingCall) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {/* Avatar/profile image of the other user */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img 
              src={selectedUser?.profileImg ? getProfileImage(selectedUser.profileImg) : '/default-avatar.png'} 
              alt={`${selectedUser?.firstName || 'User'}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {callState.isIncomingCall ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Incoming Call</h3>
            <p className="mb-6">
              {selectedUser?.firstName} {selectedUser?.lastName} is calling you
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={rejectCall}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={acceptCall}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              {!callState.remoteStream ? "Calling..." : "Call Connected"}
            </h3>
            <p className="mb-6">
              {selectedUser?.firstName} {selectedUser?.lastName}
            </p>
            <button 
              onClick={endCall}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              End Call
            </button>
          </div>
        )}
        
        {/* Hidden audio elements to play the streams */}
        <audio ref={localAudioRef} autoPlay muted style={{ display: 'none' }} />
        <audio ref={remoteAudioRef} autoPlay style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default CallControls;