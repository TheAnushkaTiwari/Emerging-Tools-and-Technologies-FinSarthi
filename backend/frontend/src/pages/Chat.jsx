import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Paper, Typography, Chip } from "@mui/material";
import { Send } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello I'm FinSarthi. Based on your profile, how can I guide you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const suggestedQuestions = [
    "How should I manage my pocket money?",
    "What is ELSS and how does it save tax?",
    "Is SCSS safe for retirees?",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "This is a lifecycle-aware mock response." },
      ]);
    }, 800);

    setInput("");
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Chat Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: "60%",
                bgcolor: msg.sender === "user" ? "secondary.main" : "white",
                color: msg.sender === "user" ? "white" : "black",
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={chatRef} />
      </Box>

      {/* Suggested Questions */}
      <Box sx={{ px: 3, pb: 1 }}>
        {suggestedQuestions.map((question, i) => (
          <Chip
            key={i}
            label={question}
            onClick={() => setInput(question)}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      {/* Input Box */}
      <Box sx={{ p: 2, borderTop: "1px solid #E2E8F0", display: "flex" }}>
        <TextField
          fullWidth
          placeholder="Ask FinSarthi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <Send size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
