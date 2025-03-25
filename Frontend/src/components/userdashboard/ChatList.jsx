import { useEffect, useState } from "react";
import axios from "axios";
import { useChat } from "../../Context/ChatContext.jsx";

export default function ChatList() {
  const { setSelectedChat } = useChat();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get("/api/chats")
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}>
      <h3>Chats</h3>
      {chats.map((chat) => (
        <div key={chat._id} onClick={() => setSelectedChat(chat)}
             style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
          <p><strong>{chat.userName}</strong></p>
        </div>
      ))}
    </div>
  );
}
