import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Stack,
  useTheme,
} from '@mui/material';
import { ArrowRight, CalendarCheck } from 'lucide-react';

const CampaignSection = ({ campaignProperty }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!campaignProperty || !campaignProperty.offer) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '100vh' },
        background: isDark
          ? 'linear-gradient(135deg, #0a1628 0%, #1a2a44 100%)'
          : 'linear-gradient(135deg, #0f1a2e 0%, #1e2a3f 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${campaignProperty.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.45) blur(3px)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Content */}
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 10,
          py: { xs: 8, md: 0 },
        }}
      >
        <Grid container alignItems="center" spacing={6}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                animation: 'fadeInUp 0.8s ease-out',
                '@keyframes fadeInUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(50px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <Chip
                label="LIMITED TIME OFFER"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  py: 3,
                  px: 5,
                  mb: 4,
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                  fontWeight: 900,
                  lineHeight: 0.9,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, #f5d592, ${theme.palette.primary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {campaignProperty.offer.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  mb: 3,
                  opacity: 0.95,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                {campaignProperty.title}
              </Typography>
              <Typography
                sx={{
                  color: '#C39F58',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  mb: 4,
                }}
              >
                by {campaignProperty.builder?.name || campaignProperty.developer}
              </Typography>

              <Box
                sx={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(195,159,88,0.3)',
                  borderRadius: 4,
                  p: { xs: 3, md: 5 },
                  maxWidth: 650,
                  mb: 5,
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                    lineHeight: 1.8,
                  }}
                >
                  {campaignProperty.offer.description}
                </Typography>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Button
                  size="large"
                  endIcon={<ArrowRight size={28} />}
                  sx={{
                    bgcolor: 'primary.main',
                    color: '#000',
                    px: { xs: 4, md: 7 },
                    py: { xs: 2, md: 3.5 },
                    borderRadius: 50,
                    fontSize: { xs: '1rem', md: '1.3rem' },
                    fontWeight: 800,
                    boxShadow: '0 20px 40px rgba(195,159,88,0.4)',
                    '&:hover': {
                      bgcolor: '#E8D4A0',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  Claim Offer Now
                </Button>
              </Stack>

              <Box
                sx={{
                  mt: 6,
                  animation: 'scaleIn 0.5s ease-out 0.5s both',
                  '@keyframes scaleIn': {
                    from: {
                      opacity: 0,
                      transform: 'scale(0)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'scale(1)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)',
                    px: { xs: 3, md: 5 },
                    py: { xs: 2, md: 3 },
                    borderRadius: 50,
                    border: '2px solid #C39F58',
                  }}
                >
                  <CalendarCheck size={32} color="#C39F58" />
                  <Typography
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.3rem' },
                    }}
                  >
                    Ends:{' '}
                    {new Date(campaignProperty.offer.validUntil).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Floating Image on Desktop */}
          <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                animation: 'slideInRight 1s ease-out',
                '@keyframes slideInRight': {
                  from: {
                    opacity: 0,
                    transform: 'translateX(100px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: 500,
                  height: 650,
                  backgroundImage: `url(${campaignProperty.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '30px',
                  border: '10px solid #C39F58',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                  transform: 'rotate(-8deg)',
                  transition: 'all 0.6s ease',
                  '&:hover': {
                    transform: 'rotate(-4deg) scale(1.02)',
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CampaignSection;