import React, { useEffect, useState } from 'react';
import './ChatPage.css'; // Style for the chat page
import Header from './Header';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {

    const socket = new WebSocket('ws://localhost:8080'); 

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, `Server: ${message}`]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    setWs(socket);

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(inputMessage);
      setMessages((prevMessages) => [...prevMessages, `You: ${inputMessage}`]);
    }

    setInputMessage('');
  };

  return (
    <div>
      <Header />
      <div className="chat-container">
        <h2>Real-Time Chat</h2>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              {msg}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
