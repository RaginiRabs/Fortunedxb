'use client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  MapPin,
  Maximize2,
  Heart,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import {
  createSlug,
  createProjectSlug,
  formatPrice,
  getLowestPrice,
  getAreaRange,
} from '@/lib/utils';

// ✅ Skeleton — theme-aware
export const ProjectCardSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2.5,
      overflow: 'hidden',
      // ✅ '#FFFFFF' → 'background.paper'
      bgcolor: 'background.paper',
      // ✅ '#E5E7EB' → 'divider'
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Skeleton variant="rectangular" height={130} animation="wave" />
    <CardContent sx={{ p: 1.5 }}>
      <Skeleton variant="text" width="85%" height={20} sx={{ mb: 0.25 }} />
      <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', gap: 0.75, mb: 1 }}>
        <Skeleton variant="rounded" width="48%" height={38} />
        <Skeleton variant="rounded" width="48%" height={38} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton variant="text" width={100} height={16} />
        <Skeleton variant="rounded" width={28} height={28} />
      </Box>
    </CardContent>
  </Card>
);

const ProjectCard = ({ project, savedProperties = [], onSaveProperty, handleSaveProperty, distress = false }) => {
  const router = useRouter();
  const theme = useTheme();
  const saveProperty = onSaveProperty || handleSaveProperty;

  const id = project?.project_id;
  const name = project?.project_name;
  const developer = project?.developer_name;
  const locality = project?.locality;
  const city = project?.city || 'Dubai';
  const location = locality ? `${locality}, ${city}` : city;
  const status = project?.project_status || 'Available';
  const configurations = project?.configurations || [];

  const paymentPlan = project?.payment_plan;
  const unitsSold = project?.units_sold;
  const totalUnits = project?.total_units;
  const soldUnits = project?.sold_units;

  const soldPercentage = unitsSold ?? (totalUnits && soldUnits ? Math.round((soldUnits / totalUnits) * 100) : null);

  // Hide these blocks entirely when there is no data.
  const hasPayment = Boolean(paymentPlan && String(paymentPlan).trim());
  const hasSold = soldPercentage !== null && soldPercentage !== undefined;

  const roi = project?.roi;
  const hasRoi = Boolean(roi && String(roi).trim());
  const roiText = hasRoi ? `${String(roi).replace('%', '').trim()}% ROI` : '';

  const areaRange = getAreaRange(configurations);

  let displayPrice = 'On Request';
  if (project?.booking_amount &&
    project.booking_amount !== '0' &&
    project.booking_amount !== '' &&
    project.booking_amount !== null) {
    displayPrice = formatPrice(project.booking_amount);
  } else {
    const lowestPrice = getLowestPrice(configurations);
    if (lowestPrice) displayPrice = formatPrice(lowestPrice);
  }

  let image = '/asset/placeholderproject.jpg';
  if (project?.gallery?.length > 0) {
    const galleryPath = project.gallery[0]?.file_path;
    image = galleryPath?.startsWith('/') ? galleryPath : `/${galleryPath}`;
  }

  const isSaved = savedProperties?.includes(id);

  const getProgressColor = (pct) => {
    if (pct === null || pct === undefined) return '#6B7280';
    return pct >= 90 ? '#DC2626' : pct >= 70 ? '#F59E0B' : '#10B981';
  };

  const handleCardClick = () => {
    const citySlug = createSlug(city);
    const developerSlug = createSlug(developer);
    const projectSlug = createProjectSlug(name, id);
    router.push(`/${citySlug}/${developerSlug}/${projectSlug}`);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    saveProperty?.(id);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2.5,
        overflow: 'hidden',
        // ✅ '#FFFFFF' → 'background.paper'
        bgcolor: 'background.paper',
        border: '2px solid',
        // ✅ '#F3F4F6' → 'divider'
        borderColor: 'divider',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'gold.main',
          boxShadow: `0 12px 24px ${alpha(theme.palette.gold.main, 0.12)}`,
          '& .project-image': { transform: 'scale(1.05)' },
          '& .card-gloss': { transform: 'translateX(250%) skewX(-15deg)' },
          '& .view-arrow': {
            bgcolor: 'gold.main',
            borderColor: 'gold.main',
            '& svg': { color: 'common.white' },
          },
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="170"
          image={image}
          alt={name}
          className="project-image"
          sx={{
            transition: 'transform 0.4s ease',
            '& img': { objectFit: 'contain', p: 0.5 },
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Hover gloss sweep across the image */}
        <Box
          className="card-gloss"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '55%',
            height: '100%',
            background: 'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
            transform: 'translateX(-150%) skewX(-15deg)',
            transition: 'transform 0.7s cubic-bezier(0.25,1,0.5,1)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Status Badge — unified gold gradient + navy text, looping shine */}
        <Chip
          label={status}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 2,
            background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
            color: 'navy.main',
            fontWeight: 700,
            fontSize: '0.6rem',
            height: 24,
            textTransform: 'uppercase',
            letterSpacing: 0.3,
            borderRadius: 0.75,
            fontFamily: '"Quicksand", sans-serif',
            overflow: 'hidden',
            boxShadow: `0 2px 8px ${alpha(theme.palette.gold.dark, 0.4)}`,
            '& .MuiChip-label': { position: 'relative', zIndex: 1 },
            '@keyframes badgeShine': {
              '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
              '55%, 100%': { transform: 'translateX(320%) skewX(-20deg)' },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '45%',
              height: '100%',
              background: 'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
              transform: 'translateX(-120%) skewX(-20deg)',
              animation: 'badgeShine 3.2s ease-in-out infinite',
            },
          }}
        />

        {/* Price + Developer Row */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* Price Badge — image ke upar hai, white bg fixed */}
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 1, px: 1.25, py: 0.6 }}>
            <Typography sx={{ color: '#4B5563', fontSize: '0.55rem', fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase', lineHeight: 1 }}>
              From
            </Typography>
            <Typography sx={{ color: '#111827', fontWeight: 800, fontSize: '0.95rem', fontFamily: '"Quicksand", sans-serif', lineHeight: 1.1 }}>
              <Box component="span" sx={{ color: 'gold.main', fontWeight: 700, fontSize: '0.75rem' }}>AED </Box>
              {displayPrice}
            </Typography>
          </Box>

          {/* Developer Badge */}
          <Tooltip title={developer} arrow>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.95)',
                borderRadius: 0.75,
                px: 0.85,
                py: 0.45,
                display: 'flex',
                alignItems: 'center',
                gap: 0.4,
                maxWidth: 95,
              }}
            >
              <BadgeCheck size={11} color={theme.palette.gold.main} />
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {developer}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, p: 1.5, pt: 1.25, display: 'flex', flexDirection: 'column' }}>

        {/* Project Name */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '0.95rem',
            // ✅ '#111827' → 'text.primary'
            color: 'text.primary',
            fontFamily: '"Quicksand", sans-serif',
            mb: 0.25,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, mb: 1 }}>
          <MapPin size={13} color={theme.palette.gold.main} />
          <Typography
            sx={{
              fontSize: '0.78rem',
              // ✅ '#1F2937' → 'text.primary'
              color: 'text.primary',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 700,
            }}
          >
            {location}
          </Typography>
        </Box>

        {/* Payment Plan & Units Sold */}
        {!distress && (hasPayment || hasSold) && (
          <Box sx={{ display: 'flex', gap: 0.75, mb: 1 }}>
            {/* Payment Plan */}
            {hasPayment && (
            <Box
              sx={{
                flex: 1,
                // ✅ theme-aware warm tint — dark mode me subtle, light me warm
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(217,119,6,0.1)' : '#FFFBEB',
                borderRadius: 1,
                p: 0.85,
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(217,119,6,0.3)' : '#FDE68A',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, mb: 0.3 }}>
                <CreditCard size={11} color={theme.palette.warning.dark} />
                <Typography sx={{ fontSize: '0.55rem', color: '#78350F', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.2 }}>
                  Payment
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.85rem', color: '#78350F', fontWeight: 800, fontFamily: '"Quicksand", sans-serif', lineHeight: 1 }}>
                {paymentPlan}
              </Typography>
            </Box>
            )}

            {/* Units Sold */}
            {hasSold && (
            <Box
              sx={{
                flex: 1,
                bgcolor: (theme) => {
                  if (theme.palette.mode === 'dark') {
                    return soldPercentage && soldPercentage >= 70 ? 'rgba(220,38,38,0.1)' : 'rgba(16,185,129,0.1)';
                  }
                  return soldPercentage && soldPercentage >= 70 ? '#FEF2F2' : '#F0FDF4';
                },
                borderRadius: 1,
                p: 0.85,
                border: '1px solid',
                borderColor: soldPercentage && soldPercentage >= 70 ? 'rgba(220,38,38,0.3)' : 'rgba(16,185,129,0.3)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <BarChart3 size={11} color={getProgressColor(soldPercentage)} />
                  <Typography sx={{ fontSize: '0.55rem', color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.2 }}>
                    Sold
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.8rem', color: getProgressColor(soldPercentage), fontWeight: 800 }}>
                  {soldPercentage !== null && soldPercentage !== undefined ? `${soldPercentage}%` : 'N/A'}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={soldPercentage || 0}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.06)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getProgressColor(soldPercentage),
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
            )}
          </Box>
        )}

        {/* Bottom: Unit Types | Area Range + Arrow */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
            pt: 0.75,
            borderTop: '1px solid',
            // ✅ '#F3F4F6' → 'divider'
            borderColor: 'divider',
          }}
        >
          {/* ROI — hidden when no ROI data */}
          {hasRoi ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              <TrendingUp size={13} color={theme.palette.gold.main} />
              <Typography sx={{ fontSize: '0.75rem', color: 'text.primary', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {roiText}
              </Typography>
            </Box>
          ) : (
            <Box />
          )}

          {/* Area Range + Arrow */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.35 }}>
              <Maximize2 size={13} color={theme.palette.text.secondary} />
              <Typography sx={{ fontSize: '0.75rem', color: 'text.primary', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {areaRange && areaRange !== '-' ? (
                  <>
                    {areaRange} <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>sqft</Box>
                  </>
                ) : '-'}
              </Typography>
            </Box>

            {/* Arrow */}
            <Box
              className="view-arrow"
              sx={{
                width: 30,
                height: 30,
                borderRadius: 1,
                bgcolor: 'gold.main',
                borderColor: 'gold.main',
                '& svg': { color: 'common.white' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              <ArrowRight size={16} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;