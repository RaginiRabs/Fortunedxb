'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Slider,
  Drawer,
  IconButton,
  Divider,
  Pagination,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  ChevronRight,
  MapPin,
  Building2,
  Home,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import ProjectCard, { ProjectCardSkeleton } from '@/components/home/ProjectCard';
import { useProjects } from '@/hooks/project/useProjecHook';

// Filter Options - ORIGINAL
const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'New Launch', value: 'New Launch' },
  { label: 'Under Construction', value: 'Under Construction' },
  { label: 'Ready', value: 'Ready' },
];

const propertyTypeOptions = [
  { label: 'All Types', value: '' },
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Townhouse', value: 'Townhouse' },
  { label: 'Penthouse', value: 'Penthouse' },
  { label: 'Studio', value: 'Studio' },
];

const bedroomOptions = [
  { label: 'Any Beds', value: '' },
  { label: 'Studio', value: '0' },
  { label: '1 Bedroom', value: '1' },
  { label: '2 Bedrooms', value: '2' },
  { label: '3 Bedrooms', value: '3' },
  { label: '4+ Bedrooms', value: '4' },
];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
];

const ITEMS_PER_PAGE = 12;

export default function ProjectsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // Fetch projects from database
  const { projects, loading, error, fetchProjects } = useProjects();
  
  // Read URL search params
  const searchParams = useSearchParams();

  // View & Layout
  const [viewMode, setViewMode] = useState('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // ============ FILTERS - Local state for drawer ============
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Saved Properties
  const [savedProperties, setSavedProperties] = useState([]);

  // ============ READ URL PARAMS ON MOUNT ============
  useEffect(() => {
    // Read all params from URL (from Home page filters)
    setSearchQuery(searchParams.get('search') || '');
    setSelectedStatus(searchParams.get('status') || '');
    setSelectedType(searchParams.get('type') || searchParams.get('usage') || '');
    setSelectedBedrooms(searchParams.get('beds') || searchParams.get('unit') || '');
    
    const price_min = searchParams.get('price_min');
    const price_max = searchParams.get('price_max');
    if (price_min || price_max) {
      setPriceRange([
        price_min ? parseInt(price_min) : 0,
        price_max ? parseInt(price_max) : 50000000
      ]);
    }

    // Handle area param as search
    const area = searchParams.get('area');
    if (area && !searchParams.get('search')) {
      setSearchQuery(area);
    }
  }, [searchParams]);

  // ============ FETCH PROJECTS WITH URL FILTERS ============
  useEffect(() => {
    // Build filters object from URL params
    const filters = {};
    
    const search = searchParams.get('search') || searchParams.get('area');
    const status = searchParams.get('status');
    const usage = searchParams.get('usage');
    const unit = searchParams.get('unit');
    const developer = searchParams.get('developer');
    const locality = searchParams.get('locality');
    const completion = searchParams.get('completion');
    const payment = searchParams.get('payment');
    const price_min = searchParams.get('price_min');
    const price_max = searchParams.get('price_max');
    const highlights = searchParams.get('highlights');
    const track = searchParams.get('track');

    if (search) filters.search = search;
    if (status) filters.status = status;
    if (usage) filters.usage = usage;
    if (unit) filters.unit = unit;
    if (developer) filters.developer = developer;
    if (locality) filters.locality = locality;
    if (completion) filters.completion = completion;
    if (payment) filters.payment = payment;
    if (price_min) filters.price_min = price_min;
    if (price_max) filters.price_max = price_max;
    if (highlights) filters.highlights = highlights;

    // Curated investment tracks (home page boxes) → map to real filters
    if (track === 'yield' && !status) {
      filters.status = 'Ready'; // ready units → immediate rental income
    } else if (track === 'appreciation' && !status) {
      filters.status = 'New Launch'; // early-stage entry
    } else if (track === 'visa' && !price_min) {
      filters.price_min = 2000000; // Golden Visa threshold
    }

    // Exclude distress deals from the normal projects listing
    filters.distress = 0;

    // console.log('Fetching with filters:', filters);
    fetchProjects(filters);
  }, [searchParams, fetchProjects]);

  // Debug - log projects when they change
  // useEffect(() => {
  //   if (projects.length > 0) {
  //     console.log('Projects loaded:', projects.length);
  //     console.log('First project:', projects[0]);
  //   }
  // }, [projects]);

  // Load saved properties from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  // ✅ Client-side filtering + sorting (for drawer filters not in URL)
  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    let result = [...projects];

    // Additional client-side search filter (if user types in projects page)
    if (searchQuery && !searchParams.get('search')) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.project_name?.toLowerCase().includes(query) ||
          p.location?.toLowerCase().includes(query) ||
          p.locality?.toLowerCase().includes(query) ||
          p.developer_name?.toLowerCase().includes(query) ||
          p.area_name?.toLowerCase().includes(query)
      );
    }

    // Property type filter (client-side)
    if (selectedType && !searchParams.get('usage')) {
      result = result.filter((p) => p.project_type === selectedType || p.usage_type === selectedType);
    }

    // Bedrooms filter (client-side)
    if (selectedBedrooms && !searchParams.get('unit')) {
      // Check in configurations
      result = result.filter((p) => {
        if (!p.configurations || p.configurations.length === 0) return false;
        return p.configurations.some(config => {
          if (selectedBedrooms === '4') {
            return config.type?.includes('4') || config.type?.includes('5') || config.type?.includes('6');
          }
          if (selectedBedrooms === '0') {
            return config.type?.toLowerCase().includes('studio');
          }
          return config.type?.includes(`${selectedBedrooms} BHK`) || config.type?.includes(`${selectedBedrooms} Bedroom`);
        });
      });
    }

    // Price range filter (client-side if not in URL)
    const isPriceFilterActive = priceRange[0] > 0 || priceRange[1] < 50000000;
    if (isPriceFilterActive && !searchParams.get('price_min') && !searchParams.get('price_max')) {
      result = result.filter((p) => {
        const price = p.configurations?.[0]?.price_min || 0;
        if (!price) return true;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Status filter (client-side if not in URL)
    if (selectedStatus && !searchParams.get('status')) {
      result = result.filter((p) => p.project_status === selectedStatus);
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => {
          const priceA = a.configurations?.[0]?.price_min || 0;
          const priceB = b.configurations?.[0]?.price_min || 0;
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        result.sort((a, b) => {
          const priceA = a.configurations?.[0]?.price_min || 0;
          const priceB = b.configurations?.[0]?.price_min || 0;
          return priceB - priceA;
        });
        break;
      case 'name_asc':
        result.sort((a, b) => (a.project_name || '').localeCompare(b.project_name || ''));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
    }

    return result;
  }, [projects, searchQuery, selectedStatus, selectedType, selectedBedrooms, priceRange, sortBy, searchParams]);

  // Paginated projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedType, selectedBedrooms, priceRange, sortBy]);

  // Handle save property
  const handleSaveProperty = useCallback((projectId) => {
    setSavedProperties((prev) => {
      const newSaved = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      localStorage.setItem('savedProperties', JSON.stringify(newSaved));
      return newSaved;
    });
  }, []);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedBedrooms('');
    setPriceRange([0, 50000000]);
    setSortBy('newest');
    setCurrentPage(1);
    // Clear URL params
    router.push('/projects');
  };

  // Check if any filters are active
  const hasActiveFilters = 
    searchQuery || 
    selectedStatus || 
    selectedType || 
    selectedBedrooms || 
    priceRange[0] > 0 || 
    priceRange[1] < 50000000 ||
    searchParams.get('developer') ||
    searchParams.get('locality') ||
    searchParams.get('highlights');

  // Format price for display
  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `AED ${(value / 1000000).toFixed(1)}M`;
    }
    return `AED ${(value / 1000).toFixed(0)}K`;
  };

  // Quick filter chips based on status
  const statusChips = statusOptions.slice(1);

  return (
    <Box sx={{ bgcolor: 'background.subtle', minHeight: '100vh' }}>
      {/* Hero Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.navy.main} 0%, ${theme.palette.navy.light} 100%)`,
          pt: { xs: 12, md: 20 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              color: 'common.white',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              mb: 1,
            }}
          >
            Explore{' '}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Premium Projects
            </Box>
          </Typography>

          <Typography
            sx={{
              color: alpha(theme.palette.common.white, 0.65),
              fontSize: '0.95rem',
              fontFamily: '"Quicksand", sans-serif',
              maxWidth: 500,
              mb: 3,
            }}
          >
            Discover exceptional off-plan and ready properties across Dubai&apos;s most prestigious locations
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: 800,
            }}
          >
            <TextField
              placeholder="Search by project, location, or developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: '"Quicksand", sans-serif',
                  '& fieldset': { border: 'none' },
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<SlidersHorizontal size={18} />}
              onClick={() => setFilterDrawerOpen(true)}
              sx={{
                bgcolor: 'gold.main',
                color: 'common.white',
                px: 3,
                borderRadius: 2,
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 600,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: 'gold.dark' },
              }}
            >
              Filters {hasActiveFilters && `(${[selectedStatus, selectedType, selectedBedrooms].filter(Boolean).length + (priceRange[0] > 0 || priceRange[1] < 50000000 ? 1 : 0)})`}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
     <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Quick Filters & Controls */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          {/* Status Quick Filters */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="All"
              onClick={() => setSelectedStatus('')}
              sx={{
                bgcolor: !selectedStatus ? 'gold.main' : 'transparent',
                color: !selectedStatus ? 'common.white' : 'text.primary',
                border: '1.5px solid',
                borderColor: !selectedStatus ? 'gold.main' : 'divider',
                fontWeight: 600,
                fontFamily: '"Quicksand", sans-serif',
                '&:hover': { bgcolor: !selectedStatus ? 'gold.main' : alpha(theme.palette.gold.main, 0.1) },
              }}
            />
            {statusChips.map((status) => (
              <Chip
                key={status.value}
                label={status.label}
                onClick={() => setSelectedStatus(status.value)}
                sx={{
                  bgcolor: selectedStatus === status.value ? 'gold.main' : 'transparent',
                  color: selectedStatus === status.value ? 'common.white' : 'text.primary',
                  border: '1.5px solid',
                  borderColor: selectedStatus === status.value ? 'gold.main' : 'divider',
                  fontWeight: 600,
                  fontFamily: '"Quicksand", sans-serif',
                  '&:hover': {
                    bgcolor: selectedStatus === status.value ? 'gold.main' : alpha(theme.palette.gold.main, 0.1),
                  },
                }}
              />
            ))}
          </Box>

          {/* Right Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Results Count */}
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </Typography>

            {/* Sort */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<ArrowUpDown size={14} style={{ marginRight: 8 }} />}
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* View Toggle */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <IconButton
                onClick={() => setViewMode('grid')}
                sx={{
                  bgcolor: viewMode === 'grid' ? 'gold.main' : 'transparent',
                  color: viewMode === 'grid' ? 'common.white' : 'text.secondary',
                  borderRadius: 1,
                  '&:hover': { bgcolor: viewMode === 'grid' ? 'gold.main' : 'grey.100' },
                }}
              >
                <Grid3X3 size={18} />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                sx={{
                  bgcolor: viewMode === 'list' ? 'gold.main' : 'transparent',
                  color: viewMode === 'list' ? 'common.white' : 'text.secondary',
                  borderRadius: 1,
                  '&:hover': { bgcolor: viewMode === 'list' ? 'gold.main' : 'grey.100' },
                }}
              >
                <List size={18} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {searchQuery && (
              <Chip
                label={`Search: "${searchQuery}"`}
                onDelete={() => setSearchQuery('')}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            {selectedType && (
              <Chip
                label={`Type: ${selectedType}`}
                onDelete={() => setSelectedType('')}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            {selectedBedrooms && (
              <Chip
                label={`Beds: ${selectedBedrooms === '0' ? 'Studio' : selectedBedrooms === '4' ? '4+' : selectedBedrooms}`}
                onDelete={() => setSelectedBedrooms('')}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            {(priceRange[0] > 0 || priceRange[1] < 50000000) && (
              <Chip
                label={`Price: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
                onDelete={() => setPriceRange([0, 50000000])}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            {searchParams.get('developer') && (
              <Chip
                label={`Developer ID: ${searchParams.get('developer')}`}
                onDelete={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('developer');
                  router.push(`/projects?${params.toString()}`);
                }}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            {searchParams.get('locality') && (
              <Chip
                label={`Locality: ${searchParams.get('locality')}`}
                onDelete={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('locality');
                  router.push(`/projects?${params.toString()}`);
                }}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            {searchParams.get('highlights') && (
              <Chip
                label={`Highlights: ${searchParams.get('highlights')}`}
                onDelete={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('highlights');
                  router.push(`/projects?${params.toString()}`);
                }}
                size="small"
                sx={{ fontFamily: '"Quicksand", sans-serif' }}
              />
            )}
            <Chip
              icon={<RotateCcw size={14} />}
              label="Reset All"
              onClick={resetFilters}
              size="small"
              sx={{
                fontFamily: '"Quicksand", sans-serif',
                color: 'gold.main',
                borderColor: 'gold.main',
                '&:hover': { bgcolor: alpha(theme.palette.gold.main, 0.1) },
              }}
              variant="outlined"
            />
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Grid container spacing={3}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <ProjectCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography color="error" sx={{ mb: 2, fontFamily: '"Quicksand", sans-serif' }}>
              {error}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => fetchProjects()}
              sx={{ borderColor: 'gold.main', color: 'gold.main' }}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {paginatedProjects.length > 0 ? (
              <Grid container spacing={2.5}>
                {paginatedProjects.map((project) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={project.project_id}
                  >
                    <ProjectCard
                      project={project}
                      savedProperties={savedProperties}
                      onSaveProperty={handleSaveProperty}
                      onInquiry={() => console.log('Inquiry:', project.project_id)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Building2 size={48} color={theme.palette.grey[300]} style={{ marginBottom: 16 }} />
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontFamily: '"Quicksand", sans-serif',
                    mb: 2,
                  }}
                >
                  No projects found matching your criteria
                </Typography>
                <Button
                  variant="outlined"
                  onClick={resetFilters}
                  startIcon={<RotateCcw size={16} />}
                  sx={{
                    borderColor: 'gold.main',
                    color: 'gold.main',
                    fontFamily: '"Quicksand", sans-serif',
                    '&:hover': { bgcolor: alpha(theme.palette.gold.main, 0.1) },
                  }}
                >
                  Clear Filters
                </Button>
              </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontFamily: '"Quicksand", sans-serif',
                      fontWeight: 600,
                      '&.Mui-selected': {
                        bgcolor: 'gold.main',
                        color: 'common.white',
                        '&:hover': { bgcolor: 'gold.dark' },
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>

      {/* ============ ORIGINAL FILTER DRAWER ============ */}
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 380,
            height: isMobile ? '85vh' : '100%',
            borderRadius: isMobile ? '16px 16px 0 0' : 0,
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography
              sx={{
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'text.primary',
              }}
            >
              Filter Projects
            </Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <X size={20} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Filter Content */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {/* Property Type */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Home size={16} />
                Property Type
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  displayEmpty
                  sx={{ fontFamily: '"Quicksand", sans-serif' }}
                >
                  {propertyTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Bedrooms */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Building2 size={16} />
                Bedrooms
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {bedroomOptions.map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    onClick={() => setSelectedBedrooms(option.value)}
                    sx={{
                      bgcolor: selectedBedrooms === option.value ? 'gold.main' : 'transparent',
                      color: selectedBedrooms === option.value ? 'common.white' : 'text.primary',
                      border: '1px solid',
                      borderColor: selectedBedrooms === option.value ? 'gold.main' : 'divider',
                      fontFamily: '"Quicksand", sans-serif',
                      '&:hover': {
                        bgcolor: selectedBedrooms === option.value ? 'gold.main' : alpha(theme.palette.gold.main, 0.1),
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Price Range */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  mb: 1.5,
                }}
              >
                Price Range
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue)}
                  min={0}
                  max={50000000}
                  step={500000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={formatPrice}
                  sx={{
                    color: 'gold.main',
                    '& .MuiSlider-thumb': { bgcolor: 'gold.main' },
                    '& .MuiSlider-track': { bgcolor: 'gold.main' },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontFamily: '"Quicksand", sans-serif' }}>
                    {formatPrice(priceRange[0])}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontFamily: '"Quicksand", sans-serif' }}>
                    {formatPrice(priceRange[1])}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Project Status */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <MapPin size={16} />
                Project Status
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  displayEmpty
                  sx={{ fontFamily: '"Quicksand", sans-serif' }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Footer Actions */}
          <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={resetFilters}
                sx={{
                  borderColor: 'divider',
                  color: 'text.secondary',
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setFilterDrawerOpen(false)}
                sx={{
                  bgcolor: 'gold.main',
                  color: 'common.white',
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'gold.dark' },
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}