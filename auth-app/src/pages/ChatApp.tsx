import Picker from "emoji-picker-react"; // Library for Emoji picker
import React, { useEffect, useState } from "react";
import Header from "./Header";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
  status: string;
  recipientsRead: string[]; // List of recipients who have read the message
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Message state
  const [input, setInput] = useState<string>(""); // Message input state
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState<string>("You"); // Hardcode username or fetch it
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // Emoji picker visibility

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // Handle incoming WebSocket messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message" || data.type === "notification") {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender || "Anonymous",
            text: data.message,
            timestamp: new Date().toLocaleTimeString(),
            status: "Delivered",
            recipientsRead: [data.sender], // Add initial sender to the read recipients
          },
        ]);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      const message = {
        type: "message",
        sender: username || "You",
        message: input.trim(),
      };

      socket.send(JSON.stringify(message));

      setMessages((prev) => [
        ...prev,
        {
          sender: "You",
          text: input.trim(),
          timestamp: new Date().toLocaleTimeString(),
          status: "Sent",
          recipientsRead: [], // Initially, no one has read the message
        },
      ]);

      // Simulate bot response
      setTimeout(() => {
        const botReply = "Hello! How can I help you today?";
        setMessages((prev) => [
          ...prev,
          {
            sender: "Bot",
            text: botReply,
            timestamp: new Date().toLocaleTimeString(),
            status: "Delivered",
            recipientsRead: ["Bot"], // Bot is the only one who has read it
          },
        ]);
      }, 1500); // Bot replies after 1.5 seconds

      setInput(""); // Clear input field
    }
  };

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setInput((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>WhatsApp</div>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "You" ? "#DCF8C6" : "#fff",
                border: "1px solid #ddd",
              }}
            >
              <span style={styles.sender}>
                {msg.sender}{" "}
                <span style={styles.timestamp}>{msg.timestamp}</span>
              </span>
              <div style={styles.messageText}>{msg.text}</div>
              <span style={styles.status}>{msg.status}</span>
              <div style={styles.readStatus}>
                {msg.recipientsRead.length === 0
                  ? "Not read yet"
                  : `Read by: ${msg.recipientsRead.join(", ")}`}
              </div>
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>
          <button
            style={styles.emojiButton}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😀
          </button>
        </div>
        {showEmojiPicker && (
          <div>
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    height: "800px",
  },
  header: {
    backgroundColor: "#075E54",
    color: "#fff",
    padding: "10px",
    textAlign: "center" as const,
    fontWeight: "bold" as const,
    fontSize: "18px",
  },
  chatBox: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ECE5DD",
    overflowY: "scroll" as const,
    display: "flex",
    flexDirection: "column" as const,
  },
  message: {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "10px",
    maxWidth: "75%",
    wordWrap: "break-word" as const,
  },
  sender: {
    fontWeight: "bold" as const,
    marginRight: "5px",
    display: "block",
    color: "#075E54",
  },
  timestamp: {
    fontSize: "10px",
    color: "#777",
    marginLeft: "5px",
  },
  messageText: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#333",
  },
  status: {
    fontSize: "10px",
    color: "#777",
    marginTop: "5px",
  },
  readStatus: {
    fontSize: "10px",
    color: "#777",
    marginTop: "5px",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginRight: "5px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#25D366",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  emojiButton: {
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default ChatApp;
