import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  Menu,
  MenuItem,
  Fade,
} from '@mui/material';
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Filter,
  Building2,
  Award,
  Star,
} from 'lucide-react';
import DeveloperCard from '../../component/DeveloperCard';
import properties from '../../Data/properties';

// Filter Options
const experienceOptions = [
  { id: 'all', label: 'All Experience' },
  { id: '5', label: '5+ Years' },
  { id: '10', label: '10+ Years' },
  { id: '15', label: '15+ Years' },
  { id: '20', label: '20+ Years' },
];

const projectsOptions = [
  { id: 'all', label: 'All Projects' },
  { id: '10', label: '10+ Projects' },
  { id: '25', label: '25+ Projects' },
  { id: '50', label: '50+ Projects' },
  { id: '100', label: '100+ Projects' },
];

const specializationOptions = [
  { id: 'all', label: 'All Specializations' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'waterfront', label: 'Waterfront' },
];

const AllDevelopers = () => {
  const [activeExperience, setActiveExperience] = useState('all');
  const [activeProjects, setActiveProjects] = useState('all');
  const [activeSpecialization, setActiveSpecialization] = useState('all');
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  // Dropdown Menu States
  const [experienceAnchor, setExperienceAnchor] = useState(null);
  const [projectsAnchor, setProjectsAnchor] = useState(null);
  const [specializationAnchor, setSpecializationAnchor] = useState(null);

  // Extract unique developers
  const uniqueDevelopers = properties.reduce((acc, property) => {
    const developerName = property.builder?.name;
    if (developerName && !acc.find((dev) => dev.name === developerName)) {
      acc.push({
        ...property.builder,
        totalProjects: (property.builder?.completedProjects || 0) + (property.builder?.ongoingProjects || 0),
        featuredImage: property.image,
      });
    }
    return acc;
  }, []);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          uniqueDevelopers.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 60);
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

  // Reset animation on filter change
  useEffect(() => {
    setVisibleCards([]);
    const timer = setTimeout(() => {
      filteredDevelopers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 50);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [activeExperience, activeProjects, activeSpecialization]);

  // Filter Logic
  const filteredDevelopers = uniqueDevelopers?.filter((developer) => {
    // Experience filter
    if (activeExperience !== 'all') {
      const years = developer?.experienceYears || 0;
      const minYears = parseInt(activeExperience);
      if (years < minYears) return false;
    }

    // Projects filter
    if (activeProjects !== 'all') {
      const projects = developer?.completedProjects || 0;
      const minProjects = parseInt(activeProjects);
      if (projects < minProjects) return false;
    }

    // Specialization filter
    if (activeSpecialization !== 'all') {
      const hasSpec = developer?.specializations?.some((spec) =>
        spec.toLowerCase().includes(activeSpecialization.toLowerCase())
      );
      if (!hasSpec) return false;
    }

    return true;
  });

  // Dropdown Component
  const FilterDropdown = ({ label, icon: Icon, options, anchor, setAnchor, activeValue, setActiveValue }) => {
    const selectedOption = options.find((opt) => opt.id === activeValue);

    return (
      <>
        <Box
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            bgcolor: anchor ? 'rgba(198, 169, 98, 0.15)' : 'rgba(255,255,255,0.05)',
            border: '1px solid',
            borderColor: anchor ? '#C6A962' : 'rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: { xs: '100%', sm: 160 },
            '&:hover': {
              bgcolor: 'rgba(198, 169, 98, 0.1)',
              borderColor: 'rgba(198, 169, 98, 0.5)',
            },
          }}
        >
          <Icon size={18} color="#C6A962" />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', lineHeight: 1, mb: 0.25 }}>
              {label}
            </Typography>
            <Typography sx={{ color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>
              {selectedOption?.label || 'Select'}
            </Typography>
          </Box>
          <ChevronDown
            size={16}
            color="rgba(255,255,255,0.5)"
            style={{
              transform: anchor ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </Box>

        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
          TransitionComponent={Fade}
          disableScrollLock={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                bgcolor: '#1E3A5F',
                border: '1px solid rgba(198, 169, 98, 0.3)',
                borderRadius: 2,
                mt: 1,
                minWidth: 180,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                zIndex: 1300,
              },
            },
          }}
          sx={{
            zIndex: 1300,
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => {
                setActiveValue(option.id);
                setAnchor(null);
              }}
              sx={{
                color: activeValue === option.id ? '#C6A962' : 'rgba(255,255,255,0.8)',
                bgcolor: activeValue === option.id ? 'rgba(198, 169, 98, 0.1)' : 'transparent',
                fontSize: '0.85rem',
                py: 1.25,
                px: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(198, 169, 98, 0.15)',
                  color: '#C6A962',
                },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        bgcolor: '#0B1A2A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(90deg, #C6A962 1px, transparent 1px),
            linear-gradient(0deg, #C6A962 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Gold Glow Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 169, 98, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 169, 98, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ========== HERO HEADER ========== */}
      <Box
        sx={{
          pt: { xs: 12, md: 14 },
          pb: { xs: 3, md: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="xl">
          {/* Title Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(198, 169, 98, 0.1)',
                border: '1px solid rgba(198, 169, 98, 0.3)',
                borderRadius: '100px',
                px: 2,
                py: 0.5,
                mb: 2,
              }}
            >
              <Sparkles size={14} color="#C6A962" />
              <Typography sx={{ color: '#C6A962', fontSize: '0.7rem', fontWeight: 600, letterSpacing: 1 }}>
                TRUSTED BY THOUSANDS
              </Typography>
            </Box>

            <Typography
              sx={{
                color: 'white',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: { xs: '2rem', md: '2.8rem' },
                lineHeight: 1.2,
                mb: 1,
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

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              Partner with Dubai's most renowned real estate developers
            </Typography>
          </Box>

          {/* ========== FILTER BAR ========== */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Left - Dropdowns */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              <FilterDropdown
                label="Experience"
                icon={Award}
                options={experienceOptions}
                anchor={experienceAnchor}
                setAnchor={setExperienceAnchor}
                activeValue={activeExperience}
                setActiveValue={setActiveExperience}
              />

              <FilterDropdown
                label="Projects"
                icon={Building2}
                options={projectsOptions}
                anchor={projectsAnchor}
                setAnchor={setProjectsAnchor}
                activeValue={activeProjects}
                setActiveValue={setActiveProjects}
              />

              <FilterDropdown
                label="Specialization"
                icon={Filter}
                options={specializationOptions}
                anchor={specializationAnchor}
                setAnchor={setSpecializationAnchor}
                activeValue={activeSpecialization}
                setActiveValue={setActiveSpecialization}
              />
            </Box>

            {/* Right - Results Count */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
              {/* Results Count */}
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                <Box component="span" sx={{ color: '#C6A962', fontWeight: 700 }}>
                  {filteredDevelopers?.length}
                </Box>{' '}
                Developers Found
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ========== DEVELOPERS GRID ========== */}
      <Box sx={{ py: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {filteredDevelopers?.map((developer, index) => (
              <Grid
                size={{ xs: 12, md: 6, sm: 6, lg: 4 }}
                key={index}
                sx={{
                  opacity: visibleCards.includes(index) ? 1 : 0,
                  transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <DeveloperCard developer={developer} />
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {filteredDevelopers?.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
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
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', mb: 2 }}>
                No developers found matching your criteria
              </Typography>
              <Button
                onClick={() => {
                  setActiveExperience('all');
                  setActiveProjects('all');
                  setActiveSpecialization('all');
                }}
                sx={{
                  mt: 2,
                  color: '#C6A962',
                  borderColor: '#C6A962',
                  '&:hover': { bgcolor: 'rgba(198, 169, 98, 0.1)' },
                }}
                variant="outlined"
              >
                Clear Filters
              </Button>
            </Box>
          )}

          {/* Load More Button */}
          {filteredDevelopers?.length > 0 && (
            <Box
              sx={{
                textAlign: 'center',
                mt: { xs: 4, md: 5 },
                pb: { xs: 4, md: 6 },
              }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowRight size={16} />}
                sx={{
                  background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                  color: '#0B1A2A',
                  px: 4,
                  py: 1.5,
                  borderRadius: '100px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(198, 169, 98, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(198, 169, 98, 0.4)',
                  },
                }}
              >
                Load More Developers
              </Button>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.75rem',
                  mt: 2,
                }}
              >
                Showing {filteredDevelopers?.length} of {uniqueDevelopers?.length} total developers
              </Typography>

              {/* Trust Badge */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  mt: 4,
                  pt: 4,
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                  }}
                />
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                  All developers are{' '}
                  <Box component="span" sx={{ color: '#C6A962', fontWeight: 600 }}>
                    verified
                  </Box>{' '}
                  and{' '}
                  <Box component="span" sx={{ color: '#C6A962', fontWeight: 600 }}>
                    RERA registered
                  </Box>
                </Typography>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default AllDevelopers;