// File: src/component/Propertycard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { MapPin, ArrowRight, BadgeCheck } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const getLocationString = (location) => {
    if (typeof location === 'string') return location;
    if (location && location.latitude && location.longitude) {
      return 'Dubai, UAE';
    }
    return 'Location not available';
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

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid #F0F0F0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 20px 40px rgba(30, 58, 95, 0.12), 0 0 0 1px rgba(198, 169, 98, 0.3)',
          borderColor: 'rgba(198, 169, 98, 0.4)',
        },
        // Gold corner accent
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background: 'linear-gradient(135deg, transparent 50%, rgba(198, 169, 98, 0.08) 50%)',
          pointerEvents: 'none',
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
            transition: 'transform 0.6s ease',
            '.MuiCard-root:hover &': {
              transform: 'scale(1.05)',
            },
          }}
        />

        {/* Subtle Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(30, 58, 95, 0.3) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Status Badge */}
        <Chip
          label={property?.status || 'Ready to Move'}
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'white',
            color: '#1E3A5F',
            fontWeight: 600,
            fontSize: '0.65rem',
            height: 24,
            borderRadius: '100px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />

        {/* Price Tag on Image */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            px: 1.5,
            py: 0.75,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            sx={{
              color: '#94A3B8',
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              lineHeight: 1,
            }}
          >
            Starting from
          </Typography>
          <Typography
            sx={{
              color: '#1E3A5F',
              fontWeight: 700,
              fontSize: '0.95rem',
              lineHeight: 1.2,
              '& span': {
                color: '#C6A962',
              },
            }}
          >
            <span>AED</span> {(property?.price || 0)?.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2.5, pt: 2 }}>
        {/* Developer */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 1,
          }}
        >
          <BadgeCheck size={12} color="#C6A962" />
          <Typography
            sx={{
              color: '#94A3B8',
              fontSize: '0.7rem',
              fontWeight: 500,
            }}
          >
            {property?.developer || 'Premium Developer'}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.05rem',
            color: '#1E3A5F',
            mb: 0.75,
            lineHeight: 1.3,
            fontFamily: '"Playfair Display", serif',
          }}
        >
          {property?.title}
        </Typography>

        {/* Location */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 2,
          }}
        >
          <MapPin size={12} color="#C6A962" />
          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.75rem',
            }}
          >
            {getLocationString(property?.location)}
          </Typography>
        </Box>

        {/* Divider with Gold Accent */}
        <Box
          sx={{
            height: 1,
            background: 'linear-gradient(90deg, #C6A962 0%, #F0F0F0 30%, #F0F0F0 100%)',
            mb: 2,
          }}
        />

        {/* Bottom Row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Quick Info */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: 'rgba(30, 58, 95, 0.04)',
                borderRadius: 1.5,
                px: 1.25,
                py: 0.5,
              }}
            >
              <Typography
                sx={{
                  color: '#1E3A5F',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                }}
              >
                {getUnitRange(property?.configurations)}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'rgba(30, 58, 95, 0.04)',
                borderRadius: 1.5,
                px: 1.25,
                py: 0.5,
              }}
            >
              <Typography
                sx={{
                  color: '#1E3A5F',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                }}
              >
                {property?.handover || 'Q4 2025'}
              </Typography>
            </Box>
          </Box>

          {/* Arrow Button */}
          <IconButton
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
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