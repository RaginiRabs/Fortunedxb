import React from 'react';
import {
  Card,
  CardMedia,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { MapPin, Building2, Calendar, Heart, ArrowUpRight, Bed, Maximize2, CheckCircle2 } from 'lucide-react';

const PropertyCard = ({ property }) => {
  // Helper Functions
  const getLocationString = (location) => {
    if (typeof location === 'string') return location;
    return 'Dubai, UAE';
  };

  const getUnitRange = (configurations) => {
    if (!configurations || !Array.isArray(configurations)) return 'Various';
    const types = configurations.map((config) => config.type) || [];
    const bhkTypes = types.filter((type) => type && type.includes('BHK'));
    if (bhkTypes.length === 0) return types[0] || 'Studio';
    const bhkNumbers = bhkTypes
      .map((type) => {
        const match = type.match(/(\d+)\s*BHK/);
        return match ? parseInt(match[1]) : null;
      })
      .filter((num) => num !== null);
    if (bhkNumbers.length === 0) return 'Various';
    const min = Math.min(...bhkNumbers);
    const max = Math.max(...bhkNumbers);
    return min === max ? `${min} BHK` : `${min}-${max} BHK`;
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('ready')) return { bg: '#10B981', text: '#FFFFFF', label: 'Ready to Move' };
    if (s.includes('new') || s.includes('launch')) return { bg: '#C6A962', text: '#0B1A2A', label: 'New Launch' };
    if (s.includes('upcoming')) return { bg: '#8B5CF6', text: '#FFFFFF', label: 'Upcoming' };
    if (s.includes('construction')) return { bg: '#0B1A2A', text: '#FFFFFF', label: 'Under Construction' };
    return { bg: '#64748B', text: '#FFFFFF', label: status || 'Available' };
  };

  const formatPrice = (price) => {
    if (!price) return '0';
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + 'M';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(0) + 'K';
    }
    return price.toLocaleString();
  };

  // Get payment plan text safely
  const getPaymentPlanText = (paymentPlan) => {
    if (!paymentPlan) return '60/40 Payment Plan';
    if (typeof paymentPlan === 'string') return paymentPlan;
    if (typeof paymentPlan === 'object' && paymentPlan.description) {
      return paymentPlan.description;
    }
    return '60/40 Payment Plan';
  };

  // Get size text safely
  const getSizeText = (property) => {
    if (property?.size) {
      if (typeof property.size === 'string') return property.size;
      if (typeof property.size === 'number') return `${property.size} sqft`;
    }
    if (property?.configurations && Array.isArray(property.configurations)) {
      const sizes = property.configurations
        .map(c => c.size || c.area)
        .filter(s => s);
      if (sizes.length > 0) {
        const min = Math.min(...sizes);
        const max = Math.max(...sizes);
        return min === max ? `${min} sqft` : `${min} - ${max} sqft`;
      }
    }
    return '650 - 2,400 sqft';
  };

  const statusStyle = getStatusStyle(property?.status);

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid #F0F0F0',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.4s ease',
        cursor: 'pointer',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
          border: '1px solid #C6A962',
          '& .card-image': {
            transform: 'scale(1.08)',
          },
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="220"
          image={property?.image}
          alt={property?.title}
          className="card-image"
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Top Row - Status & Heart */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Status Badge */}
          <Box
            sx={{
              bgcolor: statusStyle.bg,
              color: statusStyle.text,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.6rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {statusStyle.label}
          </Box>

          {/* Heart Button */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.1)',
                bgcolor: '#C6A962',
                '& svg': {
                  color: 'white',
                },
              },
            }}
          >
            <Heart size={14} color="#0B1A2A" />
          </Box>
        </Box>

        {/* Bottom Row - Price & Handover */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* Price */}
          <Box>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.55rem',
                letterSpacing: 1,
                textTransform: 'uppercase',
                mb: 0.25,
              }}
            >
              Starting From
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1.25rem',
                fontFamily: '"Playfair Display", serif',
                lineHeight: 1,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              <Box component="span" sx={{ color: '#C6A962', fontSize: '0.8rem' }}>AED </Box>
              {formatPrice(property?.price)}
            </Typography>
          </Box>

          {/* Handover Badge */}
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              px: 1.25,
              py: 0.5,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Calendar size={11} color="#C6A962" />
            <Typography sx={{ color: '#0B1A2A', fontSize: '0.65rem', fontWeight: 600 }}>
              {property?.handover || 'Q4 2025'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Project Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: '#0B1A2A',
            fontFamily: '"Playfair Display", serif',
            mb: 0.75,
            lineHeight: 1.3,
          }}
        >
          {property?.title}
        </Typography>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
          <MapPin size={14} color="#C6A962" />
          <Typography sx={{ color: '#64748B', fontSize: '0.8rem' }}>
            {getLocationString(property?.location)}
          </Typography>
        </Box>

        {/* Feature Tags Row */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
          {/* BHK Chip */}
          <Chip
            icon={<Bed size={12} color="#64748B" />}
            label={getUnitRange(property?.configurations)}
            size="small"
            sx={{
              bgcolor: '#F8FAFC',
              color: '#64748B',
              fontSize: '0.65rem',
              fontWeight: 600,
              height: 26,
              border: '1px solid #E2E8F0',
              '& .MuiChip-icon': {
                ml: 0.5,
              },
            }}
          />

          {/* Size Chip */}
          <Chip
            icon={<Maximize2 size={12} color="#64748B" />}
            label={getSizeText(property)}
            size="small"
            sx={{
              bgcolor: '#F8FAFC',
              color: '#64748B',
              fontSize: '0.65rem',
              fontWeight: 600,
              height: 26,
              border: '1px solid #E2E8F0',
              '& .MuiChip-icon': {
                ml: 0.5,
              },
            }}
          />
        </Box>

        {/* Payment Plan Tag */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 1.5,
            p: 1,
            borderRadius: 1.5,
            bgcolor: 'rgba(198, 169, 98, 0.08)',
            border: '1px solid rgba(198, 169, 98, 0.2)',
          }}
        >
          <CheckCircle2 size={14} color="#C6A962" />
          <Typography sx={{ color: '#A68B4B', fontSize: '0.7rem', fontWeight: 600 }}>
            {getPaymentPlanText(property?.paymentPlan)}
          </Typography>
        </Box>

        {/* Bottom Row - Developer & Arrow */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
          }}
        >
          {/* Developer Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                bgcolor: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E2E8F0',
              }}
            >
              <Building2 size={14} color="#64748B" />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#94A3B8',
                  fontSize: '0.55rem',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  lineHeight: 1,
                }}
              >
                Developer
              </Typography>
              <Typography sx={{ color: '#0B1A2A', fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.2 }}>
                {property?.developer || property?.builder?.name || 'Premium Developer'}
              </Typography>
            </Box>
          </Box>

          {/* Arrow Button */}
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: '#0B1A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#C6A962',
                transform: 'scale(1.05)',
                '& svg': {
                  color: '#0B1A2A',
                },
              },
            }}
          >
            <ArrowUpRight size={16} color="#C6A962" />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PropertyCard;