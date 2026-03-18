import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { LayoutDashboard, MessageCircle } from "lucide-react";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "primary.main",
        color: "white",
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" mb={4}>
        FinSarthi
      </Typography>

      <NavItem to="/app/dashboard" icon={<LayoutDashboard size={18} />}>
        Dashboard
      </NavItem>

      <NavItem to="/app/chat" icon={<MessageCircle size={18} />}>
        Chat
      </NavItem>
    </Box>
  );
};

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px",
      marginBottom: "8px",
      borderRadius: "8px",
      background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
      color: "white",
      textDecoration: "none",
    })}
  >
    {icon}
    {children}
  </NavLink>
);

export default Sidebar;
