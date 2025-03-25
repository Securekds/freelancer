import { WebSocketServer } from 'ws';

const clients = new Set(); // Store connected clients

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      
      // Broadcast message to all clients
      clients.forEach(client => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);
    });
  });

  console.log('WebSocket server started');
};
