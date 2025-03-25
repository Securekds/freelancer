import { PeerServer } from "peer";
import dotenv from "dotenv";

dotenv.config();

const peerServer = PeerServer({
  port: 9000,
  path: "/myapp",
  allow_discovery: true,
  cors: {
    origin: process.env.FRONTEND_BASE || "http://localhost:5173", // Default to Vite URL
  },
});

peerServer.on("connection", (client) => {
  console.log(`✅ New peer connected: ${client.id}`);
});

peerServer.on("disconnect", (client) => {
  console.log(`🔴 Peer disconnected: ${client.id}`);
});

console.log("🎧 PeerJS Server is running on port 9000...");
