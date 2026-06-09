'use client';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { Building2, RotateCcw } from 'lucide-react';
import DistressCard, { DistressCardSkeleton } from '@/components/distress/DistressCard';
import { useDistressDeals } from '@/hooks/project/useDistressDeals';

const SKELETON_COUNT = 8;

export default function DistressDealsPage() {
  const theme = useTheme();
  const { deals, loading, error, fetchDistressDeals } = useDistressDeals();

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
          <Typography
            variant="h1"
            sx={{
              color: 'common.white',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              mb: 1,
            }}
          >
            Distress{' '}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Deals
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'text.disabled',
              fontSize: '0.95rem',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              maxWidth: 500,
            }}
          >
            Handpicked distress deals you won&apos;t find elsewhere
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Loading State */}
        {loading && (
          <Grid container spacing={2.5}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <DistressCardSkeleton />
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
              onClick={fetchDistressDeals}
              startIcon={<RotateCcw size={16} />}
              sx={{ borderColor: 'gold.main', color: 'gold.main' }}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Deals Grid */}
        {!loading && !error && (
          <>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontFamily: '"Quicksand", sans-serif',
                mb: 3,
              }}
            >
              {deals.length} {deals.length === 1 ? 'Deal' : 'Deals'}
            </Typography>

            {deals.length > 0 ? (
              <Grid container spacing={2.5}>
                {deals.map((project) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={project.project_id}>
                    <DistressCard project={project} />
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
                  }}
                >
                  No distress deals available right now
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
