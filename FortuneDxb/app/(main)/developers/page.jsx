'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Skeleton,
  Tooltip,
  IconButton,
  Grid,
  Pagination,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Search,
  ChevronRight,
  Building2,
  BadgeCheck,
  ArrowRight,
  RotateCcw,
  Briefcase,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDevelopers } from '@/hooks/developer/useDeveloperHook';

const ITEMS_PER_PAGE = 12;

// Skeleton for Developer Card
const DeveloperCardSkeleton = () => (
  <Box
    sx={{
      width: { xs: '100%', sm: 280 },
      height: 320,
      borderRadius: 2,
      overflow: 'hidden',
      bgcolor: 'navy.main',
    }}
  >
    <Skeleton variant="rectangular" width="100%" height="60%" sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1) }} />
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="80%" height={24} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1) }} />
      <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
        <Skeleton variant="text" width={50} height={20} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1) }} />
        <Skeleton variant="text" width={50} height={20} sx={{ bgcolor: (theme) => alpha(theme.palette.common.white, 0.1) }} />
      </Box>
    </Box>
  </Box>
);

// Developer Card Component - Square with Background Image
const DeveloperCard = ({ developer }) => {
  const router = useRouter();
  const theme = useTheme();

  const {
    developer_id,
    name,
    logo_path,
    cover_image,
    established_year,
    total_projects,
    is_verified,
  } = developer;

  // Calculate years in business
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = established_year ? currentYear - established_year : null;

  // Handle image path - use logo_path first, then cover_image, then placeholder
  const hasCoverImage = cover_image && cover_image.trim() !== '';
  const hasLogo = logo_path && logo_path.trim() !== '';
  const bgImg = hasCoverImage
    ? cover_image.startsWith('/') ? cover_image : `/${cover_image}`
    : hasLogo
      ? logo_path.startsWith('/') ? logo_path : `/${logo_path}`
      : '/asset/placeholderproject.jpg';

  const bgSize = hasCoverImage
    ? 'cover'
    : hasLogo
      ? '60%'
      : 'cover';

  // Create slug for URL
  const createSlug = (text) => {
    return text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
  };

  const handleViewProjects = () => {
    const slug = createSlug(name);
    router.push(`/developers/${slug}-${developer_id}`);
  };

  return (
    <Box
      onClick={handleViewProjects}
      sx={{
        height: 320,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.gold.main, 0.25)}`,
          '& .bg-image': {
            transform: 'scale(1.08)',
          },
          '& .arrow-btn': {
            bgcolor: 'gold.main',
            color: 'navy.main',
          },
        },
      }}
    >
      {/* Background Image */}
      <Box
        className="bg-image"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgImg})`,
          backgroundSize: bgSize,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transition: 'transform 0.5s ease',
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to top, ${theme.palette.navy.main} 30%, ${alpha(theme.palette.navy.main, 0.28)} 100%)`,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2.5,
        }}
      >
        {/* Name Row - Name + Verified */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {/* Developer Name - Truncate */}
          <Typography
            sx={{
              color: 'common.white',
              fontWeight: 700,
              fontSize: '1.3rem',
              fontFamily: '"Quicksand", sans-serif',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 30px)', // Reserve space for badge
            }}
          >
            {name}
          </Typography>

          {/* Verified Badge - Right after name */}
          {is_verified === 1 && (
            <Tooltip title="Verified Developer" arrow>
              <BadgeCheck size={18} color={theme.palette.gold.main} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            </Tooltip>
          )}
        </Box>

        {/* Stats Row with Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Projects */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Briefcase size={14} color={theme.palette.gold.main} />
            <Typography
              sx={{
                color: 'common.white',
                fontSize: '0.85rem',
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              <Box component="span" sx={{ fontWeight: 700 }}>
                {total_projects || 0}
              </Box>
              <Box component="span" sx={{ color: 'text.disabled', ml: 0.5 }}>
                Projects
              </Box>
            </Typography>
          </Box>

          {/* Years */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Calendar size={14} color={theme.palette.gold.main} />
            <Typography
              sx={{
                color: 'common.white',
                fontSize: '0.85rem',
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              <Box component="span" sx={{ fontWeight: 700 }}>
                {yearsInBusiness || '—'}
              </Box>
              <Box component="span" sx={{ color: 'text.disabled', ml: 0.5 }}>
                Years
              </Box>
            </Typography>
          </Box>

          {/* Arrow Button - Pushed to extreme right */}
          <IconButton
            className="arrow-btn"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProjects();
            }}
            sx={{
              bgcolor: 'transparent',
              border: '1.5px solid',
              borderColor: 'gold.main',
              color: 'gold.main',
              width: 32,
              height: 32,
              borderRadius: 1.5,
              transition: 'all 0.3s ease',
              flexShrink: 0,
              marginLeft: 'auto', // This pushes arrow to extreme right
              '&:hover': {
                bgcolor: 'gold.main',
                color: 'navy.main',
              },
            }}
          >
            <ArrowRight size={16} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default function DevelopersPage() {
  const theme = useTheme();
  // Fetch developers from database
  const { developers, loading, error, fetchDevelopers } = useDevelopers();

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch developers on mount
  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  // Filter developers based on search
  const filteredDevelopers = useMemo(() => {
    if (!developers || developers.length === 0) return [];

    let result = [...developers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name?.toLowerCase().includes(query) ||
          d.tagline?.toLowerCase().includes(query) ||
          d.headquarters?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [developers, searchQuery]);

  // Paginated developers
  const paginatedDevelopers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDevelopers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDevelopers, currentPage]);

  const totalPages = Math.ceil(filteredDevelopers.length / ITEMS_PER_PAGE);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
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
            Top{' '}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Real Estate Developers
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'text.disabled',
              fontSize: '0.95rem',
              fontFamily: '"Quicksand", sans-serif',
              maxWidth: 500,
              mb: 3,
            }}
          >
            Discover trusted developers shaping Dubai&apos;s iconic skyline with luxury properties
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
              placeholder="Search by developer name or location..."
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
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Results Count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
              fontFamily: '"Quicksand", sans-serif',
            }}
          >
            {filteredDevelopers.length} {filteredDevelopers.length === 1 ? 'Developer' : 'Developers'}
          </Typography>

          {searchQuery && (
            <Button
              startIcon={<RotateCcw size={14} />}
              onClick={() => setSearchQuery('')}
              sx={{
                color: 'gold.main',
                fontSize: '0.85rem',
                fontFamily: '"Quicksand", sans-serif',
                textTransform: 'none',
                '&:hover': { bgcolor: (theme) => alpha(theme.palette.gold.main, 0.1) },
              }}
            >
              Clear Search
            </Button>
          )}
        </Box>

        {/* Loading State */}
        {loading && (
          <Grid container spacing={3}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <DeveloperCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
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
              onClick={() => fetchDevelopers()}
              sx={{ borderColor: 'gold.main', color: 'gold.main' }}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Developers - With Pagination */}
        {!loading && !error && (
          <>
            {filteredDevelopers.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {paginatedDevelopers.map((developer) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={developer.developer_id}>
                      <DeveloperCard developer={developer} />
                    </Grid>
                  ))}
                </Grid>

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
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 10,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Building2 size={56} color={theme.palette.grey[300]} style={{ marginBottom: 20 }} />
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: '1rem',
                    mb: 2,
                  }}
                >
                  No developers found
                </Typography>
                {searchQuery && (
                  <Button
                    variant="outlined"
                    onClick={() => setSearchQuery('')}
                    startIcon={<RotateCcw size={16} />}
                    sx={{
                      borderColor: 'gold.main',
                      color: 'gold.main',
                      fontFamily: '"Quicksand", sans-serif',
                      '&:hover': { bgcolor: (theme) => alpha(theme.palette.gold.main, 0.1) },
                    }}
                  >
                    Clear Search
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}