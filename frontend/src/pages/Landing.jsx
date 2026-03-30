import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import { Rocket, ShieldCheck, BrainCircuit, ChevronRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Typography 
                variant="overline" 
                sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}
              >
                Next-Gen Financial Literacy
              </Typography>
              
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' }, 
                fontWeight: 800, 
                color: "primary.main",
                lineHeight: 1.1 
              }}>
                Master Your Money with <span style={{ color: '#10B981' }}>FinSarthi</span>
              </Typography>

              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, maxWidth: 500 }}>
                Personalised investment insights and AI-powered guidance tailored to your lifecycle stage. Start your journey to financial freedom today.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<ChevronRight size={18} />}
                  onClick={() => navigate("/login")}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1.1rem"
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1.1rem"
                  }}
                >
                  How it works
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* Feature Quick-View Cards */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <FeatureCard 
                icon={<BrainCircuit color="#10B981" />} 
                title="AI Expert Analysis" 
                desc="Deep-dive into PDFs to get instant answers about complex schemes."
              />
              <FeatureCard 
                icon={<Rocket color="#10B981" />} 
                title="Lifecycle Planning" 
                desc="Strategies that evolve as you move from student to professional."
              />
              <FeatureCard 
                icon={<ShieldCheck color="#10B981" />} 
                title="Verified Knowledge" 
                desc="Insights backed by official RBI and SEBI documentation."
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Small helper component for the landing page cards
const FeatureCard = ({ icon, title, desc }) => (
  <Paper sx={{ 
    p: 3, 
    borderRadius: "20px", 
    display: "flex", 
    gap: 2, 
    alignItems: "center",
    transition: "transform 0.2s",
    "&:hover": { transform: "translateY(-5px)" },
    boxShadow: "0px 10px 30px rgba(0,0,0,0.05)"
  }}>
    <Box sx={{ p: 1.5, bgcolor: "rgba(16, 185, 129, 0.1)", borderRadius: "12px" }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{desc}</Typography>
    </Box>
  </Paper>
);

export default Landing;
