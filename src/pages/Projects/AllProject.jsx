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
  LayoutGrid,
  List,
  Banknote,
  BedDouble,
} from 'lucide-react';
import PropertyCard from '../../component/Propertycard';
import properties from '../../Data/properties';

// Filter Options
const statusOptions = [
  { id: 'all', label: 'All Status' },
  { id: 'ready', label: 'Ready to Move' },
  { id: 'new-launch', label: 'New Launch' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'under-construction', label: 'Under Construction' },
];

const priceOptions = [
  { id: 'all', label: 'Any Price' },
  { id: 'under-1m', label: 'Under AED 1M' },
  { id: '1m-2m', label: 'AED 1M - 2M' },
  { id: '2m-5m', label: 'AED 2M - 5M' },
  { id: 'above-5m', label: 'Above AED 5M' },
];

const bedroomOptions = [
  { id: 'all', label: 'Any Bedroom' },
  { id: 'studio', label: 'Studio' },
  { id: '1bhk', label: '1 BHK' },
  { id: '2bhk', label: '2 BHK' },
  { id: '3bhk', label: '3+ BHK' },
];

const AllProject = () => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [activePrice, setActivePrice] = useState('all');
  const [activeBedroom, setActiveBedroom] = useState('all');
  const [visibleCards, setVisibleCards] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const sectionRef = useRef(null);

  // Dropdown Menu States
  const [statusAnchor, setStatusAnchor] = useState(null);
  const [priceAnchor, setPriceAnchor] = useState(null);
  const [bedroomAnchor, setBedroomAnchor] = useState(null);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          properties.forEach((_, index) => {
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
      properties.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 50);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [activeStatus, activePrice, activeBedroom]);

  // Filter Logic
  const filteredProperties = properties?.filter((property) => {
    if (activeStatus !== 'all') {
      const status = property?.status?.toLowerCase() || '';
      if (activeStatus === 'ready' && !status.includes('ready')) return false;
      if (activeStatus === 'new-launch' && !status.includes('new') && !status.includes('launch')) return false;
      if (activeStatus === 'upcoming' && !status.includes('upcoming')) return false;
      if (activeStatus === 'under-construction' && !status.includes('construction')) return false;
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
        minHeight: '100em',
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
        <Container maxWidth="xl"> {/* Changed to xl for wider content */}
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
                EXPLORE 500+ PROJECTS
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
              Find Your Perfect{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #C6A962 0%, #E8D5A3 50%, #C6A962 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Investment
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
              Discover premium off-plan properties from Dubai's most trusted developers
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
                label="Status"
                icon={Filter}
                options={statusOptions}
                anchor={statusAnchor}
                setAnchor={setStatusAnchor}
                activeValue={activeStatus}
                setActiveValue={setActiveStatus}
              />

              <FilterDropdown
                label="Price Range"
                icon={Banknote}
                options={priceOptions}
                anchor={priceAnchor}
                setAnchor={setPriceAnchor}
                activeValue={activePrice}
                setActiveValue={setActivePrice}
              />

              <FilterDropdown
                label="Bedrooms"
                icon={BedDouble}
                options={bedroomOptions}
                anchor={bedroomAnchor}
                setAnchor={setBedroomAnchor}
                activeValue={activeBedroom}
                setActiveValue={setActiveBedroom}
              />
            </Box>

            {/* Right - View Toggle + Results */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
              {/* Results Count */}
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                <Box component="span" sx={{ color: '#C6A962', fontWeight: 700 }}>
                  {filteredProperties?.length}
                </Box>{' '}
                Projects Found
              </Typography>

              {/* View Toggle */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 0.5,
                  p: 0.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.05)',
                }}
              >
                <Box
                  onClick={() => setViewMode('grid')}
                  sx={{
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: viewMode === 'grid' ? '#C6A962' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <LayoutGrid size={16} color={viewMode === 'grid' ? '#0B1A2A' : 'rgba(255,255,255,0.5)'} />
                </Box>
                <Box
                  onClick={() => setViewMode('list')}
                  sx={{
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: viewMode === 'list' ? '#C6A962' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <List size={16} color={viewMode === 'list' ? '#0B1A2A' : 'rgba(255,255,255,0.5)'} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ========== PROJECTS GRID - 3 PER ROW ========== */}
      <Box sx={{ py: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg" > 
          <Grid container spacing={4}>
            {filteredProperties?.map((property, index) => (
              <Grid
                size={{xs: 12, md: 4, sm:6, lg: 4}}
                key={property?.id}
                sx={{
                  opacity: visibleCards.includes(index) ? 1 : 0,
                  transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {filteredProperties?.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
                No projects found matching your criteria
              </Typography>
              <Button
                onClick={() => {
                  setActiveStatus('all');
                  setActivePrice('all');
                  setActiveBedroom('all');
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
              Load More Projects
            </Button>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                mt: 2,
              }}
            >
              Showing {filteredProperties?.length} of {properties?.length} total projects
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AllProject;