import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Box, TextField, Button, Paper, Typography, 
  InputAdornment, IconButton, CircularProgress, Stack 
} from "@mui/material";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";
import api from "../services/api"; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 1. Validation Check
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
    
    setIsLoading(true);
    setError("");

    // 2. Data Cleaning
    // Django usernames cannot have spaces. We'll turn "Drishti Madaan" into "drishti_madaan"
    const cleanedData = {
      ...formData,
      username: formData.username.trim().replace(/\s+/g, '_').toLowerCase()
    };

    try {
      // 3. Real Backend Call
      await api.post("register/", cleanedData);
      
      // Optional: Success message or small delay before navigating
      navigate("/login"); 

    } catch (err) {
      // 4. Real Error Handling
      // This looks into the response from Django to see EXACTLY what went wrong
      const backendError = err.response?.data;
      
      if (backendError?.username) {
        setError(`Username error: ${backendError.username[0]}`);
      } else if (backendError?.email) {
        setError(`Email error: ${backendError.email[0]}`);
      } else if (backendError?.password) {
        setError(`Password: ${backendError.password[0]}`);
      } else {
        setError("Registration failed. Please try a different username or email.");
      }
      
      console.error("Full Backend Error Detail:", backendError);
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
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" 
    }}>
      <Paper elevation={10} sx={{ 
        p: 5, 
        width: 450, 
        borderRadius: "24px",
        textAlign: "center"
      }}>
        <Stack alignItems="center" spacing={1} mb={4}>
          <Box sx={{ p: 1.5, bgcolor: "secondary.main", borderRadius: "12px", mb: 1 }}>
            <UserPlus color="white" size={32} />
          </Box>
          <Typography variant="h4" fontWeight={800} color="primary.main">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join the FinSarthi community today
          </Typography>
        </Stack>

        {error && (
          <Typography color="error" variant="caption" sx={{ mb: 2, display: 'block' }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            name="username"
            variant="outlined"
            margin="dense"
            value={formData.username}
            onChange={handleChange}
            slotProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User size={18} color="#94A3B8" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            variant="outlined"
            margin="dense"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="dense"
            value={formData.password}
            onChange={handleChange}
            slotProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={18} color="#94A3B8" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="dense"
            value={formData.confirmPassword}
            onChange={handleChange}
            slotProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
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
              fontWeight: 600,
              textTransform: "none" 
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Already have an account? <Link to="/login" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;