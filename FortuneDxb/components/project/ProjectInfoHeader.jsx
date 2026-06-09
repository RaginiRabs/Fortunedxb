'use client';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import {
  MapPin,
  Bed,
  Maximize2,
  Calendar,
  Building2,
  BadgeCheck,
} from 'lucide-react';

const ProjectInfoHeader = ({
  projectName,
  developerName,
  developerLogo,
  location,
  bedsRange,
  status,
  areaRange,
  handoverDate,
  projectType,
  formatDate,
}) => {
  const theme = useTheme();

  // Format developer logo path
  const logoPath = developerLogo 
    ? (developerLogo.startsWith('/') ? developerLogo : `/${developerLogo}`)
    : undefined;

  // Stats configuration
  const stats = [
    { icon: Bed, label: 'Bedrooms', value: bedsRange },
    { icon: Maximize2, label: 'Size', value: areaRange !== '-' ? `${areaRange} sqft` : '-' },
    { icon: Calendar, label: 'Handover', value: formatDate(handoverDate) },
    { icon: Building2, label: 'Type', value: projectType }
  ];

  return (
    <Box>
      {/* Developer Info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, mb: 0.75 }}>
        {/* <Avatar 
          src={logoPath}
            sx={{
            width: { xs: 50, md: 50 },
            height: { xs: 50, md: 50 },
            border: `2px solid ${theme.palette.gold.main}`,
            bgcolor: 'background.paper',
            fontSize: '1.25rem',
            flexShrink: 0,
            '& img': {
              objectFit: 'contain',  
              p: 0.5                 
            }
          }}
        >
          {developerName?.charAt(0) || '🏢'}
        </Avatar> */}
        
      {/* Project Name */}
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.85rem' }, 
          fontWeight: 700,
          color: 'common.white',
          mb: 0.5,
          lineHeight: 1.2 
        }}
      >
        {projectName} | {status} | {developerName}
      </Typography>


        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            by {developerName}
          </Typography>
          <BadgeCheck size={14} color="#C6A962" />
        </Box> */}
      </Box>


      {/* Location */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
        <MapPin size={18} color={theme.palette.gold.main} />
        <Typography sx={{ color: 'grey.300', fontSize: '1.25rem' }}>
          {location}
        </Typography>
      </Box>

      {/* Stats Row */}
      {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2.5 } }}>
        {stats.map((stat, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: 1, 
                bgcolor: 'rgba(198, 169, 98, 0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <stat.icon size={14} color={theme.palette.gold.main} />
            </Box>
            <Box>
              <Typography 
                sx={{ 
                  fontSize: '0.6rem', 
                  color: '#64748B', 
                  textTransform: 'uppercase', 
                  letterSpacing: 0.5 
                }}
              >
                {stat.label}
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  color: '#FFFFFF' 
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

export default ProjectInfoHeader;