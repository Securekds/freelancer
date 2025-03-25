import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { socket } from '../utils/socket.js';
import { useUser } from './UserContext.jsx';
import { toast } from 'react-toastify';

// Create the context
const ChatContext = createContext();

// Chat context provider component
export const ChatProvider = ({ children }) => {

  const { user } = useUser(); 

  // State variables
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(new Map());
  const [userLastActive, setUserLastActive] = useState(new Map());
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [projects, setProjects] = useState({});
  const [gigs, setGigs] = useState({});

  // In your state definitions, replace isLoaded with:
// Replace individual loading states with:
const [loadingStates, setLoadingStates] = useState({
  conversations: {
    isLoading: false,
    error: null
  },
  messages: {
    isLoading: false,
    error: null
  },
  search: {
    isLoading: false,
    error: null
  },
  projects: { 
    isLoading: false,
    error: null
   },

});

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validationRequests, setValidationRequests] = useState({}); 

  const [projectStatuses, setProjectStatuses] = useState(null); 
  const [callState, setCallState] = useState({
    isCalling: false,
    isCallConnected: false,
    isIncomingCall: false,
    isCallRejected: false,
    isVideoCall: false,
    callId: null,
    callerId: null,
    calleeId: null,
    localStream: null,
    remoteStream: null,
    isMuted: false,
    isVideoEnabled: true,
    isSpeakerMuted: false,
    volume: 100,
    callDuration: '00:00:00'
  });
  const [pendingIceCandidates, setPendingIceCandidates] = useState([]);


  const peerConnectionRef = useRef(null);
  const callStateRef = useRef(callState);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);



  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const messagesEndRef = useRef(null);



  // Socket connection setup
  useEffect(() => {
    // Connect to Socket.io server (if not already connected)
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
     
    };
  }, []);



  // Fetch conversations
// Fetch conversations
useEffect(() => {
  if (!user?._id) return;

  const fetchConversations = async () => {
    setLoadingStates(prev => ({
      ...prev,
      conversations: { isLoading: true, error: null }
    }));

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/server/conversations/${user._id}`,
        { withCredentials: true }
      );

      setConversations(data);

   

    } catch (error) {
      setLoadingStates(prev => ({
        ...prev,
        conversations: { 
          isLoading: false, 
          error: error.response?.data?.message || "Failed to load conversations"
        }
      }));
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        conversations: { ...prev.conversations, isLoading: false }
      }));
    }
  };

  fetchConversations();
}, [user?._id]);




  // Handle online status tracking
  useEffect(() => {
    if (user?._id) {
      socket.emit("userOnline", user._id);
    }

    if (user?._id && selectedConversation?._id) {
      socket.emit("joinRoom", selectedConversation._id, user._id);
    }

   
    const handleUserStatus = ({ userId, status, lastActive }) => {
      setOnlineUsers((prev) => {
        const updated = new Map(prev);
        if (status === "online") {
          updated.set(userId, true);
        } else {
          updated.delete(userId);
          if (lastActive) {
            setUserLastActive((prev) => new Map(prev).set(userId, lastActive));
          }
        }
        return updated;
      });
    };

    socket.on("userStatus", handleUserStatus);

    return () => {
      socket.off("userStatus", handleUserStatus);
    };
  }, [user?._id, selectedConversation?._id]);

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Handle new messages from socket
  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("📨 Real-time message received:", message);

      // If this message belongs to the currently selected conversation
      if (message.conversationId === selectedConversation?._id) {
        // If the message already has sender info correctly formatted, just add it
        if (message.senderId && typeof message.senderId === 'object' && message.senderId.firstName) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
        // If the message doesn't have sender info properly formatted, we need to add it
        else {
          // Find the other user in the conversation to use their info
          const otherUser = getOtherUser(selectedConversation);

          // Create a properly formatted message
          const formattedMessage = {
            ...message,
            senderId: {
              _id: otherUser._id,
              firstName: otherUser.firstName,
              lastName: otherUser.lastName,
              profileImg: otherUser.profileImg
            },
            readBy: message.readBy || [] // Ensure readBy is always an array
          };

          setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        }
      }

      // Update the conversation list to show the latest message
      setConversations(prevConversations =>
        prevConversations.map(conv => {
          if (conv._id === message.conversationId) {
            // If this isn't the sender, increment unread count
            const isFromCurrentUser = message.senderId._id === user._id ||
              (typeof message.senderId === 'string' && message.senderId === user._id);

            return {
              ...conv,
              lastMessage: message.text,
              // Only increment unread if message is from someone else
              unreadCount: isFromCurrentUser ? (conv.unreadCount || 0) : (conv.unreadCount || 0) + 1
            };
          }
          return conv;
        })
      );
    };

    // Listen for message read updates
    const handleMessageReadUpdated = (updatedMessage) => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg._id === updatedMessage._id
            ? { ...msg, readBy: updatedMessage.readBy, read: updatedMessage.read }
            : msg
        )
      );
    };

      // Listen for new message toast notifications
      const handleNewMessageToast = (data) => {
        console.log("New message toast received:", data);
        let messageContent = data.message;
        if (data.messageType === "image") {
          messageContent = "an image";
        } else if (data.messageType === "audio") {
          messageContent = "an audio message";
        }
        
        toast(`${data.senderName} has sent you ${messageContent}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      };  


    // Listen for new messages
    socket.on("newMessage", handleNewMessage);
    socket.on("messageReadUpdated", handleMessageReadUpdated);
    socket.on("newMessageToast", handleNewMessageToast);

    // Cleanup: Remove the event listeners when the component unmounts
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageReadUpdated", handleMessageReadUpdated);
      socket.off("newMessageToast", handleNewMessageToast);
    };
  }, [selectedConversation, user]);

  // Auto-select first conversation when available
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      handleSelectConversation(conversations[0], 0);
    }
  }, [conversations]);


    
    useEffect(() => {
      const fetchFirstConversationMessages = async () => {
        if (conversations.length > 0 && !selectedConversation) {
          try {
            const firstConversation = conversations[0];
            
            // Set loading state for messages
            setLoadingStates(prev => ({
              ...prev,
              messages: { isLoading: true, error: null }
            }));
  
            // Fetch messages
            const { data } = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/server/messages/${firstConversation._id}?userId=${user._id}`,
              { withCredentials: true }
            );
  
            // Update state
            setSelectedConversation(firstConversation);
            setMessages(data);
            setSelectedUser(getOtherUser(firstConversation));
  
            // Mark as read
            await markConversationMessagesAsRead(firstConversation._id);
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/server/conversations/${firstConversation._id}/read`,
              { userId: user._id },
              { withCredentials: true }
            );
  
          } catch (error) {
            setLoadingStates(prev => ({
              ...prev,
              messages: { 
                isLoading: false, 
                error: error.response?.data?.message || "Failed to load messages" 
              }
            }));
          } finally {
            setLoadingStates(prev => ({
              ...prev,
              messages: { ...prev.messages, isLoading: false }
            }));
          }
        }
      };
  
      fetchFirstConversationMessages();
    }, [conversations]); 
  

  // Scroll to bottom when messages change
  useEffect(() => {
    // Delay to ensure image is rendered
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  // Helper functions
  const getOtherUser = (conversation) => {
    if (!conversation) return null;
    if (conversation.sellerId?._id === user?._id) {
      return conversation.buyerId; // If current user is the seller, return buyer details
    } else {
      return conversation.sellerId; // If current user is the buyer, return seller details
    }
  };

  const getProfileImage = (profileImg) => {
    // Check if it's a file stored under 'uploads' and prepend backend URL
    if (profileImg && profileImg.startsWith("uploads")) {
      return `${import.meta.env.VITE_BACKEND_URL}/${profileImg}`; // Concatenate the backend URL with the image path
    }

  
    return profileImg; // Fallback to default image if profileImg is missing
  };

  const isUserOnline = (userId) => onlineUsers.has(userId);

  const getUserLastActive = (userId) => {
    const lastActive = userLastActive.get(userId);
    if (!lastActive) return "Unknown";
    return formatLastActive(lastActive);
  };

  const formatLastActive = (dateString) => {
    const lastActiveDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastActiveDate) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `Active ${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `Active ${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `Active ${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const formatMessageTime = (dateString) => {
    if (!dateString) return "";

    const messageDate = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format time as HH:MM AM/PM
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = messageDate.toLocaleTimeString(undefined, timeOptions);

    // If message is from today, just show the time
    if (messageDate >= today) {
      return timeString;
    }
    // If message is from yesterday, show "Yesterday"
    else if (messageDate >= yesterday) {
      return `Yesterday, ${timeString}`;
    }
    // Otherwise show date and time
    else {
      const dateOptions = { month: 'short', day: 'numeric' };
      return `${messageDate.toLocaleDateString(undefined, dateOptions)}, ${timeString}`;
    }
  };
  const formatAudioTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Main functions
  const handleSelectConversation = async (conversation, index) => {
    setSelectedIndex(index);
    setSelectedConversation(conversation);

    console.log("🟢 Selected conversation:", conversation);
    console.log("📩 Fetching messages for conversationId:", conversation._id);

      // Extract project status if available
      setProjectStatuses(conversation?.project?.status || "Unknown");

    try {
      // Mark conversation as read first
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/conversations/${conversation._id}/read`,
        { userId: user._id },
        { withCredentials: true }
      );

      await markConversationMessagesAsRead(conversation._id);


      // Update local state to reset unread count
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv._id === conversation._id
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );

      // Clear previous messages before fetching new ones
      setMessages([]);

      // Fetch messages for the selected conversation
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/server/messages/${conversation._id}?userId=${user._id}`,

        { withCredentials: true }
      );

      console.log("✅ Messages received:", data);

      // Check if data is an empty array or contains the "No messages found" message
      if (Array.isArray(data) && data.length > 0) {
        setMessages(data);
      } else {
        // Keep messages as an empty array, which the UI can handle
        console.log("No messages found for this conversation");
      }

      // Get the other user in the conversation
      const otherUser = getOtherUser(conversation);
      setSelectedUser(otherUser);

      if (otherUser?._id) {
        // Fetch last active time for the other user
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/server/users/user/${otherUser._id}`,
          { withCredentials: true }
        );

        console.log("🕒 Last active:", userResponse.data.lastActive);

        // Store last active time in state
        setUserLastActive((prev) => new Map(prev).set(otherUser._id, userResponse.data.lastActive));
      }

      // Emit an event that the user has joined the chat (Online Status)
      socket.emit("userOnline", user._id);

      // Join the conversation room for real-time updates
      socket.emit("joinRoom", conversation._id, user._id);
    } catch (error) {
      // If there's an error, make sure to clear the messages
      setMessages([]);
      console.error("❌ Error fetching messages:", error.response?.data || error);
    }
  };

  

const requestProjectValidation = (projectId, lastPrice, deliveryTime) => {
  if (!projectId || !lastPrice || !deliveryTime) {
      console.error("Project ID, last price, and delivery time are required.");
      return;
  }

  setValidationRequests(prev => ({
      ...prev,
      [projectId]: { lastPrice, deliveryTime, isValidationRequested: true, isPendingBuyerApproval: true },
  }));
};

// Function for buyer to accept the request
const acceptProjectValidation = (projectId) => {
  if (!validationRequests[projectId]) return;

  setValidationRequests(prev => ({
      ...prev,
      [projectId]: { 
          ...prev[projectId], 
          isValidationRequested: false, 
          isPendingBuyerApproval: false, 
          isApproved: true 
      },
  }));

  // TODO: Make API request to update the project with lastPrice & deliveryTime
};

// Function for buyer to decline the request
const declineProjectValidation = (projectId) => {
  if (!validationRequests[projectId]) return;

  setValidationRequests(prev => ({
      ...prev,
      [projectId]: { 
          ...prev[projectId], 
          isValidationRequested: false, 
          isPendingBuyerApproval: false, 
          isApproved: false 
      },
  }));

  // TODO: Handle UI reset or notify the seller
};


  const markConversationMessagesAsRead = async (conversationId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/messages/mark-read`,
        {
          conversationId,
          userId: user._id
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return; // Prevent sending empty messages

    try {
      const messageData = {
        conversationId: selectedConversation._id,
        senderId: user._id,
        text,
        messageType: "text", // Add message type to be consistent
        createdAt: new Date().toISOString(), // Add creation time
      };
  
      // Send message to the backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/server/messages/new-message`,
        messageData,
        { withCredentials: true }
      );

      console.log("✅ Message sent:", data);

      // Create a properly formatted message object with populated sender info
      const formattedMessage = {
        ...messageData,
        senderId: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImg: user.profileImg
        },
        conversationId: selectedConversation._id, // Ensure this is the conversation ID
      };

     

      // Update UI with the properly formatted message
      setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      setText(""); // Clear input after sending

      // Emit message to Socket.io for real-time updates
      socket.emit("sendMessage", messageData);
    } catch (error) {
      console.error("❌ Error sending message:", error.response?.data || error);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file: file,
          preview: reader.result
        });
        setOpen(false); // Close the dropdown after image selection
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image (JPEG, PNG, GIF, WebP)');
    }
  };

 
  const sendImageMessage = async () => {
    if (!selectedImage || !selectedConversation) return;
  
    try {
      setLoading(true);
      
      // Create a temporary message object for immediate display
      const tempImageMessage = {
        _id: Date.now().toString(), // Temporary ID until we get the real one
        conversationId: selectedConversation._id,
        senderId: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImg: user.profileImg,
        },
        messageType: "image",
        imageUrl: selectedImage.preview, // Use the preview URL temporarily
        createdAt: new Date().toISOString(),
      };
      
      // Update UI immediately with the temporary message
      setMessages((prev) => [...prev, tempImageMessage]);
      
      // Create form data for the upload
      const formData = new FormData();
      formData.append("image", selectedImage.file, selectedImage.file.name);
      formData.append("conversationId", selectedConversation._id);
      formData.append("senderId", user._id);
      formData.append("messageType", "image");
  
      // Emit socket event first with basic info (optional - you might wait for the real URL)
      socket.emit("sendMessage", {
        conversationId: selectedConversation._id,
        senderId: { // Send as object to match text message structure
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImg: user.profileImg
        },
        messageType: "image",
        imageUrl: selectedImage.preview, // Include temporary preview
        createdAt: new Date().toISOString(),
      });
  
      // Send to server
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/server/messages/new-message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
  
      // Once we have the real URL from the server, update the message or emit a new socket event
      const serverImageMessage = {
        ...response.data,
        senderId: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImg: user.profileImg,
        }
      };
      
      // Emit the final message with the real URL
      socket.emit("imageMessageUploaded", serverImageMessage);
      
      // Reset image state
      setSelectedImage(null);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error sending image message:", error);
      toast.error("Failed to send image");
    } finally {
      setLoading(false);
    }
  };
  
  // Reset Image Selection
  const resetImageSelection = () => {
    setSelectedImage(null);
    setUploadProgress(0);
  };

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return '';

    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        // Add an event listener to handle the blob creation when recording stops
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioBlob(audioBlob);

          // If there's a stream, stop all tracks
          if (mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
          }

          setIsRecording(false);
          resolve(audioBlob); // Resolve the promise with the audioBlob
        };

        mediaRecorderRef.current.stop();
      } else {
        // If there's no active recording, resolve with the current audioBlob
        resolve(audioBlob);
        setIsRecording(false);
      }
    });
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setAudioBlob(null);
  };

  const sendAudioMessage = async (explicitBlob = null) => {
    // Use the provided blob or fall back to the state blob
    const blobToSend = explicitBlob || audioBlob;

    if (!blobToSend || !selectedConversation) return;

    try {
      setIsUploading(true);

      // Create a FormData object and append the audio blob
      const formData = new FormData();
      formData.append("audio", blobToSend, "recording.webm");

      // Upload to your server
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/server/audio/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { audioUrl } = response.data;
      console.log("Audio URL:", audioUrl);

      // Create a message object for your database
      const newAudioMessage = {
        conversationId: selectedConversation._id,
        senderId: user._id,
        audioUrl: audioUrl,
        duration: recordingTime,
        messageType: "audio",
        createdAt: new Date().toISOString(),
      };

      // Emit via socket to update in real-time
      socket.emit("sendMessage", newAudioMessage);

      // Save to your database
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/server/messages/new-message`,
        newAudioMessage,
        {
          withCredentials: true,
        }
      );

      // Add to local state for immediate display
      const messageWithSenderObject = {
        ...newAudioMessage,
        senderId: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImg: user.profileImg,
        },
        _id: Date.now().toString(), // Temporary ID until we get the real one from socket
      };

      setMessages((prev) => [...prev, messageWithSenderObject]);

      // Reset audio state
      setAudioBlob(null);
    } catch (error) {
      console.error("Error sending audio message:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Update your handleSearch function:
  const handleSearch = async (query) => {
    setSearchQuery(query);

    // Clear results if query is empty
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      // If user is a buyer, search for sellers only, and vice versa
      const roleToSearch = user.isBuyer ? 'seller' : 'buyer';

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/server/users/search`,
        {
          params: { query, role: roleToSearch },
          withCredentials: true,
        }
      );

      console.log('Search response:', response.data);
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };


  const onUserSelect = async (selectedUser) => {
    try {
       // Check existing conversations (including deleted)
       const { data: existingConversation } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/server/conversations/find`,
        {
          sellerId: user.isBuyer ? selectedUser._id : user._id,
          buyerId: user.isBuyer ? user._id : selectedUser._id
        }
      );
      if (existingConversation) {
        // Restore if needed
        if (existingConversation.deletedFor?.includes(user._id)) {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/server/conversations/${existingConversation._id}/restore`,
            { userId: user._id },
            { withCredentials: true }
          );
        }
      
      // Refresh conversations list
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/server/conversations/${user._id}`,
        { withCredentials: true }
      );
      setConversations(data);
      
      // Find the updated conversation index
      const convIndex = data.findIndex(c => c._id === existingConversation._id);
      handleSelectConversation(data[convIndex], convIndex);
      } else {
          // Create new conversation
          const newConversation = {
            sellerId: user.isBuyer ? selectedUser._id : user._id,
            buyerId: user.isBuyer ? user._id : selectedUser._id
          };

        // Send the new conversation to the backend
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/server/conversations/new-conversation`,
          newConversation,
          { withCredentials: true }
        );

        console.log('New conversation created:', data);

        setConversations(prev => [...prev, data]);
        handleSelectConversation(data, conversations.length);
  
      }

      // Clear search results after selection
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error creating or selecting conversation:', error);
    }
  };


const handleDeleteConversation = async () => {
  if (!selectedConversation?._id) {
    console.error('No conversation selected');
    return;
  }

  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/server/conversations/${selectedConversation._id}`,
      {
        data: { userId: user._id },
        withCredentials: true
      }
    );
    
    // Update local state
    setConversations(prev => prev.filter(c => c._id !== selectedConversation._id));
    
    // Clear selected conversation
    setSelectedConversation(null);
    setMessages([]);
    
    // Optional: Show success feedback
    toast("Conversation Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    
  } catch (error) {
    console.error('Error deleting conversation:', error);
    toast("Failed to delete conversation", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};




  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

    // Camera Permission Check
    const checkCameraPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'camera' });
        return result.state === 'granted';
      } catch (error) {
        console.warn("Permission query failed:", error);
        return false;
      }
    };
  
    // Utility function to release existing media streams
    const releaseMediaStreams = (stream) => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };

  // Socket listeners
  useEffect(() => {
    // Store pending signals before peer connection is initialized
    let pendingSignals = [];

    const handleIncomingCall = async ({ callId, callerId, isVideoCall }) => {
      console.log('Current user object:', user); // Add this line
      console.log('User ID:', user?._id); // And this line
      if (!user) {
        toast.error("Please sign in to accept calls");
        return;
      }
    
      console.log(`Incoming ${isVideoCall ? 'video' : 'audio'} call from:`, callerId);
      releaseMediaStreams(callState.localStream);
  releaseMediaStreams(callState.remoteStream);
    
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" }
        ],
        iceCandidatePoolSize: 10
      });
    
      peerConnectionRef.current = pc;
    
      // Edge workaround
      if (isVideoCall && /Edge/.test(navigator.userAgent)) {
        pc.addTransceiver('video', { direction: 'recvonly' });
        pc.addTransceiver('audio', { direction: 'recvonly' });
      }
    
      try {
        if (isVideoCall) {
          const hasCameraPermission = await checkCameraPermission();
          if (!hasCameraPermission) {
            toast.error("Camera access is required for video calls");
            socket.emit("rejectCall", { callId, calleeId: user?._id });
            return;
          }
        }
    
        const localStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: isVideoCall
        });
    
        localStream.getTracks().forEach(track => 
          pc.addTrack(track, localStream)
        );
    
        setCallState(prev => ({
          ...prev,
          isIncomingCall: true,
          isVideoCall,
          callId,
          callerId,
          localStream
        }));
    
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("signal", {
              callId,
              to: callerId,
              signal: { candidate: event.candidate }
            });
          }
        };
    
        pc.ontrack = (event) => {
          const remoteStream = event.streams[0] || new MediaStream([event.track]);
          setCallState(prev => ({
            ...prev,
            remoteStream,
            isCallConnected: true
          }));
        };
    
        // Process pending signals
        for (const data of pendingSignals) {
          if (data.callId === callId) await processSignal(data, pc);
        }
        pendingSignals = pendingSignals.filter(data => data.callId !== callId);
    
      } catch (error) {
        console.error("Call setup failed:", error);
        
        if (pc) pc.close();
        
        let errorMessage = "Call failed";
        if (error.name === 'NotAllowedError') {
          errorMessage = isVideoCall ? "Camera blocked" : "Microphone blocked";
        } else if (error.name === 'NotReadableError') {
          errorMessage = "Device in use by another app";
        }
        
        toast.error(errorMessage);
        socket.emit("rejectCall", { callId, calleeId: user?._id });
        endCall();
      }
    };

    // Helper function to process signal data
    const processSignal = async (data, pc) => {
      const { signal, from } = data;

      try {
        if (signal.offer) {
          console.log(`📡 Processing offer from: ${from}`, signal.offer);
          await pc.setRemoteDescription(new RTCSessionDescription(signal.offer))
            .then(() => console.log("✅ Offer set successfully"))
            .catch((err) => console.error("❌ Error setting offer:", err));
        } else if (signal.answer) {
          console.log("Processing answer from:", from);
          await pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
        } else if
          (signal.candidate) {
          console.log(`❄️ ICE Candidate received from: ${from}`, signal.candidate);
          if (pc.remoteDescription && pc.remoteDescription.type) {
            console.log("Adding ICE candidate");
            await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
            console.log("✅ ICE Candidate added successfully");
          } else {
            console.log("Storing ICE candidate for later");
            setPendingIceCandidates(prev => [...prev, signal.candidate]);
          }
        }
      } catch (error) {
        console.error("Error processing signal:", error);
      }
    };

    const handleSignal = async (data) => {
      const { callId } = data;
      const pc = peerConnectionRef.current;

      if (!pc) {
        console.log("Peer connection not initialized, storing signal for later");
        pendingSignals.push(data);
        return;
      }

      await processSignal(data, pc);
    };

    const handleCallEnded = ({ callId, reason }) => {
      console.log(`Call ended${reason ? ` (${reason})` : ''}`);
      endCall();
    };



    const handleCallRejected = ({ callId, calleeId }) => {
      console.log(`Call rejected by callee: ${calleeId}`);

      // Show toast notification
      toast("📞 Your Call has been Rejected", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setCallState((prev) => ({
        ...prev,
        isCalling: false,
        isCallConnected: false,
        isIncomingCall: false,
        isCallRejected: true,
        callId: null,
        callerId: null,
        calleeId: null,
        localStream: null,
        remoteStream: null,
      }));

      // Optional: Automatically reset after 3 seconds
      setTimeout(() => {
        endCall();
      }, 3000);
    };

    // Socket event listeners
    socket.on("incomingCall", handleIncomingCall);
    socket.on("signal", handleSignal);
    socket.on("callEnded", handleCallEnded);
    socket.on("callRejected", handleCallRejected);

    return () => {
      socket.off("incomingCall", handleIncomingCall);
      socket.off("signal", handleSignal);
      socket.off("callEnded", handleCallEnded);
      socket.off("callRejected", handleCallRejected);
    };
  }, []);

  // Initiate call function
  const initiateCall = async (calleeId) => {
    if (!calleeId) {
      console.error("No callee ID provided");
      return;
    }
  
    try {
      // Generate a unique call ID
      const callId = `${user._id}-${Date.now()}`;
      
      console.log("Initiating audio call with ID:", callId);
  
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" }
        ]
      });
  
      // Store in ref
      peerConnectionRef.current = pc;
  
      // Get local audio stream only
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
  
      // Update state
      setCallState(prev => ({
        ...prev,
        isCalling: true,
        isVideoCall: false, // Explicitly set to false for audio call
        callId,
        callerId: user._id,
        calleeId,
        localStream
      }));
  
      // ICE Candidate handler
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("signal", {
            callId,
            to: calleeId,
            signal: { candidate: event.candidate }
          });
        }
      };
  
      // Track handler
      pc.ontrack = (event) => {
        console.log("Remote track received:", event.streams);
        setCallState(prev => ({
          ...prev,
          remoteStream: event.streams[0],
          isCallConnected: true
        }));
      };
  
      // Add tracks to peer connection
      localStream.getTracks().forEach(track =>
        pc.addTrack(track, localStream)
      );
  
      // Create and send offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
  
      // Notify server about call initiation (with call type)
      socket.emit("initiateCall", {
        callerId: user._id,
        calleeId,
        callId,
        isVideoCall: false // Explicitly tell server this is audio call
      });
  
      // Send offer to callee
      socket.emit("signal", {
        callId,
        to: calleeId,
        signal: { offer: pc.localDescription }
      });
  
    } catch (error) {
      console.error("Audio call initiation failed:", error);
      endCall();
    }
  };

  // Video call function
const initiateVideoCall = async (calleeId) => {
  if (!calleeId) {
    console.error("No callee ID provided");
    return;
  }

  try {
    // Generate a unique call ID
    const callId = `${user._id}-${Date.now()}`;
    
    console.log("Initiating video call with ID:", callId);

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    });

    // Store in ref
    peerConnectionRef.current = pc;

    // Get local audio and video stream
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    // Update state
    setCallState(prev => ({
      ...prev,
      isCalling: true,
      isVideoCall: true, // Explicitly set to true for video call
      callId,
      callerId: user._id,
      calleeId,
      localStream
    }));

    // ICE Candidate handler
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signal", {
          callId,
          to: calleeId,
          signal: { candidate: event.candidate }
        });
      }
    };

    // Track handler
    pc.ontrack = (event) => {
      console.log("Remote track received:", event.streams);
      setCallState(prev => ({
        ...prev,
        remoteStream: event.streams[0],
        isCallConnected: true
      }));
    };

    // Add tracks to peer connection
    localStream.getTracks().forEach(track =>
      pc.addTrack(track, localStream)
    );

    // Create and send offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Notify server about call initiation (with call type)
    socket.emit("initiateCall", {
      callerId: user._id,
      calleeId,
      callId,
      isVideoCall: true // Explicitly tell server this is video call
    });

    // Send offer to callee
    socket.emit("signal", {
      callId,
      to: calleeId,
      signal: { offer: pc.localDescription }
    });

  } catch (error) {
    console.error("Video call initiation failed:", error);
    endCall();
  }
};


  // Accept call function
  const acceptCall = async () => {
    const pc = peerConnectionRef.current;
    const { callId, callerId } = callStateRef.current;

    if (!pc) {
      console.error("No active peer connection");
      return;
    }

    try {
      // Check if remote description is set
      if (!pc.remoteDescription || !pc.remoteDescription.type) {
        console.error("Cannot accept call: Remote description not set");
        // Wait for offer and retry
        setTimeout(() => {
          if (callStateRef.current.isIncomingCall) {
            acceptCall();
          }
        }, 1000);
        return;
      }

      // Notify server about call acceptance
      socket.emit("acceptCall", {
        callId,
        calleeId: user._id
      });

      // Create and send answer
      const answer = await pc.createAnswer();
      console.log("📤 Sending answer:", answer);
      await pc.setLocalDescription(answer);

      console.log("Sending answer to:", callerId);
      socket.emit("signal", {
        callId,
        to: callerId,
        signal: { answer: pc.localDescription }
      });

      // Add any pending ICE candidates
      if (pendingIceCandidates.length > 0) {
        console.log(`Adding ${pendingIceCandidates.length} pending ICE candidates`);
        for (const candidate of pendingIceCandidates) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
        setPendingIceCandidates([]);
      }

      setCallState(prev => ({
        ...prev,
        isCallConnected: true,
        isIncomingCall: false
      }));

    } catch (error) {
      console.error("Call acceptance failed:", error);
    }
  };

  // Reject call function
  // Reject call function
  const rejectCall = () => {
    const { callId, callerId } = callStateRef.current;

    if (callId && callerId) {
      // Emit call rejection event with correct callee ID (current user)
      socket.emit("callRejected", {
        callId,
        callerId,
        calleeId: user._id, // The current user (receiver) is the callee
      });

      // Immediately end the call on the receiver's side
      endCall();
    }
  };

  // End call function
  const endCall = () => {
    const pc = peerConnectionRef.current;
    const { callId, localStream } = callStateRef.current;

    if (pc) {
      pc.close();
      peerConnectionRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Reset state
    setCallState({
      isCalling: false,
      isCallConnected: false,
      isIncomingCall: false,
      callId: null,
      callerId: null,
      calleeId: null,
      localStream: null,
      remoteStream: null
    });

    // Notify server if call exists
    if (callId) {
      console.log("Ending call with ID:", callId);
      socket.emit("endCall", { callId });
    }
  };


  // Provide context values
  const contextValue = {
    // State
    messages,
    conversations,
    selectedConversation,
    selectedUser,
    selectedIndex,
    text,
    isRecording,
    recordingTime,
    audioBlob,
    isUploading,
    callState,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    // Functions
    setText,
    setMessages,
    setConversations,
    handleSelectConversation,
    getOtherUser,
    getProfileImage,
    isUserOnline,
    getUserLastActive,
    formatLastActive,
    formatMessageTime,
    initiateCall,
    formatAudioTime,
    formatLastMessageTime,
    sendMessage,
    loadingStates,
    // Audio functions
    startRecording,
    stopRecording,
    cancelRecording,
    sendAudioMessage,
    // Refs
    messagesEndRef,
    projectStatuses,
    initiateVideoCall,

    // New search-related state and functions
    searchQuery,
    searchResults,
    searchLoading,
    setSearchQuery,
    handleSearch,
    onUserSelect,

    // Image Uploading 

    selectedImage,
    uploadProgress,
    loading,
    handleImageUpload,
    sendImageMessage,
    resetImageSelection,
    open,
    setOpen,
    handleDeleteConversation,
    projects,
    gigs,
    validationRequests, 
    requestProjectValidation, 
    acceptProjectValidation, 
    declineProjectValidation ,
    

  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};


export const useChat = () => useContext(ChatContext);