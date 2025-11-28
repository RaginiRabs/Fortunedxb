import React from 'react';
import {
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { MapPin, ArrowRight, Building2, Calendar } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const getLocationString = (location) => {
    if (typeof location === 'string') return location;
    return 'Dubai, UAE';
  };

  const getUnitRange = (configurations) => {
    if (!configurations || !Array.isArray(configurations)) return 'Various';
    const types = configurations.map(config => config.type) || [];
    const bhkTypes = types.filter(type => type && type.includes('BHK'));
    if (bhkTypes.length === 0) return types[0] || 'Studio';
    const bhkNumbers = bhkTypes.map(type => {
      const match = type.match(/(\d+)\s*BHK/);
      return match ? parseInt(match[1]) : null;
    }).filter(num => num !== null);
    if (bhkNumbers.length === 0) return 'Various';
    const min = Math.min(...bhkNumbers);
    const max = Math.max(...bhkNumbers);
    return min === max ? `${min} BHK` : `${min}-${max} BHK`;
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('ready')) return { bg: '#10B981', text: '#FFFFFF' };
    if (s.includes('new') || s.includes('launch')) return { bg: '#C6A962', text: '#0B1A2A' };
    if (s.includes('upcoming')) return { bg: '#6366F1', text: '#FFFFFF' };
    return { bg: '#64748B', text: '#FFFFFF' };
  };

  const statusColors = getStatusColor(property?.status);

  const formatPrice = (price) => {
    if (!price) return '0';
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + 'M';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(0) + 'K';
    }
    return price.toLocaleString();
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid #F0F0F0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 20px 40px rgba(11, 26, 42, 0.15), 0 0 0 1px rgba(198, 169, 98, 0.3)',
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', height: 200 }}>
        <CardMedia
          component="img"
          height="200"
          image={property?.image}
          alt={property?.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '.MuiCard-root:hover &': {
              transform: 'scale(1.05)',
            },
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(11,26,42,0.05) 0%, rgba(11,26,42,0.5) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Status Badge - Top Left */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: statusColors.bg,
            color: statusColors.text,
            px: 1.5,
            py: 0.4,
            borderRadius: '100px',
            fontSize: '0.6rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {property?.status || 'Available'}
        </Box>

        {/* Handover Badge - Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            px: 1.25,
            py: 0.4,
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Calendar size={10} color="#0B1A2A" />
          <Typography
            sx={{
              color: '#0B1A2A',
              fontSize: '0.58rem',
              fontWeight: 600,
            }}
          >
            {property?.handover || 'TBA'}
          </Typography>
        </Box>

        {/* Price Box - Bottom Left on Image */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            bgcolor: 'rgba(11, 26, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            px: 1.5,
            py: 1,
            borderRadius: 2,
            border: '1px solid rgba(198, 169, 98, 0.3)',
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              mb: 0.25,
            }}
          >
            Starting from
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1rem',
              fontFamily: '"Playfair Display", serif',
              lineHeight: 1,
            }}
          >
            <Box component="span" sx={{ color: '#C6A962', fontSize: '0.75rem' }}>
              AED{' '}
            </Box>
            {formatPrice(property?.price)}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Project Name */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#0B1A2A',
            fontFamily: '"Playfair Display", serif',
            lineHeight: 1.3,
            mb: 0.75,
          }}
        >
          {property?.title}
        </Typography>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <MapPin size={14} color="#C6A962" />
          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {getLocationString(property?.location)}
          </Typography>
        </Box>


          {/* Developer */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
            <Building2 size={14} color="#94A3B8" />
            <Typography
              sx={{
                color: '#64748B',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {property?.developer || property?.builder?.name || 'Developer'}
            </Typography>
          </Box>

        {/* Developer + BHK + Arrow Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
          }}
        >
        

          {/* BHK Badge */}
          <Box
            sx={{
              bgcolor: 'rgba(198, 169, 98, 0.12)',
              border: '1px solid rgba(198, 169, 98, 0.25)',
              px: 1.25,
              py: 0.5,
              borderRadius: '100px',
            }}
          >
            <Typography
              sx={{
                color: '#A68B4B',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            >
              {getUnitRange(property?.configurations)}
            </Typography>
          </Box>

          {/* Arrow Button */}
          <IconButton
            sx={{
              width: 34,
              height: 34,
              background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              color: '#0B1A2A',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <ArrowRight size={16} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PropertyCard;