import { Box, Grid, Paper, Typography, Chip, Divider } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      {/* Header Section */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your lifecycle-aware financial snapshot.
        </Typography>
      </Box>

      {/* Profile + Risk Section */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Lifecycle Stage
            </Typography>
            <Typography variant="h6" mt={1}>
              Young Professional
            </Typography>
            <Chip
              label="Growth Focused"
              color="secondary"
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Risk Appetite
            </Typography>
            <Typography variant="h6" mt={1}>
              Moderate–High
            </Typography>
            <Chip
              label="Equity Biased Strategy"
              color="primary"
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Learning Focus Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Your Focus Areas This Month
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <Chip label="ELSS for Tax Optimisation" sx={{ mr: 1, mb: 1 }} />
          <Chip label="PPF vs NPS Comparison" sx={{ mr: 1, mb: 1 }} />
          <Chip label="Building Emergency Corpus" sx={{ mr: 1, mb: 1 }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
