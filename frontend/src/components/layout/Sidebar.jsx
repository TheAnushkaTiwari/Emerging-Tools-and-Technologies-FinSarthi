import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Divider, List, ListItemButton } from "@mui/material";
import { LayoutDashboard, MessageCircle, TrendingUp, History, Plus } from "lucide-react";
import api from "../../services/api";

const Sidebar = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch the "Offloaded Context" sessions [cite: 8, 48]
  const fetchHistory = async () => {
    try {
      const response = await api.get("chat/history/");
      setHistory(response.data);
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const startNewChat = () => {
    // Navigate to chat and force a refresh to clear sessionId
    navigate("/app/chat");
    window.location.reload(); 
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "primary.main",
        color: "white",
        p: 3,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={6}>
        <TrendingUp color="#10B981" size={28} />
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: -0.5 }}>
          FinSarthi
        </Typography>
      </Stack>

      {/* Main Navigation */}
      <Box sx={{ mb: 4 }}>
        <NavItem to="/app/dashboard" icon={<LayoutDashboard size={20} />}>
          Dashboard
        </NavItem>

        <NavItem to="/app/chat" icon={<MessageCircle size={20} />}>
          FinSarthi AI
        </NavItem>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />

      {/* NEW: Chat History Section [cite: 49, 50] */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" px={1} mb={1}>
        <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>
          Recent Chats
        </Typography>
        <Plus size={14} style={{ cursor: 'pointer' }} onClick={startNewChat} />
      </Stack>

      <Box sx={{ flex: 1, overflowY: "auto", mx: -1 }}>
        <List>
          {history.map((session) => (
            <ListItemButton 
              key={session.id}
              onClick={() => navigate(`/app/chat?session=${session.id}`)}
              sx={{ 
                borderRadius: "8px", 
                mb: 0.5,
                '&:hover': { bgcolor: "rgba(255,255,255,0.05)" } 
              }}
            >
              <History size={14} style={{ marginRight: 12, opacity: 0.5 }} />
              <Typography variant="body2" noWrap sx={{ fontSize: "0.8rem", opacity: 0.8 }}>
                {session.title}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Typography variant="caption" sx={{ opacity: 0.5, textAlign: "center", mt: 2 }}>
        v1.0.4 Beta
      </Typography>
    </Box>
  );
};

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 16px",
      marginBottom: "10px",
      borderRadius: "10px",
      backgroundColor: isActive ? "rgba(16, 185, 129, 0.2)" : "transparent",
      color: isActive ? "#10B981" : "white",
      textDecoration: "none",
      fontWeight: isActive ? 600 : 400,
      transition: "all 0.2s ease",
    })}
  >
    {icon}
    <Typography variant="body1">{children}</Typography>
  </NavLink>
);

export default Sidebar;