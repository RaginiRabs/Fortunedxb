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
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              mb: 2,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '1.8rem' },
            }}
          >
            Stay Updated on Dubai's Best Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              mb: 4,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
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
              borderRadius: 1.5,
              bgcolor: 'white',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                },
              }}
              sx={{ py: 1 }}
            />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                color: '#FFFFFF',
                borderRadius: 1,
                px: 4,
                whiteSpace: 'nowrap',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
                },
              }}
            >
              Subscribe
            </Button>
          </Paper>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              mt: 2,
              display: 'block',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Join 25,000+ investors receiving weekly updates
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsletterSection;