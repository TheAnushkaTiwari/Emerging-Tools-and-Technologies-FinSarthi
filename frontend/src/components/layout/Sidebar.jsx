import { NavLink } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { LayoutDashboard, MessageCircle, TrendingUp } from "lucide-react";

const Sidebar = () => {
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
        <TrendingUp color="#10B981" size={28} /> {/* Added a small logo icon */}
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: -0.5 }}>
          FinSarthi
        </Typography>
      </Stack>

      <Box sx={{ flex: 1 }}>
        <NavItem to="/app/dashboard" icon={<LayoutDashboard size={20} />}>
          Dashboard
        </NavItem>

        <NavItem to="/app/chat" icon={<MessageCircle size={20} />}>
          FinSarthi AI
        </NavItem>
      </Box>

      {/* Optional: Add a version tag at the bottom */}
      <Typography variant="caption" sx={{ opacity: 0.5, textAlign: "center" }}>
        v1.0.4 Beta
      </Typography>
    </Box>
  );
};

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? "active-nav" : "")}
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 16px",
      marginBottom: "10px",
      borderRadius: "10px",
      backgroundColor: isActive ? "rgba(16, 185, 129, 0.2)" : "transparent", // Use your secondary color
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