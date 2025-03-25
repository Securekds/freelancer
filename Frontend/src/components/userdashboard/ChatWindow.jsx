import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";

export default function ChatWindow({ userId }) {
  const { selectedChat, messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    sendMessage(newMessage, userId);
    setNewMessage("");
  };

  if (!selectedChat) return <p>Select a chat to start messaging</p>;

  return (
    <div style={{ width: "70%", padding: "10px" }}>
      <h2>Chat with {selectedChat.userName}</h2>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ddd", padding: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.senderId === userId ? "blue" : "green" }}>
            <strong>{msg.senderId === userId ? "Me" : "Them"}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
