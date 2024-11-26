import React, { useEffect, useState } from 'react';
import './ChatPage.css';
import Header from './Header';

const Contact: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setWs(socket);

    return () => {
      socket.close(); // Cleanup the connection on unmount
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Update messages locally
    setMessages((prev) => [...prev, `You: ${inputMessage}`]);

    // Send via WebSocket if connected
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'chat', message: inputMessage }));
    }

    // Send to email service via HTTP POST
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (response.ok) {
        setMessages((prev) => [...prev, 'Message sent to email']);
      } else {
        setMessages((prev) => [...prev, 'Failed to send email message']);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessages((prev) => [...prev, 'Error sending email']);
    }

    setInputMessage('');
  };

  return (
    <>
      <Header />
      <div className="chat-container">
        <h2>Chat Page</h2>
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
    </>
  );
};

export default Contact;
