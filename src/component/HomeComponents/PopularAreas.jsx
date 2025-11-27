import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import { MapPinned } from 'lucide-react';

const PopularAreas = ({ popularAreas }) => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<MapPinned size={16} />}
            label="Prime Locations"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
            Explore Popular Areas
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Discover Dubai's most sought-after neighborhoods for off-plan investments.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {popularAreas.map((area, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(198, 169, 98, 0.04)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'rgba(198, 169, 98, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <area.icon size={28} color="#C6A962" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {area.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {area.projects} Projects
                </Typography>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  From AED {area.avgPrice}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PopularAreas;