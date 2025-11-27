import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Fade,
} from '@mui/material';
import {
  Sparkles,
  Building2,
  Award,
  Users,
  TrendingUp,
} from 'lucide-react';
import SearchBox from './SearchBox';

const quickStats = [
  { value: '500+', label: 'Off-Plan Projects', icon: Building2 },
  { value: '50+', label: 'Top Developers', icon: Award },
  { value: '15,000+', label: 'Happy Investors', icon: Users },
  { value: 'AED 25B+', label: 'Total Investments', icon: TrendingUp },
];

const HeroSection = ({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  propertyType,
  setPropertyType,
  bedrooms,
  setBedrooms,
  setFilterDrawerOpen,
  popularAreas,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #1A1A2E 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.9) 100%)',
        }}
      />

      {/* Animated Particles/Lines */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          background: `
            linear-gradient(90deg, transparent 49%, rgba(198,169,98,0.3) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(198,169,98,0.3) 50%, transparent 51%)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 10 }}>
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Badge */}
            <Chip
              icon={<Sparkles size={16} />}
              label="Dubai's #1 Off-Plan Property Portal"
              sx={{
                bgcolor: 'rgba(198, 169, 98, 0.2)',
                color: 'primary.light',
                fontWeight: 600,
                mb: 4,
                py: 2.5,
                px: 1,
                fontSize: '0.9rem',
                border: '1px solid rgba(198, 169, 98, 0.3)',
              }}
            />

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                color: 'white',
                mb: 3,
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Discover Your Dream
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #C6A962 0%, #D4BC7D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Investment in Dubai
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                maxWidth: 600,
                mx: 'auto',
                mb: 5,
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              Explore 500+ exclusive off-plan projects from Dubai's top developers.
              Your gateway to luxury living and smart investments.
            </Typography>

            {/* Search Box */}
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              setFilterDrawerOpen={setFilterDrawerOpen}
              popularAreas={popularAreas}
            />

            {/* Quick Search Tags */}
            <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mr: 1, alignSelf: 'center' }}>
                Popular:
              </Typography>
              {['Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'Emaar Projects', 'Under 2M'].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  clickable
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(198, 169, 98, 0.3)',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Stats Bar */}
            <Box 
              sx={{ 
                mt: 6,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 3, md: 6 },
              }}
            >
              {quickStats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <stat.icon size={24} color="#C6A962" />
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Scroll Indicator */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                  '50%': { transform: 'translateX(-50%) translateY(-10px)' },
                },
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 50,
                  borderRadius: 15,
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 1,
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 10,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    animation: 'scroll 2s infinite',
                    '@keyframes scroll': {
                      '0%': { opacity: 1, transform: 'translateY(0)' },
                      '100%': { opacity: 0, transform: 'translateY(20px)' },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default HeroSection;