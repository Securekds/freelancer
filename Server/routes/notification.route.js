import express from "express";
import { 
  getNotifications, 
  markNotificationsAsRead ,
  markSingleNotificationAsRead,
  createNotification
} from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();


router.post("/NewNotfication"  ,  createNotification)
// Route to get notifications for a user with pagination and filtering
router.get("/:userId", verifyToken, getNotifications);

// Route to mark all notifications as read for a user
router.put("/mark-as-read/:userId", verifyToken, markNotificationsAsRead);

// Route to mark a single notification as read
router.patch("/mark-read/:notificationId", verifyToken, markSingleNotificationAsRead);

export default router;