import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography, InputAdornment, IconButton, CircularProgress, Stack } from "@mui/material";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import api from "../services/api"; // Ensure this points to your axios instance

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Call the real Django Login endpoint
      // We send 'username' instead of 'email' to match Django's default behavior
      const response = await api.post("login/", { 
        username: email, // If you rename the state to 'username', change this to username
        password 
      });

      // 2. Save the real JWT tokens
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // 3. Navigate to your dashboard
      navigate("/app/dashboard");
      
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" // Darker, secure theme
    }}>
      <Paper elevation={10} sx={{ 
        p: 5, 
        width: 400, 
        borderRadius: "24px",
        textAlign: "center",
        boxShadow: "0px 20px 40px rgba(0,0,0,0.4)"
      }}>
        <Stack alignItems="center" spacing={1} mb={4}>
          <Box sx={{ p: 1.5, bgcolor: "secondary.main", borderRadius: "12px", mb: 1 }}>
            <ShieldCheck color="white" size={32} />
          </Box>
          <Typography variant="h4" fontWeight={800} color="primary.main">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Securely access your FinSarthi dashboard
          </Typography>
        </Stack>

        {error && (
          <Typography color="error" variant="caption" sx={{ mb: 2, display: 'block' }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={18} color="#94A3B8" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={18} color="#94A3B8" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ 
              mt: 4, 
              py: 1.5, 
              borderRadius: "12px", 
              fontSize: "1rem", 
              fontWeight: 600,
              textTransform: "none" 
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Don't have an account? <Link to="/register" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'none' }}>Join FinSarthi</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;