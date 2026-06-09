'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Pagination,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProjectCard, { ProjectCardSkeleton } from './ProjectCard';
import { useFeaturedProjects } from '@/hooks/project/useProjecHook';

const filterOptions = [
  { id: 0, label: 'All', value: '' },
  { id: 1, label: 'New Launch', value: 'New Launch' },
  { id: 2, label: 'Under Construction', value: 'Under Construction' },
  { id: 3, label: 'Ready to Move', value: 'Ready to Move' },
];

const ITEMS_PER_PAGE = 6;

const FeaturedProjects = () => {
  const theme = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);

  const { featuredProjects: projects, loading, error, pagination, fetchFeaturedProjects } = useFeaturedProjects();

  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedProperties, setSavedProperties] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const status = filterOptions[activeTab]?.value || '';
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    fetchFeaturedProjects({ status, limit: ITEMS_PER_PAGE, offset });
  }, [activeTab, currentPage, fetchFeaturedProjects]);

  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved) setSavedProperties(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && projects?.length > 0) {
          projects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                if (!prev.includes(index)) return [...prev, index];
                return prev;
              });
            }, index * 80);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    setVisibleCards([]);
    if (projects?.length > 0) {
      const timer = setTimeout(() => {
        projects.forEach((_, index) => {
          setTimeout(() => {
            setVisibleCards((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          }, index * 60);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [projects]);

  const handleTabChange = (newTabId) => {
    setActiveTab(newTabId);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveProperty = useCallback((projectId) => {
    setSavedProperties((prev) => {
      const newSaved = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      localStorage.setItem('savedProperties', JSON.stringify(newSaved));
      return newSaved;
    });
  }, []);

  const handleInquiry = (projectId) => {};

  return (
    <Box
      ref={sectionRef}
      sx={{
        pt: { xs: 6, sm: 7, md: 8, lg: 10 },
        pb: { xs: 8, sm: 9, md: 10, lg: 12 },
        // ✅ hardcoded '#FFFFFF' hata ke theme color
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 3.5, md: 4, lg: 5 } }}>
          <Typography
            variant="h3"
            sx={{
              // ✅ '#0B1A2A' → 'text.primary'
              color: 'text.primary',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '1.65rem', md: '1.8rem', lg: '2.2rem' },
              mb: 0.5,
              lineHeight: 1.2,
            }}
          >
            Featured{' '}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Off-Plan Projects
            </Box>
          </Typography>

          <Box
            sx={{
              width: { xs: 40, sm: 45, md: 50, lg: 60 },
              height: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
              background: `linear-gradient(90deg, transparent 0%, ${theme.palette.gold.main} 50%, transparent 100%)`,
              mx: 'auto',
              mb: 1.5,
            }}
          />

          <Typography
            sx={{
              // ✅ '#64748B' → 'text.secondary'
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem', lg: '0.95rem' },
              maxWidth: { xs: '90%', sm: '500px' },
              mx: 'auto',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              lineHeight: 1.5,
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
            gap: { xs: 0.75, sm: 1, md: 1.25 },
            mb: { xs: 3, sm: 3.5, md: 4, lg: 5 },
            flexWrap: 'wrap',
            px: { xs: 1, sm: 0 },
          }}
        >
          {filterOptions.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onClick={() => handleTabChange(filter.id)}
              sx={{
                height: { xs: 30, sm: 32, md: 36 },
                px: { xs: 0.25, sm: 0.5 },
                borderRadius: 1,
                // ✅ Active: gold, Inactive: theme-aware
                bgcolor: activeTab === filter.id ? 'gold.main' : 'transparent',
                color: activeTab === filter.id ? 'common.white' : 'text.primary',
                border: '1.5px solid',
                borderColor: activeTab === filter.id ? 'gold.main' : 'divider',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: activeTab === filter.id ? 'gold.main' : alpha(theme.palette.gold.main, 0.1),
                  borderColor: 'gold.main',
                },
                '& .MuiChip-label': {
                  px: { xs: 1.25, sm: 1.5, md: 1.75 },
                },
              }}
            />
          ))}
        </Box>

        {/* Loading State */}
        {loading && (
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                const status = filterOptions[activeTab]?.value || '';
                const offset = (currentPage - 1) * ITEMS_PER_PAGE;
                fetchFeaturedProjects({ status, limit: ITEMS_PER_PAGE, offset });
              }}
              sx={{
                borderColor: 'gold.main',
                color: 'gold.main',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {projects?.length > 0 ? (
              <Grid
                container
                spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }}
                sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
              >
                {projects.map((project, index) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                    key={project?.project_id}
                    sx={{
                      opacity: visibleCards.includes(index) ? 1 : 0,
                      transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <ProjectCard
                      project={project}
                      savedProperties={savedProperties}
                      onSaveProperty={handleSaveProperty}
                      onInquiry={handleInquiry}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
                <Typography
                  sx={{
                    // ✅ '#64748B' → 'text.secondary'
                    color: 'text.secondary',
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                  }}
                >
                  No projects found for this filter
                </Typography>
              </Box>
            )}

            {/* Pagination */}
            {pagination?.total_pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, sm: 5, md: 6 } }}>
                <Pagination
                  count={pagination.total_pages}
                  page={currentPage}
                  onChange={handlePageChange}
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontFamily: '"Quicksand", sans-serif',
                      fontWeight: 600,
                      // ✅ '#0B1A2A' → 'text.primary'
                      color: 'text.primary',
                      // ✅ '#E2E8F0' → 'divider'
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.gold.main, 0.1),
                        borderColor: 'gold.main',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'gold.main',
                        color: 'common.white',
                        borderColor: 'gold.main',
                        '&:hover': { bgcolor: 'gold.dark' },
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}

        {/* View All Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            endIcon={<ArrowRight size={16} color={theme.palette.common.white} />}
            onClick={() => router.push('/projects')}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
              color: 'common.white',
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              borderRadius: 1,
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
              textTransform: 'none',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              boxShadow: `0 4px 20px ${alpha(theme.palette.gold.main, 0.25)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 30px ${alpha(theme.palette.gold.main, 0.35)}`,
              },
              '& .MuiButton-endIcon': {
                ml: { xs: 0.5, sm: 0.75 },
                transition: 'transform 0.3s ease',
              },
              '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
            }}
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProjects;