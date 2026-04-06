import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Paper, Typography, Chip, CircularProgress, Tooltip } from "@mui/material";
import { Send, BookOpen } from "lucide-react";
import api from "../services/api"; // <-- 1. Import your API connection!
import { useSearchParams } from "react-router-dom";


const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello I'm FinSarthi. Based on your profile, how can I guide you today?",
    },
  ]);
  const [searchParams] = useSearchParams();
  const sessionFromURL = searchParams.get("session");


  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null); // To track the conversation session
  const chatRef = useRef(null);

  const suggestedQuestions = [
    "What is the definition of KYC?", // Updated to use your tested question!
    "What is ELSS and how does it save tax?",
    "What is PMDY?",
  ];

  const sendMessage = async (textOverride = null) => {
    const userText = (typeof textOverride === 'string' ? textOverride : input).trim();
    if (!userText || isLoading) return; // Don't send if empty or already loading

    
    // Add user message to UI immediately
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput(""); // Clear input box
    setIsLoading(true); // Turn on the loading spinner

    try {
      // 3. The Real Brain: Make the POST request to your Django backend
      const response = await api.post("chat/", { 
        message: userText,
        session_id: sessionId
      });
      
      // Extract the bot's text (assuming your backend returns {"answer": "..."})
      // Adjust "response.data.answer" if your backend uses a different key!
      const { answer, sources, session_id: newId } = response.data;

      if (newId) setSessionId(newId);

      setMessages((prev) => [...prev, { 
          sender: "ai", 
          text: answer, // Use the variable 'answer' extracted above
          sources: sources || [] 
      }]);

      // Add AI response to UI
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

  useEffect(() => {
    const fetchSessionMessages = async () => {
      if (!sessionFromURL) return;

      try {
        const res = await api.get(`chat/session/${sessionFromURL}/`);

        const formattedMessages = res.data.messages.map((msg) => ({
          sender: msg.sender === "user" ? "user" : "ai",
          text: msg.content,
          sources: msg.citations || []
        }));

        setMessages(formattedMessages);
        setSessionId(sessionFromURL);

      } catch (err) {
        console.error("Error loading session:", err);
      }
    };

    fetchSessionMessages();
  }, [sessionFromURL]);
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
                maxWidth: "75%",
                bgcolor: msg.sender === "user" ? "secondary.main" : "white",
                color: msg.sender === "user" ? "white" : "text.primary",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                borderRadius: msg.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                {msg.text}
              </Typography>

              {msg.sender === "ai" && msg.sources && msg.sources.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <BookOpen size={12} /> Sources
                  </Typography>

                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {msg.sources.map((src, i) => (
                      <Tooltip key={i} title="Verified Document Source">
                        <Chip 
                          label={src} 
                          size="small"
                          sx={{
                            fontSize: '0.65rem',
                            height: '20px',
                            bgcolor: '#EEF2FF',
                            color: '#3730A3'
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>

        {msg.sender === "ai" && msg.sources && msg.sources.length > 0 && (
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <BookOpen size={12} /> Sources:
                </Typography>
                {msg.sources.map((src, i) => (
                  <Tooltip key={i} title="Verified Document Source">
                    <Chip label={src} size="small" sx={{ fontSize: '0.65rem', height: '18px', bgcolor: '#F1F5F9' }} />
                  </Tooltip>
                ))}
              </Box>
            )}
          </Box>
        ))}        
        
        {/* The "Thinking" Animation */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
             <Paper sx={{ p: 2, bgcolor: "white", display: "flex", alignItems: "center", gap: 2,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)", borderRadius: "20px 20px 20px 4px"
              }}>
                <CircularProgress size={24} color="secondary" thickness={5} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>FinSarthi is reviewing documents...</Typography>
             </Paper>
          </Box>
        )}
        <div ref={chatRef} />
      </Box>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <Box sx={{ px: 3, pb: 1 }}>
          {suggestedQuestions.map((question, i) => (
            <Chip
              key={i}
              label={question}
              onClick={() => sendMessage(question)}
              sx={{ mr: 1, mb: 1, cursor: "pointer", '&:hover': { bgcolor: '#e2e8f0' } }}
              />
            ))}
        </Box>
      )}

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