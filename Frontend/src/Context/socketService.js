// Context/socketService.js
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.connecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Set();
  }

  connect(url, userId) {
    if (this.connected || this.connecting) {
      return;
    }

    this.connecting = true;

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io(url, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
      transports: ['websocket'],
      auth: { userId }
    });

    this.socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket');
      this.connected = true;
      this.connecting = false;
      this.reconnectAttempts = 0;

      if (userId) {
        this.socket.emit('join', userId);
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.reconnectAttempts++;
      this.connecting = false;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
      this.connected = false;
      this.connecting = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.connected = false;
    this.connecting = false;
    this.listeners.clear();
  }

  subscribeToNotifications(callback) {
    if (!this.socket) return;

    if (!this.listeners.has(callback)) {
      this.listeners.add(callback);
      this.socket.on('updateNotifications', callback);
    }
  }

  unsubscribeFromNotifications(callback) {
    if (!this.socket) return;

    if (callback && this.listeners.has(callback)) {
      this.socket.off('updateNotifications', callback);
      this.listeners.delete(callback);
    } else {
      this.socket.off('updateNotifications');
      this.listeners.clear();
    }
  }

  isConnected() {
    return this.connected;
  }
}

export const socketService = new SocketService();
