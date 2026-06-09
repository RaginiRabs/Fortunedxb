'use client';
import { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Skeleton,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useVerifiedDevelopers } from '@/hooks/developer/useDeveloperHook';

const TopDevelopers = () => {
  const theme = useTheme();
  const router = useRouter();
  const scrollRef = useRef(null);

  const { developers: apiDevelopers, loading, error, fetchVerifiedDevelopers } = useVerifiedDevelopers();

  useEffect(() => {
    fetchVerifiedDevelopers();
  }, [fetchVerifiedDevelopers]);

  // Get top 12 developers for better scrolling experience
  const developers = (apiDevelopers || []);

  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  const createSlug = (text) => {
    return text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
  };

  const handleDeveloperClick = (developer) => {
    const slug = createSlug(developer.name);
    router.push(`/developers/${slug}-${developer.developer_id}`);
  };

  // Auto scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || loading || developers.length === 0) return;

    let scrollInterval;
    let isHovered = false;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && scrollContainer) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

          if (scrollContainer.scrollLeft >= maxScroll) {
            // Reset to start smoothly
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 30); // Smooth slow scroll
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    startScroll();

    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [loading, developers.length]);

  // Loading skeleton
  const LogoSkeleton = () => (
    <Box
      sx={{
        minWidth: 180,
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Skeleton
        variant="rectangular"
        width={140}
        height={60}
        sx={{ borderRadius: 1 }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: 'background.default',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'grey.100',
        height: { xs: '500vh', md: '60vh', lg: '60vh' }
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mt: { xs: 1, md: 1, lg: 3 }, mb: { xs: 5, md: 6, lg: 10 } }}>
          <Typography
            sx={{
              color: 'text.primary',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 600,
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              mb: 0.5,
            }}
          >
            Trusted by Top Developers
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"Quicksand", sans-serif',
              fontSize: { xs: '0.85rem', md: '0.9rem' },
            }}
          >
            Premier partnerships with Dubai&apos;s leading real estate developers
          </Typography>
        </Box>

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography
              sx={{
                color: 'error.main',
                fontFamily: '"Quicksand", sans-serif',
                fontSize: '0.9rem',
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'hidden',
              py: 2,
            }}
          >
            {[...Array(6)].map((_, index) => (
              <LogoSkeleton key={index} />
            ))}
          </Box>
        )}

        {/* Horizontal Scrollable Logo Strip */}
        {!loading && !error && developers.length > 0 && (
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              gap: { xs: 3, md: 4 },
              overflowX: 'auto',
              overflowY: 'hidden',
              py: 2,
              px: 1,
              scrollBehavior: 'smooth',
              // Hide scrollbar
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              // Gradient masks on edges
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            {/* Duplicate logos for infinite scroll effect */}
            {[...developers, ...developers].map((developer, index) => (
              <Box
                key={`${developer.developer_id}-${index}`}
                onClick={() => handleDeveloperClick(developer)}
                sx={{
                  minWidth: { xs: 160, md: 200 },
                  height: { xs: 80, md: 100 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  px: 2,
                  '&:hover': {
                    transform: 'scale(1.08)',
                    '& .logo-img': {
                      filter: 'grayscale(0%) brightness(1)',
                    },
                  },
                }}
              >
                {developer.logo_path ? (
                  <Box
                    component="img"
                    src={getImagePath(developer.logo_path)}
                    alt={developer.name}
                    className="logo-img"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(30%) brightness(0.95)',
                      transition: 'all 0.3s ease',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.style.cssText = `
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, ${theme.palette.background.subtle} 0%, ${theme.palette.grey[100]} 100%);
                        border-radius: 8px;
                        border: 1px solid ${theme.palette.divider};
                      `;
                      fallback.innerHTML = `
                        <span style="
                          color: ${theme.palette.text.secondary};
                          font-weight: 700;
                          font-size: 1.8rem;
                          font-family: 'Quicksand', sans-serif;
                        ">${developer.name?.charAt(0) || 'D'}</span>
                      `;
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                ) : (
                  /* Fallback - Developer Name Initial */
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${theme.palette.background.subtle} 0%, ${theme.palette.grey[100]} 100%)`,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 700,
                        fontSize: '1.8rem',
                        fontFamily: '"Quicksand", sans-serif',
                      }}
                    >
                      {developer.name?.charAt(0)}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Empty State */}
        {!loading && !error && developers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography
              sx={{
                color: 'text.disabled',
                fontFamily: '"Quicksand", sans-serif',
                fontSize: '0.9rem',
              }}
            >
              No developers found
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TopDevelopers;