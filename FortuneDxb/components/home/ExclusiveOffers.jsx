'use client';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import DistressCard from '@/components/distress/DistressCard';

const FONT = '"Quicksand", sans-serif';

const ExclusiveOffers = ({ projectsWithOffers, handleInquiry }) => {
  const theme = useTheme();
  const router = useRouter();

  const realDeals = projectsWithOffers?.filter((project) => project.offer) || [];
  if (realDeals.length === 0) return null;

  return (
    <Box
      id="distress-deals"
      sx={{
        pt: { xs: 6, md: 8 },
        pb: { xs: 8, md: 10 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: { xs: 64, md: 80 },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          background: `
            radial-gradient(circle at 15% 25%, ${alpha(theme.palette.gold.main, 0.5)} 0%, transparent 35%),
            radial-gradient(circle at 85% 75%, ${alpha(theme.palette.navy.main, 0.5)} 0%, transparent 35%)
          `,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography
            variant="h4"
            sx={{
              color: 'text.primary',
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
              mb: 0.5,
            }}
          >
            Distress{' '}
            <Box component="span" sx={{ color: 'gold.main' }}>Deals</Box>
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              fontFamily: FONT,
            }}
          >
            Handpicked distress deals you won&apos;t find elsewhere
          </Typography>
        </Box>

        {/* Grid of Distress Cards — 3 per row */}
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }}>
          {realDeals.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={`${project.project_id}-${index}`}>
              <DistressCard project={project} handleInquiry={handleInquiry} />
            </Grid>
          ))}
        </Grid>

        {/* View All Deals */}
        <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 5 } }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRight size={16} />}
            onClick={() => router.push('/distress-deals')}
            sx={{
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              borderRadius: 1,
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
              textTransform: 'none',
              fontFamily: FONT,
              '& .MuiButton-endIcon': { transition: 'transform 0.3s ease' },
              '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
            }}
          >
            View All Deals
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ExclusiveOffers;
