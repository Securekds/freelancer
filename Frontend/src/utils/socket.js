import { io } from "socket.io-client";

// Use environment variable or fallback to localhost
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8800";

// Create the socket instance
export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Ensure WebSocket is used
  autoConnect: true, // Allow automatic reconnection
});

// Add socket event listeners for debugging
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

