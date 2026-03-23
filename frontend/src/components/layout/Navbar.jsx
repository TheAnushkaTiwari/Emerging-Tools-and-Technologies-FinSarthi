import { Box, Typography, Avatar, Chip, Stack } from "@mui/material";
import { User, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <Box
      component="nav"
      sx={{
        height: "70px",
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
        Financial Navigator
      </Typography>

      <Stack direction="row" spacing={3} alignItems="center">
        {/* Simple notification dot icon */}
        <Box sx={{ color: "text.secondary", cursor: "pointer", display: 'flex' }}>
          <Bell size={20} />
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              User
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Premium Plan
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: "secondary.main", width: 35, height: 35 }}>
             <User size={20} />
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;