import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Button, Chip } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import PropertyCard from '../../component/Propertycard';
import properties from '../../Data/properties';

// Filter Options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'ready', label: 'Ready' },
  { id: 'new-launch', label: 'New Launch' },
  { id: 'hot-selling', label: 'Hot' },
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
          properties.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 80);
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
    if (activeFilter === 'new-launch') return property?.status?.toLowerCase().includes('new') || property?.status?.toLowerCase().includes('launch');
    if (activeFilter === 'hot-selling') return property?.featured || property?.hot;
    return true;
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        p: { xs: 2, md: 5 },
        bgcolor: '#0B1A2A',
        position: 'relative',
        overflow: 'hidden',
        mt: { xs: 8, md: 8 },
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

      <Container maxWidth="lg">
        {/* Compact Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
            justifyContent: 'space-between',
            mb: { xs: 3, md: 4 },
            gap: 2,
          }}
        >
          {/* Left - Title */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h3"
              sx={{
                color: '#FFFFFF',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: { xs: '1.6rem', md: '2rem' },
                mb: 0.5,
              }}
            >
              Featured{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #C6A962 0%, #E8D5A3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Projects
              </Box>
            </Typography>
            <Box
              sx={{
                width: 50,
                height: 2,
                background: 'linear-gradient(90deg, #C6A962 0%, transparent 100%)',
                borderRadius: 1,
                mx: { xs: 'auto', md: 0 },
              }}
            />
          </Box>

          {/* Right - Filters */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {filterOptions.map((filter) => (
              <Chip
                key={filter.id}
                label={filter.label}
                onClick={() => setActiveFilter(filter.id)}
                sx={{
                  height: 30,
                  borderRadius: '100px',
                  bgcolor: activeFilter === filter.id ? '#C6A962' : 'transparent',
                  color: activeFilter === filter.id ? '#0B1A2A' : 'rgba(255,255,255,0.7)',
                  border: '1px solid',
                  borderColor: activeFilter === filter.id ? '#C6A962' : 'rgba(255,255,255,0.2)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: activeFilter === filter.id ? '#C6A962' : 'rgba(198, 169, 98, 0.15)',
                    borderColor: '#C6A962',
                  },
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Properties Grid - 3 Cards per Row */}
        <Grid container spacing={2.5}>
          {filteredProperties?.map((property, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={property?.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(25px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>

        {/* Footer - View All Button */}
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 4, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowRight size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              color: '#0B1A2A',
              px: 4,
              py: 1.25,
              borderRadius: '100px',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(198, 169, 98, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)',
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

          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.7rem',
            }}
          >
            {filteredProperties?.length} of {properties?.length} projects
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AllProject;