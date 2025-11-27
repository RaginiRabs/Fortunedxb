import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
} from '@mui/material';

const NewsletterSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
            Stay Updated on Dubai's Best Projects
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
            Get exclusive early access to new launches and market insights delivered to your inbox.
          </Typography>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              p: 1,
              pl: 3,
              borderRadius: '60px',
              bgcolor: 'white',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ py: 1 }}
            />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                borderRadius: '50px',
                px: 4,
                whiteSpace: 'nowrap',
              }}
            >
              Subscribe
            </Button>
          </Paper>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 2, display: 'block' }}>
            Join 25,000+ investors receiving weekly updates
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsletterSection;