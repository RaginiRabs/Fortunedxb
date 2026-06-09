'use client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Skeleton,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MapPin, ArrowRight, Bed, Maximize2, BadgeCheck, Flame, Sparkles } from 'lucide-react';
import {
  createSlug,
  createProjectSlug,
  formatPrice,
  getLowestPrice,
  getUnitTypes,
  getAreaRange,
} from '@/lib/utils';
import CountdownTimer from '@/components/home/CountdownTimer';

// Skeleton — theme-aware, matches DistressCard shape
export const DistressCardSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2.5,
      overflow: 'hidden',
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Skeleton variant="rectangular" height={180} animation="wave" />
    <CardContent sx={{ p: 1.5 }}>
      <Skeleton variant="text" width="85%" height={20} sx={{ mb: 0.25 }} />
      <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="90%" height={14} sx={{ mb: 1 }} />
      <Skeleton variant="rounded" width="100%" height={34} />
    </CardContent>
  </Card>
);

// Offer Type Config — label + chip colors reflect the admin's offer.
// has_expiry → time-limited urgency (red), else evergreen distress (gold).
const getOfferConfig = (offer, theme) => {
  if (offer?.has_expiry) {
    return {
      icon: Flame,
      label: 'LIMITED TIME',
      bg: theme.palette.error.main,
      glow: alpha(theme.palette.error.main, 0.5),
    };
  }
  return {
    icon: Sparkles,
    label: 'DISTRESS DEAL',
    bg: theme.palette.gold.main,
    glow: alpha(theme.palette.gold.main, 0.5),
  };
};

const DistressCard = ({ project, handleInquiry }) => {
  const router = useRouter();
  const theme = useTheme();

  // Data extraction — nested API shape (same as listing API)
  const id = project?.project_id;
  const name = project?.project_name;
  const developer = project?.developer_name;
  const locality = project?.locality;
  const city = project?.city || 'Dubai';
  const location = locality ? `${locality}, ${city}` : city;
  const configurations = project?.configurations || [];
  const offer = project?.offer;

  const unitTypes = getUnitTypes(configurations);
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

  const config = getOfferConfig(offer, theme);
  const isLimited = Boolean(offer?.has_expiry);

  const handleOpenProject = () => {
    if (!id) return;
    router.push(`/${createSlug(city)}/${createSlug(developer)}/${createProjectSlug(name, id)}`);
  };

  return (
    <Card
      onClick={handleOpenProject}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2.5,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: '4px solid',
        borderLeftColor: isLimited ? 'error.main' : 'gold.main',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'gold.main',
          borderLeftColor: isLimited ? 'error.main' : 'gold.main',
          boxShadow: `0 12px 24px ${alpha(theme.palette.gold.main, 0.12)}`,
          '& .distress-image': { transform: 'scale(1.05)' },
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={name}
          className="distress-image"
          sx={{ transition: 'transform 0.4s ease', objectFit: 'cover' }}
        />

        {/* Gradient for legibility of overlaid badges */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Offer Badge — diagonal corner ribbon (clipped to the corner).
            Red + animated for limited-time urgency, gold for evergreen distress. */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 130,
            height: 130,
            overflow: 'hidden',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 26,
              left: -42,
              width: 180,
              py: 0.5,
              transform: 'rotate(-45deg)',
              textAlign: 'center',
              bgcolor: config.bg,
              boxShadow: `0 2px 6px ${config.glow}`,
              overflow: 'hidden',
              animation: isLimited ? 'ribbonPulse 1.8s ease-in-out infinite' : 'none',
              '@keyframes ribbonPulse': {
                '0%, 100%': { filter: 'brightness(1)' },
                '50%': { filter: 'brightness(1.18)' },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(120deg, transparent 30%, ${alpha(theme.palette.common.white, 0.5)} 50%, transparent 70%)`,
                transform: 'translateX(-100%)',
                animation: 'ribbonShine 2.8s ease-in-out infinite',
              },
              '@keyframes ribbonShine': {
                '0%': { transform: 'translateX(-100%)' },
                '55%, 100%': { transform: 'translateX(100%)' },
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                position: 'relative',
                zIndex: 1,
                color: 'common.white',
                fontSize: '0.55rem',
                fontWeight: 800,
                letterSpacing: 0.5,
                whiteSpace: 'nowrap',
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              {offer?.title || config.label}
            </Typography>
          </Box>
        </Box>

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
          {/* Price Badge — tinted deal surface over the photo (fixed in both modes) */}
          <Box
            sx={{
              bgcolor: isLimited ? 'rgba(254,242,242,0.97)' : 'rgba(253,250,240,0.97)',
              borderRadius: 1,
              px: 1.25,
              py: 0.6,
            }}
          >
            <Typography
              sx={{
                color: isLimited ? 'error.dark' : 'gold.dark',
                fontSize: '0.55rem',
                fontWeight: 800,
                letterSpacing: 0.3,
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Deal Price
            </Typography>
            <Typography
              sx={{
                color: 'navy.main',
                fontWeight: 800,
                fontSize: '1rem',
                fontFamily: '"Quicksand", sans-serif',
                lineHeight: 1.1,
              }}
            >
              {displayPrice}
            </Typography>
          </Box>

          {/* Developer Badge */}
          <Box
            sx={{
              bgcolor: alpha(theme.palette.common.white, 0.95),
              borderRadius: 0.75,
              px: 0.85,
              py: 0.45,
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              maxWidth: 110,
            }}
          >
            <BadgeCheck size={11} color={theme.palette.gold.main} />
            <Typography
              sx={{
                fontSize: '0.6rem',
                fontWeight: 700,
                color: 'navy.main',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              {developer}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, p: 1.5, pt: 1.25, display: 'flex', flexDirection: 'column' }}>
        {/* Project Name */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '0.95rem',
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
              color: 'text.primary',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 700,
            }}
          >
            {location}
          </Typography>
        </Box>

        {/* Offer description — clamped to 3 lines */}
        {offer?.description && (
          <Typography
            title={offer.description}
            sx={{
              color: 'text.secondary',
              fontSize: '0.72rem',
              fontWeight: 400,
              lineHeight: 1.5,
              mb: 1,
              fontFamily: '"Quicksand", sans-serif',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {offer.description}
          </Typography>
        )}

        {/* Countdown when the offer has an expiry — warm urgency box */}
        {isLimited && offer?.expiry_date && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              mb: 1,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: alpha(theme.palette.error.main, 0.06),
              border: '1px solid',
              borderColor: alpha(theme.palette.error.main, 0.15),
            }}
          >
            <Typography
              sx={{
                fontSize: '0.6rem',
                color: 'error.main',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontWeight: 800,
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              Ends in
            </Typography>
            <CountdownTimer validUntil={offer.expiry_date} />
          </Box>
        )}

        {/* Specs row — unit types + area range */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            mt: 'auto',
            pt: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {unitTypes && unitTypes !== '-' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <Bed size={13} color={theme.palette.text.secondary} />
              <Typography sx={{ fontSize: '0.72rem', color: 'text.primary', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {unitTypes}
              </Typography>
            </Box>
          )}
          {areaRange && areaRange !== '-' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <Maximize2 size={13} color={theme.palette.text.secondary} />
              <Typography sx={{ fontSize: '0.72rem', color: 'text.primary', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {areaRange}{' '}
                <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>sqft</Box>
              </Typography>
            </Box>
          )}
        </Box>

        {/* Enquire CTA */}
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            if (handleInquiry) handleInquiry({ ...project, id, name });
            else handleOpenProject();
          }}
          sx={{
            mt: 1.25,
            background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
            color: 'common.white',
            width: '100%',
            py: 0.85,
            borderRadius: 1,
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'none',
            fontFamily: '"Quicksand", sans-serif',
            boxShadow: `0 2px 8px ${alpha(theme.palette.gold.main, 0.3)}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
              transform: 'translateY(-1px)',
              boxShadow: `0 6px 20px ${alpha(theme.palette.gold.main, 0.45)}`,
            },
          }}
          endIcon={<ArrowRight size={14} />}
        >
          Enquire Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default DistressCard;
