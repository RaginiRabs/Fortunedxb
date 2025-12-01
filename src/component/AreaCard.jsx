import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { MapPin, TrendingUp, ChevronRight, ArrowUpRight, Building2 } from 'lucide-react';

export const FeaturedAreaCard = ({ area }) => {
  if (!area) return null;

  return (
    <Box sx={{
      position: 'relative', borderRadius: 4, overflow: 'hidden', height: { xs: 460, md: 500 },
      cursor: 'pointer', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transition: 'all 0.4s ease',
      '&:hover': { transform: 'translateY(-12px)', '& img': { transform: 'scale(1.1)' }}
    }}>
      <Box component="img" src={area.image} alt={area.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} />

      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(11,26,42,0.98) 100%)' }} />

      {/* Badges */}
      <Box sx={{ position: 'absolute', top: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ bgcolor: '#C6A962', px: 2.5, py: 1, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Building2 size={18} color="#0B1A2A" />
          <Typography sx={{ color: '#0B1A2A', fontWeight: 700, fontSize: '0.9rem' }}>{area.category}</Typography>
        </Box>
        <Box sx={{ bgcolor: '#10B981', px: 2.5, py: 1, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp size={18} color="white" />
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>{area.priceGrowth}</Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
        <Typography sx={{ color: '#C6A962', fontSize: '1rem', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapPin size={18} /> {area.tagline}
        </Typography>
        <Typography sx={{ color: 'white', fontFamily: '"Playfair Display", serif', fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700, lineHeight: 1.1 }}>
          {area.name}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', mt: 1, mb: 4 }}>{area.description}</Typography>

        <Box sx={{ display: 'flex', gap: 4, mb: 5 }}>
          <Box sx={{ bgcolor: 'rgba(11,26,42,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(198,169,98,0.4)', borderRadius: 3, px: 4, py: 3 }}>
            <Typography sx={{ color: '#C6A962', fontSize: '2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
              {area.properties}+
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Properties</Typography>
          </Box>
          <Box sx={{ bgcolor: 'rgba(11,26,42,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(198,169,98,0.4)', borderRadius: 3, px: 4, py: 3 }}>
            <Typography sx={{ color: '#C6A962', fontSize: '2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
              AED {area.avgPrice}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Avg Price</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button endIcon={<ChevronRight size={20} />} sx={{
            bgcolor: 'transparent', border: '2px solid #C6A962', color: '#C6A962', px: 5, py: 2, borderRadius: '50px', fontWeight: 700,
            '&:hover': { bgcolor: '#C6A962', color: '#0B1A2A' }
          }}>
            Explore Properties
          </Button>
          <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: 'rgba(198,169,98,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowUpRight size={28} color="#C6A962" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const AreaCard = ({ area }) => {
  if (!area) return null;

  return (
    <Box sx={{
      position: 'relative', borderRadius: 3, overflow: 'hidden', height: 360, cursor: 'pointer',
      boxShadow: '0 12px 40px rgba(0,0,0,0.3)', transition: 'all 0.4s',
      '&:hover': { transform: 'translateY(-10px)', '& img': { transform: 'scale(1.15)' }}
    }}>
      <Box component="img" src={area.image} alt={area.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />

      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(11,26,42,0.98) 75%)' }} />

      <Box sx={{ position: 'absolute', top: 16, right: 16, bgcolor: '#10B981', px: 2, py: 1, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUp size={16} color="white" />
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>{area.priceGrowth}</Typography>
      </Box>

      <Box sx={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <Typography sx={{ color: '#C6A962', fontSize: '0.85rem', fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Building2 size={16} /> {area.category}
        </Typography>
        <Typography sx={{ color: 'white', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 }}>
          {area.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 3 }}>
          <Box>
            <Typography sx={{ color: '#C6A962', fontSize: '1.4rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
              {area.properties}+
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Properties</Typography>
          </Box>
          <Box sx={{ width: 1, height: 36, bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Box>
            <Typography sx={{ color: '#C6A962', fontSize: '1.4rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
              AED {area.avgPrice}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Avg Price</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AreaCard;