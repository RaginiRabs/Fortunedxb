'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

const NewsletterSection = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: `linear-gradient(135deg, ${theme.palette.navy.main} 0%, ${theme.palette.navy.dark} 100%)`,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: 'common.white',
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
              color: alpha(theme.palette.common.white, 0.7),
              mb: 4,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Get exclusive early access to new launches and market insights delivered to your inbox.
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              p: { xs: 2, sm: 1 },
              pl: { sm: 3 },
              borderRadius: 1.5,
              bgcolor: 'background.paper',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                },
              }}
              sx={{ py: { xs: 0, sm: 1 } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
                color: 'common.white',
                borderRadius: 1,
                px: 4,
                py: { xs: 1.5, sm: 'auto' },
                whiteSpace: 'nowrap',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                fontWeight: 600,
                minWidth: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
                },
              }}
            >
              Subscribe
            </Button>
          </Paper>

          <Typography
            variant="caption"
            sx={{
              color: alpha(theme.palette.common.white, 0.5),
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