import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import { Award, Star } from 'lucide-react';

const TopDevelopers = ({ developers }) => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#FAFAFA',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<Award size={16} />}
            label="Trusted Partners"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
            Premier Developers
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            We partner with Dubai's most reputable developers to bring you exclusive off-plan opportunities.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {developers.map((developer, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {developer.logo}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {developer.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {developer.projects} Projects
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {developer.rating}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopDevelopers;