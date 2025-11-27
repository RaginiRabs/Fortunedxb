import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  Search,
  Crown,
  Building2,
  Shield,
} from 'lucide-react';
import properties from '../../Data/properties';
import DeveloperCard from '../../component/DeveloperCard';

const AllDevelopers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState([]);
  const gridRef = useRef(null);

  // Extract unique developers
  const uniqueDevelopers = properties.reduce((acc, property) => {
    const developerName = property.builder.name;
    if (!acc.find((dev) => dev.name === developerName)) {
      acc.push({
        ...property.builder,
        totalProjects:
          property.builder.completedProjects + property.builder.ongoingProjects,
        featuredImage: property.image,
      });
    }
    return acc;
  }, []);

  // Filter developers based on search
  const filteredDevelopers = uniqueDevelopers.filter(
    (developer) =>
      developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.about?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.specializations?.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          filteredDevelopers.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 120);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, [filteredDevelopers.length]);

  // Reset visible cards when search changes
  useEffect(() => {
    setVisibleCards([]);
    const timer = setTimeout(() => {
      filteredDevelopers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 100);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0B1A2A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      {/* Top Gradient Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(198, 169, 98, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 8, md: 10 },
          pb: { xs: 5, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Crown Emblem */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'rgba(198, 169, 98, 0.1)',
                border: '1.5px solid rgba(198, 169, 98, 0.3)',
                mb: 3,
                boxShadow: '0 0 40px rgba(198, 169, 98, 0.15)',
              }}
            >
              <Crown size={28} color="#C6A962" strokeWidth={1.5} />
            </Box>

            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                color: '#FFFFFF',
                fontFamily: '"Playfair Display", serif',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              Premium{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #C6A962 0%, #E8D5A3 50%, #C6A962 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Developers
              </Box>
            </Typography>

            {/* Gold Underline */}
            <Box
              sx={{
                width: 100,
                height: 2,
                background: 'linear-gradient(90deg, transparent 0%, #C6A962 50%, transparent 100%)',
                mx: 'auto',
                mb: 3,
              }}
            />

            {/* Subtitle */}
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.65)',
                maxWidth: 520,
                mx: 'auto',
                fontWeight: 400,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.7,
                letterSpacing: 0.3,
              }}
            >
              Dubai's most trusted and award-winning real estate developers, 
              delivering excellence for decades
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 } }}>
        {/* Search Bar */}
        <Box sx={{ maxWidth: 520, mx: 'auto', mb: { xs: 5, md: 6 } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                fontSize: '0.95rem',
                '& fieldset': {
                  borderColor: 'transparent',
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(198, 169, 98, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C6A962',
                  borderWidth: 2,
                },
              },
              '& .MuiOutlinedInput-input': {
                py: 2,
                px: 1,
                '&::placeholder': {
                  color: '#9CA3AF',
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#9CA3AF" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Results Count */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 6 },
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.9rem',
              letterSpacing: 0.5,
            }}
          >
            Showing{' '}
            <Box
              component="span"
              sx={{
                color: '#C6A962',
                fontWeight: 700,
              }}
            >
              {filteredDevelopers.length}
            </Box>{' '}
            of{' '}
            <Box
              component="span"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
              }}
            >
              {uniqueDevelopers.length}
            </Box>{' '}
            premium developers
          </Typography>
        </Box>

        {/* Developers Grid */}
        <Grid
          ref={gridRef}
          container
          spacing={{ xs: 4, md: 5 }}
          justifyContent="center"
        >
          {filteredDevelopers.map((developer, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={index}
              sx={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index)
                  ? 'translateY(0)'
                  : 'translateY(40px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <DeveloperCard developer={developer} />
            </Grid>
          ))}
        </Grid>

        {/* No Results */}
        {filteredDevelopers.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 12,
            }}
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4,
              }}
            >
              <Building2 size={40} color="rgba(255,255,255,0.3)" />
            </Box>

            <Typography
              variant="h5"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontFamily: '"Playfair Display", serif',
                mb: 1.5,
              }}
            >
              No developers found
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.95rem',
                mb: 4,
              }}
            >
              {searchTerm
                ? `No results for "${searchTerm}"`
                : 'Try searching for a developer'}
            </Typography>

            {searchTerm && (
              <Typography
                sx={{
                  color: '#C6A962',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Typography>
            )}
          </Box>
        )}

        {/* Bottom Trust Badge */}
        {filteredDevelopers.length > 0 && (
          <Box
            sx={{
              textAlign: 'center',
              mt: { xs: 8, md: 10 },
              pt: 5,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '100px',
                px: 4,
                py: 2,
              }}
            >
              <Shield size={18} color="#C6A962" />
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: 0.3,
                }}
              >
                All developers are{' '}
                <Box component="span" sx={{ color: '#C6A962', fontWeight: 600 }}>
                  verified
                </Box>{' '}
                &{' '}
                <Box component="span" sx={{ color: '#C6A962', fontWeight: 600 }}>
                  RERA registered
                </Box>
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AllDevelopers;