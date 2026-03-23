import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Paper, Typography, Chip, CircularProgress } from "@mui/material";
import { Send } from "lucide-react";
import api from "../services/api"; // <-- 1. Import your API connection!

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello I'm FinSarthi. Based on your profile, how can I guide you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // <-- 2. Add a loading state
  const chatRef = useRef(null);

  const suggestedQuestions = [
    "What is the definition of KYC?", // Updated to use your tested question!
    "What is ELSS and how does it save tax?",
    "Is SCSS safe for retirees?",
  ];

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Don't send if empty or already loading

    const userText = input.trim();
    
    // Add user message to UI immediately
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput(""); // Clear input box
    setIsLoading(true); // Turn on the loading spinner

    try {
      // 3. The Real Brain: Make the POST request to your Django backend
      const response = await api.post("chat/", { message: userText });
      
      // Extract the bot's text (assuming your backend returns {"answer": "..."})
      // Adjust "response.data.answer" if your backend uses a different key!
      const botReply = response.data.answer || response.data.response;

      // Add AI response to UI
      setMessages((prev) => [...prev, { sender: "ai", text: botReply }]);
      
    } catch (error) {
      console.error("Error communicating with FinSarthi backend:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! I'm having trouble connecting to my brain right now. Is the server running?" },
      ]);
    } finally {
      setIsLoading(false); // Turn off the loading spinner
    }
  };

  // Allow pressing "Enter" to send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
                maxWidth: "70%",
                bgcolor: msg.sender === "user" ? "secondary.main" : "white",
                color: msg.sender === "user" ? "white" : "black",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {msg.text}
              </Typography>
            </Paper>
          </Box>
        ))}
        
        {/* The "Thinking" Animation */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
             <Paper sx={{ p: 2, bgcolor: "white", display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="secondary" />
                <Typography variant="body2" color="text.secondary">FinSarthi is typing...</Typography>
             </Paper>
          </Box>
        )}
        <div ref={chatRef} />
      </Box>

      {/* Suggested Questions */}
      <Box sx={{ px: 3, pb: 1 }}>
        {suggestedQuestions.map((question, i) => (
          <Chip
            key={i}
            label={question}
            onClick={() => {
                setInput(question);
                // Optional: You could call sendMessage() right here to auto-send the suggestion!
            }}
            sx={{ mr: 1, mb: 1, cursor: "pointer", '&:hover': { bgcolor: '#e2e8f0' } }}
          />
        ))}
      </Box>

      {/* Input Box */}
      <Box sx={{ p: 2, borderTop: "1px solid #E2E8F0", display: "flex", bgcolor: "white" }}>
        <TextField
          fullWidth
          placeholder="Ask FinSarthi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          variant="outlined"
          size="small"
          sx={{ mr: 1 }}
        />
        <IconButton 
          color="secondary" 
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          sx={{ bgcolor: "secondary.main", color: "white", '&:hover': { bgcolor: "secondary.dark" } }}
        >
          <Send size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;