import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Button, Chip } from '@mui/material';
import { ArrowRight, Sparkles } from 'lucide-react';
import PropertyCard from '../../component/Propertycard';
import properties from '../../Data/properties';

// Filter Options
const filterOptions = [
  { id: 'all', label: 'All Projects' },
  { id: 'ready', label: 'Ready' },
  { id: 'new-launch', label: 'New Launch' },
  { id: 'hot-selling', label: 'Hot Selling' },
];

const AllProject = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger card animations
          properties.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter Logic
  const filteredProperties = properties?.filter((property) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ready') return property?.status?.toLowerCase().includes('ready');
    if (activeFilter === 'new-launch') return property?.status?.toLowerCase().includes('launch');
    if (activeFilter === 'hot-selling') return property?.featured || property?.hot;
    return true;
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: '#0B1A2A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Accents */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(180deg, #F8FAFC 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          {/* Small Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(198, 169, 98, 0.08)',
              border: '1px solid rgba(198, 169, 98, 0.2)',
              borderRadius: '100px',
              px: 2,
              py: 0.5,
              mb: 2,
            }}
          >
            <Sparkles size={12} color="#C6A962" />
            <Typography
              sx={{
                color: '#C6A962',
                fontWeight: 600,
                fontSize: '0.65rem',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              Featured Collection
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: '#1E3A5F',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 500,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              letterSpacing: '-0.02em',
              mb: 1.5,
            }}
          >
            Explore Our Projects
          </Typography>

          {/* Gold Separator Line */}
          <Box
            sx={{
              width: 60,
              height: 2,
              background: 'linear-gradient(90deg, #C6A962 0%, #E8D5A3 100%)',
              mx: 'auto',
              mb: 2,
              borderRadius: 1,
            }}
          />

          {/* Subtitle */}
          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.9rem',
              fontWeight: 400,
              maxWidth: 450,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover premium properties across Dubai's most prestigious locations
          </Typography>
        </Box>

        {/* Filter Pills */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mb: { xs: 4, md: 5 },
            flexWrap: 'wrap',
          }}
        >
          {filterOptions.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onClick={() => setActiveFilter(filter.id)}
              sx={{
                px: 1,
                height: 34,
                borderRadius: '100px',
                bgcolor: activeFilter === filter.id ? '#1E3A5F' : 'transparent',
                color: activeFilter === filter.id ? 'white' : '#1E3A5F',
                border: '1px solid',
                borderColor: activeFilter === filter.id ? '#1E3A5F' : '#E2E8F0',
                fontWeight: 500,
                fontSize: '0.75rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: activeFilter === filter.id ? '#1E3A5F' : 'rgba(198, 169, 98, 0.08)',
                  borderColor: activeFilter === filter.id ? '#1E3A5F' : '#C6A962',
                },
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          ))}
        </Box>

        {/* Properties Grid */}
        <Grid container spacing={3} justifyContent="center">
          {filteredProperties?.map((property, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={property?.id}
              sx={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>

        {/* View More Button */}
        <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 6 } }}>
          <Button
            variant="contained"
            endIcon={<ArrowRight size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: '100px',
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(198, 169, 98, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(198, 169, 98, 0.4)',
              },
              '& .MuiButton-endIcon': {
                ml: 1,
                transition: 'transform 0.3s ease',
              },
              '&:hover .MuiButton-endIcon': {
                transform: 'translateX(4px)',
              },
            }}
          >
            View All Projects
          </Button>

          {/* Project Count */}
          <Typography
            sx={{
              color: '#94A3B8',
              fontSize: '0.75rem',
              mt: 2,
            }}
          >
            Showing {filteredProperties?.length} of {properties?.length} projects
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AllProject;