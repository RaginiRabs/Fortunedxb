import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Phone, BadgeCheck, Building2, Star, ArrowUpRight, Award, ChevronRight, Crown, TrendingUp } from 'lucide-react';

// Developer Images
const developerImages = {
  'emaar': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
  'damac': 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop',
  'nakheel': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
  'meraas': 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&h=400&fit=crop',
  'sobha': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  'binghatti': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
  'azizi': 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=600&h=400&fit=crop',
  'danube': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
];

const getDeveloperImage = (developer) => {
  if (developer?.featuredImage) return developer.featuredImage;
  if (developer?.image) return developer.image;
  
  const name = developer?.name?.toLowerCase() || '';
  for (const [key, url] of Object.entries(developerImages)) {
    if (name.includes(key)) return url;
  }
  
  const hashCode = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackImages[hashCode % fallbackImages.length];
};
const DeveloperCard = ({ developer}) => {
  return (
    <Box
      sx={{
        bgcolor: '#0B1A2A',
        borderRadius: 4,
        overflow: 'hidden',
        height: 280,
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.4s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          // boxShadow: '0 20px 40px rgba(198, 169, 98, 0.2)',
          '& .diagonal-image img': { transform: 'scale(1.1)' },
        },
      }}
    >
      {/* Diagonal Image Section */}
      <Box
        className="diagonal-image"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          overflow: 'hidden',
          clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        <Box
          component="img"
          src={getDeveloperImage(developer)}
          alt={developer?.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
      </Box>

      {/* Content on Left */}
      <Box sx={{ position: 'relative', zIndex: 1, p: 2.5, width: '55%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Verified Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <BadgeCheck size={14} color="#10B981" />
          <Typography sx={{ color: '#10B981', fontSize: '0.65rem', fontWeight: 600 }}>Verified Developer</Typography>
        </Box>

        {/* Name */}
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.15rem', fontFamily: '"Playfair Display", serif', mb: 0.5 }}>
          {developer?.name}
        </Typography>

        {/* Specializations */}
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', mb: 2 }}>
          {developer?.specializations?.slice(0, 2).join(' • ') || 'Luxury • Residential'}
        </Typography>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2.5, mb: 'auto' }}>
          <Box>
            <Typography sx={{ color: '#C6A962', fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', lineHeight: 1 }}>
              {developer?.completedProjects || 45}+
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', textTransform: 'uppercase' }}>Projects</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: '#C6A962', fontSize: '1.75rem', fontWeight: 700, fontFamily: '"Playfair Display", serif', lineHeight: 1 }}>
              {developer?.experienceYears || 15}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', textTransform: 'uppercase' }}>Years</Typography>
          </Box>
        </Box>

        {/* CTA */}
        <Button
          endIcon={<ChevronRight size={16} />}
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
            color: '#0B1A2A',
            fontWeight: 700,
            fontSize: '0.75rem',
            py: 1,
            borderRadius: '100px',
            textTransform: 'none',
            width: 'fit-content',
            '&:hover': { background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)' },
          }}
        >
          View Projects
        </Button>
      </Box>
    </Box>
  );
};

export default DeveloperCard;