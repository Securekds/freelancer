import Notification from "../models/notification.model.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, title, description, type = "system" } = req.body;

    const notification = new Notification({ 
      userId, 
      title, 
      description, 
      type 
    });
    await notification.save();

    sendNotification(userId, { title, description });

    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error creating notification",
      error: error.message 
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      page = 1, 
      limit = 10, 
      type,
      isRead 
    } = req.query;

    const query = { userId };
    if (type) query.type = type;
    if (isRead !== undefined) query.isRead = isRead === 'true';

    const options = {
      sort: { createdAt: -1 },
      limit: parseInt(limit),
      skip: (page - 1) * limit
    };

    const [notifications, total] = await Promise.all([
      Notification.find(query, null, options),
      Notification.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      notifications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching notifications",
      error: error.message 
    });
  }
};


export const markNotificationsAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Notification.updateMany(
      { userId, isRead: false }, 
      { isRead: true }
    );

    res.status(200).json({ 
      success: true, 
      message: "Notifications marked as read",
      updatedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error marking notifications",
      error: error.message 
    });
  }
};

export const createDefaultUserNotification = async (userId) => {
  try {
    const defaultNotification = new Notification({
      userId,
      title: "Welcome to Khadamat! 🚀 Your Journey Begins Here!",
      description: "We're thrilled to have you on board! 🎉 To unlock the full potential of your account and start connecting with buyers and sellers, please verify your account. This step ensures a secure and seamless experience for you and the Khadamat community.",
      type: "system"
    });
    await defaultNotification.save();
    return defaultNotification;
  } catch (error) {
    console.error("Error creating default notification:", error);
    return null;
  }
};

export const markSingleNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    const notification = await Notification.findByIdAndUpdate(
      notificationId, 
      { isRead: true }, 
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: "Notification not found" 
      });
    }



    res.status(200).json({ 
      success: true, 
      notification 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error marking notification as read",
      error: error.message 
    });
  }
};