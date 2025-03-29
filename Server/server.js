import express from "express";
import mongoose from './dbConnection.js'; 
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import ranksRoute from "./routes/ranks.route.js";
import ReviewsRoute from "./routes/reviews.route.js";
import GigsRoute from "./routes/gig.route.js";
import OffersRoute from "./routes/offer.route.js";
import ProjectsRoute from "./routes/projects.route.js";
import smsRoute from "./routes/sms.route.js";
import notificationRoutes from "./routes/notification.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import MessagesRoute from "./routes/message.route.js";
import adminRoute from "./routes/admin.route.js";
import sessionRoutes from "./routes/session.route.js";
import audioRoutes from "./routes/audio.route.js";
import paymentRoutes from './routes/payment.route.js';
import https from "https";
import './utils/cronJobs.js';  // Import the cron job file

import walletRoutes from './routes/buyerswallet.route.js';
import transactionRoutes from './routes/transaction.route.js';
import uploadRoutes from './routes/upload.route.js'; // ✅ Import the new route
import invoiceRoutes from './routes/invoice.route.js';
import { trackSession } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Conversation from "./models/conversation.model.js";
import http from "http"; // Import HTTP module
import { Server } from "socket.io"; // Import Socket.io
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import helmet from "helmet"; // Import Helmet
import xssClean from "xss-clean"; // Import xss-clean
import categoryRoutes from './routes/category.route.js';
import subcategoryRoutes from './routes/subcategory.route.js';
import useragent from "express-useragent";
import rateLimit from "express-rate-limit";


import fs from "fs";

import Notification from "./models/notification.model.js";



const app = express();
app.use(useragent.express()); // Enable user agent detection
// Environment setup
dotenv.config();
mongoose.set('strictQuery', true);




app.use(
  cors({
    origin: [
      "http://62.171.139.251", 
      "https://localhost:5173",
      "http://localhost:5173" 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// Now this will work



const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://62.171.139.251", "https://localhost:5173"], // Allow both
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const onlineUsers = new Map(); // userId -> socket ID

const activeCalls = new Map(); // callId -> { callerId, calleeId }

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // ========================
  // User Status Management
  // ========================

  // When a user logs in
  socket.on('userOnline', (userId) => {
    if (!userId) {
      console.error("❌ userOnline: Missing userId!");
      return;
    }

      // Ensure userId is a string
  const userIdStr = userId.toString();


    onlineUsers.set(userIdStr, socket.id);
    io.emit('userStatus', { userId: userIdStr, status: 'online' });
  console.log(`🟢 User ${userIdStr} is online`);

  

  });

  // When a user joins a chat room
  socket.on('joinRoom', (conversationId, userId) => {
    if (!conversationId || !userId) {
      console.error("❌ joinRoom: Missing conversationId or userId!");
      return;
    }

    socket.join(conversationId);
    onlineUsers.set(userId, socket.id);

    // Notify all users in this conversation that this user is online
    io.to(conversationId).emit('userStatus', { userId, status: 'online' });
    console.log(`📩 User ${userId} joined room: ${conversationId} and is now online`);
  });

  // ========================
  // Messaging
  // ========================

  // When a user sends a message
// When a user sends a message
// This is the updated socket.on('sendMessage') handler
socket.on('sendMessage', async (message) => {
  if (!message?.conversationId) {
    console.error("❌ sendMessage: Missing conversationId!");
    return;
  }

  console.log('📩 New message received:', message);

  try {
    // Fetch the conversation details if not already populated
    const conversation = await Conversation.findById(message.conversationId)
      .populate('sellerId buyerId');

    if (!conversation) {
      console.error("❌ Conversation not found:", message.conversationId);
      return;
    }
    console.log("🔍 Conversation details:", conversation);

    // Emit the message to the conversation room
    socket.to(message.conversationId).emit('newMessage', message);

    // Get the receiver's ID
    const receiverId = 
      message.senderId._id.toString() === conversation.sellerId._id.toString()
        ? conversation.buyerId._id
        : conversation.sellerId._id;
    console.log("👤 Receiver ID:", receiverId);

    // Get the socket ID for the receiver
    const receiverSocketId = onlineUsers.get(receiverId);
    
    if (receiverSocketId) {
      // Determine message content for notification
      let messageContent = message.text || "New message";
      let messageType = message.messageType || "text";
      
      // Emit directly to the receiver's socket
      io.to(receiverSocketId).emit('newMessageToast', {
        senderName: `${message.senderId.firstName} ${message.senderId.lastName}`,
        message: messageContent,
        messageType: messageType
      });
      console.log("🔔 Toast notification emitted to receiver socket:", receiverSocketId);
    } else {
      console.log("⚠️ Receiver not online, toast notification not sent");
    }

  } catch (error) {
    console.error("❌ Error handling sendMessage:", error);
  }
});

// Add a new event for marking messages as read
socket.on('markMessageRead', async (data) => {
  if (!data.messageId || !data.userId || !data.conversationId) {
    console.error("❌ markMessageRead: Missing required data!");
    return;
  }

  try {
    // Update message in database (you'll need to implement this logic)
    const updatedMessage = await Message.findByIdAndUpdate(
      data.messageId,
      { 
        $addToSet: { readBy: data.userId },
        $set: { read: true }
      },
      { new: true }
    );

    // Emit the updated message to the conversation room
    io.to(data.conversationId).emit('messageReadUpdated', updatedMessage);
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
});

// When a notification is created, emit it to the recipient
socket.on('sendNotification', (notification) => {
  const { userId } = notification;

  if (!userId) {
    console.error("❌ sendNotification: Missing userId!");
    return;
  }

  const recipientSocketId = onlineUsers.get(userId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('newNotification', notification);
    console.log(`📩 Notification sent to user ${userId}`);
  } else {
    console.log(`🔴 User ${userId} is offline, notification will be delivered when they reconnect`);
  }
});

  // ========================
  // Audio Call Functionality
  // ========================

// When a user initiates a call
socket.on('initiateCall', ({ callerId, calleeId, callId , isVideoCall }) => {
  if (!callerId || !calleeId) {
    console.error("❌ initiateCall: Missing callerId or calleeId!");
    return;
  }

  // Check if callee is online
  if (!onlineUsers.has(calleeId)) {
    socket.emit('callError', { message: 'User is offline' });
    return;
  }

   // Store call information
   activeCalls.set(callId, { 
    callerId, 
    calleeId, 
    startTime: Date.now(),
    isVideoCall: isVideoCall || false 
  });

  // Notify callee
  io.to(onlineUsers.get(calleeId)).emit('incomingCall', {
    callId,
    callerId,
    isVideoCall
  });

  console.log(`📞 Call initiated: ${callId} from ${callerId} to ${calleeId}`);
  console.log("✅ Incoming call received, updating state...");
});

// When a user accepts a call
socket.on('acceptCall', ({ callId, calleeId }) => {
  console.log(`📞 Call Accepted - Call ID: ${callId}, Callee ID: ${calleeId}`);
  const call = activeCalls.get(callId);
  if (!call || call.calleeId !== calleeId) {
    console.error("❌ Invalid call acceptance");
    return;
  }

  // Update call status
  activeCalls.set(callId, { ...call, accepted: true });

  console.log("✅ Call state updated, notifying caller...");
  io.to(onlineUsers.get(call.callerId)).emit('callAccepted', { callId });
  console.log(`📞 Call accepted: ${callId}`);
});

// When a user rejects a call
// Change from 'rejectCall' to 'callRejected'
socket.on('callRejected', ({ callId, callerId, calleeId }) => {
  const call = activeCalls.get(callId);
  if (!call) {
    console.error("❌ Call not found", callId);
    return;
  }

  // Notify caller about rejection
  if (onlineUsers.has(callerId)) {
    io.to(onlineUsers.get(callerId)).emit('callRejected', { 
      callId, 
      calleeId 
    });
  }
  
  // Remove call from active calls
  activeCalls.delete(callId);
  console.log(`📞 Call rejected: ${callId}`);
});

// When a user ends a call
socket.on('endCall', ({ callId }) => {
  console.log(`🛑 Ending call: ${callId}`);
  const call = activeCalls.get(callId);
  if (!call) {
    console.log(`⚠️ End call requested for non-existent call: ${callId}`);
    return;
  }

  console.log(`🔔 Notifying caller (${call.callerId}) and callee (${call.calleeId})`);
  [call.callerId, call.calleeId].forEach(id => {
    if (onlineUsers.has(id)) {
      io.to(onlineUsers.get(id)).emit('callEnded', { callId });
      console.log(`✅ Notified user ${id} about call end`);
    }
  });
  
  // Remove call from active calls
  activeCalls.delete(callId);
  console.log(`📞 Call ended: ${callId}, duration: ${(Date.now() - call.startTime) / 1000}s`);
});

// WebRTC signaling handler
socket.on('signal', ({ callId, to, signal }) => {
  console.log(`📡 Received signal for Call ID: ${callId}, To: ${to}`);
  console.log("📨 Signal Details:", signal);
  const targetSocket = onlineUsers.get(to);
  
  if (!targetSocket) {
    console.error("🚨 Signal: Target user is offline or not found:", to);
    socket.emit('callError', { message: 'User is no longer available', callId });
    return;
  }
  
  // Check if this is a valid call
  const call = activeCalls.get(callId);
  if (!call) {
    console.error("🚨 Signal: Call not found:", callId);
    socket.emit('callError', { message: 'Call no longer exists', callId });
    return;
  }
  
  // Log signal type for debugging
  const signalType = signal.offer ? 'offer' : signal.answer ? 'answer' : 'ICE candidate';
  console.log(`📨 Relaying ${signalType} from ${socket.id} to ${to} for call ${callId}`);

  // Forward the signal
  io.to(targetSocket).emit('signal', { callId, from: socket.id, signal });
  console.log(`✅ Signal relayed successfully to ${to}`);
});


  // ========================
  // Disconnect Handling
  // ========================

  socket.on('disconnect', async () => {
    let disconnectedUserId = null;
  
    // Find the disconnected user
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        break;
      }
    }
  
    if (disconnectedUserId) {
      onlineUsers.delete(disconnectedUserId);
  
      // End all active calls involving this user
      activeCalls.forEach((call, callId) => {
        if (call.callerId === disconnectedUserId || call.calleeId === disconnectedUserId) {
          // Determine the other party in the call
          const otherUserId = call.callerId === disconnectedUserId ? call.calleeId : call.callerId;
          
          // Only notify the other party if they're online
          if (onlineUsers.has(otherUserId)) {
            io.to(onlineUsers.get(otherUserId)).emit('callEnded', { 
              callId,
              reason: 'User disconnected'
            });
          }
          
          // Calculate call duration if call was active
          if (call.startTime) {
            const duration = (Date.now() - call.startTime) / 1000;
            console.log(`📞 Call ${callId} ended due to user disconnect. Duration: ${duration.toFixed(1)}s`);
          } else {
            console.log(`📞 Call ${callId} ended due to user disconnect.`);
          }
          
          activeCalls.delete(callId);
        }
      });
  
      // Notify other users about status change
      io.emit('userStatus', {
        userId: disconnectedUserId,
        status: 'offline',
        lastActive: new Date().toISOString(),
      });
  
      console.log(`🔴 User ${disconnectedUserId} is offline`);
    }
  });
});

app.set('onlineUsers', onlineUsers);
// Make io accessible in your controllers
app.set('io', io);



// Apply Helmet with custom configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    dnsPrefetchControl: { allow: false },
  })
);

app.use(xssClean()); // Prevent XSS attacks
app.use(express.json());
app.use(cookieParser());




// Make sure your CORS configuration is properly set

// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apply rate limiting to all routes

// Add these headers for static files
app.use('/uploads', (req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});


// Routes



// Apply user-agent middleware
app.use(useragent.express());
app.use(trackSession);

// Store request fingerprints (IP + User-Agent) efficiently
const requestFingerprint = new Map();

// Function to generate a unique fingerprint
const getFingerprint = (req) => {
  const ip = req.ip || req.connection.remoteAddress;
  const ua = req.useragent?.source || "unknown";
  return `${ip}_${ua}`;
};

// General API Rate Limiter (100 requests per 2 min)
export const apiRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // Limit each fingerprint to 100 requests per window
  keyGenerator: getFingerprint,
  message: "Too many requests! Please wait before trying again.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Authentication Rate Limiter (5 attempts per min)
export const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each fingerprint to 5 requests per window
  keyGenerator: getFingerprint,
  message: "Too many login attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware to detect bots & suspicious behavior
export const detectBots = (req, res, next) => {
  const botIndicators = ["python", "curl", "scrapy", "wget"];
  if (req.useragent.isBot || botIndicators.some((b) => req.useragent.source.toLowerCase().includes(b))) {
    return res.status(403).json({ success: false, message: "Bots are not allowed!" });
  }
  next();
};



// Apply API rate limiting to general routes
app.use("/server/auth", authRateLimiter, authRoute);
app.use("/server/users",apiRateLimiter, userRoute);
app.use("/server/ranks", apiRateLimiter, ranksRoute);
app.use("/server/reviews", apiRateLimiter, ReviewsRoute);
app.use("/server/gigs", apiRateLimiter, GigsRoute);
app.use("/server/categorey", apiRateLimiter, categoryRoutes);
app.use("/server/offers", apiRateLimiter, OffersRoute);
app.use("/server/subcategory", apiRateLimiter, subcategoryRoutes);
app.use("/server/notifications", notificationRoutes);
app.use("/server/projects", apiRateLimiter, ProjectsRoute);
app.use("/server/get", apiRateLimiter, adminRoute);
app.use("/server/sms", apiRateLimiter, smsRoute);
app.use("/server/sessions",apiRateLimiter , sessionRoutes);
app.use("/server/conversations",apiRateLimiter  , conversationRoutes);
app.use("/server/messages",apiRateLimiter  , MessagesRoute);
app.use("/server/audio", apiRateLimiter , audioRoutes);
app.use('/server/payment', apiRateLimiter , paymentRoutes);
app.use('/server/wallet', apiRateLimiter , walletRoutes);
app.use('/server/transactions', apiRateLimiter , transactionRoutes);
app.use('/server/invoices', apiRateLimiter, invoiceRoutes);
app.use('/server/upload', uploadRoutes); 



// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  
  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
});






const PORT = 8800;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});