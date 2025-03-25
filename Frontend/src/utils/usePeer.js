import { useEffect, useState } from "react";
import Peer from "peerjs";

export const usePeer = (userId) => {
  const [peer, setPeer] = useState(null);
  const [myPeerId, setMyPeerId] = useState("");

  useEffect(() => {
    if (!userId) return;

    const newPeer = new Peer(userId, {
      host: import.meta.env.VITE_BACKEND_URL.replace(/^https?:\/\//, ""), 
      port: 9000,
      path: "/peerjs",
      secure: false, 
    });

    newPeer.on("open", (id) => {
      setMyPeerId(id);
      console.log("My Peer ID:", id);
    });

    newPeer.on("error", (err) => {
      console.error("PeerJS Error:", err);
    });

    setPeer(newPeer);

    return () => newPeer.destroy();
  }, [userId]);

  return { peer, myPeerId };
};
