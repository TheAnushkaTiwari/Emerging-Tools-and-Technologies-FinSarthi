import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* 1. The Fixed Left Sidebar */}
      <Sidebar />

      {/* 2. The Main Content Area */}
      <Box 
        sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          minWidth: 0 // Prevents layout breaking if content is too wide
        }}
      >
        {/* Top Navigation */}
        <Navbar />

        {/* 3. The Page Content (where Chat.jsx is rendered) */}
        <Box 
          component="main"
          sx={{ 
            flex: 1, 
            p: 3, 
            bgcolor: "#F8FAFC", 
            overflow: "auto", // Only this area will scroll
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;