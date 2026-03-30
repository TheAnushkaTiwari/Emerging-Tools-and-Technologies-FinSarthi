import { Box, Grid, Paper, Typography, Chip, Divider, LinearProgress, Stack, Button } from "@mui/material";
import { TrendingUp, Target, AlertCircle, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  return (
    <Box>
      {/* Header Section */}
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight={700} color="#0F172A">
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's your lifecycle-aware financial snapshot.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Target size={18} />} sx={{ borderRadius: "10px", textTransform: 'none' }}>
            Set New Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column: Quick Stats */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: "16px", border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>Lifecycle Stage</Typography>
                    <TrendingUp size={20} color="#10B981" />
                </Stack>
                <Typography variant="h5" fontWeight={700}>Young Professional</Typography>
                <Chip label="Growth Focused" color="success" size="small" sx={{ mt: 2, bgcolor: '#DCFCE7', color: '#166534', fontWeight: 600 }} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: "16px", border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>Risk Appetite</Typography>
                    <AlertCircle size={20} color="#6366F1" />
                </Stack>
                <Typography variant="h5" fontWeight={700}>Moderate–High</Typography>
                <Chip label="Equity Biased" size="small" sx={{ mt: 2, bgcolor: '#EEF2FF', color: '#3730A3', fontWeight: 600 }} />
              </Paper>
            </Grid>
          </Grid>

          {/* Goals / Progress Section */}
          <Paper sx={{ p: 3, borderRadius: "16px", border: '1px solid #E2E8F0', boxShadow: 'none', mb: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Goal Progress</Typography>
            <Box mb={3}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight={600}>Emergency Fund (6 Months)</Typography>
                    <Typography variant="body2" color="text.secondary">75%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 5, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }} />
            </Box>
            <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight={600}>Tax Saving (80C Goal)</Typography>
                    <Typography variant="body2" color="text.secondary">40%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={40} sx={{ height: 8, borderRadius: 5, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: '#6366F1' } }} />
            </Box>
          </Paper>
        </Grid>

        {/* Right Column: AI Insights & Focus Areas */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, borderRadius: "16px", border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%', bgcolor: '#F8FAFC' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>FinSarthi Insights</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" color="primary" fontWeight={700} display="block" mb={0.5}>TAX SAVING</Typography>
                    <Typography variant="body2" fontWeight={600}>Consider ELSS over PPF for higher long-term growth.</Typography>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" color="secondary" fontWeight={700} display="block" mb={0.5}>BUDGETING</Typography>
                    <Typography variant="body2" fontWeight={600}>Your 'Eating Out' expense is 15% above the 50/30/20 rule.</Typography>
                </Box>
            </Stack>

            <Typography variant="subtitle2" fontWeight={700} mt={4} mb={2}>Focus Areas This Month</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Chip label="ELSS Optimization" variant="outlined" size="small" onClick={() => {}} />
              <Chip label="NPS Basics" variant="outlined" size="small" onClick={() => {}} />
              <Chip label="Emergency Corpus" variant="outlined" size="small" onClick={() => {}} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};


export default Dashboard;
