const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log(`Email message received: ${message}`);


  setTimeout(() => {
    console.log("Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  }, 1000);
});


const server = app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});


const wsServer = new WebSocket.Server({ server });

wsServer.on("connection", (ws) => {
  console.log("A client connected");


  ws.send(
    JSON.stringify({
      type: "notification",
      message: "Welcome to the real-time notification service!",
    })
  );

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "chat") {
        console.log("Chat message received:", data.message);

        ws.send(
          JSON.stringify({
            type: "notification",
            message: `Server received: ${data.message}`,
          })
        );
      }
    } catch (error) {
      console.error("Invalid message format", error);
    }
  });


  const sendNotification = () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "notification",
          message: `New update: ${new Date().toLocaleTimeString()}`,
        })
      );
    }
  };

  const interval = setInterval(sendNotification, 5000);

  ws.on("close", () => {
    console.log("A client disconnected");
    clearInterval(interval); 
  });
});
