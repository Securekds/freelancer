import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUser } from './UserContext.jsx';
import { toast } from 'react-toastify';
import { socket } from '../utils/socket.js';
import { useNavigate } from "react-router-dom";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();



  useEffect(() => {
    if (user?._id) {
      // Connect to the Socket.io server
      socket.connect();

      // Register the user with their socket ID
      socket.emit('userOnline', user._id);

      // Fetch initial notifications from the server
      const fetchNotifications = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/server/notifications/${user._id}`,
            { withCredentials: true }
          );
          console.log('Fetched Notifications' , response);
          setNotifications([]);
          setNotifications(response.data.notifications);
          setUnreadCount(response.data.notifications.filter(n => !n.isRead).length);
        } catch (error) {
          console.error("❌ Failed to fetch notifications:", error);
        }finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }

  // Cleanup on unmount
  return () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };
}, [user?._id]);

    // Listen for new notifications
    useEffect(() => {
      if (!user?._id) return;
      const handleNewNotification = (notification) => {
        setNotifications((prev) => {
          const exists = prev.some((n) => n._id === notification._id);
          return exists ? prev : [notification, ...prev];
        });
    
        setUnreadCount((prev) => prev + 1);
  
        // Show a toast notification
        toast("🎉 You Received A New Notification", {
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
  
      socket.on('newNotification', handleNewNotification);
  
      // Cleanup event listener
      return () => {
        socket.off('newNotification', handleNewNotification);
      };
    }, [user?._id]);

  const markAllAsRead = async (userId) => {
    if (!userId) return;
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/server/notifications/mark-as-read/${user._id}`,
        { withCredentials: true }
      );
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('❌ Failed to mark notifications as read', error);
    }
  };


  const markSingleNotificationAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/server/notifications/mark-read/${notificationId}`,
        {}, // No body needed
        { withCredentials: true } // Ensures cookies are sent
      );
      
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
          // Show a toast notification
          toast("🎉 Notification marked as read", {
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
      console.error('❌ Failed to mark single notification as read', error);
    }
  };


  const getTypeBadgeCount = (type) => {
    return notifications.filter(n => n.type === type && !n.isRead).length;
  };


  const startConversation = async (sellerId, buyerId, projectId) => {
    setIsLoading(true); // Start loading

    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/server/conversations/new-conversation`,
            { sellerId, buyerId, projectId }, // Sending as an object
            { withCredentials: true }
        );

        if (data) {
            navigate("/userdashboard/profile/messages"); // Navigate first
            window.location.reload(); // Force reload to refresh conversations
        }
    } catch (error) {
        console.error("Error creating conversation:", error);
    } finally {
        setIsLoading(false); // Stop loading
    }
};

  

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      loading,
      markSingleNotificationAsRead,
      getTypeBadgeCount,
      markAllAsRead,
      startConversation,
      isLoading,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};