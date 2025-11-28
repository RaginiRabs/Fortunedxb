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
            }, index * 100);
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
        }, index * 80);
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
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      {/* Top Gradient Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -150,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 300,
          background: 'radial-gradient(ellipse, rgba(198, 169, 98, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Compact Header Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 5, md: 6 },
          pb: { xs: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                color: '#FFFFFF',
                fontFamily: '"Playfair Display", serif',
                mb: 1.5,
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
                width: 80,
                height: 2,
                background: 'linear-gradient(90deg, transparent 0%, #C6A962 50%, transparent 100%)',
                mx: 'auto',
                mb: 4,
              }}
            />

            {/* Search Bar - Elegant Pill */}
            <Box sx={{ maxWidth: 480, mx: 'auto', mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '100px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '100px',
                    fontSize: '0.9rem',
                    '& fieldset': {
                      borderColor: 'transparent',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(198, 169, 98, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#C6A962',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    py: 1.75,
                    px: 0.5,
                    '&::placeholder': {
                      color: '#9CA3AF',
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#C6A962" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 8 } }}>
        {/* Developers Grid - 3 Cards per Row */}
        <Grid
          ref={gridRef}
          container
          spacing={3}
          justifyContent="center"
        >
          {filteredDevelopers.map((developer, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index)
                  ? 'translateY(0)'
                  : 'translateY(30px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
              py: 10,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Building2 size={36} color="rgba(255,255,255,0.3)" />
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontFamily: '"Playfair Display", serif',
                mb: 1,
              }}
            >
              No developers found
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.9rem',
                mb: 3,
              }}
            >
              No results for "{searchTerm}"
            </Typography>

            <Typography
              sx={{
                color: '#C6A962',
                fontSize: '0.85rem',
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
          </Box>
        )}

        {/* Bottom Trust Badge */}
        {filteredDevelopers.length > 0 && (
          <Box
            sx={{
              textAlign: 'center',
              mt: { xs: 6, md: 8 },
              pt: 4,
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >

            <Box component="span" sx={{ color: '#C6A962', fontWeight: 500 }}>
              All developers{' '} verified
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AllDevelopers;