import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
} from '@mui/material';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const filterOptions = [
  { id: 0, label: 'All' },
  { id: 1, label: 'Hot Selling' },
  { id: 2, label: 'New Launch' },
  { id: 3, label: 'Upcoming' },
];

const FeaturedProjects = ({
  activeTab,
  handleTabChange,
  viewMode,
  setViewMode,
  filteredProjects,
  savedProperties,
  handleSaveProperty,
  handleInquiry,
}) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          filteredProjects?.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 80);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [filteredProjects?.length]);

  useEffect(() => {
    setVisibleCards([]);
    const timer = setTimeout(() => {
      filteredProjects?.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 60);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        pt: { xs: 3, md: 4 },
        pb: { xs: 4, md: 5 },
        bgcolor: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#0B1A2A',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              mb: 0.5,
            }}
          >
            Featured{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Off-Plan Projects
            </Box>
          </Typography>

          <Box
            sx={{
              width: 50,
              height: 2,
              background: 'linear-gradient(90deg, transparent 0%, #C6A962 50%, transparent 100%)',
              mx: 'auto',
              mb: 1,
            }}
          />

          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.85rem',
              maxWidth: 450,
              mx: 'auto',
            }}
          >
            Handpicked luxury developments offering exceptional investment opportunities
          </Typography>
        </Box>

        {/* Filter Pills */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          {filterOptions.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onClick={() => handleTabChange(null, filter.id)}
              sx={{
                height: 32,
                px: 0.5,
                borderRadius: '100px',
                bgcolor: activeTab === filter.id ? '#C6A962' : 'transparent',
                color: activeTab === filter.id ? '#0B1A2A' : '#0B1A2A',
                border: '1.5px solid',
                borderColor: activeTab === filter.id ? '#C6A962' : '#E2E8F0',
                fontWeight: 600,
                fontSize: '0.75rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: activeTab === filter.id ? '#C6A962' : 'rgba(198, 169, 98, 0.1)',
                  borderColor: '#C6A962',
                },
                '& .MuiChip-label': { px: 1.5 },
              }}
            />
          ))}
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={2.5}>
          {filteredProjects?.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={project?.id}
              sx={{
                opacity: visibleCards.includes(index) ? 1 : 0,
                transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ProjectCard
                project={project}
                savedProperties={savedProperties}
                handleSaveProperty={handleSaveProperty}
                handleInquiry={handleInquiry}
              />
            </Grid>
          ))}
        </Grid>

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
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
              boxShadow: '0 4px 20px rgba(198, 169, 98, 0.25)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(198, 169, 98, 0.35)',
              },
              '& .MuiButton-endIcon': {
                ml: 0.75,
                transition: 'transform 0.3s ease',
              },
              '&:hover .MuiButton-endIcon': {
                transform: 'translateX(3px)',
              },
            }}
          >
            View All 500+ Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProjects;